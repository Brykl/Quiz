import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import QstCart from '../../features/Cart/QstCart';

interface Question {
    question: string;
    variants: string[];
    answer: number;
    status: string;
    userAnswer: string;
    score: number;
}

export default function CardPage() {
    const { id } = useParams<{ id: string }>();

    const [data, setData] = useState<Record<string, Question>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get('http://localhost:3000')
            .then(response => {
                setData(response.data);
            })
            .catch(err => {
                console.error('Ошибка при загрузке данных:', err);
                setError('Не удалось загрузить вопросы');
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <Typography>Загрузка...</Typography>;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    const card = data[`question${id}` as keyof typeof data];

    if (!card) {
        return <Typography>Карточка не найдена!</Typography>;
    }

    return (
        <Box sx={{ height: '100vh', width: '100vw', display: "flex", justifyContent: 'center', alignItems: 'center' }}>
            <QstCart questions={card} />
        </Box>
    );
}
