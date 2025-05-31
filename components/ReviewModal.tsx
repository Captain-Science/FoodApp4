
import React, { useState, useEffect } from 'react';
import { Product, Review, User } from '../types';

interface ReviewModalProps {
  product: Product | null;
  currentUser: User | null;
  onClose: () => void;
  onAddReview: (productId: string, reviewText: string, rating: number) => void;
  onEditReview: (productId: string, reviewId: string, reviewText: string, rating: number) => void;
  isAdmin: boolean; // Added
  onDeleteReview: (productId: string, reviewId: string) => void; // Added
}

const StarRatingInput: React.FC<{ rating: number; setRating: (rating: number) => void }> = ({ rating, setRating }) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          aria-label={`Rate ${star} out of 5 stars`}
          onClick={() => setRating(star)}
          className={`text-3xl transition-colors ${star <= rating ? 'text-yellow-400 hover:text-yellow-300' : 'text-gray-300 hover:text-yellow-400'}`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

const ReviewModal: React.FC<ReviewModalProps> = ({ product, currentUser, onClose, onAddReview, onEditReview, isAdmin, onDeleteReview }) => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const [isEditing, setIsEditing] = useState<Review | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (product && currentUser) {
      const userReview = product.reviews.find(r => r.userId === currentUser.id);
      if (userReview && !isEditing) { // Don't hide form if currently editing
        setShowForm(false);
      } else if (!userReview && !isEditing) {
        setShowForm(false); 
      }
    }
    if (!isEditing) { // Only reset if not in edit mode from a previous action
        setReviewText('');
        setRating(5);
    }
  }, [product, currentUser, isEditing]); 

  if (!product || !currentUser) return null;

  const handleCloseModal = () => {
    setReviewText('');
    setRating(5);
    setIsEditing(null);
    setShowForm(false);
    onClose();
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) {
        alert("Review text cannot be empty.");
        return;
    }
    if (isEditing) {
      onEditReview(product.id, isEditing.id, reviewText, rating);
    } else {
      onAddReview(product.id, reviewText, rating);
    }
    setReviewText('');
    setRating(5);
    setIsEditing(null);
    setShowForm(false); 
  };

  const startEdit = (review: Review) => {
    setIsEditing(review);
    setReviewText(review.text);
    setRating(review.rating);
    setShowForm(true);
  };
  
  const userHasReviewed = product.reviews.some(r => r.userId === currentUser.id);

  const handleDeleteClick = (reviewId: string) => {
    onDeleteReview(product.id, reviewId);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-lime-50 p-6 md:p-8 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-green-200 text-green-800">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-emerald-700">Reviews for {product.name}</h2>
          <button onClick={handleCloseModal} className="text-gray-500 hover:text-green-600 text-3xl font-light" aria-label="Close reviews modal">&times;</button>
        </div>

        <div className="overflow-y-auto flex-grow mb-6 pr-2">
          {product.reviews.length === 0 && !showForm && (
            <p className="text-gray-500 text-center py-4">No reviews yet. Be the first to add one!</p>
          )}
          {product.reviews.map(review => (
            <div key={review.id} className="border-b border-lime-200 py-4">
              <div className="flex justify-between items-start mb-1">
                <div className="flex-grow">
                    <p className="font-semibold text-emerald-600">{review.userName}</p>
                    <p className="text-xs text-gray-500 mb-2">{new Date(review.date).toLocaleDateString()}</p>
                </div>
                <div className="flex text-yellow-400 ml-2">
                  {Array(5).fill(0).map((_, i) => (
                    <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-lime-300'}>★</span>
                  ))}
                </div>
              </div>
              <p className="text-green-700 whitespace-pre-wrap mb-2">{review.text}</p>
              <div className="flex space-x-3 items-center">
                {review.userId === currentUser.id && !isEditing && ( 
                  <button 
                    onClick={() => startEdit(review)}
                    className="text-sm text-orange-600 hover:text-orange-500"
                  >
                    Edit Your Review
                  </button>
                )}
                {isAdmin && (review.userId !== currentUser.id || (review.userId === currentUser.id && !isEditing)) && ( // Admin can delete any, or own if not editing
                   <button 
                    onClick={() => handleDeleteClick(review.id)}
                    className="text-sm text-red-500 hover:text-red-400"
                  >
                    Delete Review
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {!userHasReviewed && !showForm && !isEditing && (
          <button
            onClick={() => setShowForm(true)}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 px-4 rounded-lg shadow-md transition-colors duration-150 mb-4"
          >
            Add Your Review
          </button>
        )}

        {(showForm || isEditing) && (
          <form onSubmit={handleFormSubmit} className="mt-4 border-t border-lime-200 pt-6">
            <h3 className="text-xl font-semibold text-emerald-600 mb-3">{isEditing ? 'Edit Your Review' : 'Add Your Review'}</h3>
            <div className="mb-4">
              <label htmlFor="rating" className="block text-sm font-medium text-green-700 mb-1">Rating</label>
              <StarRatingInput rating={rating} setRating={setRating} />
            </div>
            <div className="mb-4">
              <label htmlFor="reviewText" className="block text-sm font-medium text-green-700 mb-1">Review</label>
              <textarea
                id="reviewText"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows={4}
                className="w-full p-2.5 bg-white border border-lime-300 rounded-md text-green-800 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm"
                required
              ></textarea>
            </div>
            <div className="flex justify-end space-x-3">
              <button 
                type="button"
                onClick={() => { setShowForm(false); setIsEditing(null); setReviewText(''); setRating(5); }}
                className="py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button type="submit" className="py-2 px-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md transition-colors shadow-sm">
                {isEditing ? 'Update Review' : 'Submit Review'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ReviewModal;
