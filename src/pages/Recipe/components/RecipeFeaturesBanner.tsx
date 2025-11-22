import { Box, Container, Group, Stack, Text, useMantineTheme } from '@mantine/core';
import { HexagonGrid } from '@/components/HexagonGrid';
import { RecipeFeatureCard } from './RecipeFeatureCard';
import { NavigationArrows } from './NavigationArrows';

interface RecipeFeaturesBannerProps {
    description: string;
    onPrevious?: () => void;
    onNext?: () => void;
}

const FEATURES = [
    { label: 'Натуральность', imageSrc: `${import.meta.env.BASE_URL}/images/Group 81.png` },
    { label: 'Качество', imageSrc: `${import.meta.env.BASE_URL}/images/Group 91.png` },
    { label: 'Насыщенность', imageSrc: `${import.meta.env.BASE_URL}/images/Group 82.png` },
];

export function RecipeFeaturesBanner({ description, onPrevious, onNext }: RecipeFeaturesBannerProps) {
    const theme = useMantineTheme();

    return (
        <Container
            size="xl"
            mt="xl"
            fluid
            style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: theme.other.cardRadius,
                background: theme.other.customYellow,
                padding: '3rem 2rem',
            }}
        >
            {/* Hexagon Grid Background - positioned higher to cover more area */}
            <Box
                style={{
                    position: 'absolute',
                    bottom: '80px', // Position higher from bottom
                    left: 0,
                    right: 0,
                    height: '400px', // Increased height
                    opacity: 0.6, // Reduced opacity for better contrast
                    pointerEvents: 'none',
                    overflow: 'hidden',
                }}
            >
                <HexagonGrid
                    rows={5}
                    cols={12}
                    hexagonSize={80}
                    gap={4}
                    glowProbability={0.15}
                    align="center"
                    colors={[
                        'rgba(255, 200, 87, 0.8)', // Lighter yellow with opacity
                        'rgba(230, 180, 50, 0.8)', // Medium yellow-orange with opacity
                        'rgba(255, 215, 120, 0.8)', // Very light yellow with opacity
                        'rgba(240, 190, 60, 0.8)', // Golden yellow with opacity
                        'rgba(200, 150, 40, 0.8)', // Darker yellow-orange with opacity
                        'rgba(220, 170, 50, 0.8)', // Medium golden with opacity
                    ]}
                />
            </Box>

            {/* Text Content */}
            <Stack gap="xl" style={{ position: 'relative', zIndex: 4 }}>
                <Text
                    c="white"
                    fz={{
                        base: 20,
                        md: 24,
                        lg: 28,
                    }}
                    ta="center"
                >
                    {description}
                </Text>

                {/* Icons Content */}
                <Group
                    gap="xl"
                    justify="center"
                    align="center"
                    wrap="wrap"
                    mt="xl"
                >
                    {FEATURES.map((feature, index) => (
                        <RecipeFeatureCard
                            key={index}
                            label={feature.label}
                            imageSrc={feature.imageSrc}
                        />
                    ))}
                </Group>
            </Stack>

            {/* Navigation Arrows */}
            <NavigationArrows onPrevious={onPrevious} onNext={onNext} />
        </Container>
    );
}

