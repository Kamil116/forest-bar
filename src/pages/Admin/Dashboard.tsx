import { Container, Title, SimpleGrid, Paper, Text, Group, Stack, useMantineTheme } from '@mantine/core';
import {
    IconShoppingBag,
    IconUsers,
    IconBriefcase,
    IconBuilding,
    IconTrendingUp,
    IconCoin,
} from '@tabler/icons-react';
import { mockProducts } from '@/data/mockProducts';
import { mockVendors } from '@/data/mockVendors';
import { mockEmployees } from '@/data/mockEmployees';
import { mockVacancies } from '@/data/mockVacancies';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
    description?: string;
}

function StatCard({ title, value, icon, color, description }: StatCardProps) {
    const theme = useMantineTheme();

    return (
        <Paper
            p="xl"
            radius={theme.other.cardRadius}
            bg={theme.other.darkBackground}
            style={{
                border: `2px solid ${color}`,
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = `0 8px 16px ${color}40`;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
            }}
        >
            <Group justify="space-between" align="flex-start">
                <Stack gap="xs">
                    <Text size="sm" c="dimmed" tt="uppercase" fw={700}>
                        {title}
                    </Text>
                    <Text size="32px" fw={700} c="white">
                        {value}
                    </Text>
                    {description && (
                        <Text size="xs" c="dimmed">
                            {description}
                        </Text>
                    )}
                </Stack>
                <div style={{ color }}>{icon}</div>
            </Group>
        </Paper>
    );
}

export default function Dashboard() {
    const theme = useMantineTheme();

    // Calculate statistics
    const totalProducts = mockProducts.length;
    const totalVendors = mockVendors.length;
    const totalEmployees = mockEmployees.length;
    const activeEmployees = mockEmployees.filter(e => e.status === 'active').length;
    const totalVacancies = mockVacancies.length;
    const openVacancies = mockVacancies.filter(v => v.status === 'open').length;

    // Calculate average product price
    const averagePrice = Math.round(
        mockProducts.reduce((sum, product) => sum + product.price, 0) / totalProducts
    );

    // Calculate total potential salary expense
    const totalSalaryExpense = mockEmployees.reduce((sum, emp) => sum + (emp.salary || 0), 0);

    return (
        <Container size="xl" p="xl">
            <Stack gap="xl">
                <Group justify="space-between" align="center">
                    <div>
                        <Title order={1} c="white" fw={700} size="42px">
                            Admin Dashboard
                        </Title>
                        <Text c="dimmed" size="lg" mt="xs">
                            Overview of your business metrics
                        </Text>
                    </div>
                </Group>

                <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
                    <StatCard
                        title="Total Products"
                        value={totalProducts}
                        icon={<IconShoppingBag size={40} />}
                        color={theme.other.customOrange}
                        description="Available in catalog"
                    />

                    <StatCard
                        title="Average Price"
                        value={`₽${averagePrice}`}
                        icon={<IconCoin size={40} />}
                        color={theme.other.customYellow}
                        description="Per product"
                    />

                    <StatCard
                        title="Partners"
                        value={totalVendors}
                        icon={<IconBuilding size={40} />}
                        color="#4ECDC4"
                        description="Active vendors"
                    />

                    <StatCard
                        title="Employees"
                        value={`${activeEmployees}/${totalEmployees}`}
                        icon={<IconUsers size={40} />}
                        color="#95E1D3"
                        description="Active staff"
                    />

                    <StatCard
                        title="Open Vacancies"
                        value={`${openVacancies}/${totalVacancies}`}
                        icon={<IconBriefcase size={40} />}
                        color="#F38181"
                        description="Currently hiring"
                    />

                    <StatCard
                        title="Salary Expense"
                        value={`₽${(totalSalaryExpense / 1000).toFixed(0)}K`}
                        icon={<IconTrendingUp size={40} />}
                        color="#AA96DA"
                        description="Monthly total"
                    />
                </SimpleGrid>

                <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="lg">
                    <Paper p="xl" radius={theme.other.cardRadius} bg={theme.other.darkBackground}>
                        <Stack gap="md">
                            <Title order={3} c="white" size="24px">
                                Quick Stats
                            </Title>
                            <Stack gap="sm">
                                <Group justify="space-between">
                                    <Text c="dimmed">Products per vendor (avg)</Text>
                                    <Text c="white" fw={600}>
                                        {(totalProducts / totalVendors).toFixed(1)}
                                    </Text>
                                </Group>
                                <Group justify="space-between">
                                    <Text c="dimmed">Employees per department (avg)</Text>
                                    <Text c="white" fw={600}>
                                        {(totalEmployees / new Set(mockEmployees.map(e => e.department)).size).toFixed(1)}
                                    </Text>
                                </Group>
                                <Group justify="space-between">
                                    <Text c="dimmed">Vacancy fill rate</Text>
                                    <Text c="white" fw={600}>
                                        {((1 - openVacancies / totalVacancies) * 100).toFixed(0)}%
                                    </Text>
                                </Group>
                                <Group justify="space-between">
                                    <Text c="dimmed">Employee activity rate</Text>
                                    <Text c="white" fw={600}>
                                        {((activeEmployees / totalEmployees) * 100).toFixed(0)}%
                                    </Text>
                                </Group>
                            </Stack>
                        </Stack>
                    </Paper>

                    <Paper p="xl" radius={theme.other.cardRadius} bg={theme.other.darkBackground}>
                        <Stack gap="md">
                            <Title order={3} c="white" size="24px">
                                Recent Activity
                            </Title>
                            <Stack gap="sm">
                                <Group>
                                    <IconShoppingBag size={20} color={theme.other.customOrange} />
                                    <Text c="dimmed" size="sm">
                                        {totalProducts} products in catalog
                                    </Text>
                                </Group>
                                <Group>
                                    <IconBuilding size={20} color="#4ECDC4" />
                                    <Text c="dimmed" size="sm">
                                        {totalVendors} active partnerships
                                    </Text>
                                </Group>
                                <Group>
                                    <IconUsers size={20} color="#95E1D3" />
                                    <Text c="dimmed" size="sm">
                                        {mockEmployees.filter(e => e.status === 'vacation').length} employees on vacation
                                    </Text>
                                </Group>
                                <Group>
                                    <IconBriefcase size={20} color="#F38181" />
                                    <Text c="dimmed" size="sm">
                                        {openVacancies} positions actively recruiting
                                    </Text>
                                </Group>
                            </Stack>
                        </Stack>
                    </Paper>
                </SimpleGrid>
            </Stack>
        </Container>
    );
}

