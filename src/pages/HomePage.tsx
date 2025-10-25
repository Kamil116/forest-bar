import { Box, Button, Stack, Title, useMantineTheme } from "@mantine/core";
import { scrollToSection } from "@/utils/scrollToSection";
import Header from "@/components/Header";


export function HomePage() {
    const theme = useMantineTheme();

    return (
        <Box
            h="100vh"
            bg={`url(${import.meta.env.BASE_URL}/images/home-bg.jpg) center/cover no-repeat`}
        >
            <Stack
                h="100%"
                align="center"
                justify="space-between"
                pb={50}
            >
                <Header />
                <Stack align="center">
                    <Title fw={400} order={1} fz={120} tt="uppercase" c="white">
                        богатства природы
                    </Title>
                    <Title fw={400} order={2} fz={96} tt="uppercase" c="rgb(255, 255, 255, 0.74)">
                        как часть жизни
                    </Title>
                </Stack>

                <Button
                    size="xl"
                    fz={40}
                    fw={400}
                    color="rgba(56, 52, 52, 0.53)"
                    radius={theme.other.buttonRadius}
                    style={{ width: '15%' }}
                    onClick={() => scrollToSection('cooperation-section')}
                >
                    Каталог
                </Button>
            </Stack>

        </Box>
    );
}
