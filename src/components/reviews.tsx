'use client';

import React, { useState } from 'react';
import { Star, CheckCircle, Dog, ThumbsUp, MessageSquare } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  city: string;
  dogName: string;
  dogBreed: string;
  dogWeight: string;
  chewStrength: string;
  rating: number;
  date: string;
  title: string;
  reviewText: string;
  helpfulCount: number;
  verifiedPurchase: boolean;
}

const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Dr. Sarah Jenkins, DVM',
    city: 'Denver, CO',
    dogName: 'Ranger',
    dogBreed: 'Australian Shepherd',
    dogWeight: '48 lbs',
    chewStrength: 'Medium / Standard',
    rating: 5,
    date: '3 days ago',
    title: 'As a vet and working-dog owner, this completely cured his boredom.',
    reviewText:
      'Standard puzzle toys took Ranger 90 seconds flat. Then he would sit at the window barking at delivery drivers. ScentLoop’s timed micro-sessions and changing lock-states keep his brain working. When I check my security cams at 1 PM, he is curled up fast asleep in REM slumber. The scent diffusion really does tire dogs out 4x faster than ball throwing.',
    helpfulCount: 42,
    verifiedPurchase: true,
  },
  {
    id: 'rev-2',
    author: 'Marcus Vance',
    city: 'Seattle, WA',
    dogName: 'Diesel',
    dogBreed: 'German Shepherd / Malinois',
    dogWeight: '78 lbs',
    chewStrength: 'Power Chewer (Armored)',
    rating: 5,
    date: '1 week ago',
    title: 'He destroyed every Kong and plastic dispenser. ScentLoop is still untouched.',
    reviewText:
      'Diesel has jaws like a hydraulic press. He crushed two competitor automated treat devices within 48 hours. ScentLoop’s weighted cast base does not tip over, and the Zytel nylon modules have no bite seams. He works on the slide-bolt and dial with intense focus. Zero destroyed parts after 6 weeks of daily use.',
    helpfulCount: 38,
    verifiedPurchase: true,
  },
  {
    id: 'rev-3',
    author: 'Elena Rostova',
    city: 'Austin, TX',
    dogName: 'Boba',
    dogBreed: 'French Bulldog',
    dogWeight: '22 lbs',
    chewStrength: 'Small / Gentle',
    rating: 5,
    date: '2 weeks ago',
    title: 'No more gorge-and-vomit! The 2-kibble portioning is a medical miracle.',
    reviewText:
      'Frenchies are notorious for inhaling food and regurgitating. With automatic dispensers, Boba would scarf 1/2 cup at once and choke. ScentLoop releases only 2 tiny morsels at a time every hour. The soft silicone modules are gentle on his flat face, and he loves the dried herb aroma!',
    helpfulCount: 29,
    verifiedPurchase: true,
  },
  {
    id: 'rev-4',
    author: 'David & Maya Chen',
    city: 'Chicago, IL',
    dogName: 'Kona',
    dogBreed: 'Golden Retriever',
    dogWeight: '62 lbs',
    chewStrength: 'Medium / Standard',
    rating: 5,
    date: '3 weeks ago',
    title: 'No cameras, no wifi lag, zero monthly subscriptions. Pure mechanical genius.',
    reviewText:
      'I was tired of paying $12/month for a dog camera subscription that disconnected every time the wifi blinked. ScentLoop runs autonomously on its internal timer and rechargeable battery. We leave at 8 AM, come home at 5 PM, and Kona is calm, happy, and well-exercised.',
    helpfulCount: 19,
    verifiedPurchase: true,
  },
];

export function Reviews() {
  const [filterRating, setFilterRating] = useState<number | null>(null);

  const filteredReviews = filterRating
    ? REVIEWS.filter((r) => r.rating === filterRating)
    : REVIEWS;

  return (
    <section id="reviews" className="py-24 bg-white border-b border-brand-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider border border-amber-300">
            <MessageSquare className="w-3.5 h-3.5 text-amber-700" />
            Verified Customer Reviews
          </div>
          <h2 className="text-[3rem] md:text-[4rem] font-serif font-bold text-brand-900 tracking-tight">
            Loved by 1,480+ Dogs
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-brand-800">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
              ))}
            </div>
            <span className="font-extrabold text-lg text-brand-950">4.92 out of 5 stars</span>
            <span className="text-brand-500">•</span>
            <span className="text-brand-600">Over 1,480+ solved workday sessions</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-brand-50/60 rounded-3xl p-7 border border-brand-200/80 shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="text-xs text-brand-500 font-mono">{rev.date}</span>
                </div>

                <h4 className="text-lg font-bold text-brand-950 font-serif leading-snug">{rev.title}</h4>
                <p className="text-sm text-brand-800 leading-relaxed font-light">{rev.reviewText}</p>
              </div>

              <div className="pt-5 mt-5 border-t border-brand-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-brand-200 text-brand-900 font-bold flex items-center justify-center text-xs">
                      {rev.author[0]}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-brand-950 flex items-center gap-1">
                        <span>{rev.author}</span>
                        {rev.verifiedPurchase && (
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        )}
                      </div>
                      <span className="text-[11px] text-brand-500">{rev.city}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-brand-600">
                    <ThumbsUp className="w-3 h-3 text-brand-400" />
                    <span>{rev.helpfulCount} found helpful</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-white border border-brand-200 text-brand-800 px-2 py-0.5 rounded-md">
                    <Dog className="w-3 h-3 text-brand-600" />
                    {rev.dogName} ({rev.dogBreed}, {rev.dogWeight})
                  </span>
                  <span className="text-[10px] font-semibold bg-amber-50 border border-amber-200 text-amber-900 px-2 py-0.5 rounded-md">
                    {rev.chewStrength}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
