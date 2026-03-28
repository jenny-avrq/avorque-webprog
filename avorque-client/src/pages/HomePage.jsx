import Button from '../components/Buttons';
import Jamiela from '../assets/images/jamiela.jpg';
import { FaSpotify, FaYoutube, FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';
import { SiApplemusic } from 'react-icons/si';

const HomePage = () => {
  return (
    <div className="flex w-full flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <section className="grid gap-8 rounded-[2rem] border border-[#e7b8c5] bg-[#fff6f8] px-6 py-10 shadow-[0_10px_30px_rgba(216,143,163,0.12)] lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#b96d84]">
            Dollhouse for the Porcelain Souls
          </p>
          <h1 className="max-w-4xl text-4xl font-bold leading-tight text-[#5c3a44] sm:text-5xl">
            Ang aking pangalan ay Jamiela
          </h1>
          <p className="mt-4 max-w-3.5xl text-base leading-7 text-[#8a6670]">
            Jamiela, a rising creative voice in the Philippines, is known for blending artistry, emotion, and a distinct visual identity. She has built a persona that feels both intimate and theatrical, often drawing from themes of vulnerability, self-expression, and imagination. Beyond her music, Jamiela presents herself with a carefully crafted aesthetic—often described as delicate yet unsettling—that reflects a deeper exploration of identity and storytelling. As an emerging figure in the local creative scene, she continues to shape a space that feels uniquely her own, inviting audiences into a world that is personal, expressive, and quietly captivating.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button to="/music" variant="primary">
              Explore Music
            </Button>
            <Button to="/article" variant="secondary">
              Articles
            </Button>
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#e7b8c5] bg-[#f4d7df] p-6">
          <div className="overflow-hidden rounded-[1.5rem] bg-[#f8e3ea]">
            <img
              src={Jamiela}
              alt="Jamiela Profile Image"
              className="h-[450px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-[#e7b8c5] bg-[#fff6f8] px-6 py-8 shadow-[0_10px_30px_rgba(216,143,163,0.10)]">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#b96d84]">
            MEET JAMIELA
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-[#5c3a44]">
            Profile Overview
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-[#8a6670]">
            A quick look at her journey as an up-and-coming artist.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border border-[#e7b8c5] bg-white p-5 shadow-[0_8px_20px_rgba(185,109,132,0.08)]">
            <p className="text-3xl font-bold text-[#5c3a44]">October 18, 2023</p>
            <p className="mt-2 text-sm text-[#8a6670]">Debut Date</p>
          </div>

          <div className="rounded-3xl border border-[#e7b8c5] bg-white p-5 shadow-[0_8px_20px_rgba(185,109,132,0.08)]">
            <p className="text-3xl font-bold text-[#5c3a44]">filtered music</p>
            <p className="mt-2 text-sm text-[#8a6670]">Record Label</p>
          </div>

          <div className="rounded-3xl border border-[#e7b8c5] bg-white p-5 shadow-[0_8px_20px_rgba(185,109,132,0.08)]">
            <p className="text-3xl font-bold text-[#5c3a44]">Alternative Pop</p>
            <p className="mt-2 text-sm text-[#8a6670]">Genre</p>
          </div>

          <div className="rounded-3xl border border-[#e7b8c5] bg-white p-5 shadow-[0_8px_20px_rgba(185,109,132,0.08)]">
            <p className="text-3xl font-bold text-[#5c3a44]">14,835</p>
            <p className="mt-2 text-sm text-[#8a6670]">Spotify Followers</p>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-[#e7b8c5] bg-[#fff6f8] px-6 py-8 shadow-[0_10px_30px_rgba(216,143,163,0.10)]">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#b96d84]">
            SOCIAL MEDIA
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-[#5c3a44]">
            Connect with Jamiela
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-6">
          
          <a
            href="https://open.spotify.com/artist/5p1VVzsnhyultjNL7T6Wuu?si=nEIuIB1GS0-iW-gx3MWmWg"
            target="_blank"
            rel="noreferrer"
            className="group block no-underline"
          >
            <article className="rounded-3xl border border-[#e7b8c5] bg-white p-5 shadow-[0_8px_20px_rgba(185,109,132,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[#d88fa3] hover:bg-[#fff6f8] hover:shadow-[0_14px_28px_rgba(185,109,132,0.18)]">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f8e3ea] transition duration-300 group-hover:bg-[#f3c7d3]">
                  <FaSpotify className="text-2xl text-[#b96d84] transition duration-300 group-hover:scale-110 group-hover:text-[#a85c74]" />
                </div>

                <div>
                  <p className="text-sm text-[#8a6670]">
                    Listen on Spotify
                  </p>
                </div>
              </div>
            </article>
          </a>

          <a
            href="https://music.apple.com/us/artist/jamiela/1573674726"
            target="_blank"
            rel="noreferrer"
            className="group block no-underline"
          >
            <article className="rounded-3xl border border-[#e7b8c5] bg-white p-5 shadow-[0_8px_20px_rgba(185,109,132,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[#d88fa3] hover:bg-[#fff6f8] hover:shadow-[0_14px_28px_rgba(185,109,132,0.18)]">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f8e3ea] transition duration-300 group-hover:bg-[#f3c7d3]">
                  <SiApplemusic className="text-2xl text-[#b96d84] transition duration-300 group-hover:scale-110 group-hover:text-[#a85c74]" />
                </div>

                <div>
                  <p className="text-sm text-[#8a6670]">
                    Listen on Apple Music
                  </p>
                </div>
              </div>
            </article>
          </a>

          <a
            href="https://www.youtube.com/@TsukiJammy"
            target="_blank"
            rel="noreferrer"
            className="group block no-underline"
          >
            <article className="rounded-3xl border border-[#e7b8c5] bg-white p-5 shadow-[0_8px_20px_rgba(185,109,132,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[#d88fa3] hover:bg-[#fff6f8] hover:shadow-[0_14px_28px_rgba(185,109,132,0.18)]">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f8e3ea] transition duration-300 group-hover:bg-[#f3c7d3]">
                  <FaYoutube className="text-2xl text-[#b96d84] transition duration-300 group-hover:scale-110 group-hover:text-[#a85c74]" />
                </div>

                <div>
                  <p className="text-sm text-[#8a6670]">
                    Watch on YouTube
                  </p>
                </div>
              </div>
            </article>
          </a>

          <a
            href="https://www.instagram.com/tsukijammy?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noreferrer"
            className="group block no-underline"
          >
            <article className="rounded-3xl border border-[#e7b8c5] bg-white p-5 shadow-[0_8px_20px_rgba(185,109,132,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[#d88fa3] hover:bg-[#fff6f8] hover:shadow-[0_14px_28px_rgba(185,109,132,0.18)]">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f8e3ea] transition duration-300 group-hover:bg-[#f3c7d3]">
                  <FaInstagram className="text-2xl text-[#b96d84] transition duration-300 group-hover:scale-110 group-hover:text-[#a85c74]" />
                </div>

                <div>
                  <p className="text-sm text-[#8a6670]">
                    Visit Instagram Profile
                  </p>
                </div>
              </div>
            </article>
          </a>

          <a
            href="https://www.facebook.com/share/1H8s6zFEVi/"
            target="_blank"
            rel="noreferrer"
            className="group block no-underline"
          >
            <article className="rounded-3xl border border-[#e7b8c5] bg-white p-5 shadow-[0_8px_20px_rgba(185,109,132,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[#d88fa3] hover:bg-[#fff6f8] hover:shadow-[0_14px_28px_rgba(185,109,132,0.18)]">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f8e3ea] transition duration-300 group-hover:bg-[#f3c7d3]">
                  <FaFacebookF className="text-2xl text-[#b96d84] transition duration-300 group-hover:scale-110 group-hover:text-[#a85c74]" />
                </div>

                <div>
                  <p className="text-sm text-[#8a6670]">
                    Visit Facebook profile
                  </p>
                </div>
              </div>
            </article>
          </a>

          <a
            href="https://www.tiktok.com/@tsukijammy?is_from_webapp=1&sender_device=pc"
            target="_blank"
            rel="noreferrer"
            className="group block no-underline"
          >
            <article className="rounded-3xl border border-[#e7b8c5] bg-white p-5 shadow-[0_8px_20px_rgba(185,109,132,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[#d88fa3] hover:bg-[#fff6f8] hover:shadow-[0_14px_28px_rgba(185,109,132,0.18)]">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f8e3ea] transition duration-300 group-hover:bg-[#f3c7d3]">
                  <FaTiktok className="text-2xl text-[#b96d84] transition duration-300 group-hover:scale-110 group-hover:text-[#a85c74]" />
                </div>

                <div>
                  <p className="text-sm text-[#8a6670]">
                    Visit TikTok Profile
                  </p>
                </div>
              </div>
            </article>
          </a>
        </div>
      </section>
    </div>
  );
};

export default HomePage;