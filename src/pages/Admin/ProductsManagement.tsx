import { useState } from 'react';
import {
    Container,
    Title,
    Modal,
    TextInput,
    NumberInput,
    Textarea,
    Button,
    Group,
    Stack,
    Image,
    Badge,
    useMantineTheme,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import DataTable, { Column } from '@/components/Admin/DataTable';
import { Product } from '@/types/product';
import { mockProducts } from '@/data/mockProducts';

export default function ProductsManagement() {
    const theme = useMantineTheme();
    const [products, setProducts] = useState<Product[]>(mockProducts);
    const [opened, setOpened] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const form = useForm<Omit<Product, 'id'>>({
        initialValues: {
            name: '',
            price: 0,
            short_description: '',
            long_description: '',
            image_url: '',
            video_url: '',
            seller_id: 1,
        },
        validate: {
            name: (value) => (value.length < 2 ? 'Name must be at least 2 characters' : null),
            price: (value) => (value <= 0 ? 'Price must be greater than 0' : null),
            short_description: (value) =>
                value.length < 10 ? 'Short description must be at least 10 characters' : null,
            long_description: (value) =>
                value.length < 20 ? 'Long description must be at least 20 characters' : null,
        },
    });

    const handleAdd = () => {
        setEditingProduct(null);
        form.reset();
        setOpened(true);
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        form.setValues({
            name: product.name,
            price: product.price,
            short_description: product.short_description,
            long_description: product.long_description,
            image_url: product.image_url,
            video_url: product.video_url || '',
            seller_id: product.seller_id,
        });
        setOpened(true);
    };

    const handleDelete = (product: Product) => {
        if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
            setProducts(products.filter((p) => p.id !== product.id));
            notifications.show({
                title: 'Product deleted',
                message: `${product.name} has been removed`,
                color: 'red',
            });
        }
    };

    const handleSubmit = (values: Omit<Product, 'id'>) => {
        if (editingProduct) {
            // Update existing product
            setProducts(
                products.map((p) =>
                    p.id === editingProduct.id ? { ...values, id: editingProduct.id } : p
                )
            );
            notifications.show({
                title: 'Product updated',
                message: `${values.name} has been updated successfully`,
                color: 'green',
            });
        } else {
            // Add new product
            const newProduct: Product = {
                ...values,
                id: Math.max(...products.map((p) => p.id)) + 1,
            };
            setProducts([...products, newProduct]);
            notifications.show({
                title: 'Product added',
                message: `${values.name} has been added successfully`,
                color: 'green',
            });
        }
        setOpened(false);
        form.reset();
    };

    const columns: Column<Product>[] = [
        {
            key: 'id',
            label: 'ID',
            sortable: true,
        },
        {
            key: 'image_url',
            label: 'Image',
            render: (value) => (
                <Image src={value} alt="Product" h={50} w={50} radius="md" fit="cover" />
            ),
        },
        {
            key: 'name',
            label: 'Name',
            sortable: true,
        },
        {
            key: 'price',
            label: 'Price',
            sortable: true,
            render: (value) => `₽${value}`,
        },
        {
            key: 'short_description',
            label: 'Description',
            render: (value) => (
                <span style={{ maxWidth: '200px', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {value}
                </span>
            ),
        },
        {
            key: 'seller_id',
            label: 'Seller ID',
            sortable: true,
            render: (value) => <Badge color={theme.other.customYellow}>{value}</Badge>,
        },
    ];

    return (
        <Container size="xl" p="xl">
            <Stack gap="xl">
                <Title order={1} c="white" fw={700} size="42px">
                    Products Management
                </Title>

                <DataTable
                    data={products}
                    columns={columns}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onAdd={handleAdd}
                    searchKeys={['name', 'short_description', 'long_description']}
                    title="Products Catalog"
                />

                <Modal
                    opened={opened}
                    onClose={() => setOpened(false)}
                    title={
                        <Title order={3} c="white">
                            {editingProduct ? 'Edit Product' : 'Add New Product'}
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
                                label="Product Name"
                                placeholder="Enter product name"
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

                            <NumberInput
                                label="Price (₽)"
                                placeholder="Enter price"
                                required
                                min={0}
                                {...form.getInputProps('price')}
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
                                label="Short Description"
                                placeholder="Enter short description"
                                required
                                {...form.getInputProps('short_description')}
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
                                label="Long Description"
                                placeholder="Enter detailed description"
                                required
                                minRows={3}
                                {...form.getInputProps('long_description')}
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
                                label="Image URL"
                                placeholder="Enter image URL"
                                required
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

                            <TextInput
                                label="Video URL (Optional)"
                                placeholder="Enter video URL"
                                {...form.getInputProps('video_url')}
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
                                label="Seller ID"
                                placeholder="Enter seller ID"
                                required
                                min={1}
                                {...form.getInputProps('seller_id')}
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
                                    {editingProduct ? 'Update' : 'Create'}
                                </Button>
                            </Group>
                        </Stack>
                    </form>
                </Modal>
            </Stack>
        </Container>
    );
}

