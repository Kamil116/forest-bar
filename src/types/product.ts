export interface Product {
    id: number;
    name: string;
    price: number;
    short_description: string;
    long_description: string;
    image_url: string;
    video_url?: string;
    seller_id: number;
}

