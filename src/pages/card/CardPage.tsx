import React from 'react'
import { useParams } from 'react-router-dom'
import data from '../../questionsData/qstData.json'
import { Box, Typography } from '@mui/material'
import QstCart from '../../features/Cart/QstCart'


export default function CardPage() {

    const { id } = useParams<{ id: string}>()

    const card = data[id as keyof typeof data]

    if (!card) {
        return <Typography>Карточка не найдена!</Typography>
    }
    
  return (
    <>
    <Box sx={{height: '100vh', width: '100vw',
        display: "flex", justifyContent: 'center', alignItems: 'center'}}>

    <QstCart questions={card}/>
    </Box>

    </>
  )
}
