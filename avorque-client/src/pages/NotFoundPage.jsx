import Button from '../components/Buttons.jsx';

function NotFoundPage() {
    return (
        <div className="w-full px-2 py-8 sm:px-3 lg:px-4">
            <section className="w-full rounded-[2rem] border border-[#e7b8c5] bg-gradient-to-br from-[#fff6f8] via-[#fffafb] to-[#f8e3ea] px-6 py-10 shadow-[0_12px_32px_rgba(216,143,163,0.14)] sm:px-8">
                <p className="inline-flex rounded-full border border-[#e7b8c5] bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#b96d84]">
                Page Not Found
                </p>
                <h1 className="mt-5 text-3xl font-bold leading-tight text-[#5c3a44] sm:text-4xl">
                This page does not exist.
                </h1>
                <p className="mt-4 text-base leading-7 text-[#8a6670]">
                The link may be broken or the page may have been moved. Head back to the home
                page and continue exploring Jamiela&apos;s music and latest features.
                </p>
                <div className="mt-6">
                    <Button to="/">Back Home</Button>
                </div>
            </section>
        </div>
    )
}

export default NotFoundPage;