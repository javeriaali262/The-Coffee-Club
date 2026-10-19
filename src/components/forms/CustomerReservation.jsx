import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Require booking details and validate the guest count as a positive integer.
const reservationSchema = z.object({
  name: z.string().trim().min(1, 'Name is required.'),
  phone: z.string().trim().min(1, 'Phone number is required.'),
  date: z.string().min(1, 'Date is required.'),
  time: z.string().min(1, 'Time is required.'),
  guests: z.string().min(1, 'Number of guests is required.').refine((value) => Number.isInteger(Number(value)) && Number(value) > 0, 'Enter a whole number greater than 0.'),
  note: z.string().optional(),
});

function CustomerReservation() {
  // Connect the reservation form to its Zod rules.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(reservationSchema) });

  function handleReservationSubmit() {
    alert('Table booked! (demo)');
  }

  return (
    <div className="admin-card mx-auto mb-4" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">Customer: Table Reservation</h3>
      <form onSubmit={handleSubmit(handleReservationSubmit)}>
        {Object.values(errors).map((error, index) => (
          <div className="text-danger" key={`${error.message}-${index}`} role="alert">{error.message}</div>
        ))}
        <div className="mb-3">
          <label htmlFor="customerResName" className="form-label">Name</label>
          <input type="text" className="form-control" id="customerResName" placeholder="Enter your name" required {...register('name')} />
        </div>
        <div className="mb-3">
          <label htmlFor="customerResPhone" className="form-label">Phone Number</label>
          <input type="tel" className="form-control" id="customerResPhone" placeholder="03XX XXXXXXX" required {...register('phone')} />
        </div>
        <div className="mb-3">
          <label htmlFor="customerResDate" className="form-label">Date</label>
          <input type="date" className="form-control" id="customerResDate" required {...register('date')} />
        </div>
        <div className="mb-3">
          <label htmlFor="customerResTime" className="form-label">Time</label>
          <input type="time" className="form-control" id="customerResTime" required {...register('time')} />
        </div>
        <div className="mb-3">
          <label htmlFor="customerResGuests" className="form-label">Number of Guests</label>
          <input type="number" min="1" className="form-control" id="customerResGuests" placeholder="e.g. 4" required {...register('guests')} />
        </div>
        <div className="mb-3">
          <label htmlFor="customerResNote" className="form-label">Special Request</label>
          <textarea className="form-control" id="customerResNote" rows="3" placeholder="e.g. Window seat, birthday setup" {...register('note')}></textarea>
        </div>
        <button type="submit" className="btn btn-coffee">Book Table</button>
      </form>
    </div>
  );
}

export default CustomerReservation;