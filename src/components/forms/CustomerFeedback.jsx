import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Require a name and rating; let customers submit a comment optionally.
const feedbackSchema = z.object({
  name: z.string().trim().min(1, 'Your name is required.'),
  rating: z.string().min(1),
  comment: z.string().optional(),
});

function CustomerFeedback() {
  // Connect the feedback fields to the validation schema.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(feedbackSchema) });

  function handleFeedbackSubmit() {
    alert('Thank you for your feedback! (demo)');
  }

  return (
    <div className="admin-card mx-auto mb-4" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">Customer: Feedback</h3>
      <form onSubmit={handleSubmit(handleFeedbackSubmit)}>
        {Object.values(errors).map((error, index) => (
          <div className="text-danger" key={`${error.message}-${index}`} role="alert">{error.message}</div>
        ))}
        <div className="mb-3">
          <label htmlFor="customerFeedbackName" className="form-label">Your Name</label>
          <input type="text" className="form-control" id="customerFeedbackName" placeholder="Enter your name" required {...register('name')} />
        </div>
        <div className="mb-3">
          <label htmlFor="customerFeedbackRating" className="form-label">Rating</label>
          <select className="form-select" id="customerFeedbackRating" {...register('rating')}>
            <option>5 - Excellent</option>
            <option>4 - Good</option>
            <option>3 - Okay</option>
            <option>2 - Bad</option>
            <option>1 - Very Bad</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="customerFeedbackComment" className="form-label">Comment</label>
          <textarea className="form-control" id="customerFeedbackComment" rows="3" placeholder="Tell us what you think" {...register('comment')}></textarea>
        </div>
        <button type="submit" className="btn btn-coffee">Submit</button>
      </form>
    </div>
  );
}

export default CustomerFeedback;