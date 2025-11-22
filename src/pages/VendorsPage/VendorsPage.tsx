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
        <Box h="100vh" w="100%" p={{ base: 'xs', sm: 'sm', md: 'md' }} bg={theme.other.cardBackground}>
            <Stack h="100%" gap="md" w="100%" style={{ overflow: 'hidden' }}>
                <Text
                    fw={400}
                    c="white"
                    ta="center"
                    tt="uppercase"
                    fz={{ base: 28, sm: 36, md: 48, lg: 60 }}
                    style={{ flexShrink: 0 }}
                >
                    Наши партнеры
                </Text>

                <Box className={classes.responsiveGroup} style={{ flex: 1, minHeight: 0 }}>
                    <Box
                        className={classes.vendorBox}
                        style={{
                            borderRadius: theme.other.cardRadius,
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            minHeight: 0,
                            overflow: 'hidden',
                        }}
                        bg={theme.other.darkBackground}
                    >
                        <ScrollArea
                            style={{ flex: 1, minHeight: 0 }}
                            px={{ base: 'xs', md: 'xs' }}
                            py={{ base: 'sm', md: 'xl' }}
                            scrollbarSize={8}
                            classNames={classes}
                        >
                            <Stack gap="lg" px={{ base: 'xs', md: 'md' }}>
                                {mockVendors.map((v) => (
                                    <Card
                                        key={v.id}
                                        p={{ base: 'sm', md: 'md' }}
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
                                            wrap="nowrap"
                                            gap="md"
                                        >
                                            <Stack gap={0} style={{ flex: 1, minWidth: 0 }}>
                                                <Text
                                                    fw={700}
                                                    fz={{ base: 18, sm: 20, md: 24 }}
                                                    c={
                                                        selected?.id === v.id
                                                            ? theme.other
                                                                  .darkBackground
                                                            : 'white'
                                                    }
                                                    style={{ wordBreak: 'break-word' }}
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
                                                    fz={{ base: 12, sm: 14, md: 16 }}
                                                    c={
                                                        selected?.id === v.id
                                                            ? theme.other
                                                                  .darkBackground
                                                            : 'rgba(255,255,255,0.7)'
                                                    }
                                                    style={{ wordBreak: 'break-word' }}
                                                >
                                                    {v.address}
                                                </Text>
                                                <Text
                                                    size="sm"
                                                    fz={{ base: 12, sm: 14, md: 16 }}
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
                                                py={{ base: 'sm', md: 'md' }}
                                                px={{ base: 'sm', md: 'md' }}
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
                                                    flexShrink: 0,
                                                }}
                                            >
                                                <IconMapPin
                                                    size={24}
                                                    style={{
                                                        width: 'clamp(24px, 4vw, 32px)',
                                                        height: 'clamp(24px, 4vw, 32px)',
                                                    }}
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
                            display: 'flex',
                            flexDirection: 'column',
                            minHeight: 0,
                        }}
                        p={{ base: 'xs', md: 'md' }}
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
