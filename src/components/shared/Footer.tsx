import React from 'react';
import {Box, Group, Stack, Text, useMantineTheme} from "@mantine/core";

function Footer() {
    const theme = useMantineTheme();

    return (
        <Box bg={theme.other.darkBackground} w="100%" h='25vh'>
            <Group justify='space-between' h='100%'>
                <Stack justify='flex-end' h='100%'>
                    <Text fz={38} tt='uppercase' c='rgba(255, 255, 255, 0.31)'>(c) Forest Bar 2025</Text>
                    <Text fz={38} tt='uppercase' c='rgba(255, 255, 255, 0.31)'>Магазин экопродуктов</Text>
                </Stack>
                <Group h='100%' gap='xl'>
                    <Stack justify='flex-end' h='100%'>
                        <Text fz={38} tt='uppercase' c='rgba(255, 255, 255, 0.31)'>Информация о компании</Text>
                    </Stack>
                    <Stack justify='flex-end' h='100%'>
                        <Text fz={38} tt='uppercase' c='rgba(255, 255, 255, 0.31)'>+7 900 800 71-13</Text>
                        <Text fz={38} tt='uppercase' c='rgba(255, 255, 255, 0.31)'>Политика конфиденциальности</Text>
                    </Stack>
                    <Stack justify='flex-end' h='100%'>
                        <Text fz={38} tt='uppercase' c='rgba(255, 255, 255, 0.31)'>Пользовательское соглашение</Text>
                    </Stack>
                    <Stack h='100%' justify='flex-end'>
                        <Text fz={38} tt='uppercase' c='rgba(255, 255, 255, 0.31)'>email@forestBar.ru</Text>
                        <Text fz={38} tt='uppercase' c='rgba(255, 255, 255, 0.31)'>Правила оплаты и возврата</Text>
                    </Stack>
                </Group>
            </Group>
        </Box>
    );
}

export default Footer;