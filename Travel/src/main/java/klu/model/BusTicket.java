package klu.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "bustickets")
public class BusTicket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "booked_by")
    private String bookedBy;

    private String operator;
    private String fromCity;
    private String toCity;
    private LocalDate travelDate;
    private String departTime;
    private String arriveTime;
    private String seatNumbers;
    private Double totalFare;

    @Lob
    private String passengerDetails; // JSON string

    private String bookingTime;

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getOperator() { return operator; }
    public void setOperator(String operator) { this.operator = operator; }

    public String getFromCity() { return fromCity; }
    public void setFromCity(String fromCity) { this.fromCity = fromCity; }

    public String getToCity() { return toCity; }
    public void setToCity(String toCity) { this.toCity = toCity; }

    public LocalDate getTravelDate() { return travelDate; }
    public void setTravelDate(LocalDate travelDate) { this.travelDate = travelDate; }

    public String getDepartTime() { return departTime; }
    public void setDepartTime(String departTime) { this.departTime = departTime; }

    public String getArriveTime() { return arriveTime; }
    public void setArriveTime(String arriveTime) { this.arriveTime = arriveTime; }

    public String getSeatNumbers() { return seatNumbers; }
    public void setSeatNumbers(String seatNumbers) { this.seatNumbers = seatNumbers; }

    public Double getTotalFare() { return totalFare; }
    public void setTotalFare(Double totalFare) { this.totalFare = totalFare; }

    public String getPassengerDetails() { return passengerDetails; }
    public void setPassengerDetails(String passengerDetails) { this.passengerDetails = passengerDetails; }

    public String getBookingTime() { return bookingTime; }
    public void setBookingTime(String bookingTime) { this.bookingTime = bookingTime; }

    public String getBookedBy() { return bookedBy; }
    public void setBookedBy(String bookedBy) { this.bookedBy = bookedBy; }
}
