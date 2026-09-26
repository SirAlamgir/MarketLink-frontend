import React from 'react';
import { 
  Star, 
  Quote, 
  CheckCircle, 
  MessageSquarePlus, 
  ThumbsUp, 
  Sparkles 
} from 'lucide-react';

export default function CustomerReviews({ reviews, onOpenWriteReview }) {
  return (
    <section id="reviews" className="py-14 px-4 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="inline-block mb-4 text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-3.5 py-1.5 rounded-full border border-amber-300 shadow-xs">
            Verified Market Shoppers
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 font-heading leading-tight mt-3">
            Community Ratings & Feedback
          </h2>
          <p className="text-slate-600 text-sm font-medium mt-1">
            Read real customer feedback left after completed market stall pickups.
          </p>
        </div>

        <button
          onClick={onOpenWriteReview}
          className="btn-amber text-xs py-2.5 px-4 shadow-amber-500/20"
        >
          <MessageSquarePlus className="w-4 h-4" />
          <span>Write a Customer Review</span>
        </button>
      </div>

      {/* Reviews Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((rev) => (
          <div
            key={rev.review_id}
            className="glass-card rounded-3xl p-6 border border-slate-200/80 flex flex-col justify-between relative group hover-card"
          >
            <div>
              {/* Top rating & quote icon */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < rev.rating ? 'fill-current' : 'text-slate-200'}`}
                    />
                  ))}
                  <span className="text-slate-900 font-extrabold text-xs ml-1">{rev.rating}.0</span>
                </div>

                <Quote className="w-6 h-6 text-emerald-200 group-hover:text-emerald-400 transition" />
              </div>

              {/* Comment text */}
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic mb-4">
                "{rev.comment}"
              </p>
            </div>

            {/* Author info */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <div>
                <div className="flex items-center gap-1.5 font-extrabold text-slate-900">
                  <span>{rev.customer_name}</span>
                  {rev.verified && (
                    <span className="text-emerald-600 flex items-center gap-0.5 text-[10px] bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                      <CheckCircle className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 font-semibold mt-0.5">
                  Farm: {rev.farmer_name}
                </p>
              </div>

              <span className="text-[10px] text-slate-400 font-medium">
                {rev.date}
              </span>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
