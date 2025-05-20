// Copied from chatgpt

import React, { useState } from "react";
import { Box, TextField, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    age: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState([]);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setFieldErrors([]);
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setFieldErrors([]);
    setSuccess("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          age: formData.age ? Number(formData.age) : formData.age,
        }),
      });
      const result = await res.json();
      if (!res.ok) {
        setError(result.msg || result.message || "Signup failed");
        if (result.errors) setFieldErrors(result.errors);
      } else {
        setSuccess(result.msg || "Signup successful!");
        setFormData({
          email: "",
          password: "",
          name: "",
          age: "",
          address: "",
        });
        // Redirect to login after short delay
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" textAlign="center" mt={4} mb={2}>
        Sign Up
      </Typography>
      {error && (
        <Typography color="error" textAlign="center" mb={1}>
          {error}
        </Typography>
      )}
      {fieldErrors.length > 0 && (
        <Box mb={1}>
          {fieldErrors.map((err, idx) => (
            <Typography color="error" key={idx} fontSize={14}>
              {err.field}: {err.message}
            </Typography>
          ))}
        </Box>
      )}
      {success && (
        <Typography color="primary" textAlign="center" mb={1}>
          {success}
        </Typography>
      )}
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          name="email"
          margin="normal"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          margin="normal"
          value={formData.password}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Name"
          name="name"
          margin="normal"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Age"
          name="age"
          type="number"
          margin="normal"
          value={formData.age}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Address"
          name="address"
          margin="normal"
          value={formData.address}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Sign Up
        </Button>
      </Box>
      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        onClick={() => navigate("/login")}
      >
        Login With Credentials
      </Button>
    </Container>
  );
};

export default Signup;
