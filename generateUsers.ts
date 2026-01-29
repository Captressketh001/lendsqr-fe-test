import * as fs from 'fs';

interface PersonalInfo {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  bvn: string;
  gender: string;
  maritalStatus: string;
  children: string;
  typeOfResidence: string;
}

interface EducationAndEmployment {
  levelOfEducation: string;
  employmentStatus: string;
  sectorOfEmployment: string;
  durationOfEmployment: string;
  officeEmail: string;
  monthlyIncome: string;
  loanRepayment: string;
}

interface Socials {
  twitter: string;
  facebook: string;
  instagram: string;
}

interface Guarantor {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  relationship: string;
}

interface User {
  id: string;
  orgId: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: string;
  organization: string;
  personalInfo: PersonalInfo;
  educationAndEmployment: EducationAndEmployment;
  socials: Socials;
  guarantor: Guarantor;
  accountBalance: number;
  accountNumber: string;
  bank: string;
  createdAt: string;
  lastActiveDate: string;
  tier: number;
}
interface Stats {
  totalUsers: number;
  activeUsers: number;
  usersWithLoans: number;
  usersWithSavings: number;
}

interface ChartData {
  userGrowth: Array<{ month: string; users: number; loans: number }>;
  loanStatus: Array<{ name: string; value: number; color: string }>;
  recentTransactions: Array<{
    id: number;
    user: string;
    type: string;
    amount: string;
    status: string;
    date: string;
  }>;
}

interface Database {
  users: User[];
  stats: Stats;
  dashboard: ChartData;
}

function generateUsers(count: number): User[] {
  const organizations: string[] = ['Lendsqr', 'Irorun', 'Lendstar'];
  const statuses: string[] = ['active', 'inactive', 'pending', 'blacklisted'];
  const genders: string[] = ['Male', 'Female'];
  const maritalStatuses: string[] = ['Single', 'Married', 'Divorced', 'Widowed'];
  const educationLevels: string[] = ['B.Sc', 'M.Sc', 'PhD', 'HND', 'OND'];
  const employmentStatuses: string[] = ['Employed', 'Unemployed', 'Self-Employed'];
  const sectors: string[] = [
    'FinTech',
    'Agriculture',
    'Healthcare',
    'Education',
    'Technology',
    'Banking',
    'Retail'
  ];
  const residenceTypes: string[] = [
    "Parent's Apartment",
    'Rented Apartment',
    'Own House',
    'Condo'
  ];
  const relationships: string[] = [
    'Sister',
    'Brother',
    'Mother',
    'Father',
    'Friend',
    'Colleague'
  ];
  const banks: string[] = [
    'Providus Bank',
    'GTBank',
    'Access Bank',
    'Zenith Bank',
    'First Bank'
  ];

  const firstNames: string[] = [
    'Grace',
    'John',
    'Mary',
    'Peter',
    'Sarah',
    'David',
    'Ruth',
    'Daniel',
    'Esther',
    'James',
    'Deborah',
    'Michael',
    'Rebecca',
    'Joseph',
    'Rachel',
    'Samuel',
    'Hannah',
    'Benjamin',
    'Leah',
    'Matthew',
    'Adedeji',
    'Chiamaka',
    'Oluwaseun',
    'Chisom',
    'Tunde',
    'Funke',
    'Emeka',
    'Ngozi',
    'Chidi',
    'Amaka'
  ];

  const lastNames: string[] = [
    'Effiom',
    'Smith',
    'Johnson',
    'Ogana',
    'Williams',
    'Brown',
    'Jones',
    'Garcia',
    'Miller',
    'Davis',
    'Adeyemi',
    'Okonkwo',
    'Nwankwo',
    'Olaniyan',
    'Adebayo',
    'Okafor',
    'Eze',
    'Dokunmu',
    'Afolabi',
    'Chukwu'
  ];

  const getRandomItem = <T>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const formatDate = (date: Date): string => {
    return (
      date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }) +
      ' ' +
      (Math.floor(Math.random() * 12) + 1) +
      ':' +
      String(Math.floor(Math.random() * 60)).padStart(2, '0') +
      ' ' +
      (Math.random() > 0.5 ? 'AM' : 'PM')
    );
  };

  const generatePhoneNumber = (): string => {
    return `0${Math.floor(Math.random() * 900000000) + 700000000}`;
  };

  const users: User[] = [];

  for (let i = 0; i < count; i++) {
    const firstName = getRandomItem(firstNames);
    const lastName = getRandomItem(lastNames);
    const username = `${firstName} ${lastName}`;
    const organization = getRandomItem(organizations);
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${organization.toLowerCase()}.com`;

    const user: User = {
      id: `LSQ${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      orgId: Math.random().toString(36).substr(2, 9),
      username: username,
      email: email,
      phoneNumber: generatePhoneNumber(),
      dateJoined: formatDate(
        new Date(
          2019 + Math.floor(Math.random() * 6),
          Math.floor(Math.random() * 12),
          Math.floor(Math.random() * 28) + 1
        )
      ),
      status: getRandomItem(statuses),
      organization: organization,
      personalInfo: {
        fullName: username,
        phoneNumber: generatePhoneNumber(),
        emailAddress: email,
        bvn: String(Math.floor(Math.random() * 90000000000) + 10000000000),
        gender: getRandomItem(genders),
        maritalStatus: getRandomItem(maritalStatuses),
        children: getRandomItem(['None', '1', '2', '3', '4']),
        typeOfResidence: getRandomItem(residenceTypes)
      },
      educationAndEmployment: {
        levelOfEducation: getRandomItem(educationLevels),
        employmentStatus: getRandomItem(employmentStatuses),
        sectorOfEmployment: getRandomItem(sectors),
        durationOfEmployment: `${Math.floor(Math.random() * 10) + 1} years`,
        officeEmail: `${firstName.toLowerCase()}@company.com`,
        monthlyIncome: `₦${(Math.floor(Math.random() * 450) + 50) * 1000} - ₦${
          (Math.floor(Math.random() * 400) + 100) * 1000
        }`,
        loanRepayment: String(Math.floor(Math.random() * 90000) + 10000)
      },
      socials: {
        twitter: `@${username.toLowerCase().replace(' ', '_')}`,
        facebook: username,
        instagram: `@${username.toLowerCase().replace(' ', '_')}`
      },
      guarantor: {
        fullName: `${getRandomItem(firstNames)} ${getRandomItem(lastNames)}`,
        phoneNumber: generatePhoneNumber(),
        emailAddress: `${getRandomItem(firstNames).toLowerCase()}@gmail.com`,
        relationship: getRandomItem(relationships)
      },
      accountBalance: Math.floor(Math.random() * 500000),
      accountNumber: String(Math.floor(Math.random() * 9000000000) + 1000000000),
      bank: getRandomItem(banks),
      createdAt: new Date(
        2019 + Math.floor(Math.random() * 6),
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1
      ).toISOString(),
      lastActiveDate: new Date(
        2023 + Math.floor(Math.random() * 2),
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1
      ).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      tier: Math.floor(Math.random() * 3) + 1
    };

    users.push(user);
  }

  return users;
}


const db: Database = {
  users: generateUsers(500),
  stats: {
    totalUsers: 2453,
    activeUsers: 2453,
    usersWithLoans: 12453,
    usersWithSavings: 102453,
  },
  dashboard: {
    userGrowth: [
      { month: 'Jan', users: 4000, loans: 2400 },
      { month: 'Feb', users: 3000, loans: 1398 },
      { month: 'Mar', users: 2000, loans: 9800 },
      { month: 'Apr', users: 2780, loans: 3908 },
      { month: 'May', users: 1890, loans: 4800 },
      { month: 'Jun', users: 2390, loans: 3800 }
    ],
    loanStatus: [
      { name: 'Active', value: 400, color: '#39CD62' },
      { name: 'Pending', value: 300, color: '#E9B200' },
      { name: 'Rejected', value: 200, color: '#E4033B' },
      { name: 'Completed', value: 278, color: '#39CDCC' }
    ],
    recentTransactions: [
      {
        id: 1,
        user: 'Adedeji Afolabi',
        type: 'Loan Disbursement',
        amount: '₦500,000',
        status: 'completed',
        date: 'May 15, 2024'
      },
      {
        id: 2,
        user: 'Grace Effiom',
        type: 'Savings Deposit',
        amount: '₦150,000',
        status: 'completed',
        date: 'May 15, 2024'
      },
      {
        id: 3,
        user: 'Tosin Dokunmu',
        type: 'Loan Repayment',
        amount: '₦75,000',
        status: 'pending',
        date: 'May 14, 2024'
      }
    ]
  }
};

fs.writeFileSync('db.json', JSON.stringify(db, null, 2));
console.log('Generated 500 users in db.json');
console.log(`Total users: ${db.users.length}`);
console.log(`File saved: db.json`);