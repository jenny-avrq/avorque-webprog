import { useParams } from "react-router-dom";
import Button from "../components/Buttons";
import articles from '../assets/article-content.js';
import { Link } from "react-router-dom";

function ArticlePage() {
    const { slug } = useParams();
    const article = articles.find(article => article.slug === slug);

    if(!article) {
        return (
            <div className="flex w-full flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-[2rem] border border-[#e7b8c5] bg-gradient-to-br from-[#fff6f8] via-[#fffafb] to-[#f8e3ea] px-6 py-10 shadow-[0_12px_32px_rgba(216,143,163,0.14)] sm:px-8">
          <p className="inline-flex rounded-full border border-[#e7b8c5] bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#b96d84]">
            Performances
          </p>

          <h1 className="mt-5 text-3xl font-bold leading-tight text-[#5c3a44] sm:text-4xl">
            Gig not found
          </h1>

          <p className="mt-4 text-base leading-7 text-[#8a6670]">
            The gig you are looking for could not be found. Try going back to the gigs page to browse the latest performances and featured appearances.
          </p>

          <div className="mt-6">
            <Button to="/articles">Back to Gigs</Button>
          </div>
        </section>
      </div>
        );
    }

    return (
        <div className="flex w-full flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <section className="grid gap-8 rounded-[2rem] border border-[#e7b8c5] bg-[#fff6f8] px-6 py-10 shadow-[0_10px_30px_rgba(216,143,163,0.12)] lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <Button to="/articles" variant="secondary">
            Back to Gigs
          </Button>

          <h1 className="mt-5 text-4xl font-bold leading-tight text-[#5c3a44] sm:text-5xl">
            {article.title}
          </h1>

          <p className="mt-4 text-base leading-7 text-[#8a6670]">
            Organized by <span className="font-semibold text-[#5c3a44]">{article.name}</span>
          </p>

          <div className="mt-6 space-y-4">
            {article.content.map((detail, index) => {
              const parts = detail.split(':');
              const label = parts[0];
              const value = parts.slice(1).join(':').trim();

              return (
                <div
                  key={index}
                  className="rounded-3xl border border-[#e7b8c5] bg-white p-5 shadow-[0_8px_20px_rgba(185,109,132,0.08)]"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#b96d84]">
                    {label}
                  </p>
                  <p className="mt-2 text-base leading-7 text-[#5c3a44]">{value}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#e7b8c5] bg-[#f4d7df] p-6">
          <div className="overflow-hidden rounded-[1.5rem] bg-[#f8e3ea]">
            <img
              src={article.image}
              alt={article.title}
              className="h-[500] w-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
    );
}

export default ArticlePage;