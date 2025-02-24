"use client";

import React, { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import "tailwindcss/tailwind.css";
import { postRequest } from "../../utils/axios";
import "./styles.css";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import MapWithMarker from "../MapWithMarker";
import ServiceInterView from "../DoneezServices";

interface DayHours {
  day: string;
  startTime: string;
  endTime: string;
  isClosed: boolean;
}

const MechanicSignupForm: React.FC = () => {
  const [days, setDays] = useState<DayHours[]>([
    { day: "Mon", startTime: "09:00", endTime: "17:00", isClosed: false },
    { day: "Tue", startTime: "09:00", endTime: "17:00", isClosed: false },
    { day: "Wed", startTime: "09:00", endTime: "17:00", isClosed: false },
    { day: "Thu", startTime: "09:00", endTime: "17:00", isClosed: false },
    { day: "Fri", startTime: "09:00", endTime: "17:00", isClosed: false },
    { day: "Sat", startTime: "09:00", endTime: "17:00", isClosed: false },
    { day: "Sun", startTime: "09:00", endTime: "17:00", isClosed: false },
  ]);

  const handleTimeChange = (
    dayIndex: number,
    field: "startTime" | "endTime",
    value: string
  ) => {
    const updatedDays = days.map((day, index) =>
      index === dayIndex ? { ...day, [field]: value } : day
    );
    setDays(updatedDays);
  };

  const toggleClosed = (dayIndex: number) => {
    const updatedDays = days.map((day, index) =>
      index === dayIndex ? { ...day, isClosed: !day.isClosed } : day
    );
    setDays(updatedDays);
  };

   
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    businessTagline: "",
    businessEmail: "",
    website: "",
    phone: "",
    locationCount: "",
    hoursOfOperation: [] as DayHours[],
    specialHours: "",
    businessDescription: "",
    fullAddress: "",
    city: "",
    state: "",
    zipcode: "",
    services: [] as string[],
  });

 
  const validateField = (name: string, value: string): string | null => {
    switch (name) {
      case "businessName":
        if (!value.trim()) return "Business Name cannot be empty.";
        break;
      case "businessTagline":
        if (!value.trim()) return "Business Tagline cannot be empty.";
        break;
      case "phone": {
        const phoneRegex = /^[0-9+\-\s()]{7,20}$/;
        if (!phoneRegex.test(value))
          return "Please enter a valid phone number.";
        break;
      }
      case "businessEmail": {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value))
          return "Please enter a valid email address.";
        break;
      }
      case "website":
        try {
          new URL(value);
        } catch {
          return "Please enter a valid URL (e.g., https://www.example.com).";
        }
        break;
      case "locationCount":
        if (isNaN(Number(value)) || Number(value) < 0)
          return "Please enter a valid number for business locations.";
        break;
      case "specialHours":
        if (!value.trim()) return "Special Hours cannot be empty.";
        break;
      case "businessDescription":
        if (!value.trim()) return "Business Description cannot be empty.";
        break;
      case "fullAddress":
        if (!value.trim()) return "Full Address cannot be empty.";
        break;
      case "city":
        if (!value.trim()) return "City cannot be empty.";
        break;
      case "state":
        if (!value.trim()) return "State cannot be empty.";
        break;
      case "zipcode":
        if (!value.trim()) return "Zipcode cannot be empty.";
        break;
      default:
        break;
    }
    return null;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // onBlur handler to validate fields on leaving input
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      toast.error(error);
    }
  };

  const handleServiceSelection = (selectedServices: string[]) => {
    setFormData((prev) => ({
      ...prev,
      services: selectedServices,
    }));
  };

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Merge the weekly hours (days) into the formData
    const updatedFormData = { ...formData, hoursOfOperation: days };

    // Validate that every field is filled
    const isFormValid = Object.entries(updatedFormData).every(([key, value]) => {
      if (Array.isArray(value)) return value.length > 0;
      return value.toString().trim() !== "";
    });

    if (!isFormValid) {
      toast.error("Please fill in all fields before submitting.");
      return;
    }

    setLoading(true);
    try {
      const response = await postRequest("/users/create-mechanic", updatedFormData);
      console.log(response);
      toast.success("Signup Successful!");
      console.log(updatedFormData);
    } catch (error) {
      toast.error("Signup Failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // For address updating from the Map component
  const [Address, setAddress] = useState("");
  const submitAddress = () => {
    setFormData((prev) => ({ ...prev, fullAddress: Address }));
  };

  const finaladdress = {
    fullAddress: formData.fullAddress,
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {/* Enhanced Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
              DoneEZ
            </Link>
            <Link 
              href="/sign-in"
              
            >
             <Button className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
              Sign In
              </Button> 
            </Link>
          </div>
        </nav>
      </header>

      <div className="flex justify-center bg-gray-100 py-8 responsive-form">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full form-container">
          <Form onSubmit={handleSubmit}>
            {/* Progress Steps */}
            <div className="px-8 pt-8">
              <div className="relative pb-8">
                <div className="flex justify-between flex-wrap">
                  {['Details', 'Services', 'Location'].map((step, index) => (
                    <div key={step} className="flex flex-col items-center flex-1 mb-4 sm:mb-0">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep >= index ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`} style={{ zIndex: 4 }}>
                        {index + 1}
                      </div>
                      <span className={`text-sm font-medium ${currentStep >= index ? 'text-blue-600' : 'text-gray-500'}`}>
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200">
                  <div 
                    className="h-full bg-blue-600 transition-all duration-300" 
                    style={{ width: `${(currentStep / 2) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Step 1: Business Details */}
            {currentStep === 0 && (
              <fieldset>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <Form.Group className="relative mb-10">
                    <Form.Control
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      placeholder=" "
                      className="peer border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                    />
                    <Form.Label className="absolute left-0 top-0 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">
                      Business Name
                    </Form.Label>
                    <Form.Text className="text-muted">
                      Enter the official name of your business.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="relative mb-10">
                    <Form.Control
                      type="text"
                      name="businessTagline"
                      value={formData.businessTagline}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      placeholder=" "
                      className="peer border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                    />
                    <Form.Label className="absolute left-0 top-0 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">
                      Business Tagline
                    </Form.Label>
                    <Form.Text className="text-muted">
                      Enter a short tagline representing your business.
                    </Form.Text>
                  </Form.Group>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <Form.Group className="relative mb-10">
                    <Form.Control
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      placeholder=" "
                      className="peer border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                    />
                    <Form.Label className="absolute left-0 top-0 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">
                      Business Phone No.
                    </Form.Label>
                    <Form.Text className="text-muted">
                      Enter your contact number (e.g., +1234567890).
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="relative mb-10">
                    <Form.Control
                      type="email"
                      name="businessEmail"
                      value={formData.businessEmail}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      placeholder=" "
                      className="peer border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                    />
                    <Form.Label className="absolute left-0 top-0 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">
                      Business Email
                    </Form.Label>
                    <Form.Text className="text-muted">
                      Enter a valid email address (e.g., name@example.com).
                    </Form.Text>
                  </Form.Group>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <Form.Group className="relative mb-10">
                    <Form.Control
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      placeholder=" "
                      className="peer border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                    />
                    <Form.Label className="absolute left-0 top-0 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">
                      Business Website
                    </Form.Label>
                    <Form.Text className="text-muted">
                      Enter a valid URL (e.g., https://www.example.com).
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="relative mb-10">
                    <Form.Control
                      type="number"
                      name="locationCount"
                      min="0"
                      value={formData.locationCount}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      placeholder=" "
                      className="peer border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                    />
                    <Form.Label className="absolute left-0 top-0 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">
                      Total Business Locations
                    </Form.Label>
                    <Form.Text className="text-muted">
                      Enter the number of business locations.
                    </Form.Text>
                  </Form.Group>
                </div>

                {/* Weekly Hours Section */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">
                    Operating Hours (24-hour format)
                  </h3>
                  {/* Header row for operating hours */}
                  <div className="operating-hours-header flex flex-col sm:flex-row sm:justify-between items-center bg-gray-50 p-2 rounded-t-lg">
                    {/* You can add additional header description here if needed */}
                  </div>
                  <div className="grid gap-4">
                    {days.map((day, index) => (
                      <div
                        key={day.day}
                        className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 p-3 rounded-lg"
                      >
                        <span className="w-12 font-medium text-gray-700">
                          {day.day}
                        </span>
                        <div className="operation-closed">
                          <span className="font-medium text-gray-700 text-center">
                            Closed?
                          </span>
                          <Form.Check
                            type="switch"
                            id={`closed-${day.day}`}
                            checked={day.isClosed}
                            onChange={() => toggleClosed(index)}
                          />
                        </div>
                        <div className="flex items-center gap-4 mt-2 sm:mt-0">
                          <div className={`flex gap-2 ${day.isClosed ? "opacity-50" : ""}`}>
                            <Form.Control
                              type="time"
                              value={day.startTime}
                              onChange={(e) =>
                                handleTimeChange(index, "startTime", e.target.value)
                              }
                              disabled={day.isClosed}
                              className="w-32 border rounded px-2 py-1"
                            />
                            <span className="self-center text-gray-500">to</span>
                            <Form.Control
                              type="time"
                              value={day.endTime}
                              onChange={(e) =>
                                handleTimeChange(index, "endTime", e.target.value)
                              }
                              disabled={day.isClosed}
                              className="w-32 border rounded px-2 py-1"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1">
                  <Form.Group className="relative mb-10">
                    <Form.Control
                      type="text"
                      name="specialHours"
                      value={formData.specialHours}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      placeholder=" "
                      className="peer border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                    />
                    <Form.Label className="absolute left-0 top-0 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">
                      Business Special Hours
                    </Form.Label>
                    <Form.Text className="text-muted">
                      Enter any special operating hours
                    </Form.Text>
                  </Form.Group>
                </div>

                <div className="grid grid-cols-1">
                  <Form.Group className="relative mb-6">
                    <Form.Control
                      as="textarea"
                      name="businessDescription"
                      value={formData.businessDescription}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      placeholder=" "
                      rows={4}
                      className="peer border rounded p-2 focus:border-blue-500 outline-none"
                    />
                    <Form.Label className="absolute left-2 top-0 text-gray-500 transition-all peer-focus:text-sm">
                      Business Description
                    </Form.Label>
                    <Form.Text className="text-muted">
                      Provide a brief description of your business.
                    </Form.Text>
                  </Form.Group>
                </div>

                <div className="flex justify-end gap-4">
                  {currentStep !== 0 && (
                    <Button
                      type="button"
                      className="bg-gray-500 text-white px-4 py-2 rounded"
                      onClick={handlePrevious}
                    >
                      Previous
                    </Button>
                  )}
                  <Button
                    type="button"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                </div>
              </fieldset>
            )}

            {/* Step 2: Services */}
            {currentStep === 1 && (
              <fieldset>
                <div className="mb-6">
                  <ServiceInterView onSelectionChange={handleServiceSelection} />
                </div>
                <div className="flex justify-between mt-4">
                  <Button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                    onClick={handlePrevious}
                  >
                    Previous
                  </Button>
                  <Button
                    type="button"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                </div>
              </fieldset>
            )}

            {/* Step 3: Locations */}
            {currentStep === 2 && (
              <fieldset>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <Form.Group className="relative mb-10">
                    <Form.Control
                      type="text"
                      name="fullAddress"
                      value={Address}
                      onChange={(e) => setAddress(e.target.value)}
                      onBlur={handleBlur}
                      required
                      placeholder=" "
                      className="peer border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                    />
                    <Form.Label className="absolute left-0 top-0 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">
                      Full Address
                    </Form.Label>
                    <Form.Text className="text-muted">
                      Enter the complete address of your business location.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="relative mb-10">
                    <Form.Control
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      placeholder=" "
                      className="peer border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                    />
                    <Form.Label className="absolute left-0 top-0 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">
                      City
                    </Form.Label>
                    <Form.Text className="text-muted">
                      Enter the city where your business is located.
                    </Form.Text>
                  </Form.Group>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <Form.Group className="relative mb-10">
                    <Form.Control
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      placeholder=" "
                      className="peer border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                    />
                    <Form.Label className="absolute left-0 top-0 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">
                      State
                    </Form.Label>
                    <Form.Text className="text-muted">
                      Enter the state where your business is located.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="relative mb-10">
                    <Form.Control
                      type="text"
                      name="zipcode"
                      value={formData.zipcode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      placeholder=" "
                      className="peer border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                    />
                    <Form.Label className="absolute left-0 top-0 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">
                      Zipcode
                    </Form.Label>
                    <Form.Text className="text-muted">
                      Enter the postal code.
                    </Form.Text>
                  </Form.Group>
                </div>

                {/* Map Component */}
                <div className="mb-6">
                  <MapWithMarker addressInput={finaladdress} addressfnc={submitAddress} />
                </div>
                <div className="flex justify-between mt-4">
                  <Button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                    onClick={handlePrevious}
                  >
                    Previous
                  </Button>
                  <Button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    disabled={loading}
                  >
                    {loading ? <Spinner animation="border" size="sm" /> : "Submit"}
                  </Button>
                </div>
              </fieldset>
            )}
          </Form>
        </div>
      </div>
    </>
  );
};

export default MechanicSignupForm;
