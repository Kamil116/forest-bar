import React, { useEffect } from 'react';
import { Box } from '@mantine/core';
import { HomePage } from './HomePage';
import CooperationPage from './CooperationPage';

export function LandingPage() {
    useEffect(() => {
        // Добавляем плавный скролл для всего документа
        document.documentElement.style.scrollBehavior = 'smooth';
        
        return () => {
            // Очищаем стили при размонтировании
            document.documentElement.style.scrollBehavior = 'auto';
        };
    }, []);

    return (
        <Box>
            <Box id="home-section">
                <HomePage />
            </Box>
            
            <Box id="cooperation-section">
                <CooperationPage />
            </Box>
        </Box>
    );
}
