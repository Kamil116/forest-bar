import { SimpleGrid, Pagination, Stack, Center, Transition } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import ProductCard from "./ProductCard";
import { useState } from "react";
import { mockProducts } from "@/data/mockProducts";

function ProductCards() {
    const [activePage, setActivePage] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(true);

    const isMobile = useMediaQuery('(max-width: 575px)');
    const isSmallTablet = useMediaQuery('(min-width: 576px) and (max-width: 767px)');
    const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 991px)');
    const isDesktop = useMediaQuery('(min-width: 992px) and (max-width: 1199px)');

    const columns = isMobile ? 1 : isSmallTablet ? 2 : isTablet ? 3 : isDesktop ? 4 : 5;
    const rows = isMobile ? 2 : isSmallTablet ? 2 : 3;
    const itemsPerPage = rows * columns;
    const totalPages = Math.ceil(mockProducts.length / itemsPerPage);
    if (activePage > totalPages && totalPages > 0) {
        setActivePage(1);
    }

    const startIndex = (activePage - 1) * itemsPerPage;
    const visibleProducts = mockProducts.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page: number) => {
        setIsTransitioning(false);
        setTimeout(() => {
            setActivePage(page);
            setIsTransitioning(true);
        }, 200);
    };

    return (
        <Stack gap="xl">
            <Transition
                mounted={isTransitioning}
                transition="fade"
                duration={500}
                timingFunction="ease"
            >
                {(styles) => (
                    <SimpleGrid
                        cols={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
                        spacing="lg"
                        style={styles}
                    >
                        {visibleProducts.map((product, index) => (
                            <ProductCard
                                key={`${product.id}-${activePage}`}
                                product={product}
                            />
                        ))}
                    </SimpleGrid>
                )}
            </Transition>

            {totalPages > 1 && (
                <Center py="xl">
                    <Pagination
                        total={totalPages}
                        value={activePage}
                        onChange={handlePageChange}
                        size="lg"
                        radius="md"
                    />
                </Center>
            )}
        </Stack>
    )
}

export default ProductCards;
