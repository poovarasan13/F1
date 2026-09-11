import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  BatteryMedium,
  Fuel,
  AlertTriangle,
  Home,
  LineChart,
  History,
  Settings,
} from "lucide-react";
import logo from "./assets/logo.png";

const F1Logo = () => (
  <img src={logo} alt="F1 Logo" className="h-8 w-auto object-contain" />
);

const EngineIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="6" y="10" width="12" height="7" rx="1" />
    <path d="M8 10 L9.5 7 h5 L16 10" />
    <path d="M6 12 H4" />
    <path d="M6 15 H4" />
    <path d="M18 12 h2" />
    <path d="M18 15 h2" />
    <path d="M9 17 v2" />
    <path d="M12 17 v2" />
    <path d="M15 17 v2" />
  </svg>
);

const BatteryIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className={className}
  >
    <rect x="2" y="7" width="18" height="10" rx="1" />
    <path d="M22 10v4" />
    <rect x="4" y="9" width="4" height="6" fill="currentColor" stroke="none" />
    <rect x="9" y="9" width="4" height="6" fill="currentColor" stroke="none" />
    <rect x="14" y="9" width="4" height="6" fill="currentColor" stroke="none" />
  </svg>
);

const FuelIconSolid = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M5 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16H5V4zm2 2v4h4V6H7z" fillRule="evenodd" clipRule="evenodd" />
    <path d="M3 20h14v2H3z" />
    <path d="M15 10c1.7 0 3 1.3 3 3v2c0 1.7-1.3 3-3 3h-1v2h1c2.8 0 5-2.2 5-5v-2c0-2.8-2.2-5-5-5h-2v2h2z" />
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
          className={`h-2 flex-1 rounded-[1px] ${i < activeCount ? "bg-success shadow-[0_0_4px_#22C55E]" : "bg-[#1f1f1f]"}`}
        />
      ))}
    </div>
  );
};

const TyreBox = ({ label, temp, status, align }) => {
  const isLeft = align === "left";
  let colorValue = "#22C55E";
  let colorClass = "text-success";
  if (temp >= 70) {
    colorValue = "#EF4444";
    colorClass = "text-danger";
  } else if (temp >= 60) {
    colorValue = "#EAB308";
    colorClass = "text-warning";
  }

  return (
    <div
      className="bg-[#0f0f0f] flex flex-col items-center justify-center py-2 sm:py-4 px-2 min-w-[100px] sm:min-w-[160px] rounded-xl relative"
      style={{
        border: "1px solid #333",
        borderLeft: isLeft ? `6px solid ${colorValue}` : "1px solid #333",
        borderRight: isLeft ? "1px solid #333" : `6px solid ${colorValue}`,
      }}
    >
      <div className="text-white text-[9px] sm:text-[11px] font-bold tracking-widest mb-1 text-center">
        {label}
      </div>
      <div className={`${colorClass} text-3xl sm:text-5xl font-bold mb-1 leading-none text-center`}>
        {temp}
        <span className="text-lg sm:text-2xl">°C</span>
      </div>
      <div className={`${colorClass} text-[9px] sm:text-[11px] font-bold tracking-widest text-center`}>
        {status}
      </div>
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
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      setSpeed((prev) =>
        Math.max(0, Math.min(350, prev + Math.floor(Math.random() * 5) - 2)),
      );
      setTyres((prev) => ({
        FL:
          prev.FL +
          (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 2),
        FR:
          prev.FR +
          (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 2),
        RL:
          prev.RL +
          (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 2),
        RR:
          prev.RR +
          (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 2),
      }));
      setMotorTemp((prev) => Math.max(35, Math.min(50, prev + (Math.random() > 0.5 ? 1 : -1))));
      setFuel((prev) => Math.max(0, prev - 0.05));
      setBattery((prev) => Math.max(0, prev - 0.01));
      setAccel((prev) => ({
        x: Math.max(-5, Math.min(5, prev.x + (Math.random() - 0.5) * 0.5)),
        y: Math.max(-5, Math.min(5, prev.y + (Math.random() - 0.5) * 0.5)),
        z: Math.max(0, Math.min(20, prev.z + (Math.random() - 0.5) * 0.5)),
      }));
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) =>
    date.toLocaleTimeString("en-GB", { hour12: false });

  const NavItem = ({ icon, label, id }) => {
    const active = activeTab === id;
    return (
      <button
        onClick={() => setActiveTab(id)}
        className={`flex items-center gap-3 px-4 py-2 transition-colors ${active ? "text-accel" : "text-muted hover:text-white"}`}
      >
        {icon}
        <span className="font-bold text-sm tracking-widest hidden sm:block">
          {label}
        </span>
      </button>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-white font-sans overflow-hidden select-none">
      {/* Header */}
      <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-black shrink-0">
        <div className="flex items-center gap-6">
          <F1Logo />
          {/* <div className="text-white font-medium tracking-wider text-sm hidden md:block">F1 TELEMETRY DASHBOARD</div> */}
        </div>
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 bg-success rounded-full shadow-[0_0_8px_#22C55E]"></div>
          <span className="text-success font-bold tracking-widest text-sm">
            LIVE
          </span>
        </div>
        <div className="flex items-center gap-8">
          <div className="text-white text-sm tracking-widest hidden sm:block">
            LAP 12
          </div>
          <div className="text-white font-mono text-sm">{formatTime(time)}</div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="flex-1 p-4 md:p-6 overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-[1600px] mx-auto h-full">
          {/* Row 1 */}
          <div className="card flex flex-col justify-center items-center">
            <div className="text-white text-sm sm:text-[20px] font-bold tracking-widest mb-2 text-center">
              SPEED
            </div>
            <div className="flex items-baseline justify-center text-center gap-2 mb-2">
              <span className="text-4xl sm:text-5xl font-bold">{speed}</span>
              <span className="text-muted text-sm font-bold">km/h</span>
            </div>
            <SpeedSegments value={speed} max={350} />
          </div>

          <div className="card flex flex-col justify-center">
            <div className="text-center text-white text-sm sm:text-[20px] font-bold tracking-widest mb-4">
              VEHICLE STATUS
            </div>
            <div className="flex items-center justify-center gap-6">
              <ShieldCheck className="text-success w-10 h-10 sm:w-14 sm:h-14" strokeWidth={1} />
              <div className="flex flex-col">
                <div className="text-success font-bold text-2xl sm:text-3xl tracking-wide mb-1">
                  NORMAL
                </div>
                <div className="text-muted text-xs">
                  All systems are operating normally
                </div>
              </div>
            </div>
          </div>

          <div className="card flex flex-col justify-center relative">
            <div className="text-center text-white text-sm sm:text-[20px] font-bold tracking-widest mb-4">
              PIT STOP RECOMMENDATION
            </div>
            <div className="flex items-center justify-between px-2 sm:px-4">
              <div className="flex flex-col">
                <div className="text-success font-bold text-2xl sm:text-3xl mb-1">
                  NO PIT STOP
                </div>
                <div className="text-muted text-xs">Continue Racing</div>
              </div>
              <CheckeredFlagSVG className="w-12 h-12 text-white opacity-80" />
            </div>
          </div>

          {/* Row 2 & 3: Left side (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-4 h-full">
            {/* Tyre Temperature */}
            <div className="card flex-1 flex flex-col min-h-[300px] overflow-hidden">
              <div className="text-center text-white text-sm sm:text-[20px] font-bold tracking-widest mb-6">
                TYRE TEMPERATURE
              </div>
              <div className="flex-1 w-full flex items-center justify-between px-1 sm:px-16 md:px-24 pb-4">
                  <div className="flex flex-col gap-6 sm:gap-12 relative z-10 w-[110px] sm:w-[160px] shrink-0">
                  <TyreBox
                    label="FRONT LEFT"
                    temp={tyres.FL}
                    status={
                      tyres.FL >= 70
                        ? "DANGER"
                        : tyres.FL >= 60
                          ? "WARNING"
                          : "NORMAL"
                    }
                    align="left"
                  />
                  <TyreBox
                    label="REAR LEFT"
                    temp={tyres.RL}
                    status={
                      tyres.RL >= 70
                        ? "DANGER"
                        : tyres.RL >= 60
                          ? "WARNING"
                          : "NORMAL"
                    }
                    align="left"
                  />
                </div>

                {/* Left Connectors */}
                <div className="flex-1 h-[232px] sm:h-[290px] relative pointer-events-none">
                  <div className="absolute top-[52px] sm:top-[65px] left-0 right-0 h-[1px] bg-[#ccc] opacity-60"></div>
                  <div className="absolute top-[180px] sm:top-[225px] left-0 right-0 h-[1px] bg-[#ccc] opacity-60"></div>
                </div>

                {/* Car Outline SVG */}
                <div className="relative shrink-0 w-[120px] sm:w-[150px] h-[232px] sm:h-[290px] flex items-center justify-center pointer-events-none">
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 150 290"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    {/* Connecting lines */}
                    <g stroke="#ccc" strokeWidth="1" fill="none" className="opacity-60">
                      <path d="M0 65 L5 65 L23 84" />
                      <path d="M150 65 L145 65 L127 84" />
                      <path d="M0 225 L21 191" />
                      <path d="M150 225 L129 191" />
                    </g>
                    
                    {/* Definitions for 3D/Premium look */}
                    <defs>
                      <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#111" />
                        <stop offset="20%" stopColor="#222" />
                        <stop offset="50%" stopColor="#3a3a3a" />
                        <stop offset="80%" stopColor="#222" />
                        <stop offset="100%" stopColor="#111" />
                      </linearGradient>
                      <linearGradient id="wingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#333" />
                        <stop offset="100%" stopColor="#111" />
                      </linearGradient>
                    </defs>

                    <path d="M75 10 L75 280" stroke="#333" strokeWidth="1" strokeDasharray="4 4" />

                    {/* Floor / Underbody */}
                    <path 
                      d="M 55 100 C 35 110, 30 150, 42 190 C 48 210, 52 230, 55 240 L 95 240 C 98 230, 102 210, 108 190 C 120 150, 115 110, 95 100 Z" 
                      fill="#0a0a0a" stroke="#222" strokeWidth="1"
                    />

                    {/* Front Suspension */}
                    <g stroke="#555" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M 62 82 L 41 72 M 62 92 L 41 82 M 62 87 L 41 87" />
                      <path d="M 88 82 L 109 72 M 88 92 L 109 82 M 88 87 L 109 87" />
                    </g>

                    {/* Rear Suspension */}
                    <g stroke="#555" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M 58 195 L 41 185 M 58 210 L 41 200 M 58 202 L 41 192" />
                      <path d="M 92 195 L 109 185 M 92 210 L 109 200 M 92 202 L 109 192" />
                    </g>

                    {/* Front Wing */}
                    <path d="M 40 50 Q 75 40 110 50 L 112 60 L 38 60 Z" fill="url(#wingGrad)" stroke="#444" strokeWidth="1" />
                    <rect x="36" y="45" width="4" height="20" rx="1.5" fill="#222" stroke="#555" strokeWidth="0.5" />
                    <rect x="110" y="45" width="4" height="20" rx="1.5" fill="#222" stroke="#555" strokeWidth="0.5" />

                    {/* Main Body (Nose to Rear) */}
                    <path 
                      d="M 68 55 C 68 80, 60 100, 60 115 C 52 130, 52 160, 58 180 C 62 195, 65 210, 65 230 L 85 230 C 85 210, 88 195, 92 180 C 98 160, 98 130, 90 115 C 90 100, 82 80, 82 55 Z" 
                      fill="url(#bodyGrad)" 
                    />

                    {/* Cockpit */}
                    <path d="M 65 125 C 65 115, 85 115, 85 125 C 85 145, 80 155, 75 160 C 70 155, 65 145, 65 125 Z" fill="#000" stroke="#111" strokeWidth="1" />
                    
                    {/* Halo */}
                    <path d="M 75 132 L 75 148 M 75 148 C 65 148, 62 138, 62 138 M 75 148 C 85 148, 88 138, 88 138" stroke="#555" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

                    {/* Engine Cover Fin */}
                    <path d="M 73 158 L 74 225 L 76 225 L 77 158 Z" fill="#222" />

                    {/* Sidepod intakes */}
                    <path d="M 52 118 C 55 116, 60 116, 60 118 L 60 125 L 52 125 Z" fill="#000" />
                    <path d="M 98 118 C 95 116, 90 116, 90 118 L 90 125 L 98 125 Z" fill="#000" />

                    {/* Rear Wing */}
                    <rect x="45" y="225" width="60" height="15" rx="2" fill="url(#wingGrad)" stroke="#444" strokeWidth="1" />
                    <rect x="42" y="220" width="3" height="25" rx="1" fill="#222" stroke="#555" strokeWidth="0.5" />
                    <rect x="105" y="220" width="3" height="25" rx="1" fill="#222" stroke="#555" strokeWidth="0.5" />
                    <path d="M 45 233 L 105 233" stroke="#000" strokeWidth="1.5" />

                    {/* Tyres */}
                    {/* FL */}
                    <g>
                      <rect x="23" y="65" width="18" height="38" rx="3" fill="#1a1a1a" stroke="#333" strokeWidth="1" />
                      <rect x="25" y="67" width="3" height="34" rx="1.5" fill={tyres.FL >= 70 ? "#EF4444" : tyres.FL >= 60 ? "#EAB308" : "#22C55E"} />
                    </g>
                    {/* FR */}
                    <g>
                      <rect x="109" y="65" width="18" height="38" rx="3" fill="#1a1a1a" stroke="#333" strokeWidth="1" />
                      <rect x="120" y="67" width="3" height="34" rx="1.5" fill={tyres.FR >= 70 ? "#EF4444" : tyres.FR >= 60 ? "#EAB308" : "#22C55E"} />
                    </g>
                    {/* RL */}
                    <g>
                      <rect x="21" y="170" width="20" height="42" rx="3" fill="#1a1a1a" stroke="#333" strokeWidth="1" />
                      <rect x="23" y="172" width="3" height="38" rx="1.5" fill={tyres.RL >= 70 ? "#EF4444" : tyres.RL >= 60 ? "#EAB308" : "#22C55E"} />
                    </g>
                    {/* RR */}
                    <g>
                      <rect x="109" y="170" width="20" height="42" rx="3" fill="#1a1a1a" stroke="#333" strokeWidth="1" />
                      <rect x="122" y="172" width="3" height="38" rx="1.5" fill={tyres.RR >= 70 ? "#EF4444" : tyres.RR >= 60 ? "#EAB308" : "#22C55E"} />
                    </g>
                  </svg>
                </div>

                {/* Right Connectors */}
                <div className="flex-1 h-[232px] sm:h-[290px] relative pointer-events-none">
                  <div className="absolute top-[52px] sm:top-[65px] left-0 right-0 h-[1px] bg-[#ccc] opacity-60"></div>
                  <div className="absolute top-[180px] sm:top-[225px] left-0 right-0 h-[1px] bg-[#ccc] opacity-60"></div>
                </div>

                <div className="flex flex-col gap-6 sm:gap-12 relative z-10 w-[110px] sm:w-[160px] shrink-0">
                  <TyreBox
                    label="FRONT RIGHT"
                    temp={tyres.FR}
                    status={
                      tyres.FR >= 70
                        ? "DANGER"
                        : tyres.FR >= 60
                          ? "WARNING"
                          : "NORMAL"
                    }
                    align="right"
                  />
                  <TyreBox
                    label="REAR RIGHT"
                    temp={tyres.RR}
                    status={
                      tyres.RR >= 70
                        ? "DANGER"
                        : tyres.RR >= 60
                          ? "WARNING"
                          : "NORMAL"
                    }
                    align="right"
                  />
                </div>
              </div>
            </div>

            {/* Acceleration & Gyroscope */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="card flex flex-col justify-center items-center">
                <div className="text-white text-sm sm:text-[16px] font-bold tracking-widest mb-4 text-center">
                  ACCELERATION (m/s²)
                </div>
                <div className="flex flex-col gap-4 w-full max-w-[240px]">
                  {[
                    { axis: "X", val: accel.x, max: 5 },
                    { axis: "Y", val: accel.y, max: 5 },
                    { axis: "Z", val: accel.z, max: 20 },
                  ].map((item) => (
                    <div
                      key={item.axis}
                      className="flex items-center gap-4 text-sm"
                    >
                      <span className="text-accel font-bold w-4">
                        {item.axis}
                      </span>
                      <span className="text-white font-mono w-10">
                        {item.val.toFixed(1)}
                      </span>
                      <div className="flex-1 h-3 bg-[#1f1f1f] rounded-[1px] overflow-hidden">
                        <div
                          className="h-full bg-accel"
                          style={{
                            width: `${(Math.abs(item.val) / item.max) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card flex flex-col justify-center items-center">
                <div className="text-white text-sm sm:text-[16px] font-bold tracking-widest mb-4 text-center">
                  GYROSCOPE (rad/s)
                </div>
                <div className="flex flex-col gap-4 w-full max-w-[240px]">
                  {[
                    { axis: "X", val: gyro.x, max: 0.2 },
                    { axis: "Y", val: gyro.y, max: 0.2 },
                    { axis: "Z", val: gyro.z, max: 0.2 },
                  ].map((item) => (
                    <div
                      key={item.axis}
                      className="flex items-center gap-4 text-sm"
                    >
                      <span className="text-gyro font-bold w-4">
                        {item.axis}
                      </span>
                      <span className="text-white font-mono w-10">
                        {item.val.toFixed(2)}
                      </span>
                      <div className="flex-1 h-3 bg-[#1f1f1f] rounded-[1px] overflow-hidden">
                        <div
                          className="h-full bg-gyro"
                          style={{
                            width: `${(Math.abs(item.val) / item.max) * 100}%`,
                          }}
                        />
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
              <div className=" text-white text-sm sm:text-[16px] font-bold tracking-widest mb-6">
                MOTOR TEMPERATURE
              </div>
              <div className="flex items-center justify-between px-4 sm:px-8">
                <EngineIcon className="w-12 h-12 sm:w-16 sm:h-16 text-danger" />
                <div className="text-right">
                  <div className="text-3xl sm:text-4xl font-bold text-danger mb-1">
                    {motorTemp}
                    <span className="text-xl sm:text-2xl">°C</span>
                  </div>
                  <div className="text-success text-xs font-bold tracking-widest">
                    NORMAL
                  </div>
                </div>
              </div>
            </div>

            {/* Battery */}
            <div className="card flex-1 flex flex-col justify-center min-h-[140px]">
              <div className="text-white text-sm sm:text-[16px] font-bold tracking-widest mb-6 ">
                BATTERY
              </div>
              <div className="flex items-center justify-between px-4 sm:px-8">
                <BatteryIcon className="w-12 h-12 sm:w-16 sm:h-16 text-success" />
                <div className="text-right">
                  <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                    {battery.toFixed(1)}{" "}
                    <span className="text-xl sm:text-2xl font-medium">v</span>
                  </div>
                  <div className="text-success text-xs font-bold tracking-widest">
                    GOOD
                  </div>
                </div>
              </div>
            </div>

            {/* Fuel */}
            <div className="card flex-1 flex items-center p-4 sm:p-6 gap-4 sm:gap-6 min-h-[110px]">
              <FuelIconSolid className="w-10 h-10 sm:w-12 sm:h-12 text-white shrink-0" />
              <div className="flex-1 flex flex-col gap-2">
                <span className="text-white text-xs sm:text-[14px] font-bold tracking-widest uppercase">
                  FUEL LEVEL
                </span>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-3 bg-[#1f1f1f] rounded-sm overflow-hidden">
                    <div
                      className="h-full bg-success rounded-sm"
                      style={{ width: `${fuel}%` }}
                    />
                  </div>
                  <span className="text-white font-mono text-xl sm:text-2xl">
                    {Math.round(fuel)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Alert */}
            <div className="card border-danger/80 bg-black flex-1 flex flex-col justify-center min-h-[110px]">
              <div className="flex items-center gap-4 sm:gap-6 px-2 sm:px-4">
                <AlertTriangle
                  className="w-10 h-10 sm:w-12 sm:h-12 text-danger shrink-0"
                  strokeWidth={1.5}
                />
                <div className="flex flex-col gap-1">
                  <div className="text-danger font-bold tracking-widest text-sm">
                    ALERT
                  </div>
                  <div className="text-white font-bold text-sm tracking-wide">
                    FRONT RIGHT TYRE TEMP HIGH
                  </div>
                  <div className="text-danger text-xs tracking-wide">
                    Monitor tyre temperature
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-8 shrink-0"></div>
      </main>

      {/* Footer Nav */}
      {/* <footer className="h-16 bg-black border-t border-[#1f1f1f] flex items-center justify-center shrink-0 w-full z-50 relative">
        <div className="flex items-center justify-between w-full max-w-4xl px-4">
          <NavItem id="dashboard" icon={<Home className="w-5 h-5" />} label="DASHBOARD" />
          <div className="text-[#262626] font-light italic text-2xl">/</div>
          <NavItem id="analysis" icon={<LineChart className="w-5 h-5" />} label="ANALYSIS" />
          <div className="text-[#262626] font-light italic text-2xl">/</div>
          <NavItem id="history" icon={<History className="w-5 h-5" />} label="HISTORY" />
          <div className="text-[#262626] font-light italic text-2xl">/</div>
          <NavItem id="settings" icon={<Settings className="w-5 h-5" />} label="SETTINGS" />
        </div>
      </footer> */}
    </div>
  );
}
