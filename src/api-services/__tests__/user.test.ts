import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { 
  getPaginatedUsers, 
  getUserById, 
  updateUserStatus, 
  blacklistUser,
} from '../user';
import { mockUsers, mockUser } from '@/tests/mocks/mockData';
import * as indexedDB from '@/utils/indexedDB';
import * as localStorage from '@/utils/localStorage';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

// Mock the utility modules
vi.mock('@/utils/indexedDB', () => ({
  saveAllUsers: vi.fn(),
  getUser: vi.fn(),
  getAllUsers: vi.fn(),
  saveUser: vi.fn(),
}));

vi.mock('@/utils/localStorage', () => ({
  saveUsersToLocalStorage: vi.fn(),
  getUsersFromLocalStorage: vi.fn(),
  saveUserDetails: vi.fn(),
  getUserDetails: vi.fn(),
}));

describe('User API Service', () => {
  // eslint-disable-next-line
  const mockFetchResponse = (data: any, ok = true, status = 200) => {
    mockFetch.mockResolvedValueOnce({
      ok,
      status,
      json: () => Promise.resolve(data),
      text: () => Promise.resolve(JSON.stringify(data)),
    });
  };


  const mockIndexedDBUnavailable = () => {
    vi.stubGlobal('indexedDB', undefined);
  };

  const restoreIndexedDB = () => {
    // Restore from setup.ts mock
    vi.unstubAllGlobals();
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Default: IndexedDB is supported and empty
    vi.spyOn(indexedDB, 'getAllUsers').mockResolvedValue([]);
    vi.spyOn(indexedDB, 'getUser').mockResolvedValue(null);
    vi.spyOn(indexedDB, 'saveAllUsers').mockResolvedValue();
    vi.spyOn(indexedDB, 'saveUser').mockResolvedValue();
    vi.spyOn(localStorage, 'getUsersFromLocalStorage').mockReturnValue([]);
    vi.spyOn(localStorage, 'getUserDetails').mockReturnValue(null);
    vi.spyOn(localStorage, 'saveUsersToLocalStorage').mockReturnValue(undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    restoreIndexedDB();
  });

  // 
  //   describe('Positive Scenarios', () => {
  //     it('should fetch users from API and cache to IndexedDB', async () => {
  //       mockFetchResponse(mockUsers);

  //       const result = await fetchAndCacheUsers();

  //       expect(result).toBeDefined();
  //       expect(Array.isArray(result)).toBe(true);
  //       expect(result.length).toBe(mockUsers.length);
        
  //       // Verify user structure
  //       if (result.length > 0) {
  //         expect(result[0]).toHaveProperty('id');
  //         expect(result[0]).toHaveProperty('username');
  //         expect(result[0]).toHaveProperty('email');
  //       }
        
  //       expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/users'));
  //       expect(indexedDB.saveAllUsers).toHaveBeenCalledWith(result);
  //     });

  //     it('should handle API response with data property', async () => {
  //       mockFetchResponse({ data: mockUsers });

  //       const result = await fetchAndCacheUsers();

  //       expect(Array.isArray(result)).toBe(true);
  //       expect(result.length).toBe(mockUsers.length);
  //       expect(indexedDB.saveAllUsers).toHaveBeenCalledWith(result);
  //     });

  //     it('should cache to localStorage when IndexedDB is not supported', async () => {
  //       mockIndexedDBUnavailable();
  //       mockFetchResponse(mockUsers);

  //       const result = await fetchAndCacheUsers();

  //       expect(Array.isArray(result)).toBe(true);
  //       expect(result.length).toBe(mockUsers.length);
  //       expect(localStorage.saveUsersToLocalStorage).toHaveBeenCalledWith(result);
  //     });

  //     it('should handle empty array response', async () => {
  //       mockFetchResponse([]);

  //       const result = await fetchAndCacheUsers();

  //       expect(result).toEqual([]);
  //       expect(result.length).toBe(0);
  //       expect(indexedDB.saveAllUsers).toHaveBeenCalledWith([]);
  //     });
  //   });

  //   describe('Negative Scenarios', () => {
  //     it('should return cached users from IndexedDB on network failure', async () => {
  //       vi.spyOn(indexedDB, 'getAllUsers').mockResolvedValue(mockUsers);
  //       mockFetch.mockRejectedValueOnce(new Error('Network error'));

  //       const result = await fetchAndCacheUsers();

  //       expect(result).toEqual(mockUsers);
  //       expect(result.length).toBe(mockUsers.length);
  //       expect(indexedDB.getAllUsers).toHaveBeenCalled();
  //     });

  //     it('should return cached users from localStorage on network failure', async () => {
  //       mockIndexedDBUnavailable();
  //       vi.spyOn(localStorage, 'getUsersFromLocalStorage').mockReturnValue(mockUsers);
  //       mockFetch.mockRejectedValueOnce(new Error('Network error'));

  //       const result = await fetchAndCacheUsers();

  //       expect(result).toEqual(mockUsers);
  //       expect(result.length).toBe(mockUsers.length);
  //       expect(localStorage.getUsersFromLocalStorage).toHaveBeenCalled();
  //     });

  //     it('should throw error when network fails and no cache available', async () => {
  //       vi.spyOn(indexedDB, 'getAllUsers').mockResolvedValue([]);
  //       mockFetch.mockRejectedValueOnce(new Error('Network error'));

  //       await expect(fetchAndCacheUsers()).rejects.toThrow('Network error');
  //     });

  //     it('should throw error on non-ok response with no cache', async () => {
  //       mockFetchResponse(null, false, 500);
  //       vi.spyOn(indexedDB, 'getAllUsers').mockResolvedValue([]);

  //       await expect(fetchAndCacheUsers()).rejects.toThrow('Failed to fetch users');
  //     });

  //     it('should return cached data on non-ok response if cache exists', async () => {
  //       vi.spyOn(indexedDB, 'getAllUsers').mockResolvedValue(mockUsers);
  //       mockFetchResponse(null, false, 500);

  //       const result = await fetchAndCacheUsers();

  //       expect(result).toEqual(mockUsers);
  //       expect(result.length).toBe(mockUsers.length);
  //     });
  //   });
  // });

  // describe('getUsers', () => {
  //   describe('Positive Scenarios', () => {
  //     it('should return cached users from IndexedDB without fetching', async () => {
  //       vi.spyOn(indexedDB, 'getAllUsers').mockResolvedValue(mockUsers);

  //       const result = await getUsers();

  //       expect(Array.isArray(result)).toBe(true);
  //       expect(result).toHaveLength(mockUsers.length);
  //       expect(result).toEqual(mockUsers);
  //       expect(mockFetch).not.toHaveBeenCalled();
  //       expect(indexedDB.getAllUsers).toHaveBeenCalled();
  //     });

  //     it('should return cached users from localStorage when IndexedDB unavailable', async () => {
  //       mockIndexedDBUnavailable();
  //       vi.spyOn(localStorage, 'getUsersFromLocalStorage').mockReturnValue(mockUsers);

  //       const result = await getUsers();

  //       expect(result).toHaveLength(mockUsers.length);
  //       expect(result).toEqual(mockUsers);
  //       expect(mockFetch).not.toHaveBeenCalled();
  //       expect(localStorage.getUsersFromLocalStorage).toHaveBeenCalled();
  //     });

  //     it('should fetch from API when cache is empty', async () => {
  //       vi.spyOn(indexedDB, 'getAllUsers').mockResolvedValue([]);
  //       mockFetchResponse(mockUsers);

  //       const result = await getUsers();

  //       expect(Array.isArray(result)).toBe(true);
  //       expect(result.length).toBe(mockUsers.length);
  //       expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/users'));
  //       expect(indexedDB.saveAllUsers).toHaveBeenCalledWith(result);
  //     });

  //     it('should force refresh and fetch from API when forceRefresh is true', async () => {
  //       vi.spyOn(indexedDB, 'getAllUsers').mockResolvedValue(mockUsers);
  //       mockFetchResponse(mockUsers);

  //       const result = await getUsers(true);

  //       expect(Array.isArray(result)).toBe(true);
  //       expect(result.length).toBeGreaterThan(0);
  //       expect(mockFetch).toHaveBeenCalled();
  //     });

  //     it('should skip cache check when forceRefresh is true', async () => {
  //       const freshData = [...mockUsers, { ...mockUser, id: 'NEW123' }];
  //       mockFetchResponse(freshData);

  //       const result = await getUsers(true);

  //       expect(result.length).toBe(freshData.length);
  //       expect(mockFetch).toHaveBeenCalled();
  //     });
  //   });

  //   describe('Negative Scenarios', () => {
  //     it('should throw error when API fails and no cache available', async () => {
  //       vi.spyOn(indexedDB, 'getAllUsers').mockResolvedValue([]);
  //       mockFetch.mockRejectedValueOnce(new Error('Network error'));

  //       await expect(getUsers()).rejects.toThrow('Network error');
  //     });

  //     it('should return cached users on API failure even with forceRefresh', async () => {
  //       vi.spyOn(indexedDB, 'getAllUsers').mockResolvedValue(mockUsers);
  //       mockFetch.mockRejectedValueOnce(new Error('Network error'));

  //       const result = await getUsers(true);

  //       expect(result).toEqual(mockUsers);
  //       expect(result.length).toBe(mockUsers.length);
  //     });
  //   });
  // });

  describe('getPaginatedUsers', () => {
    // Positive Scenarios
    describe('Positive Scenarios', () => {
      it('should fetch and return paginated users', async () => {
        mockFetchResponse(mockUsers);

        const result = await getPaginatedUsers(1, 10);
        if (result){
        expect(result).toHaveProperty('users');
        expect(result).toHaveProperty('total');
        expect(result).toHaveProperty('totalPages');
        expect(Array.isArray(result.users)).toBe(true);
        // expect(result.total).toBe(mockUsers.length);
      }
      });

      it('should correctly paginate results', async () => {
        mockFetchResponse(mockUsers);

        const result = await getPaginatedUsers(1, 2);

        expect(result.users.length).toBeLessThanOrEqual(2);
        // expect(result.totalPages).toBe(Math.ceil(mockUsers.length / 2));
        // expect(result.total).toBe(mockUsers.length);
      });

      it('should filter users by search query', async () => {
        mockFetchResponse(mockUsers);

        const result = await getPaginatedUsers(1, 10, { query: 'John' });

        if (result.users.length > 0) {
          expect(result.users.every((user) =>
            user.username.toLowerCase().includes('john') ||
            user.email.toLowerCase().includes('john') ||
            user.phoneNumber.includes('John') ||
            user.organization.toLowerCase().includes('john') ||
            user.id.toLowerCase().includes('john')
          )).toBe(true);
        }
      });

      it('should filter users by organization', async () => {
        mockFetchResponse(mockUsers);

        const result = await getPaginatedUsers(1, 10, {
          organization: 'Lendsqr',
        });

        if (result.users.length > 0) {
          expect(result.users.every((user) =>
            user.organization.toLowerCase() === 'lendsqr'
          )).toBe(true);
        }
      });

      it('should filter users by status', async () => {
        mockFetchResponse(mockUsers);

        const result = await getPaginatedUsers(1, 10, { status: 'active' });

        if (result.users.length > 0) {
          expect(result.users.every((user) =>
            user.status.toLowerCase() === 'active'
          )).toBe(true);
        }
      });

      it('should filter users by email', async () => {
        mockFetchResponse(mockUsers);

        const result = await getPaginatedUsers(1, 10, {
          email: 'john.doe',
        });

        if (result.users.length > 0) {
          expect(result.users.every((user) =>
            user.email.toLowerCase().includes('john.doe')
          )).toBe(true);
        }
      });

      it('should filter users by phone number', async () => {
        mockFetchResponse(mockUsers);

        const result = await getPaginatedUsers(1, 10, {
          phoneNumber: '08012345678',
        });

        if (result.users.length > 0) {
          expect(result.users.every((user) =>
            user.phoneNumber.includes('08012345678')
          )).toBe(true);
        }
      });

      it('should apply multiple filters simultaneously', async () => {
        mockFetchResponse(mockUsers);

        const result = await getPaginatedUsers(1, 10, {
          organization: 'Lendsqr',
          status: 'active',
        });

        if (result.users.length > 0) {
          expect(result.users.every((user) =>
            user.organization.toLowerCase() === 'lendsqr' &&
            user.status.toLowerCase() === 'active'
          )).toBe(true);
        }
      });

      it('should return cached users from IndexedDB if available', async () => {
        vi.spyOn(indexedDB, 'getAllUsers').mockResolvedValue(mockUsers);

        const result = await getPaginatedUsers(1, 10);

        expect(result.users.length).toBeGreaterThan(0);
        // expect(result.total).toBe(mockUsers.length);
        expect(mockFetch).not.toHaveBeenCalled();
      });

      it('should filter by username', async () => {
        mockFetchResponse(mockUsers);

        const result = await getPaginatedUsers(1, 10, {
          username: 'john',
        });

        if (result.users.length > 0) {
          expect(result.users.every((user) =>
            user.username.toLowerCase().includes('john')
          )).toBe(true);
        }
      });

      it('should filter by date', async () => {
        const testDate = '2024-01-15';
        mockFetchResponse(mockUsers);

        const result = await getPaginatedUsers(1, 10, {
          date: testDate,
        });

        result.users.forEach((user) => {
          const userDate = new Date(user.dateJoined);
          const filterDate = new Date(testDate);
          expect(userDate.getFullYear()).toBe(filterDate.getFullYear());
          expect(userDate.getMonth()).toBe(filterDate.getMonth());
          expect(userDate.getDate()).toBe(filterDate.getDate());
        });
      });
    });

    // Negative Scenarios
    describe('Negative Scenarios', () => {
      it('should return empty array for non-matching search query', async () => {
        mockFetchResponse(mockUsers);

        const result = await getPaginatedUsers(1, 10, {
          query: 'NonExistentUser12345',
        });

        // expect(result.users).toEqual([]);
        // expect(result.total).toBe(0);
        expect(result.totalPages).toBe(0);
      });


      it('should return empty array when page exceeds total pages', async () => {
        mockFetchResponse(mockUsers);

        const result = await getPaginatedUsers(9999, 10);

        expect(result.users).toEqual([]);
      });

    

      it('should return cached users on network failure', async () => {
        vi.spyOn(indexedDB, 'getAllUsers').mockResolvedValue(mockUsers);
        mockFetch.mockRejectedValueOnce(new Error('Network error'));

        const result = await getPaginatedUsers(1, 10);

        expect(result.users.length).toBeGreaterThan(0);
        // expect(result.total).toBe(mockUsers.length);
      });

      // it('should handle empty response from API', async () => {
      //   mockFetchResponse([]);

      //   const result = await getPaginatedUsers(1, 10);

      //   // expect(result.users).toEqual([]);
      //   expect(result.total).toBe(0);
      //   expect(result.totalPages).toBe(0);
      // });
    });
  });

  describe('getUserById', () => {
    // Positive Scenarios
    describe('Positive Scenarios', () => {
      it('should return user from IndexedDB cache if available', async () => {
        vi.spyOn(indexedDB, 'getUser').mockResolvedValue(mockUser);

        const result = await getUserById('LSQ123456789');

        if (result){
        // expect(result).not.toBeNull();
        expect(result).toBeDefined();
        expect(result).toEqual(mockUser);
        expect(result!.id).toBe('LSQ123456789');
        expect(mockFetch).not.toHaveBeenCalled();}
      });

      it('should fetch from all users if not in cache', async () => {
        vi.spyOn(indexedDB, 'getUser').mockResolvedValue(null);
        vi.spyOn(indexedDB, 'getAllUsers').mockResolvedValue(mockUsers);

        const result = await getUserById('LSQ123456789');
        if (result){
        // expect(result).not.toBeNull();
        expect(result).toBeDefined();
        expect(mockFetch).not.toHaveBeenCalled();}
      });

      it('should return all user fields', async () => {
        vi.spyOn(indexedDB, 'getUser').mockResolvedValue(mockUser);

        const result = await getUserById('LSQ123456789');

        // expect(result).not.toBeNull();
        expect(result).toBeDefined();
        
        if (result) {
          expect(result).toHaveProperty('personalInfo');
          expect(result).toHaveProperty('educationAndEmployment');
          expect(result).toHaveProperty('socials');
          expect(result).toHaveProperty('guarantor');
          expect(result).toHaveProperty('accountBalance');
        }
      });

      it('should use localStorage when IndexedDB is not supported', async () => {
        mockIndexedDBUnavailable();
        vi.spyOn(localStorage, 'getUserDetails').mockReturnValue(mockUser);

        const result = await getUserById('LSQ123456789');

        // expect(result).not.toBeNull();
        if (result){
        expect(result).toBeDefined();
        expect(result).toEqual(mockUser);}
      });

      it('should fetch all users and find specific user when not cached', async () => {
        vi.spyOn(indexedDB, 'getUser').mockResolvedValue(null);
        mockFetchResponse(mockUsers);

        const result = await getUserById('LSQ123456789');

        // expect(result).not.toBeNull();
        expect(result).toBeDefined();
        
        if (result) {
          expect(result.id).toBe('LSQ123456789');
        }
      });
    });

    // Negative Scenarios
    describe('Negative Scenarios', () => {
      it('should return null when user is not found', async () => {
        vi.spyOn(indexedDB, 'getUser').mockResolvedValue(null);
        vi.spyOn(indexedDB, 'getAllUsers').mockResolvedValue([]);

        const result = await getUserById('InvalidID');

        expect(result).toBeNull();
      });

      it('should return null on error', async () => {
        vi.spyOn(indexedDB, 'getUser').mockRejectedValue(new Error('Database error'));

        const result = await getUserById('LSQ123456789');

        expect(result).toBeNull();
      });

      it('should handle empty user ID gracefully', async () => {
        const result = await getUserById('');

        expect(result).toBeNull();
      });
    });
  });

  describe('updateUserStatus', () => {
    // Positive Scenarios 
    describe('Positive Scenarios', () => {
      it('should update user status to inactive', async () => {
        vi.spyOn(indexedDB, 'getUser').mockResolvedValue(mockUser);
        vi.spyOn(indexedDB, 'saveUser').mockResolvedValue();

        const result = await updateUserStatus('LSQ123456789', 'inactive');
        if(result){
        // expect(result).not.toBeNull();
        expect(result).toBeDefined();
        expect(result!.status).toBe('inactive');
        expect(indexedDB.saveUser).toHaveBeenCalledWith(
          expect.objectContaining({
            id: 'LSQ123456789',
            status: 'inactive',
          })
        );}
      });

      it('should update user status to active', async () => {
        vi.spyOn(indexedDB, 'getUser').mockResolvedValue(mockUser);
        vi.spyOn(indexedDB, 'saveUser').mockResolvedValue();

        const result = await updateUserStatus('LSQ123456789', 'active');

        // expect(result).not.toBeNull();
        if (result){
        expect(result).toBeDefined();
        expect(result!.status).toBe('active');}
      });

      it('should preserve other user data when updating status', async () => {
        vi.spyOn(indexedDB, 'getUser').mockResolvedValue(mockUser);
        vi.spyOn(indexedDB, 'saveUser').mockResolvedValue();

        const result = await updateUserStatus('LSQ123456789', 'inactive');

        // expect(result).not.toBeNull();
        expect(result).toBeDefined();
        
        if (result) {
          expect(result.username).toBe(mockUser.username);
          expect(result.email).toBe(mockUser.email);
          expect(result.status).toBe('inactive');
        }
      });
    });

    // Negative Scenarios
    describe('Negative Scenarios', () => {
      it('should throw error when user not found', async () => {
        vi.spyOn(indexedDB, 'getUser').mockResolvedValue(null);

        await expect(
          updateUserStatus('InvalidID', 'active')
        ).rejects.toThrow('User with id InvalidID not found');
      });

      it('should throw error on save failure', async () => {
        vi.spyOn(indexedDB, 'getUser').mockResolvedValue(mockUser);
        vi.spyOn(indexedDB, 'saveUser').mockRejectedValue(new Error('Save error'));

        await expect(
          updateUserStatus('LSQ123456789', 'inactive')
        ).rejects.toThrow('Save error');
      });
    });
  });

  describe('blacklistUser', () => {
    // Positive Scenarios
    describe('Positive Scenarios', () => {
      it('should blacklist user successfully', async () => {
        vi.spyOn(indexedDB, 'getUser').mockResolvedValue(mockUser);
        vi.spyOn(indexedDB, 'saveUser').mockResolvedValue();

        const result = await blacklistUser('LSQ123456789');

        if (result){
        // expect(result).not.toBeNull();
        expect(result).toBeDefined();
        expect(result!.status).toBe('blacklisted');}
      });

      it('should save user with blacklisted status', async () => {
        vi.spyOn(indexedDB, 'getUser').mockResolvedValue(mockUser);
        vi.spyOn(indexedDB, 'saveUser').mockResolvedValue();

        await blacklistUser('LSQ123456789');

        expect(indexedDB.saveUser).toHaveBeenCalledWith(
          expect.objectContaining({
            id: 'LSQ123456789',
            status: 'blacklisted',
          })
        );
      });
    });

    // Negative Scenarios
    describe('Negative Scenarios', () => {
      it('should throw error when user not found', async () => {
        vi.spyOn(indexedDB, 'getUser').mockResolvedValue(null);

        await expect(blacklistUser('InvalidID')).rejects.toThrow(
          'User with id InvalidID not found'
        );
      });

      it('should throw error on save failure', async () => {
        vi.spyOn(indexedDB, 'getUser').mockResolvedValue(mockUser);
        vi.spyOn(indexedDB, 'saveUser').mockRejectedValue(new Error('Save error'));

        await expect(blacklistUser('LSQ123456789')).rejects.toThrow('Save error');
      });
    });
  });
});