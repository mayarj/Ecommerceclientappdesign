import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

// Fix for default marker icon
const icon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapPickerProps {
  onLocationSelect: (lat: number, lng: number, address: string) => void;
  initialLat?: number;
  initialLng?: number;
}

function LocationMarker({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) {
  const [position, setPosition] = useState<[number, number] | null>(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      onLocationSelect(lat, lng);
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={icon} />
  );
}

export default function MapPicker({ onLocationSelect, initialLat = 33.5138, initialLng = 36.2765 }: MapPickerProps) {
  const handleLocationSelect = async (lat: number, lng: number) => {
    // Mock reverse geocoding - in production, use a real geocoding service
    // Generate a complete address with all components based on coordinates
    
    const streetNames = [
      'Al-Maliki Street', 'Al-Hamra Street', 'Al-Mazzeh Street', 
      'Al-Shahbandar Street', 'Al-Jalaa Street', 'Al-Qasr Street',
      'Al-Baramkeh Street', 'Al-Salihiyah Street', 'Al-Midan Street',
      'Al-Kassa Street', 'Al-Jisr Al-Abyad Street', 'Al-Mezzeh Highway'
    ];
    
    const districts = [
      'Al-Mazzeh', 'Al-Maliki', 'Al-Hamra', 'Al-Shahbandar', 
      'Al-Salihiyah', 'Al-Midan', 'Al-Kassa', 'Al-Baramkeh',
      'Al-Jisr Al-Abyad', 'Al-Qanawat', 'Al-Qadam', 'Al-Sayyida Zainab'
    ];
    
    const buildingNumbers = Array.from({ length: 50 }, (_, i) => i + 1);
    
    // Use coordinates to generate consistent but varied addresses
    const coordHash = Math.floor((lat * 1000 + lng * 1000) % 10000);
    const streetIndex = coordHash % streetNames.length;
    const districtIndex = Math.floor(coordHash / 100) % districts.length;
    const buildingIndex = coordHash % buildingNumbers.length;
    
    const streetName = streetNames[streetIndex];
    const district = districts[districtIndex];
    const buildingNumber = buildingNumbers[buildingIndex];
    const city = 'Damascus';
    const country = 'Syria';
    
    // Format: Building Number, Street Name, District, City, Country
    const address = `${buildingNumber} ${streetName}, ${district}, ${city}, ${country}`;
    
    onLocationSelect(lat, lng, address);
  };

  return (
    <div className="rounded-lg overflow-hidden border-2 border-emerald-200 shadow-md transition-all duration-300">
      <MapContainer
        center={[initialLat, initialLng]}
        zoom={13}
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker onLocationSelect={handleLocationSelect} />
      </MapContainer>
    </div>
  );
}
