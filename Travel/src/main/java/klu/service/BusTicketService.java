package klu.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import klu.model.BusTicket;
import klu.repository.BusTicketRepository;

@Service
public class BusTicketService {

    @Autowired
    private BusTicketRepository busTicketRepository;

    public BusTicket saveTicket(BusTicket ticket) {
        return busTicketRepository.save(ticket);
    }
}
