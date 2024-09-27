'use client'
import React, { useEffect, useState, useRef } from "react";
import ServiceHeader from "@/app/headers/ServiceHeader"

export default function ServiceLocation() {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [suggestions, setSuggestions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  
    useEffect(() => {
      let autocompleteService: google.maps.places.AutocompleteService | undefined;
  
      if (typeof window !== 'undefined' && window.google) {
        autocompleteService = new google.maps.places.AutocompleteService();
      }
      
      // React's onChange handler will handle input changes
    }, []);
  
    // Use React's onChange event handler to handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      if (window.google && query.length > 0) {
        const autocompleteService = new google.maps.places.AutocompleteService();
        autocompleteService.getPlacePredictions(
          { input: query, types: ['geocode'], componentRestrictions: { country: 'us' } },
          (predictions, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
              setSuggestions(predictions);
            } else {
              setSuggestions([]);
            }
          }
        );
      } else {
        setSuggestions([]);
      }
    };
  
    const handleSuggestionClick = (suggestion: google.maps.places.AutocompletePrediction) => {
      if (inputRef.current) {
        inputRef.current.value = suggestion.description;
        setSuggestions([]); // Clear suggestions when a place is selected
      }
    };

    return (
        <div className="min-h-svh bg-[#f4f6fa] min-w-full">
            <ServiceHeader/>
            <div className="max-w-[1024px] w-full mx-auto px-4 py-8 max-sm:bg-white">

                <div className="flex flex-row items-center pb-4">
                    <button className="max-md:hidden flex items-center justify-center shadow-[0_2px_3px_0_#dce0e6] w-[40px] h-[40px] rounded-[50%] bg-white mr-4 text-[#788391]
                        active:border-solid active:border-red-300 active:border-[2px]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="Arrow-Left--Streamline-Feather"
                            className="w-5 h-5">
                            <path d="M11.76 4.850064000000001C11.628816 4.927944 4.901184000000001 11.660016 4.8426 11.772C4.775208 11.90088 4.775184 12.099072 4.842576 12.228C4.905768 12.348912 11.665992000000001 19.10628 11.781648 19.164144C11.91024 19.228512 12.158016 19.206072000000002 12.284136 19.118664C12.403824 19.035743999999998 12.504216000000001 18.848328 12.503471999999999 18.709296C12.502272 18.487344 12.573192 18.563328 9.461112 15.450000000000001L6.5162640000000005 12.504 12.661416 12.504L18.806568 12.504 18.928584 12.443208C19.004808 12.405216000000001 19.076352 12.345216 19.119287999999997 12.283248C19.18032 12.195192 19.188 12.163512 19.188 12C19.188 11.836488000000001 19.18032 11.804808000000001 19.119287999999997 11.716752C19.076352 11.654784 19.004808 11.594784 18.928584 11.556792L18.806568 11.496 12.661416 11.496L6.5162640000000005 11.496 9.461112 8.55C12.573192 5.436672 12.502272 5.512656 12.503471999999999 5.290704C12.504264 5.142744 12.402743999999998 4.960944 12.27036 4.873248C12.175128 4.810176 12.137832 4.8000240000000005 12.001896 4.800096C11.885088 4.800168 11.822136 4.8131520000000005 11.76 4.850064000000001" stroke="none" fill="currentColor" fillRule="evenodd" />
                        </svg>
                    </button>
                    <h1 className="text-[32px] font-bold">Choose Services.</h1>
                </div>

                <div className="flex flex-wrap shadow-[0_2px_4px_0_#d9dce9] rounded-[10px] bg-white">
                    <div className="w-2/3 px-4">
                        <div className="px-4 py-8">
                            <p className="text-[#616a76] mb-6 text-[14px]">To get started, please provide your location. We will reach out to participating automotive service professionals near you and deliver price estimates for the service you are requesting. </p>
                            <div className="mb-8">
                                <input placeholder="City, State, or ZIP code" ref={inputRef} type="search" onChange={handleInputChange}
                                className="px-6 py-3 text-[16px] leading-6 text-[#333] w-full h-[calc(2.5rem + 2px)] bg-white border-[#c5ccd3] border-[1px] border-solid rounded-[3px]
                                font-normal transition-[border-color,box-shadow] duration-150 ease-in-outo outline-none focus:border-red-400"/>

                                {suggestions.length > 0 && (
                                    <ul className="absolute z-10 bg-white border border-gray-200 mt-1 w-full rounded-md shadow-lg max-h-60 overflow-y-auto">
                                    {suggestions.map((suggestion) => (
                                        <li
                                        key={suggestion.place_id}
                                        onClick={() => handleSuggestionClick(suggestion)}
                                        className="p-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200 last:border-b-0"
                                        >
                                        <strong>{suggestion.structured_formatting.main_text}</strong>{' '}
                                        <small className="text-gray-500">{suggestion.structured_formatting.secondary_text}</small>
                                        </li>
                                    ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="w-1/3 px-[8px] py-[40px] relative max-md:hidden">
                        <div className="w-[1px] absolute top-10 left-[-1.2rem] bottom-10 bg-[#e5e8ed]"></div>

                        <h4 className="text-[#e83c79] text-[20px] mb-2">Where is Openbay available?</h4>
                        <p className="pb-4 text-[14px] text-[#616a76]"> Openbay is available nationwide. We need your ZIP code in order to locate nearby shops and generate accurate price estimates. </p>
                    </div>
                </div>
            </div>
        </div>
    )
}