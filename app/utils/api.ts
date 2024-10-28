import { getRequest } from './axios';
import { MechanicProfileType } from './types';

// api/mechanics.ts
export async function fetchMechanicsByDistance(
    customer_zip: string,
    max_distance: number
): Promise<MechanicProfileType[]> {
    try {
        const URL = 'users/mechanics/distance-filter/';

        const params = {
            customer_zip,
            max_distance,
        };

        const response = await getRequest<MechanicProfileType[]>(URL, params);
        return response.data;
    } catch (error) {
        console.error('Error fetching mechanics:', error);
        // You can choose to rethrow the error or return an empty array
        return [];
    }
}

export async function fetchMechanicProfileById(
    id: string | null
): Promise<MechanicProfileType | null> {
    try{
        const URL = `/users/mechanic-profile/${id}/`;

        const response = await getRequest<MechanicProfileType>(URL);
        return response.data
    } catch (error) {
        console.error('Error fetching mechanics:', error);
        return null
    }
}
