import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Buttons.jsx';

import React, { Suspense, useState } from 'react';
import { loginUser } from '../../services/UserService.js'

const inputClasses =
  'mt-2 w-full rounded-2xl border border-[#e7b8c5] bg-[#fff6f8] px-4 py-3.5 text-sm text-[#5c3a44] outline-none transition placeholder:text-[#c08a99] focus:border-[#d88fa3] focus:bg-white focus:ring-4 focus:ring-[#f8e3ea]';

const errorInputClasses = 
  'mt-2 w-full rounded-2xl border border-red-400 bg-red-50 px-4 py-3.5 text-sm text-[#5c3a44] outline-none transition placeholder:text-red-300 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100';

const errorTextClasses = 'mt-2 text-xs font-medium text-red-600';

function SignInPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState({});
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const nextErrors = {};

    if (!email.trim()) {
      nextErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (!password.trim()) {
      nextErrors.password = 'Password is required.';
    }

    return nextErrors;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    setError({});
    setServerError('');

    const nextErrors = validate();

    if (Object.keys(nextErrors).length) {
      setError(nextErrors);
      return;
    }

    try {
      // Call the login API
      const { data } = await loginUser({ 
        email: email.trim().toLowerCase(), 
        password,
      });

      if (data.type === 'viewer') {
        setServerError('Viewers are not allowed to access the dashboard.');
        return <Navigate to='/not-found' replace />
      }

      console.log('Login successful:', data);

      localStorage.setItem('token', data.token);
      localStorage.setItem('firstName', data.firstName);
      localStorage.setItem('type', data.type)

      // Navigate to the dashboard with the user's email and type
      navigate('/dashboard', { state: { firstName: data.firstName, type: data.type } });
    } catch (err) {
      console.error('Login failed:', err.response?.data?.message || err.message);

      setServerError(err.response?.data?.message || 'Invalid email or password. Please try again.');
    }
  }

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight text-[#5c3a44] sm:text-4xl">
        Welcome back
      </h2>

      <p className="mt-3 text-sm leading-6 text-[#8a6670]">
        Login to see new updates on Jamiela's artistic journey.
      </p>

      {serverError && 
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {serverError}
        </p>
      }

      <form className="mt-8 space-y-5" onSubmit={handleSignIn}>
        <div>
          <label
            htmlFor="email"
            className="text-sm font-medium text-[#5c3a44]"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
            autoComplete="email"
            className={error.email ? errorInputClasses : inputClasses}
          />
          {error.email && <p className={errorTextClasses}>{error.email}</p>}
        </div>

        <div>
          <label
            htmlFor="password"
            className="text-sm font-medium text-[#5c3a44]"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
            autoComplete="current-password"
            className={error.password ? errorInputClasses : inputClasses}
          />
          {error.password && <p className={errorTextClasses}>{error.password}</p>}
        </div>

        <div className="flex items-center justify-between gap-4">
          <label className="flex items-center gap-3 text-sm text-[#8a6670]">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-[#e7b8c5] text-[#d88fa3] focus:ring-[#f3c7d3]"
            />
            <span>Remember me</span>
          </label>

          <button
            type="button"
            className="text-sm font-semibold text-[#b96d84] transition hover:text-[#5c3a44]"
          >
            Forgot Password?
          </button>
        </div>

        <Button type="submit" variant="primary" className="w-full">
          Log In
        </Button>

        <div className="relative py-2 text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c08a99]">
          <div className="absolute left-0 top-1/2 -z-10 h-px w-full -translate-y-1/2 bg-[#f0c7d2]" />
          <span className="bg-white px-3">Or continue with</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button type="button" variant="secondary" className="w-full">
            Google
          </Button>
          <Button type="button" variant="secondary" className="w-full">
            Apple
          </Button>
        </div>
      </form>

      <div className="mt-8 border-t border-[#f0c7d2] pt-6 text-sm text-[#8a6670]">
        No account yet?{' '}
        <Link
          to="/auth/signup"
          className="font-semibold text-[#b96d84] transition hover:text-[#5c3a44]"
        >
          Sign Up
        </Link>
      </div>
    </>
  );
};

export default SignInPage;