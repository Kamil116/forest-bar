import {Box, Button, Container, Group, Stack, Title, Image, useMantineTheme} from "@mantine/core";

const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};


export function HomePage() {
    const theme = useMantineTheme();
    
    return (
        <Box
            h="100vh"
            bg="url('/images/home-bg.jpg') center/cover no-repeat"
        >
            <Stack
                h="100%"
                align="center"
                justify="space-between"
                pb={50}
            >
                <Box
                    top={0}
                    left={0}
                    w="100%"
                    p={30}
                    bg={theme.other.cardBackground}
                >
                    <Container
                        h="100%"
                        fluid
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Group w="100%" justify="center" gap="xl">
                            <Button 
                                variant="subtle" 
                                color={theme.other.buttonColor} 
                                fz={40}
                                onClick={() => scrollToSection('home-section')}
                            >
                                О нас
                            </Button>
                            <Button 
                                variant="subtle" 
                                color={theme.other.buttonColor} 
                                fz={40}
                                onClick={() => scrollToSection('cooperation-section')}
                            >
                                Сотрудничество
                            </Button>
                            <Image
                                src="/images/logo.svg"
                                h={70} // FIXME костыль
                                w={100} // FIXME костыль
                            />
                            <Button 
                                variant="subtle" 
                                color={theme.other.buttonColor} 
                                fz={40}
                                onClick={() => scrollToSection('cooperation-section')}
                            >
                                Команда
                            </Button>
                            <Button 
                                variant="subtle" 
                                color={theme.other.buttonColor} 
                                fz={40}
                                onClick={() => scrollToSection('cooperation-section')}
                            >
                                Регистрация
                            </Button>
                        </Group>
                    </Container>
                </Box>

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
                    style={{width: '15%'}}
                    onClick={() => scrollToSection('cooperation-section')}
                >
                    Каталог
                </Button>
            </Stack>

        </Box>
    );
}
