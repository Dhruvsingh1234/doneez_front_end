import React, { useEffect, useRef, useState } from "react";
import { Button, Spinner } from "react-bootstrap";

interface UserLocationMapProps {
  addressInput?: {
    fullAddress?: string;
  };
  addressfnc: () => void; // submitAddress function
}

const UserLocationMap: React.FC<UserLocationMapProps> = ({ addressInput, addressfnc }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [verifiedAddress, setVerifiedAddress] = useState<string>("");
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [latestAddress, setLatestAddress] = useState<string>("");

  const googleMapsApiKey = "AIzaSyBq-_LwbssQJbaN_JNmLp7ZjKB-0Kd4gSQ"; // Securely store your API key

  useEffect(() => {
    if ((window as any).google) {
      initializeMap();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}`;
    script.async = true;
    script.defer = true;
    script.onload = initializeMap;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  const initializeMap = () => {
    if (mapRef.current && (window as any).google?.maps) {
      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 37.0902, lng: -95.7129 }, // Default to USA
        zoom: 4,
      });
      setMapInstance(map);
    }
  };

  const markersetter = async (address: string) => {
    if (!mapInstance || !address) return;

    setLoading(true); // Start loading

    const geocoder = new google.maps.Geocoder();

    try {
      const response = await geocoder.geocode({ address });

      if (response.results.length > 0) {
        const result = response.results[0];
        const location = result.geometry.location;

        mapInstance.setCenter(location);
        mapInstance.setZoom(13);

        // Remove existing marker if present
        if (marker) {
          marker.setMap(null);
        }

        // Create a new marker
        const newMarker = new google.maps.Marker({
          position: location,
          map: mapInstance,
          title: result.formatted_address,
          animation: google.maps.Animation.DROP, // Smooth drop animation
        });

        setMarker(newMarker);

        // Info window with address
        const infoWindow = new google.maps.InfoWindow({
          content: `<strong>${result.formatted_address}</strong>`,
        });

        newMarker.addListener("click", () => infoWindow.open(mapInstance, newMarker));
        infoWindow.open(mapInstance, newMarker);

        setVerifiedAddress(result.formatted_address);
        setIsVerified(true);
      } else {
        setVerifiedAddress("Address not found.");
        setIsVerified(false);
      }
    } catch (error) {
      console.error("Error verifying address:", error);
      setVerifiedAddress("Error verifying address.");
      setIsVerified(false);
    }

    setLoading(false); // Stop loading
  };

  useEffect(() => {
    if (addressInput?.fullAddress) {
      markersetter(addressInput.fullAddress);
    }
  }, [addressInput?.fullAddress]);

  const handleUpdateAddress = async () => {
    addressfnc(); // This updates formData.fullAddress
  };

  return (
    <>
      <div style={{display:'flex',justifyContent:'center',marginBottom:'2rem'}} >
                  
                       
      <Button
        className="action-button bg-green-200 text-white px-4 py-2 rounded"
        onClick={handleUpdateAddress} // Call function that updates latestAddress first
        style={{ background: "#0582fd", display: "flex", alignItems: "center", gap: "10px" }}
        disabled={loading} // Disable button when loading
      >
        {loading && <Spinner animation="border" size="sm" />} {/* Show spinner when loading */}
        Update Address
      </Button>

      </div>

      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        {isVerified ? (
          <span style={{ color: "green", fontWeight: "bold" }}>
            ✅ Your address is verified: {verifiedAddress}
          </span>
        ) : (
          <span style={{ color: "#F92F60", fontWeight: "bold" }}>
            ❌ Your address is not verified. Please enter a correct address.
          </span>
        )}
      </div>

      <div
        style={{
          position: "relative",
          height: "100vh",
          width: "100%",
          marginBottom: "4rem",
        }}
      >
        <div ref={mapRef} style={{ height: "100%", width: "92%", margin: "auto" }} />
      </div>
    </>
  );
};

export default UserLocationMap;