import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCard, deleteCard, showAddCardForm } from '../store/cardSlice';
import { Box, Typography, Radio, Button, Grid } from '@mui/material';
import visaIcon from '../assets/visa.png';
import mastercardIcon from '../assets/mastercard.png';
import amexIcon from '../assets/amex.png';

const getCardIcon = (type) => {
  switch (type) {
    case 'Visa':
      return visaIcon;
    case 'MasterCard':
      return mastercardIcon;
    case 'AMEX':
      return amexIcon;
    default:
      return null;
  }
};

const CardList = () => {
  const dispatch = useDispatch();
  const { cards, selectedCardId, showAddCardForm: showForm } = useSelector((state) => state.cards);

  return (
    <Box sx={{ border: '1px solid #ddd', padding: 2, borderRadius: 2 }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Manage Saved Payments
      </Typography>

      {cards.map((card) => (
        <Grid container alignItems="center" spacing={1} key={card.id} sx={{ marginBottom: 1 }}>
          <Grid item>
            <Radio
              checked={selectedCardId === card.id}
              onChange={() => dispatch(selectCard(card.id))}
            />
          </Grid>
          <Grid item>
            <img src={getCardIcon(card.type)} alt={card.type} width="30" />
          </Grid>
          <Grid item>
            <Typography>{`${card.type} (${card.number})`}</Typography>
          </Grid>
        </Grid>
      ))}

      <Grid container alignItems="center" spacing={1} sx={{ marginBottom: 2 }}>
        <Grid item>
          <Radio
            checked={showForm}
            onChange={() => dispatch(showAddCardForm())}
          />
        </Grid>
        <Grid item>
          <Typography sx={{ color: 'blue', fontWeight: 'bold', cursor: 'pointer' }}>
            ADD NEW CARD
          </Typography>
        </Grid>
      </Grid>

      {selectedCardId && (
        <Button
          variant="contained"
          color="warning"
          onClick={() => dispatch(deleteCard())}
        >
          DELETE
        </Button>
      )}
    </Box>
  );
};

export default CardList;
