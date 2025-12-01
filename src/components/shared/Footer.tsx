import React from 'react';
import { Box, Group, Stack, Text, useMantineTheme } from '@mantine/core';
import classes from './Footer.module.css';

function Footer() {
    const theme = useMantineTheme();

    return (
        <Box
            bg={theme.other.darkBackground}
            w="100%"
            p={{ base: 4, sm: 6, md: 8, lg: 12 }}
        >
            <Group justify="space-between" wrap="wrap" gap="sm">
                <Stack justify="flex-end" gap={2}>
                    <Text
                        className={classes.footerText}
                        tt="uppercase"
                        c="rgba(255, 255, 255, 0.31)"
                        ta={{ base: 'center', md: 'left' }}
                    >
                        (c) Forest Bar 2025
                    </Text>
                    <Text
                        className={classes.footerText}
                        tt="uppercase"
                        c="rgba(255, 255, 255, 0.31)"
                        ta={{ base: 'center', md: 'left' }}
                    >
                        Магазин экопродуктов
                    </Text>
                </Stack>
                <Group
                    gap="sm"
                    align="flex-end"
                    wrap="wrap"
                    justify="flex-end"
                >
                    <Stack gap={0}>
                        <Text
                            className={classes.footerText}
                            tt="uppercase"
                            c="rgba(255, 255, 255, 0.31)"
                            ta={{ base: 'center', md: 'left' }}
                        >
                            Информация о компании
                        </Text>
                    </Stack>
                    <Stack gap={0}>
                        <Text
                            className={classes.footerText}
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
                            className={classes.footerText}
                            tt="uppercase"
                            c="rgba(255, 255, 255, 0.31)"
                            ta={{ base: 'center', md: 'left' }}
                        >
                            +7 900 800 71-13
                        </Text>
                        <Text
                            className={classes.footerText}
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
                            className={classes.footerText}
                            tt="uppercase"
                            c="rgba(255, 255, 255, 0.31)"
                            ta={{ base: 'center', md: 'left' }}
                            style={{ wordBreak: 'break-word' }}
                        >
                            email@forestBar.ru
                        </Text>
                        <Text
                            className={classes.footerText}
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
