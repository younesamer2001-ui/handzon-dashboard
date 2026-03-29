'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  Calendar,
  TrendingUp,
  MapPin,
  AlertCircle,
  Clock,
  MessageSquare,
  DollarSign,
  Users,
  Activity,
  BarChart3,
  Settings,
  FileText,
  ChevronRight,
  X,
  Mic,
  PhoneCall,
  Timer,
  Zap,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import {
  locations,
  recentCalls,
  transcripts,
  bookings,
  customers,
  reports,
  getStats,
  type Location,
  type RecentCall,
  type Transcript,
} from '@/lib/data';

// ==================== SIDEBAR ====================
const pages = [
  { id: 'oversikt', name: 'Oversikt', icon: BarChart3 },
  { id: 'samtaler', name: 'Samtaler', icon: Phone },
  { id: 'bookinger', name: 'Bookinger', icon: Calendar, badge: 12 },
  { id: 'lokasjoner', name: 'Lokasjoner', icon: MapPin },
  { id: 'kunder', name: 'Kunder', icon: Users },
  { id: 'rapporter', name: 'Rapporter', icon: FileText },
  { id: 'innstillinger', name: 'Innstillinger', icon: Settings },
];

// ==================== STAT CARD (original) ====================
interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ElementType;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color?: string;
  onClick?: () => void;
}

function StatCard({ title, value, subtitle, icon: Icon, trend, trendValue, color = 'blue', onClick }: StatCardProps) {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
    emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    orange: 'bg-orange-500/10 border-orange-500/20 text-orange-400',
    purple: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
    red: 'bg-red-500/10 border-red-500/20 text-red-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/[0.07] transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm mb-1">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
          {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
          {trend && trendValue && (
            <div className={cn(
              'flex items-center gap-1 mt-2 text-xs',
              trend === 'up' ? 'text-emerald-400' : trend === 'down' ? 'text-red-400' : 'text-gray-400'
            )}>
              <TrendingUp className="w-3 h-3" />
              {trendValue}
            </div>
          )}
        </div>
        <div className={cn('p-3 rounded-lg', colorClasses[color] || colorClasses.blue)}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </motion.div>
  );
}

// ==================== ACTIVITY CHART (original SVG) ====================
function ActivityChart() {
  const data = [156, 189, 172, 201, 198, 186, 145];
  const bookingData = [58, 72, 65, 81, 78, 74, 55];
  const max = Math.max(...data);

  const callPoints = data.map((value, i) => ({
    x: (i / (data.length - 1)) * 100,
    y: 100 - (value / max) * 80
  }));
  const bookingPoints = bookingData.map((value, i) => ({
    x: (i / (data.length - 1)) * 100,
    y: 100 - (value / max) * 80
  }));

  const callPath = callPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const bookingPath = bookingPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white font-semibold">Aktivitet over tid</h3>
          <p className="text-gray-400 text-sm">Samtaler og bookinger siste 7 dager</p>
        </div>
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-gray-400">Samtaler</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-gray-400">Bookinger</span>
          </div>
        </div>
      </div>
      <div className="h-48 relative">
        <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
          {[0, 25, 50, 75, 100].map(y => (
            <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
          ))}
          <path d={`${callPath} L 100 100 L 0 100 Z`} fill="url(#gradientBlue)" opacity="0.3" />
          <path d={callPath} fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d={`${bookingPath} L 100 100 L 0 100 Z`} fill="url(#gradientGreen)" opacity="0.2" />
          <path d={bookingPath} fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <defs>
            <linearGradient id="gradientBlue" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="gradientGreen" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>Man</span><span>Tir</span><span>Ons</span><span>Tor</span><span>Fre</span><span>Lør</span><span>Søn</span>
        </div>
      </div>
    </div>
  );
}

// ==================== LOCATION STATS (original, now with 14 locations) ====================
function LocationStats({ onSelectLocation }: { onSelectLocation: (loc: Location) => void }) {
  const topLocations = [...locations].sort((a, b) => b.bookings - a.bookings).slice(0, 6);

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      <h3 className="text-white font-semibold mb-4">Avdelingsoversikt</h3>
      <div className="space-y-4">
        {topLocations.map((loc, i) => (
          <div
            key={i}
            className="flex items-center justify-between cursor-pointer hover:bg-white/5 rounded-lg p-1 -m-1 transition-colors"
            onClick={() => onSelectLocation(loc)}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">{loc.name}</p>
                <p className="text-gray-500 text-xs">{loc.bookings} bookinger</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-white text-sm">{loc.calls}</p>
                <p className="text-gray-500 text-xs">samtaler</p>
              </div>
              <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${(loc.bookings / loc.calls) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==================== RECENT CALLS (original) ====================
function RecentCallsList({ onSelectCall }: { onSelectCall: (call: RecentCall) => void }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      <h3 className="text-white font-semibold mb-4">Siste samtaler</h3>
      <div className="space-y-3">
        {recentCalls.slice(0, 5).map((call, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-3 rounded-lg bg-white/5 cursor-pointer hover:bg-white/[0.07] transition-colors"
            onClick={() => onSelectCall(call)}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                'w-2 h-2 rounded-full',
                call.type === 'booked' ? 'bg-emerald-500' :
                call.type === 'info' ? 'bg-blue-500' :
                call.type === 'transferred' ? 'bg-orange-500' : 'bg-red-500'
              )} />
              <div>
                <p className="text-white text-sm">{call.name}</p>
                <p className="text-gray-500 text-xs">{call.loc} — {call.desc}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-xs">{call.time}</p>
              <p className={cn(
                'text-xs',
                call.type === 'booked' ? 'text-emerald-400' :
                call.type === 'info' ? 'text-blue-400' :
                call.type === 'transferred' ? 'text-orange-400' : 'text-red-400'
              )}>
                {call.type === 'booked' ? 'Booket' : call.type === 'info' ? 'Info' : call.type === 'transferred' ? 'Overført' : 'Mistet'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==================== ROI HERO BANNER ====================
function ROIBanner() {
  const stats = getStats();
  const savedHours = Math.round((stats.totalCalls * 2.5) / 60);
  const monthlySaved = Math.round(stats.savedRevenue * 4.3);
  const employeeCostPerMonth = 45000;
  const employeesReplaced = (monthlySaved / employeeCostPerMonth).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden bg-gradient-to-r from-blue-600/20 via-blue-500/10 to-emerald-500/20 border border-blue-500/30 rounded-2xl p-8 mb-8"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/5 rounded-full translate-y-1/2 -translate-x-1/4" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <DollarSign className="w-5 h-5 text-emerald-400" />
          <span className="text-emerald-400 text-sm font-semibold uppercase tracking-wider">Verdiskapning denne uken</span>
        </div>
        <div className="flex items-end gap-3 mb-1">
          <span className="text-5xl font-extrabold text-white">{stats.savedRevenue.toLocaleString('nb')} kr</span>
          <span className="text-emerald-400 text-lg font-semibold mb-1">+23%</span>
        </div>
        <p className="text-gray-300 text-sm mb-6">
          Estimert ekstra omsetning fra {stats.totalBookings} bookinger AI-en har gjennomført som ellers ville gått tapt.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Timer className="w-4 h-4 text-blue-400" />
              <span className="text-gray-400 text-xs">Arbeidstid spart</span>
            </div>
            <p className="text-2xl font-bold text-white">{savedHours} timer</p>
            <p className="text-gray-500 text-xs">{stats.totalCalls} samtaler x 2.5 min snitt</p>
          </div>
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span className="text-gray-400 text-xs">Estimert per mnd</span>
            </div>
            <p className="text-2xl font-bold text-white">{monthlySaved.toLocaleString('nb')} kr</p>
            <p className="text-gray-500 text-xs">Basert på nåværende trend</p>
          </div>
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-purple-400" />
              <span className="text-gray-400 text-xs">Tilsvarer ansatte</span>
            </div>
            <p className="text-2xl font-bold text-white">{employeesReplaced}</p>
            <p className="text-gray-500 text-xs">Fulltids kundebehandlere</p>
          </div>
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4 text-orange-400" />
              <span className="text-gray-400 text-xs">Kostnad AI</span>
            </div>
            <p className="text-2xl font-bold text-white">4 990 kr</p>
            <p className="text-emerald-400 text-xs font-semibold">ROI: {Math.round(monthlySaved / 4990)}x</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ==================== BEFORE / AFTER COMPARISON ====================
function BeforeAfterSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* BEFORE */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-red-500/5 border border-red-500/20 rounded-xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
            <Phone className="w-4 h-4 text-red-400" />
          </div>
          <div>
            <h3 className="text-red-400 font-bold text-sm">Uten AI-telefonsvarer</h3>
            <p className="text-gray-500 text-xs">Slik det var før</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Ubesvarte anrop etter stengetid</span>
            <span className="text-red-400 font-bold">~40%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Bookinger fra tapte anrop</span>
            <span className="text-red-400 font-bold">0</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Tilgjengelig for kunder</span>
            <span className="text-red-400 font-bold">08–17</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Tapt omsetning per uke</span>
            <span className="text-red-400 font-bold">~200 000 kr</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Ventetid for kunde</span>
            <span className="text-red-400 font-bold">2–5 min</span>
          </div>
        </div>
      </motion.div>

      {/* AFTER */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
            <Zap className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-emerald-400 font-bold text-sm">Med AI-telefonsvarer</h3>
            <p className="text-gray-500 text-xs">Resultat etter 3 måneder</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Svarrate hele døgnet</span>
            <span className="text-emerald-400 font-bold">97.3%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Bookinger fra AI denne uken</span>
            <span className="text-emerald-400 font-bold">483</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Tilgjengelig for kunder</span>
            <span className="text-emerald-400 font-bold">24/7</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Ekstra omsetning per uke</span>
            <span className="text-emerald-400 font-bold">241 500 kr</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Ventetid for kunde</span>
            <span className="text-emerald-400 font-bold">0 sek</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ==================== LIVE DEMO BUTTON ====================
function LiveDemoButton() {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <>
      <motion.button
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowDemo(true)}
        className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 transition-all"
      >
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
          <Mic className="w-4 h-4" />
        </div>
        <div className="text-left">
          <p className="text-sm font-bold">Prøv AI assistenten live</p>
          <p className="text-xs text-blue-200">Ring og hør sev�l</p>
        </div>
        <ArrowRight className="w-4 h-4 ml-2" />
      </motion.button>

      {showDemo && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setShowDemo(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 border border-white/10 rounded-2xl p-8 max-w-md w-full mx-4"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mx-auto mb-4">
                <PhoneCall className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Test AI-telefonsvareren</h3>
              <p className="text-gray-400 text-sm mt-2">Ring nummeret under for å snakke med AI-assistenten. Den svarer på norsk, kjenner alle priser, og kan booke time.</p>
            </div>
            <a
              href="tel:+14156504520"
              className="flex items-center justify-center gap-3 w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl text-lg transition-colors"
            >
              <Phone className="w-5 h-5" />
              Ring +1 (415) 650-4520
            </a>
            <p className="text-gray-500 text-xs text-center mt-4">Assistenten håndterer booking, prisinformasjon og vanlige spørsmål — akkurat som den gjør for alle 14 lokasjoner.</p>
            <button
              onClick={() => setShowDemo(false)}
              className="w-full mt-4 py-2 text-gray-500 hover:text-white text-sm transition-colors"
            >
              Lukk
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
}

// ==================== PAGE: OVERSIKT ====================
function OversiktPage({ onSelectLocation, onSelectCall }: { onSelectLocation: (loc: Location) => void; onSelectCall: (call: RecentCall) => void }) {
  const stats = getStats();

  return (
    <>
      {/* ROI Hero Banner */}
      <ROIBanner />

      {/* Before / After Comparison */}
      <BeforeAfterSection />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Samtaler denne uken"
          value={stats.totalCalls.toLocaleString('nb')}
          subtitle={`${stats.totalBookings} bookinger, ${stats.totalCalls - stats.totalBookings} info/annet`}
          icon={Phone}
          trend="up"
          trendValue="+23% vs forrige uke"
          color="blue"
        />
        <StatCard
          title="Bookinger gjort"
          value={stats.totalBookings.toLocaleString('nb')}
          subtitle={`${stats.convRate}% konverteringsrate`}
          icon={Calendar}
          trend="up"
          trendValue="+18% vs forrige uke"
          color="emerald"
        />
        <StatCard
          title="Svarrate"
          value={`${stats.avgAnswer}%`}
          subtitle="Gjennomsnitt alle lokasjoner"
          icon={Activity}
          trend="up"
          trendValue="+2.1pp vs forrige uke"
          color="orange"
        />
        <StatCard
          title="Aktive avdelinger"
          value={locations.length}
          subtitle="Alle operasjonelle"
          icon={MapPin}
          color="purple"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivityChart />
        </div>
        <div>
          <LocationStats onSelectLocation={onSelectLocation} />
        </div>
        <div>
          <RecentCallsList onSelectCall={onSelectCall} />
        </div>

        {/* AI Performance */}
        <div className="lg:col-span-2">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-white font-semibold">AI-ytelse</h3>
                <p className="text-gray-400 text-sm">Siste 30 dager</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-full">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 text-sm">94% suksessrate</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-white">89%</p>
                <p className="text-gray-400 text-sm">Fullførte bookinger</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">2.3m</p>
                <p className="text-gray-400 text-sm">Gjennomsnittlig tid</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">12</p>
                <p className="text-gray-400 text-sm">Overført ti �V��W6�S�����F�c���F�c���F�c���F�cࠢ���W'G2��Т�F�c��F�b6�74��S�&&r�v��FR�R&�&FW"&�&FW"�v��FR�&�V�FVB׆��b#��F�b6�74��S�&f�W��FV�2�6V�FW"v�"�"�B#���W'D6�&6�R6�74��S�'r�R��RFW�B��&�vR�C"��ƃ26�74��S�'FW�B�v��FRf��B�6V֖&��B#�f'6�W#���3���F�c��F�b6�74��S�'76Rג�2#��F�b6�74��S�'�2&�V�FVB��r&r��&�vR�S�&�&FW"&�&FW"��&�vR�S�##��6�74��S�'FW�B��&�vR�CFW�B�6�f��B��VF�V�#�;��G&f�������6�74��S�'FW�B�w&��CFW�Bׇ2#�7F�f�W#�R6�F�W":RfV�C�����F�c��F�b6�74��S�'�2&�V�FVB��r&r�&VB�S�&�&FW"&�&FW"�&VB�S�##��6�74��S�'FW�B�&VB�CFW�B�6�f��B��VF�V�#�7�7FV�f'6V�����6�74��S�'FW�B�w&��CFW�Bׇ2#�4�2�F�V�W7FS�f�'fV�FWBf�'6��V�6S�����F�c���F�c���F�c���F�c���F�cࠢ����6F���W&f�&��6RF&�R��Т�F�b6�74��S�&�B�b&r�v��FR�R&�&FW"&�&FW"�v��FR�&�V�FVB׆��b#�ƃ26�74��S�'FW�B�v��FRf��B�6V֖&��B�"�B#�FV�6RW"���6������3��F�b6�74��S�&�fW&f��rׂ�WF�#��F&�R6�74��S�'r�gV��FW�B�6�#��F�VC��G"6�74��S�&&�&FW"�"&�&FW"�v��FR�#��F�6�74��S�'FW�B��VgB��2��"FW�B�w&��Cf��B�6V֖&��BFW�Bׇ2WW&66R#����6�����F���F�6�74��S�'FW�B��VgB��2��"FW�B�w&��Cf��B�6V֖&��BFW�Bׇ2WW&66R#��&���F���F�6�74��S�'FW�B��VgB��2��"FW�B�w&��Cf��B�6V֖&��BFW�Bׇ2WW&66R#�&�����vW#��F���F�6�74��S�'FW�B��VgB��2��"FW�B�w&��Cf��B�6V֖&��BFW�Bׇ2WW&66R#���fW'FW&��s��F���F�6�74��S�'FW�B��VgB��2��"FW�B�w&��Cf��B�6V֖&��BFW�Bׇ2WW&66R#�7f'&FS��F���F�6�74��S�'FW�B��VgB��2��"FW�B�w&��Cf��B�6V֖&��BFW�Bׇ2WW&66R#�7FGW3��F����G#���F�VC��F&�G�����6F���2������2��������G ��W�׶�Т6�74��S�&&�&FW"�"&�&FW"�v��FR�R��fW#�&r�v��FR�R7W'6�"����FW"G&�6�F����6���'2 ���6Ɩ6�ײ������6V�V7D��6F�����2�Т��FB6�74��S�'��2��"f��B��VF�V�FW�B�v��FR#���2���W���FC��FB6�74��S�'��2��"FW�B�w&��3#���2�6��7���FC��FB6�74��S�'��2��"FW�B�w&��3#���2�&�����w7���FC��FB6�74��S�'��2��"#��7�6�74��S׶6•wFW�B�6�r����2�&FR�C�wFW�B�V�W&�B�Cr���2�&FR�3b�wFW�B�&�VR�Cr�wFW�B��&�vR�Cp�������2�&FW�P���7���F�b6�74��S�'r�#���R&r�v��FR�&�V�FVB�gV���fW&f��rֆ�FFV���Ɩ�R�&��6����"Ɩv��֖FF�R#��F�`�6�74��S׶6•v��gV��&�V�FVB�gV��r����2�&FR�C�v&r�V�W&�B�Sr���2�&FR�3b�v&r�&�VR�Sr�v&r��&�vR�Sp��Т7G��S׷�v�GF��G���2�&FR�'�V�Т����F�c���FC��FB6�74��S�'��2��"FW�B�w&��3#���2��7vW'�S��FC��FB6�74��S�'��2��"#��7�6�74��S׶6•wFW�Bׇ2f��B�6V֖&��B��"�R��&�V�FVB��Br����2�7FGW2���vw&VV�r�v&r�V�W&�B�S�FW�B�V�W&�B�Cr�v&r��&�vR�S�FW�B��&�vR�Cp�������2�7FGW2���vw&VV�r�t�F�br�t�b���b�wТ��7����FC���G#���Т��F&�G����F&�S���F�c���F�c�������Р�����������������������tS�4�D�U"�������������������ЦgV�7F���6�F�W%vR����&WGW&������F�b6�74��S�&f�W��FV�2�6V�FW"�W7F�g��&WGvVV��"�b#��F�c�ƃ"6�74��S�'FW�B�'��f��B�&��BFW�B�v��FR#�6�F�W#���#��6�74��S�'FW�B�w&��CFW�B�6�#���R��6�F�W"�VBG&�6�&�C�����F�c���F�cࠢ����&V6V�B6��2��Т�F�b6�74��S�&w&�Bw&�B�6��2��C�w&�B�6��2�"v�B�"ӂ#��&V6V�D6��2����6����������F�b�W�׶��6�74��S�&&r�v��FR�R&�&FW"&�&FW"�v��FR�&�V�FVB׆��B��fW#�&r�v��FR���u�G&�6�F����6���'27W'6�"����FW"#��F�b6�74��S�&f�W��FV�2�7F'Bv�2#��F�b6�74��S׶6•wrӒ�Ӓ&�V�FVB��rf�W��FV�2�6V�FW"�W7F�g��6V�FW"FW�B�&6Rf�W��6�&���r��6���G�R���v&���VBr�v&r�V�W&�B�S�r��6���G�R���v��f�r�v&r�&�VR�S�r�v&r��&�vR�S�p�����6���6��Т��F�c��F�b6�74��S�&f�W��֖��r�#��F�b6�74��S�&f�W��W7F�g��&WGvVV��FV�2�6V�FW"#��7�6�74��S�'FW�B�v��FRf��B�6V֖&��BFW�B�6�#�6�����W���7���7�6�74��S�'FW�B�w&��SFW�Bׇ2#�6���F��W���7����F�c��6�74��S�'FW�B�w&��CFW�Bׇ2�B�#�6�����7�(	B�6���FW67�����F�b6�74��S�&f�W�v�"�B�"#��7�6�74��S�'FW�Bׇ2��"���R&�V�FVB&r�v��FR�RFW�B�w&��C&�&FW"&�&FW"�v��FR�#�6���GW'���7���7�6�74��S׶6•wFW�Bׇ2��"���R&�V�FVBr��6���G�R���v&���VBr�v&r�V�W&�B�S�FW�B�V�W&�B�Cr��6���G�R���v��f�r�v&r�&�VR�S�FW�B�&�VR�Cr�v&r��&�vR�S�FW�B��&�vR�Cp�����6���G�R���v&���VBr�t&���WBr�6���G�R���v��f�r�t��f�r�t�fW&l;�'BwТ��7����F�c���F�c���F�c���F�c���Т��F�cࠢ��G&�67&�G2��Тƃ26�74��S�'FW�B�v��FRf��B�6V֖&��B�"�B#�G&�6�&�6���W#���3��F�b6�74��S�'76Rג�B#��G&�67&�G2����B��������F�b�W�׶��6�74��S�&&r�v��FR�R&�&FW"&�&FW"�v��FR�&�V�FVB׆��R#��F�b6�74��S�&f�W��W7F�g��&WGvVV��FV�2�6V�FW"�"�2#��7�6�74��S�'FW�B�v��FRf��B�6V֖&��B#�B�6��W'�(	B�B���7���7���7�6�74��S�'FW�B�w&��SFW�B�6�#�B�GW'���7����F�c��F�b6�74��S�'76Rג�"#��B�Ɩ�W2����Ɩ�R��������F�b�W�׶��6�74��S׶6•wFW�B�6���2&�&FW"���"r��Ɩ�R�v�����v�r�v&�&FW"�&�VR�SFW�B�&�VR�3r�v&�&FW"�w&��cFW�B�w&��3p�����7�6�74��S�'FW�Bׇ2FW�B�w&��S�"�"#�Ɩ�R�v�����v�r�	�Ib�r�	�B�V�FRw���7���Ɩ�R�FW�GТ��F�c���Т��F�c��F�b6�74��S�&f�W�v�"�B�2#��7�6�74��S׶6•wFW�Bׇ2��"���R&�V�FVBr��B�G�R���v&�����rr�v&r�V�W&�B�S�FW�B�V�W&�B�Cr�v&r�&�VR�S�FW�B�&�VR�Cp�����B�G�R���v&�����rr�	�8R&�����rr�~(K������f�wТ��7���7�6�74��S�'FW�Bׇ2��"���R&�V�FVB&r�v��FR�RFW�B�w&��C#�B���7���7����F�c���F�c���Т��F�c�������Р�����������������������tS�$�����tU"�������������������ЦgV�7F���&�����vW%vR����&WGW&������F�b6�74��S�&f�W��FV�2�6V�FW"�W7F�g��&WGvVV��"�b#��F�c�ƃ"6�74��S�'FW�B�'��f��B�&��BFW�B�v��FR#�&�����vW"�Fs���#��6�74��S�'FW�B�w&��CFW�B�6�#�"&�����vW"(	Bg&VFr#���'3�����F�c���F�cࠢ�F�b6�74��S�'76Rג�2#��&�����w2����"��������F�b�W�׶��6�74��S�&&r�v��FR�R&�&FW"&�&FW"�v��FR�&�V�FVB׆��Bf�W��FV�2�6V�FW"�W7F�g��&WGvVV���fW#�&r�v��FR���u�G&�6�F����6���'27W'6�"����FW"#��F�b6�74��S�&f�W��FV�2�6V�FW"v�B#��7�6�74��S�'FW�B�&�VR�Cf��B�&��BFW�B�6�֖��rճS��#�"�F��W���7���F�c��6�74��S�'FW�B�v��FRf��B�6V֖&��BFW�B�6�#�"���W�����6�74��S�'FW�B�w&��CFW�Bׇ2#�"�6W'f�6W������F�c���F�c��7�6�74��S�'FW�B�w&��CFW�Bׇ2#�	�8��"���7���7����F�c���Т��F�c�������Р�����������������������tS����4���U"�������������������ЦgV�7F������6���W%vR����6V�V7D��6F���Ӣ���6V�V7D��6F������3���6F�����f��BҒ��&WGW&������F�b6�74��S�&f�W��FV�2�6V�FW"�W7F�g��&WGvVV��"�b#��F�c�ƃ"6�74��S�'FW�B�'��f��B�&��BFW�B�v��FR#����6���W#���#��6�74��S�'FW�B�w&��CFW�B�6�#���R���6F���2��V�wF���F�fR���6���W#�����F�c���F�cࠢ��7V��'�6&G2��Т�F�b6�74��S�&w&�Bw&�B�6��2��C�w&�B�6��2�2v�B�"�b#��7FD6&BF�F�S�$�F�fR���6���W""f�VS׶��6F���2��V�wF���6��״����6���#�&V�W&�B"���7FD6&BF�F�S�$v�V����6�GFƖr7f'&FR"f�VS�#�r�2R"�6��״7F�f�G��6���#�&&�VR"���7FD6&BF�F�S�$&W7FR���6���"f�VS�$Ɩ��W7G,;��"7V'F�F�S�#Cr�2R���fW'FW&��r"�6��׵G&V�F��uW�6���#�'W'�R"����F�cࠢ��gV����6F���F&�R��Т�F�b6�74��S�&&r�v��FR�R&�&FW"&�&FW"�v��FR�&�V�FVB׆��b#�ƃ26�74��S�'FW�B�v��FRf��B�6V֖&��B�"�B#���R���6���W#���3��F�b6�74��S�&�fW&f��rׂ�WF�#��F&�R6�74��S�'r�gV��FW�B�6�#��F�VC��G"6�74��S�&&�&FW"�"&�&FW"�v��FR�#��F�6�74��S�'FW�B��VgB��2��"FW�B�w&��Cf��B�6V֖&��BFW�Bׇ2WW&66R#����6�����F���F�6�74��S�'FW�B��VgB��2��"FW�B�w&��Cf��B�6V֖&��BFW�Bׇ2WW&66R#�G&W76S��F���F�6�74��S�'FW�B��VgB��2��"FW�B�w&��Cf��B�6V֖&��BFW�Bׇ2WW&66R#��&��Fs��F���F�6�74��S�'FW�B��VgB��2��"FW�B�w&��Cf��B�6V֖&��BFW�Bׇ2WW&66R#�7f'&FS��F���F�6�74��S�'FW�B��VgB��2��"FW�B�w&��Cf��B�6V֖&��BFW�Bׇ2WW&66R#�7FGW3��F����G#���F�VC��F&�G�����6F���2������2��������G ��W�׶�Т6�74��S�&&�&FW"�"&�&FW"�v��FR�R��fW#�&r�v��FR�R7W'6�"����FW"G&�6�F����6���'2 ���6Ɩ6�ײ������6V�V7D��6F�����2�Т��FB6�74��S�'��2��"f��B��VF�V�FW�B�v��FR#���2���W���FC��FB6�74��S�'��2��"FW�B�w&��C#���2�FG'���FC��FB6�74��S�'��2��"FW�B�w&��3#��F��&�V�B���2�6��2�r����FC��FB6�74��S�'��2��"FW�B�w&��3#���2��7vW'�S��FC��FB6�74��S�'��2��"#��7�6�74��S׶6•wFW�Bׇ2f��B�6V֖&��B��"�R��&�V�FVB��Br����2�7FGW2���vw&VV�r�v&r�V�W&�B�S�FW�B�V�W&�B�Cr�v&r��&�vR�S�FW�B��&�vR�Cp�������2�7FGW2���vw&VV�r�t�F�br�t�b���b�wТ��7����FC���G#���Т��F&�G����F&�S���F�c���F�c�������Р�����������������������tS��T�DU"�������������������ЦgV�7F����V�FW%vR����6��7B�6V&6��6WE6V&6���W6U7FFR�rr���6��7Bf��FW&VB�6V&6���7W7F��W'2�f��FW"�2��2���R�F���vW$66R����6�VFW2�6V&6��F���vW$66R�����2���2�F���vW$66R����6�VFW2�6V&6��F���vW$66R������7W7F��W'3���&WGW&������F�b6�74��S�&f�W��FV�2�6V�FW"�W7F�g��&WGvVV��"�b#��F�c�ƃ"6�74��S�'FW�B�'��f��B�&��BFW�B�v��FR#�V�FW#���#��6�74��S�'FW�B�w&��CFW�B�6�#�V�FV&6Rg&��6�F�W"(	B�Cr&Vv�7G&W'FS�����F�c�Ɩ�W@�G�S�'FW�B ��6V���FW#�%<;���V�FR��� �f�VS׷6V&6�Т��6��vSײ�R���6WE6V&6��R�F&vWB�f�VR�Т6�74��S�&&r�v��FR�R&�&FW"&�&FW"�v��FR�FW�B�v��FR��B��"&�V�FVB��rFW�B�6��WFƖ�R����Rf�7W3�&�&FW"�&�VR�S�SG&�6�F����6���'2 �����F�cࠢ��7V��'���Т�F�b6�74��S�&w&�Bw&�B�6��2��C�w&�B�6��2�Bv�B�"�b#��7FD6&BF�F�S�%F�F�B&Vv�7G&W'FR"f�VS�#�Cr"�6��׵W6W'7�6���#�&&�VR"���7FD6&BF�F�S�$�RFV��RV�V�"f�VS�#c""�6��׵G&V�F��uW�6���#�&V�W&�B"���7FD6&BF�F�S�$v�V�v�vW&R"f�VS�#3BR"�6��״7F�f�G��6���#�'W'�R"���7FD6&BF�F�S�%6�GB&�����vW""f�VS�#"�B"�6��״6�V�F'�6���#�&�&�vR"����F�cࠢ��7W7F��W"F&�R��Т�F�b6�74��S�&&r�v��FR�R&�&FW"&�&FW"�v��FR�&�V�FVB׆��b#�ƃ26�74��S�'FW�B�v��FRf��B�6V֖&��B�"�B#�6�7FR&Vv�7G&W'FR�V�FW"�7�6�74��S�&f��B���&��FW�Bׇ2FW�B�w&��S#�(	Bf�6W"�f��FW&VB��V�wF���W7FS��7�����3��F�b6�74��S�&�fW&f��rׂ�WF�#��F&�R6�74��S�'r�gV��FW�B�6�#��F�VC��G"6�74��S�&&�&FW"�"&�&FW"�v��FR�#��F�6�74��S�'FW�B��VgB��2��"FW�B�w&��Cf��B�6V֖&��BFW�Bׇ2WW&66R#��f���F���F�6�74��S�'FW�B��VgB��2��"FW�B�w&��Cf��B�6V֖&��BFW�Bׇ2WW&66R#�FV�Vf����F���F�6�74��S�'FW�B��VgB��2��"FW�B�w&��Cf��B�6V֖&��BFW�Bׇ2WW&66R#����6�����F���F�6�74��S�'FW�B��VgB��2��"FW�B�w&��Cf��B�6V֖&��BFW�Bׇ2WW&66R#�f�&WG'V��WBF�V�W7FS��F���F�6�74��S�'FW�B��VgB��2��"FW�B�w&��Cf��B�6V֖&��BFW�Bׇ2WW&66R#�6�7FR���F�C��F���F�6�74��S�'FW�B��VgB��2��"FW�B�w&��Cf��B�6V֖&��BFW�Bׇ2WW&66R#�&�����vW#��F����G#���F�VC��F&�G���f��FW&VB����2��������G"�W�׶��6�74��S�&&�&FW"�"&�&FW"�v��FR�R��fW#�&r�v��FR�R7W'6�"����FW"G&�6�F����6���'2#��FB6�74��S�'��2��"f��B��VF�V�FW�B�v��FR#�2���W���FC��FB6�74��S�'��2��"FW�B�w&��C#�2����W���FC��FB6�74��S�'��2��"FW�B�w&��3#�2���7���FC��FB6�74��S�'��2��"FW�B�w&��3#�2�6W'f�6W���FC��FB6�74��S�'��2��"FW�B�w&��C#�2��7G���FC��FB6�74��S�'��2��"#��7�6�74��S�&&r�&�VR�S�FW�B�&�VR�C��"�R��&�V�FVB��BFW�Bׇ2f��B�&��B#�2�6�V�G���7����FC���G#���Т��F&�G����F&�S���F�c���F�c�������Р�����������������������tS�$�%DU"�������������������ЦgV�7F���&�'FW%vR����&WGW&������F�b6�74��S�&f�W��FV�2�6V�FW"�W7F�g��&WGvVV��"�b#��F�c�ƃ"6�74��S�'FW�B�'��f��B�&��BFW�B�v��FR#�&�'FW#���#��6�74��S�'FW�B�w&��CFW�B�6�#�V�V�FƖvR�r�:V�VFƖvR&�'FW#�����F�c���F�cࠢ�F�b6�74��S�'76Rג�2#��&W�'G2����"��������F�b�W�׶��6�74��S�&&r�v��FR�R&�&FW"&�&FW"�v��FR�&�V�FVB׆��Rf�W��FV�2�6V�FW"�W7F�g��&WGvVV���fW#�&r�v��FR���u�G&�6�F����6���'27W'6�"����FW"w&�W#��F�b6�74��S�&f�W��FV�2�6V�FW"v�B#��F�b6�74��S׶6•wr���&�V�FVB��rf�W��FV�2�6V�FW"�W7F�g��6V�FW"FW�B��rr��"�G�R���wvVV�ǒr�v&r�&�VR�S�r�v&r�W'�R�S�p�����"�G�R���wvVV�ǒr�	�8�r�	�8�wТ��F�c��F�c��6�74��S�'FW�B�v��FRf��B�6V֖&��BFW�B�6�#�"�F�F�W�����6�74��S�'FW�B�w&��SFW�Bׇ2�B��R#�"�FFW�(	B�"�7V��'��7V'7G&��r��c����������F�c���F�c��F�b6�74��S�&f�W��FV�2�6V�FW"v�2#��7�6�74��S׶6•wFW�Bׇ2f��B�6V֖&��B��"�R��&�V�FVB��Br��"�7FGW2���v�Wrr�v&r�V�W&�B�S�FW�B�V�W&�B�Cr�v&r�v��FR�RFW�B�w&��Sp�����"�7FGW2���v�Wrr�t�r�t�W7BwТ��7���6�Wg&��&�v�B6�74��S�'r�B��BFW�B�w&��cw&�Wֆ�fW#�FW�B�w&��CG&�6�F����6���'2"����F�c���F�c���Т��F�c�������Р�����������������������tS����5D��Ĕ�tU"�������������������ЦgV�7F���F�vv�U7v�F6���FVfV�D���G'VR���F�vv�RӢ�FVfV�D���&���V���F�vv�S����&���V���f��BҒ��6��7B����6WD����W6U7FFR�FVfV�D�⓰�&WGW&����F�`�6�74��S׶6•wr���b&�V�FVB�gV��&V�F�fR7W'6�"����FW"G&�6�F������f�W��6�&���r�����v&r�&�VR�Sr�v&r�w&��sp��Т��6Ɩ6�ײ�����6WD���⓲��F�vv�S���⓲�Т��F�b6�74��S׶6•wr�B��B&r�v��FR&�V�FVB�gV��'6��WFRF��G&�6�F������6�F�rr�����v�VgB�br�v�VgB�p�������F�c����Р�gV�7F������7F��Ɩ�vW%vR����&WGW&������F�b6�74��S�&�"�b#�ƃ"6�74��S�'FW�B�'��f��B�&��BFW�B�v��FR#���7F��Ɩ�vW#���#��6�74��S�'FW�B�w&��CFW�B�6�#���f�wW&W"��76�7FV�FV������F�cࠢ�F�b6�74��S�&&r�v��FR�R&�&FW"&�&FW"�v��FR�&�V�FVB׆��b�"�B#�ƃ26�74��S�'FW�B�v��FRf��B�6V֖&��B�"�B#���76�7FV�C���3��F�b6�74��S�'76Rג�#������&Vât��F�br����C�u6�:Rbf�":R7F�R��7f"֖F�W'F�F�rr�����&VâtWF��F�6�&�����rr����C�uF���B�:R&���RF��W"WFV�&V�&VgFV�6Rr�����&Vâu4�2�&V�&VgFV�6Rr����C�u6V�B4�2F���V�FRWGFW"&�����rr�����&Vât�6GGf'6V�r����C�uf'6�R�6GFR���R&�����vW"r�����&Vât�fW&l;�&��rF���6GBr����C�uF���B�:R6WGFR�fW"F��WB�V��W6�Rr��������2��������F�b�W�׶��6�74��S�&f�W��FV�2�6V�FW"�W7F�g��&WGvVV���B&�&FW"�"&�&FW"�v��FR�R�7C�&�&FW"�#��F�c��6�74��S�'FW�B�v��FRFW�B�6�#�2��&V������6�74��S�'FW�B�w&��SFW�Bׇ2�B��R#�2憖�G������F�c��F�vv�U7v�F6�����F�c���Т��F�c���F�cࠢ�F�b6�74��S�&&r�v��FR�R&�&FW"&�&FW"�v��FR�&�V�FVB׆��b#�ƃ26�74��S�'FW�B�v��FRf��B�6V֖&��B�"�B#�f'6�W#���3��F�b6�74��S�'76Rג�#������&VâtR��7Gf'6�W"r����C�tFvƖr�7V��W&��rF������G������r�����&VâuV�V�FƖr&�'Br����C�tWF��F�6�&�'B�fW"��Fr����r��������2��������F�b�W�׶��6�74��S�&f�W��FV�2�6V�FW"�W7F�g��&WGvVV���B&�&FW"�"&�&FW"�v��FR�R�7C�&�&FW"�#��F�c��6�74��S�'FW�B�v��FRFW�B�6�#�2��&V������6�74��S�'FW�B�w&��SFW�Bׇ2�B��R#�2憖�G������F�c��F�vv�U7v�F6�����F�c���Т��F�c���F�c�������Р�����������������������DUD���T��������������������ЦgV�7F���FWF���V�6��FV�B���6��6RӢ�6��FV�C�&V7B�&V7D��FR��V�ò��6��6S�����f��BҒ��&WGW&����F�b6�74��S׶6�vFWF����V�r�6��FV�B�v�V�r�rr����'WGF����6Ɩ6�׶��6��6WТ6�74��S�&'6��WFRF��B&�v�B�BFW�B�w&��C��fW#�FW�B�v��FRG&�6�F����6���'2�&�V�FVB ��ł6�74��S�'r�R��R"����'WGF����6��FV�GТ��F�c����Р��������������������������D4�$�$B�������������������ЦW��'BFVfV�BgV�7F�����G���F6�&�&B����6��7B�7F�fUvR�6WD7F�fUvU��W6U7FFR�v�fW'6��Br���6��7B�FWF��6��FV�B�6WDFWF��6��FV�E��W6U7FFS�&V7B�&V7D��FR��V����V����gV�7F���6��t��6F���FWF���3���6F�����6��7B��46��2�&V6V�D6��2�f��FW"�2��2���2�����2���R���6WDFWF��6��FV�B���F�c�ƃ"6�74��S�'FW�B׆�f��B�&��BFW�B�v��FR#���2���W����#��6�74��S�'FW�B�w&��CFW�B�6��"�b#�	�8����2�FG'�����F�b6�74��S�&w&�Bw&�B�6��2�"v�2�"�b#��F�b6�74��S�&&r�v��FR�R&�&FW"&�&FW"�v��FR�&�V�FVB��r�2#��6�74��S�'FW�B�w&��SFW�Bׇ2#��&�����6�74��S�'FW�B�&�VR�CFW�B׆�f��B�&��B#���2�6��7������F�c��F�b6�74��S�&&r�v��FR�R&�&FW"&�&FW"�v��FR�&�V�FVB��r�2#��6�74��S�'FW�B�w&��SFW�Bׇ2#�&�����vW#����6�74��S�'FW�B�V�W&�B�CFW�B׆�f��B�&��B#���2�&�����w7������F�c��F�b6�74��S�&&r�v��FR�R&�&FW"&�&FW"�v��FR�&�V�FVB��r�2#��6�74��S�'FW�B�w&��SFW�Bׇ2#���fW'FW&��s����6�74��S�'FW�B�v��FRFW�B׆�f��B�&��B#���2�&FW�S�����F�c��F�b6�74��S�&&r�v��FR�R&�&FW"&�&FW"�v��FR�&�V�FVB��r�2#��6�74��S�'FW�B�w&��SFW�Bׇ2#�7f'&FS����6�74��S�'FW�B�v��FRFW�B׆�f��B�&��B#���2��7vW'�S�����F�c���F�c�ƃB6�74��S�'FW�B�w&��CFW�Bׇ2f��B�6V֖&��BWW&66R�"�2#�6�7FR6�F�W"�W&g&���C����46��2��V�wF�����46��2����2��������F�b�W�׶��6�74��S�&f�W��FV�2�6V�FW"v�"�"&�V�FVB&r�v��FR�R�"�"FW�B�6�#��F�b6�74��S׶6•wr��R���R&�V�FVB�gV��f�W��6�&���r��2�G�R���v&���VBr�v&r�V�W&�B�Sr�2�G�R���v��f�r�v&r�&�VR�Sr�v&r��&�vR�Sp������7�6�74��S�'FW�B�v��FR#�2���W���7���7�6�74��S�'FW�B�w&��S���WF�FW�Bׇ2#�2�F��W���7����F�c�������6�74��S�'FW�B�w&��SFW�B�6�#��vV�6�F�W"��W&B�:S����Т��F�c����Р�gV�7F���6��t6��FWF�6�â&V6V�D6���6��7BB�G&�67&�G2�f��B������6��W"���6�����R���6WDFWF��6��FV�B���F�c�ƃ"6�74��S�'FW�B׆�f��B�&��BFW�B�v��FR#�6�����W����#��6�74��S�'FW�B�w&��CFW�B�6��"�b#�	�8��6�����7�(	B�6���F��W�(	B�6���GW'�����F�b6�74��S�&w&�Bw&�B�6��2�"v�2�"�b#��F�b6�74��S�&&r�v��FR�R&�&FW"&�&FW"�v��FR�&�V�FVB��r�2#��6�74��S�'FW�B�w&��SFW�Bׇ2#�G�S����6�74��S׶6�wFW�B��rf��B�&��Br��6���G�R���v&���VBr�wFW�B�V�W&�B�Cr�6���G�R���v��f�r�wFW�B�&�VR�Cr�wFW�B��&�vR�Cp�����6���G�R���v&���VBr�t&�����rr�6���G�R���v��f�r�t��f�r�t�fW&l;�'BwТ�����F�c��F�b6�74��S�&&r�v��FR�R&�&FW"&�&FW"�v��FR�&�V�FVB��r�2#��6�74��S�'FW�B�w&��SFW�Bׇ2#�f&�v�WC����6�74��S�'FW�B�v��FRFW�B��rf��B�&��B#�6���GW'������F�c���F�c��Bbb����ƃB6�74��S�'FW�B�w&��CFW�Bׇ2f��B�6V֖&��BWW&66R�"�2#�G&�6�&�6������C��F�b6�74��S�'76Rג�"#��B�Ɩ�W2����Ɩ�R��������F�b�W�׶��6�74��S׶6•wFW�B�6��"&�V�FVB&r�v��FR�R&�&FW"���"r��Ɩ�R�v�����v�r�v&�&FW"�&�VR�Sr�v&�&FW"�w&��cp�����7�6�74��S׶6�wFW�Bׇ2f��B�6V֖&��Br�Ɩ�R�v�����v�r�wFW�B�&�VR�Cr�wFW�B�w&��Cr����Ɩ�R�v�����v�r�	�Ib�r�	�B�V�FRwТ��7���6�74��S�'FW�B�w&��3�B�#�Ɩ�R�FW�G������F�c���Т��F�c�����Т��F�c����Р�&WGW&����F�b6�74��S�&֖�ւ�67&VV�&r�&�6�FW�B�v��FR#���f&"�ࠢ�F�b6�74��S�&f�W�#���6�FV&"��Т�6�FR6�74��S�&��FFV��s�f�W�r�Sbf�W��6��v��B&�&FW"�"&�&FW"�v��FR�֖�ւն6�2�f��cG���&r�&�6��S#��6�74��S�'FW�B�w&��cFW�Bׇ2f��B�6V֖&��BWW&66RG&6���r�v�FW"��2�"�"#��fVF�V�����vW2�6Ɩ6R��B�����vR�����6��7B�6���vR�6�㰢&WGW&����'WGF���W�׷vR�GТ��6Ɩ6�ײ�����6WD7F�fUvR�vR�B��6WDFWF��6��FV�B��V���Т6�74��S׶6•vf�W��FV�2�6V�FW"v�2��2��"�R&�V�FVB��rFW�B�6�f��B��VF�V�G&�6�F������FW�B��VgBr�gV��r��7F�fUvR���vR�@��v&r�&�VR�S�#FW�B�&�VR�C&�&FW"&�&FW"�&�VR�S�3p��wFW�B�w&��C��fW#�FW�B�v��FR��fW#�&r�v��FR�Rp��Т�Ė6��6�74��S�'r�B��B"���7��vR���W���7���vR�&FvRbb���7�6�74��S�&���WF�&r�&�VR�S�#FW�B�&�VR�CFW�Bׇ2���R���R&�V�FVB�gV��f��B�&��B#�vR�&FvW���7���Т��'WGF������җР��F�b6�74��S�&���&r�v��FR�ג�""���6�74��S�'FW�B�w&��cFW�Bׇ2f��B�6V֖&��BWW&66RG&6���r�v�FW"��2�"�"#�fW&�L;������vW2�6Ɩ6R�B�����vR�����6��7B�6���vR�6�㰢&WGW&����'WGF���W�׷vR�GТ��6Ɩ6�ײ�����6WD7F�fUvR�vR�B��6WDFWF��6��FV�B��V���Т6�74��S׶6•vf�W��FV�2�6V�FW"v�2��2��"�R&�V�FVB��rFW�B�6�f��B��VF�V�G&�6�F������FW�B��VgBr�gV��r��7F�fUvR���vR�@��v&r�&�VR�S�#FW�B�&�VR�C&�&FW"&�&FW"�&�VR�S�3p��wFW�B�w&��C��fW#�FW�B�v��FR��fW#�&r�v��FR�Rp��Т�Ė6��6�74��S�'r�B��B"���7��vR���W���7����'WGF������җТ��6�FSࠢ�����6��FV�B��Т����6�74��S�&f�W���b�fW&f��rג�WF���ւն6�2�f��cG���#��F�b6�74��S�&���r�w��ׂ�WF�#���vR�VFW"��Т�7F�fUvR���v�fW'6��Brbb���F�b6�74��S�&f�W��FV�2�6V�FW"�W7F�g��&WGvVV��"ӂ#��F�c�ƃ6�74��S�'FW�B�7��f��B�&��B#��G���F6�&�&C�����6�74��S�'FW�B�w&��C�B�#���FV�Vf��7f&W"�fW'6��B(	B��R���6F���2��V�wF�����6���W#�����F�c��F�b6�74��S�&f�W��FV�2�6V�FW"v�B#��ƗfTFV��'WGF�����F�b6�74��S�&f�W��FV�2�6V�FW"v�"��B��"&r�V�W&�B�S�&�&FW"&�&FW"�V�W&�B�S�#&�V�FVB�gV��#��F�b6�74��S�'r�"��"&�V�FVB�gV��&r�V�W&�B�SƗfR�F�B"���7�6�74��S�'FW�B�V�W&�B�CFW�B�6�#�7�7FV��F�c��7����F�c��F�b6�74��S�'FW�B�&�v�B#��6�74��S�'FW�B�w&��CFW�Bׇ2#�6�7B�FFW'C����6�74��S�'FW�B�v��FRFW�B�6�#��WrFFR���F���6�UF��U7G&��r�v�����r�������F�c���F�c���F�c��Р���&V�FW"7F�fRvR��Т�7F�fUvR���v�fW'6��Brbb��fW'6��EvR��6V�V7D��6F���׷6��t��6F���FWF�����6V�V7D6��׷6��t6��FWF�����Т�7F�fUvR���w6�F�W"rbb�6�F�W%vR��Т�7F�fUvR���v&�����vW"rbb�&�����vW%vR��Т�7F�fUvR���v���6���W"rbb����6���W%vR��6V�V7D��6F���׷6��t��6F���FWF�����Т�7F�fUvR���v�V�FW"rbbķV�FW%vR��Т�7F�fUvR���w&�'FW"rbb�&�'FW%vR��Т�7F�fUvR���v���7F��Ɩ�vW"rbbĖ��7F��Ɩ�vW%vR��Т��F�c���������F�cࠢ��FWF���V���Т�FWF���V�6��FV�C׶FWF��6��FV�G���6��6Sײ����6WDFWF��6��FV�B��V������F�c�����
