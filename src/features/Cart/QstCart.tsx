import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import { Box, Typography } from '@mui/material';
import ArrowCircleRightTwoToneIcon from '@mui/icons-material/ArrowCircleRightTwoTone';
import ArrowCircleLeftTwoToneIcon from '@mui/icons-material/ArrowCircleLeftTwoTone';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './cards.css'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface Questions {
    question: string;
    variants: string[];
    answer: number;
    status: string;
    userAnswer: number;
    score: number;
}

const QstCart = ({ questions }: { questions: Questions }) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [resultColors, setResultColors] = useState<string[]>(["", "", "", ""]);

    const correctIndex = questions.answer - 1;
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const currentNumber = id ? Number(id) : 0;

    useEffect(() => {
        const colors = new Array(questions.variants.length).fill("");

        if (questions.status === 'success') {
            colors[correctIndex] = 'green';
        } else if (questions.status === 'failed') {
            colors[correctIndex] = 'green';
            if (questions.userAnswer !== questions.answer) {
                colors[questions.userAnswer - 1] = 'red';
            }
        }

        setResultColors(colors);
        setSelectedIndex(questions.status !== 'pending' ? questions.userAnswer - 1 : null);
    }, [id, questions]);

    const sendAnswerToServer = async (userAnswer: number) => {
        try {
            await axios.post('http://localhost:3000/answer', {
                questionNumber: currentNumber,
                userAnswer: userAnswer + 1
            });

            console.log('Ответ отправлен на сервер');
        } catch (error) {
            console.error('Ошибка при отправке ответа:', error);
        }
    };

    const handleAnswerClick = (index: number) => {
        if (selectedIndex !== null) return;

        setSelectedIndex(index);

        const newColors = [...resultColors];
        if (index === correctIndex) {
            newColors[index] = 'green';
        } else {
            newColors[index] = 'red';
            newColors[correctIndex] = 'green';
        }
        setResultColors(newColors);

        sendAnswerToServer(index);
    };

    const handleNext = () => navigate(`/card/${currentNumber + 1}`);
    const handlePrev = () => navigate(`/card/${currentNumber - 1}`);

    const isClickable = questions.status === 'pending' && selectedIndex === null;

    return (
        <div className='card-root'>
            <Link to={'/'}><Typography variant='h1' sx={{ color: 'black', justifySelf: 'center', marginBottom: '150px' }}>Quiz</Typography></Link>
            <Box className='card-warp'>
                <Box sx={{ display: 'flex', justifyContent: 'space-around',}}>
                    {currentNumber !== 1 ? <ArrowCircleLeftTwoToneIcon
                        className='handler'
                        sx={{ marginRight: 10, fontSize: '100px' }}
                        onClick={handlePrev}
                    /> : null}
                    <Typography
                     sx={{ marginBottom: 15, fontSize: '45px', textAlign: 'center' }}>
                        {questions.question}
                    </Typography>
                    {currentNumber !== 17 ? <ArrowCircleRightTwoToneIcon
                        className='handler'
                        onClick={handleNext}
                        sx={{ marginLeft: 10, fontSize: '100px' }}
                    />: <CheckCircleOutlineIcon className='handler' sx={{ marginLeft: 10, fontSize: '100px' }}/>}
                </Box>

                <Box className='answers' sx={{
                    display: 'grid',
                    gridTemplateColumns: "repeat(2, 1fr)",
                    placeItems: 'center',
                    gap: '60px'
                    }}>
                    {questions.variants.map((variant, index) => (
                        <Card
                            key={index}
                            className='card'
                            onClick={() => isClickable && handleAnswerClick(index)}
                            sx={{
                                padding: '10px',
                                pointerEvents: isClickable ? 'auto' : 'none',
                                height: '150px',
                                width: '100%',
                                fontSize: '50px',
                                backgroundColor: resultColors[index] || 'rgb(144, 144, 160)',
                                transition: 'background-color 0.3s ease'
                            }}
                        >
                            {variant}
                        </Card>
                    ))}
                </Box>
            </Box>
        </div>
    );
};

export default QstCart;
