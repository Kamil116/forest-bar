import React from 'react';
import VacancyCard from "@/components/Coperation/VacancyCards/VacancyCard";
import {Box, Group, ScrollArea} from "@mantine/core";
import { mockVacancies } from "@/data/mockVacancies";
import styles from "./VacancyCards.module.css";

function VacancyCards() {
    // Map mock vacancies to the format expected by VacancyCard
    const jobs = mockVacancies
        .filter(vacancy => vacancy.status === 'Открыта') // Only show open vacancies
        .map(vacancy => ({
            title: vacancy.title,
            city: vacancy.city,
            conditions: vacancy.conditions,
        }));

    return (
        <Box w="100%">
            <ScrollArea classNames={styles} type="auto" offsetScrollbars ml='xl' mr='xl' pb="md">
                <Group wrap='nowrap' gap='xl'>
                    {jobs.map((job, index) => <VacancyCard key={index} job={job}/>)}
                </Group>
            </ScrollArea>
        </Box>
    );
}

export default VacancyCards;