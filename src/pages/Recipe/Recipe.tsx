import { useState } from 'react';
import { Box, Container, Stack, useMantineTheme } from '@mantine/core';
import {
    BackgroundHexagonGrids,
    RecipeTitleCards,
    RecipeFeaturesBanner,
} from './components';
import { recipes } from './data/recipes';

export default function Recipe() {
    const theme = useMantineTheme();
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentRecipe = recipes[currentIndex];

    const handlePrevious = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? recipes.length - 1 : prev - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prev) =>
            prev === recipes.length - 1 ? 0 : prev + 1
        );
    };

    return (
        <Stack gap={0} h="100vh">
            <Box
                bg={theme.other.cardBackground}
                style={{
                    flex: 1,
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <BackgroundHexagonGrids />

                <Container
                    size="xl"
                    px={{ base: 'xs', sm: 'sm', md: 'md', lg: 'lg' }}
                    py={{ base: 'sm', sm: 'md', md: 'lg', lg: 'xl' }}
                    style={{ position: 'relative', zIndex: 1 }}
                >
                    <Stack gap="lg" align="center" justify="center" mih={{ base: '50vh', sm: '60vh', md: '70vh', lg: '80vh' }}>
                        <RecipeTitleCards
                            mainTitle={currentRecipe.mainTitle}
                            subTitle={currentRecipe.subTitle}
                        />
                        <RecipeFeaturesBanner
                            description={currentRecipe.description}
                            onPrevious={handlePrevious}
                            onNext={handleNext}
                        />
                    </Stack>
                </Container>
            </Box>
        </Stack>
    );
}
