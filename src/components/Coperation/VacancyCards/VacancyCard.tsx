import React from 'react';
import {
    Badge,
    Button,
    Divider,
    Container,
    Stack,
    Text,
    Title,
    useMantineTheme,
    Modal,
    Group,
    Box,
    CloseButton,
    Image,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Vacancy } from '@/types/vacancy';

function VacancyCard({ job }: { job: Vacancy }) {
    const theme = useMantineTheme();
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <Container
            size="sm"
            bg={theme.other.darkBackground}
            py={theme.other.cardPadding}
            style={{ borderRadius: theme.other.cardRadius }}
        >
            <Stack align="center">
                {/* Заголовок и город */}
                <Stack>
                    <Title
                        order={2}
                        fz={theme.other.titleSize}
                        fw={400}
                        tt="uppercase"
                        c={theme.other.customOrange}
                    >
                        {job.title}
                    </Title>
                    <Text fz={24} c="rgba(247, 187, 26, 0.6)">
                        {job.city}
                    </Text>
                </Stack>

                {/* Разделитель */}
                <Divider
                    size={2}
                    color={theme.other.customOrange}
                    w="80%"
                    mx="auto"
                />

                {/* Условия */}
                <Stack w="100%">
                    {job.additional_conditions?.map((condition, index) => (
                        <Badge
                            key={index}
                            bg={theme.other.cardBackground}
                            radius="lg"
                            size="lg"
                            c={theme.other.customOrange}
                            fz={24}
                            fullWidth
                            p={20}
                        >
                            {condition}
                        </Badge>
                    ))}
                </Stack>

                <Button
                    mt="md"
                    color={theme.other.customOrange}
                    radius={theme.other.buttonRadius}
                    fz={theme.other.buttonSize}
                    fw={500}
                    px="xl"
                    w="fit-content"
                    onClick={open}
                >
                    Подробнее
                </Button>

                <Modal
                    opened={opened}
                    onClose={close}
                    centered
                    size="auto"
                    withCloseButton={false}
                    styles={{
                        content: {
                            backgroundColor: 'rgba(212, 167, 59, 1)',
                            borderRadius: '25px',
                        },
                        body: {
                            padding: 0,
                        },
                    }}
                    overlayProps={{
                        backgroundOpacity: 0.55,
                        blur: 3,
                    }}
                >
                    <Box bg="rgba(212, 167, 59, 1)" p="xl">
                        <Group justify="space-between" align="flex-start">
                            <Group gap="md" wrap="nowrap" w="70%">
                                <Image
                                    src={`${import.meta.env.BASE_URL}/images/beehive.svg`}
                                    alt="Beehive icon"
                                    w={60}
                                    h={60}
                                />
                                <Text c="black" fz={32} fw={700}>
                                    Компания «Forest bar» с радостью объявляет
                                    о наборе энергичных и амбициозных
                                    сотрудников. Мы стремимся создать
                                    уникальную сеть розничных продаж
                                    экологических сладостей без сахара, и
                                    приглашаем вас стать частью этой команды.
                                </Text>
                            </Group>
                            <CloseButton
                                onClick={close}
                                size="lg"
                                c="rgba(92, 61, 46, 1)"
                            />
                        </Group>
                    </Box>

                    <Box
                        bg="rgba(92, 61, 46, 1)"
                        p="xl"
                        ml="2rem"
                        mr="2rem"
                        style={{
                            borderRadius: '14px',
                            maxHeight: '60vh',
                            overflowY: 'auto',
                        }}
                    >
                        <Stack gap="md">
                            <Text fz={28} fw={700} c="white" ta="center">
                                Мы ищем активных специалистов, которые готовы к
                                постоянному развитию и самореализации. Наша
                                должность — продавец эко-вкусняшек. Нам нужны
                                сотрудники в такие города, как:
                            </Text>

                            <Text
                                fz={24}
                                fw={700}
                                c="rgba(210, 160, 26, 1)"
                                ta="center"
                            >
                                ОРЕНБУРГ, НИЖНИЙ НОВГОРОД, МАГНИТОГОРСК,
                                ИВАНОВО, ИЖЕВСК, КИРОВ, ТОЛЬЯТТИ, ТОМСК,
                                НОВОСИБИРСК , НОВОРОССИЙСК
                            </Text>

                            <Group gap="xs">
                                <Box
                                    w={24}
                                    h={24}
                                    bg="white"
                                    style={{ borderRadius: '4px' }}
                                >
                                    <Text
                                        fz={16}
                                        c="rgba(92, 61, 46, 1)"
                                        ta="center"
                                        fw={700}
                                    >
                                        ✓
                                    </Text>
                                </Box>
                                <Text fz={32} c="white">
                                    Заработная плата в нашей компании
                                    составляет от <strong>80 000</strong> до{' '}
                                    <strong>200 000</strong> рублей в месяц.
                                </Text>
                            </Group>

                            <Group gap="xs" wrap="nowrap">
                                <Box
                                    w={24}
                                    h={24}
                                    bg="white"
                                    style={{ borderRadius: '4px' }}
                                >
                                    <Text
                                        fz={16}
                                        c="rgba(92, 61, 46, 1)"
                                        ta="center"
                                        fw={700}
                                    >
                                        ✓
                                    </Text>
                                </Box>
                                <Text fz={32} c="white">
                                    Доход при графике 5/2{' '}
                                    <strong>45000</strong> и 6/1{' '}
                                    <strong>50000</strong> + % от продаж, в
                                    среднем от <strong>80 000 ₽</strong> и
                                    выше, плюс премии и надбавки за стаж.
                                </Text>
                            </Group>
                        </Stack>
                    </Box>
                    <Stack>
                        <Text fz={32} c="white" fw={700} ta="center">
                            Для записи на собеседование звони по номеру
                            телефона
                        </Text>

                        <Text
                            fz={48}
                            fw={700}
                            c="rgba(65, 44, 40, 1)"
                            ta="center"
                        >
                            +7 902 019 23 91
                        </Text>
                    </Stack>
                </Modal>
            </Stack>
        </Container>
    );
}

export default VacancyCard;
