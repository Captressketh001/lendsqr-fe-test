import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '@/utils/schema';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    localStorage.setItem('user', JSON.stringify(data))
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Login Successful')
    setTimeout(() => {
      navigate('/dashboard')
    }, 500);
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
                {...register('email')}
                className="form-input"
              />
              {errors.email && (
                <p style={{color: 'red', fontSize: '10px'}}>{errors.email.message}</p>
              )}
            </div>

            <div className="form-group password-group">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                {...register('password')}
                className="form-input"
              />
              <button
                type="button"
                className="show-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'HIDE' : 'SHOW'}
              </button>
              {errors.password && (
                <p style={{color: 'red', fontSize: '10px'}}>{errors.password.message}</p>
              )}
            </div>
            

            <a href="#" className="forgot-password">
              FORGOT PASSWORD?
            </a>

            <button onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting} className="login-button">
              LOG IN
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Login;