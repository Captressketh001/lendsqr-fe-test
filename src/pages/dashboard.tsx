
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
    
        <main className="main-content">
          <h1 className="page-title">Dashboard</h1>

          
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
        
        
        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
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
          
          
          .charts-section {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          
          

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