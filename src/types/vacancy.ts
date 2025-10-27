export interface Vacancy {
    id: number;
    title: string;
    city: string;
    department: string;
    description: string;
    conditions: string[];
    requirements: string[];
    salary_min?: number;
    salary_max?: number;
    employment_type: 'full-time' | 'part-time' | 'contract' | 'internship';
    status: 'open' | 'closed' | 'on-hold';
    posted_date: string;
}

