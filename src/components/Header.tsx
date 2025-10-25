import { Box, Button, Container, Group, useMantineTheme, Image } from "@mantine/core";
import { scrollToSection } from "@/utils/scrollToSection";
import { useNavigate } from "react-router-dom";

function Header() {
    const theme = useMantineTheme();
    const navigate = useNavigate();
    return (
        <Box
            w="100%"
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
                        onClick={() => navigate('/')}
                    >
                        О нас
                    </Button>
                    <Button
                        variant="subtle"
                        color={theme.other.buttonColor}
                        fz={40}
                        onClick={() => {
                            navigate('/');
                            setTimeout(() => scrollToSection('cooperation-section'), 100);
                        }}
                    >
                        Сотрудничество
                    </Button>
                    <Image
                        src={`${import.meta.env.BASE_URL}/images/logo.svg`}
                        h={70} // FIXME костыль
                        w={100} // FIXME костыль
                        style={{ cursor: 'pointer' }}
                        onClick={() => navigate('/')}
                    />
                    <Button
                        variant="subtle"
                        color={theme.other.buttonColor}
                        fz={40}
                        onClick={() => {
                            navigate('/');
                            setTimeout(() => scrollToSection('about-us'), 100);
                        }}
                    >
                        Команда
                    </Button>
                    <Button
                        variant="subtle"
                        color={theme.other.buttonColor}
                        fz={40}
                        onClick={() => navigate('/login')}
                    >
                        Вход
                    </Button>
                    <Button
                        variant="subtle"
                        color={theme.other.buttonColor}
                        fz={40}
                        onClick={() => navigate('/registration')}
                    >
                        Регистрация
                    </Button>
                </Group>
            </Container>
        </Box>
    )
}

export default Header;