import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { WARD_DATA } from '../data/wards'
import { Search, MapPin } from 'lucide-react'

// Fix for Leaflet default marker icons in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Pune Coordinates
const PUNE_CENTER = [18.5204, 73.8567];

const MapPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedWard, setSelectedWard] = useState(null)

  const filteredWards = WARD_DATA.filter(w => 
    w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.id.toString().includes(searchQuery)
  );

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] md:h-[calc(100vh-72px)] overflow-hidden">
      {/* Search Header */}
      <div className="p-4 bg-white border-b border-gray-200 z-10">
        <div className="relative max-w-2xl mx-auto">
          <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search your area / locality (e.g. Baner)" 
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 relative">
        <MapContainer center={PUNE_CENTER} zoom={12} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* MVP: Just showing markers for some wards since we don't have geojson polygons */}
          {WARD_DATA.slice(0, 10).map((ward, idx) => (
            <Marker 
              key={ward.id} 
              position={[PUNE_CENTER[0] + (Math.random() - 0.5) * 0.1, PUNE_CENTER[1] + (Math.random() - 0.5) * 0.1]}
            >
              <Popup>
                <div className="p-1">
                  <h3 className="font-bold text-secondary">Ward {ward.id}: {ward.name}</h3>
                  <div className="mt-2 space-y-1">
                    <p className="text-xs font-bold text-gray-500 uppercase">Nagarsevaks:</p>
                    {ward.corporators.map((corp, i) => (
                      <p key={i} className="text-xs">{corp.name} ({corp.party})</p>
                    ))}
                  </div>
                  <div className="mt-3 pt-2 border-t border-gray-100 flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400">Open Complaints</span>
                      <span className="font-bold text-red-500">24</span>
                    </div>
                    <Link to="/report" className="bg-primary text-white text-[10px] font-bold px-3 py-1.5 rounded-lg">
                      Report Here
                    </Link>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Legend */}
        <div className="absolute bottom-6 right-6 bg-white p-3 rounded-xl shadow-lg border border-gray-100 z-[1000] text-[10px]">
          <h5 className="font-bold mb-2">Complaint Density</h5>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span>Low (&lt;10)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-amber-500 rounded-full" />
              <span>Medium (10-30)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <span>High (&gt;30)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MapPage
