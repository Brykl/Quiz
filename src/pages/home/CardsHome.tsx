import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './cards.css';

interface Question {
    question: string;
    variants: string[];
    answer: number;
    status: 'success' | 'failed' | 'pending';
    userAnswer: number;
    score: number;
}

interface QuestionData {
    [key: string]: Question;
}

const CardsHome = () => {
    const [data, setData] = useState<QuestionData>({});
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get('http://localhost:3000')
            .then(response => {
                setData(response.data);
            })
            .catch(err => {
                console.error('Ошибка при загрузке данных:', err);
                setError('Не удалось загрузить данные');
            })
            .finally(() => setLoading(false));
    }, []);
    useEffect(() => {
      axios.get('http://localhost:3000/score')
          .then(response => {
              setScore(response.data.score);
          })
          .catch(err => {
              console.error('Ошибка при загрузке данных:', err);
              setError('Не удалось загрузить данные');
          })
          .finally(() => setLoading(false));
  }, []);

    if (loading) {
        return <Typography>Загрузка...</Typography>;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <div>
          <Box sx={{ position: 'absolute', top: '5%', right: '5%', height: '40px',
             width: '200px', backgroundColor: 'blue'}}><Box sx={{ height: '40px',
              backgroundColor: 'green', width: score
             }}></Box></Box>
            <Box className='cards'>
                {Object.entries(data).map(([key, value], index) => {
                    let backgroundColor = '';
                    if (value.status === 'success') {
                        backgroundColor = 'green';
                    } else if (value.status === 'failed') {
                        backgroundColor = 'red';
                    } else {
                        backgroundColor = 'lightgray'; // для вопросов, которые еще не пройдены
                    }

                    return (
                        <Link
                            to={`/card/${key.replace('question', '')}`}
                            key={key}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <Box
                                className='card'
                                sx={{
                                    mb: 2,
                                    p: 2,
                                    border: '1px solid gray',
                                    borderRadius: '8px',
                                    backgroundColor
                                }}
                            >
                                <Typography>
                                    {index + 1}
                                </Typography>
                            </Box>
                        </Link>
                    );
                })}
            </Box>
        </div>
    );
};

export default CardsHome;
