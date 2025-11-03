import React from 'react';
import { Box, Group, ScrollArea } from '@mantine/core';
import AdvantageCard from '@/components/Coperation/Advantages/AdvantageCard';
import { mockAdvantages } from '@/data/mockAdvantages';
import styles from './Advantages.module.css';

function Advantages() {
    return (
        <Box >
            <Group gap="xl" justify="center">
                {mockAdvantages.map((advantage) => (
                    <AdvantageCard
                        key={advantage.id}
                        title={advantage.title}
                        description={advantage.description}
                    />
                ))}
            </Group>
        </Box>
    );
}

export default Advantages;
