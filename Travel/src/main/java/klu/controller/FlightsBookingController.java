package klu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import klu.model.FlightsBooking;
import klu.service.FlightsBookingService;

@RestController
@RequestMapping("/api/flightsbooking")
@CrossOrigin(origins = "http://localhost:3000")  // adjust if needed
public class FlightsBookingController {

    @Autowired
    private FlightsBookingService service;

    @PostMapping("/add")
    public FlightsBooking saveBooking(@RequestBody FlightsBooking booking) {
        return service.saveBooking(booking);
    }
}
