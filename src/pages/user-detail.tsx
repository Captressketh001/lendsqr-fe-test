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
            variant="outlined-primary"
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
                <img src="/user-detail.svg"/>
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
      <div className="user-info-card">
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
    </main>
  );
};

export default UserDetails;
