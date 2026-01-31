import { UserData } from '@/interface-and-types';

export const mockUser: UserData = {
  id: 'LSQ123456789',
//   orgId: 'org123',
  username: 'John Doe',
  email: 'john.doe@lendsqr.com',
  phoneNumber: '08012345678',
  dateJoined: 'May 15, 2020 10:00 AM',
  status: 'active',
  organization: 'Lendsqr',
  personalInfo: {
    fullName: 'John Doe',
    phoneNumber: '08012345678',
    emailAddress: 'john.doe@lendsqr.com',
    bvn: '12345678901',
    gender: 'Male',
    maritalStatus: 'Single',
    children: 'None',
    typeOfResidence: "Parent's Apartment",
  },
  educationAndEmployment: {
    levelOfEducation: 'B.Sc',
    employmentStatus: 'Employed',
    sectorOfEmployment: 'FinTech',
    durationOfEmployment: '2 years',
    officeEmail: 'john@company.com',
    monthlyIncome: '₦200,000 - ₦400,000',
    loanRepayment: '40000',
  },
  socials: {
    twitter: '@johndoe',
    facebook: 'John Doe',
    instagram: '@johndoe',
  },
  guarantor: {
    fullName: 'Jane Doe',
    phoneNumber: '08087654321',
    emailAddress: 'jane@gmail.com',
    relationship: 'Sister',
  },
  accountBalance: 200000,
  accountNumber: '9912345678',
  bank: 'Providus Bank',
  lastActiveDate: 'Jan 15, 2024',
  tier: 1,
};

export const mockUsers: UserData[] = [
  mockUser,
  {
    ...mockUser,
    id: 'LSQ987654321',
    username: 'Jane Smith',
    email: 'jane.smith@irorun.com',
    status: 'inactive',
    organization: 'Irorun',
  },
  {
    ...mockUser,
    id: 'LSQ456789123',
    username: 'Bob Johnson',
    email: 'bob@lendstar.com',
    status: 'blacklisted',
    organization: 'Lendstar',
  },
];