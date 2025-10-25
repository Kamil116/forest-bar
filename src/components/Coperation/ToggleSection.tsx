import { useState } from 'react';
import { Box, Stack, Title, Button, Group, useMantineTheme } from '@mantine/core';
import VacancyCards from "@/components/Coperation/VacancyCards/VacancyCards";
import ProfileCards from './ProfileCards/ProfileCards';
import Partnership from './Partnership';
import Footer from "@/components/Footer/Footer";

export function ToggleSection() {
    const [value, setValue] = useState('job');
    const theme = useMantineTheme();

    return (
        <Box ta='center' w="100%">
            <Group gap="md" justify="center">
                <Button
                    size="xl"
                    fz={theme.other.titleSize}
                    fw={500}
                    radius={theme.other.buttonRadius}
                    bg={value === 'job' ? theme.other.customYellow : theme.other.darkBackground}
                    c={value === 'job' ? 'white' : theme.other.customYellow}
                    onClick={() => setValue('job')}
                >
                    Работа
                </Button>
                <Button
                    size="xl"
                    fz={theme.other.titleSize}
                    fw={500}
                    radius={theme.other.buttonRadius}
                    bg={value === 'cooperation' ? theme.other.customYellow : theme.other.darkBackground}
                    c={value === 'cooperation' ? 'white' : theme.other.customYellow}
                    onClick={() => setValue('cooperation')}
                >
                    Партнерство
                </Button>
            </Group>

            {/* // похоже на костыль, но ок  */}
            <Box mt="xl" style={{ minHeight: '80vh' }} >
                {value === 'job' && (
                    <Stack align="center" justify="center">
                        <VacancyCards />
                        <Title order={2} fz={theme.other.titleSize} fw={400} tt="uppercase"
                            c={theme.other.customOrange}>
                            Профили сотрудников
                        </Title>
                        <ProfileCards />
                        <Footer />
                    </Stack>
                )}
                {value === 'cooperation' && (
                    <Partnership />
                )}
            </Box>
        </Box>
    );
}
