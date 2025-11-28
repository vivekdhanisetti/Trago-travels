package klu.model;

import jakarta.persistence.*;

@Entity
@Table(
    name = "booking",
    uniqueConstraints = @UniqueConstraint(columnNames = {"email", "train_name", "travel_date"})
)
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String email;
    private String trainName;
    private String source;
    private String destination;
    private String travelClass;
    private String travelDate;   // Keep as String for easier frontend mapping
    private int passengers;
    private double amount;
    private String paymentMethod;
    private double totalFare;

    @Column(name = "ticket_count", nullable = false)
    private int ticketCount;

    // ✅ New field for cancellation status
    @Column(name = "status", nullable = false)
    private String status = "Booked"; // default value is "Booked"

    // Getters and Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getTrainName() { return trainName; }
    public void setTrainName(String trainName) { this.trainName = trainName; }

    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }

    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }

    public String getTravelClass() { return travelClass; }
    public void setTravelClass(String travelClass) { this.travelClass = travelClass; }

    public String getTravelDate() { return travelDate; }
    public void setTravelDate(String travelDate) { this.travelDate = travelDate; }

    public int getPassengers() { return passengers; }
    public void setPassengers(int passengers) { this.passengers = passengers; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public int getTicketCount() { return ticketCount; }
    public void setTicketCount(int ticketCount) { this.ticketCount = ticketCount; }

    public double getTotalFare() { return totalFare; }
    public void setTotalFare(double totalFare) { this.totalFare = totalFare; }

    // ✅ Getter and Setter for cancellation status
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}