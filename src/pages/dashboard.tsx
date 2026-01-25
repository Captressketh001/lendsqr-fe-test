
import {
  
  Users,
  UserCheck,
  
  Briefcase,
  PiggyBank,
  
  MoreVertical,
  Filter,
} from 'lucide-react';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


import StatsCard from '@/app-components/stats-card';

// Dashboard Component
const Dashboard = () => {
 

  // Data for charts
  const userGrowthData = [
    { month: 'Jan', users: 4000, loans: 2400 },
    { month: 'Feb', users: 3000, loans: 1398 },
    { month: 'Mar', users: 2000, loans: 9800 },
    { month: 'Apr', users: 2780, loans: 3908 },
    { month: 'May', users: 1890, loans: 4800 },
    { month: 'Jun', users: 2390, loans: 3800 },
  ];

  const loanStatusData = [
    { name: 'Active', value: 400, color: '#39CD62' },
    { name: 'Pending', value: 300, color: '#E9B200' },
    { name: 'Rejected', value: 200, color: '#E4033B' },
    { name: 'Completed', value: 278, color: '#39CDCC' },
  ];

  const recentTransactions = [
    { id: 1, user: 'Adedeji Afolabi', type: 'Loan Disbursement', amount: '₦500,000', status: 'completed', date: 'May 15, 2024' },
    { id: 2, user: 'Grace Effiom', type: 'Savings Deposit', amount: '₦150,000', status: 'completed', date: 'May 15, 2024' },
    { id: 3, user: 'Tosin Dokunmu', type: 'Loan Repayment', amount: '₦75,000', status: 'pending', date: 'May 14, 2024' },
    { id: 4, user: 'Debby Ogana', type: 'Loan Request', amount: '₦300,000', status: 'pending', date: 'May 14, 2024' },
  ];

  return (
    // <div className="dashboard-layout">
    //   <div className="main-wrapper">
        <main className="main-content">
          <h1 className="page-title">Dashboard</h1>

          {/* Stats Grid */}
          <div className="stats-grid">
            <StatsCard
              icon={<Users size={24} />}
              label="TOTAL USERS"
              value="2,453"
              iconColor="#DF18FF"
              iconBgColor="#FFF0FF"
              trend={{ value: 12.5, isPositive: true }}
            />
            <StatsCard
              icon={<UserCheck size={24} />}
              label="ACTIVE USERS"
              value="2,453"
              iconColor="#5718FF"
              iconBgColor="#EDE5FF"
              trend={{ value: 8.3, isPositive: true }}
            />
            <StatsCard
              icon={<Briefcase size={24} />}
              label="USERS WITH LOANS"
              value="12,453"
              iconColor="#F55F44"
              iconBgColor="#FFE5E0"
              trend={{ value: 3.2, isPositive: false }}
            />
            <StatsCard
              icon={<PiggyBank size={24} />}
              label="USERS WITH SAVINGS"
              value="102,453"
              iconColor="#FF3366"
              iconBgColor="#FFE5EC"
              trend={{ value: 15.7, isPositive: true }}
            />
          </div>

          {/* Charts Section */}
          <div className="charts-section">
            <div className="chart-card">
              <div className="chart-header">
                <h3>User Growth & Loan Trends</h3>
                <button className="chart-filter-btn">
                  <Filter size={16} />
                  Last 6 Months
                </button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                  <XAxis dataKey="month" stroke="#545F7D" />
                  <YAxis stroke="#545F7D" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="users" stroke="#39CDCC" strokeWidth={2} />
                  <Line type="monotone" dataKey="loans" stroke="#213F7D" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-card">
              <div className="chart-header">
                <h3>Loan Status Distribution</h3>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={loanStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${percent && (percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {loanStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="transactions-section">
            <div className="section-header">
              <h3>Recent Transactions</h3>
              <a href="#" className="view-all-link">View All</a>
            </div>
            <div className="transactions-table">
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>{transaction.user}</td>
                      <td>{transaction.type}</td>
                      <td className="amount">{transaction.amount}</td>
                      <td>{transaction.date}</td>
                      <td>
                        <span className={`status-badge ${transaction.status}`}>
                          {transaction.status === 'completed' ? 'Completed' : 'Pending'}
                        </span>
                      </td>
                      <td>
                        <button className="action-btn">
                          <MoreVertical size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Work Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: #FBFBFB;
          overflow-x: hidden;
        }

        .dashboard-layout {
          display: flex;
          min-height: 100vh;
        }

        /* Sidebar Styles */
        .sidebar {
          width: 283px;
          background: #FFFFFF;
          border-right: 1px solid #E5E5E5;
          height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          overflow-y: auto;
          transition: transform 0.3s ease;
          z-index: 1000;
          box-shadow: 0 0 40px rgba(0, 0, 0, 0.05);
          padding-top: 30px;
        }

        .sidebar::-webkit-scrollbar {
          width: 6px;
        }

        .sidebar::-webkit-scrollbar-track {
          background: transparent;
        }

        .sidebar::-webkit-scrollbar-thumb {
          background: #D4D4D4;
          border-radius: 3px;
        }

        .sidebar-close-btn {
          display: none;
          position: absolute;
          top: 20px;
          right: 20px;
          background: none;
          border: none;
          color: #213F7D;
          cursor: pointer;
          z-index: 10;
        }

        .sidebar-organization {
          padding: 0 30px 30px;
        }

        .organization-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0;
          background: none;
          border: none;
          color: #213F7D;
          font-size: 16px;
          cursor: pointer;
          font-family: inherit;
        }

        .organization-btn svg:last-child {
          margin-left: auto;
        }

        .sidebar-nav {
          padding-bottom: 30px;
        }

        .sidebar-section {
          margin-bottom: 30px;
        }

        .sidebar-section-title {
          font-size: 12px;
          color: #545F7D;
          font-weight: 500;
          padding: 0 30px;
          margin-bottom: 10px;
          letter-spacing: 0.5px;
        }

        .sidebar-menu {
          list-style: none;
        }

        .sidebar-menu-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 30px;
          background: none;
          border: none;
          border-left: 3px solid transparent;
          color: #213F7D;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
          text-align: left;
          opacity: 0.6;
        }

        .sidebar-menu-item:hover {
          opacity: 1;
          background: rgba(33, 63, 125, 0.02);
        }

        .sidebar-menu-item.active {
          background: rgba(57, 205, 204, 0.06);
          border-left-color: #39CDCC;
          opacity: 1;
        }

        .menu-icon {
          display: flex;
          align-items: center;
          color: #213F7D;
        }

        .menu-label {
          flex: 1;
        }

        .sidebar-version {
          padding: 30px;
          color: #213F7D;
          font-size: 12px;
          opacity: 0.4;
          text-align: center;
          border-top: 1px solid #E5E5E5;
        }

        .sidebar-overlay {
          display: none;
        }

        /* Header Styles */
        .header {
          height: 100px;
          background: #FFFFFF;
          border-bottom: 1px solid #E5E5E5;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 999;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
        }

        .header-content {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 30px;
          max-width: 100%;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 40px;
          flex: 1;
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          color: #213F7D;
          cursor: pointer;
          padding: 8px;
          margin-right: 12px;
        }

        .header-logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .logo-text {
          font-size: 28px;
          font-weight: 700;
          color: #213F7D;
        }

        .header-search {
          display: flex;
          max-width: 400px;
          flex: 1;
          background: #FFFFFF;
          border: 1px solid #E5E5E5;
          border-radius: 8px;
          overflow: hidden;
        }

        .search-input {
          flex: 1;
          border: none;
          outline: none;
          padding: 12px 16px;
          font-size: 14px;
          color: #213F7D;
          font-family: inherit;
        }

        .search-input::placeholder {
          color: #9CA3AF;
        }

        .search-btn {
          background: #39CDCC;
          border: none;
          padding: 0 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 40px;
        }

        .header-link {
          color: #213F7D;
          text-decoration: underline;
          font-size: 16px;
        }

        .header-icon-btn {
          background: none;
          border: none;
          color: #213F7D;
          cursor: pointer;
          padding: 8px;
          display: flex;
          align-items: center;
          border-radius: 50%;
        }

        .header-user {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        .user-name {
          color: #213F7D;
          font-size: 16px;
          font-weight: 500;
        }

        /* Main Content */
        .main-wrapper {
          flex: 1;
          margin-left: 283px;
          margin-top: 100px;
          min-height: calc(100vh - 100px);
          display: flex;
          flex-direction: column;
        }

        .main-content {
          
          background: #FBFBFB;
        }

        .page-title {
          font-size: 24px;
          color: #213F7D;
          margin-bottom: 40px;
          font-weight: 500;
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 26px;
          margin-bottom: 40px;
        }

        .stats-card {
          background: #FFFFFF;
          border: 1px solid #E5E5E5;
          border-radius: 4px;
          padding: 30px;
          transition: all 0.3s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
        }

        .stats-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transform: translateY(-2px);
        }

        .icon-wrapper {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 14px;
        }

        .label {
          font-size: 14px;
          color: #545F7D;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 12px;
          font-weight: 500;
        }

        .stats-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .value {
          font-size: 24px;
          color: #213F7D;
          font-weight: 600;
        }

        .trend {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 14px;
          font-weight: 500;
        }

        .trend.positive {
          color: #39CD62;
        }

        .trend.negative {
          color: #E4033B;
        }

        /* Charts Section */
        .charts-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 26px;
          margin-bottom: 40px;
        }

        .chart-card {
          background: #FFFFFF;
          border: 1px solid #E5E5E5;
          border-radius: 4px;
          padding: 30px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
        }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .chart-header h3 {
          font-size: 18px;
          color: #213F7D;
          font-weight: 500;
        }

        .chart-filter-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: #F5F5F7;
          border: 1px solid #E5E5E5;
          border-radius: 6px;
          color: #545F7D;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .chart-filter-btn:hover {
          background: #EBEBED;
        }

        /* Transactions Section */
        .transactions-section {
          background: #FFFFFF;
          border: 1px solid #E5E5E5;
          border-radius: 4px;
          padding: 30px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .section-header h3 {
          font-size: 18px;
          color: #213F7D;
          font-weight: 500;
        }

        .view-all-link {
          color: #39CDCC;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
        }

        .transactions-table {
          overflow-x: auto;
        }

        .transactions-table table {
          width: 100%;
          border-collapse: collapse;
        }

        .transactions-table th {
          text-align: left;
          padding: 16px 20px;
          font-size: 12px;
          color: #545F7D;
          font-weight: 500;
          border-bottom: 1px solid #E5E5E5;
          letter-spacing: 0.5px;
        }

        .transactions-table td {
          padding: 20px;
          color: #545F7D;
          font-size: 14px;
          border-bottom: 1px solid #EDF1F7;
        }

        .transactions-table tr:hover {
          background: #FAFAFA;
        }

        .amount {
          font-weight: 600;
          color: #213F7D;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          padding: 6px 16px;
          border-radius: 100px;
          font-size: 14px;
          font-weight: 400;
        }

        .status-badge.completed {
          background: rgba(57, 205, 98, 0.06);
          color: #39CD62;
        }

        .status-badge.pending {
          background: rgba(233, 178, 0, 0.06);
          color: #E9B200;
        }

        .action-btn {
          background: none;
          border: none;
          color: #545F7D;
          cursor: pointer;
          padding: 4px;
        }

        /* Responsive Styles */
        @media (max-width: 1024px) {
          .main-wrapper {
            margin-left: 0;
          }

          .sidebar {
            transform: translateX(-100%);
          }

          .sidebar-open {
            transform: translateX(0);
          }

          .sidebar-overlay {
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999;
          }

          .sidebar-close-btn {
            display: block;
          }

          .mobile-menu-btn {
            display: flex;
          }

          .charts-section {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .header {
            height: 80px;
          }

          .header-content {
            padding: 0 20px;
          }

          .main-wrapper {
            margin-top: 80px;
          }

          .main-content {
            padding: 20px;
          }

          .header-left {
            gap: 20px;
          }

          .header-search {
            max-width: 250px;
          }

          .user-name {
            display: none;
          }

          .header-link {
            display: none;
          }

          .stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 16px;
      }
            `}
            </style>
        </main>
    //   </div>

      
        // </div>
         );
};
export default Dashboard