"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setStorage } from "@/app/utils/helper";

interface ServiceCategory {
  name: string;
  subcategories: Subcategory[];
}

interface Subcategory {
  name: string;
  services: string[];
}

interface ServiceCategory {
    name: string;
    subcategories: Subcategory[];
  }
  
  interface Subcategory {
    name: string;
    services: string[];
  }
  
const autoServices: ServiceCategory[] = [
    {
      name: "Auto Repair",
      subcategories: [
        {
          name: "Brakes",
          services: [
            "Brake Inspection",
            "Brake Pad Replacement",
            "Brake Rotor Replacement",
            "Brake Fluid Flush",
            "Brake Caliper Repair",
          ],
        },
        {
          name: "Electrical",
          services: [
            "Battery Testing and Replacement",
            "Alternator Repair",
            "Starter Repair",
            "Wiring and Electrical System Diagnosis",
            "Lighting System Repair",
          ],
        },
        {
          name: "Engine",
          services: [
            "Engine Diagnostics",
            "Engine Tune-Up",
            "Engine Overhaul",
            "Cylinder Head Repair",
            "Timing Belt Replacement",
          ],
        },
        {
          name: "Exhaust",
          services: [
            "Exhaust System Inspection",
            "Muffler Replacement",
            "Catalytic Converter Replacement",
            "Exhaust Pipe Repair",
            "Emission System Repair",
          ],
        },
        {
          name: "Heating & Air Conditioning",
          services: [
            "HVAC System Inspection",
            "AC Recharge and Repair",
            "Heater Core Replacement",
            "Blower Motor Repair",
            "Thermostat Replacement",
          ],
        },
        {
          name: "Maintenance",
          services: [
            "Oil Change and Filter Replacement",
            "Fluid Flush and Replacement",
            "Tire Rotation and Balancing",
            "Spark Plug Replacement",
            "Air Filter Replacement",
          ],
        },
        {
          name: "Steering & Suspension",
          services: [
            "Wheel Alignment",
            "Power Steering System Repair",
            "Shock Absorber Replacement",
            "Strut Replacement",
            "Steering Rack Repair",
          ],
        },
        {
          name: "Transmission & Drivetrain",
          services: [
            "Transmission Fluid Change",
            "Clutch Repair and Replacement",
            "Differential Service",
            "Driveshaft Repair",
            "CV Joint Replacement",
          ],
        },
      ],
    },
  
    {
      name: "Auto Body",
      subcategories: [
        {
          name: "Painting and Refinishing",
          services: [
            "Full Vehicle Repainting",
            "Spot Painting",
            "Paint Chip Repair",
            "Clear Coat Restoration",
            "Custom Paint Jobs",
          ],
        },
        {
          name: "Dent Repair",
          services: [
            "Paintless Dent Removal (PDR)",
            "Dent Filling and Sanding",
            "Dent Pulling",
            "Dent Removal with Heat and Pressure",
          ],
        },
        {
          name: "Collision Repair",
          services: [
            "Frame Straightening",
            "Bumper Repair and Replacement",
            "Fender Repair and Replacement",
            "Panel Alignment",
            "Structural Repair",
          ],
        },
        {
          name: "Scratch and Chip Repair",
          services: [
            "Scratch Buffing and Polishing",
            "Touch-Up Paint Application",
            "Scratch Filling and Sanding",
            "Clear Coat Repair",
          ],
        },
        {
          name: "Rust Repair",
          services: [
            "Rust Removal",
            "Surface Rust Treatment",
            "Patch Panel Installation",
            "Rust Prevention Coatings",
          ],
        },
        {
          name: "Glass Repair and Replacement",
          services: [
            "Windshield Repair",
            "Windshield Replacement",
            "Side Window Replacement",
            "Rear Window Replacement",
          ],
        },
        {
          name: "Customization and Restoration",
          services: [
            "Custom Body Kits Installation",
            "Vehicle Restoration",
            "Vinyl Wrapping",
            "Decal Application",
            "Hydrographic Dipping",
          ],
        },
      ],
    },
  
    {
      name: "Auto Detailing",
      subcategories: [
        {
          name: "Exterior Detailing",
          services: [
            "Hand Wash and Dry",
            "Clay Bar Treatment",
            "Paint Decontamination",
            "Paint Correction (Polishing and Buffing)",
            "Headlight Restoration",
            "Trim Restoration"
          ],
        },
        {
          name: "Interior Detailing",
          services: [
            "Vacuuming and Shampooing",
            "Stain Removal",
            "Leather Cleaning and Conditioning",
            "Dashboard and Console Cleaning",
            "Odor Removal",
            "Upholstery Cleaning"
          ],
        },
        {
          name: "Engine Bay Detailing",
          services: [
            "Engine Degreasing",
            "Engine Compartment Cleaning",
            "Dressing and Protecting Engine Components",
            "Removing Grease and Grime Buildup",
          ],
        },
        {
          name: "Wheel and Tire Detailing",
          services: [
            "Tire Cleaning and Dressing",
            "Rim Cleaning and Polishing",
            "Wheel Well Cleaning",
            "Tire Shine Application",
          ],
        },
        {
          name: "Glass and Mirror Detailing",
          services: [
            "Window Cleaning (Inside and Outside)",
            "Mirror Polishing",
            "Water Spot Removal",
            "Glass Sealant Application",
          ],
        },
        {
          name: "Trim and Plastic Detailing",
          services: [
            "Plastic Trim Cleaning and Restoration",
            "Door Jam Cleaning",
            "Rubber Trim Conditioning",
            "Plastic Trim Dressing",
          ],
        },
        {
          name: "Paint Protection",
          services: [
            "Waxing",
            "Sealant Application",
            "Ceramic Coating",
            "Paint Protection Film (PPF) Installation",
          ],
        },
        {
          name: "Specialized Detailing Services",
          services: [
            "Convertible Top Cleaning and Conditioning",
            "Vinyl and Plastic Restoration",
            "Metal Polishing (Chrome, Aluminum, StainlessSteel)",
            "Pet Hair Removal",
          ],
        },
      ],
    },
  
    {
      name: "Wheel and Tire",
      subcategories: [
        {
          name: "Wheel Lug Stud Replacement",
          services: [
            "Removal of damaged lug studs",
            "Installation of new lug studs",
            "Torquing lug nuts to manufacturer specifications"
          ],
        },
        {
          name: "Tire Pressure Monitoring Sensor (TPMS) Replacement",
          services: [
            "Diagnosis of faulty TPMS sensors",
            "Replacement of malfunctioning TPMS sensors",
            "Calibration and programming of new sensors",
          ],
        },
        {
          name: "Tire Pressure Light Diagnosis",
          services: [
            "Inspection of tire pressure monitoring system",
            "Identification of issues causing the tire pressure warning light",
            "Recommendations for necessary repairs or adjustments",
          ],
        },
        {
          name: "Tire and Wheel Assembly Rotate and Balance",
          services: [
            "Removal of tires from wheels",
            "Rotation of tires to ensure even wear",
            "Balancing of wheels to eliminate vibrations",
            "Reinstallation of tires onto wheels",
          ],
        },
        {
          name: "Tire Repair - Fix Flat",
          services: [
            "Inspection of tire for punctures or leaks",
            "Patching or plugging punctured tire",
            "Reinflation of tire to proper pressure",
            "Testing for leaks and ensuring proper sealing",
          ],
        },
        {
          name: "Tire Rotation",
          services: [
            "Moving tires to different positions on the vehicle",
            "Promoting even tire wear and extending tire life",
            "Adjustment of tire pressure as needed",
            "Torquing lug nuts to specification after rotation",
          ],
        },
        {
          name: "Wheel Alignment",
          services: [
            "Inspection of wheel alignment angles (toe, camber, caster)",
            "Adjustment of alignment angles to manufacturer specifications",
            "Correction of steering pull or drif",
            "Verification of proper alignment after adjustment",
          ],
        },
      ],
    },
  ];
  
const ServiceItem1 = () => {
  const router = useRouter();
  const [currentView, setCurrentView] = useState<number>(0); // 0: categories, 1: subcategories, 2: services
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory | null>(null);

  const handleCategoryClick = (category: ServiceCategory) => {
    setSelectedCategory(category);
    setCurrentView(1);
  };

  const handleSubcategoryClick = (subcategory: Subcategory) => {
    setSelectedSubcategory(subcategory);
    setCurrentView(2);
  };

  const handleBack = () => {
    if (currentView === 2) {
      setCurrentView(1);
      setSelectedSubcategory(null);
    } else if (currentView === 1) {
      setCurrentView(0);
      setSelectedCategory(null);
    }
  };

  return (
    <div className="relative overflow-hidden">
      {currentView > 0 && (
        <button
          onClick={handleBack}
          className="z-10 text-blue-500 hover:underline"
        >
          &lt; Back
        </button>
      )}
      <div
        className="flex transition-transform duration-300 h-full"
        style={{ transform: `translateX(-${currentView * 100}%)` }}
      >
        {/* Categories View */}
        <div className="w-full flex-shrink-0">
          <h1 className="text-2xl font-bold mb-4">Categories</h1>
          {autoServices.map((category, index) => (
            <div
              key={index}
              className="p-4 border-b border-gray-300 cursor-pointer hover:bg-gray-100"
              onClick={() => handleCategoryClick(category)}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg text-gray-800">{category.name}</span>
                <svg
                  className="w-5 h-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="currentColor"
                    d="M26.5 23.95L16.6 14.05L18.75 11.9L30.8 23.95L18.75 36L16.6 33.85L26.5 23.95Z"
                    strokeWidth={1}
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Subcategories View */}
        <div className="w-full flex-shrink-0">
          {selectedCategory && (
            <>
              <h1 className="text-2xl font-bold mb-4">{selectedCategory.name}</h1>
              {selectedCategory.subcategories.map((subcategory, index) => (
                <div
                  key={index}
                  className="p-4 border-b border-gray-300 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSubcategoryClick(subcategory)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg text-gray-800">{subcategory.name}</span>
                    <svg
                      className="w-5 h-5 text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 48 48"
                    >
                      <path
                        fill="currentColor"
                        d="M26.5 23.95L16.6 14.05L18.75 11.9L30.8 23.95L18.75 36L16.6 33.85L26.5 23.95Z"
                        strokeWidth={1}
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Services View */}
        <div className="w-full flex-shrink-0">
          {selectedSubcategory && (
            <>
              <h1 className="text-2xl font-bold mb-4">{selectedSubcategory.name}</h1>
              {selectedSubcategory.services.map((service, index) => (
                <div
                  key={index}
                  className="p-4 border-b border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setStorage('service-services', selectedCategory?.name + '-' + selectedSubcategory.name + '-' + service)
                    router.replace("/get-quote/service-request/service-note")
                  }}
                >
                  {service}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceItem1;
