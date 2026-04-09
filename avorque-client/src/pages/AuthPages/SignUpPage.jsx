import { Link } from 'react-router-dom';
import Button from '../../components/Buttons.jsx';

const inputClasses =
  'mt-2 w-full rounded-2xl border border-[#e7b8c5] bg-[#fff6f8] px-4 py-3.5 text-sm text-[#5c3a44] outline-none transition placeholder:text-[#c08a99] focus:border-[#d88fa3] focus:bg-white focus:ring-4 focus:ring-[#f8e3ea]';

const SignUpPage = () => {
  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight text-[#5c3a44] sm:text-4xl">
        Create your account
      </h2>

      <p className="mt-3 text-sm leading-6 text-[#8a6670]">
        Sign in to earn access to keep updated on Jamiela's career as an artist.
      </p>

      <form className="mt-8 space-y-5">
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
              placeholder="First name"
              autoComplete="given-name"
              className={inputClasses}
            />
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
              placeholder="Last name"
              autoComplete="family-name"
              className={inputClasses}
            />
          </div>
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
            placeholder="you@example.com"
            autoComplete="email"
            className={inputClasses}
          />
        </div>

        <div>
          <label
            htmlFor="signup-password"
            className="text-sm font-medium text-[#5c3a44]"
          >
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            placeholder="Create a password"
            autoComplete="new-password"
            className={inputClasses}
          />
          <p className="mt-2 text-xs leading-5 text-[#8a6670]">
            Use a secure password with letters, numbers, and symbols.
          </p>
        </div>

        <label className="flex items-start gap-3 text-sm leading-6 text-[#8a6670]">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-[#e7b8c5] text-[#d88fa3] focus:ring-[#f3c7d3]"
          />
          <span>I agree to receive updates, announcements, and member access emails.</span>
        </label>

        <Button type="submit" to="/" variant="primary" className="w-full">
          Create Account
        </Button>

        <div className="relative py-2 text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c08a99]">
          <div className="absolute left-0 top-1/2 -z-10 h-px w-full -translate-y-1/2 bg-[#f0c7d2]" />
          <span className="bg-white px-3">Or continue with</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button type="button" to="/" variant="secondary" className="w-full">
            Google
          </Button>
          <Button type="button" to="/" variant="secondary" className="w-full">
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