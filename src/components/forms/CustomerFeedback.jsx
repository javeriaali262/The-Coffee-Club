function CustomerFeedback() {
  return (
    <div className="admin-card mx-auto mb-4" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">Customer: Feedback</h3>
      <form onSubmit={(e) => { e.preventDefault(); alert("Thank you for your feedback! (demo)"); }}>
        <div className="mb-3">
          <label htmlFor="customerFeedbackName" className="form-label">Your Name</label>
          <input type="text" className="form-control" id="customerFeedbackName" placeholder="Enter your name" required />
        </div>
        <div className="mb-3">
          <label htmlFor="customerFeedbackRating" className="form-label">Rating</label>
          <select className="form-select" id="customerFeedbackRating">
            <option>5 - Excellent</option>
            <option>4 - Good</option>
            <option>3 - Okay</option>
            <option>2 - Bad</option>
            <option>1 - Very Bad</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="customerFeedbackComment" className="form-label">Comment</label>
          <textarea className="form-control" id="customerFeedbackComment" rows="3" placeholder="Tell us what you think"></textarea>
        </div>
        <button type="submit" className="btn btn-coffee">Submit</button>
      </form>
    </div>
  );
}

export default CustomerFeedback;