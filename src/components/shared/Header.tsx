import {
    Box,
    Button,
    Container,
    Drawer,
    Group,
    Stack,
    useMantineTheme,
    Image,
    Burger,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { scrollToSection } from '@/utils/scrollToSection';
import { useNavigate } from 'react-router-dom';

function Header() {
    const theme = useMantineTheme();
    const navigate = useNavigate();
    const [opened, { toggle, close }] = useDisclosure(false);

    const handleNavigation = (path: string, callback?: () => void) => {
        navigate(path);
        if (callback) {
            callback();
        }
        close();
    };

    const handleScrollToSection = () => {
        navigate('/');
        setTimeout(() => {
            scrollToSection('about-us');
            close();
        }, 100);
    };

    const navButtons = (
        <>
            <Button
                variant="subtle"
                color={theme.other.buttonColor}
                fz={{ base: 16, sm: 24, md: 32, lg: 40 }}
                onClick={() => handleNavigation('/news')}
                fullWidth
            >
                Новости
            </Button>
            <Button
                variant="subtle"
                color={theme.other.buttonColor}
                fz={{ base: 16, sm: 24, md: 32, lg: 40 }}
                onClick={() => handleNavigation('/catalog')}
                fullWidth
            >
                Каталог
            </Button>
            <Button
                variant="subtle"
                color={theme.other.buttonColor}
                fz={{ base: 16, sm: 24, md: 32, lg: 40 }}
                onClick={handleScrollToSection}
                fullWidth
            >
                Команда
            </Button>
            <Button
                variant="subtle"
                color={theme.other.buttonColor}
                fz={{ base: 16, sm: 24, md: 32, lg: 40 }}
                onClick={() => handleNavigation('/login')}
                fullWidth
            >
                Вход
            </Button>
            <Button
                variant="subtle"
                color={theme.other.buttonColor}
                fz={{ base: 14, sm: 20, md: 28, lg: 40 }}
                onClick={() => handleNavigation('/registration')}
                fullWidth
            >
                Регистрация
            </Button>
            <Button
                variant="subtle"
                color="red"
                fz={{ base: 16, sm: 24, md: 32, lg: 40 }}
                onClick={() => handleNavigation('/admin')}
                fullWidth
            >
                Админка
            </Button>
        </>
    );

    return (
        <Box w="100%" bg={theme.other.darkBackground}>
            <Container
                h="100%"
                fluid
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                px={{ base: 'xs', md: 'md' }}
                py={{ base: 'xs', md: 'sm' }}
            >
                {/* Desktop Navigation */}
                <Group
                    w="100%"
                    justify="center"
                    gap="sm"
                    wrap="wrap"
                    style={{ gap: 'clamp(8px, 2vw, 32px)' }}
                    visibleFrom="md"
                >
                    <Button
                        variant="subtle"
                        color={theme.other.buttonColor}
                        fz={{ base: 14, sm: 20, md: 28, lg: 40 }}
                        style={{ fontSize: 'clamp(14px, 2.5vw, 40px)' }}
                        onClick={() => navigate('/news')}
                    >
                        Новости
                    </Button>
                    <Button
                        variant="subtle"
                        color={theme.other.buttonColor}
                        fz={{ base: 14, sm: 20, md: 28, lg: 40 }}
                        style={{ fontSize: 'clamp(14px, 2.5vw, 40px)' }}
                        onClick={() => navigate('/catalog')}
                    >
                        Каталог
                    </Button>
                    <Image
                        src={`${import.meta.env.BASE_URL}/images/logo.svg`}
                        h={{ base: 40, sm: 55, md: 70 }}
                        w={{ base: 60, sm: 80, md: 100 }}
                        style={{ cursor: 'pointer' }}
                        onClick={() => navigate('/')}
                    />
                    <Button
                        variant="subtle"
                        color={theme.other.buttonColor}
                        fz={{ base: 14, sm: 20, md: 28, lg: 40 }}
                        style={{ fontSize: 'clamp(14px, 2.5vw, 40px)' }}
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
                        fz={{ base: 14, sm: 20, md: 28, lg: 40 }}
                        style={{ fontSize: 'clamp(14px, 2.5vw, 40px)' }}
                        onClick={() => navigate('/login')}
                    >
                        Вход
                    </Button>
                    <Button
                        variant="subtle"
                        color={theme.other.buttonColor}
                        fz={{ base: 12, sm: 18, md: 24, lg: 40 }}
                        style={{ fontSize: 'clamp(12px, 2.2vw, 40px)' }}
                        onClick={() => navigate('/registration')}
                    >
                        Регистрация
                    </Button>
                    <Button
                        variant="subtle"
                        color="red"
                        fz={{ base: 14, sm: 20, md: 28, lg: 40 }}
                        style={{ fontSize: 'clamp(14px, 2.5vw, 40px)' }}
                        onClick={() => navigate('/admin')}
                    >
                        Админка
                    </Button>
                </Group>

                {/* Mobile Navigation - Below md (768px) - phones and small tablets */}
                <Group
                    w="100%"
                    justify="space-between"
                    px="xs"
                    hiddenFrom="md"
                >
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        size="sm"
                        color={theme.other.buttonColor}
                    />
                    <Image
                        src={`${import.meta.env.BASE_URL}/images/logo.svg`}
                        h={40}
                        w={60}
                        style={{ cursor: 'pointer' }}
                        onClick={() => navigate('/')}
                    />
                    <Box w={40} /> {/* Spacer to center logo */}
                </Group>
            </Container>

            {/* Mobile Drawer */}
            <Drawer
                opened={opened}
                onClose={close}
                title="Меню"
                position="right"
                padding="md"
                size="xs"
                styles={{
                    content: {
                        backgroundColor: theme.other.darkBackground,
                    },
                    header: {
                        backgroundColor: theme.other.darkBackground,
                        borderBottom: `1px solid ${theme.other.buttonColor}`,
                    },
                    title: {
                        color: theme.other.buttonColor,
                        fontSize: '24px',
                    },
                }}
            >
                <Stack gap="md">{navButtons}</Stack>
            </Drawer>
        </Box>
    );
}

export default Header;
