import { Box } from '@mantine/core';
import { HexagonGrid } from '@/components/HexagonGrid';

export function BackgroundHexagonGrids() {
    return (
        <>
            {/* Top Right Hexagon Grid */}
            <Box
                style={{
                    position: 'absolute',
                    top: '-50px',
                    right: '-50px',
                    width: '500px',
                    height: '400px',
                    opacity: 0.4,
                    zIndex: 0,
                    pointerEvents: 'none',
                    overflow: 'hidden',
                }}
            >
                <HexagonGrid
                    rows={5}
                    cols={6}
                    hexagonSize={80}
                    gap={2}
                    glowProbability={0.25}
                    align="top-right"
                />
            </Box>

            {/* Bottom Left Hexagon Grid */}
            <Box
                style={{
                    position: 'absolute',
                    bottom: '-50px',
                    left: '-50px',
                    width: '500px',
                    height: '400px',
                    opacity: 0.4,
                    zIndex: 0,
                    pointerEvents: 'none',
                    overflow: 'hidden',
                }}
            >
                <HexagonGrid
                    rows={5}
                    cols={6}
                    hexagonSize={80}
                    gap={2}
                    glowProbability={0.25}
                    align="bottom-left"
                />
            </Box>
        </>
    );
}

