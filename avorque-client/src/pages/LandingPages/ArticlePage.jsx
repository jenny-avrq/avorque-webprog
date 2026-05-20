import { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/Buttons.jsx";
import { fetchGigById } from "../../services/GigService.js";

const getImageSrc = (image) => {
    if (!image) {
        return `/placeholder-gig.jpg`;
    }

    return image.startsWith('http')
        ? image
        : `http://localhost:8000${image}`;
};

const formatDate = (dateValue) => {
    if (!dateValue) return '';

    const date = new Date(dateValue);

    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
    });
};

const ArticlePage = () => {
    const { id } = useParams();

    const [gig, setGig] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const loadGig = async () => {
        try {
            setLoading(true);
            setError('');

            const { data } = await fetchGigById(id);

            setGig(data.gig);
        } catch (error) {
            console.error('Error laoding gig:', error);
            setError('Gig not found.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadGig();
    }, [id]);

    if (loading) {
        return (
            <div className="px-4 py-10 sm:px-6 lg:px-8">
                <p className="text-sm text-[#8a6670]">Loading gig...</p>
            </div>
        );
    }

    if (error || !gig) {
        return (
            <div className="px-4 py-10 sm:px-6 lg:px-8">
                <section className="rounded-[2rem] border border-[#e7b8c5] bg-[#fff6f8] px-6 py-10 text-center shadow-[0_12px_32px_rgba(216,143,163,0.14)]">
                    <h1 className="text-3xl font-bold text-[#5c3a44]">
                        Gig not found
                    </h1>

                    <p className="mt-3 text-sm text-[#8a6670]">
                        The gig may have been removed or is no longer available.
                    </p>

                    <div className="mt-6">
                        <Button to="/articles" variant="secondary">
                            Back to Gigs
                        </Button>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="flex w-full flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
            <section className="overflow-hidden rounded-[2rem] border border-[#e7b8c5] bg-[#fff6f8] shadow-[0_12px_32px_rgba(216,143,163,0.14)]">
                <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="overflow-hidden rounded-[1.5rem] border border-[#f0c7d2] bg-white/70">
                        <img
                            src={getImageSrc(gig.image)}
                            alt={gig.title}
                            className="h-full min-h-[320px] max-h-[800px] w-full object-cover"
                        />
                    </div>

                    <div className="flex flex-col justify-center">
                        <p className="inline-flex w-fit rounded-full border border-[#e7b8c5] bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#b96d84]">
                            Live Performance
                        </p>

                        <h1 className="mt-5 text-4xl font-bold leading-tight text-[#5c3a44] sm:text-5xl">
                            {gig.title}
                        </h1>

                        <div className="mt-8 grid gap-4 text-sm leading-7 text-[#8a6670] sm:grid-cols-2">
                            <div className="rounded-3xl border border-[#e7b8c5] bg-white/70 p-4">
                                <p className="font-semibold text-[#5c3a44]">Production</p>
                                <p>{gig.production}</p>
                            </div>
                            
                            <div className="rounded-3xl border border-[#e7b8c5] bg-white/70 p-4">
                                <p className="font-semibold text-[#5c3a44]">Venue</p>
                                <p>{gig.venue}</p>
                            </div>

                            <div className="rounded-3xl border border-[#e7b8c5] bg-white/70 p-4">
                                <p className="font-semibold text-[#5c3a44]">Date</p>
                                <p>{formatDate(gig.date)}</p>
                            </div>

                            <div className="rounded-3xl border border-[#e7b8c5] bg-white/70 p-4">
                                <p className="font-semibold text-[#5c3a44]">Time</p>
                                <p>{gig.time}</p>
                            </div>

                            <div className="rounded-3xl border border-[#e7b8c5] bg-white/70 p-4">
                                <p className="font-semibold text-[#5c3a44]">Door Charge</p>
                                <p>{gig.doorCharge}</p>
                            </div>

                            <div className="rounded-3xl border border-[#e7b8c5] bg-white/70 p-4">
                                <p className="font-semibold text-[#5c3a44]">Pre-Sale</p>
                                <p>{gig.preSale || 'N/A'}</p>
                            </div>
                        </div>

                        <div className="mt-8">
                            <Button to="/articles" variant="secondary">
                                Back to Gigs
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ArticlePage;