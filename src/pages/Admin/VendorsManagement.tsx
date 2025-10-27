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
import DataTable, { Column } from '@/components/Admin/DataTable';
import { Vendor } from '@/types/vendor';
import { mockVendors } from '@/data/mockVendors';

export default function VendorsManagement() {
    const theme = useMantineTheme();
    const [vendors, setVendors] = useState<Vendor[]>(mockVendors);
    const [opened, setOpened] = useState(false);
    const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);

    const form = useForm<Omit<Vendor, 'id'>>({
        initialValues: {
            title: '',
            address: '',
            phone: '',
            email: '',
            coords: [0, 0],
            description: '',
        },
        validate: {
            title: (value) => (value.length < 3 ? 'Title must be at least 3 characters' : null),
            address: (value) => (value.length < 10 ? 'Address must be at least 10 characters' : null),
            phone: (value) => (value.length < 10 ? 'Phone must be valid' : null),
            email: (value) => (/^\S+@\S+$/.test(value || '') || !value ? null : 'Invalid email'),
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
            address: vendor.address,
            phone: vendor.phone,
            email: vendor.email || '',
            coords: vendor.coords,
            description: vendor.description || '',
        });
        setOpened(true);
    };

    const handleDelete = (vendor: Vendor) => {
        if (window.confirm(`Are you sure you want to delete "${vendor.title}"?`)) {
            setVendors(vendors.filter((v) => v.id !== vendor.id));
            notifications.show({
                title: 'Vendor deleted',
                message: `${vendor.title} has been removed`,
                color: 'red',
            });
        }
    };

    const handleSubmit = (values: Omit<Vendor, 'id'>) => {
        if (editingVendor) {
            setVendors(
                vendors.map((v) =>
                    v.id === editingVendor.id ? { ...values, id: editingVendor.id } : v
                )
            );
            notifications.show({
                title: 'Vendor updated',
                message: `${values.title} has been updated successfully`,
                color: 'green',
            });
        } else {
            const newVendor: Vendor = {
                ...values,
                id: Math.max(...vendors.map((v) => v.id)) + 1,
            };
            setVendors([...vendors, newVendor]);
            notifications.show({
                title: 'Vendor added',
                message: `${values.title} has been added successfully`,
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
            label: 'Title',
            sortable: true,
        },
        {
            key: 'address',
            label: 'Address',
            render: (value) => (
                <span style={{ maxWidth: '200px', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {value}
                </span>
            ),
        },
        {
            key: 'phone',
            label: 'Phone',
        },
        {
            key: 'email',
            label: 'Email',
            render: (value) => value || <Badge color="gray">N/A</Badge>,
        },
        {
            key: 'coords',
            label: 'Location',
            render: (value: [number, number]) => (
                <Badge color={theme.other.customYellow}>
                    {value[0].toFixed(2)}, {value[1].toFixed(2)}
                </Badge>
            ),
        },
    ];

    return (
        <Container size="xl" p="xl">
            <Stack gap="xl">
                <Title order={1} c="white" fw={700} size="42px">
                    Vendors Management
                </Title>

                <DataTable
                    data={vendors}
                    columns={columns}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onAdd={handleAdd}
                    searchKeys={['title', 'address', 'phone', 'email']}
                    title="Partner Vendors"
                />

                <Modal
                    opened={opened}
                    onClose={() => setOpened(false)}
                    title={
                        <Title order={3} c="white">
                            {editingVendor ? 'Edit Vendor' : 'Add New Vendor'}
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
                                label="Vendor Title"
                                placeholder="Enter vendor name"
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

                            <Textarea
                                label="Address"
                                placeholder="Enter full address"
                                required
                                minRows={2}
                                {...form.getInputProps('address')}
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
                                label="Email (Optional)"
                                placeholder="vendor@example.com"
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

                            <Group grow>
                                <NumberInput
                                    label="Latitude"
                                    placeholder="55.7558"
                                    required
                                    decimalScale={4}
                                    step={0.0001}
                                    value={form.values.coords[0]}
                                    onChange={(value) =>
                                        form.setFieldValue('coords', [Number(value), form.values.coords[1]])
                                    }
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
                                    label="Longitude"
                                    placeholder="37.6176"
                                    required
                                    decimalScale={4}
                                    step={0.0001}
                                    value={form.values.coords[1]}
                                    onChange={(value) =>
                                        form.setFieldValue('coords', [form.values.coords[0], Number(value)])
                                    }
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
                                label="Description (Optional)"
                                placeholder="Enter vendor description"
                                minRows={2}
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

                            <Group justify="flex-end" mt="md">
                                <Button variant="outline" onClick={() => setOpened(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" color={theme.other.customOrange}>
                                    {editingVendor ? 'Update' : 'Create'}
                                </Button>
                            </Group>
                        </Stack>
                    </form>
                </Modal>
            </Stack>
        </Container>
    );
}

