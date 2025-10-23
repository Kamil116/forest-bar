import React from 'react';
import {Container, Stack, Text, Title, useMantineTheme} from "@mantine/core";

function AdvantageCard({title, text}: { title: string, text: string }) {
    const theme = useMantineTheme();
    
    return (
        <Container size="sm" bg={theme.other.darkBackground} py={theme.other.cardPadding} style={{borderRadius: theme.other.cardRadius}}>
            <Stack align="center" gap="md">
                <Title order={2} fz={theme.other.titleSize} fw={400} tt="uppercase" c={theme.other.customOrange}>
                    {title}
                </Title>
                <Text fz={20} c="rgba(247, 187, 26, 0.6)">
                    {text}
                </Text>
            </Stack>
        </Container>
    );
}

export default AdvantageCard;