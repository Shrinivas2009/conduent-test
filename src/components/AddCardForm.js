import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCard } from "../store/cardSlice";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import visaIcon from "../assets/visa.png";
import masterCardIcon from "../assets/mastercard.png";
import amexIcon from "../assets/amex.png";
import discoverIcon from "../assets/discover.png";


const getCardType = (number) => {
  const visaRegex = /^4\d{12}(\d{3})?$/;
  const masterCardRegex = /^5[1-5]\d{14}$/;
  const amexRegex = /^3[47]\d{13}$/;
  const discoverRegex = /^6(?:011|5\d{2})\d{12}$/;

  if (visaRegex.test(number)) return { type: "Visa", icon: visaIcon, valid: true };
  if (masterCardRegex.test(number))
    return { type: "MasterCard", icon: masterCardIcon, valid: true };
  if (amexRegex.test(number)) return { type: "AMEX", icon: amexIcon, valid: true };
  if (discoverRegex.test(number))
    return { type: "Discover", icon: discoverIcon, valid: true };
  return { type: "Invalid", icon: null, valid: false };
};


const formatCardNumber = (value) => {
  return value
    .replace(/\s+/g, "") // Remove existing spaces
    .replace(/[^0-9]/g, "") // Allow only digits
    .slice(0, 16) // Limit to 16 digits
    .replace(/(\d{4})/g, "$1 ") // Add space every 4 digits
    .trim(); // Remove trailing space
};

const AddCardForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    cardholderName: "",
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cvv: "",
    zipCode: "",
  });
  const [cardType, setCardType] = useState({ type: "", icon: null, valid: true });
  const [cardError, setCardError] = useState("");
  console.log("Form Data:", formData);
  
  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardNumber") {
      formattedValue = formatCardNumber(value);
      const cleanNumber = formattedValue.replace(/\s+/g, "");
      const detectedCard = getCardType(cleanNumber);
      setCardType(detectedCard);

      if (!detectedCard.valid && cleanNumber.length === 16) {
        setCardError("Invalid card number for the detected card type.");
      } else {
        setCardError("");
      }
    }

   if (name === "expMonth") {
      formattedValue = value.replace(/[^0-9]/g, "").slice(0, 2);
    }

    if (name === "expYear") {
      formattedValue = value.replace(/[^0-9]/g, "").slice(0, 4);
    }

    setFormData({
      ...formData,
      [name]: formattedValue,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
  
    const cleanCardNumber = formData.cardNumber.replace(/\s+/g, "");
  
    if (!cleanCardNumber || cleanCardNumber.length !== 16) {
      setCardError("Card number must be 16 digits.");
      return;
    }
  
   if (
      !formData.cardholderName ||
      !formData.expMonth ||
      !formData.expYear ||
      !formData.cvv ||
      !formData.zipCode
    ) {
      alert("All fields are required.");
      return;
    }
  
    const detectedCard = getCardType(cleanCardNumber);
  
    if (!detectedCard.valid) {
      setCardError("Invalid card number for the detected card type.");
      return;
    }
  
    // Dispatch card data to Redux
    dispatch(
      addCard({
        type: detectedCard.type,
        number: cleanCardNumber, 
      })
    );
  
    alert("Card added successfully!");
    setCardError("");
  };

  return (
    <Box
      sx={{
        padding: 3,
        maxWidth: 1000,
        margin: "auto",
        border: "1px solid #ccc",
        borderRadius: 2,
      }}
    >
      

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Cardholder's Name */}
          <Grid item xs={12} sm={6}>
            <Typography fontWeight="bold">Cardholder’s Name *</Typography>
            <TextField
              fullWidth
              placeholder="Enter Cardholder's Name"
              name="cardholderName"
              value={formData.cardholderName}
              onChange={handleInputChange}
              required
            />
          </Grid>

          {/* Card Number */}
          <Grid item xs={12} sm={6}>
            <Typography fontWeight="bold">Card Number *</Typography>
            <TextField
                fullWidth
                placeholder="1234 5678 9012 3456"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                required
                InputProps={{
                    inputProps: { maxLength: 19 }, // 16 digits + 3 spaces
                    endAdornment: cardType.icon && (
                    <InputAdornment position="end">
                        <img src={cardType.icon} alt={cardType.type} width="30" />
                    </InputAdornment>
                    ),
                }}
                />

          </Grid>

          {/* Expiry Month */}
          <Grid item xs={6} sm={3}>
            <Typography fontWeight="bold">Exp. Month *</Typography>
            <TextField
              fullWidth
              placeholder="MM"
              name="expMonth"
              value={formData.expMonth}
              onChange={handleInputChange}
              required
              inputProps={{ maxLength: 2 }}
            />
          </Grid>

          {/* Expiry Year */}
          <Grid item xs={6} sm={3}>
            <Typography fontWeight="bold">Exp. Year *</Typography>
            <TextField
              fullWidth
              placeholder="YYYY"
              name="expYear"
              value={formData.expYear}
              onChange={handleInputChange}
              required
              inputProps={{ maxLength: 4 }}
            />
          </Grid>

          {/* CVV */}
          <Grid item xs={6} sm={3}>
            <Typography fontWeight="bold">CVV *</Typography>
            <TextField
              fullWidth
              placeholder="CVV"
              name="cvv"
              value={formData.cvv}
              onChange={handleInputChange}
              required
              inputProps={{ maxLength: 3 }}
            />
          </Grid>

          {/* ZIP/Postal Code */}
          <Grid item xs={6} sm={3}>
            <Typography fontWeight="bold">ZIP/Postal Code *</Typography>
            <TextField
              fullWidth
              placeholder="ZIP Code"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              required
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button variant="contained" color="warning" type="submit" fullWidth>
              ADD
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddCardForm;
