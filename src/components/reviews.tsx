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
    author: 'Dr. Ananya Sharma, BVSc & AH',
    city: 'Bengaluru (Indiranagar)',
    dogName: 'Sheru',
    dogBreed: 'Indie Rescue Hound',
    dogWeight: '19 kg',
    chewStrength: 'Medium / Standard',
    rating: 5,
    date: '2 days ago',
    title: 'Desi dogs are genius scavengers. ScentLoop is the only toy that actually challenges Sheru.',
    reviewText:
      'Standard puzzle toys took Sheru literally 45 seconds flat. Then he would pace our Bengaluru apartment and bark at corridor noises. ScentLoop’s timed micro-sessions and changing lock-states keep his natural foraging brain fully engaged. When I check my security cams at 2 PM, he is curled up fast asleep in deep REM rest. Olfactory stimulation tires dogs out 4x faster than high-impact running.',
    helpfulCount: 54,
    verifiedPurchase: true,
  },
  {
    id: 'rev-2',
    author: 'Vikram Malhotra',
    city: 'Gurugram (DLF Phase 5)',
    dogName: 'Bruno',
    dogBreed: 'Labrador Retriever',
    dogWeight: '32 kg',
    chewStrength: 'Power Chewer (Armored)',
    rating: 5,
    date: '1 week ago',
    title: 'He destroyed every plastic dispenser and Kong. ScentLoop is still 100% intact.',
    reviewText:
      'Bruno has jaws like a hydraulic press. He cracked two cheap automated treat devices from Amazon within 48 hours. ScentLoop’s weighted 4.2 kg base does not flip over on vitrified tiles, and the DuPont Zytel ballistic nylon modules have zero bite seams. He solves the slide-bolt and dial with intense, tail-wagging focus. Zero broken parts after 2 months of daily use.',
    helpfulCount: 46,
    verifiedPurchase: true,
  },
  {
    id: 'rev-3',
    author: 'Rohan & Pooja Singhania',
    city: 'Mumbai (Bandra West)',
    dogName: 'Leo',
    dogBreed: 'Golden Retriever',
    dogWeight: '27 kg',
    chewStrength: 'Medium / Standard',
    rating: 5,
    date: '2 weeks ago',
    title: 'A lifesaver during Mumbai monsoons when long walks are impossible.',
    reviewText:
      'When heavy rains hit Mumbai and outdoor walks are rained out, Leo would get hyperactive and chew doorframes out of pure frustration. ScentLoop gives him 5 complete olfactory hunt sessions throughout our workday. He burns all his mental energy sniffing out the herb cartridges and solving the wobble chamber. Worth every rupee.',
    helpfulCount: 39,
    verifiedPurchase: true,
  },
  {
    id: 'rev-4',
    author: 'Priya Nair',
    city: 'Pune (Koregaon Park)',
    dogName: 'Milo',
    dogBreed: 'Beagle',
    dogWeight: '12 kg',
    chewStrength: 'Small / Gentle',
    rating: 5,
    date: '3 weeks ago',
    title: 'No more frantic barking or overfeeding! Zero monthly subscription fees.',
    reviewText:
      'Beagles have unstoppable noses. I was paying ₹1,200/month for a dog camera that constantly disconnected over our apartment WiFi. ScentLoop runs autonomously on its internal timer and rechargeable USB-C battery. We leave for the office at 8:30 AM, return at 6 PM, and Milo is calm, happy, and peaceful.',
    helpfulCount: 28,
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
