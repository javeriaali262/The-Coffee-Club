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
  note: z.string().trim().min(1, 'Please enter a special request.'),
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
      <form noValidate onSubmit={handleSubmit(handleReservationSubmit)}>
        <div className="mb-3">
          <label htmlFor="customerResName" className="form-label">Name</label>
          <input type="text" className="form-control" id="customerResName" placeholder="Enter your name" {...register('name')} />
          {errors.name && <div className="text-danger">{errors.name.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="customerResPhone" className="form-label">Phone Number</label>
          <input type="tel" className="form-control" id="customerResPhone" placeholder="03XX XXXXXXX" {...register('phone')} />
          {errors.phone && <div className="text-danger">{errors.phone.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="customerResDate" className="form-label">Date</label>
          <input type="date" className="form-control" id="customerResDate" {...register('date')} />
          {errors.date && <div className="text-danger">{errors.date.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="customerResTime" className="form-label">Time</label>
          <input type="time" className="form-control" id="customerResTime" {...register('time')} />
          {errors.time && <div className="text-danger">{errors.time.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="customerResGuests" className="form-label">Number of Guests</label>
          <input type="number" min="1" className="form-control" id="customerResGuests" placeholder="e.g. 4" {...register('guests')} />
          {errors.guests && <div className="text-danger">{errors.guests.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="customerResNote" className="form-label">Special Request</label>
          <textarea className="form-control" id="customerResNote" rows="3" placeholder="e.g. Window seat, birthday setup" {...register('note')}></textarea>
          {errors.note && <div className="text-danger">{errors.note.message}</div>}
        </div>
        <button type="submit" className="btn btn-coffee">Book Table</button>
      </form>
    </div>
  );
}

export default CustomerReservation;