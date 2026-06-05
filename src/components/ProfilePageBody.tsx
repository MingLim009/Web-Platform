"use client";

import type { Review } from "@prisma/client";
import { formatPhoneBR, timeAgoBR } from "@/lib/utils";
import { ReviewForm } from "@/app/profissional/[slug]/ReviewForm";
import { ProfileBadges, useProfileT } from "./ProfilePageI18n";

type ProfileBodyProps = {
  pro: {
    id: string;
    name: string;
    title: string | null;
    slug: string;
    photoUrl: string | null;
    bio: string | null;
    phone: string | null;
    whatsapp: string;
    rating: number;
    reviewCount: number;
    yearsExperience: number;
    neighborhood: string | null;
    state: string;
    isFounder: boolean;
    isVerified: boolean;
    is24h: boolean;
    isDomiciliar: boolean;
    category: { name: string; slug: string };
    city: { name: string };
  };
  gallery: string[];
  specialties: string[];
  reviews: Review[];
  ratingDistribution: { stars: number; count: number; pct: number }[];
  wa: string;
};

export function ProfilePageBody({ pro, gallery, specialties, reviews, ratingDistribution, wa }: ProfileBodyProps) {
  const s = useProfileT();
  const firstName = pro.name.split(" ")[0];

  return (
    <>
      <section className="profile-hero" data-reveal>
        <div className="container">
          <div className="profile-hero-grid">
            <div className="profile-photo-main">
              {pro.photoUrl ? (
                <img
                  src={pro.photoUrl}
                  alt={pro.name}
                  onError={(e) => {
                    const img = e.currentTarget;
                    const fb = `https://ui-avatars.com/api/?name=${encodeURIComponent(pro.name)}&size=600&background=0077FF&color=fff&bold=true`;
                    if (img.src !== fb) img.src = fb;
                  }}
                />
              ) : (
                <div style={{ background: "var(--c-gray-200)", height: 300 }} />
              )}
              <div className="profile-badges-stack">
                <ProfileBadges
                  isFounder={pro.isFounder}
                  isVerified={pro.isVerified}
                  is24h={pro.is24h}
                  isDomiciliar={pro.isDomiciliar}
                />
              </div>
            </div>

            <div className="profile-info">
              <span className="profile-cat">{pro.category.name}</span>
              <h1>{pro.name}</h1>
              <p className="profile-title">{pro.title}</p>

              <div className="profile-rating">
                <span className="stars">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg
                      key={i}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      style={{ opacity: i <= Math.floor(pro.rating) ? 1 : 0.35 }}
                    >
                      <path d="M12 2l2.39 7.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l7.61-2.01z" />
                    </svg>
                  ))}
                </span>
                <strong>{pro.rating.toFixed(1)}</strong>
                <span className="count">({s.reviewsCount(pro.reviewCount)})</span>
              </div>

              <div className="profile-meta">
                <div className="meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  </svg>
                  {pro.neighborhood ? `${pro.neighborhood}, ${pro.city.name}` : pro.city.name}, {pro.state}
                </div>
                {pro.yearsExperience > 0 && (
                  <div className="meta-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {s.yearsExp(pro.yearsExperience)}
                  </div>
                )}
              </div>

              <div className="profile-actions">
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-success btn-lg">
                  {s.callWhatsapp}
                </a>
                {pro.phone && (
                  <a href={`tel:+${pro.phone}`} className="btn btn-secondary">
                    {formatPhoneBR(pro.phone)}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="container profile-content" data-reveal>
        <div className="profile-main">
          {pro.bio && (
            <section className="profile-section">
              <h2>{s.about}</h2>
              <p>{pro.bio}</p>
            </section>
          )}

          {specialties.length > 0 && (
            <section className="profile-section">
              <h2>{s.specialties}</h2>
              <div className="specialty-tags">
                {specialties.map((item) => (
                  <span key={item} className="specialty-tag">
                    ✓ {item}
                  </span>
                ))}
              </div>
            </section>
          )}

          {gallery.length > 0 && (
            <section className="profile-section">
              <h2>{s.gallery}</h2>
              <div className="gallery-grid">
                {gallery.map((url, i) => (
                  <div key={i} className="gallery-item">
                    <img src={url} alt={s.workPhoto(i + 1)} loading="lazy" />
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="profile-section">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              <h2 style={{ margin: 0 }}>{s.clientReviews}</h2>
              <strong style={{ color: "var(--c-orange)" }}>{s.reviewsCount(pro.reviewCount)}</strong>
            </div>

            <div className="rating-summary">
              <div className="rating-big">
                <div className="rating-number">{pro.rating.toFixed(1)}</div>
                <small>{s.reviewsCount(pro.reviewCount)}</small>
              </div>
              <div className="rating-bars">
                {ratingDistribution.map(({ stars, count, pct }) => (
                  <div key={stars} className="rating-bar">
                    <span>{stars}★</span>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="bar-count">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="reviews-list">
              {reviews.length === 0 ? (
                <p style={{ color: "var(--c-gray-600)", padding: "2rem 0", textAlign: "center" }}>
                  {s.firstReview(firstName)}
                </p>
              ) : (
                reviews.map((r) => (
                  <div key={r.id} className="review-card">
                    <div className="review-head">
                      <div className="review-avatar">{r.reviewerName.charAt(0).toUpperCase()}</div>
                      <div>
                        <strong>{r.reviewerName}</strong>
                        <div className="review-meta">
                          <small>{timeAgoBR(r.createdAt)}</small>
                        </div>
                      </div>
                    </div>
                    <p>{r.comment}</p>
                    {r.proResponse && (
                      <div className="review-reply">
                        <strong>{s.responded(firstName)}</strong>
                        <p>{r.proResponse}</p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            <ReviewForm professionalId={pro.id} professionalName={pro.name} />
          </section>
        </div>

        <aside className="profile-side">
          <div className="contact-card">
            <h3>{s.contactDirect}</h3>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-wpp-big">
              {s.callWhatsapp}
            </a>
            {pro.phone && (
              <a href={`tel:+${pro.phone}`} className="btn-phone">
                {formatPhoneBR(pro.phone)}
              </a>
            )}
            <small>
              {s.responseTime} <strong style={{ color: "#fff" }}>{s.responseMinutes}</strong> {s.responseHours}
            </small>
          </div>
        </aside>
      </main>
    </>
  );
}
