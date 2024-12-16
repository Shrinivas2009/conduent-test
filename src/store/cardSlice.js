import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cards: [
    { id: 1, type: 'Visa', number: 'XXXX XXXX XXXX 9012' },
    { id: 2, type: 'MasterCard', number: 'XXXX XXXX XXXX 0012' },
    { id: 3, type: 'AMEX', number: 'XXXX XXXX XXXX 9212' },
  ],
  selectedCardId: null,
  showAddCardForm: false,
};

const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    selectCard: (state, action) => {
      state.selectedCardId = action.payload;
      state.showAddCardForm = false;
    },
    deleteCard: (state) => {
      state.cards = state.cards.filter((card) => card.id !== state.selectedCardId);
      state.selectedCardId = null;
    },
    showAddCardForm: (state) => {
      state.showAddCardForm = true;
      state.selectedCardId = null;
    },
    // addCard: (state, action) => {
    //   const newCard = {
    //     id: state.cards.length + 1,
    //     type: action.payload.type,
    //     number: `XXXX XXXX XXXX ${action.payload.number.slice(-4)}`,
    //   };
    //   state.cards.push(newCard);
    //   state.showAddCardForm = false;
    // },
    addCard: (state, action) => {
        const { type, number } = action.payload;
      
        
        if (!number || number.length < 4) {
          console.error("Card number is invalid or undefined.");
          return;
        }
      
        const newCard = {
          id: state.cards.length + 1,
          type: type || "Unknown",
          number: `XXXX XXXX XXXX ${number.slice(-4)}`, 
        };
      
        state.cards.push(newCard);
        state.showAddCardForm = false; 
      },
      
  },
});

export const { selectCard, deleteCard, showAddCardForm, addCard } = cardSlice.actions;
export default cardSlice.reducer;
