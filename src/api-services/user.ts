import { saveAllUsers, getUser, getAllUsers, saveUser } from '@/utils/indexedDB';
import { saveUsersToLocalStorage, getUsersFromLocalStorage, saveUserDetails, getUserDetails } from '@/utils/localStorage';
import { UserData, UserStatus, FilterParams } from '@/interface-and-types';
import { API_CONFIG, getApiUrl } from '@/api-services/config';

const USERS_API_URL = getApiUrl(API_CONFIG.ENDPOINTS.USERS);

const isIndexedDBSupported = (): boolean => {
  return typeof indexedDB !== 'undefined';
};

export const fetchAndCacheUsers = async (): Promise<UserData[]> => {
  try {
    console.log('Fetching users from API...');
    const response = await fetch(USERS_API_URL);
    
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    
    const result = await response.json();
    const users = result.data || result;

    if (isIndexedDBSupported()) {
      console.log('Caching users to IndexedDB...');
      await saveAllUsers(users);
    } else {
      console.log('Caching users to localStorage...');
      saveUsersToLocalStorage(users);
    }

    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    
    // Try to get cached users
    if (isIndexedDBSupported()) {
      const cachedUsers = await getAllUsers();
      if (cachedUsers.length > 0) {
        console.log('Returning cached users from IndexedDB');
        return cachedUsers;
      }
    } else {
      const cachedUsers = getUsersFromLocalStorage();
      if (cachedUsers.length > 0) {
        console.log('Returning cached users from localStorage');
        return cachedUsers;
      }
    }
    
    throw error;
  }
};

export const getUsers = async (forceRefresh = false): Promise<UserData[]> => {
  if (!forceRefresh) {
    // Try to get from cache first
    if (isIndexedDBSupported()) {
      const cachedUsers = await getAllUsers();
      if (cachedUsers.length > 0) {
        console.log('Returning users from IndexedDB cache');
        return cachedUsers;
      }
    } else {
      const cachedUsers = getUsersFromLocalStorage();
      if (cachedUsers.length > 0) {
        console.log('Returning users from localStorage cache');
        return cachedUsers;
      }
    }
  }

  // Fetch from API and cache
  return fetchAndCacheUsers();
};


export const getUserById = async (userId: string): Promise<UserData | null> => {
  try {
    // Try IndexedDB first
    if (isIndexedDBSupported()) {
      const user = await getUser(userId);
      if (user) {
        console.log('User found in IndexedDB');
        return user;
      }
    } else {
      // Try localStorage
      const user = getUserDetails(userId);
      if (user) {
        console.log('User found in localStorage');
        return user;
      }
    }

    // If not in cache, fetch all users and find the user
    console.log('User not in cache, fetching from all users...');
    const users = await getUsers();
    const foundUser = users.find(u => u.id === userId);
    
    if (foundUser) {
      // Cache this specific user
      if (isIndexedDBSupported()) {
        // Already cached in getAllUsers
      } else {
        saveUserDetails(userId, foundUser);
      }
      return foundUser;
    }

    return null;
  } catch (error) {
    console.error('Error getting user by ID:', error);
    return null;
  }
};


export const filterUsersByStatus = async (status: string): Promise<UserData[]> => {
  const users = await getUsers();
  return users.filter(user => user.status === status);
};

export const searchUsers = async (searchTerm: string): Promise<UserData[]> => {
  const users = await getUsers();
  const term = searchTerm.toLowerCase();
  
  return users.filter(user => 
    user.username.toLowerCase().includes(term) ||
    user.email.toLowerCase().includes(term) ||
    user.phoneNumber.includes(term) ||
    user.organization.toLowerCase().includes(term)
  );
};



export const getPaginatedUsers = async (
  page: number,
  limit: number,
  filters?: FilterParams
): Promise<{
  users: UserData[];
  total: number;
  totalPages: number;
}> => {
  try {
    // Get all users from cache or API
    let allUsers = await getUsers();

    
    if (filters) {
      allUsers = applyFilters(allUsers, filters);
    }

    const total = allUsers.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return {
      users: allUsers.slice(startIndex, endIndex),
      total,
      totalPages
    };
  } catch (error) {
    console.error('Error getting paginated users:', error);
    throw error;
  }
};

// Apply all filters to users array
const applyFilters = (users: UserData[], filters: FilterParams): UserData[] => {
  let filteredUsers = [...users];

  // Search query filter (searches across multiple fields)
  if (filters.query && filters.query.trim()) {
    const query = filters.query.toLowerCase().trim();
    filteredUsers = filteredUsers.filter((user) => {
      return (
        user.username.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.phoneNumber.includes(query) ||
        user.organization.toLowerCase().includes(query) ||
        user.id.toLowerCase().includes(query)
      );
    });
  }

  // Organization filter
  if (filters.organization && filters.organization.trim()) {
    filteredUsers = filteredUsers.filter((user) => 
      user.organization.toLowerCase() === filters.organization!.toLowerCase()
    );
  }

  // Username filter
  if (filters.username && filters.username.trim()) {
    const username = filters.username.toLowerCase().trim();
    filteredUsers = filteredUsers.filter((user) =>
      user.username.toLowerCase().includes(username)
    );
  }

  // Email filter
  if (filters.email && filters.email.trim()) {
    const email = filters.email.toLowerCase().trim();
    filteredUsers = filteredUsers.filter((user) =>
      user.email.toLowerCase().includes(email)
    );
  }

  // Phone number filter
  if (filters.phoneNumber && filters.phoneNumber.trim()) {
    filteredUsers = filteredUsers.filter((user) =>
      user.phoneNumber.includes(filters.phoneNumber!)
    );
  }

  // Status filter
  if (filters.status && filters.status.trim()) {
    filteredUsers = filteredUsers.filter((user) =>
      user.status.toLowerCase() === filters.status!.toLowerCase()
    );
  }

  // Date filter (filters by date joined)
  if (filters.date && filters.date.trim()) {
    filteredUsers = filteredUsers.filter((user) => {
      // Convert user's dateJoined to Date object for comparison
      const userDate = new Date(user.dateJoined);
      const filterDate = new Date(filters.date!);
      
      // Compare dates (ignoring time)
      return (
        userDate.getFullYear() === filterDate.getFullYear() &&
        userDate.getMonth() === filterDate.getMonth() &&
        userDate.getDate() === filterDate.getDate()
      );
    });
  }

  return filteredUsers;
};

export const updateUserStatus = async (
  id: string, 
  status: UserStatus
): Promise<UserData | null> => {
  const user = await getUser(id);
  
  if (!user) {
    throw new Error(`User with id ${id} not found`);
  }

  const updatedUser = { ...user, status };
  await saveUser(updatedUser);
  
  return updatedUser;
};

/**
 * Blacklist a user (set status to 'blacklisted')
 */
export const blacklistUser = async (id: string): Promise<UserData | null> => {
  return updateUserStatus(id, 'blacklisted');
};



