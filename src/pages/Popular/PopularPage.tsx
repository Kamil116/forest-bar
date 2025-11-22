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
        <Stack gap={0} h="100vh" >
            <Box className={classes.mainBackground}>
                {/* Header with group_6.png - Outside Container for full width */}
                <Box className={classes.headerSection}>
                    <Image
                        src={`${import.meta.env.BASE_URL}/images/group_6.png`}
                        alt="Header decoration"
                        className={classes.headerImage}
                    />
                </Box>

                <Container size="xl">
                    <Stack gap="xl" align="center">
                        {/* Title */}
                        <Text
                            fz={{ base: 32, sm: 40, md: 48, lg: 64 }}
                            fw={700}
                            c="white"
                            ta="center"
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
                                                base: 16,
                                                sm: 20,
                                                md: 24,
                                                lg: 32,
                                            }}
                                            fw={700}
                                            c="white"
                                            ta="center"
                                            mb="md"
                                            className={classes.hexagonLabel}
                                        >
                                            {item.label}
                                        </Text>
                                    )}

                                    <Box className={classes.hexagonBox}>
                                        <HexagonImage
                                            src={item.image}
                                            alt={item.label}
                                            size={200}
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
                                                base: 16,
                                                sm: 20,
                                                md: 24,
                                                lg: 32,
                                            }}
                                            fw={700}
                                            c="white"
                                            ta="center"
                                            mt="md"
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
                            fz={{ base: 20, sm: 28, md: 36 }}
                            fw={500}
                            w='20%'
                            bg="rgba(219, 166, 25, 0.9)"
                            c="white"
                            radius={theme.other.buttonRadius}
                            style={{
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
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
