import { useState } from 'react';
import {
    Container,
    Title,
    Modal,
    TextInput,
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
import { Employee } from '@/types/employee';
import { mockEmployees } from '@/data/mockEmployees';
import classes from './EmployeesManagement.module.css';

export default function EmployeesManagement() {
    const theme = useMantineTheme();
    const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
    const [opened, setOpened] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

    const form = useForm<Omit<Employee, 'id'>>({
        initialValues: {
            name: '',
            surname: '',
            middleName: '',
            phone: '',
            email: '',
            position: '',
            department: '',
            hireDate: new Date().toISOString().split('T')[0],
            salary: 0,
            image_url: '',
            status: 'active',
        },
        validate: {
            name: (value) => (value.length < 2 ? 'Имя должно содержать минимум 2 символа' : null),
            surname: (value) => (value.length < 2 ? 'Фамилия должна содержать минимум 2 символа' : null),
            phone: (value) => (value.length < 10 ? 'Телефон должен быть действительным' : null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Неверный email'),
            position: (value) => (value.length < 3 ? 'Должность должна содержать минимум 3 символа' : null),
            department: (value) => (value.length < 3 ? 'Отдел должен содержать минимум 3 символа' : null),
        },
    });

    const handleAdd = () => {
        setEditingEmployee(null);
        form.reset();
        setOpened(true);
    };

    const handleEdit = (employee: Employee) => {
        setEditingEmployee(employee);
        form.setValues({
            name: employee.name,
            surname: employee.surname,
            middleName: employee.middleName,
            phone: employee.phone,
            email: employee.email,
            position: employee.position,
            department: employee.department,
            hireDate: employee.hireDate,
            salary: employee.salary,
            image_url: employee.image_url || '',
            status: employee.status,
        });
        setOpened(true);
    };

    const handleDelete = (employee: Employee) => {
        modals.openConfirmModal({
            title: 'Удалить сотрудника',
            children: `Вы уверены, что хотите удалить "${employee.name} ${employee.surname}"?`,
            labels: { confirm: 'Удалить', cancel: 'Отмена' },
            confirmProps: { color: 'red', size: 'lg' },
            cancelProps: { size: 'lg' },
            styles: {
                title: { fontSize: '24px', fontWeight: 700 },
                body: { fontSize: '18px' },
            },
            onConfirm: () => {
                setEmployees(employees.filter((e) => e.id !== employee.id));
                notifications.show({
                    title: 'Сотрудник удален',
                    message: `${employee.name} ${employee.surname} был удален`,
                    color: 'red',
                });
            },
        });
    };

    const handleSubmit = (values: Omit<Employee, 'id'>) => {
        if (editingEmployee) {
            setEmployees(
                employees.map((e) =>
                    e.id === editingEmployee.id ? { ...values, id: editingEmployee.id } : e
                )
            );
            notifications.show({
                title: 'Сотрудник обновлен',
                message: `${values.name} ${values.surname} был успешно обновлен`,
                color: 'green',
            });
        } else {
            const newEmployee: Employee = {
                ...values,
                id: Math.max(...employees.map((e) => e.id)) + 1,
            };
            setEmployees([...employees, newEmployee]);
            notifications.show({
                title: 'Сотрудник добавлен',
                message: `${values.name} ${values.surname} был успешно добавлен`,
                color: 'green',
            });
        }
        setOpened(false);
        form.reset();
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'green';
            case 'vacation':
                return 'yellow';
            case 'inactive':
                return 'red';
            default:
                return 'gray';
        }
    };

    const columns: Column<Employee>[] = [
        {
            key: 'id',
            label: 'ID',
            sortable: true,
        },
        {
            key: 'name',
            label: 'ФИО',
            sortable: true,
            render: (_value, row) => `${row.surname} ${row.name} ${row.middleName}`,
        },
        {
            key: 'position',
            label: 'Должность',
            sortable: true,
        },
        {
            key: 'department',
            label: 'Отдел',
            sortable: true,
            render: (value) => <Badge color={theme.other.customYellow}>{value}</Badge>,
        },
        {
            key: 'phone',
            label: 'Телефон',
        },
        {
            key: 'email',
            label: 'Email',
            render: (value) => (
                <span className={classes.descriptionText}>
                    {value}
                </span>
            ),
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
            key: 'salary',
            label: 'Зарплата',
            sortable: true,
            render: (value) => (value ? `₽${value.toLocaleString()}` : 'Н/Д'),
        },
    ];

    return (
        <Container size="xl" className={classes.container}>
            <Stack gap="xl">
                <Title order={1} className={classes.title}>
                    Управление сотрудниками
                </Title>

                <DataTable
                    data={employees}
                    columns={columns}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onAdd={handleAdd}
                    searchKeys={['name', 'surname', 'position', 'department', 'email']}
                    title="Сотрудники компании"
                />

                <Modal
                    opened={opened}
                    onClose={() => setOpened(false)}
                    title={
                        <Title order={2} c='white'>
                            {editingEmployee ? 'Редактировать сотрудника' : 'Добавить нового сотрудника'}
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
                            <Group grow>
                                <TextInput
                                    label="Имя"
                                    placeholder="Иван"
                                    required
                                    {...form.getInputProps('name')}
                                    classNames={{
                                        label: classes.inputLabel,
                                        input: classes.inputField,
                                    }}
                                />
                                <TextInput
                                    label="Фамилия"
                                    placeholder="Петров"
                                    required
                                    {...form.getInputProps('surname')}
                                    classNames={{
                                        label: classes.inputLabel,
                                        input: classes.inputField,
                                    }}
                                />
                            </Group>

                            <TextInput
                                label="Отчество"
                                placeholder="Сергеевич"
                                required
                                {...form.getInputProps('middleName')}
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
                                    label="Телефон"
                                    placeholder="+7 (XXX) XXX-XXXX"
                                    required
                                    {...form.getInputProps('phone')}
                                    classNames={{
                                        label: classes.inputLabel,
                                        input: classes.inputField,
                                    }}
                                />
                                <TextInput
                                    label="Email"
                                    placeholder="employee@forestbar.ru"
                                    required
                                    {...form.getInputProps('email')}
                                    classNames={{
                                        label: classes.inputLabel,
                                        input: classes.inputField,
                                    }}
                                />
                            </Group>

                            <Group grow>
                                <TextInput
                                    label="Должность"
                                    placeholder="Менеджер"
                                    required
                                    {...form.getInputProps('position')}
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

                            <Group grow>
                                <TextInput
                                    label="Дата найма"
                                    placeholder="YYYY-MM-DD"
                                    required
                                    {...form.getInputProps('hireDate')}
                                    classNames={{
                                        label: classes.inputLabel,
                                        input: classes.inputField,
                                    }}
                                />
                                <NumberInput
                                    label="Зарплата (₽)"
                                    placeholder="100000"
                                    min={0}
                                    {...form.getInputProps('salary')}
                                    classNames={{
                                        label: classes.inputLabel,
                                        input: classes.inputField,
                                    }}
                                />
                            </Group>

                            <Select
                                label="Статус"
                                placeholder="Выберите статус"
                                required
                                data={[
                                    { value: 'active', label: 'Активный' },
                                    { value: 'inactive', label: 'Неактивный' },
                                    { value: 'vacation', label: 'В отпуске' },
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

                            <TextInput
                                label="URL изображения (необязательно)"
                                placeholder="https://..."
                                {...form.getInputProps('image_url')}
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
                                    {editingEmployee ? 'Обновить' : 'Создать'}
                                </Button>
                            </Group>
                        </Stack>
                    </form>
                </Modal>
            </Stack>
        </Container>
    );
}

