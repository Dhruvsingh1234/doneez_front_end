'use client';
import { useState, useEffect } from 'react';
import { useRouter, redirect } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@nextui-org/react';
import { format } from 'date-fns';
import ServiceHeader from '@/app/headers/ServiceHeader';
import ServiceFooter from '@/app/footers/service_footer';
import { getStorage } from '@/app/utils/helper';
import { postRequest } from '@/app/utils/axios';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';

interface VehicleDetails {
  year: string;
  make: string;
  model: string;
}

interface ServiceRequestPayload {
  service_location: string;
  selected_services: string[];
  vehicle_year: string;
  vehicle_make: string;
  vehicle_model: string;
  additional_info: string;
  radio_status: string;
  mechanic_type: string;
  appointment_date: string;
  appointment_time: string;
  zipcode: string;
}

export default function ConfirmAppointment() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    serviceLocation: '',
    selectedServices: [] as string[],
    vehicle: { year: '', make: '', model: '' } as VehicleDetails,
    additionalInfo: '',
    radioStatus: '',
    mechanicType: '',
    appointmentDate: '',
    appointmentTime: '',
    zipcode: ''
  });

  
  useEffect(() => {
    const loadFromStorage = () => {
      try {
        setFormData({
          serviceLocation: getStorage('service-location') || '',
          selectedServices: JSON.parse(getStorage('selected-services') || '[]'),
          vehicle: {
            year: getStorage('selectedYear') || '',
            make: getStorage('selectedMake') || '',
            model: getStorage('selectedModel') || ''
          },
          additionalInfo: getStorage('service-additionalinfo') || '',
          radioStatus: getStorage('service-radioval') || '',
          mechanicType: getStorage('mechanicType') || '',
          appointmentDate: getStorage('appointmentDate') || '',
          appointmentTime: getStorage('appointmentTime') || '',
          zipcode: getStorage('customZipCode') || ''
        });
        setLoading(false);
      } catch (error) {
        console.error('Error loading from storage:', error);
        setError('Failed to load appointment details');
      }
    };
    
    loadFromStorage();
  }, []);
  
  // Check authentication
  const accessToken = getStorage('access_token');
  if (!accessToken) {
    redirect('/sign-in');
    return null;
  }
  const handleEdit = (path: string) => {
    router.push(`/RFQ/${path}`);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);

    const payload: ServiceRequestPayload = {
      service_location: formData.serviceLocation,
      selected_services: formData.selectedServices,
      vehicle_year: formData.vehicle.year,
      vehicle_make: formData.vehicle.make,
      vehicle_model: formData.vehicle.model,
      additional_info: formData.additionalInfo,
      radio_status: formData.radioStatus,
      mechanic_type: formData.mechanicType,
      appointment_date: formData.appointmentDate,
      appointment_time: formData.appointmentTime,
      zipcode: formData.zipcode
    };

        // Validate required fields first
        if (!formData.selectedServices.length || !formData.appointmentDate) {
          toast.error('Please fill all required fields');
          setSubmitting(false);
          return;
        }

    try {
       // The postRequest will automatically handle authorization
    const response = await postRequest('/users/service-request/', payload);
    
    if (response.status >= 200 && response.status < 300) {
      toast.success('Service request created successfully!');}
      
      // Clear storage after successful submission
      ['service-location', 'selected-services', 'selectedYear', 'selectedMake', 
       'selectedModel', 'service-additionalinfo', 'service-radioval', 
       'mechanicType', 'appointmentDate', 'appointmentTime', 'customZipCode']
        .forEach(key => localStorage.removeItem(key));

      router.push('/dashboard');
    } catch (err) {
      console.error('Submission error:', err);
      setError('Failed to create appointment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading appointment details...</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 flex flex-col"
    >
      <ServiceHeader progressNumber={8} progressTitle="Confirm Appointment" />

      <div className="flex-1 max-w-6xl w-full mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 space-y-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Confirm Your Appointment</h1>

          {error && (
            <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
              {error}
            </div>
          )}

          {/* Services Section */}
          <SectionContainer 
            title="Services"
            onEdit={() => handleEdit('Services')}
            content={
              formData.selectedServices.length ? 
              formData.selectedServices.join(', ') : 
              'No services selected'
            }
          />

          {/* Vehicle Section */}
          <SectionContainer
            title="Vehicle"
            onEdit={() => handleEdit('Vehicle')}
            content={`${formData.vehicle.year} ${formData.vehicle.make} ${formData.vehicle.model}`}
          />

          {/* Service Details Section */}
          <SectionContainer
            title="Service Type & Details"
            onEdit={() => handleEdit('Type')}
            content={
              <>
                <p>{formData.mechanicType === 'mobile' ? 'Mobile Mechanic' : 'Shop Service'}</p>
                <p>Location: {formData.serviceLocation}</p>
                {formData.additionalInfo && <p>Notes: {formData.additionalInfo}</p>}
                {formData.radioStatus && <p>Urgency: {formData.radioStatus}</p>}
              </>
            }
          />

          {/* Appointment Section */}
          <SectionContainer
            title="Appointment"
            onEdit={() => handleEdit('Book')}
            content={
              formData.appointmentDate && formData.appointmentTime ? (
                `${format(new Date(formData.appointmentDate), 'EEEE, MMM d, yyyy')} at ${
                  format(new Date(`1970-01-01T${formData.appointmentTime}`), 'h:mm a')}`
              ) : 'No appointment scheduled'
            }
          />

          {/* Submit Button */}
          <div className="flex justify-end mt-8">
            <Button 
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-4 rounded-xl shadow-md transition-all"
              onClick={handleSubmit}
              disabled={submitting}
              isLoading={submitting}
            >
              {submitting ? 'Processing...' : 'Confirm & Book Appointment'}
            </Button>
          </div>
        </motion.div>
      </div>

      <ServiceFooter />
    </motion.div>
  );
}

// Reusable section component
const SectionContainer = ({ 
  title, 
  onEdit, 
  content 
}: {
  title: string;
  onEdit: () => void;
  content: React.ReactNode;
}) => (
  <div className="border-b pb-6">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold">{title}</h2>
      <button 
        onClick={onEdit} 
        className="text-emerald-600 hover:underline text-sm"
      >
        Edit
      </button>
    </div>
    <div className="mt-4 text-gray-700">
      {content || <p className="text-gray-400">Not specified</p>}
    </div>
  </div>
);