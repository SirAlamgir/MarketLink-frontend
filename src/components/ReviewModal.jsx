import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Send, 
  CheckCircle, 
  MessageSquare 
} from 'lucide-react';

export default function ReviewModal({ isOpen, onClose, farmers, onSubmitReview }) {
  const [customerName, setCustomerName] = useState('');
  const [selectedFarmerId, setSelectedFarmerId] = useState(farmers[0]?.farmer_id || 101);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim() || !customerName.trim()) return;

    const farmer = farmers.find(f => f.farmer_id === Number(selectedFarmerId)) || farmers[0];

    const newReview = {
      review_id: Date.now(),
      customer_name: customerName,
      rating: Number(rating),
      comment: comment,
      date: "Just now",
      farmer_name: `${farmer.farmer_name} (${farmer.stall_name})`,
      verified: true
    };

    onSubmitReview(newReview);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setCustomerName('');
      setComment('');
      onClose();
    }, 1200);
  };

  return (
    <div className="modal-overlay">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-green-700 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-amber-300">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base font-heading">Leave a Customer Review</h3>
              <p className="text-xs text-emerald-200">Share your stall pickup experience</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-white/20 text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form or Confirmation */}
        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              ✓
            </div>
            <h4 className="font-extrabold text-slate-900 text-lg">Thank You for Your Feedback!</h4>
            <p className="text-xs text-slate-500">Your review has been published to the community board.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Your Name:</label>
              <input
                type="text"
                required
                placeholder="e.g. Alex Morgan"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Select Farm Stall:</label>
              <select
                value={selectedFarmerId}
                onChange={(e) => setSelectedFarmerId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {farmers.map(f => (
                  <option key={f.farmer_id} value={f.farmer_id}>
                    {f.stall_name} ({f.farmer_name})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Overall Rating:</label>
              <div className="flex items-center gap-2 pt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className="p-1 hover:scale-110 transition"
                  >
                    <Star
                      className={`w-6 h-6 ${star <= rating ? 'text-amber-400 fill-current' : 'text-slate-200'}`}
                    />
                  </button>
                ))}
                <span className="font-extrabold text-slate-800 text-sm ml-2">{rating}.0 / 5</span>
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Your Comment / Review:</label>
              <textarea
                required
                rows={3}
                placeholder="How was the produce freshness, pickup convenience, or farmer friendliness?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full py-3 text-xs mt-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Verified Review</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
