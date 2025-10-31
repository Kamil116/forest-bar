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
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';
import DataTable, { Column } from '@/components/Admin/DataTable';
import { Vendor } from '@/types/vendor';
import { mockVendors } from '@/data/mockVendors';
import classes from './VendorsManagement.module.css';

export default function VendorsManagement() {
    const theme = useMantineTheme();
    const [vendors, setVendors] = useState<Vendor[]>(mockVendors);
    const [opened, setOpened] = useState(false);
    const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);

    const form = useForm<Omit<Vendor, 'id'>>({
        initialValues: {
            title: '',
            name: '',
            middleName: '',
            surname: '',
            address: '',
            phone: '',
            email: '',
            coords: [0, 0],
            description: '',
        },
        validate: {
            title: (value) => (value.length < 3 ? 'Название должно содержать минимум 3 символа' : null),
            name: (value) => (value.length < 2 ? 'Имя должно содержать минимум 2 символа' : null),
            middleName: (value) => (value.length < 2 ? 'Отчество должно содержать минимум 2 символа' : null),
            surname: (value) => (value.length < 2 ? 'Фамилия должна содержать минимум 2 символа' : null),
            address: (value) => (value.length < 10 ? 'Адрес должен содержать минимум 10 символов' : null),
            phone: (value) => (value.length < 10 ? 'Телефон должен быть действительным' : null),
            email: (value) => (/^\S+@\S+$/.test(value || '') || !value ? null : 'Неверный email'),
        },
    });

    const handleAdd = () => {
        setEditingVendor(null);
        form.reset();
        setOpened(true);
    };

    const handleEdit = (vendor: Vendor) => {
        setEditingVendor(vendor);
        form.setValues({
            title: vendor.title,
            name: vendor.name,
            middleName: vendor.middleName,
            surname: vendor.surname,
            address: vendor.address,
            phone: vendor.phone,
            email: vendor.email || '',
            coords: vendor.coords,
            description: vendor.description || '',
        });
        setOpened(true);
    };

    const handleDelete = (vendor: Vendor) => {
        modals.openConfirmModal({
            title: 'Удалить поставщика',
            children: `Вы уверены, что хотите удалить "${vendor.title}"?`,
            labels: { confirm: 'Удалить', cancel: 'Отмена' },
            confirmProps: { color: 'red', size: 'lg' },
            cancelProps: { size: 'lg' },
            styles: {
                title: { fontSize: '24px', fontWeight: 700 },
                body: { fontSize: '18px' },
            },
            onConfirm: () => {
                setVendors(vendors.filter((v) => v.id !== vendor.id));
                notifications.show({
                    title: 'Поставщик удален',
                    message: `${vendor.title} был удален`,
                    color: 'red',
                });
            },
        });
    };

    const handleSubmit = (values: Omit<Vendor, 'id'>) => {
        if (editingVendor) {
            setVendors(
                vendors.map((v) =>
                    v.id === editingVendor.id ? { ...values, id: editingVendor.id } : v
                )
            );
            notifications.show({
                title: 'Поставщик обновлен',
                message: `${values.title} был успешно обновлен`,
                color: 'green',
            });
        } else {
            const newVendor: Vendor = {
                ...values,
                id: Math.max(...vendors.map((v) => v.id)) + 1,
            };
            setVendors([...vendors, newVendor]);
            notifications.show({
                title: 'Поставщик добавлен',
                message: `${values.title} был успешно добавлен`,
                color: 'green',
            });
        }
        setOpened(false);
        form.reset();
    };

    const columns: Column<Vendor>[] = [
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
            key: 'surname',
            label: 'Представитель',
            sortable: true,
            render: (_value, row) => `${row.surname} ${row.name} ${row.middleName}`,
        },
        {
            key: 'address',
            label: 'Адрес',
            render: (value) => (
                <span className={classes.descriptionText}>
                    {value}
                </span>
            ),
        },
        {
            key: 'phone',
            label: 'Телефон',
        },
        {
            key: 'email',
            label: 'Email',
            render: (value) => value || <Badge color="gray">Н/Д</Badge>,
        },
        {
            key: 'coords',
            label: 'Местоположение',
            render: (value: [number, number]) => (
                <Badge color={theme.other.customYellow}>
                    {value[0].toFixed(2)}, {value[1].toFixed(2)}
                </Badge>
            ),
        },
    ];

    return (
        <Container size="xl" className={classes.container}>
            <Stack gap="xl">
                <Title order={1} className={classes.title}>
                    Управление поставщиками
                </Title>

                <DataTable
                    data={vendors}
                    columns={columns}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onAdd={handleAdd}
                    searchKeys={['title', 'name', 'surname', 'middleName', 'address', 'phone', 'email']}
                    title="Партнеры-поставщики"
                />

                <Modal
                    opened={opened}
                    onClose={() => setOpened(false)}
                    title={
                        <Title order={2} c='white'>
                            {editingVendor ? 'Редактировать поставщика' : 'Добавить нового поставщика'}
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
                                label="Название поставщика"
                                placeholder="Введите название поставщика"
                                required
                                {...form.getInputProps('title')}
                                classNames={{
                                    label: classes.inputLabel,
                                    input: classes.inputField,
                                }}
                            />

                            <TextInput
                                label="Имя представителя"
                                placeholder="Введите имя"
                                required
                                {...form.getInputProps('name')}
                                classNames={{
                                    label: classes.inputLabel,
                                    input: classes.inputField,
                                }}
                            />

                            <TextInput
                                label="Отчество представителя"
                                placeholder="Введите отчество"
                                required
                                {...form.getInputProps('middleName')}
                                classNames={{
                                    label: classes.inputLabel,
                                    input: classes.inputField,
                                }}
                            />

                            <TextInput
                                label="Фамилия представителя"
                                placeholder="Введите фамилию"
                                required
                                {...form.getInputProps('surname')}
                                classNames={{
                                    label: classes.inputLabel,
                                    input: classes.inputField,
                                }}
                            />

                            <Textarea
                                label="Адрес"
                                placeholder="Введите полный адрес"
                                required
                                minRows={2}
                                {...form.getInputProps('address')}
                                classNames={{
                                    label: classes.inputLabel,
                                    input: classes.inputField,
                                }}
                            />

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
                                label="Email (необязательно)"
                                placeholder="vendor@example.com"
                                {...form.getInputProps('email')}
                                classNames={{
                                    label: classes.inputLabel,
                                    input: classes.inputField,
                                }}
                            />

                            <Group grow>
                                <NumberInput
                                    label="Широта"
                                    placeholder="55.7558"
                                    required
                                    decimalScale={4}
                                    step={0.0001}
                                    value={form.values.coords[0]}
                                    onChange={(value) =>
                                        form.setFieldValue('coords', [Number(value), form.values.coords[1]])
                                    }
                                    classNames={{
                                        label: classes.inputLabel,
                                        input: classes.inputField,
                                    }}
                                />
                                <NumberInput
                                    label="Долгота"
                                    placeholder="37.6176"
                                    required
                                    decimalScale={4}
                                    step={0.0001}
                                    value={form.values.coords[1]}
                                    onChange={(value) =>
                                        form.setFieldValue('coords', [form.values.coords[0], Number(value)])
                                    }
                                    classNames={{
                                        label: classes.inputLabel,
                                        input: classes.inputField,
                                    }}
                                />
                            </Group>

                            <Textarea
                                label="Описание (необязательно)"
                                placeholder="Введите описание поставщика"
                                minRows={2}
                                {...form.getInputProps('description')}
                                classNames={{
                                    label: classes.inputLabel,
                                    input: classes.inputField,
                                }}
                            />

                            <Group className={classes.buttonGroup}>
                                <Button variant="outline" onClick={() => setOpened(false)}>
                                    Отмена
                                </Button>
                                <Button type="submit" color={theme.other.customOrange}>
                                    {editingVendor ? 'Обновить' : 'Создать'}
                                </Button>
                            </Group>
                        </Stack>
                    </form>
                </Modal>
            </Stack>
        </Container>
    );
}

