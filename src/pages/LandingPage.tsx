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
            {/* Секция 1: Главная страница */}
            <Box id="home-section">
                <HomePage />
            </Box>
            
            {/* Секция 2: Сотрудничество */}
            <Box id="cooperation-section">
                <CooperationPage />
            </Box>
            
            {/* Здесь можно добавить другие страницы */}
            {/* <Box id="other-section">
                <OtherPage />
            </Box> */}
        </Box>
    );
}
