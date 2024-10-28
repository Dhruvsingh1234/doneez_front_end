export interface MechanicAvailability {
    fri: string[];
    mon: string[];
    san: string[];
    sat: string[];
    thr: string[];
    tue: string[];
    wed: string[];
}

export interface MechanicProfileType {
    id: number;
    business_name: string;
    job_title: string;
    web_site: string;
    business_info: string;
    heard_info: string;
    rating: number;
    availability: MechanicAvailability;
    years_of_experience: number | null;
    phone_number: string;
    address: string;
    zip_code: string;
    certifications: string;
    is_mobile: boolean;
    address_city: string;
    address_state: string;
    map_verified: string;
    address_latitude: string;
    address_longitude: string;
    distance?: number;
}
