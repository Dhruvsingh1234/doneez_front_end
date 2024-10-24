import { getRequest } from './axios';
import { MechanicProfile } from './types';

// api/mechanics.ts
export async function fetchMechanics(
    customer_zip: string,
    max_distance: number
): Promise<MechanicProfile[]> {
    try {
        const URL = 'users/mechanics/distance-filter/';

        const params = {
            customer_zip,
            max_distance,
        };

        const response = await getRequest<MechanicProfile[]>(URL, params);
        return response.data;
    } catch (error) {
        console.error('Error fetching mechanics:', error);
        // You can choose to rethrow the error or return an empty array
        return [];
    }
}
