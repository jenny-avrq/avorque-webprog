import featurePhoto from '../assets/images/rolling_stone.webp';
import featureVideo from '../assets/video/rolling_stone.mp4';

const ArticlePage = () => {
  return (
    <div className="flex w-full flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-[2rem] border border-[#e7b8c5] bg-gradient-to-br from-[#fff6f8] via-[#fffafb] to-[#f8e3ea] px-6 py-10 shadow-[0_12px_32px_rgba(216,143,163,0.14)] sm:px-8">

        <div className="relative z-10">
          <p className="inline-flex rounded-full border border-[#e7b8c5] bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#b96d84]">
            Featured Article
          </p>

          <h1 className="mt-5 text-4xl font-bold leading-tight text-[#5c3a44] sm:text-5xl">
            Spotlight on Jamiela
          </h1>

          <p className="mt-5 text-base leading-8 text-[#8a6670]">
            Her growing presence in music is reflected not only in her songs, but also in the way her work is being recognized and discussed by others. Features and press coverage offer a wider view of her artistry, giving readers a chance to see how her sound, image, and creative identity stand out in the local scene. These pieces highlight the qualities that make Jamiela's music memorable, from its emotional depth to its distinct atmosphere and voice. They also show how her work is beginning to reach audiences beyond independent listeners and digital platforms. Through these selected features, a fuller picture of Jamiela emerges—one shaped by both her own expression and the responses her art continues to inspire. Together, they capture an artist whose presence is steadily growing and whose music continues to leave a lasting impression.
          </p>
        </div>
      </section>

      <section className="rounded-[2rem] border border-[#e7b8c5] bg-white p-6 shadow-[0_8px_20px_rgba(185,109,132,0.08)]">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="overflow-hidden rounded-[1.5rem] border border-[#e7b8c5] bg-[#fff6f8]">
            <img
              src={featurePhoto}
              alt="Jamiela featured by Rolling Stone Philippines"
              className="h-[1150px] w-full object-cover object-top"
            />
          </div>

          <div className="flex flex-col">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#b96d84]">
              Rolling Stone Philippines
            </p>

            <h2 className="mt-3 text-2xl font-semibold text-[#5c3a44]">
              26 Filipino Musicians to Watch in 2026
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#8a6670]">
              Elijah Pareño | January 13, 2026
            </p>

            <p className="mt-4 text-sm leading-7 text-[#8a6670]">
              Rolling Stone Philippines included Jamiela in its 2026 watchlist, recognizing her as one of the Filipino musicians to watch and drawing attention to her growing presence in the local music scene. The feature highlights her distinctive folk sound, artistic identity, and songs such as “Bendahe,” “Sikreto,” and “Kahon.” It places her alongside other emerging Filipino artists whose work is helping shape the sound of contemporary local music. More than simply listing her as a rising act, the article presents Jamiela as an artist with a strong creative point of view and a style that feels both intimate and unusual. Rolling Stone Philippines also suggests that her work stands out because it pushes folk music into a more inward, emotionally textured, and visually distinctive space. This gives her music a character that feels personal while still leaving a strong impression on listeners. The feature serves as an important recognition of her growing visibility as an artist and reflects how her music is beginning to reach beyond independent listeners and digital platforms. It also affirms Jamiela’s place among a new generation of Filipino musicians whose individuality and experimentation are helping redefine what local music can sound and feel like.
            </p>

            <a
              href="https://rollingstonephilippines.com/music/26-filipino-musicians-to-watch-2026/"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex w-60 items-center rounded-full border border-[#e7b8c5] bg-[#fff6f8] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#b96d84] transition hover:border-[#d88fa3] hover:bg-[#f8e3ea] hover:text-[#a85c74]"
            >
              Read on Rolling Stone
            </a>

            <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-[#e7b8c5] bg-black">
              <video controls className="aspect-video w-full">
                <source src={featureVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="mt-5 rounded-[1.5rem] border border-[#e7b8c5] bg-[#fff6f8] p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#b96d84]">
                Media Credit
              </p>

              <p className="mt-3 text-sm leading-7 text-[#8a6670]">
                Source: Rolling Stone Philippines
              </p>
              <p className="text-sm leading-7 text-[#8a6670]">
                Photo by Kim Santos
              </p>
              <p className="text-sm leading-7 text-[#8a6670]">
                Video by Joaquin Puyat
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;