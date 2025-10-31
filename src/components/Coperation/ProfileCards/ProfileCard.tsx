import React from 'react';
import {Button, Box, Stack, Text, Image, useMantineTheme} from "@mantine/core";

function ProfileCard({leaderProfile}: {
    leaderProfile: { name: string, middleName: string, surname: string, phone: string | number }
}) {
    const theme = useMantineTheme();

    return (
        <Box
            bg={theme.other.darkBackground}
            py={theme.other.cardPadding}
            px={theme.other.cardPadding}
            style={{
                borderRadius: theme.other.cardRadius, 
                minWidth: 'clamp(200px, 25vw, 400px)',
                border: `1px solid ${theme.other.customOrange}`
            }}
        >
            <Stack align="center">
                <Image
                    src={`${import.meta.env.BASE_URL}/images/home-bg.jpg`}
                    alt="Profile"
                    h={120}
                    radius="xl"
                    style={{
                        objectFit: 'cover',
                    }}
                />
                <Text c={theme.other.customOrange} tt="uppercase" fz={34}
                      fw={700}>{leaderProfile.name} {leaderProfile.surname} {leaderProfile.middleName}</Text>
                <Text c={theme.other.customOrange} tt="uppercase" fz={34}>Конакты:</Text>
                <Text c={theme.other.customOrange} fz={34}>{leaderProfile.phone}</Text>
                <Button
                    mt="md"
                    color={theme.other.customOrange}
                    radius={theme.other.buttonRadius}
                    fz={34}
                    fw={500}
                    w="fit-content"
                    px="xl"
                >
                    Каталог
                </Button>
            </Stack>
        </Box>
    );
}

export default ProfileCard;