'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'What types and sizes of treats fit into the internal carousel?',
    answer:
      'The sealed hopper accommodates dry round kibble, freeze-dried raw cubes, and dehydrated training morsels ranging from 5mm up to 16mm in diameter (approx. the size of a dime). Dual flexible silicone wiper blades prevent treat cracking or mechanical jamming.',
  },
  {
    question: 'How do you guarantee my aggressive power-chewer won’t destroy it?',
    answer:
      'We engineered ScentLoop with heavy commercial-grade vulcanized rubber and DuPont™ Zytel ballistic nylon. It features a weighted 8.5 lb cast core and a 360-degree curved unibody with zero protruding bite seams or plastic tabs. If your dog manages to damage any module within 60 days, we replace it immediately or issue a 100% refund under our Chew-Proof Guarantee.',
  },
  {
    question: 'Are the scent cartridges safe and non-toxic for dogs?',
    answer:
      'Yes, 100%. We use culinary-grade, human-edible dried botanicals (such as organic chamomile, meadow thyme, roasted fennel, and air-dried duck essence). We NEVER use synthetic aerosols, artificial chemical fragrances, or concentrated essential oils, which can be irritating or harmful to sensitive canine respiratory systems.',
  },
  {
    question: 'What if I have multiple dogs in the household?',
    answer:
      'Because ScentLoop releases micro-doses (only 1–2 pieces) rather than dumping large bowls of food, it does not trigger competitive resource guarding in most pack dynamics. For multi-dog households with high resource drive, we recommend placing two units in separate rooms or setting them on alternate cycle offsets.',
  },
  {
    question: 'How does it operate without a WiFi connection or monthly subscription?',
    answer:
      'ScentLoop operates autonomously using an onboard industrial micro-controller. You simply toggle the power switch before leaving for work. It handles the randomized 45–90 minute micro-sessions, acoustic chimes, scent diffusion, and mechanical lock rotations entirely offline. No camera privacy concerns in your home, no dropped WiFi, and $0 monthly fees.',
  },
  {
    question: 'How long does the battery last, and how is it cleaned?',
    answer:
      'The high-capacity 6,800 mAh internal lithium cell runs for 45+ standard workdays on a single USB-C charge (cable included). For cleaning, the internal treat hopper, silicone seals, and all 4 puzzle modules unclip in seconds and are 100% top-rack dishwasher safe.',
  },
  {
    question: 'What is your 60-Day "Happy Dog" Money-Back Guarantee?',
    answer:
      'Try ScentLoop in your home for 60 full days. If your dog doesn’t show noticeable mental fulfillment, calmer behavior, or solves the toy too quickly, return it in any condition for a full 100% refund. We even cover the return shipping.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-brand-50 border-t border-brand-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-100 text-sage-900 text-xs font-bold uppercase tracking-wider border border-sage-300">
            <HelpCircle className="w-3.5 h-3.5 text-sage-700" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-950 font-serif tracking-tight">
            Everything You Need to Know
          </h2>
          <p className="text-base sm:text-lg text-brand-800 leading-relaxed">
            Have questions about fit, safety, or treat sizes? We've got you covered.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-brand-200/90 shadow-sm overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleIndex(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-brand-950 hover:bg-brand-50/50 transition-colors"
                >
                  <span>{faq.question}</span>
                  <div
                    className={`w-7 h-7 rounded-full bg-brand-100 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-brand-900 text-white' : 'text-brand-700'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-sm text-brand-800 leading-relaxed border-t border-brand-100 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Banner */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-white border border-brand-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-full bg-sage-100 text-sage-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-sm text-brand-950">Have a specific question about your dog?</div>
              <div className="text-xs text-brand-600">Our canine behavioral support team responds within 2 hours.</div>
            </div>
          </div>
          <button
            onClick={() => {
              const cfg = document.getElementById('configurator');
              if (cfg) cfg.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-5 py-2.5 rounded-xl bg-brand-900 text-white text-xs font-bold hover:bg-brand-950 transition-all shrink-0"
          >
            Configure Your ScentLoop Kit
          </button>
        </div>
      </div>
    </section>
  );
}
