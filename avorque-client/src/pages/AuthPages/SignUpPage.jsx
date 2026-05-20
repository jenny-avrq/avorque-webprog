import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Buttons.jsx';

import React, { Suspense, useState } from 'react';
import { createUser } from '../../services/UserService.js';

const inputClasses =
  'mt-2 w-full rounded-2xl border border-[#e7b8c5] bg-[#fff6f8] px-4 py-3.5 text-sm text-[#5c3a44] outline-none transition placeholder:text-[#c08a99] focus:border-[#d88fa3] focus:bg-white focus:ring-4 focus:ring-[#f8e3ea]';

const errorInputClasses = 'mt-2 w-full rounded-2xl border border-red-400 bg-red-50 px-4 py-3.5 text-sm text-[#5c3a44] outline-none transition placeholder:text-red-300 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100';

const errorTextClasses = 'mt-2 text-xs font-medium text-red-600';

function SignUpPage() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState(true)
  
  const [error, setError] = useState({});
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState('');

  const validate = () => {
    const nextErrors = {};

    if (!firstName.trim()) {
      nextErrors.firstName = 'First name is required.';
    }

    if (!lastName.trim()) {
      nextErrors.lastName = 'Last name is required.';
    }

    if (!age.trim()) {
      nextErrors.age = 'Age is required.';
    } else if (!/^\d+$/.test(age)) {
      nextErrors.age = 'Age must be a number only.';
    }

    if (!gender.trim()) {
      nextErrors.gender = 'Gender is required.';
    }

    if (!contactNumber.trim()) {
      nextErrors.contactNumber = 'Contact number is required.';
    } else if(!/^\d{11}$/.test(contactNumber)) {
      nextErrors.contactNumber = 'Contact number must be exactly 11 digits..';
    }

    if (!email.trim()) {
      nextErrors.email = 'Email address is required.';
    } else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (!address.trim()) {
      nextErrors.address = 'Address is required.';
    }

    if (!username.trim()) {
      nextErrors.username = 'Username is required.';
    } else if (username.includes(' ')) {
      nextErrors.username = 'Username must not contain spaces.';
    }

    if (!password.trim()) {
      nextErrors.password = 'Password is required.';
    } else if (password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters.'
    }

    return nextErrors;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError({});
    setServerError('');

    const nextErrors = validate();

    if (Object.keys(nextErrors).length) {
      setError(nextErrors);
      return;
    }

    try {
      setIsSubmitting(true);

      const newUser = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        age: age.trim(),
        gender: gender.trim().toLowerCase(),
        contactNumber: contactNumber.trim(),
        email: email.trim().toLowerCase(),
        address: address.trim(),
        type: 'viewer',
        username: username.trim().toLowerCase(),
        password,
        isActive: true,
      };

      await createUser(newUser);

      setSuccess('Account created successfully. Please log in.');

      setTimeout(() => {
        navigate('/auth/signin');
      }, 1500);
    } catch (err) {
      console.error('Sign up failed:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Sign up failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight text-[#5c3a44] sm:text-4xl">
        Create your account
      </h2>

      {success && (
        <p className="mt-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          {success}
        </p>
      )}

      <form className="mt-8 space-y-5" onSubmit={handleSignUp}>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="first-name"
              className="text-sm font-medium text-[#5c3a44]"
            >
              First Name
            </label>
            <input
              id="first-name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              autoComplete="given-name"
              className={error.firstName ? errorInputClasses : inputClasses}
            />
            {error.firstName && <p className={errorTextClasses}>{error.firstName}</p>}
          </div>

          <div>
            <label
              htmlFor="last-name"
              className="text-sm font-medium text-[#5c3a44]"
            >
              Last Name
            </label>
            <input
              id="last-name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              autoComplete="family-name"
              className={error.lastName ? errorInputClasses : inputClasses}
            />
            {error.lastName && <p className={errorTextClasses}>{error.lastName}</p>}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="signup-age" className="text-sm font-medium text-[#5c3a44]">
              Age
            </label>
            <input
              id="signup-age"
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Age"
              inputMode="numeric"
              className={error.age ? errorInputClasses : inputClasses}
            />
            {error.age && <p className={errorTextClasses}>{error.age}</p>}
          </div>

          <div>
            <label htmlFor="signup-gender" className="text-sm font-medium text-[#5c3a44]">
              Gender
            </label>
            <select
              id="signup-gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className={error.gender ? errorInputClasses : inputClasses}
            >
              <option value="">Select Gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
            {error.gender && <p className={errorTextClasses}>{error.gender}</p>}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="signup-contact"
              className="text-sm font-medium text-[#5c3a44]"
            >
              Contact Number
            </label>
            <input
              id="signup-contact"
              type="text"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              placeholder="09XXXXXXXXX"
              inputMode="numeric"
              className={error.contactNumber ? errorInputClasses : inputClasses}
            />
            {error.contactNumber && <p className={errorTextClasses}>{error.contactNumber}</p>}
          </div>

          <div>
            <label
              htmlFor="signup-email"
              className="text-sm font-medium text-[#5c3a44]"
            >
              Email
            </label>
            <input
              id="signup-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              className={error.email ? errorInputClasses : inputClasses}
            />
            {error.email && <p className={errorTextClasses}>{error.email}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="signup-address" className="text-sm font-medium text-[#5c3a44]">
            Address
          </label>
          <input
            id="signup-address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="City, Province"
            className={error.address ? errorInputClasses : inputClasses}
          />
          {error.address && <p className={errorTextClasses}>{error.address}</p>}
        </div>

        <div>
            <label htmlFor="signup-username" className='text-sm font-medium text-[#5c3a44]'>
              Username
            </label>
            <input
              id="signup-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              autoComplete="username"
              className={error.username ? errorInputClasses : inputClasses}
            />
            {error.username && <p className={errorTextClasses}>{error.username}</p>}
          </div>

          <div>
            <label htmlFor="signup-password" className="text-sm font-medium text-[#5c3a44]">
              Password
            </label>
            <input
              id="signup-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              autoComplete="new-password"
              className={error.password ? errorInputClasses : inputClasses}
            />
            {error.password && <p className={errorTextClasses}>{error.password}</p>}
          </div>

        <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
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
        Already have an account?{' '}
        <Link
          to="/auth/signin"
          className="font-semibold text-[#b96d84] transition hover:text-[#5c3a44]"
        >
          Log In
        </Link>
      </div>
    </>
  );
};

export default SignUpPage;