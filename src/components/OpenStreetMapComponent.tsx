import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet
const icon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

const OpenStreetMapComponent = () => {
  // Royal Mosaic Furniture coordinates
  const position: [number, number] = [25.237931330051975, 55.26911647415524];
  
  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden">
      <MapContainer 
        center={position} 
        zoom={16} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={icon}>
          <Popup>
            Royal Mosaic Furniture<br />
            رويال موزاييك للأثاث
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default OpenStreetMapComponent;