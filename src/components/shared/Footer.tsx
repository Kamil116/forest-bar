import React from 'react';
import { Box, Group, Stack, Text, useMantineTheme } from '@mantine/core';

function Footer() {
    const theme = useMantineTheme();

    return (
        <Box bg={theme.other.darkBackground} w="100%" p={{ base: 'sm', md: 'xl' }}>
            <Group justify="space-between" wrap="wrap" gap="xl">
                <Stack justify="flex-end" gap="sm">
                    <Text 
                        fz={{ base: 10, sm: 14, md: 18, lg: 24 }} 
                        tt="uppercase" 
                        c="rgba(255, 255, 255, 0.31)"
                        ta={{ base: 'center', md: 'left' }}
                    >
                        (c) Forest Bar 2025
                    </Text>
                    <Text 
                        fz={{ base: 10, sm: 14, md: 18, lg: 24 }} 
                        tt="uppercase" 
                        c="rgba(255, 255, 255, 0.31)"
                        ta={{ base: 'center', md: 'left' }}
                    >
                        Магазин экопродуктов
                    </Text>
                </Stack>
                <Group gap="xl" align="flex-end" wrap="wrap" justify="flex-end">
                    <Stack gap={0}>
                        <Text
                            fz={{ base: 10, sm: 12, md: 16, lg: 24 }}
                            tt="uppercase"
                            c="rgba(255, 255, 255, 0.31)"
                            ta={{ base: 'center', md: 'left' }}
                        >
                            Информация о компании
                        </Text>
                    </Stack>
                    <Stack gap={0}>
                        <Text
                            fz={{ base: 10, sm: 12, md: 16, lg: 24 }}
                            tt="uppercase"
                            c="rgba(255, 255, 255, 0.31)"
                            ta={{ base: 'center', md: 'left' }}
                            style={{ wordBreak: 'break-word' }}
                        >
                            Политика конфиденциальности
                        </Text>
                    </Stack>
                    <Stack gap={0}>
                        <Text
                            fz={{ base: 10, sm: 12, md: 16, lg: 24 }}
                            tt="uppercase"
                            c="rgba(255, 255, 255, 0.31)"
                            ta={{ base: 'center', md: 'left' }}
                        >
                            +7 900 800 71-13
                        </Text>
                        <Text
                            fz={{ base: 10, sm: 12, md: 16, lg: 24 }}
                            tt="uppercase"
                            c="rgba(255, 255, 255, 0.31)"
                            ta={{ base: 'center', md: 'left' }}
                            style={{ wordBreak: 'break-word' }}
                        >
                            Пользовательское соглашение
                        </Text>
                    </Stack>
                    <Stack gap={0}>
                        <Text
                            fz={{ base: 10, sm: 12, md: 16, lg: 24 }}
                            tt="uppercase"
                            c="rgba(255, 255, 255, 0.31)"
                            ta={{ base: 'center', md: 'left' }}
                            style={{ wordBreak: 'break-word' }}
                        >
                            email@forestBar.ru
                        </Text>
                        <Text
                            fz={{ base: 10, sm: 12, md: 16, lg: 24 }}
                            tt="uppercase"
                            c="rgba(255, 255, 255, 0.31)"
                            ta={{ base: 'center', md: 'left' }}
                            style={{ wordBreak: 'break-word' }}
                        >
                            Правила оплаты и возврата
                        </Text>
                    </Stack>
                </Group>
            </Group>
        </Box>
    );
}

export default Footer;
