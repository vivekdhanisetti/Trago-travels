package klu.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import klu.model.Booking;
import klu.repository.BookingRepository;

import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    // Save booking (always create new, no duplicate check)
    public Booking saveBooking(Booking booking) {

        // Required validation
        if (booking.getEmail() == null || booking.getEmail().isEmpty() ||
            booking.getTrainName() == null || booking.getTrainName().isEmpty() ||
            booking.getTravelDate() == null || booking.getTravelDate().isEmpty()) {

            throw new IllegalArgumentException("Missing required booking information!");
        }

        // Defaults
        if (booking.getPassengers() <= 0) booking.setPassengers(1);
        booking.setTicketCount(booking.getPassengers());

        double farePerPassenger = booking.getAmount() > 0 ? booking.getAmount() : 0;
        booking.setTotalFare(farePerPassenger * booking.getPassengers());

        return bookingRepository.save(booking);
    }

    // Cancel booking
    public Booking cancelBooking(int bookingId) {
        Optional<Booking> optionalBooking = bookingRepository.findById(bookingId);

        if (!optionalBooking.isPresent()) {
            throw new RuntimeException("Booking not found");
        }

        Booking booking = optionalBooking.get();

        if ("Canceled".equalsIgnoreCase(booking.getStatus())) {
            throw new RuntimeException("Booking already canceled");
        }

        booking.setStatus("Canceled");
        return bookingRepository.save(booking);
    }
}