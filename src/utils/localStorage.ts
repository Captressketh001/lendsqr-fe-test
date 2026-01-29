import { UserData } from "@/interface-and-types";
const USERS_KEY = 'lendsqr_users';
const USER_DETAILS_PREFIX = 'lendsqr_user_';


export const saveUsersToLocalStorage = (users: UserData[]): void => {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Error saving users to localStorage:', error);
  }
};


export const getUsersFromLocalStorage = (): UserData[] => {
  try {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error('Error getting users from localStorage:', error);
    return [];
  }
};


export const saveUserDetails = (userId: string, userData: UserData): void => {
  try {
    localStorage.setItem(`${USER_DETAILS_PREFIX}${userId}`, JSON.stringify(userData));
  } catch (error) {
    console.error('Error saving user details:', error);
  }
};

export const getUserDetails = (userId: string): UserData | null => {
  try {
    const user = localStorage.getItem(`${USER_DETAILS_PREFIX}${userId}`);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error getting user details:', error);
    return null;
  }
};


export const clearUserData = (): void => {
  try {
    Object.keys(localStorage)
      .filter(key => key.startsWith(USER_DETAILS_PREFIX) || key === USERS_KEY)
      .forEach(key => localStorage.removeItem(key));
  } catch (error) {
    console.error('Error clearing user data:', error);
  }
};

export const updateUser = (userId: string, updates: Partial<UserData>): UserData | null => {
  try {
    const users = getUsersFromLocalStorage();
    const userIndex = users.findIndex(user => user.id === userId);
    
    if (userIndex === -1) {
      throw new Error(`User with id ${userId} not found`);
    }

    users[userIndex] = { ...users[userIndex], ...updates };
    saveUsersToLocalStorage(users);

    const userDetails = getUserDetails(userId);
    if (userDetails) {
      const updatedDetails = { ...userDetails, ...updates };
      saveUserDetails(userId, updatedDetails);
    }

    return users[userIndex];
  } catch (error) {
    console.error('Error updating user:', error);
    return null;
  }
};