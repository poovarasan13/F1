import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  BatteryMedium, 
  Fuel, 
  AlertTriangle, 
  Home, 
  LineChart, 
  History, 
  Settings 
} from 'lucide-react';

const F1Logo = () => (
  <svg viewBox="0 0 100 25" fill="none" className="h-4 w-auto text-danger" style={{ minWidth: '40px' }}>
    <path d="M0 24.225h16.2l3.4-10.425h-10l-1.4 4.35h6.7l-1.4 4.35H2.3l6.5-20.25h17l2.8-8.25H0v30.225z" fill="currentColor" />
    <path d="M29.5 0l-8.5 24.225h8.8L38.3 0h-8.8z" fill="currentColor"/>
    <path d="M42 0l-8.5 24.225h8.8L50.8 0H42z" fill="currentColor" />
  </svg>
);

const EngineIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <path d="M4 10v4h2v3h2v-3h8v3h2v-3h2v-4H4z" />
    <path d="M6 10V7h12v3" />
    <path d="M8 7V4h2v3M14 7V4h2v3" />
    <path d="M2 12h2M20 12h2" />
  </svg>
);

const CheckeredFlagSVG = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M4 2v20h2v-8h3v3h3v-3h3v3h3v-3h4v-3h-4v-3h4v-3h-4V5h-3v3h-3V5H9v3H6V5H4zm5 3v3H6V8h3zm6 0v3h-3V8h3zm-3 6v3H9v-3h3zm6 0v3h-3v-3h3z" />
  </svg>
);

const SpeedSegments = ({ value, max }) => {
  const activeCount = Math.floor((value / max) * 15);
  return (
    <div className="flex gap-1 mt-2 w-full">
      {Array.from({ length: 15 }).map((_, i) => (
        <div 
          key={i} 
          className={`h-2 flex-1 rounded-[1px] ${i < activeCount ? 'bg-success shadow-[0_0_4px_#22C55E]' : 'bg-[#1f1f1f]'}`}
        />
      ))}
    </div>
  );
};

const TyreBox = ({ label, temp, status, align }) => {
  const isLeft = align === 'left';
  let colorClass = 'text-success';
  let borderColor = 'border-success';
  if (temp >= 70) { colorClass = 'text-danger'; borderColor = 'border-danger'; }
  else if (temp >= 60) { colorClass = 'text-warning'; borderColor = 'border-warning'; }
  
  return (
    <div className={`bg-black border border-border rounded-md p-3 min-w-[120px] flex flex-col items-center justify-center ${isLeft ? `border-l-4 ${borderColor}` : `border-r-4 ${borderColor}`}`}>
      <div className="text-white text-[10px] font-bold tracking-wider mb-1">{label}</div>
      <div className={`${colorClass} text-3xl font-bold mb-1 leading-none`}>{temp}<span className="text-xl">°C</span></div>
      <div className={`${colorClass} text-[10px] font-bold tracking-widest`}>{status}</div>
    </div>
  );
};

export default function App() {
  const [time, setTime] = useState(new Date());
  const [speed, setSpeed] = useState(128);
  const [tyres, setTyres] = useState({ FL: 58, FR: 61, RL: 55, RR: 57 });
  const [motorTemp, setMotorTemp] = useState(47);
  const [battery, setBattery] = useState(11.8);
  const [fuel, setFuel] = useState(65);
  const [accel, setAccel] = useState({ x: 1.2, y: 0.4, z: 9.7 });
  const [gyro, setGyro] = useState({ x: 0.03, y: 0.12, z: 0.05 });
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      setSpeed(prev => Math.max(0, Math.min(350, prev + Math.floor(Math.random() * 5) - 2)));
      setTyres(prev => ({
        FL: prev.FL + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 2),
        FR: prev.FR + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 2),
        RL: prev.RL + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 2),
        RR: prev.RR + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 2),
      }));
      setMotorTemp(prev => prev + (Math.random() > 0.5 ? 1 : -1));
      setFuel(prev => Math.max(0, prev - 0.05));
      setBattery(prev => Math.max(0, prev - 0.01));
      setAccel(prev => ({
        x: Math.max(-5, Math.min(5, prev.x + (Math.random() - 0.5) * 0.5)),
        y: Math.max(-5, Math.min(5, prev.y + (Math.random() - 0.5) * 0.5)),
        z: Math.max(0, Math.min(20, prev.z + (Math.random() - 0.5) * 0.5)),
      }));
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => date.toLocaleTimeString('en-GB', { hour12: false });

  const NavItem = ({ icon, label, id }) => {
    const active = activeTab === id;
    return (
      <button 
        onClick={() => setActiveTab(id)}
        className={`flex items-center gap-3 px-4 py-2 transition-colors ${active ? 'text-accel' : 'text-muted hover:text-white'}`}
      >
        {icon}
        <span className="font-bold text-sm tracking-widest hidden sm:block">{label}</span>
      </button>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-white font-sans overflow-hidden select-none">
      
      {/* Header */}
      <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-black shrink-0">
        <div className="flex items-center gap-6">
          <F1Logo />
          <div className="text-white font-medium tracking-wider text-sm hidden md:block">F1 TELEMETRY DASHBOARD</div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 bg-success rounded-full shadow-[0_0_8px_#22C55E]"></div>
          <span className="text-success font-bold tracking-widest text-sm">LIVE</span>
        </div>
        <div className="flex items-center gap-8">
          <div className="text-white text-sm tracking-widest hidden sm:block">LAP 12</div>
          <div className="text-white font-mono text-sm">{formatTime(time)}</div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="flex-1 p-4 md:p-6 overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-[1600px] mx-auto h-full">
          
          {/* Row 1 */}
          <div className="card flex flex-col justify-between">
            <div className="text-white text-[10px] font-bold tracking-widest mb-2">SPEED</div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-5xl font-bold">{speed}</span>
              <span className="text-muted text-sm font-bold">km/h</span>
            </div>
            <SpeedSegments value={speed} max={350} />
          </div>

          <div className="card flex flex-col justify-center">
            <div className="text-center text-white text-[10px] font-bold tracking-widest mb-4">VEHICLE STATUS</div>
            <div className="flex items-center justify-center gap-6">
              <ShieldCheck className="text-success w-14 h-14" strokeWidth={1} />
              <div className="flex flex-col">
                <div className="text-success font-bold text-3xl tracking-wide mb-1">NORMAL</div>
                <div className="text-muted text-xs">All systems are operating normally</div>
              </div>
            </div>
          </div>

          <div className="card flex flex-col justify-center relative">
            <div className="text-center text-white text-[10px] font-bold tracking-widest mb-4">PIT STOP RECOMMENDATION</div>
            <div className="flex items-center justify-between px-4">
              <div className="flex flex-col">
                <div className="text-success font-bold text-3xl mb-1">NO PIT STOP</div>
                <div className="text-muted text-xs">Continue Racing</div>
              </div>
              <CheckeredFlagSVG className="w-12 h-12 text-white opacity-80" />
            </div>
          </div>

          {/* Row 2 & 3: Left side (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-4 h-full">
            
            {/* Tyre Temperature */}
            <div className="card flex-1 flex flex-col min-h-[300px]">
              <div className="text-center text-white text-[10px] font-bold tracking-widest mb-6">TYRE TEMPERATURE</div>
              
              <div className="flex-1 relative flex items-center justify-between px-2 sm:px-12">
                <div className="flex flex-col gap-12 z-10">
                  <TyreBox label="FRONT LEFT" temp={tyres.FL} status={tyres.FL >= 70 ? 'DANGER' : tyres.FL >= 60 ? 'WARNING' : 'NORMAL'} align="left" />
                  <TyreBox label="REAR LEFT" temp={tyres.RL} status={tyres.RL >= 70 ? 'DANGER' : tyres.RL >= 60 ? 'WARNING' : 'NORMAL'} align="left" />
                </div>
                
                {/* Car Outline SVG */}
                <div className="absolute inset-0 flex items-center justify-center opacity-60 pointer-events-none">
                  <svg width="120" height="260" viewBox="0 0 120 260" fill="none">
                    <path d="M60 20 L60 240" stroke="#333" strokeWidth="1" strokeDasharray="4 4" />
                    <path d="M45 40 L75 40 L80 80 L40 80 Z" stroke="#555" strokeWidth="1.5" fill="none" />
                    <path d="M40 80 L80 80 L85 180 L35 180 Z" stroke="#555" strokeWidth="1.5" fill="none" />
                    <ellipse cx="60" cy="130" rx="10" ry="18" stroke="#555" strokeWidth="1.5" fill="none" />
                    <path d="M35 180 L85 180 L75 230 L45 230 Z" stroke="#555" strokeWidth="1.5" fill="none" />
                    <path d="M30 230 L90 230 L90 245 L30 245 Z" stroke="#555" strokeWidth="1.5" fill="none" />
                    <path d="M30 30 L90 30 L90 40 L30 40 Z" stroke="#555" strokeWidth="1.5" fill="none" />
                    
                    <rect x="15" y="60" width="14" height="30" rx="2" stroke={tyres.FL >= 70 ? '#EF4444' : tyres.FL >= 60 ? '#EAB308' : '#22C55E'} strokeWidth="2" fill="#111" />
                    <rect x="91" y="60" width="14" height="30" rx="2" stroke={tyres.FR >= 70 ? '#EF4444' : tyres.FR >= 60 ? '#EAB308' : '#22C55E'} strokeWidth="2" fill="#111" />
                    <rect x="15" y="170" width="16" height="35" rx="2" stroke={tyres.RL >= 70 ? '#EF4444' : tyres.RL >= 60 ? '#EAB308' : '#22C55E'} strokeWidth="2" fill="#111" />
                    <rect x="89" y="170" width="16" height="35" rx="2" stroke={tyres.RR >= 70 ? '#EF4444' : tyres.RR >= 60 ? '#EAB308' : '#22C55E'} strokeWidth="2" fill="#111" />
                    
                    <line x1="29" y1="75" x2="40" y2="75" stroke="#555" strokeWidth="2" />
                    <line x1="91" y1="75" x2="80" y2="75" stroke="#555" strokeWidth="2" />
                    <line x1="31" y1="187" x2="35" y2="187" stroke="#555" strokeWidth="2" />
                    <line x1="89" y1="187" x2="85" y2="187" stroke="#555" strokeWidth="2" />
                  </svg>
                </div>

                <div className="flex flex-col gap-12 z-10">
                  <TyreBox label="FRONT RIGHT" temp={tyres.FR} status={tyres.FR >= 70 ? 'DANGER' : tyres.FR >= 60 ? 'WARNING' : 'NORMAL'} align="right" />
                  <TyreBox label="REAR RIGHT" temp={tyres.RR} status={tyres.RR >= 70 ? 'DANGER' : tyres.RR >= 60 ? 'WARNING' : 'NORMAL'} align="right" />
                </div>
              </div>
            </div>

            {/* Acceleration & Gyroscope */}
            <div className="grid grid-cols-2 gap-4">
              <div className="card">
                <div className="text-white text-[10px] font-bold tracking-widest mb-4">ACCELERATION (m/s²)</div>
                <div className="flex flex-col gap-4">
                  {[
                    { axis: 'X', val: accel.x, max: 5 },
                    { axis: 'Y', val: accel.y, max: 5 },
                    { axis: 'Z', val: accel.z, max: 20 },
                  ].map((item) => (
                    <div key={item.axis} className="flex items-center gap-4 text-sm">
                      <span className="text-accel font-bold w-4">{item.axis}</span>
                      <span className="text-white font-mono w-10">{item.val.toFixed(1)}</span>
                      <div className="flex-1 h-3 bg-[#1f1f1f] rounded-[1px] overflow-hidden">
                        <div className="h-full bg-accel" style={{ width: `${(Math.abs(item.val) / item.max) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="card">
                <div className="text-white text-[10px] font-bold tracking-widest mb-4">GYROSCOPE (rad/s)</div>
                <div className="flex flex-col gap-4">
                  {[
                    { axis: 'X', val: gyro.x, max: 0.2 },
                    { axis: 'Y', val: gyro.y, max: 0.2 },
                    { axis: 'Z', val: gyro.z, max: 0.2 },
                  ].map((item) => (
                    <div key={item.axis} className="flex items-center gap-4 text-sm">
                      <span className="text-gyro font-bold w-4">{item.axis}</span>
                      <span className="text-white font-mono w-10">{item.val.toFixed(2)}</span>
                      <div className="flex-1 h-3 bg-[#1f1f1f] rounded-[1px] overflow-hidden">
                        <div className="h-full bg-gyro" style={{ width: `${(Math.abs(item.val) / item.max) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Row 2 & 3: Right side (1 col) */}
          <div className="lg:col-span-1 flex flex-col gap-4 h-full">
            
            {/* Motor Temp */}
            <div className="card flex-1 flex flex-col justify-center min-h-[140px]">
              <div className="text-center text-white text-[10px] font-bold tracking-widest mb-6">MOTOR TEMPERATURE</div>
              <div className="flex items-center justify-between px-8">
                <EngineIcon className="w-16 h-16 text-danger" />
                <div className="text-right">
                  <div className="text-4xl font-bold text-danger mb-1">{motorTemp}<span className="text-2xl">°C</span></div>
                  <div className="text-success text-xs font-bold tracking-widest">NORMAL</div>
                </div>
              </div>
            </div>

            {/* Battery */}
            <div className="card flex-1 flex flex-col justify-center min-h-[140px]">
              <div className="text-white text-[10px] font-bold tracking-widest mb-6 px-4">BATTERY</div>
              <div className="flex items-center justify-between px-8">
                <BatteryMedium className="w-16 h-16 text-success" strokeWidth={1} />
                <div className="text-right">
                  <div className="text-4xl font-bold text-white mb-1">{battery.toFixed(1)} <span className="text-2xl font-medium">v</span></div>
                  <div className="text-success text-xs font-bold tracking-widest">GOOD</div>
                </div>
              </div>
            </div>

            {/* Fuel */}
            <div className="card flex-1 flex flex-col justify-center min-h-[110px]">
              <div className="flex items-center gap-3 mb-6 px-4">
                <Fuel className="w-6 h-6 text-white" strokeWidth={1.5} />
                <span className="text-white text-[10px] font-bold tracking-widest">FUEL LEVEL</span>
              </div>
              <div className="flex items-center gap-4 px-4">
                <div className="flex-1 h-3 bg-[#1f1f1f] rounded-full overflow-hidden">
                  <div className="h-full bg-success rounded-full" style={{ width: `${fuel}%` }} />
                </div>
                <span className="text-white font-mono text-lg">{Math.round(fuel)}%</span>
              </div>
            </div>

            {/* Alert */}
            <div className="card border-danger/80 bg-black flex-1 flex flex-col justify-center min-h-[110px]">
              <div className="flex items-center gap-6 px-4">
                <AlertTriangle className="w-12 h-12 text-danger shrink-0" strokeWidth={1.5} />
                <div className="flex flex-col gap-1">
                  <div className="text-danger font-bold tracking-widest text-sm">ALERT</div>
                  <div className="text-white font-bold text-sm tracking-wide">FRONT RIGHT TYRE TEMP HIGH</div>
                  <div className="text-danger text-xs tracking-wide">Monitor tyre temperature</div>
                </div>
              </div>
            </div>

          </div>

        </div>
        <div className="h-8 shrink-0"></div>
      </main>

      {/* Footer Nav */}
      <footer className="h-16 bg-black border-t border-[#1f1f1f] flex items-center justify-center shrink-0 w-full z-50 relative">
        <div className="flex items-center justify-between w-full max-w-4xl px-4">
          <NavItem id="dashboard" icon={<Home className="w-5 h-5" />} label="DASHBOARD" />
          <div className="text-[#262626] font-light italic text-2xl">/</div>
          <NavItem id="analysis" icon={<LineChart className="w-5 h-5" />} label="ANALYSIS" />
          <div className="text-[#262626] font-light italic text-2xl">/</div>
          <NavItem id="history" icon={<History className="w-5 h-5" />} label="HISTORY" />
          <div className="text-[#262626] font-light italic text-2xl">/</div>
          <NavItem id="settings" icon={<Settings className="w-5 h-5" />} label="SETTINGS" />
        </div>
      </footer>

    </div>
  );
}
