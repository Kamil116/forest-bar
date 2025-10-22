import {Box, Button, Container, Group, Stack, Title, Image} from "@mantine/core";


export function HomePage() {
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
                    bg="rgba(52, 33, 41, 1)" // semi-transparent background
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
                            <Button variant="subtle" color="rgba(240, 173, 10, 1)" fz={40}>О нас</Button>
                            <Button variant="subtle" color="rgba(240, 173, 10, 1)" fz={40}>Каталог</Button>
                            {/* TODO разобраться со стандартными размера шрифтов Mantine*/}
                            <Image
                                src="/images/logo.svg"
                                h={70} // FIXME костыль
                                w={100} // FIXME костыль
                            />
                            <Button variant="subtle" color="rgba(240, 173, 10, 1)" fz={40}>Команда</Button>
                            <Button variant="subtle" color="rgba(240, 173, 10, 1)" fz={40}>Регистрация</Button>
                        </Group>
                    </Container>
                </Box>

                <Stack align="center">
                    <Title fw={400} order={1} fz={120} tt="uppercase" c="white">
                        богатства природы
                    </Title>
                    <Title fw={400} order={2} fz={96} tt="uppercase">
                        как часть жизни
                    </Title>
                </Stack>

                <Button size="xl" fz={40} fw={400} color="rgba(56, 52, 52, 0.53)" radius="xl"
                        style={{width: '15%'}}>Каталог</Button>
            </Stack>

        </Box>
    );
}
