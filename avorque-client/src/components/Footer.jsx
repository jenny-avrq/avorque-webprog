import { Link } from 'react-router-dom';
import { FaSpotify, FaYoutube, FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';

const socials = [
  {
    href: 'https://open.spotify.com/artist/5p1VVzsnhyultjNL7T6Wuu?si=nEIuIB1GS0-iW-gx3MWmWg',
    label: 'Spotify',
    icon: FaSpotify,
  },
  {
    href: 'https://www.youtube.com/@TsukiJammy',
    label: 'YouTube',
    icon: FaYoutube,
  },
  {
    href: 'https://www.instagram.com/tsukijammy?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    label: 'Instagram',
    icon: FaInstagram,
  },
  {
    href: 'https://www.facebook.com/share/1H8s6zFEVi/',
    label: 'Facebook',
    icon: FaFacebookF,
  },
  {
    href: 'https://www.tiktok.com/@tsukijammy?is_from_webapp=1&sender_device=pc',
    label: 'TikTok',
    icon: FaTiktok,
  },
];

const Footer = () => {
  return (
    <footer className="border-t border-[#e7b8c5] bg-[#fff6f8]">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-md">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#b96d84]">
            Jamiela
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-[#5c3a44]">
            Pink Dolly Busker
          </h2>
          <p className="mt-3 text-sm leading-7 text-[#8a6670]">
            A soft, theatrical space for Jamiela&apos;s music, performances, and latest updates.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:gap-12">
          <div>
            <p className="text-sm font-semibold text-[#5c3a44]">Explore</p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-[#8a6670]">
              <Link className="transition hover:text-[#b96d84]" to="/">
                Home
              </Link>
              <Link className="transition hover:text-[#b96d84]" to="/music">
                Music
              </Link>
              <Link className="transition hover:text-[#b96d84]" to="/articles">
                Articles
              </Link>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-[#5c3a44]">Follow</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {socials.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e7b8c5] bg-white text-[#b96d84] transition hover:-translate-y-0.5 hover:border-[#d88fa3] hover:bg-[#f8e3ea]"
                >
                  <Icon className="text-lg" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#f0c7d2] px-6 py-4 text-center text-sm text-[#8a6670]">
        © 2026 Jamiela. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;