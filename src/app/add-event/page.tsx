'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Crown, Send } from 'lucide-react';

export default function AddEventPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    eventType: 'festival',
    danceStyles: ['Salsa', 'Bachata'],
    ballroomCount: 3,
    city: '',
    country: 'United States',
    location: '',
    date: '',
    startTime: '12:00',
    endTime: '06:00',
    price: '',
    eventUrl: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to events
      </Link>

      <div className="mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/20 px-3 py-1 text-xs font-semibold text-amber-300 mb-2">
          <Crown className="h-3.5 w-3.5 text-amber-400" />
          <span>Global Latin Dance Directory Submission</span>
        </div>
        <h1 className="font-display text-3xl font-extrabold text-white">
          Submit a Latin Dance Congress or Event
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          List your multi-room Latin congress, weekend festival, or premier weekly social. Verified across all styles: Salsa, Bachata, Brazilian Zouk, Kizomba, and Merengue.
        </p>
      </div>

      {submitted ? (
        <div className="rounded-3xl border border-emerald-500/30 bg-emerald-950/20 p-8 sm:p-12 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400 mb-4" />
          <h2 className="font-display text-2xl font-bold text-white">
            Event Submitted for Verification!
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-zinc-300">
            Thank you for supporting the international Latin dance community. Our curation pipeline will verify the venue, artist lineup, and ticket links before making it live across the network.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-6 rounded-full bg-zinc-800 px-5 py-2 text-xs font-semibold text-white hover:bg-zinc-700 transition"
          >
            Submit Another Event
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="glass-gold-card rounded-3xl p-6 sm:p-8 space-y-6">
          
          {/* Event Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
              Event or Congress Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Miami Sensual Bachata & Latin Congress"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-[#0d0d14] px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none"
            />
          </div>

          {/* Type & Ballroom Count */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                Event Type
              </label>
              <select
                value={formData.eventType}
                onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-[#0d0d14] px-4 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
              >
                <option value="festival">Multi-Day Festival / Congress</option>
                <option value="social">Weekly / Monthly Social Dance</option>
                <option value="class">Masterclass / Intensive Workshop</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                Dedicated Ballrooms / Rooms
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={formData.ballroomCount}
                onChange={(e) => setFormData({ ...formData, ballroomCount: parseInt(e.target.value) || 1 })}
                className="w-full rounded-xl border border-white/10 bg-[#0d0d14] px-4 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          {/* City & Country Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                City *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Miami"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-[#0d0d14] px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                Country *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. United States"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-[#0d0d14] px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Physical Address */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
              Venue Name & Street Address *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Hyatt Regency Miami, 400 SE 2nd Ave, Miami, FL 33131"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-[#0d0d14] px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none"
            />
          </div>

          {/* Official URL */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
              Official Organizer or Ticket URL *
            </label>
            <input
              type="url"
              required
              placeholder="https://... (Direct website, Eventbrite, or Facebook event)"
              value={formData.eventUrl}
              onChange={(e) => setFormData({ ...formData, eventUrl: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-[#0d0d14] px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none"
            />
            <p className="mt-1 text-xs text-zinc-500">
              Anti-aggregator policy: No generic scrapers or competitor directories. Must be official first-party ticket or event link.
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
              Description (1–3 factual sentences)
            </label>
            <textarea
              rows={3}
              placeholder="Room breakdowns (Bachata room, Mambo room, Zouk room), instructor lineup, pool party info..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-[#0d0d14] px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="btn-gold-primary w-full py-3 text-sm justify-center"
            >
              <Send className="mr-2 h-4 w-4" />
              Submit Event for Review
            </button>
          </div>

        </form>
      )}

    </div>
  );
}
