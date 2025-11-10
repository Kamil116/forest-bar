import { useState } from 'react';
import {
    Box,
    Text,
    Stack,
    ScrollArea,
    Card,
    useMantineTheme,
    Divider,
    Group,
} from '@mantine/core';
import classes from './VendorsPage.module.css';
import { IconMapPin } from '@tabler/icons-react';
import { mockVendors } from '@/data/mockVendors';
import { Vendor } from '@/types/vendor';

export default function VendorsPage() {
    const theme = useMantineTheme();
    const [selected, setSelected] = useState<Vendor | null>(null);
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    const markers = mockVendors
        .filter((v): v is Vendor & { coords: [number, number] } => 
            v.coords !== null && v.coords !== undefined
        )
        .map((v) => `${v.coords[1]},${v.coords[0]},pm2rdl`)
        .join('~');
    const center = selected && selected.coords
        ? `${selected.coords[1]},${selected.coords[0]}`
        : '85,61.5240';
    const zoom = selected ? 10 : 4;
    const mapUrl = `https://yandex.ru/map-widget/v1/?ll=${center}&z=${zoom}&l=map&pt=${markers}&lang=ru_RU`;

    return (
        <Box h="100vh" w="100%" p="md" bg={theme.other.cardBackground}>
            <Stack h="100%" gap="md" w="100%">
                <Text
                    className={classes.title}
                    fw={400}
                    c="white"
                    ta="center"
                    tt="uppercase"
                >
                    Наши партнеры
                </Text>

                <Box className={classes.responsiveGroup}>
                    <Box
                        className={classes.vendorBox}
                        style={{
                            borderRadius: theme.other.cardRadius,
                            flex: 1,
                        }}
                        bg={theme.other.darkBackground}
                    >
                        <ScrollArea
                            h="70vh"
                            px="xs"
                            py="xl"
                            scrollbarSize={8}
                            classNames={classes}
                        >
                            <Stack gap="lg" px="md">
                                {mockVendors.map((v) => (
                                    <Card
                                        key={v.id}
                                        p="md"
                                        radius={theme.other.cardRadius}
                                        bg={
                                            selected?.id === v.id
                                                ? theme.other.customYellow
                                                : hoveredId === v.id
                                                  ? theme.other.cardBackground
                                                  : theme.other.darkBackground
                                        }
                                        style={{
                                            cursor: 'pointer',
                                            border: `1px solid ${theme.other.customYellow}`,
                                            transition: 'all 0.3s ease',
                                            transform:
                                                selected?.id === v.id
                                                    ? 'scale(1)'
                                                    : hoveredId === v.id
                                                      ? 'scale(1.02)'
                                                      : 'scale(1)',
                                            boxShadow:
                                                selected?.id === v.id
                                                    ? 'none'
                                                    : hoveredId === v.id
                                                      ? `0 4px 12px ${theme.other.customYellowShadow}`
                                                      : 'none',
                                        }}
                                        onMouseEnter={() => {
                                            if (selected?.id !== v.id) {
                                                setHoveredId(v.id);
                                            }
                                        }}
                                        onMouseLeave={() => {
                                            setHoveredId(null);
                                        }}
                                        onClick={() => setSelected(v)}
                                    >
                                        <Group
                                            justify="space-between"
                                            align="center"
                                        >
                                            <Stack gap={0}>
                                                <Text
                                                    fw={700}
                                                    fz={24}
                                                    c={
                                                        selected?.id === v.id
                                                            ? theme.other
                                                                  .darkBackground
                                                            : 'white'
                                                    }
                                                >
                                                    {v.region}
                                                </Text>
                                                <Divider
                                                    my="xs"
                                                    size={2}
                                                    color={
                                                        selected?.id === v.id
                                                            ? 'black'
                                                            : theme.other
                                                                  .customOrange
                                                    }
                                                    w="100%"
                                                />
                                                <Text
                                                    size="sm"
                                                    fz={16}
                                                    c={
                                                        selected?.id === v.id
                                                            ? theme.other
                                                                  .darkBackground
                                                            : 'rgba(255,255,255,0.7)'
                                                    }
                                                >
                                                    {v.address}
                                                </Text>
                                                <Text
                                                    size="sm"
                                                    fz={16}
                                                    c={
                                                        selected?.id === v.id
                                                            ? theme.other
                                                                  .darkBackground
                                                            : 'rgba(255,255,255,0.7)'
                                                    }
                                                >
                                                    {v.phone}
                                                </Text>
                                            </Stack>
                                            <Box
                                                py="md"
                                                px="md"
                                                bg={theme.other.cardBackground}
                                                style={{
                                                    borderRadius: '15px',
                                                    border:
                                                        hoveredId === v.id
                                                            ? `1px solid ${
                                                                  theme.other
                                                                      .customYellow
                                                              }`
                                                            : '',
                                                }}
                                            >
                                                <IconMapPin
                                                    size={32}
                                                    color={
                                                        selected?.id === v.id
                                                            ? 'lime'
                                                            : theme.other
                                                                  .customYellow
                                                    }
                                                />
                                            </Box>
                                        </Group>
                                    </Card>
                                ))}
                            </Stack>
                        </ScrollArea>
                    </Box>

                    <Box
                        className={classes.mapBox}
                        style={{
                            borderRadius: theme.other.cardRadius,
                            flex: 2,
                        }}
                        p="md"
                        bg={theme.other.cardBackground}
                    >
                        <iframe
                            src={mapUrl}
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            title="Карта магазинов"
                            style={{ borderRadius: theme.other.cardRadius }}
                        />
                    </Box>
                </Box>
            </Stack>
        </Box>
    );
}
