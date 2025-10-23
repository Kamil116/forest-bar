import React from 'react';
import {Box, Group, Stack, Title, useMantineTheme} from "@mantine/core";
import {ToggleSection} from "@/components/Coperation/ToggleSection";
import Advantages from "@/components/Coperation/Advantages/Advantages";

function CooperationPage() {
    const theme = useMantineTheme();
    
    return (
        <Box h="120vh"
             bg={theme.other.cardBackground}>
            <Stack h="100%"
                   align="center"
                   justify="space-between">
                <Title fw={700} fz={64} tt="uppercase" c="white" py={40}>
                    Сотрудничество
                </Title>
                <Advantages/>
                <ToggleSection/>
            </Stack>
        </Box>
    );
}

export default CooperationPage;