import React from 'react';
import {Box, Stack, Text, Title, useMantineTheme} from "@mantine/core";

function AdvantageCard({title, description}: { title: string, description: string }) {
    const theme = useMantineTheme();
    
    return (
        <Box 
            bg={theme.other.darkBackground} 
            p={theme.other.cardPadding}
            style={{
                borderRadius: theme.other.cardRadius,
                minWidth: 'clamp(200px, 25vw, 400px)',
            }}
        >
            <Stack align="center" gap="md">
                <Title order={2} fz={theme.other.titleSize} fw={400} tt="uppercase" c={theme.other.customOrange}>
                    {title}
                </Title>
                <Text fz={20} c="rgba(247, 187, 26, 0.6)">
                    {description}
                </Text>
            </Stack>
        </Box>
    );
}

export default AdvantageCard;