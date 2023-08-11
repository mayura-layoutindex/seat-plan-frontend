import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Seat from "../components/Seat";
import { useLocation } from "react-router-dom";
import { Button, Typography } from "@mui/material";

const Seats = ({ socket }) => {
  const seatNumbers = [
    "A1",
    "A2",
    "A3",
    "A4",
    "A5",
    "A6",
    "A7",
    "A8",
    "A9",
    "A10",
    "A11",
    "A12",
    "A13",
    "A14",
    "A15",
    "A16",
    "A17",
    "A18",
    "A19",
    "A20",
    "A21",
    "A22",
    "A24",
  ];

  const [booking, setBooking] = useState("");
  const [bookings, setBookings] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const movieName = queryParams.get("movie");
  const showTime = queryParams.get("show-time");
  let showTimeText = "";

  if (showTime === "showtime1") {
    showTimeText = "10:00 AM - 12:00 PM";
  } else if (showTime === "showtime2") {
    showTimeText = "2:00 PM - 4:00 PM";
  } else if (showTime === "showtime3") {
    showTimeText = "7:00 PM - 9:00 PM";
  }

  // useEffect(() => {
  //   console.log("seats", socket);
  //   socket.on("booking", (newBooking) => {
  //     console.log("newBooking:", newBooking);
  //     setBookings((prevBookings) => {
  //       if (prevBookings.includes(newBooking)) {
  //         return prevBookings.filter((booking) => booking !== newBooking);
  //       } else {
  //         return [...prevBookings, newBooking];
  //       }
  //     });
  //   });

  //   socket.on("new", (data) => {
  //     console.log("data:");
  //   });

  //   socket.on("initialBookings", (initialBookings) => {
  //     console.log("initialBookings:", initialBookings);
  //     setSelectedSeats(initialBookings);
  //     setBookings(initialBookings);
  //   });
  // }, []);

  useEffect(() => {
    console.log(bookings);
    setSelectedSeats(bookings);
  }, [bookings]);

  const sendBooking = (message) => {
    console.log(message);
    socket.emit("booking", message);
    setBooking("");
  };

  return (
    <Box sx={{ flexGrow: 1, height: "100%" }}>
      <Grid container justifyContent="center" height="5%" alignItems="end">
        <Button
          variant="contained"
          disableElevation
          href="/"
          sx={{ height: "80%", textTransform: "none" }}
        >
          Home
        </Button>
      </Grid>
      <Grid
        container
        item
        xs={12}
        height="20%"
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          variant="h4"
          align="center"
          textTransform="capitalize"
          sx={{ fontWeight: "bold", color: "white" }}
        >
          {movieName} ({showTimeText})
        </Typography>
      </Grid>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        height="75%"
        px="60px"
      >
        <Grid
          container
          columnSpacing={2}
          rowSpacing={4}
          justifyContent="center"
          alignItems="center"
        >
          {seatNumbers.map((seatNumber, index) => (
            <Grid
              key={index}
              item
              xs={1}
              justifyContent="center"
              onClick={() => {
                sendBooking(seatNumber);
              }}
            >
              <Seat
                seatNumber={seatNumber}
                selected={selectedSeats.includes(seatNumber)}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Seats;
