"use client";

import React, { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import "tailwindcss/tailwind.css";
import { postRequest } from "../../utils/axios";
import './styles.css'
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import  MapWithMarker from "../MapWithMarker";
import ServiceInterView from "../DoneezServices"


const MechanicSignupForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    businessTagline: "",
    businessEmail: "",
    website: "",
    phone: "",
    locationCount: "",
    hoursOfOperation: "",
    specialHours: "",
    businessDescription: "",
    fullAddress: "",
    city: "",
    state: "",
    zipcode: "",
    services: [] as string[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleServiceSelection = (selectedservices: string[]) => {
    setFormData(prev => ({
      ...prev,
      services: selectedservices
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
  
    // Check if any field is empty
    const isFormValid = Object.values(formData).every(value => {
      if (Array.isArray(value)) return value.length > 0; // Ensure at least one service is selected
      return value.trim() !== ""; // Ensure other fields are not empty
    });
  
    if (!isFormValid) {
      toast.error("Please fill in all fields before submitting.");
      return;
    }
  
    setLoading(true);
    try {
      const ress  = await postRequest("/users/create-mechanic", formData);
      console.log(ress);
      alert("Signup Successful!");
    console.log(formData)
    } catch (error) {
      toast.error("Signup Failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

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
            {/* Header */}
            <div className="flex min-h-[80px] p-[12px] lg:px-6 shadow-[0_.125rem_.25rem_rgba(0,0,0,0.075)] bg-white">
                <div className="flex flex-row items-center w-full">
                    <div className="text-[30px] text-black">
                        <Link href={'/'}>DoneEZ</Link>
                    </div>
                    <div className="ml-auto mr-0">
                        <Link href={'/sign-in'}>
                            <button
                                className="px-[24px] py-[8px] text-[16px] rounded-md shadow-[inset_0_1px_0_hsla(0,0%,100%,.15),_0_1px_1px_rgba(51,51,51,.115)] bg-[#009ed5] hover:bg-[#0082af] border-[#009ed5]
                                hover:border-[#0078a2] active:border-[1px] active:border-solid text-white"
                            >
                                Sign In
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
    
    <div className="flex justify-center bg-gray-100 ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full  margin-3rem">
        <Form onSubmit={handleSubmit}>
          {/* Progress Bar */}
          <ul id="progressbar" className="flex justify-between mb-8 mt-6">
            <li className={`step ${currentStep >= 0 ? "active" : ""}`}>Details</li>
            
            <li className={`step ${currentStep >= 1 ? "active" : ""}`}>Services</li>
            <li className={`step ${currentStep >= 2 ? "active" : ""}`}>Location</li>
          </ul>

          {/* Step 1: Business Details */}
          {currentStep === 0 && (
            <fieldset>
    <div className="row">

        <Form.Group className="mb-3 group">      
        <Form.Control
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            required
            placeholder=" "
            />
        <span className="highlight"></span>
        <span className="bar"></span>
        <Form.Label>Business Name</Form.Label>
        </Form.Group>

        <Form.Group className="mb-3 group">      
        <Form.Control
            type="text"
            name="businessTagline"
            value={formData.businessTagline}
            onChange={handleChange}
            required
            placeholder=" "
            />
        <span className="highlight"></span>
        <span className="bar"></span>
        <Form.Label>Business Tagline</Form.Label>
        </Form.Group>
    </div>

    <div className="row">

<Form.Group className="mb-3 group">      
  <Form.Control
    type="number"
    name="phone"
    min="0"
    value={formData.phone}
    onChange={handleChange}
    required
    placeholder=" "
    />
  <span className="highlight"></span>
  <span className="bar"></span>
  <Form.Label>Business Phone No.</Form.Label>
</Form.Group>

<Form.Group className="mb-3 group">      
  <Form.Control
    type="text"
    name="businessEmail"
    value={formData.businessEmail}
    onChange={handleChange}
    required
    placeholder=" "
    />
  <span className="highlight"></span>
  <span className="bar"></span>
  <Form.Label>Business Email</Form.Label>
    </Form.Group>

</div>

<div className="row">

<Form.Group className="mb-3 group">      
  <Form.Control
    type="text"
    name="website"
    value={formData.website}
    onChange={handleChange}
    required
    placeholder=" "
  />
  <span className="highlight"></span>
  <span className="bar"></span>
  <Form.Label>Business Website</Form.Label>
</Form.Group>


<Form.Group className="mb-3 group">      
  <Form.Control
    type="number"
    name="locationCount"
    min="0"
    value={formData.locationCount}
    onChange={handleChange}
    required
    placeholder=" "
  />
  <span className="highlight"></span>
  <span className="bar"></span>
  <Form.Label>Total Business Location Count</Form.Label>
</Form.Group>

</div>

<div className="row">

<Form.Group className="mb-3 group">      
  <Form.Control
    type="number"
    name="hoursOfOperation"
    value={formData.hoursOfOperation}
    onChange={handleChange}
    min="0"
    required
    placeholder=" "
  />
  <span className="highlight"></span>
  <span className="bar"></span>
  <Form.Label>Total Hours of Operation</Form.Label>
</Form.Group>

<Form.Group className="mb-3 group">      
  <Form.Control
    type="number"
    name="specialHours"
    value={formData.specialHours}
    min="0"
    onChange={handleChange}
    required
    placeholder=" "
  />
  <span className="highlight"></span>
  <span className="bar"></span>
  <Form.Label>Business Special Hours</Form.Label>
</Form.Group>
</div>

 
<Form.Group className="mb-3 group">      
  <Form.Control
  className="tarea"
    as="textarea"
    name="businessDescription"
    value={formData.businessDescription}
    onChange={handleChange}
    required
    placeholder=" "
  />
  <span className="highlight"></span>
  <span className="bar"></span>
  <Form.Label>Business Description</Form.Label>
</Form.Group>

<div className={`step cntrlbtns ${currentStep === 0 ? "flex-reverse" : ""}`}>
                <Button
                  type="button"
                  className={`step action-button bg-gray-500 text-white px-4 py-2 rounded ${currentStep === 0 ? "dnone" : ""}`}
                  onClick={handlePrevious}
                  >
                  Previous
                </Button>
                <Button
                  type="button"
                  className="action-button bg-blue-500 text-white px-4 py-2 rounded"
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
             

              <ServiceInterView  onSelectionChange={handleServiceSelection} />
              
              {/* ... */}
              <div className="flex justify-between mt-4">
                <Button
                  type="button"
                  className="action-button bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={handlePrevious}
                >
                  Previous
                </Button>
                <Button
                  type="button"
                  className="action-button bg-blue-500 text-white px-4 py-2 rounded"
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
             
              {/* Location Fields */}
              {/* ... */}
              
<div className="row">
                  <Form.Group className="mb-3 group">
                    <Form.Control
                      type="text"
                      name="fullAddress"
                      value={Address}
                      onChange={(e) => {setAddress(e.target.value)}}
                      required
                      placeholder=" "
                    />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <Form.Label>Full Address</Form.Label>
                  </Form.Group>
                  <Form.Group className="mb-3 group">
                    <Form.Control
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      placeholder=" "
                    />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <Form.Label>City</Form.Label>
                  </Form.Group>
                </div>

                <div className="row">
                  <Form.Group className="mb-3 group">
                    <Form.Control
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      placeholder=" "
                    />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <Form.Label>State</Form.Label>
                  </Form.Group>
                  <Form.Group className="mb-3 group">
                    <Form.Control
                      type="zipcode"
                      name="zipcode"
                      value={formData.zipcode}
                      onChange={(handleChange)}
                      required
                      placeholder=" "
                    />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <Form.Label>Zipcode</Form.Label>
                  </Form.Group>
                  </div>
              
      {/* Map Component */}
      <MapWithMarker addressInput={finaladdress} addressfnc={submitAddress}/>
              <div className="flex justify-between mt-4">
                <Button
                  type="button"
                  className="action-button bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={handlePrevious}
                >
                  Previous
                </Button>
                <Button
                  type="submit"
                  className="action-button bg-green-500 text-white px-4 py-2 rounded"
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
