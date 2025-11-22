import { Box } from '@mantine/core';
import { useId } from 'react';
import classes from './ArrowConnector.module.css';

interface ArrowConnectorProps {
    direction: 'right-down' | 'right-up';
}

export function ArrowConnector({ direction }: ArrowConnectorProps) {
    const markerId = useId();
    
    return (
        <Box className={`${classes.arrow} ${classes[direction]}`}>
            <svg
                viewBox="0 0 250 150"
                preserveAspectRatio="none"
                className={classes.arrowSvg}
            >
                <defs>
                    <marker
                        id={markerId}
                        markerWidth="12"
                        markerHeight="12"
                        refX="11"
                        refY="6"
                        orient="auto"
                    >
                        <polygon
                            points="0 0, 12 6, 0 12"
                            fill="rgba(92, 61, 46, 1)"
                        />
                    </marker>
                </defs>
                <path
                    d={
                        direction === 'right-down'
                            ? 'M 50 0 C 50 25, 80 55, 115 85 C 150 115, 190 130, 245 105'
                            : 'M 65 145 C 50 125, 80 95, 115 65 C 150 35, 190 20, 245 5'
                    }
                    stroke="rgba(92, 61, 46, 1)"
                    strokeWidth="5"
                    fill="none"
                    markerEnd={`url(#${markerId})`}
                    strokeLinecap="round"
                />
            </svg>
        </Box>
    );
}

