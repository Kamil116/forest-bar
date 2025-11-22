import { Group, Paper, Text, useMantineTheme } from '@mantine/core';

interface RecipeTitleCardsProps {
    mainTitle: string;
    subTitle: string;
}

export function RecipeTitleCards({ mainTitle, subTitle }: RecipeTitleCardsProps) {
    const theme = useMantineTheme();

    return (
        <Group gap="md" justify="center" w="100%" wrap="wrap">
            <Paper
                radius={theme.other.cardRadius}
                bg={theme.other.customYellow}
                p="md"
                style={{ flex: '2 1 300px' }}
            >
                <Text
                    c="white"
                    fz={{ base: 34, md: 48, lg: 64 }}
                    fw={500}
                    ta="center"
                >
                    {mainTitle}
                </Text>
            </Paper>
            <Paper
                radius={theme.other.cardRadius}
                bg={theme.other.customYellow}
                p="md"
                style={{ flex: '1 1 200px' }}
            >
                <Text
                    c="white"
                    fz={{ base: 34, md: 48, lg: 64 }}
                    fw={500}
                    ta="center"
                >
                    {subTitle}
                </Text>
            </Paper>
        </Group>
    );
}
