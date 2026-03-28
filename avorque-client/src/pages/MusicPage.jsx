import Button from '../components/Buttons';
import Jammy from '../assets/images/jammy.jpg';
import Kahon from '../assets/images/kahon.jpg';
import Bendahe from '../assets/images/bendahe.jpg';
import Sikreto from '../assets/images/Sikreto.jpg';
import TayoAyBagay from '../assets/images/tayo_ay_bagay.png';

const MusicPage = () => {
  return (
    <div className="flex w-full flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <section className="grid gap-8 rounded-[2rem] border border-[#e7b8c5] bg-[#fff6f8] px-6 py-10 shadow-[0_10px_30px_rgba(216,143,163,0.12)] lg:grid-cols-2 lg:items-center">
        <div className="rounded-[2rem] border border-[#e7b8c5] bg-[#f4d7df] p-6">
          <div className="overflow-hidden rounded-[1.5rem] bg-[#f8e3ea]">
            <img
              src={Jammy}
              alt="Jamiela Profile Image"
              className="h-[450px] w-full object-cover"
            />
          </div>
        </div>

        <div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#b96d84]">
            SOUND OF JAMIELA
          </p>
          <h1 className="max-w-xl text-4xl font-bold leading-tight text-[#5c3a44] sm:text-5xl">
            Her Music Up Close
          </h1>
          <p className="mt-4 text-base leading-7 text-[#8a6670]">
            Jamiela Dacome, known as Jamiela, is an emerging voice in OPM whose music blends alternative, and experimental art-pop into a sound that is both delicate and haunting. Centered on soft acoustic textures and fragile, intimate vocals, her songs explore themes of identity, vulnerability, and emotional depth, often unfolding like personal diary entries shaped into surreal, theatrical soundscapes. With a distinct aesthetic that contrasts gentle melodies with unsettling undertones, Jamiela creates a listening experience that feels raw, introspective, and quietly captivating.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button to="/" variant="primary">
              Back Home
            </Button>
            <Button to="/article" variant="secondary">
              Articles
            </Button>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-[#e7b8c5] bg-[#fff6f8] px-6 py-8 shadow-[0_10px_30px_rgba(216,143,163,0.10)]">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#b96d84]">
            Music Overview
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-[#5c3a44]">Her Sound in Focus</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border border-[#e7b8c5] bg-white p-5 shadow-[0_8px_20px_rgba(185,109,132,0.08)]">
            <p className="text-3xl font-bold text-[#5c3a44]">44,392</p>
            <p className="mt-2 text-sm text-[#8a6670]">Monthly Spotify Listeners</p>
          </div>

          <div className="rounded-3xl border border-[#e7b8c5] bg-white p-5 shadow-[0_8px_20px_rgba(185,109,132,0.08)]">
            <p className="text-3xl font-bold text-[#5c3a44]">4</p>
            <p className="mt-2 text-sm text-[#8a6670]">Released Songs</p>
          </div>

          <div className="rounded-3xl border border-[#e7b8c5] bg-white p-5 shadow-[0_8px_20px_rgba(185,109,132,0.08)]">
            <p className="text-3xl font-bold text-[#5c3a44]">Bendahe</p>
            <p className="mt-2 text-sm text-[#8a6670]">Most Played Song</p>
          </div>

          <div className="rounded-3xl border border-[#e7b8c5] bg-white p-5 shadow-[0_8px_20px_rgba(185,109,132,0.08)]">
            <p className="text-3xl font-bold text-[#5c3a44]">Tayo ay Bagay</p>
            <p className="mt-2 text-sm text-[#8a6670]">Latest Release</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 rounded-[2rem] border border-[#e7b8c5] bg-[#fff6f8] px-6 py-8 shadow-[0_10px_30px_rgba(216,143,163,0.10)] lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#b96d84]">
            Singles Released
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-[#5c3a44]">
            Collection of Jamiela's Songs
          </h2>

          <div className="mt-6 space-y-5">
            <article className="rounded-3xl border border-[#e7b8c5] bg-white p-5 shadow-[0_8px_20px_rgba(185,109,132,0.08)] transition duration-300">
              <div className="flex items-start gap-6">
                <img
                  src={Kahon}
                  alt="Kahon Cover"
                  className="h-[120px] w-[120px] shrink-0 rounded-2xl border border-[#e7b8c5] object-cover"
                />

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#5c3a44]">
                    Kahon
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#8a6670]">
                    Release Date: October 18, 2023
                  </p>
                  <p className="text-sm leading-6 text-[#8a6670]">
                    Duration: 5 minutes 16 seconds
                  </p>

                  <a
                    href="https://open.spotify.com/album/2eZYEU8OtzyxCWGyqEZRVP?si=8wjYJUMZSEuhJtF-ukQmkw"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#b96d84] transition hover:text-[#d88fa3] hover:underline"
                  >
                    Open on Spotify
                  </a>
                </div>
              </div>
            </article>
        
            <article className="rounded-3xl border border-[#e7b8c5] bg-white p-5 shadow-[0_8px_20px_rgba(185,109,132,0.08)] transition duration-300">
              <div className="flex items-start gap-6">
                <img
                  src={Bendahe}
                  alt="Bendahe Cover"
                  className="h-[120px] w-[120px] shrink-0 rounded-2xl border border-[#e7b8c5] object-cover"
                />

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#5c3a44]">
                    Bendahe
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#8a6670]">
                    Release Date: June 20, 2025
                  </p>
                  <p className="text-sm leading-6 text-[#8a6670]">
                    Duration: 3 minutes 55 seconds
                  </p>

                  <a
                    href="https://open.spotify.com/album/4OVreJsUM0Wa10eAfzSuCf?si=A8zPuCy1T6WtRlv7AAXWKg"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#b96d84] transition hover:text-[#d88fa3] hover:underline"
                  >
                    Open on Spotify
                  </a>
                </div>
              </div>
            </article>

            <article className="rounded-3xl border border-[#e7b8c5] bg-white p-5 shadow-[0_8px_20px_rgba(185,109,132,0.08)] transition duration-300">
              <div className="flex items-start gap-6">
                <img
                  src={Sikreto}
                  alt="Sikreto Cover"
                  className="h-[120px] w-[120px] shrink-0 rounded-2xl border border-[#e7b8c5] object-cover"
                />

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#5c3a44]">
                    Sikreto
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#8a6670]">
                    Release Date: August 8, 2025
                  </p>
                  <p className="text-sm leading-6 text-[#8a6670]">
                    Duration: 3 minutes 53 seconds
                  </p>

                  <a
                    href="https://open.spotify.com/album/63rd1xf6NkseRp3SeGuk0G?si=UjjCVx6IQHOmYl8N2hx4OQ"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#b96d84] transition hover:text-[#d88fa3] hover:underline"
                  >
                    Open on Spotify
                  </a>
                </div>
              </div>
            </article>

            <article className="rounded-3xl border border-[#e7b8c5] bg-white p-5 shadow-[0_8px_20px_rgba(185,109,132,0.08)] transition duration-300">
              <div className="flex items-start gap-6">
                <img
                  src={TayoAyBagay}
                  alt="Tayo ay Bagay Cover"
                  className="h-[120px] w-[120px] shrink-0 rounded-2xl border border-[#e7b8c5] object-cover"
                />

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#5c3a44]">
                    Tayo ay Bagay
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#8a6670]">
                    Release Date: March 13, 2026
                  </p>
                  <p className="text-sm leading-6 text-[#8a6670]">
                    Duration: 3 minutes 28 seconds
                  </p>

                  <a
                    href="https://open.spotify.com/album/6MKgfOb4QihflNTU1JG888?si=62SNpnb4QCm-PR6_2dL6Xw"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#b96d84] transition hover:text-[#d88fa3] hover:underline"
                  >
                    Open on Spotify
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#e7b8c5] bg-white p-5 pt-3 shadow-[0_8px_20px_rgba(185,109,132,0.08)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#b96d84]">
            Song Covers
          </p>

          <div className="mt-2 grid gap-4 sm:grid-cols-2">
            <div className="aspect-square overflow-hidden rounded-[1.25rem] border border-[#e7b8c5] bg-[#f8e3ea]">
              <img
                src={Kahon}
                alt="Gallery image 1"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="aspect-square overflow-hidden rounded-[1.25rem] border border-[#e7b8c5] bg-[#f8e3ea]">
              <img
                src={Bendahe}
                alt="Gallery image 2"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="aspect-square overflow-hidden rounded-[1.25rem] border border-[#e7b8c5] bg-[#f8e3ea]">
              <img
                src={Sikreto}
                alt="Gallery image 3"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="aspect-square overflow-hidden rounded-[1.25rem] border border-[#e7b8c5] bg-[#f8e3ea]">
              <img
                src={TayoAyBagay}
                alt="Gallery image 4"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MusicPage;