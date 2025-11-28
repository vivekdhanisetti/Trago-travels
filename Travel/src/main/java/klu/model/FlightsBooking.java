package klu.model;

import jakarta.persistence.*;

@Entity
@Table(name = "flightsbooking")
public class FlightsBooking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fromLocation;
    private String destination;
    private String date;
    private String airline;
    private String classType;
    private String seats;
    private int price;
    private String travellerName;
    private String email;
    private String phone;

    public FlightsBooking() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFromLocation() { return fromLocation; }
    public void setFromLocation(String fromLocation) { this.fromLocation = fromLocation; }

    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getAirline() { return airline; }
    public void setAirline(String airline) { this.airline = airline; }

    public String getClassType() { return classType; }
    public void setClassType(String classType) { this.classType = classType; }

    public String getSeats() { return seats; }
    public void setSeats(String seats) { this.seats = seats; }

    public int getPrice() { return price; }
    public void setPrice(int price) { this.price = price; }

    public String getTravellerName() { return travellerName; }
    public void setTravellerName(String travellerName) { this.travellerName = travellerName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
}
