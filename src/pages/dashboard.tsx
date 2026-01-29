import { useState, useEffect, useMemo } from "react";
import {
  UserCheck,
  ListFilter,
  Eye,
  UserX,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import StatsCard from "@/app-components/card";
import {
  getPaginatedUsers,
  updateUserStatus,
  blacklistUser,
  getUsers,
} from "@/api-services/user";
import {
  UserData,
  UserStatus,
  Column,
  FilterValues,
  FilterParams,
} from "@/interface-and-types";
import Badge from "@/app-components/badge";
import Dropdown from "@/app-components/dropdown";
import FilterForm from "@/app-components/filter";
import Pagination from "@/app-components/pagination";

const Dashboard = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [allUsers, setAllUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [filterOpen, setFilterOpen] = useState<string | null>(null);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("page_size")) || 10;

  const filters: FilterParams = {
    query: searchParams.get("query") || "",
    organization: searchParams.get("organization") || "",
    username: searchParams.get("username") || "",
    email: searchParams.get("email") || "",
    phoneNumber: searchParams.get("phone") || "",
    status: searchParams.get("status") || "",
    date: searchParams.get("date") || "",
  };

  const hasActiveFilters = Object.values(filters).some((value) => value !== "");

  const columns: Column[] = [
    { key: "organization", label: "ORGANIZATION", sortable: true },
    { key: "username", label: "USERNAME", sortable: true },
    { key: "email", label: "EMAIL", sortable: true },
    { key: "phoneNumber", label: "PHONE NUMBER", sortable: true },
    { key: "dateJoined", label: "DATE JOINED", sortable: true },
    { key: "status", label: "STATUS", sortable: true },
  ];

  const stats = useMemo(() => {
    const activeUsers = allUsers.filter((u) => u.status === "active").length;
    const usersWithLoans = allUsers.filter(
      (u) => u.accountBalance && u.accountBalance > 0,
    ).length;
    const usersWithSavings = allUsers.filter(
      (u) => u.accountBalance && u.accountBalance > 50000,
    ).length;

    return {
      totalUsers: allUsers.length,
      activeUsers,
      usersWithLoans,
      usersWithSavings,
    };
  }, [allUsers]);

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Active";
      case "inactive":
        return "Inactive";
      case "pending":
        return "Pending";
      case "blacklisted":
        return "Blacklisted";
      default:
        return status;
    }
  };

  useEffect(() => {
    loadAllUsersForStats();
  }, []);

  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line
  }, [
    currentPage,
    pageSize,
    filters.query,
    filters.organization,
    filters.username,
    filters.email,
    filters.phoneNumber,
    filters.status,
    filters.date,
  ]);

  const loadAllUsersForStats = async () => {
    try {
      const result = await getUsers();
      setAllUsers(result);
    } catch (err) {
      console.error("Failed to load users for stats:", err);
    }
  };

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await getPaginatedUsers(currentPage, pageSize, filters);
      setUsers(result.users);
      setTotalPages(result.totalPages);
      setTotalUsers(result.total);
    } catch (err) {
      setError("Failed to load users. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBlacklistUser = async (id: string) => {
    try {
      await blacklistUser(id);
      loadUsers();
      loadAllUsersForStats();
    } catch (err) {
      setError("Failed to blacklist user. Please try again.");
      console.error(err);
    }
  };

  const handleActivateUser = async (id: string, status: UserStatus) => {
    try {
      await updateUserStatus(id, status);
      loadUsers();
      loadAllUsersForStats();
    } catch (err) {
      setError("Failed to update user status. Please try again.");
      console.error(err);
    }
  };

  const handleFilter = (filterValues: FilterValues) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (filterValues.organization)
      params.set("organization", filterValues.organization);
    else params.delete("organization");

    if (filterValues.username) params.set("username", filterValues.username);
    else params.delete("username");

    if (filterValues.email) params.set("email", filterValues.email);
    else params.delete("email");

    if (filterValues.status) params.set("status", filterValues.status);
    else params.delete("status");

    if (filterValues.phoneNumber) params.set("phone", filterValues.phoneNumber);
    else params.delete("phone");

    if (filterValues.date) params.set("date", filterValues.date);
    else params.delete("date");

    navigate(`?${params.toString()}`);
    setFilterOpen(null);
  };

  const handleResetFilter = () => {
    const params = new URLSearchParams();
    params.set("page", "1");
    if (filters.query) params.set("query", filters.query);
    navigate(`?${params.toString()}`);
    setFilterOpen(null);
  };

  const handleClearAllFilters = () => {
    navigate("?page=1");
  };

  return (
    <main className="main-content">
      <h1 className="page-title">Users</h1>

      <div className="stats-grid">
        <StatsCard
          icon={<img src="dashboard-user.svg" />}
          label="USERS"
          value={stats.totalUsers.toLocaleString()}
          iconColor="#DF18FF"
          iconBgColor="#FFF0FF"
        />
        <StatsCard
          icon={<img src="active-user.svg" />}
          label="ACTIVE USERS"
          value={stats.activeUsers.toLocaleString()}
          iconColor="#5718FF"
          iconBgColor="#EDE5FF"
        />
        <StatsCard
          icon={<img src="user-with-loan.svg" />}
          label="USERS WITH LOANS"
          value={stats.usersWithLoans.toLocaleString()}
          iconColor="#F55F44"
          iconBgColor="#FFE5E0"
        />
        <StatsCard
          icon={<img src="user-with-savings.svg" />}
          label="USERS WITH SAVINGS"
          value={stats.usersWithSavings.toLocaleString()}
          iconColor="#FF3366"
          iconBgColor="#FFE5EC"
        />
      </div>

      {hasActiveFilters && (
        <div className="filters-info">
          <div className="filters-header">
            <p>Active Filters:</p>
            <button onClick={handleClearAllFilters} className="clear-all-btn">
              Clear All
            </button>
          </div>
          <div className="filters-tags">
            {filters.query && (
              <span className="filter-tag">Search: "{filters.query}"</span>
            )}
            {filters.organization && (
              <span className="filter-tag">
                Organization: {filters.organization}
              </span>
            )}
            {filters.username && (
              <span className="filter-tag">Username: {filters.username}</span>
            )}
            {filters.email && (
              <span className="filter-tag">Email: {filters.email}</span>
            )}
            {filters.phoneNumber && (
              <span className="filter-tag">Phone: {filters.phoneNumber}</span>
            )}
            {filters.status && (
              <span className="filter-tag">
                Status: {getStatusText(filters.status)}
              </span>
            )}
            {filters.date && (
              <span className="filter-tag">
                Date: {new Date(filters.date).toLocaleDateString()}
              </span>
            )}
          </div>
          <p className="results-count">
            {totalUsers} {totalUsers === 1 ? "user" : "users"} found
          </p>
        </div>
      )}

      <div className="table-container">
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading users...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <p>{error}</p>
            <button onClick={loadUsers} className="retry-btn">
              Retry
            </button>
          </div>
        ) : (
          <>
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    {columns.map((column) => (
                      <th key={column.key}>
                        <div className="th-content">
                          <span>{column.label}</span>
                          {column.sortable && (
                            <button
                              className="filter-icon-btn"
                              onClick={() =>
                                setFilterOpen(
                                  filterOpen === column.key ? null : column.key,
                                )
                              }
                              type="button"
                            >
                              <ListFilter size={14} />
                            </button>
                          )}
                          {filterOpen === column.key && (
                            <FilterForm
                              isOpen={filterOpen === column.key}
                              onClose={() => setFilterOpen(null)}
                              onFilter={handleFilter}
                              onReset={handleResetFilter}
                            />
                          )}
                        </div>
                      </th>
                    ))}
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={columns.length + 1} className="empty-state">
                        {hasActiveFilters
                          ? "No users found matching the current filters"
                          : "No users found"}
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.organization}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.phoneNumber}</td>
                        <td>{user.dateJoined}</td>
                        <td>
                          <Badge status={user.status}>
                            {getStatusText(user.status)}
                          </Badge>
                        </td>
                        <td>
                          <Dropdown
                            items={[
                              {
                                icon: <Eye size={16} />,
                                label: "View Details",
                                onClick: () => navigate(`/user/${user.id}`),
                              },
                              {
                                icon: <UserX size={16} />,
                                label: "Blacklist User",
                                onClick: () => handleBlacklistUser(user.id),
                              },
                              {
                                icon: <UserCheck size={16} />,
                                label: `${user.status === "active" ? "Deactivate User" : "Activate User"}`,
                                onClick: () =>
                                  handleActivateUser(
                                    user.id,
                                    user.status === "active"
                                      ? "inactive"
                                      : "active",
                                  ),
                              },
                            ]}
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          entriesPerPage={pageSize}
          totalEntries={totalUsers}
        />
      )}
     
    </main>
  );
};

export default Dashboard;
