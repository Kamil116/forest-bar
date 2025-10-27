export interface Vendor {
    id: number;
    title: string;
    address: string;
    phone: string;
    coords: [number, number]; // [latitude, longitude]
    email?: string;
    description?: string;
}

