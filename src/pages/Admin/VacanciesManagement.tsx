import { useState } from 'react';
import {
    Container,
    Title,
    Modal,
    TextInput,
    Textarea,
    Button,
    Group,
    Stack,
    Badge,
    useMantineTheme,
    NumberInput,
    Select,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';
import DataTable, { Column } from '@/components/Admin/DataTable';
import { Vacancy } from '@/types/vacancy';
import { mockVacancies } from '@/data/mockVacancies';
import classes from './VacanciesManagement.module.css';

export default function VacanciesManagement() {
    const theme = useMantineTheme();
    const [vacancies, setVacancies] = useState<Vacancy[]>(mockVacancies);
    const [opened, setOpened] = useState(false);
    const [editingVacancy, setEditingVacancy] = useState<Vacancy | null>(null);

    const form = useForm<Omit<Vacancy, 'id'>>({
        initialValues: {
            title: '',
            city: '',
            department: '',
            description: '',
            conditions: [],
            requirements: [],
            salary_min: 0,
            salary_max: 0,
            employment_type: 'full-time',
            status: 'open',
            posted_date: new Date().toISOString().split('T')[0],
        },
        validate: {
            title: (value) => (value.length < 3 ? 'Название должно содержать минимум 3 символа' : null),
            city: (value) => (value.length < 2 ? 'Город обязателен' : null),
            department: (value) => (value.length < 3 ? 'Отдел должен содержать минимум 3 символа' : null),
            description: (value) => (value.length < 20 ? 'Описание должно содержать минимум 20 символов' : null),
            conditions: (value) => (value.length === 0 ? 'Необходимо добавить хотя бы одно условие' : null),
            requirements: (value) => (value.length === 0 ? 'Необходимо добавить хотя бы одно требование' : null),
        },
    });

    const [newCondition, setNewCondition] = useState('');
    const [newRequirement, setNewRequirement] = useState('');

    const handleAdd = () => {
        setEditingVacancy(null);
        form.reset();
        setOpened(true);
    };

    const handleEdit = (vacancy: Vacancy) => {
        setEditingVacancy(vacancy);
        form.setValues({
            title: vacancy.title,
            city: vacancy.city,
            department: vacancy.department,
            description: vacancy.description,
            conditions: vacancy.conditions,
            requirements: vacancy.requirements,
            salary_min: vacancy.salary_min,
            salary_max: vacancy.salary_max,
            employment_type: vacancy.employment_type,
            status: vacancy.status,
            posted_date: vacancy.posted_date,
        });
        setOpened(true);
    };

    const handleDelete = (vacancy: Vacancy) => {
        modals.openConfirmModal({
            title: 'Удалить вакансию',
            children: `Вы уверены, что хотите удалить вакансию "${vacancy.title}"?`,
            labels: { confirm: 'Удалить', cancel: 'Отмена' },
            confirmProps: { color: 'red', size: 'lg' },
            cancelProps: { size: 'lg' },
            styles: {
                title: { fontSize: '24px', fontWeight: 700 },
                body: { fontSize: '18px' },
            },
            onConfirm: () => {
                setVacancies(vacancies.filter((v) => v.id !== vacancy.id));
                notifications.show({
                    title: 'Вакансия удалена',
                    message: `${vacancy.title} была удалена`,
                    color: 'red',
                });
            },
        });
    };

    const handleSubmit = (values: Omit<Vacancy, 'id'>) => {
        if (editingVacancy) {
            setVacancies(
                vacancies.map((v) =>
                    v.id === editingVacancy.id ? { ...values, id: editingVacancy.id } : v
                )
            );
            notifications.show({
                title: 'Вакансия обновлена',
                message: `${values.title} была успешно обновлена`,
                color: 'green',
            });
        } else {
            const newVacancy: Vacancy = {
                ...values,
                id: Math.max(...vacancies.map((v) => v.id)) + 1,
            };
            setVacancies([...vacancies, newVacancy]);
            notifications.show({
                title: 'Вакансия добавлена',
                message: `${values.title} была успешно добавлена`,
                color: 'green',
            });
        }
        setOpened(false);
        form.reset();
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'open':
                return 'green';
            case 'on-hold':
                return 'yellow';
            case 'closed':
                return 'red';
            default:
                return 'gray';
        }
    };

    const columns: Column<Vacancy>[] = [
        {
            key: 'id',
            label: 'ID',
            sortable: true,
        },
        {
            key: 'title',
            label: 'Название',
            sortable: true,
        },
        {
            key: 'city',
            label: 'Город',
            sortable: true,
        },
        {
            key: 'department',
            label: 'Отдел',
            sortable: true,
            render: (value) => <Badge color={theme.other.customYellow}>{value}</Badge>,
        },
        {
            key: 'employment_type',
            label: 'Тип',
            render: (value) => (
                <Badge color="blue" variant="light">
                    {value}
                </Badge>
            ),
        },
        {
            key: 'salary_min',
            label: 'Диапазон зарплаты',
            render: (value, row) => {
                if (!value && !row.salary_max) {
                    return 'Не указано';
                }
                return `₽${value?.toLocaleString()} - ₽${row.salary_max?.toLocaleString()}`;
            },
        },
        {
            key: 'status',
            label: 'Статус',
            sortable: true,
            render: (value) => (
                <Badge color={getStatusColor(value)} variant="filled">
                    {value}
                </Badge>
            ),
        },
        {
            key: 'posted_date',
            label: 'Опубликовано',
            sortable: true,
        },
    ];

    return (
        <Container size="xl" p="xl">
            <Stack gap="xl">
                <Title order={1} c="white" fw={700} size="42px">
                    Управление вакансиями
                </Title>

                <DataTable
                    data={vacancies}
                    columns={columns}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onAdd={handleAdd}
                    searchKeys={['title', 'city', 'department', 'description']}
                    title="Вакансии"
                />

                <Modal
                    opened={opened}
                    onClose={() => setOpened(false)}
                    title={
                        <Title order={2} c='white'>
                            {editingVacancy ? 'Редактировать вакансию' : 'Добавить новую вакансию'}
                        </Title>
                    }
                    size="lg"
                    centered
                    overlayProps={{
                        backgroundOpacity: 0.55,
                        blur: 3,
                    }}
                    classNames={{
                        content: classes.modalContent,
                        body: classes.modalBody,
                        header: classes.modalHeader,
                    }}
                >
                    <form onSubmit={form.onSubmit(handleSubmit)}>
                        <Stack gap="md">
                            <TextInput
                                label="Название вакансии"
                                placeholder="например, Менеджер по продажам"
                                required
                                {...form.getInputProps('title')}
                                classNames={{
                                    label: classes.inputLabel,
                                    input: classes.inputField,
                                }}
                            />

                            <Group grow>
                                <TextInput
                                    label="Город"
                                    placeholder="Москва"
                                    required
                                    {...form.getInputProps('city')}
                                    classNames={{
                                        label: classes.inputLabel,
                                        input: classes.inputField,
                                    }}
                                />
                                <TextInput
                                    label="Отдел"
                                    placeholder="Продажи"
                                    required
                                    {...form.getInputProps('department')}
                                    classNames={{
                                        label: classes.inputLabel,
                                        input: classes.inputField,
                                    }}
                                />
                            </Group>

                            <Textarea
                                label="Описание"
                                placeholder="Подробное описание вакансии"
                                required
                                minRows={3}
                                {...form.getInputProps('description')}
                                classNames={{
                                    label: classes.inputLabel,
                                    input: classes.inputField,
                                }}
                            />

                            <Stack gap="xs">
                                <Group>
                                    <TextInput
                                        placeholder="Добавить условие"
                                        value={newCondition}
                                        onChange={(e) => setNewCondition(e.currentTarget.value)}
                                        style={{ flex: 1 }}
                                        classNames={{
                                            input: classes.inputField,
                                        }}
                                    />
                                    <Button
                                        onClick={() => {
                                            if (newCondition.trim()) {
                                                form.setFieldValue('conditions', [
                                                    ...form.values.conditions,
                                                    newCondition.trim(),
                                                ]);
                                                setNewCondition('');
                                            }
                                        }}
                                        color={theme.other.customOrange}
                                    >
                                        Добавить
                                    </Button>
                                </Group>
                                <Stack gap={4}>
                                    {form.values.conditions.map((condition, index) => (
                                        <Badge
                                            key={index}
                                            color={theme.other.customYellow}
                                            rightSection={
                                                <span
                                                    role="button"
                                                    tabIndex={0}
                                                    style={{ cursor: 'pointer', marginLeft: '8px' }}
                                                    onClick={() => {
                                                        form.setFieldValue(
                                                            'conditions',
                                                            form.values.conditions.filter((_, i) => i !== index)
                                                        );
                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter' || e.key === ' ') {
                                                            form.setFieldValue(
                                                                'conditions',
                                                                form.values.conditions.filter((_, i) => i !== index)
                                                            );
                                                        }
                                                    }}
                                                >
                                                    ×
                                                </span>
                                            }
                                        >
                                            {condition}
                                        </Badge>
                                    ))}
                                </Stack>
                            </Stack>

                            <Stack gap="xs">
                                <Group>
                                    <TextInput
                                        placeholder="Добавить требование"
                                        value={newRequirement}
                                        onChange={(e) => setNewRequirement(e.currentTarget.value)}
                                        style={{ flex: 1 }}
                                        classNames={{
                                            input: classes.inputField,
                                        }}
                                    />
                                    <Button
                                        onClick={() => {
                                            if (newRequirement.trim()) {
                                                form.setFieldValue('requirements', [
                                                    ...form.values.requirements,
                                                    newRequirement.trim(),
                                                ]);
                                                setNewRequirement('');
                                            }
                                        }}
                                        color={theme.other.customOrange}
                                    >
                                        Добавить
                                    </Button>
                                </Group>
                                <Stack gap={4}>
                                    {form.values.requirements.map((requirement, index) => (
                                        <Badge
                                            key={index}
                                            color="blue"
                                            rightSection={
                                                <span
                                                    role="button"
                                                    tabIndex={0}
                                                    style={{ cursor: 'pointer', marginLeft: '8px' }}
                                                    onClick={() => {
                                                        form.setFieldValue(
                                                            'requirements',
                                                            form.values.requirements.filter((_, i) => i !== index)
                                                        );
                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter' || e.key === ' ') {
                                                            form.setFieldValue(
                                                                'requirements',
                                                                form.values.requirements.filter((_, i) => i !== index)
                                                            );
                                                        }
                                                    }}
                                                >
                                                    ×
                                                </span>
                                            }
                                        >
                                            {requirement}
                                        </Badge>
                                    ))}
                                </Stack>
                            </Stack>

                            <Group grow>
                                <NumberInput
                                    label="Минимальная зарплата (₽)"
                                    placeholder="80000"
                                    min={0}
                                    {...form.getInputProps('salary_min')}
                                    classNames={{
                                        label: classes.inputLabel,
                                        input: classes.inputField,
                                    }}
                                />
                                <NumberInput
                                    label="Максимальная зарплата (₽)"
                                    placeholder="150000"
                                    min={0}
                                    {...form.getInputProps('salary_max')}
                                    classNames={{
                                        label: classes.inputLabel,
                                        input: classes.inputField,
                                    }}
                                />
                            </Group>

                            <Group grow>
                                <Select
                                    label="Тип занятости"
                                    placeholder="Выберите тип"
                                    required
                                    data={[
                                        { value: 'full-time', label: 'Полный день' },
                                        { value: 'part-time', label: 'Частичная занятость' },
                                        { value: 'contract', label: 'Контракт' },
                                        { value: 'internship', label: 'Стажировка' },
                                    ]}
                                    {...form.getInputProps('employment_type')}
                                    classNames={{
                                        label: classes.inputLabel,
                                        input: classes.inputField,
                                    }}
                                />
                                <Select
                                    label="Статус"
                                    placeholder="Выберите статус"
                                    required
                                    data={[
                                        { value: 'open', label: 'Открыта' },
                                        { value: 'on-hold', label: 'На паузе' },
                                        { value: 'closed', label: 'Закрыта' },
                                    ]}
                                    {...form.getInputProps('status')}
                                    classNames={{
                                        label: classes.inputLabel,
                                        input: classes.inputField,
                                    }}
                                />
                            </Group>

                            <TextInput
                                label="Дата публикации"
                                placeholder="ГГГГ-ММ-ДД"
                                required
                                {...form.getInputProps('posted_date')}
                                styles={{
                                    label: { color: 'white' },
                                    input: {
                                        backgroundColor: theme.other.cardBackground,
                                        color: 'white',
                                        borderColor: theme.other.customYellow,
                                    },
                                }}
                            />

                            <Group className={classes.buttonGroup}>
                                <Button variant="outline" onClick={() => setOpened(false)}>
                                    Отмена
                                </Button>
                                <Button type="submit" color={theme.other.customOrange}>
                                    {editingVacancy ? 'Обновить' : 'Создать'}
                                </Button>
                            </Group>
                        </Stack>
                    </form>
                </Modal>
            </Stack>
        </Container>
    );
}

