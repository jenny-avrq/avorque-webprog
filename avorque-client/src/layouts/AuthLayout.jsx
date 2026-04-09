import { NavLink, Outlet } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import Button from '../components/Buttons.jsx';

const tabClass = ({ isActive }) =>
  `inline-flex rounded-full px-4 py-2 text-sm font-semibold transition ${
    isActive
      ? 'bg-[#d88fa3] text-white shadow-sm'
      : 'text-[#8a6670] hover:bg-white hover:text-[#5c3a44]'
  }`;

const AuthLayout = () => {
  return (
    <section className="min-h-screen bg-[linear-gradient(180deg,#f8e3ea_0%,#fff6f8_100%)] text-[#5c3a44]">
      <div className="mx-auto grid min-h-screen max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="overflow-hidden rounded-[2rem] border border-[#e7b8c5] bg-[#fff6f8] shadow-[0_12px_32px_rgba(216,143,163,0.14)]">
          <div className="flex h-full flex-col justify-between p-8 sm:p-10">
            <div>
              <div className="flex items-center gap-3">
                <img src={logo} alt="Jamiela logo" className="h-12 object-contain" />
                <div>
                  <p className="text-lg font-bold text-[#5c3a44]">Jamiela</p>
                  <p className="text-sm text-[#8a6670]">Pink Dolly Busker</p>
                </div>
              </div>

              <p className="mt-8 inline-flex rounded-full border border-[#e7b8c5] bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#b96d84]">
                Member Access
              </p>

              <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
                Unlock the soft, theatrical world of Jamiela
              </h1>

              <p className="mt-4 max-w-xl text-base leading-7 text-[#8a6670]">
                Be a member to access early updates of releases, performance schedules, and more exclusive content.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl border border-[#e7b8c5] bg-white p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#b96d84]">
                    Access
                  </p>
                  <p className="mt-2 text-sm text-[#8a6670]">Exclusive updates and community access.</p>
                </div>
                <div className="rounded-3xl border border-[#e7b8c5] bg-white p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#b96d84]">
                    Story
                  </p>
                  <p className="mt-2 text-sm text-[#8a6670]">Uncover the deeper meaning behind every release.</p>
                </div>
                <div className="rounded-3xl border border-[#e7b8c5] bg-white p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#b96d84]">
                    Music
                  </p>
                  <p className="mt-2 text-sm text-[#8a6670]">Listen to exclusive tracks and releases.</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Button to="/" variant="secondary">
                Back Home
              </Button>
            </div>
          </div>
        </div>

        <main className="flex items-center">
          <div className="w-full rounded-[2rem] border border-[#e7b8c5] bg-white/90 p-6 shadow-[0_12px_32px_rgba(216,143,163,0.10)] backdrop-blur sm:p-8">
            <div className="mb-8 flex w-fit rounded-full border border-[#e7b8c5] bg-[#fff6f8] p-1">
              <NavLink to="/auth/signin" className={tabClass}>
                Log In
              </NavLink>
              <NavLink to="/auth/signup" className={tabClass}>
                Sign Up
              </NavLink>
            </div>

            <Outlet />
          </div>
        </main>
      </div>
    </section>
  );
};

export default AuthLayout;