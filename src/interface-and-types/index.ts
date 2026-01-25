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
  variant?: 'primary' | 'secondary' | 'danger' | 'outlined';
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