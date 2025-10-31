export interface Vendor {
    id: number;
    title: string;
    name: string;
    middleName: string;
    surname: string;
    address: string;
    phone: string;
    coords: [number, number]; // [latitude, longitude]
    email?: string;
    description?: string;
}

