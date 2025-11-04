import { theme } from '@/theme';
import {
    Box,
    Stack,
    Title,
    useMantineTheme,
    Text,
    Image,
    Group,
} from '@mantine/core';

export default function Recipe() {
    const theme = useMantineTheme();
    return (
        <Box h="100vh" bg={theme.other.cardBackground} p="md">
            <Stack h="100%" gap="md">
                <Title tt="uppercase" ta="center" fz={70}>
                    Принцип изготовления
                </Title>
                <Group
                    justify="flex-end"
                    grow
                    style={{ flex: 1, minHeight: 0 }}
                >
                    <Box
                        bg={theme.other.darkBackground}
                        p="md"
                        h="100%"
                        style={{
                            flexShrink: 0,
                            maxWidth: '40%',
                            borderRadius: theme.other.cardRadius,
                            overflow: 'auto',
                        }}
                    >
                        <Text c="white" fz={40}>
                            Наша продукция изготовляется на паровой бане с
                            добавлением яблок, яблоки при выпаривании выделяют
                            яблочный пектин, который загущает и консервирует
                            ягоду, Наша продукция изготовляется на паровой бане
                            с добавлением яблок, яблоки при выпаривании
                            выделяют яблочный пектин, который загущает и
                            консервирует ягоду,
                        </Text>
                    </Box>
                    <Image
                        radius="lg"
                        src={`${import.meta.env.BASE_URL}/images/home-bg.jpg`}
                        fit="cover"
                        style={{ flex: 1, height: '100%' }}
                    ></Image>
                </Group>
                <Group
                    justify="flex-end"
                    grow
                    style={{ flex: 1, minHeight: 0 }}
                >
                    <Box
                        h="100%"
                        bg={theme.other.darkBackground}
                        p="md"
                        style={{
                            flexShrink: 0,
                            maxWidth: '40%',
                            borderRadius: theme.other.cardRadius,
                        }}
                    >
                        <Text c="white" fz={40}>
                            Наша продукция изготовляется на паровой бане с
                            добавлением яблок, яблоки при выпаривании выделяют
                            яблочный пектин, который загущает и консервирует
                            ягоду,
                        </Text>
                    </Box>
                    <Image
                        radius="lg"
                        src={`${import.meta.env.BASE_URL}/images/home-bg.jpg`}
                        fit="cover"
                        style={{ flex: 1, height: '100%' }}
                    ></Image>
                </Group>
                <Group
                    justify="flex-end"
                    grow
                    style={{ flex: 1, minHeight: 0 }}
                >
                    <Box
                        h="100%"
                        bg={theme.other.darkBackground}
                        p="md"
                        style={{
                            flexShrink: 0,
                            maxWidth: '40%',
                            borderRadius: theme.other.cardRadius,
                        }}
                    >
                        <Text c="white" fz={40}>
                            Наша продукция изготовляется на паровой бане с
                            добавлением яблок, яблоки при выпаривании выделяют
                            яблочный пектин, который загущает и консервирует
                            ягоду,
                        </Text>
                    </Box>
                    <Image
                        radius="lg"
                        src={`${import.meta.env.BASE_URL}/images/home-bg.jpg`}
                        fit="cover"
                        style={{ flex: 1, height: '100%' }}
                    ></Image>
                </Group>
            </Stack>
        </Box>
    );
}
