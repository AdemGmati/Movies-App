import React from 'react';
import { FcGoogle } from "react-icons/fc"
import LoginImg from '../assets/Login-image.png';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  return (
    <div className="login-container">
      {/* Left side */}
      <div className="left-side">
        <div className="login-form">
          <h2 className='text-3xl font-thin mb-8 font-serif'><span className='text-brand'>Welcome</span> back</h2>
          <div className="form-group">
            <span className='pl-2 text-muted text-sm'>Email</span><br />
            <input className='login-input' type="email" placeholder="Enter your email" />
          </div>

          <div className="form-group">
            <span className='pl-2 text-muted text-sm'>Password</span><br />
            <input className='login-input' type="password" />
          </div>
          <div className="form-options">
            <div>
              <input type="checkbox" />
              <span className='ml-2 text-muted text-xs sm:text-sm'>Remember me</span>
            </div>
            <span className='text-muted text-xs sm:text-sm'>Forgot password?</span>
          </div>
          <button className="login-button">Login</button>
          <div className="form-divider">
            <span className='line'></span>
            <span className='text-muted'>or</span>
            <span className='line'></span>
          </div>
          <button className="google-btn">
            <FcGoogle /> Login with Google
          </button>
          <p className='text-center text-muted text-sm mt-4'>
            Don't have an account? <a href="#" className='underline' >Sign up</a>
          </p>
        </div>
      </div>
      {/* Right side */}
      <div className="right-side">
        <img className='login-image' src={LoginImg} alt="Image" />
      </div>
    </div>
  );
}

export default LoginPage;