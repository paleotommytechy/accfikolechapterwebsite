import React from 'react'
import '../assets/styles/Login.css'
import logo from '../assets/logo.jpg'
import { Link} from 'react-router-dom';


const RegisterForm: React.FC = () => {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="neumorphic-card p-4 rounded-4 text-center">
        <img
          src={logo}
          alt="Logo"
          className="logo-img mx-auto mb-3 shadow"
        />
        <h5 className="fw-bold">ACCF IKOLE CHAPTER</h5>
        <p className="text-muted">Create an Account</p>

        <div className="form-group neumorphic-input my-3">
          <i className="fas fa-envelope me-2 text-muted"></i>
          <input
            type="text"
            className="form-control border-0 bg-transparent shadow-none"
            placeholder="Enter your email address"
          />
        </div>

        <div className="form-group neumorphic-input my-3">
          <i className="fas fa-lock me-2 text-muted"></i>
          <input
            type="password"
            className="form-control border-0 bg-transparent shadow-none"
            placeholder="Password"
          />
          <i className="fas fa-eye me-2 text-muted"></i>
        </div>
        <div className="form-group neumorphic-input my-3">
          <i className="fas fa-lock me-2 text-muted"></i>
          <input
            type="password"
            className="form-control border-0 bg-transparent shadow-none"
            placeholder="Confirm password"
          />
          <i className="fas fa-eye me-2 text-muted"></i>
        </div>

        <button className="btn btn-primary w-100 rounded-pill py-2 mt-2">
          Register
        </button>

        <div className="mt-3">
          <small className="text-muted">
            Forgot password? <b>or</b> <Link to='/login' style={{textDecoration:'none', color:'gray'}}>Log in</Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
