import { AppShell, Burger, Group, Stack, Text, NavLink, useMantineTheme, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    IconDashboard,
    IconShoppingBag,
    IconUsers,
    IconBriefcase,
    IconBuilding,
    IconLogout,
    IconHome,
} from '@tabler/icons-react';

export default function AdminLayout() {
    const [opened, { toggle }] = useDisclosure();
    const theme = useMantineTheme();
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { label: 'Dashboard', icon: IconDashboard, path: '/admin' },
        { label: 'Products', icon: IconShoppingBag, path: '/admin/products' },
        { label: 'Vendors', icon: IconBuilding, path: '/admin/vendors' },
        { label: 'Employees', icon: IconUsers, path: '/admin/employees' },
        { label: 'Vacancies', icon: IconBriefcase, path: '/admin/vacancies' },
    ];

    return (
        <AppShell
            header={{ height: 70 }}
            navbar={{ width: 280, breakpoint: 'sm', collapsed: { mobile: !opened } }}
            padding="md"
            styles={{
                main: {
                    backgroundColor: theme.other.cardBackground,
                    minHeight: '100vh',
                },
                navbar: {
                    backgroundColor: theme.other.darkBackground,
                },
                header: {
                    backgroundColor: theme.other.darkBackground,
                    borderBottom: `2px solid ${theme.other.customYellow}`,
                },
            }}
        >
            <AppShell.Header>
                <Group h="100%" px="md" justify="space-between">
                    <Group>
                        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" color="white" />
                        <Text size="xl" fw={700} c={theme.other.customYellow} tt="uppercase">
                            Forest Bar Admin
                        </Text>
                    </Group>
                    <Group>
                        <NavLink
                            label="Go to Site"
                            leftSection={<IconHome size={20} />}
                            onClick={() => navigate('/')}
                            styles={{
                                root: {
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: theme.other.cardBackground,
                                    },
                                },
                            }}
                        />
                    </Group>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p="md">
                <AppShell.Section grow component={ScrollArea}>
                    <Stack gap="xs">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                label={item.label}
                                leftSection={<item.icon size={20} />}
                                active={location.pathname === item.path}
                                onClick={() => navigate(item.path)}
                                styles={{
                                    root: {
                                        borderRadius: theme.radius.md,
                                        color: 'white',
                                        fontWeight: 500,
                                        '&:hover': {
                                            backgroundColor: theme.other.cardBackground,
                                        },
                                        '&[data-active]': {
                                            backgroundColor: theme.other.customYellow,
                                            color: theme.other.darkBackground,
                                            '&:hover': {
                                                backgroundColor: theme.other.customYellow,
                                            },
                                        },
                                    },
                                }}
                            />
                        ))}
                    </Stack>
                </AppShell.Section>

                <AppShell.Section>
                    <NavLink
                        label="Logout"
                        leftSection={<IconLogout size={20} />}
                        onClick={() => {
                            // TODO: Add logout logic
                            navigate('/login');
                        }}
                        styles={{
                            root: {
                                borderRadius: theme.radius.md,
                                color: theme.colors.red[5],
                                fontWeight: 500,
                                '&:hover': {
                                    backgroundColor: theme.other.cardBackground,
                                },
                            },
                        }}
                    />
                </AppShell.Section>
            </AppShell.Navbar>

            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
}

