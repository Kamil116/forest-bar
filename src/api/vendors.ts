import { Vendor } from '../types/vendor';

export async function fetchVendors(): Promise<Vendor[]> {
    try {
        const response = await fetch('http://localhost:8000/vendors');

        if (!response.ok) {
            throw new Error('Failed to fetch vendors');
        }
        return response.json();
    } catch (error) {
        throw new Error(error as string);
    }
}
