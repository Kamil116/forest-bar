import React from 'react';
import ProfileCard from "@/components/Coperation/ProfileCards/ProfileCard";
import {Box, Divider, Group, useMantineTheme} from "@mantine/core";

function ProfileCards() {
    const theme = useMantineTheme();
    const leaders = [
        {
            name: 'Александр',
            middleName: 'Владимирович',
            surname: 'Петров',
            phone: 89001234567,
        },
        {
            name: 'Елена',
            middleName: 'Сергеевна',
            surname: 'Иванова',
            phone: 89007654321,
        },
        {
            name: 'Дмитрий',
            middleName: 'Александрович',
            surname: 'Сидоров',
            phone: 89005551234,
        },
        {
            name: 'Мария',
            middleName: 'Николаевна',
            surname: 'Козлова',
            phone: 89009876543,
        },
    ];

    return (
        <>
            <Group>
                {leaders.map((leader, index) => <ProfileCard key={index} leaderProfile={leader}/>)}
            </Group>
            <Box pos="relative" w="20%" mx="auto" my="xl">
                <Divider size={2} color={theme.other.customOrange}/>
                <Box
                    pos="absolute"
                    top="50%"
                    left="50%"
                    style={{
                        transform: "translate(-50%, -50%)",
                        backgroundColor: theme.other.customOrange,
                        borderRadius: "50%",
                        width: 16,
                        height: 16,
                    }}
                />
            </Box>

        </>
    );
}

export default ProfileCards;