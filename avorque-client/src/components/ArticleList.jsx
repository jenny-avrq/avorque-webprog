import Button from './Buttons';

const getDetailValue = (item) => item.split(':').slice(1).join(':').trim();

const formatDate = (dateValue) => {
    if (!dateValue) return '';

    const date = new Date(dateValue);

    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
    });
};

const ArticleList = ({ articles }) => {
    return (
        <div className='grid gap-6 sm:grid-cols-2 xl:grid-cols-3'>
            {articles.map((article, index) => {
                const venue = getDetailValue(article.content[0] || '');
                const date = formatDate(article.date);

                return (
                    <article
                        key={article._id}
                        className="group overflow-hidden rounded-[2rem] border border-[#e7b8c5] bg-[#fff6f8] p-5 shadow-[0_12px_32px_rgba(216,143,163,0.14)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(216,143,163,0.2)]"
                    >
                        <div className="overflow-hidden rounded-[1.5rem] border border-[#f0c7d2] bg-white/60">
                            <div className="aspect-4/3 overflow-hidden">
                                <img
                                    src={
                                        article.image?.startsWith('http')
                                            ? article.image
                                            : `http://localhost:8000${article.image}`
                                    }
                                    alt={article.title}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>

                        <div className="mt-5">
                            <p className="inline-flex rounded-full border border-[#e7b8c5] bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#b96d84]">
                                Gig {String(index + 1).padStart(2, '0')}
                            </p>

                            <h3 className="mt-4 text-xl font-semibold leading-tight text-[#5c3a44]">
                                {article.title}
                            </h3>

                            <p className="mt-2 text-sm text-[#b96d84]">
                                {article.production}
                            </p>

                            <div className="mt-4 space-y-2 text-sm leading-7 text-[#8a6670]">
                                <p>
                                <span className="font-semibold text-[#5c3a44]">Venue:</span> {venue}
                                </p>
                                <p>
                                <span className="font-semibold text-[#5c3a44]">Date:</span> {date}
                                </p>
                            </div>

                            <div className="mt-5">
                                <Button to={`/articles/${article._id}`}>Read More</Button>
                            </div>
                        </div>
                    </article>
                );
            })}
        </div>
    );
};

export default ArticleList;