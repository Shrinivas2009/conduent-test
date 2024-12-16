
import { Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import CardList from './CardList';
import AddCardForm from './AddCardForm';
import LeftMenu from "./LeftMenu";

const Home = () => {
    const { user } = useSelector((state) => state.auth);
  const savedCards = useSelector((state) => state.cards.savedCards);
  const showAddCardForm = useSelector((state) => state.cards.showAddCardForm);
  return (
    
        <Box sx={{ display: "flex", height: "100vh" }}>
      
        <LeftMenu />

      
        <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ maxWidth: 1000, margin: 'auto' }}>
                <CardList />
                {showAddCardForm && <AddCardForm />}
            </Box>
        </Box>
      
      
        </Box>
    
    

    
  );
};

export default Home;

