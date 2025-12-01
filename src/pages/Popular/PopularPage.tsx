import React from 'react';
import {
    Box,
    Stack,
    Text,
    Button,
    useMantineTheme,
    Container,
    Image,
} from '@mantine/core';
import { HexagonImage } from '@/components/Popular/HexagonImage';
import { ArrowConnector } from '@/components/Popular/ArrowConnector';
import classes from './PopularPage.module.css';

const HEXAGON_DATA = [
    {
        id: 1,
        image: `${import.meta.env.BASE_URL}/images/home-bg.jpg`,
        label: 'ЕЖЕВИКА',
        position: 'top' as const,
    },
    {
        id: 2,
        image: `${import.meta.env.BASE_URL}/images/home-bg.jpg`,
        label: 'ЕЖЕВИКА',
        position: 'bottom' as const,
    },
    {
        id: 3,
        image: `${import.meta.env.BASE_URL}/images/home-bg.jpg`,
        label: 'ЕЖЕВИКА',
        position: 'top' as const,
    },
    {
        id: 4,
        image: `${import.meta.env.BASE_URL}/images/home-bg.jpg`,
        label: 'ЕЖЕВИКА',
        position: 'bottom' as const,
    },
    {
        id: 5,
        image: `${import.meta.env.BASE_URL}/images/home-bg.jpg`,
        label: 'ЕЖЕВИКА',
        position: 'top' as const,
    },
];

export default function PopularPage() {
    const theme = useMantineTheme();

    return (
        <Stack gap={0} h="100vh" style={{ overflow: 'hidden' }}>
            <Box className={classes.mainBackground} style={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                {/* Header with group_6.png - Outside Container for full width */}
                <Box className={classes.headerSection}>
                    <Image
                        src={`${import.meta.env.BASE_URL}/images/group_6.png`}
                        alt="Header decoration"
                        className={classes.headerImage}
                    />
                </Box>

                <Container size="xl" px={{ base: 'xs', sm: 'sm', md: 'md', lg: 'lg' }} style={{ height: '100%', display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
                    <Stack gap="sm" align="center" py={{ base: 'xs', sm: 'sm', md: 'md' }} style={{ flex: 1, minHeight: 0, justifyContent: 'space-between', overflow: 'hidden' }}>
                        {/* Title */}
                        <Text
                            fz={{ base: 20, sm: 28, md: 36, lg: 44, xl: 56 }}
                            fw={700}
                            c="white"
                            ta="center"
                            px={{ base: 'xs', sm: 'sm', md: 'md' }}
                        >
                            ПОПУЛЯРНО
                        </Text>

                        {/* Hexagons Container - Single row with wave pattern */}
                        <Box className={classes.hexagonsContainer} >
                            {HEXAGON_DATA.map((item, index) => (
                                <Box
                                    key={item.id}
                                    className={`${classes.hexagonWrapper} ${
                                        item.position === 'top'
                                            ? classes.hexagonTop
                                            : classes.hexagonBottom
                                    }`}
                                >
                                    {item.position === 'top' && (
                                        <Text
                                            fz={{
                                                base: 10,
                                                sm: 14,
                                                md: 18,
                                                lg: 22,
                                                xl: 28,
                                            }}
                                            fw={700}
                                            c="white"
                                            ta="center"
                                            mb={{ base: 'xs', sm: 'sm', md: 'md' }}
                                            className={classes.hexagonLabel}
                                        >
                                            {item.label}
                                        </Text>
                                    )}

                                    <Box className={classes.hexagonBox}>
                                        <HexagonImage
                                            src={item.image}
                                            alt={item.label}
                                        />
                                        {index < HEXAGON_DATA.length - 1 && (
                                            <ArrowConnector
                                                direction={
                                                    item.position === 'top'
                                                        ? 'right-down'
                                                        : 'right-up'
                                                }
                                            />
                                        )}
                                    </Box>

                                    {item.position === 'bottom' && (
                                        <Text
                                            fz={{
                                                base: 10,
                                                sm: 14,
                                                md: 18,
                                                lg: 22,
                                                xl: 28,
                                            }}
                                            fw={700}
                                            c="white"
                                            ta="center"
                                            mt={{ base: 'xs', sm: 'sm', md: 'md' }}
                                            className={classes.hexagonLabel}
                                        >
                                            {item.label}
                                        </Text>
                                    )}
                                </Box>
                            ))}
                        </Box>

                        {/* More Button */}
                        <Button
                            size="xl"
                            fz={{ base: 12, sm: 16, md: 20, lg: 26, xl: 32 }}
                            fw={500}
                            w={{ base: '85%', sm: '70%', md: '50%', lg: '35%', xl: '25%' }}
                            bg="rgba(219, 166, 25, 0.9)"
                            c="white"
                            radius={theme.other.buttonRadius}
                            style={{
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                flexShrink: 0,
                                marginTop: 'auto',
                                padding: 'clamp(8px, 1.5vw, 16px)',
                            }}
                        >
                            Больше
                        </Button>
                    </Stack>
                </Container>
            </Box>
        </Stack>
    );
}
