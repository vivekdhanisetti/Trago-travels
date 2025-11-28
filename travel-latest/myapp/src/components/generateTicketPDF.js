import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import QRCode from "qrcode";

/**
 * Generates a PDF boarding pass / e-ticket with passenger and flight details.
 * @param {Object} details - Ticket details (name, email, phone, flight info, seats, price, etc.)
 */
export async function generateTicketPDF(details) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const margin = 40;
  let cursorY = 40;

  // ---- Header / Logo ----
  if (details.logoDataUrl) {
    doc.addImage(details.logoDataUrl, "PNG", margin, cursorY, 70, 70);
  }

  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  const titleX = details.logoDataUrl ? margin + 90 : margin;
  doc.text("✈ Boarding Pass / E-Ticket", titleX, cursorY + 28);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Booking ID: ${details.bookingId}`, titleX, cursorY + 46);

  cursorY += 90;
  doc.setDrawColor(200);
  doc.line(margin, cursorY, doc.internal.pageSize.getWidth() - margin, cursorY);
  cursorY += 18;

  // ---- Passenger Table ----
  doc.setFontSize(12);
  doc.text("Passenger Details", margin, cursorY);
  autoTable(doc, {
    startY: cursorY + 6,
    theme: "grid",
    head: [["Name", "Email", "Phone"]],
    body: [[details.name, details.email, details.phone]],
    styles: { fontSize: 10 },
    margin: { left: margin, right: margin },
  });

  cursorY = doc.lastAutoTable.finalY + 14;

  // ---- Flight Table ----
  doc.text("Flight Details", margin, cursorY);
  autoTable(doc, {
    startY: cursorY + 6,
    theme: "grid",
    head: [["From", "To", "Date", "Flight", "Class"]],
    body: [[
      details.from,
      details.to,
      details.date,
      details.flightNo,
      details.class,
    ]],
    styles: { fontSize: 10 },
    margin: { left: margin, right: margin },
  });

  cursorY = doc.lastAutoTable.finalY + 20;

  // ---- Seats & Fare ----
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Seats:", margin, cursorY);
  doc.setFont("helvetica", "normal");

  // ✅ FIX: Handle seats as array OR string safely
  const seatsText = Array.isArray(details.seats)
    ? details.seats.join(", ")
    : details.seats || "-";
  doc.text(seatsText, margin, cursorY + 18);

  doc.setFont("helvetica", "bold");
  doc.text("Total Fare:", margin + 300, cursorY);
  doc.setFontSize(14);
  doc.setTextColor("#087f23");
  doc.text(`₹ ${details.price}`, margin + 300, cursorY + 18);
  doc.setTextColor("#000");

  cursorY += 50;

  // ---- QR Code ----
  const qrPayload = {
    bookingId: details.bookingId,
    name: details.name,
    from: details.from,
    to: details.to,
    date: details.date,
    seats: seatsText,
    price: details.price,
  };

  try {
    const qrDataUrl = await QRCode.toDataURL(JSON.stringify(qrPayload));
    const qrX = doc.internal.pageSize.getWidth() - margin - 140;
    doc.addImage(qrDataUrl, "PNG", qrX, cursorY, 120, 120);
    doc.setFontSize(9);
    doc.text("Scan to verify ticket", qrX + 8, cursorY + 135);
  } catch (e) {
    console.error("QR code generation failed:", e);
  }

  // ---- Footer ----
  const footerY = doc.internal.pageSize.getHeight() - 50;
  doc.setFontSize(9);
  doc.text(
    "Please carry a valid Govt-ID. Check-in starts 3 hours before departure.",
    margin,
    footerY
  );

  // ---- Save PDF ----
  const safeName = (details.name || "Passenger").replace(/\s+/g, "_");
  doc.save(`ticket_${safeName}_${details.bookingId}.pdf`);
}
