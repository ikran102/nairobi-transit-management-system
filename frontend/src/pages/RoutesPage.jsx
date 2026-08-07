import React, { useState, useEffect } from 'react';
import MapView from '../components/MapView';

export default function Routes() {
  const [searchQuery, setSearchQuery] = useState("");
const [activeRoute, setActiveRoute] = useState(null);
const [routes, setRoutes] = useState([]);
const [loading, setLoading] = useState(true);

  const cbdCoordinates = { lat: -1.2833, lng: 36.8233 };

  const popularRoutes = [
    { 
      id: 1, 
      number: '102', 
      from: 'CBD', 
      to: 'Westlands', 
      color: 'blue', 
      lightBg: '#eff6ff',
      center: { lat: -1.2675, lng: 36.8085 },
      zoom: 14,
      eta: '4 mins',
      fare: 'KSh 50',
      path: [cbdCoordinates, { lat: -1.2750, lng: 36.8150 }, { lat: -1.2675, lng: 36.8085 }]
    },
    { 
      id: 2, 
      number: '111', 
      from: 'CBD', 
      to: 'Ngong', 
      color: 'purple', 
      lightBg: '#f3e8ff',
      center: { lat: -1.3592, lng: 36.6566 },
      zoom: 11,
      eta: '12 mins',
      fare: 'KSh 100',
      path: [cbdCoordinates, { lat: -1.3000, lng: 36.7800 }, { lat: -1.3300, lng: 36.7000 }, { lat: -1.3592, lng: 36.6566 }]
    },
    { 
      id: 3, 
      number: '46W', 
      from: 'CBD', 
      to: 'Kawangware', 
      color: 'green', 
      lightBg: '#ecfdf5',
      center: { lat: -1.2858, lng: 36.7564 },
      zoom: 13,
      eta: '7 mins',
      fare: 'KSh 70',
      path: [cbdCoordinates, { lat: -1.2840, lng: 36.8000 }, { lat: -1.2910, lng: 36.7800 }, { lat: -1.2858, lng: 36.7564 }]
    },
    { 
      id: 4, 
      number: '44', 
      from: 'CBD', 
      to: 'Roysambu (USIU)', 
      color: 'orange', 
      lightBg: '#fef3c7',
      center: { lat: -1.2215, lng: 36.8795 },
      zoom: 13,
      eta: '5 mins',
      fare: 'KSh 80',
      path: [cbdCoordinates, { lat: -1.2500, lng: 36.8500 }, { lat: -1.2300, lng: 36.8700 }, { lat: -1.2215, lng: 36.8795 }]
    },
    { 
      id: 5, 
      number: '237', 
      from: 'CBD', 
      to: 'Thika', 
      color: 'crimson', 
      lightBg: '#fce7f3',
      center: { lat: -1.0333, lng: 37.0692 },
      zoom: 11,
      eta: '15 mins',
      fare: 'KSh 150',
      path: [cbdCoordinates, { lat: -1.2000, lng: 36.9000 }, { lat: -1.1000, lng: 37.0000 }, { lat: -1.0333, lng: 37.0692 }]
    },
    { 
      id: 6, 
      number: '34B', 
      from: 'CBD', 
      to: 'Embakasi', 
      color: 'indigo', 
      lightBg: '#e0e7ff',
      center: { lat: -1.3233, lng: 36.9144 },
      zoom: 13,
      eta: '9 mins',
      fare: 'KSh 70',
      path: [cbdCoordinates, { lat: -1.3000, lng: 36.8600 }, { lat: -1.3150, lng: 36.8900 }, { lat: -1.3233, lng: 36.9144 }]
    },
    { 
      id: 7, 
      number: '125', 
      from: 'CBD', 
      to: 'Rongai', 
      color: 'teal', 
      lightBg: '#ccfbf1',
      center: { lat: -1.3964, lng: 36.7411 },
      zoom: 12,
      eta: '10 mins',
      fare: 'KSh 100',
      path: [cbdCoordinates, { lat: -1.3200, lng: 36.8000 }, { lat: -1.3500, lng: 36.7600 }, { lat: -1.3964, lng: 36.7411 }]
    }
  ];
  useEffect(() => {
  fetchRoutes();
}, []);

const fetchRoutes = async () => {
  try {
    const response = await fetch("http://127.0.0.1:5000/api/routes");
    const data = await response.json();

    setRoutes(data);
    setLoading(false);
  } catch (err) {
    console.log(err);
    setLoading(false);
  }
};

  const filteredRoutes = popularRoutes.filter(route => 
    route.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
    route.number.includes(searchQuery) ||
    route.from.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', margin: 0, padding: 0, fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#f1f5f9', overflow: 'hidden' }}>
      
      <aside style={{ width: '400px', height: '100%', backgroundColor: 'white', display: 'flex', flexDirection: 'column', borderRight: '1px solid #e2e8f0', boxShadow: '5px 0 15px rgba(0,0,0,0.05)', zIndex: 10, flexShrink: 0 }}>
        
        <div style={{ padding: '24px', background: 'linear-gradient(135deg, navy 0%, indigo 50%, purple 100%)', color: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '900', letterSpacing: '-0.5px' }}>NairobiTransit</h1>
            </div>
            {activeRoute && (
              <button 
                onClick={() => setActiveRoute(null)}
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', border: 'none', color: 'white', padding: '6px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}
              >
                Clear View
              </button>
            )}
          </div>
          <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#e0e7ff', fontWeight: '500' }}>Real-time route discovery & map planner</p>
        </div>

        <div style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
          
          {activeRoute && (
            <div style={{ backgroundColor: activeRoute.lightBg, border: `1px dashed ${activeRoute.color}`, borderRadius: '16px', padding: '16px', marginBottom: '20px' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '800', color: '#1e293b' }}>Next Matatu: <span style={{ color: activeRoute.color }}>{activeRoute.eta}</span></div>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600', marginTop: '2px' }}>Estimated Fare: {activeRoute.fare} • Route Active</div>
              </div>
            </div>
          )}

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.5px', marginBottom: '8px' }}>Where are you heading?</label>
            <input
              type="text"
              placeholder="Search destination (e.g. Westlands, Ngong)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', boxSizing: 'border-box', borderRadius: '12px', border: '2px solid #e2e8f0', backgroundColor: '#f8fafc', padding: '14px', fontSize: '14px', fontWeight: '500', outline: 'none' }}
            />
          </div>

          <div>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.5px' }}>Popular Commutes</h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filteredRoutes.length > 0 ? (
                filteredRoutes.map(route => {
                  const isSelected = activeRoute?.id === route.id;
                  return (
                    <button 
                      key={route.id}
                      onClick={() => setActiveRoute(route)}
                      style={{ 
                        width: '100%', 
                        border: isSelected ? `2px solid ${route.color}` : '1px solid #e2e8f0', 
                        borderRadius: '16px', 
                        backgroundColor: 'white', 
                        padding: '16px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between', 
                        cursor: 'pointer', 
                        textAlign: 'left', 
                        boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.08)' : '0 2px 4px rgba(0,0,0,0.02)',
                        transform: isSelected ? 'scale(1.01)' : 'scale(1)',
                        transition: 'all 0.2s ease-in-out'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%' }}>
                        <div style={{ width: '48px', height: '48px', backgroundColor: route.color, color: 'white', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '14px', flexShrink: 0 }}>
                          <span style={{ fontSize: '8px', opacity: 0.8, textTransform: 'uppercase' }}>No.</span>
                          {route.number}
                        </div>
                        
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: '700', fontSize: '14px', color: '#1e293b' }}>Matatu Line</div>
                          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px', fontWeight: '600' }}>
                            {route.from} <span style={{ color: route.color }}>➔</span> <span style={{ padding: '2px 6px', borderRadius: '4px', backgroundColor: route.lightBg, color: route.color }}>{route.to}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })
              ) : (
                <div style={{ textAlgin: 'center', padding: '24px', color: '#94a3b8', fontSize: '13px', fontWeight: '500' }}>
                  No active transit routes found matching your criteria.
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      <main style={{ flex: 1, height: '100%', position: 'relative' }}>
        <MapView activeRoute={activeRoute} cbdCoordinates={cbdCoordinates} />
      </main>

    </div>
  );
}