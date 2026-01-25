import Badge from "./badge";
import { User, Column } from "@/interface-and-types";
import { useState } from "react";
import { ListFilter, Eye, UserX, UserCheck,  } from "lucide-react";
import Dropdown from "./dropdown";
import FilterForm from "./filter";
import { FilterValues } from "@/interface-and-types";
const Table = () => {
    
    const [filterOpen, setFilterOpen] = useState<string | null>(null);
  const [users, /*setUsers*/] = useState<User[]>([
    {
      id: 1,
      organization: 'Lendsqr',
      username: 'Adedeji',
      email: 'adedeji@lendsqr.com',
      phoneNumber: '08078903721',
      dateJoined: 'May 15, 2020 10:00 AM',
      status: 'inactive',
    },
    {
      id: 2,
      organization: 'Irorun',
      username: 'Debby Ogana',
      email: 'debby2@irorun.com',
      phoneNumber: '08160780928',
      dateJoined: 'Apr 30, 2020 10:00 AM',
      status: 'pending',
    },
    {
      id: 3,
      organization: 'Lendstar',
      username: 'Grace Effiom',
      email: 'grace@lendstar.com',
      phoneNumber: '07060780922',
      dateJoined: 'Apr 30, 2020 10:00 AM',
      status: 'blacklisted',
    },
    {
      id: 4,
      organization: 'Lendsqr',
      username: 'Tosin Dokunmu',
      email: 'tosin@lendsqr.com',
      phoneNumber: '07003309226',
      dateJoined: 'Apr 10, 2020 10:00 AM',
      status: 'pending',
    },
    {
      id: 5,
      organization: 'Lendstar',
      username: 'Grace Effiom',
      email: 'grace@lendstar.com',
      phoneNumber: '07060780922',
      dateJoined: 'Apr 30, 2020 10:00 AM',
      status: 'active',
    },
    {
      id: 6,
      organization: 'Lendsqr',
      username: 'Tosin Dokunmu',
      email: 'tosin@lendsqr.com',
      phoneNumber: '08060780900',
      dateJoined: 'Apr 10, 2020 10:00 AM',
      status: 'active',
    },
    {
      id: 7,
      organization: 'Lendstar',
      username: 'Grace Effiom',
      email: 'grace@lendstar.com',
      phoneNumber: '07060780922',
      dateJoined: 'Apr 30, 2020 10:00 AM',
      status: 'blacklisted',
    },
    {
      id: 8,
      organization: 'Lendsqr',
      username: 'Tosin Dokunmu',
      email: 'tosin@lendsqr.com',
      phoneNumber: '08060780900',
      dateJoined: 'Apr 10, 2020 10:00 AM',
      status: 'inactive',
    },
    {
      id: 9,
      organization: 'Lendstar',
      username: 'Grace Effiom',
      email: 'grace@lendstar.com',
      phoneNumber: '07060780922',
      dateJoined: 'Apr 30, 2020 10:00 AM',
      status: 'inactive',
    },
  ]);
  const handleFilter = (filters: FilterValues) => {
    console.log('Applying filters:', filters);
    // Add filter logic here
  };

  const handleResetFilter = () => {
    console.log('Resetting filters');
    // Add reset logic here
  };

  const columns: Column[] = [
    { key: 'organization', label: 'ORGANIZATION', sortable: true },
    { key: 'username', label: 'USERNAME', sortable: true },
    { key: 'email', label: 'EMAIL', sortable: true },
    { key: 'phoneNumber', label: 'PHONE NUMBER', sortable: true },
    { key: 'dateJoined', label: 'DATE JOINED', sortable: true },
    { key: 'status', label: 'STATUS', sortable: true },
  ];

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'inactive':
        return 'Inactive';
      case 'pending':
        return 'Pending';
      case 'blacklisted':
        return 'Blacklisted';
      default:
        return status;
    }
  };

  return (
    <div className="app-container">
      <h1 className="page-title">Users</h1>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key}>
                  <div className="th-content">
                    <span>{column.label}</span>
                    {column.sortable && (
                      <div
                        className="filter-icon-btn"
                        onClick={() => setFilterOpen(filterOpen === column.key ? null : column.key)}
                      >
                        <ListFilter size={14} />
                      </div>
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
            {users.map((user) => (
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
                        label: 'View Details',
                        onClick: () => console.log(`View details for ${user.username}`),
                      },
                      {
                        icon: <UserX size={16} />,
                        label: 'Blacklist User',
                        onClick: () => console.log(`Blacklist ${user.username}`),
                      },
                      {
                        icon: <UserCheck size={16} />,
                        label: 'Activate User',
                        onClick: () => console.log(`Activate ${user.username}`),
                      },
                    ]}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        .page-title {
          font-size: 24px;
          color: #213F7D;
          font-weight: 500;
          margin-bottom: 40px;
        }

        

        /* Table Styles */
        .table-container {
          background: #FFFFFF;
          border-radius: 4px;
          border: 1px solid #E5E5E5;
          overflow-x: auto;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }

        .data-table thead {
          background: #FFFFFF;
        }

        .data-table th {
          padding: 16px 20px;
          text-align: left;
          font-weight: 500;
          color: #545F7D;
          font-size: 12px;
          letter-spacing: 0.5px;
          border-bottom: 1px solid #E5E5E5;
        }

        .th-content {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .th-content svg {
          color: #545F7D;
          opacity: 0.5;
          cursor: pointer;
        }

        .data-table tbody tr {
          border-bottom: 1px solid #EDF1F7;
          transition: background 0.2s ease;
        }

        .data-table tbody tr:hover {
          background: #FAFAFA;
        }

        .data-table td {
          padding: 20px;
          color: #545F7D;
          font-size: 14px;
        }

        .action-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #545F7D;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          transition: background 0.2s ease;
        }

        .action-btn:hover {
          background: #F5F5F7;
        }

        /* Responsive */
        @media (max-width: 1200px) {
          .table-container {
            overflow-x: scroll;
          }

          .data-table {
            min-width: 1000px;
          }
        }

        @media (max-width: 768px) {
          

          .page-title {
            font-size: 20px;
            margin-bottom: 30px;
          }

          

          .data-table th,
          .data-table td {
            padding: 12px 16px;
            font-size: 13px;
          }
        }

        @media (max-width: 480px) {

          .btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};
export default Table