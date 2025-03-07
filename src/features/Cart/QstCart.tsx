import React from 'react'
import Card from '@mui/material/Card';
import { Box, Typography } from '@mui/material';
import ArrowCircleRightTwoToneIcon from '@mui/icons-material/ArrowCircleRightTwoTone';
import ArrowCircleLeftTwoToneIcon from '@mui/icons-material/ArrowCircleLeftTwoTone';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

interface Questions {
    question: string;
    variants: string[];
    answer: number; 
}

const QstCart = ({ questions }: { questions: Questions }) => {
    const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
    const correctIndex = questions.answer - 1; 
    const navigate = useNavigate();


    const { id } = useParams<{ id: string }>();

    const currentNumber = Number(id.replace('question', ''));


    const handleAnswerClick = (index: number) => {
        setSelectedIndex(index); 
    };

    const handleNext = () => {
        navigate(`/card/question${currentNumber + 1}`);
    };
    
    const handlePrev = () => {
        navigate(`/card/question${currentNumber - 1}`);
    };

    return (
        <div className='card-root'>

            <Box className='card-warp'>
                <Box sx={{display: 'flex'}}>
                <ArrowCircleLeftTwoToneIcon sx={{ marginRight: 15, fontSize: '100px'}}
                onClick={() => handlePrev()}
                />
                <Typography sx={{ marginBottom: 15, fontSize: '45px', textAlign: 'center' }}>
                    {questions.question}
                </Typography>
                <ArrowCircleRightTwoToneIcon 
                onClick={() => handleNext()}
                sx={{marginLeft: 10, fontSize: '100px'}}/>
                </Box>
                <Box className='answers' sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '20px',
                    
                }}>
                    {questions.variants.map((variant, index) => {
                        let backgroundColor = 'rgb(144, 144, 160)'; 

                        if (selectedIndex !== null) {
                            if (index === correctIndex) {
                                backgroundColor = 'lightgreen'; 
                            } else if (index === selectedIndex) {
                                backgroundColor = 'lightcoral'; 
                            }
                        }

                        return (
                            <Card
                                onClick={() => handleAnswerClick(index)}
                                key={index}
                                className='card'
                                style={{ marginBottom: '10px', padding: '10px', pointerEvents: selectedIndex !== null ? 'none' : 'auto', height: '50px', fontSize: '35px'}}
                                sx={{ backgroundColor,}}
                            >
                                {variant}
                            </Card>
                        )
                    })}
                </Box>
            </Box>
        </div>
    )
}

export default QstCart
