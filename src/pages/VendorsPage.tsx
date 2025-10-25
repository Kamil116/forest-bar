import { useState } from 'react';
import { Box, Text, Stack, Group, ScrollArea, Card, useMantineTheme, Container } from '@mantine/core';
import classes from './VendorsPage.module.css';

const vendors = [
  { id: 1, title: 'Московская область', address: 'Москва, Красная площадь, 1', phone: '+7 (495) 123-4567', coords: [55.7558, 37.6176] },
  { id: 2, title: 'Санкт-Петербург', address: 'Санкт-Петербург, Дворцовая площадь, 2', phone: '+7 (812) 234-5678', coords: [59.9311, 30.3609] },
  { id: 3, title: 'Новосибирская область', address: 'Новосибирск, Красный проспект, 3', phone: '+7 (383) 345-6789', coords: [55.0084, 82.9357] },
  { id: 4, title: 'Екатеринбург', address: 'Екатеринбург, проспект Ленина, 4', phone: '+7 (343) 456-7890', coords: [56.8431, 60.6454] },
  { id: 5, title: 'Нижний Новгород', address: 'Нижний Новгород, Большая Покровская, 5', phone: '+7 (831) 567-8901', coords: [56.2965, 43.9361] },
  { id: 6, title: 'Казань', address: 'Казань, улица Баумана, 6', phone: '+7 (843) 678-9012', coords: [55.8304, 49.0661] },
  { id: 7, title: 'Челябинск', address: 'Челябинск, проспект Ленина, 7', phone: '+7 (351) 789-0123', coords: [55.1644, 61.4368] },
  { id: 8, title: 'Омск', address: 'Омск, улица Ленина, 8', phone: '+7 (3812) 890-1234', coords: [54.9885, 73.3242] },
  { id: 9, title: 'Самара', address: 'Самара, улица Ленинградская, 9', phone: '+7 (846) 901-2345', coords: [53.2001, 50.1500] },
  { id: 10, title: 'Ростов-на-Дону', address: 'Ростов-на-Дону, Большая Садовая, 10', phone: '+7 (863) 012-3456', coords: [47.2357, 39.7015] },
];

export default function VendorsPage() {
  const theme = useMantineTheme();
  const [selected, setSelected] = useState<typeof vendors[0] | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  
  const markers = vendors.map(v => `${v.coords[1]},${v.coords[0]},pm2rdl`).join('~');
  const center = selected ? `${selected.coords[1]},${selected.coords[0]}` : '85,61.5240';
  const zoom = selected ? 10 : 4;
  const mapUrl = `https://yandex.ru/map-widget/v1/?ll=${center}&z=${zoom}&l=map&pt=${markers}&lang=ru_RU`;

  return (
    <Box h="100vh" w="100%" p="md" bg={theme.other.darkBackground}>
      <Stack h="100%" gap="md" w="100%">
        <Text className={classes.title} fw={400} c="white" ta="center" tt="uppercase">Наши партнеры</Text>

        <Box className={classes.responsiveGroup}>
          <Box 
            className={classes.vendorBox}
            style={{ 
              borderRadius: theme.other.cardRadius, 
              flex: 1,
            }}
            bg={theme.other.cardBackground}
          >
            <Box p="lg" style={{ borderBottom: `1px solid ${theme.other.customYellow}` }}>
              <Text fz={24} fw={700} c="white" tt="uppercase">Регионы</Text>
            </Box>
            <ScrollArea 
              h="calc(100% - 70px)" 
              px="xs" 
              py="lg"
              scrollbarSize={8}
              classNames={classes}
            >
              <Stack gap="lg" px="md">
                {vendors.map((v) => (
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
                      transform: selected?.id === v.id ? 'scale(1)' : hoveredId === v.id ? 'scale(1.02)' : 'scale(1)',
                      boxShadow: selected?.id === v.id ? 'none' : hoveredId === v.id ? `0 4px 12px ${theme.other.customYellowShadow}` : 'none',
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
                    <Text fw={700} c={selected?.id === v.id ? theme.other.darkBackground : 'white'}>{v.title}</Text>
                    <Text size="sm" c={selected?.id === v.id ? theme.other.darkBackground : 'rgba(255,255,255,0.7)'}>{v.address}</Text>
                    <Text size="sm" c={selected?.id === v.id ? theme.other.darkBackground : 'rgba(255,255,255,0.7)'}>{v.phone}</Text>
                  </Card>
                ))}
              </Stack>
            </ScrollArea>
          </Box>

          <Box 
            className={classes.mapBox}
            style={{ borderRadius: theme.other.cardRadius, flex: 2 }} 
            p="md" 
            bg={theme.other.cardBackground}
          >
            <iframe src={mapUrl} width="100%" height="100%" frameBorder="0" style={{ borderRadius: theme.other.cardRadius }} />
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
