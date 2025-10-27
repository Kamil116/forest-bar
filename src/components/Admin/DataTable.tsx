import { useState } from 'react';
import {
    Table,
    ScrollArea,
    TextInput,
    Button,
    Group,
    ActionIcon,
    Pagination,
    Select,
    Paper,
    Text,
    Stack,
    useMantineTheme,
    Flex,
    Badge,
} from '@mantine/core';
import { IconSearch, IconEdit, IconTrash, IconPlus } from '@tabler/icons-react';

export interface Column<T> {
    key: keyof T | string;
    label: string;
    sortable?: boolean;
    render?: (value: any, row: T) => React.ReactNode;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    onEdit: (row: T) => void;
    onDelete: (row: T) => void;
    onAdd: () => void;
    searchKeys?: (keyof T)[];
    title: string;
    itemsPerPageOptions?: number[];
}

export default function DataTable<T extends { id: number }>({
    data,
    columns,
    onEdit,
    onDelete,
    onAdd,
    searchKeys = [],
    title,
    itemsPerPageOptions = [10, 25, 50, 100],
}: DataTableProps<T>) {
    const theme = useMantineTheme();
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);
    const [sortBy, setSortBy] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    // Filter data based on search
    const filteredData = data.filter((item) => {
        if (!search) return true;
        return searchKeys.some((key) => {
            const value = item[key];
            if (value === null || value === undefined) return false;
            return String(value).toLowerCase().includes(search.toLowerCase());
        });
    });

    // Sort data
    const sortedData = [...filteredData].sort((a, b) => {
        if (!sortBy) return 0;
        
        const aValue = a[sortBy as keyof T];
        const bValue = b[sortBy as keyof T];
        
        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return sortOrder === 'asc' 
                ? aValue.localeCompare(bValue) 
                : bValue.localeCompare(aValue);
        }
        
        if (typeof aValue === 'number' && typeof bValue === 'number') {
            return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        }
        
        return 0;
    });

    // Paginate data
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = sortedData.slice(startIndex, endIndex);
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);

    const handleSort = (columnKey: string) => {
        if (sortBy === columnKey) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(columnKey);
            setSortOrder('asc');
        }
    };

    return (
        <Stack gap="md">
            <Paper p="lg" radius={theme.other.cardRadius} bg={theme.other.darkBackground}>
                <Flex
                    direction={{ base: 'column', sm: 'row' }}
                    gap="md"
                    justify="space-between"
                    align={{ base: 'stretch', sm: 'center' }}
                >
                    <TextInput
                        placeholder="Search..."
                        leftSection={<IconSearch size={16} />}
                        value={search}
                        onChange={(e) => {
                            setSearch(e.currentTarget.value);
                            setPage(1);
                        }}
                        style={{ flex: 1, maxWidth: '400px' }}
                        styles={{
                            input: {
                                backgroundColor: theme.other.cardBackground,
                                color: 'white',
                                borderColor: theme.other.customYellow,
                                '&:focus': {
                                    borderColor: theme.other.customOrange,
                                },
                            },
                        }}
                    />
                    <Group gap="sm">
                        <Select
                            value={String(itemsPerPage)}
                            onChange={(value) => {
                                setItemsPerPage(Number(value));
                                setPage(1);
                            }}
                            data={itemsPerPageOptions.map(option => ({
                                value: String(option),
                                label: `${option} per page`,
                            }))}
                            styles={{
                                input: {
                                    backgroundColor: theme.other.cardBackground,
                                    color: 'white',
                                    borderColor: theme.other.customYellow,
                                },
                            }}
                        />
                        <Button
                            leftSection={<IconPlus size={16} />}
                            color={theme.other.customOrange}
                            onClick={onAdd}
                        >
                            Add New
                        </Button>
                    </Group>
                </Flex>
            </Paper>

            <Paper p="lg" radius={theme.other.cardRadius} bg={theme.other.darkBackground}>
                <Stack gap="md">
                    <Group justify="space-between">
                        <Text size="lg" fw={700} c="white">
                            {title}
                        </Text>
                        <Badge color={theme.other.customYellow} size="lg">
                            {filteredData.length} total
                        </Badge>
                    </Group>

                    <ScrollArea>
                        <Table
                            striped
                            highlightOnHover
                            styles={{
                                th: {
                                    backgroundColor: theme.other.cardBackground,
                                    color: theme.other.customYellow,
                                    fontWeight: 700,
                                    fontSize: '14px',
                                    textTransform: 'uppercase',
                                    padding: '16px',
                                },
                                td: {
                                    color: 'white',
                                    padding: '12px 16px',
                                },
                                tr: {
                                    '&:hover': {
                                        backgroundColor: theme.other.cardBackground,
                                    },
                                },
                            }}
                        >
                            <Table.Thead>
                                <Table.Tr>
                                    {columns.map((column) => (
                                        <Table.Th
                                            key={String(column.key)}
                                            style={{
                                                cursor: column.sortable ? 'pointer' : 'default',
                                            }}
                                            onClick={() => column.sortable && handleSort(String(column.key))}
                                        >
                                            <Group gap={4}>
                                                {column.label}
                                                {column.sortable && sortBy === column.key && (
                                                    <Text size="xs">
                                                        {sortOrder === 'asc' ? '↑' : '↓'}
                                                    </Text>
                                                )}
                                            </Group>
                                        </Table.Th>
                                    ))}
                                    <Table.Th style={{ width: '120px' }}>Actions</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {paginatedData.length === 0 ? (
                                    <Table.Tr>
                                        <Table.Td colSpan={columns.length + 1}>
                                            <Text ta="center" c="dimmed" py="xl">
                                                No data found
                                            </Text>
                                        </Table.Td>
                                    </Table.Tr>
                                ) : (
                                    paginatedData.map((row) => (
                                        <Table.Tr key={row.id}>
                                            {columns.map((column) => {
                                                const value = row[column.key as keyof T];
                                                return (
                                                    <Table.Td key={String(column.key)}>
                                                        {column.render 
                                                            ? column.render(value, row) 
                                                            : String(value ?? '')}
                                                    </Table.Td>
                                                );
                                            })}
                                            <Table.Td>
                                                <Group gap={4}>
                                                    <ActionIcon
                                                        variant="subtle"
                                                        color={theme.other.customYellow}
                                                        onClick={() => onEdit(row)}
                                                    >
                                                        <IconEdit size={18} />
                                                    </ActionIcon>
                                                    <ActionIcon
                                                        variant="subtle"
                                                        color="red"
                                                        onClick={() => onDelete(row)}
                                                    >
                                                        <IconTrash size={18} />
                                                    </ActionIcon>
                                                </Group>
                                            </Table.Td>
                                        </Table.Tr>
                                    ))
                                )}
                            </Table.Tbody>
                        </Table>
                    </ScrollArea>

                    {totalPages > 1 && (
                        <Group justify="center" mt="md">
                            <Pagination
                                value={page}
                                onChange={setPage}
                                total={totalPages}
                                color={theme.other.customYellow}
                                styles={{
                                    control: {
                                        color: 'white',
                                        '&[data-active]': {
                                            backgroundColor: theme.other.customYellow,
                                            color: theme.other.darkBackground,
                                        },
                                    },
                                }}
                            />
                        </Group>
                    )}
                </Stack>
            </Paper>
        </Stack>
    );
}

