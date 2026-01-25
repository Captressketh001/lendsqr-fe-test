import { useState } from 'react';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    console.log('Login submitted', { email, password });
  };

  return (
  
    <div className="login-container">
      <div className="left-section">
        <div className="logo">
          <img src='/logo.svg'/>
        </div>
        
        <div className="illustration">
          <img 
            src="/illustrative-img.svg"
            alt="Login illustration"
          />
        </div>
      </div>

      <div className="right-section">
        <div className="login-form-container">
          <h1 className="welcome-text">Welcome!</h1>
          <p className="subtitle">Enter details to login.</p>

          <div className="form-content">
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group password-group">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
              />
              <button
                type="button"
                className="show-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'HIDE' : 'SHOW'}
              </button>
            </div>

            <a href="#" className="forgot-password">
              FORGOT PASSWORD?
            </a>

            <button onClick={handleSubmit} className="login-button">
              LOG IN
            </button>
          </div>
        </div>
      </div>

      {/* <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Avenir Next', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .login-container {
          display: flex;
          min-height: 100vh;
          background: #fff;
        }

        .left-section {
          flex: 1;
          padding: 60px 80px;
          display: flex;
          flex-direction: column;
          background: #fff;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 80px;
        }

        .logo svg {
          width: 32px;
          height: 32px;
        }

        .logo-text {
          font-size: 28px;
          font-weight: 700;
          color: #213F7D;
        }

        .illustration {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 600px;
        }

        .illustration img {
          width: 100%;
          max-width: 500px;
          height: auto;
        }

        .right-section {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          background: #fff;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.04);
        }

        .login-form-container {
          width: 100%;
          max-width: 450px;
        }

        .welcome-text {
          font-size: 40px;
          font-weight: 700;
          color: #213F7D;
          margin-bottom: 12px;
        }

        .subtitle {
          font-size: 20px;
          color: #545F7D;
          margin-bottom: 60px;
          font-weight: 400;
        }

        .form-content {
          width: 100%;
        }

        .form-group {
          margin-bottom: 24px;
          position: relative;
        }

        .form-input {
          width: 100%;
          height: 50px;
          padding: 16px 20px;
          border: 2px solid #545F7D;
          border-radius: 5px;
          font-size: 16px;
          outline: none;
          transition: border-color 0.3s;
          font-family: inherit;
        }

        .form-input:focus {
          border-color: #39CDCC;
        }

        .form-input::placeholder {
          color: #A3A3A3;
        }

        .password-group {
          position: relative;
        }

        .show-password {
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #39CDCC;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          letter-spacing: 0.5px;
        }

        .forgot-password {
          display: block;
          color: #39CDCC;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 30px;
          letter-spacing: 0.5px;
        }

        .login-button {
          width: 100%;
          height: 48px;
          padding: 16px;
          background: #39CDCC;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .login-button:hover {
          background: #2DB8B7;
        }

        .login-button:active {
          transform: translateY(1px);
        }

        @media (max-width: 1024px) {
          .left-section {
            padding: 40px 50px;
          }

          .illustration {
            max-width: 450px;
          }

          .welcome-text {
            font-size: 36px;
          }

          .subtitle {
            font-size: 18px;
            margin-bottom: 40px;
          }
        }

        @media (max-width: 768px) {
          .login-container {
            flex-direction: column;
          }

          .left-section {
            padding: 30px 24px;
            min-height: auto;
          }

          .logo {
            margin-bottom: 40px;
          }

          .illustration {
            max-width: 350px;
            margin: 0 auto;
          }

          .right-section {
            padding: 40px 24px;
            box-shadow: none;
          }

          .welcome-text {
            font-size: 32px;
          }

          .subtitle {
            font-size: 16px;
          }

          .login-form-container {
            max-width: 100%;
          }
        }

        @media (max-width: 480px) {
          .left-section {
            padding: 24px 20px;
          }

          .logo-text {
            font-size: 24px;
          }

          .illustration {
            max-width: 280px;
          }

          .welcome-text {
            font-size: 28px;
          }

          .subtitle {
            font-size: 14px;
            margin-bottom: 30px;
          }

          .form-input {
            padding: 14px 16px;
            font-size: 14px;
          }

          .login-button {
            padding: 14px;
            font-size: 14px;
          }
        }
      `}</style> */}
    </div>
  );
};

export default Login;