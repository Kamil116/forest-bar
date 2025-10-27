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
import { DateInput } from '@mantine/dates';
import DataTable, { Column } from '@/components/Admin/DataTable';
import { Employee } from '@/types/employee';
import { mockEmployees } from '@/data/mockEmployees';

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
            name: (value) => (value.length < 2 ? 'Name must be at least 2 characters' : null),
            surname: (value) => (value.length < 2 ? 'Surname must be at least 2 characters' : null),
            phone: (value) => (value.length < 10 ? 'Phone must be valid' : null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            position: (value) => (value.length < 3 ? 'Position must be at least 3 characters' : null),
            department: (value) => (value.length < 3 ? 'Department must be at least 3 characters' : null),
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
        if (window.confirm(`Are you sure you want to delete "${employee.name} ${employee.surname}"?`)) {
            setEmployees(employees.filter((e) => e.id !== employee.id));
            notifications.show({
                title: 'Employee deleted',
                message: `${employee.name} ${employee.surname} has been removed`,
                color: 'red',
            });
        }
    };

    const handleSubmit = (values: Omit<Employee, 'id'>) => {
        if (editingEmployee) {
            setEmployees(
                employees.map((e) =>
                    e.id === editingEmployee.id ? { ...values, id: editingEmployee.id } : e
                )
            );
            notifications.show({
                title: 'Employee updated',
                message: `${values.name} ${values.surname} has been updated successfully`,
                color: 'green',
            });
        } else {
            const newEmployee: Employee = {
                ...values,
                id: Math.max(...employees.map((e) => e.id)) + 1,
            };
            setEmployees([...employees, newEmployee]);
            notifications.show({
                title: 'Employee added',
                message: `${values.name} ${values.surname} has been added successfully`,
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
            label: 'Full Name',
            sortable: true,
            render: (value, row) => `${row.surname} ${row.name} ${row.middleName}`,
        },
        {
            key: 'position',
            label: 'Position',
            sortable: true,
        },
        {
            key: 'department',
            label: 'Department',
            sortable: true,
            render: (value) => <Badge color={theme.other.customYellow}>{value}</Badge>,
        },
        {
            key: 'phone',
            label: 'Phone',
        },
        {
            key: 'email',
            label: 'Email',
            render: (value) => (
                <span style={{ maxWidth: '180px', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {value}
                </span>
            ),
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
            key: 'salary',
            label: 'Salary',
            sortable: true,
            render: (value) => (value ? `₽${value.toLocaleString()}` : 'N/A'),
        },
    ];

    return (
        <Container size="xl" p="xl">
            <Stack gap="xl">
                <Title order={1} c="white" fw={700} size="42px">
                    Employees Management
                </Title>

                <DataTable
                    data={employees}
                    columns={columns}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onAdd={handleAdd}
                    searchKeys={['name', 'surname', 'position', 'department', 'email']}
                    title="Company Employees"
                />

                <Modal
                    opened={opened}
                    onClose={() => setOpened(false)}
                    title={
                        <Title order={3} c="white">
                            {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
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
                            <Group grow>
                                <TextInput
                                    label="Name"
                                    placeholder="Иван"
                                    required
                                    {...form.getInputProps('name')}
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
                                    label="Surname"
                                    placeholder="Петров"
                                    required
                                    {...form.getInputProps('surname')}
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
                                label="Middle Name"
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
                                    label="Phone"
                                    placeholder="+7 (XXX) XXX-XXXX"
                                    required
                                    {...form.getInputProps('phone')}
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
                                    label="Email"
                                    placeholder="employee@forestbar.ru"
                                    required
                                    {...form.getInputProps('email')}
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
                                <TextInput
                                    label="Position"
                                    placeholder="Manager"
                                    required
                                    {...form.getInputProps('position')}
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

                            <Group grow>
                                <TextInput
                                    label="Hire Date"
                                    placeholder="YYYY-MM-DD"
                                    required
                                    {...form.getInputProps('hireDate')}
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
                                    label="Salary (₽)"
                                    placeholder="100000"
                                    min={0}
                                    {...form.getInputProps('salary')}
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

                            <Select
                                label="Status"
                                placeholder="Select status"
                                required
                                data={[
                                    { value: 'active', label: 'Active' },
                                    { value: 'inactive', label: 'Inactive' },
                                    { value: 'vacation', label: 'On Vacation' },
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
                                label="Image URL (Optional)"
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

                            <Group justify="flex-end" mt="md">
                                <Button variant="outline" onClick={() => setOpened(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" color={theme.other.customOrange}>
                                    {editingEmployee ? 'Update' : 'Create'}
                                </Button>
                            </Group>
                        </Stack>
                    </form>
                </Modal>
            </Stack>
        </Container>
    );
}

