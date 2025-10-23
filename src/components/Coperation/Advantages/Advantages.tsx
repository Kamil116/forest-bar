import React from 'react';
import {Box, Group} from "@mantine/core";
import AdvantageCard from "@/components/Coperation/Advantages/AdvantageCard";

function Advantages() {
    return (
        <Box>
            <Group justify="center" align="flex-start" gap="xl">
                <AdvantageCard title='Карьерный рост' text='Возможности для развития и роста внутри компании.'/>
                <AdvantageCard title='Командная работа'
                               text='Мы поддерживаем друг друга и достигаем целей вместе.'/>
                <AdvantageCard title='Обучение' text='Постоянное развитие и новые навыки — часть нашей культуры.'/>
                <AdvantageCard title='Обучение' text='Постоянное развитие и новые навыки — часть нашей культуры.'/>
            </Group>
        </Box>
    );
}

export default Advantages;