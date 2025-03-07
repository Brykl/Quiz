import React from 'react'
import CardsHome from './CardsHome'
import './home.css'
import { Box, Typography } from '@mui/material'

const Home = () => {
  return (
    <Box className='home'>
        <Box sx={{marginBottom: '10%'}}>
          <Typography variant="h1">Quiz</Typography>
        </Box>
        <Box className='card-space'>
         <CardsHome/>
      </Box>
    </Box>
    
  )
}

export default Home
