import { Box, Text, Stack, TextInput, Textarea, Button, Group, Image, useMantineTheme } from '@mantine/core';
import styles from './Partnership.module.css';

function Partnership() {
    const theme = useMantineTheme();
    return (
        <Box>
            <Box style={{ display: 'flex', gap: '16px', width: '100%' }}>
                <Box style={{ flex: '0 0 calc(60% - 8px)' }}>
                    <Text ta="center" fw={700} c="white" mb="xl" tt="uppercase" fz={32}>
                        Заполни анкету на партнерство и стань частью коллектива
                    </Text>

                    <Group align="flex-start" gap="md" grow>
                        <Stack gap="lg" align="center">
                            <TextInput
                                placeholder="Имя и фамилия"
                                tt="uppercase"
                                size="lg"
                                radius={theme.other.buttonRadius}
                                w="100%"
                                classNames={{ input: styles.input }}
                            />
                            <TextInput
                                placeholder="Email"
                                tt="uppercase"
                                size="lg"
                                w="100%"
                                radius={theme.other.buttonRadius}
                                classNames={{ input: styles.input }}
                            />
                            <TextInput
                                placeholder="Телефон"
                                tt="uppercase"
                                size="lg"
                                radius={theme.other.buttonRadius}
                                w="100%"

                                classNames={{ input: styles.input }}
                            />
                            <Button
                                size="xl"
                                radius={theme.other.buttonRadius}
                                fz={theme.other.buttonSize}
                                fw={600}
                                mt="lg"
                                w="80%"
                                bg={theme.other.successGreen}
                                c="black"
                            >
                                Отправить
                            </Button>
                        </Stack>

                        <Textarea
                            placeholder="Сопроводительное письмо/Анкета"
                            autosize
                            minRows={10}
                            maxRows={10}
                            tt="uppercase"
                            size="lg"
                            radius={theme.other.buttonRadius}

                            classNames={{ input: styles.input }}
                        />
                    </Group>


                </Box>

                <Image
                    src={`${import.meta.env.BASE_URL}/images/dawd.png`}
                    alt="Partnership"
                    className={styles.image}
                    style={{
                        flex: '0 0 calc(40% - 8px)',
                    }}
                    fit="cover"
                />
            </Box>
        </Box>
    )
}

export default Partnership;