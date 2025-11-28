package klu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import klu.model.BusTicket;
import klu.repository.BusTicketRepository;
import klu.service.BusTicketService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/tickets")
public class BusTicketController {

    @Autowired
    private BusTicketService ticketService;

    @Autowired
    private BusTicketRepository ticketRepository;

    @PostMapping("/book")
    public ResponseEntity<?> bookTicket(@RequestBody BusTicket ticket) {
        try {
            boolean exists = ticketRepository.existsBySeatNumbersAndTravelDateAndFromCityAndToCity(
                ticket.getSeatNumbers(), ticket.getTravelDate(), ticket.getFromCity(), ticket.getToCity()
            );

            if (exists) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("Seat already booked for this route/date.");
            }

            BusTicket savedTicket = ticketService.saveTicket(ticket);
            return ResponseEntity.ok(savedTicket);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("❌ Error saving ticket: " + e.getMessage());
        }
    }
}
 