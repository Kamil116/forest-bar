export interface Employee {
    id: number;
    name: string;
    surname: string;
    middleName: string;
    phone: string;
    email: string;
    position: string;
    department: string;
    hireDate: string;
    salary?: number;
    image_url?: string;
    status: 'active' | 'inactive' | 'vacation';
}

