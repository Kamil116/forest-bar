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
import classes from './ProductsManagement.module.css';

export default function ProductsManagement() {
    const theme = useMantineTheme();
    const [products, setProducts] = useState<Product[]>(mockProducts); // TODO: replace mock data to database's data
    const [opened, setOpened] = useState(false); // for adding view
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
            name: (value) => (value.length < 2 ? 'Название должно содержать минимум 2 символа' : null),
            price: (value) => (value <= 0 ? 'Цена должна быть больше 0' : null),
            short_description: (value) =>
                value.length < 10 ? 'Краткое описание должно содержать минимум 10 символов' : null,
            long_description: (value) =>
                value.length < 20 ? 'Полное описание должно содержать минимум 20 символов' : null,
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
        if (confirm(`Вы уверены, что хотите удалить "${product.name}"?`)) {
            setProducts(products.filter((p) => p.id !== product.id));
            notifications.show({
                title: 'Товар удален',
                message: `${product.name} был удален`,
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
                title: 'Товар обновлен',
                message: `${values.name} был успешно обновлен`,
                color: 'green',
            });
        } else {
            // Add new product
            const newProduct: Product = {
                ...values,
                id: Math.max(...products.map((p) => p.id)) + 1, // Take maximum ID and add 1 for the new one
            };
            setProducts([...products, newProduct]);
            notifications.show({
                title: 'Товар добавлен',
                message: `${values.name} был успешно добавлен`,
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
            label: 'Изображение',
            render: (value) => (
                <Image src={value} alt="Product" h={50} w={50} radius="md" fit="cover" />
            ),
        },
        {
            key: 'name',
            label: 'Название',
            sortable: true,
        },
        {
            key: 'price',
            label: 'Цена',
            sortable: true,
            render: (value) => `₽${value}`,
        },
        {
            key: 'short_description',
            label: 'Описание',
            render: (value) => (
                <span className={classes.descriptionText}>
                    {value}
                </span>
            ),
        },
        {
            key: 'seller_id',
            label: 'ID продавца',
            sortable: true,
            render: (value) => <Badge color={theme.other.customYellow}>{value}</Badge>,
        },
    ];

    return (
        <Container size="xl" className={classes.container}>
            <Stack gap="xl">
                <Title order={1} className={classes.title}>
                    Управление товарами
                </Title>

                <DataTable
                    data={products}
                    columns={columns}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onAdd={handleAdd}
                    searchKeys={['name', 'short_description', 'long_description']}
                    title="Каталог товаров"
                />

                <Modal
                    opened={opened}
                    onClose={() => setOpened(false)}
                    title={
                        <Title order={2} c='white'>
                            {editingProduct ? 'Редактировать товар' : 'Добавить новый товар'}
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
                    {/* Form of the modal */}
                    <form onSubmit={form.onSubmit(handleSubmit)}>
                        <Stack gap="md">
                            <TextInput
                                label="Название товара"
                                placeholder="Введите название товара"
                                required
                                {...form.getInputProps('name')}
                                classNames={{
                                    label: classes.inputLabel,
                                    input: classes.inputField,
                                }}
                            />

                            <NumberInput
                                label="Цена (₽)"
                                placeholder="Введите цену"
                                required
                                min={0}
                                {...form.getInputProps('price')}
                                classNames={{
                                    label: classes.inputLabel,
                                    input: classes.inputField,
                                }}
                            />

                            <TextInput
                                label="Краткое описание"
                                placeholder="Введите краткое описание"
                                required
                                {...form.getInputProps('short_description')}
                                classNames={{
                                    label: classes.inputLabel,
                                    input: classes.inputField,
                                }}
                            />

                            <Textarea
                                label="Полное описание"
                                placeholder="Введите подробное описание"
                                required
                                minRows={3}
                                {...form.getInputProps('long_description')}
                                classNames={{
                                    label: classes.inputLabel,
                                    input: classes.inputField,
                                }}
                            />

                            <TextInput
                                label="URL изображения"
                                placeholder="Введите URL изображения"
                                required
                                {...form.getInputProps('image_url')}
                                classNames={{
                                    label: classes.inputLabel,
                                    input: classes.inputField,
                                }}
                            />

                            <TextInput
                                label="URL видео (необязательно)"
                                placeholder="Введите URL видео"
                                {...form.getInputProps('video_url')}
                                classNames={{
                                    label: classes.inputLabel,
                                    input: classes.inputField,
                                }}
                            />

                            <NumberInput
                                label="ID продавца"
                                placeholder="Введите ID продавца"
                                required
                                min={1}
                                {...form.getInputProps('seller_id')}
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
                                    {editingProduct ? 'Обновить' : 'Создать'}
                                </Button>
                            </Group>
                        </Stack>
                    </form>
                </Modal>
            </Stack>
        </Container>
    );
}

