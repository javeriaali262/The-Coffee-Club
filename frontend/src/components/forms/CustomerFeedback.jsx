import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createFeedback } from '../../services/api';

// Require a name, rating, and comment.
const feedbackSchema = z.object({
  name: z.string().trim().min(1, 'Your name is required.'),
  rating: z.string().min(1, 'Please select a rating.'),
  comment: z.string().trim().min(1, 'Please enter a comment.'),
});

function CustomerFeedback() {
  // Connect the feedback fields to the validation schema.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(feedbackSchema) });

  async function handleFeedbackSubmit(data) {
    try {
      const result = await createFeedback(data);
      alert(result.data.message);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert(error.response?.data?.message || 'Unable to submit feedback.');
    }
  }

  return (
    <div className="admin-card mx-auto mb-4" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">Customer: Feedback</h3>
      <form noValidate onSubmit={handleSubmit(handleFeedbackSubmit)}>
        <div className="mb-3">
          <label htmlFor="customerFeedbackName" className="form-label">Your Name</label>
          <input type="text" className="form-control" id="customerFeedbackName" placeholder="Enter your name" {...register('name')} />
          {errors.name && <div className="text-danger">{errors.name.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="customerFeedbackRating" className="form-label">Rating</label>
          <select className="form-select" id="customerFeedbackRating" {...register('rating')}>
            <option value="">Choose a rating...</option>
            <option>5 - Excellent</option>
            <option>4 - Good</option>
            <option>3 - Okay</option>
            <option>2 - Bad</option>
            <option>1 - Very Bad</option>
          </select>
          {errors.rating && <div className="text-danger">{errors.rating.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="customerFeedbackComment" className="form-label">Comment</label>
          <textarea className="form-control" id="customerFeedbackComment" rows="3" placeholder="Tell us what you think" {...register('comment')}></textarea>
          {errors.comment && <div className="text-danger">{errors.comment.message}</div>}
        </div>
        <button type="submit" className="btn btn-coffee">Submit</button>
      </form>
    </div>
  );
}

export default CustomerFeedback;