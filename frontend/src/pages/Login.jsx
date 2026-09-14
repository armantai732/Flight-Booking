import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginData } from '../api/api';

export default function Login() {
    const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    
    try {

        const res = await LoginData(form);

        if(res?.status){
            alert(res.message);
            

            localStorage.setItem("token", res.data);
            localStorage.setItem("role", res.role);

            if(res.role == "admin"){
              navigate("/admin/dashboard");
            }else{
              navigate("/");
            }

            setForm({
            email: "",
            password: ""
        })
        }else{
            alert(res.message);
        }


        
        
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-[#f4f7fb] p-4 sm:p-6">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 border border-gray-100">
        
        {/* Left Side Banner */}
        <div 
          className="relative hidden md:flex flex-col justify-end p-10 text-white bg-cover bg-center min-h-[520px]"
          style={{
            backgroundImage: `linear-gradient(to top, rgba(12, 35, 64, 0.9), rgba(12, 35, 64, 0.2)), url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000&auto=format&fit=crop')`
          }}
        >
          <div className="z-10">
            <h2 className="text-3xl font-extrabold tracking-wide leading-tight">
              Fly More<br />Explore More
            </h2>
            <p className="text-[11px] text-gray-300 mt-3 leading-relaxed max-w-xs">
              Login to access your bookings, manage your trips and get exclusive deals.
            </p>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="p-8 sm:p-12 flex flex-col justify-center">
          
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#0c2340]">Welcome Back</h2>
            <p className="text-xs text-gray-400 mt-1">Login to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email or Mobile */}
            <div>
              <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                Email or Mobile Number
              </label>
              <input
                type="text"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email or mobile"
                required
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 transition placeholder:text-gray-300"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 transition pr-10 placeholder:text-gray-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
              <div className="text-right mt-1.5">
                <a href="#" className="text-[10px] text-blue-600 font-bold hover:underline">
                  Forgot Password?
                </a>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-[#1d6bf3] hover:bg-blue-700 text-white font-semibold text-xs py-3 rounded-xl shadow-md transition duration-200 mt-2"
            >
              Login
            </button>
          </form>

          {/* OR Divider */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <span className="relative bg-white px-3 text-[10px] text-gray-400 font-bold tracking-widest uppercase">
              OR
            </span>
          </div>

          {/* Social Logins */}
          <div className="space-y-3">
            <button className="w-full border border-gray-200 hover:bg-gray-50 text-slate-700 font-semibold text-xs py-2.5 rounded-xl flex items-center justify-center gap-2.5 transition">
              <img 
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                alt="Google" 
                className="w-4 h-4 shrink-0"
              />
              <span>Continue with Google</span>
            </button>
            
            <button className="w-full border border-gray-200 hover:bg-gray-50 text-slate-700 font-semibold text-xs py-2.5 rounded-xl flex items-center justify-center gap-2.5 transition">
              <svg className="w-4 h-4 text-[#1877F2] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Continue with Facebook</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-[11px] text-gray-500 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 font-bold hover:underline">
              Sign Up
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
}