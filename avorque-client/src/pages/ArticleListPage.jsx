import ArticleList from '../components/ArticleList';
import articles from '../assets/article-content.js';

const ArticleListPage = () => {
  
  return (
    <div className="flex w-full flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-[2rem] border border-[#e7b8c5] bg-[#fff6f8] px-6 py-10 shadow-[0_12px_32px_rgba(216,143,163,0.14)] sm:px-8">

        <div className="relative z-10">
          <p className="inline-flex rounded-full border border-[#e7b8c5] bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#b96d84]">
            LIVE PERFORMANCES
          </p>

          <h1 className="mt-5 text-4xl font-bold leading-tight text-[#5c3a44] sm:text-5xl">
            Gigs with Other Artists
          </h1>

          <p className="mt-5 text-base leading-8 text-[#8a6670]">
            Explore a curated list of performances and featured appearances that capture Jamiela&apos;s growing presence in the local music scene. Each card highlights a recent event, venue, and schedule so visitors can quickly browse what&apos;s new.
          </p>
        </div>
      </section>

      <section className="rounded-[2rem] border border-[#e7b8c5] bg-[#fff6f8] px-6 py-8 shadow-[0_10px_30px_rgba(216,143,163,0.10)]">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#b96d84]">
              Latest Gigs
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-[#5c3a44]">
              Live performances and event details
            </h2>
          </div>

          <p className="text-sm text-[#8a6670]">
            Browse {articles.length} featured event{articles.length > 1 ? 's' : ''}.
          </p>
        </div>

        <ArticleList articles={articles} />
      </section>
    </div>
  );
}

export default ArticleListPage;