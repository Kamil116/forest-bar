import React from 'react';
import {Box, Group, ScrollArea} from "@mantine/core";
import AdvantageCard from "@/components/Coperation/Advantages/AdvantageCard";
import { mockAdvantages } from "@/data/mockAdvantages";
import styles from "./Advantages.module.css";

function Advantages() {
    return (
        <Box w="100%" style={{ overflow: 'hidden' }}>
            <ScrollArea classNames={styles} type="auto" ml='xl' mr='xl' offsetScrollbars pb="md">
                <Group wrap="nowrap" align="flex-start" gap="xl">
                    {mockAdvantages.map((advantage) => (
                        <AdvantageCard 
                            key={advantage.id}
                            title={advantage.title} 
                            text={advantage.text}
                        />
                    ))}
                </Group>
            </ScrollArea>
        </Box>
    );
}

export default Advantages;