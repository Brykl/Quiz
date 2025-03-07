import { Box, Typography } from '@mui/material'
import data from '../../questionsData/qstData.json'
import React from 'react'
import './cards.css'
import { Link } from 'react-router-dom'

const CardsHome = () => {
  return (
    <div >
          <Box className='cards'>
          {Object.entries(data).map(([key, value], index) => (
                <Link
                to={`/card/${key}`}
                key={key}
                style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    <Box 
                className='card'
                key={key}
                sx={{ mb: 2, p: 2, border: '1px solid gray', borderRadius: '8px' }}
                >
                    <Typography>
                      {index + 1}
                    </Typography>
                </Box>
                </Link>
            ))}
          </Box>
        </div>
  )
}

export default CardsHome
