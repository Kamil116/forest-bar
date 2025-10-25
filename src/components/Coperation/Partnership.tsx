import { Box, Text, Stack, TextInput, Textarea, Button, Group, Image, useMantineTheme } from '@mantine/core';

function Partnership() {
    const theme = useMantineTheme();
    return (
        <Box>
            <Box style={{ display: 'flex', gap: '16px', width: '100%' }}>
                <Box style={{ flex: '0 0 calc(60% - 8px)' }}>
                    <Text ta="center" fz={theme.other.titleSize} fw={700} c="white" mb="xl" tt="uppercase">
                        Заполни анкету на партнерство и стань частью коллектива
                    </Text>

                    <Group align="stretch" gap="md" h="100%" grow>
                        <Stack gap="lg" align="center">
                            <TextInput
                                placeholder="Имя и фамилия"
                                tt="uppercase"
                                size="lg"
                                radius={theme.other.buttonRadius}
                                w="100%"
                                styles={{
                                    input: {
                                        backgroundColor: theme.other.customYellow,
                                        color: 'black',
                                        boxShadow: `4px 8px 0px ${theme.other.customYellowShadow}`,
                                        border: 'none',
                                    }
                                }}
                            />
                            <TextInput
                                placeholder="Email"
                                tt="uppercase"
                                size="lg"
                                w="100%"
                                radius={theme.other.buttonRadius}
                                styles={{
                                    input: {
                                        backgroundColor: theme.other.customYellow,
                                        color: 'black',
                                        boxShadow: `4px 8px 0px ${theme.other.customYellowShadow}`,
                                        border: 'none',
                                    }
                                }}
                            />
                            <TextInput
                                placeholder="Телефон"
                                tt="uppercase"
                                size="lg"
                                radius={theme.other.buttonRadius}
                                w="100%"
                                styles={{
                                    input: {
                                        backgroundColor: theme.other.customYellow,
                                        color: 'black',
                                        boxShadow: `4px 8px 0px ${theme.other.customYellowShadow}`,
                                        border: 'none',
                                    }
                                }}
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
                            styles={{
                                input: {
                                    backgroundColor: theme.other.customYellow,
                                    color: 'black',
                                    boxShadow: `4px 8px 0px ${theme.other.customYellowShadow}`,
                                    border: 'none',
                                }
                            }}
                        />
                    </Group>


                </Box>

                <Image
                    src={`${import.meta.env.BASE_URL}/images/dawd.png`}
                    alt="Partnership"
                    style={{
                        flex: '0 0 calc(40% - 8px)',
                        minHeight: '500px',
                        objectFit: 'cover',
                        overflow: 'hidden',
                    }}
                    fit="cover"
                />
            </Box>
        </Box>
    )
}

export default Partnership;