import React from 'react';
import VacancyCard from "@/components/Coperation/VacancyCards/VacancyCard";
import {Group} from "@mantine/core";

function VacancyCards() {
    const jobs = [
        {
            title: 'Продавец-консультант',
            city: 'Новосибирск',
            conditions: ['Удобный график 2/2', 'Средняя зп 70 000 руб', 'Оплата 2 раза в месяц', 'Есть обучение'],
        },
        {
            title: 'Кассир',
            city: 'Москва',
            conditions: ['Сменный график', 'Зарплата 60 000 руб', 'Соцпакет', 'Обучение на рабочем месте'],
        },
        {
            title: 'Менеджер по продажам',
            city: 'Санкт-Петербург',
            conditions: ['Гибкий график', 'Средняя зп 80 000 руб', 'Бонусы', 'Карьерный рост'],
        },
        {
            title: 'Старший консультант',
            city: 'Екатеринбург',
            conditions: ['График 5/2', 'Зарплата 90 000 руб', 'Командировки оплачиваются', 'Профессиональное обучение'],
        },
    ];

    return (
        <Group>
            {jobs.map(job => <VacancyCard job={job}/>)}
        </Group>

    );
}

export default VacancyCards;