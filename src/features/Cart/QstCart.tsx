import React from 'react'
import Card from '@mui/material/Card';
import { Box, Typography } from '@mui/material';

interface Questions {
    question: string;
    variants: string[];
    answer: number; 
}

const QstCart = ({ questions }: { questions: Questions }) => {
    const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
    const correctIndex = questions.answer - 1; 

    const handleAnswerClick = (index: number) => {
        setSelectedIndex(index); 
    };

    return (
        <div className='card-root'>
            <Box className='card-warp'>
                <Typography sx={{ marginBottom: 15, fontSize: '45px', textAlign: 'center' }}>
                    {questions.question}
                </Typography>
                <Box className='answers'>
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
                                style={{ marginBottom: '10px', padding: '10px', pointerEvents: selectedIndex !== null ? 'none' : 'auto'}}
                                sx={{ backgroundColor }}
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
