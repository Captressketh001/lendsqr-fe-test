export interface SearchProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
}
export interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  iconColor?: string;
  iconBgColor?: string;
}
export interface PaginationProps {
  totalPages: number;
  entriesPerPage: number;
  totalEntries: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'outlined' | 'outlined-primary';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export interface BadgeProps {
  status: 'active' | 'inactive' | 'pending' | 'blacklisted';
  children: React.ReactNode;
}

export interface User {
  id: number;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: 'active' | 'inactive' | 'pending' | 'blacklisted';
}

export interface Column {
  key: keyof User;
  label: string;
  sortable?: boolean;
}

export interface DropdownItem {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

export interface DropdownProps {
  items: DropdownItem[];
  trigger?: React.ReactNode;
}

export interface FilterFormProps {
  isOpen: boolean;
  onClose: () => void;
  onFilter: (filters: FilterValues) => void;
  onReset: () => void;
}

export interface FilterValues {
  organization: string;
  username: string;
  email: string;
  date: string;
  phoneNumber: string;
  status: string;
}

export interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  path: string;
  badge?: number;
}

export interface SidebarSection {
  title?: string;
  items: SidebarItem[];
}
export interface UserData {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: "active" | "inactive" | "pending" | "blacklisted"
  organization: string;
  personalInfo: {
    fullName: string;
    phoneNumber: string;
    emailAddress: string;
    bvn: string;
    gender: string;
    maritalStatus: string;
    children: string;
    typeOfResidence: string;
  };
  educationAndEmployment: {
    levelOfEducation: string;
    employmentStatus: string;
    sectorOfEmployment: string;
    durationOfEmployment: string;
    officeEmail: string;
    monthlyIncome: string;
    loanRepayment: string;
  };
  socials: {
    twitter: string;
    facebook: string;
    instagram: string;
  };
  guarantor: {
    fullName: string;
    phoneNumber: string;
    emailAddress: string;
    relationship: string;
  };
  accountBalance: number;
  accountNumber: string;
  bank: string;
  tier: number;
  lastActiveDate: string;
}

export interface Stats {
  totalUsers: number;
  activeUsers: number;
  usersWithLoans: number;
  usersWithSavings: number;
}

export interface FilterParams {
  query?: string;
  organization?: string;
  username?: string;
  email?: string;
  phoneNumber?: string;
  status?: string;
  date?: string;
}

export type UserStatus = 'active' | 'inactive' | 'blacklisted' | 'pending';