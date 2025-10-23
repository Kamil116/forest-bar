import React from 'react';
import {Badge, Button, Divider, Container, Stack, Text, Title, useMantineTheme} from "@mantine/core";

function VacancyCard({job}: { job: { title: string, city: string, conditions: string[] } }) {
    const theme = useMantineTheme();
    
    return (
        <Container
            size="sm"
            bg={theme.other.darkBackground}
            py={theme.other.cardPadding}
            style={{borderRadius: theme.other.cardRadius}}
        >
            <Stack align="center">
                {/* Заголовок и город */}
                <Stack>
                    <Title order={2} fz={theme.other.titleSize} fw={400} tt="uppercase" c={theme.other.customOrange}>
                        {job.title}
                    </Title>
                    <Text fz={24} c="rgba(247, 187, 26, 0.6)">
                        {job.city}
                    </Text>
                </Stack>

                {/* Разделитель */}
                <Divider size={2} color={theme.other.customOrange} w="80%" mx="auto"/>

                {/* Условия */}
                <Stack w="100%">
                    {job.conditions.map((condition, index) => (
                        <Badge
                            key={index}
                            bg={theme.other.cardBackground}
                            radius="lg"
                            size="lg"
                            c={theme.other.customOrange}
                            fz={24}
                            fullWidth
                            p={20}
                        >
                            {condition}
                        </Badge>
                    ))}
                </Stack>

                {/* Кнопка */}
                <Button mt="md" color={theme.other.customOrange} radius={theme.other.buttonRadius} fz={theme.other.buttonSize} fw={500} px="xl" w="fit-content">
                    Подробнее
                </Button>
            </Stack>
        </Container>
    );
}

export default VacancyCard;
