export interface CompleteProfile {
    id: number;
    department_id: number;
    center: string;
}

export interface Department {
    id: number,
    name: string,
    address: string,
    lat: string,
    lng: string
}

export interface Departments {
    departments: Department
    meta: object
}

