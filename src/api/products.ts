import { Product } from '../types/product';

export async function fetchProducts(): Promise<Product[]> {
    try {
        const response = await fetch('http://localhost:8000/products');

        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        return response.json();
    } catch (error) {
        throw new Error(error as string);
    }
}
