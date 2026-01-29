import { useState, useEffect } from "react";
import { ArrowLeft, Star } from "lucide-react";
import Button from "@/app-components/button";
import {
  getUserById,
  updateUserStatus,
  blacklistUser,
} from "@/api-services/user";
import { useParams } from "react-router-dom";
import { UserData, UserStatus } from "@/interface-and-types";
import { formatAmount } from "@/utils/lib";
import { useNavigate } from "react-router-dom";
const UserDetails = () => {
  const [activeTab, setActiveTab] = useState("General Details");
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const tabs = [
    "General Details",
    "Documents",
    "Bank Details",
    "Loans",
    "Savings",
    "App and System",
  ];

  const handleBackClick = () => {
    navigate("/users");
  };

  const handleBlacklistUser = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const result = await blacklistUser(id);
      loadUserDetails();

      console.log(result);
    } catch (err) {
      setError("Failed to load users. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const handleActivateUser = async (id: string, status: UserStatus) => {
    try {
      setLoading(true);
      setError(null);

      const result = await updateUserStatus(id, status);
      loadUserDetails();

      console.log(result);
    } catch (err) {
      setError("Failed to load users. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserDetails();
    // eslint-disable-next-line
  }, [id]);

  const loadUserDetails = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);

      console.log(`Loading details for user: ${id}`);
      const userData = await getUserById(id);

      if (userData) {
        setUser(userData);
        console.log("User details loaded from cache");
      } else {
        setError("User not found");
      }
    } catch (err) {
      setError("Failed to load user details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ padding: "40px" }}>Loading user details...</div>;
  }

  if (error || !user) {
    return (
      <div style={{ padding: "40px", color: "red" }}>
        {error || "User not found"}
      </div>
    );
  }

  return (
    <main className="main-content">
      <button className="back-btn" onClick={handleBackClick}>
        <ArrowLeft size={20} />
        <span>Back to Users</span>
      </button>
      <div className="page-header">
        <h1 className="page-title">User Details</h1>
        <div className="header-actions">
          <Button
            variant="outlined"
            onClick={() => handleBlacklistUser(user.id)}
          >
            BLACKLIST USER
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              handleActivateUser(
                user.id,
                user.status === "active" ? "inactive" : "active",
              )
            }
          >
            {user.status === "active" ? "DEACTIVATE" : "ACTIVATE"} USER
          </Button>
        </div>
      </div>
      <div className="user-summary-card">
        <div className="user-summary-content">
          <div className="user-basic-info">
            <div className="user-avatar-section">
              <div className="user-avatar">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <circle
                    cx="20"
                    cy="20"
                    r="20"
                    fill="#213F7D"
                    opacity="0.16"
                  />
                  <path
                    d="M20 20C22.7614 20 25 17.7614 25 15C25 12.2386 22.7614 10 20 10C17.2386 10 15 12.2386 15 15C15 17.7614 17.2386 20 20 20Z"
                    fill="#213F7D"
                  />
                  <path
                    d="M20 22.5C14.4772 22.5 10 26.9772 10 32.5V33H30V32.5C30 26.9772 25.5228 22.5 20 22.5Z"
                    fill="#213F7D"
                  />
                </svg>
              </div>
              <div className="user-name-section">
                <h2 className="user-name">{user.username}</h2>
                <p className="user-id">{user.id}</p>
              </div>
            </div>

            <div className="divider-vertical"></div>

            <div className="user-tier">
              <p className="tier-label">User's Tier</p>
              <div className="star-rating">
                {[...Array(3)].map((_, index) => (
                  <Star
                    key={index}
                    size={16}
                    stroke="#E9B200"
                    fill={index < user.tier ? "#E9B200" : "transparent"}
                  />
                ))}
              </div>
            </div>

            <div className="divider-vertical"></div>

            <div className="user-balance">
              <h3 className="balance-amount">
                ₦{formatAmount(user.accountBalance)}
              </h3>
              <p className="bank-info">
                {user.accountNumber}/{user.bank}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs-container">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`tab-button ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* User Information */}
      <div className="user-info-card">
        {/* Personal Information */}
        <div className="info-section">
          <h3 className="section-title">Personal Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <p className="info-label">FULL NAME</p>
              <p className="info-value">{user.username}</p>
            </div>
            <div className="info-item">
              <p className="info-label">PHONE NUMBER</p>
              <p className="info-value">{user.phoneNumber}</p>
            </div>
            <div className="info-item">
              <p className="info-label">EMAIL ADDRESS</p>
              <p className="info-value">{user.email}</p>
            </div>
            <div className="info-item">
              <p className="info-label">BVN</p>
              <p className="info-value">{user.personalInfo.bvn}</p>
            </div>
            <div className="info-item">
              <p className="info-label">GENDER</p>
              <p className="info-value">{user.personalInfo.gender}</p>
            </div>
            <div className="info-item">
              <p className="info-label">MARITAL STATUS</p>
              <p className="info-value">{user.personalInfo.maritalStatus}</p>
            </div>
            <div className="info-item">
              <p className="info-label">CHILDREN</p>
              <p className="info-value">{user.personalInfo.children}</p>
            </div>
            <div className="info-item">
              <p className="info-label">TYPE OF RESIDENCE</p>
              <p className="info-value">{user.personalInfo.typeOfResidence}</p>
            </div>
          </div>
        </div>

        <div className="section-divider"></div>

        {/* Education and Employment */}
        <div className="info-section">
          <h3 className="section-title">Education and Employment</h3>
          <div className="info-grid">
            <div className="info-item">
              <p className="info-label">LEVEL OF EDUCATION</p>
              <p className="info-value">
                {user.educationAndEmployment.levelOfEducation}
              </p>
            </div>
            <div className="info-item">
              <p className="info-label">EMPLOYMENT STATUS</p>
              <p className="info-value">
                {user.educationAndEmployment.employmentStatus}
              </p>
            </div>
            <div className="info-item">
              <p className="info-label">SECTOR OF EMPLOYMENT</p>
              <p className="info-value">
                {user.educationAndEmployment.sectorOfEmployment}
              </p>
            </div>
            <div className="info-item">
              <p className="info-label">DURATION OF EMPLOYMENT</p>
              <p className="info-value">
                {user.educationAndEmployment.durationOfEmployment}
              </p>
            </div>
            <div className="info-item">
              <p className="info-label">OFFICE EMAIL</p>
              <p className="info-value">
                {user.educationAndEmployment.officeEmail}
              </p>
            </div>
            <div className="info-item">
              <p className="info-label">MONTHLY INCOME</p>
              <p className="info-value">
                {user.educationAndEmployment.monthlyIncome}
              </p>
            </div>
            <div className="info-item">
              <p className="info-label">LOAN REPAYMENT</p>
              <p className="info-value">
                ₦{formatAmount(user.educationAndEmployment.loanRepayment)}
              </p>
            </div>
          </div>
        </div>

        <div className="section-divider"></div>

        {/* Socials */}
        <div className="info-section">
          <h3 className="section-title">Socials</h3>
          <div className="info-grid">
            <div className="info-item">
              <p className="info-label">TWITTER</p>
              <p className="info-value">{user.socials.twitter}</p>
            </div>
            <div className="info-item">
              <p className="info-label">FACEBOOK</p>
              <p className="info-value">{user.socials.facebook}</p>
            </div>
            <div className="info-item">
              <p className="info-label">INSTAGRAM</p>
              <p className="info-value">{user.socials.instagram ?? "-"}</p>
            </div>
          </div>
        </div>

        <div className="section-divider"></div>

        {/* Guarantor */}
        <div className="info-section">
          <h3 className="section-title">Guarantor</h3>
          <div className="info-grid">
            <div className="info-item">
              <p className="info-label">FULL NAME</p>
              <p className="info-value">{user.guarantor.fullName}</p>
            </div>
            <div className="info-item">
              <p className="info-label">PHONE NUMBER</p>
              <p className="info-value">{user.guarantor.phoneNumber}</p>
            </div>
            <div className="info-item">
              <p className="info-label">EMAIL ADDRESS</p>
              <p className="info-value">{user.guarantor.emailAddress}</p>
            </div>
            <div className="info-item">
              <p className="info-label">RELATIONSHIP</p>
              <p className="info-value">{user.guarantor.relationship}</p>
            </div>
          </div>
        </div>

        <div className="section-divider"></div>

        {/* Second Guarantor */}
        <div className="info-section">
          <h3 className="section-title">Guarantor</h3>
          <div className="info-grid">
            <div className="info-item">
              <p className="info-label">FULL NAME</p>
              <p className="info-value">{user.guarantor.fullName}</p>
            </div>
            <div className="info-item">
              <p className="info-label">PHONE NUMBER</p>
              <p className="info-value">{user.guarantor.phoneNumber}</p>
            </div>
            <div className="info-item">
              <p className="info-label">EMAIL ADDRESS</p>
              <p className="info-value">{user.guarantor.emailAddress}</p>
            </div>
            <div className="info-item">
              <p className="info-label">RELATIONSHIP</p>
              <p className="info-value">{user.guarantor.relationship}</p>
            </div>
          </div>
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
        }

        .user-details-page {
          padding: 20px;
          width: 100%;
          margin: 0 auto;
        }

        /* Back Button */
        .back-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          background: none;
          border: none;
          color: #545F7D;
          font-size: 16px;
          cursor: pointer;
          margin-bottom: 30px;
          transition: opacity 0.2s ease;
          font-family: inherit;
        }

        .back-btn:hover {
          opacity: 0.7;
        }

        /* Page Header */
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }

        .page-title {
          font-size: 24px;
          color: #213F7D;
          font-weight: 500;
        }

        .header-actions {
          display: flex;
          gap: 20px;
        }

        /* Button Styles */
        .btn {
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: inherit;
          letter-spacing: 0.3px;
          text-transform: uppercase;
        }

        .btn-primary {
          background: #39CDCC;
          color: #FFFFFF;
        }

        .btn-primary:hover {
          background: #2DB8B7;
        }

        .btn-outlined {
          background: transparent;
          color: #E4033B;
          border: 1px solid #E4033B;
        }

        .btn-outlined:hover {
          background: rgba(228, 3, 59, 0.05);
        }

        /* User Summary Card */
        .user-summary-card {
          background: #FFFFFF;
          border: 1px solid #E5E5E5;
          border-radius: 4px;
          margin-bottom: 30px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
        }

        .user-summary-content {
          padding: 30px;
        }

        .user-basic-info {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .user-avatar-section {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .user-avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #F5F5F7;
        }

        .user-name-section {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .user-name {
          font-size: 22px;
          color: #213F7D;
          font-weight: 500;
        }

        .user-id {
          font-size: 14px;
          color: #545F7D;
        }

        .divider-vertical {
          width: 1px;
          height: 60px;
          background: #E5E5E5;
        }

        .user-tier {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .tier-label {
          font-size: 14px;
          color: #545F7D;
          font-weight: 500;
        }

        .star-rating {
          display: flex;
          gap: 6px;
        }

        .user-balance {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .balance-amount {
          font-size: 22px;
          color: #213F7D;
          font-weight: 500;
        }

        .bank-info {
          font-size: 12px;
          color: #213F7D;
        }

        /* Tabs */
        .tabs-container {
          display: flex;
          border-top: 1px solid #E5E5E5;
        }

        .tab-button {
          flex: 1;
          padding: 16px 20px;
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          color: #545F7D;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: inherit;
          white-space: nowrap;
        }

        .tab-button:hover {
          color: #39CDCC;
        }

        .tab-button.active {
          color: #39CDCC;
          border-bottom-color: #39CDCC;
        }

        /* User Info Card */
        .user-info-card {
          background: #FFFFFF;
          border: 1px solid #E5E5E5;
          border-radius: 4px;
          padding: 30px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
        }

        .info-section {
          margin-bottom: 30px;
        }

        .info-section:last-child {
          margin-bottom: 0;
        }

        .section-title {
          font-size: 16px;
          color: #213F7D;
          font-weight: 500;
          margin-bottom: 30px;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 30px;
        }

        .info-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .info-label {
          font-size: 12px;
          color: #545F7D;
          font-weight: 500;
          letter-spacing: 0.5px;
        }

        .info-value {
          font-size: 16px;
          color: #545F7D;
          font-weight: 400;
        }

        .section-divider {
          height: 1px;
          background: #E5E5E5;
          margin: 30px 0;
        }

        /* Responsive Styles */
        @media (max-width: 1024px) {
          .user-basic-info {
            flex-wrap: wrap;
          }

          .divider-vertical {
            display: none;
          }

          .tabs-container {
            overflow-x: auto;
          }

          .tab-button {
            flex: none;
            min-width: 120px;
          }
        }

        @media (max-width: 768px) {
          .user-details-page {
            padding: 20px;
          }

          .page-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }

          .header-actions {
            width: 100%;
            flex-direction: column;
          }

          .btn {
            width: 100%;
          }

          .user-summary-content {
            padding: 20px;
          }

          .user-avatar-section {
            flex-direction: column;
            text-align: center;
          }

          .user-basic-info {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }

          .info-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        @media (max-width: 480px) {
          .user-details-page {
            padding: 16px;
          }

          .back-btn {
            font-size: 14px;
          }

          .page-title {
            font-size: 20px;
          }

          .user-name {
            font-size: 18px;
          }

          .balance-amount {
            font-size: 18px;
          }

          .user-info-card {
            padding: 20px;
          }

          .tab-button {
            font-size: 14px;
            padding: 12px 16px;
          }
        }
      `}</style>
    </main>
  );
};

export default UserDetails;
