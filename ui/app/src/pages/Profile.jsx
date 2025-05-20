import React from "react";
import { Box, Typography, Container, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;

  if (!user) {
    return (
      <Container maxWidth="xs">
        <Typography variant="h6" color="error" textAlign="center" mt={4}>
          No user data found. Please login first.
        </Typography>
        <Button onClick={() => navigate("/login")}>Go to Login</Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" textAlign="center" mt={4} mb={2}>
        Profile
      </Typography>
      <Box mb={2}>
        <Typography>
          <b>Name:</b> {user.name}
        </Typography>
        <Typography>
          <b>Email:</b> {user.email}
        </Typography>
        <Typography>
          <b>Age:</b> {user.age}
        </Typography>
        <Typography>
          <b>Address:</b> {user.address}
        </Typography>
      </Box>
      <Button variant="contained" fullWidth onClick={() => navigate("/login")}>
        Logout
      </Button>
    </Container>
  );
};

export default Profile;
