import { Image, Stack, Text } from '@mantine/core';

interface RecipeFeatureCardProps {
    label: string;
    imageSrc: string;
}

export function RecipeFeatureCard({ label, imageSrc }: RecipeFeatureCardProps) {
    return (
        <Stack gap="sm" align="center">
            <Image
                src={imageSrc}
                alt={label}
                style={{
                    width: '200px',
                    height: '200px',
                    objectFit: 'contain',
                }}
            />
            <Text c="rgba(139, 69, 19, 1)" fw={700} ta="center" fz={{ base: 32, md: 38 }}>
                {label}
            </Text>
        </Stack>
    );
}

