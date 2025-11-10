import React from 'react';
import {
    Button,
    Box,
    Stack,
    Text,
    Image,
    useMantineTheme,
    Divider,
} from '@mantine/core';
import { Vendor } from '@/types/vendor';

function ProfileCard({ leaderProfile }: { leaderProfile: Vendor }) {
    const theme = useMantineTheme();

    return (
        <Box
            bg={theme.other.darkBackground}
            py={theme.other.cardPadding}
            px={theme.other.cardPadding}
            style={{
                borderRadius: theme.other.cardRadius,
                minWidth: 'clamp(200px, 25vw, 400px)',
            }}
        >
            <Stack align="center" gap="xl">
                <Stack gap={0}>
                    <Image
                        src={`${import.meta.env.BASE_URL}/images/home-bg.jpg`}
                        alt="Profile"
                        h={200}
                        radius="xl"
                        style={{
                            objectFit: 'cover',
                        }}
                    />
                    <Text c="white" tt="uppercase" fz={34} fw={700}>
                        {leaderProfile.last_name} {leaderProfile.first_name}{' '}
                        {leaderProfile.middle_name}
                    </Text>
                    <Divider
                        mx="auto"
                        size={2}
                        color={theme.other.customOrange}
                        w="80%"
                    />
                    <Text c={theme.other.customOrange} fz={34}>
                        {leaderProfile.city}
                    </Text>
                </Stack>
                <Stack gap='md' align="center">
                    <Text c={theme.other.customOrange} fz={34}>
                        {leaderProfile.phone}
                    </Text>
                    <Text c={theme.other.customOrange} fz={34} td="underline">
                        {leaderProfile.email}
                    </Text>
                    <Button
                        color={theme.other.customOrange}
                        fz={34}
                        fw={500}
                        w="fit-content"
                        px="xl"
                    >
                        Реферальная ссылка
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
}

export default ProfileCard;
