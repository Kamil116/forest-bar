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
            py={{ base: 'sm', md: theme.other.cardPadding }}
            px={{ base: 'sm', md: theme.other.cardPadding }}
            style={{
                borderRadius: theme.other.cardRadius,
                minWidth: 'clamp(200px, 25vw, 400px)',
                maxWidth: '100%',
            }}
        >
            <Stack align="center" gap="xl">
                <Stack gap={0}>
                    <Image
                        src={`${import.meta.env.BASE_URL}/images/home-bg.jpg`}
                        alt="Profile"
                        h={{ base: 120, sm: 150, md: 180, lg: 200 }}
                        radius="xl"
                        style={{
                            objectFit: 'cover',
                        }}
                    />
                    <Text 
                        c="white" 
                        tt="uppercase" 
                        fz={{ base: 16, sm: 20, md: 28, lg: 34 }} 
                        fw={700}
                        ta="center"
                    >
                        {leaderProfile.last_name} {leaderProfile.first_name}{' '}
                        {leaderProfile.middle_name}
                    </Text>
                    <Divider
                        mx="auto"
                        size={2}
                        color={theme.other.customOrange}
                        w="80%"
                    />
                    <Text 
                        c={theme.other.customOrange} 
                        fz={{ base: 14, sm: 18, md: 24, lg: 34 }}
                        ta="center"
                    >
                        {leaderProfile.city}
                    </Text>
                </Stack>
                <Stack gap='md' align="center">
                    <Text 
                        c={theme.other.customOrange} 
                        fz={{ base: 14, sm: 18, md: 24, lg: 34 }}
                        ta="center"
                    >
                        {leaderProfile.phone}
                    </Text>
                    <Text 
                        c={theme.other.customOrange} 
                        fz={{ base: 12, sm: 16, md: 22, lg: 34 }} 
                        td="underline"
                        ta="center"
                        style={{ wordBreak: 'break-word' }}
                    >
                        {leaderProfile.email}
                    </Text>
                    <Button
                        color={theme.other.customOrange}
                        fz={{ base: 14, sm: 18, md: 24, lg: 34 }}
                        fw={500}
                        w="fit-content"
                        px={{ base: 'md', md: 'xl' }}
                        size="md"
                    >
                        Реферальная ссылка
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
}

export default ProfileCard;
