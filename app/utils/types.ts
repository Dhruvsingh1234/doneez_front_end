export interface MechanicAvailability {
    mon: string[];
    tue: string[];
    wed: string[];
    thu: string[];
    fri: string[];
    sat: string[];
    sun: string[];
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
    offered_services: string[] | null;
    website?: string;
    business_description?: string;
}

export interface PaginatedMechanicProfileResponse extends PaginatedResponse<MechanicProfileType> {}

export interface PaginatedResponse<T> {
    total_items: number;
    total_pages: number;
    current_page: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

export interface ValidationErrorResponse {
    [field: string]: string[];
}

export interface MechanicSignupData {   
        name: string;
        email: string;
        phoneNumber: string;
        businessName: string;
        businessHours: string;
        location: string; // Added location field
        password: string;
        confirmPassword: string;
      
  }

 export interface AccordionData {
    title: string;
    subItems: {
      title: string;
      services: {
        id: string;
        name: string;
      }[];
    }[];
  }
  

  export interface UserLocationMapProps {
    addressInput?: {
      fullAddress?: string;
    };
    addressfnc: () => void; 
  }

 export interface DayHours {
    day: string;
    startTime: string;
    endTime: string;
    isClosed: boolean;
  }