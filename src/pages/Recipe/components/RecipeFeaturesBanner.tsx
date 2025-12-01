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
            mt={{ base: 'md', sm: 'lg', md: 'xl' }}
            fluid
            px={{ base: 'xs', sm: 'sm', md: 'md' }}
            style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: theme.other.cardRadius,
                background: theme.other.customYellow,
                paddingTop: 'clamp(1.5rem, 4vw, 3rem)',
                paddingBottom: 'clamp(1.5rem, 4vw, 3rem)',
                paddingLeft: 'clamp(1rem, 3vw, 2rem)',
                paddingRight: 'clamp(1rem, 3vw, 2rem)',
            }}
        >
            {/* Hexagon Grid Background - positioned higher to cover more area */}
            <Box
                style={{
                    position: 'absolute',
                    bottom: 'clamp(40px, 8vw, 80px)',
                    left: 0,
                    right: 0,
                    height: 'clamp(200px, 30vw, 400px)',
                    opacity: 0.6,
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
            <Stack gap="md" style={{ position: 'relative', zIndex: 4 }}>
                <Text
                    c="white"
                    fz={{
                        base: 12,
                        sm: 16,
                        md: 20,
                        lg: 24,
                        xl: 28,
                    }}
                    ta="center"
                    px={{ base: 'xs', sm: 'sm', md: 'md' }}
                    style={{ lineHeight: 1.5 }}
                >
                    {description}
                </Text>

                {/* Icons Content */}
                <Group
                    gap="lg"
                    justify="center"
                    align="center"
                    wrap="wrap"
                    mt="lg"
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

