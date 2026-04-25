import { Link } from 'react-router-dom';
import Button from '../../components/Buttons.jsx';

const inputClasses =
  'mt-2 w-full rounded-2xl border border-[#e7b8c5] bg-[#fff6f8] px-4 py-3.5 text-sm text-[#5c3a44] outline-none transition placeholder:text-[#c08a99] focus:border-[#d88fa3] focus:bg-white focus:ring-4 focus:ring-[#f8e3ea]';

const SignInPage = () => {
  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight text-[#5c3a44] sm:text-4xl">
        Welcome back
      </h2>

      <p className="mt-3 text-sm leading-6 text-[#8a6670]">
        Login to see new updates on Jamiela's artistic journey.
      </p>

      <form className="mt-8 space-y-5">
        <div>
          <label
            htmlFor="signin-email"
            className="text-sm font-medium text-[#5c3a44]"
          >
            Email Address
          </label>
          <input
            id="signin-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            className={inputClasses}
          />
        </div>

        <div>
          <label
            htmlFor="signin-password"
            className="text-sm font-medium text-[#5c3a44]"
          >
            Password
          </label>
          <input
            id="signin-password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            className={inputClasses}
          />
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

        <Button type="submit" to="/dashboard" variant="primary" className="w-full">
          Log In
        </Button>

        <div className="relative py-2 text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c08a99]">
          <div className="absolute left-0 top-1/2 -z-10 h-px w-full -translate-y-1/2 bg-[#f0c7d2]" />
          <span className="bg-white px-3">Or continue with</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button type="button" to="/dashboard" variant="secondary" className="w-full">
            Google
          </Button>
          <Button type="button" to="/dashboard" variant="secondary" className="w-full">
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