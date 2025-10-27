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
    MultiSelect,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import DataTable, { Column } from '@/components/Admin/DataTable';
import { Vacancy } from '@/types/vacancy';
import { mockVacancies } from '@/data/mockVacancies';

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
            title: (value) => (value.length < 3 ? 'Title must be at least 3 characters' : null),
            city: (value) => (value.length < 2 ? 'City is required' : null),
            department: (value) => (value.length < 3 ? 'Department must be at least 3 characters' : null),
            description: (value) => (value.length < 20 ? 'Description must be at least 20 characters' : null),
            conditions: (value) => (value.length === 0 ? 'At least one condition is required' : null),
            requirements: (value) => (value.length === 0 ? 'At least one requirement is required' : null),
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
        if (window.confirm(`Are you sure you want to delete "${vacancy.title}"?`)) {
            setVacancies(vacancies.filter((v) => v.id !== vacancy.id));
            notifications.show({
                title: 'Vacancy deleted',
                message: `${vacancy.title} has been removed`,
                color: 'red',
            });
        }
    };

    const handleSubmit = (values: Omit<Vacancy, 'id'>) => {
        if (editingVacancy) {
            setVacancies(
                vacancies.map((v) =>
                    v.id === editingVacancy.id ? { ...values, id: editingVacancy.id } : v
                )
            );
            notifications.show({
                title: 'Vacancy updated',
                message: `${values.title} has been updated successfully`,
                color: 'green',
            });
        } else {
            const newVacancy: Vacancy = {
                ...values,
                id: Math.max(...vacancies.map((v) => v.id)) + 1,
            };
            setVacancies([...vacancies, newVacancy]);
            notifications.show({
                title: 'Vacancy added',
                message: `${values.title} has been added successfully`,
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
            label: 'Title',
            sortable: true,
        },
        {
            key: 'city',
            label: 'City',
            sortable: true,
        },
        {
            key: 'department',
            label: 'Department',
            sortable: true,
            render: (value) => <Badge color={theme.other.customYellow}>{value}</Badge>,
        },
        {
            key: 'employment_type',
            label: 'Type',
            render: (value) => (
                <Badge color="blue" variant="light">
                    {value}
                </Badge>
            ),
        },
        {
            key: 'salary_min',
            label: 'Salary Range',
            render: (value, row) => {
                if (!value && !row.salary_max) return 'Not specified';
                return `₽${value?.toLocaleString()} - ₽${row.salary_max?.toLocaleString()}`;
            },
        },
        {
            key: 'status',
            label: 'Status',
            sortable: true,
            render: (value) => (
                <Badge color={getStatusColor(value)} variant="filled">
                    {value}
                </Badge>
            ),
        },
        {
            key: 'posted_date',
            label: 'Posted',
            sortable: true,
        },
    ];

    return (
        <Container size="xl" p="xl">
            <Stack gap="xl">
                <Title order={1} c="white" fw={700} size="42px">
                    Vacancies Management
                </Title>

                <DataTable
                    data={vacancies}
                    columns={columns}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onAdd={handleAdd}
                    searchKeys={['title', 'city', 'department', 'description']}
                    title="Job Vacancies"
                />

                <Modal
                    opened={opened}
                    onClose={() => setOpened(false)}
                    title={
                        <Title order={3} c="white">
                            {editingVacancy ? 'Edit Vacancy' : 'Add New Vacancy'}
                        </Title>
                    }
                    size="lg"
                    styles={{
                        content: {
                            backgroundColor: theme.other.darkBackground,
                        },
                        header: {
                            backgroundColor: theme.other.darkBackground,
                        },
                    }}
                >
                    <form onSubmit={form.onSubmit(handleSubmit)}>
                        <Stack gap="md">
                            <TextInput
                                label="Job Title"
                                placeholder="e.g., Sales Manager"
                                required
                                {...form.getInputProps('title')}
                                styles={{
                                    label: { color: 'white' },
                                    input: {
                                        backgroundColor: theme.other.cardBackground,
                                        color: 'white',
                                        borderColor: theme.other.customYellow,
                                    },
                                }}
                            />

                            <Group grow>
                                <TextInput
                                    label="City"
                                    placeholder="Москва"
                                    required
                                    {...form.getInputProps('city')}
                                    styles={{
                                        label: { color: 'white' },
                                        input: {
                                            backgroundColor: theme.other.cardBackground,
                                            color: 'white',
                                            borderColor: theme.other.customYellow,
                                        },
                                    }}
                                />
                                <TextInput
                                    label="Department"
                                    placeholder="Sales"
                                    required
                                    {...form.getInputProps('department')}
                                    styles={{
                                        label: { color: 'white' },
                                        input: {
                                            backgroundColor: theme.other.cardBackground,
                                            color: 'white',
                                            borderColor: theme.other.customYellow,
                                        },
                                    }}
                                />
                            </Group>

                            <Textarea
                                label="Description"
                                placeholder="Detailed job description"
                                required
                                minRows={3}
                                {...form.getInputProps('description')}
                                styles={{
                                    label: { color: 'white' },
                                    input: {
                                        backgroundColor: theme.other.cardBackground,
                                        color: 'white',
                                        borderColor: theme.other.customYellow,
                                    },
                                }}
                            />

                            <Stack gap="xs">
                                <Group>
                                    <TextInput
                                        placeholder="Add condition"
                                        value={newCondition}
                                        onChange={(e) => setNewCondition(e.currentTarget.value)}
                                        style={{ flex: 1 }}
                                        styles={{
                                            input: {
                                                backgroundColor: theme.other.cardBackground,
                                                color: 'white',
                                                borderColor: theme.other.customYellow,
                                            },
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
                                        Add
                                    </Button>
                                </Group>
                                <Stack gap={4}>
                                    {form.values.conditions.map((condition, index) => (
                                        <Badge
                                            key={index}
                                            color={theme.other.customYellow}
                                            rightSection={
                                                <span
                                                    style={{ cursor: 'pointer', marginLeft: '8px' }}
                                                    onClick={() => {
                                                        form.setFieldValue(
                                                            'conditions',
                                                            form.values.conditions.filter((_, i) => i !== index)
                                                        );
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
                                        placeholder="Add requirement"
                                        value={newRequirement}
                                        onChange={(e) => setNewRequirement(e.currentTarget.value)}
                                        style={{ flex: 1 }}
                                        styles={{
                                            input: {
                                                backgroundColor: theme.other.cardBackground,
                                                color: 'white',
                                                borderColor: theme.other.customYellow,
                                            },
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
                                        Add
                                    </Button>
                                </Group>
                                <Stack gap={4}>
                                    {form.values.requirements.map((requirement, index) => (
                                        <Badge
                                            key={index}
                                            color="blue"
                                            rightSection={
                                                <span
                                                    style={{ cursor: 'pointer', marginLeft: '8px' }}
                                                    onClick={() => {
                                                        form.setFieldValue(
                                                            'requirements',
                                                            form.values.requirements.filter((_, i) => i !== index)
                                                        );
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
                                    label="Min Salary (₽)"
                                    placeholder="80000"
                                    min={0}
                                    {...form.getInputProps('salary_min')}
                                    styles={{
                                        label: { color: 'white' },
                                        input: {
                                            backgroundColor: theme.other.cardBackground,
                                            color: 'white',
                                            borderColor: theme.other.customYellow,
                                        },
                                    }}
                                />
                                <NumberInput
                                    label="Max Salary (₽)"
                                    placeholder="150000"
                                    min={0}
                                    {...form.getInputProps('salary_max')}
                                    styles={{
                                        label: { color: 'white' },
                                        input: {
                                            backgroundColor: theme.other.cardBackground,
                                            color: 'white',
                                            borderColor: theme.other.customYellow,
                                        },
                                    }}
                                />
                            </Group>

                            <Group grow>
                                <Select
                                    label="Employment Type"
                                    placeholder="Select type"
                                    required
                                    data={[
                                        { value: 'full-time', label: 'Full Time' },
                                        { value: 'part-time', label: 'Part Time' },
                                        { value: 'contract', label: 'Contract' },
                                        { value: 'internship', label: 'Internship' },
                                    ]}
                                    {...form.getInputProps('employment_type')}
                                    styles={{
                                        label: { color: 'white' },
                                        input: {
                                            backgroundColor: theme.other.cardBackground,
                                            color: 'white',
                                            borderColor: theme.other.customYellow,
                                        },
                                    }}
                                />
                                <Select
                                    label="Status"
                                    placeholder="Select status"
                                    required
                                    data={[
                                        { value: 'open', label: 'Open' },
                                        { value: 'on-hold', label: 'On Hold' },
                                        { value: 'closed', label: 'Closed' },
                                    ]}
                                    {...form.getInputProps('status')}
                                    styles={{
                                        label: { color: 'white' },
                                        input: {
                                            backgroundColor: theme.other.cardBackground,
                                            color: 'white',
                                            borderColor: theme.other.customYellow,
                                        },
                                    }}
                                />
                            </Group>

                            <TextInput
                                label="Posted Date"
                                placeholder="YYYY-MM-DD"
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

                            <Group justify="flex-end" mt="md">
                                <Button variant="outline" onClick={() => setOpened(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" color={theme.other.customOrange}>
                                    {editingVacancy ? 'Update' : 'Create'}
                                </Button>
                            </Group>
                        </Stack>
                    </form>
                </Modal>
            </Stack>
        </Container>
    );
}

