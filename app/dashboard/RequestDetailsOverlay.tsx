import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XMarkIcon,
  WrenchIcon,
  MapPinIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ScaleIcon,
  BuildingStorefrontIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import { Spinner, Divider, Button } from '@nextui-org/react';
import {
  CustomerServiceRequest,
  MechanicServiceRequest,
  Quote,
  Appointment,
  Review,
  Business,
} from '@/app/utils/types';
import { getRequest, postRequest } from '@/app/utils/axios';

type Role = 'customer' | 'mechanic';

// --- Mechanic Reviews Overlay ---
const MechanicReviewsOverlay = ({
  mechanic,
  onClose,
}: {
  mechanic: Business;
  onClose: () => void;
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getRequest(`/mechanics/${mechanic.id}/reviews/`)
      .then((res) => setReviews(res.data))
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  }, [mechanic.id]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/30 z-50 flex justify-end backdrop-blur-sm"
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        className="w-full max-w-lg bg-white h-full p-8 overflow-y-auto border-l-8 border-purple-500 shadow-2xl relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2">
          <XMarkIcon className="w-6 h-6 text-gray-600" />
        </button>
        <h2 className="text-2xl font-bold mb-4">
          Reviews for {mechanic.business_name}
        </h2>
        {loading ? (
          <Spinner size="lg" />
        ) : reviews.length === 0 ? (
          <div className="text-gray-500">No reviews yet.</div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="bg-gray-50 p-4 rounded border">
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-xs text-gray-400 ml-2">
                    {new Date(review.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-gray-700">{review.review_text}</div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

// --- Accept Quote & Pay Overlay ---
const AcceptQuoteOverlay = ({
  quote,
  onClose,
}: {
  quote: Quote;
  onClose: () => void;
}) => {
  const [loading, setLoading] = useState(false);

  const handlePayDeposit = async () => {
    setLoading(true);
    try {
      const res = await postRequest<{ checkout_url: string }>(`/quotes/${quote.id}/accept/`);
      window.location.href = res.data.checkout_url;
    } catch (e) {
      // handle error
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-lg relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">✕</button>
        <h2 className="text-xl font-bold mb-4">Accept Quote</h2>
        <div className="mb-4">
          <div className="font-semibold">Mechanic: {quote.mechanic.business_name}</div>
          <div>Quote: <span className="font-bold text-emerald-700">${Number(quote.total_cost).toFixed(2)}</span></div>
          <div className="text-gray-500 text-sm mt-2">{quote.estimate_details}</div>
        </div>
        <div className="mb-4">
          <div className="font-semibold">Deposit (10%): <span className="text-emerald-700">${(Number(quote.total_cost) * 0.10).toFixed(2)}</span></div>
        </div>
        <Button color="success" size="lg" onClick={handlePayDeposit} disabled={loading}>
          {loading ? <Spinner size="sm" /> : "Pay & Confirm Appointment"}
        </Button>
      </div>
    </div>
  );
};

// --- Main Overlay ---
const RequestOverlay = ({
  requestId,
  role,
  onClose,
  status,
}: {
  requestId: number;
  role: Role;
  onClose: () => void;
  status: string;
}) => {
  const [details, setDetails] = useState<CustomerServiceRequest | MechanicServiceRequest | null>(null);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMechanicReviews, setShowMechanicReviews] = useState<Business | null>(null);
  const [acceptingQuote, setAcceptingQuote] = useState<Quote | null>(null);

  const isCustomer = role === 'customer';

  useEffect(() => {
    setLoading(true);
    getRequest(isCustomer
      ? `/service-requests/${requestId}/`
      : `/mechanic-requests/${requestId}/`
    )
      .then((res) => setDetails(res.data))
      .catch(() => setDetails(null));
    getRequest(`/service-requests/${requestId}/quotes/`)
      .then((res) => setQuotes(res.data))
      .catch(() => setQuotes([]));
    getRequest(`/service-requests/${requestId}/appointment/`)
      .then((res) => setAppointment(res.data))
      .catch(() => setAppointment(null));
    getRequest(`/service-requests/${requestId}/reviews/`)
      .then((res) => setReviews(res.data))
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  }, [requestId, role, isCustomer]);

  if (status === 'canceled' || status === 'rejected') {
    return null;
  }

  const getVehicleInfo = () => {
    if (!details) return null;
    return isCustomer
      ? (details as CustomerServiceRequest)
      : (details as MechanicServiceRequest).service_request;
  };

  const vehicleInfo = getVehicleInfo();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/30 z-50 flex justify-end backdrop-blur-sm"
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="w-full max-w-2xl bg-gradient-to-b from-white to-gray-50 h-full p-8 overflow-y-auto border-l-8 border-emerald-500 shadow-2xl relative"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-green-500"></div>
        <div className="absolute top-4 right-4 w-16 h-16 bg-emerald-100 rounded-full opacity-20"></div>
        <div className="absolute bottom-8 left-8 w-24 h-24 bg-blue-100 rounded-full opacity-20"></div>

        <div className="relative z-10">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                Service Details
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Request ID: {requestId}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 group"
            >
              <XMarkIcon className="w-6 h-6 text-gray-600 group-hover:text-gray-900 transition-colors" />
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Spinner size="lg" />
            </div>
          ) : details && vehicleInfo ? (
            <div className="space-y-8">
              {/* Vehicle Information Card */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-full -mr-6 -mt-6"></div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 relative">
                  <WrenchIcon className="w-5 h-5 text-emerald-600" />
                  Vehicle Details
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <p className="text-gray-500">Year</p>
                    <p className="font-medium text-gray-900">{vehicleInfo.vehicle_year}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500">Make</p>
                    <p className="font-medium text-gray-900">{vehicleInfo.vehicle_make}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500">Model</p>
                    <p className="font-medium text-gray-900">{vehicleInfo.vehicle_model}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500">Location</p>
                    <p className="font-medium text-gray-900 flex items-center gap-1">
                      <MapPinIcon className="w-4 h-4" />
                      {vehicleInfo.service_location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Requested Services */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <DocumentTextIcon className="w-5 h-5 text-blue-600" />
                  Requested Services
                </h3>
                <Divider className="my-4" />
                <div className="flex flex-wrap gap-2">
                  {(isCustomer
                    ? (details as CustomerServiceRequest).selected_services
                    : (details as MechanicServiceRequest).service_request.selected_services
                  ).map((service) => (
                    <span
                      key={service}
                      className="px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-sm font-medium flex items-center gap-1"
                    >
                      <CheckCircleIcon className="w-4 h-4" />
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quotes Section */}
              {status === 'quoted' && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <ScaleIcon className="w-5 h-5 text-purple-600" />
                    <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                      Received Quotes
                    </span>
                  </h3>
                  <Divider className="my-4" />
                  <div className="space-y-4">
                    {quotes.length === 0 ? (
                      <div className="text-gray-500">No quotes yet.</div>
                    ) : (
                      quotes.map((item) => (
                        <div
                          key={item.id}
                          className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-start gap-4">
                            <div className="flex-1">
                              {isCustomer && item.mechanic && (
                                <div className="flex items-center gap-2 mb-2">
                                  <BuildingStorefrontIcon className="w-5 h-5 text-gray-600" />
                                  <button
                                    className="font-medium text-gray-900 underline hover:text-indigo-600"
                                    onClick={() => setShowMechanicReviews(item.mechanic)}
                                  >
                                    {item.mechanic.business_name}
                                  </button>
                                  <span className="flex items-center text-sm text-yellow-600">
                                    <StarIcon className="w-4 h-4 fill-current" />
                                    {item.mechanic.rating}
                                    <span className="text-gray-500 ml-1">
                                      ({item.mechanic.total_reviews})
                                    </span>
                                  </span>
                                </div>
                              )}
                              <p className="text-sm text-gray-600 mb-2">
                                {item.estimate_details}
                              </p>
                              <p className="text-emerald-800 font-bold text-xl">
                                ${Number(item.total_cost).toFixed(2)}
                              </p>
                            </div>
                            <div className="flex flex-col gap-2">
                              {isCustomer ? (
                                <Button
                                  color="success"
                                  size="sm"
                                  className="shadow-sm hover:shadow-md"
                                  onClick={() => setAcceptingQuote(item)}
                                >
                                  Accept & Pay 10%
                                </Button>
                              ) : (
                                <Button
                                  color="danger"
                                  variant="flat"
                                  size="sm"
                                  className="shadow-sm hover:shadow-md"
                                  disabled
                                >
                                  Cancel Quote
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <AnimatePresence>
                    {showMechanicReviews && (
                      <MechanicReviewsOverlay
                        mechanic={showMechanicReviews}
                        onClose={() => setShowMechanicReviews(null)}
                      />
                    )}
                  </AnimatePresence>
                  <AnimatePresence>
                    {acceptingQuote && (
                      <AcceptQuoteOverlay
                        quote={acceptingQuote}
                        onClose={() => setAcceptingQuote(null)}
                      />
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Appointment Section */}
              {appointment && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <WrenchIcon className="w-5 h-5 text-emerald-600" />
                    Appointment Details
                  </h3>
                  <Divider className="my-4" />
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium text-gray-700">Scheduled:</span>{' '}
                      {new Date(appointment.scheduled_date).toLocaleString()}
                    </div>
                    {appointment.customer_notes && (
                      <div>
                        <span className="font-medium text-gray-700">Customer Notes:</span>{' '}
                        {appointment.customer_notes}
                      </div>
                    )}
                    {appointment.mechanic_notes && (
                      <div>
                        <span className="font-medium text-gray-700">Mechanic Notes:</span>{' '}
                        {appointment.mechanic_notes}
                      </div>
                    )}
                    <div>
                      <span className="font-medium text-gray-700">Status:</span>{' '}
                      {appointment.is_completed ? (
                        <span className="text-emerald-600 font-semibold">Completed</span>
                      ) : (
                        <span className="text-blue-600 font-semibold">Scheduled</span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Reviews Section */}
              {reviews.length > 0 && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <StarIcon className="w-5 h-5 text-yellow-500" />
                    Your Reviews
                  </h3>
                  <Divider className="my-4" />
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="bg-gray-50 p-4 rounded border">
                        <div className="flex items-center gap-2 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="text-xs text-gray-400 ml-2">
                            {new Date(review.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="text-gray-700">{review.review_text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-gray-500">No details found.</div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RequestOverlay;