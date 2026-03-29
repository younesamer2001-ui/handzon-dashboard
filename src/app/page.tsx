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
          <p className="text-sm font-bold">Prøv AI ­assistenten live</p>
          <p className="text-xs text-blue-200">Ring og hør lv</p>
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
                <p className="text-gray-400 text-sm">Overført til menneske</p>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-orange-400" />
              <h3 className="text-white font-semibold">Varsler</h3>
            </div>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <p className="text-orange-400 text-sm font-medium">Høy trafikk</p>
                <p className="text-gray-400 text-xs">Stovner: 5 samtaler på vent</p>
              </div>
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-red-400 text-sm font-medium">Systemvarsel</p>
                <p className="text-gray-400 text-xs">SMS-tjeneste: Forventet forsinkelse</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Location Performance Table */}
      <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4">Ytelse per lokasjon</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-2 text-gray-400 font-semibold text-xs uppercase">Lokasjon</th>
                <th className="text-left py-3 px-2 text-gray-400 font-semibold text-xs uppercase">Anrop</th>
                <th className="text-left py-3 px-2 text-gray-400 font-semibold text-xs uppercase">Bookinger</th>
                <th className="text-left py-3 px-2 text-gray-400 font-semibold text-xs uppercase">Konvertering</th>
                <th className="text-left py-3 px-2 text-gray-400 font-semibold text-xs uppercase">Svarrate</th>
                <th className="text-left py-3 px-2 text-gray-400 font-semibold text-xs uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((loc, i) => (
                <tr
                  key={i}
                  className="border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors"
                  onClick={() => onSelectLocation(loc)}
                >
                  <td className="py-3 px-2 font-medium text-white">{loc.name}</td>
                  <td className="py-3 px-2 text-gray-300">{loc.calls}</td>
                  <td className="py-3 px-2 text-gray-300">{loc.bookings}</td>
                  <td className="py-3 px-2">
                    <span className={cn(
                      'text-sm',
                      loc.rate > 40 ? 'text-emerald-400' : loc.rate > 36 ? 'text-blue-400' : 'text-orange-400'
                    )}>
                      {loc.rate}%
                    </span>
                    <div className="w-20 h-1.5 bg-white/10 rounded-full overflow-hidden inline-block ml-2 align-middle">
                      <div
                        className={cn(
                          'h-full rounded-full',
                          loc.rate > 40 ? 'bg-emerald-500' : loc.rate > 36 ? 'bg-blue-500' : 'bg-orange-500'
                        )}
                        style={{ width: `${loc.rate * 2}%` }}
                      />
                    </div>
                  </td>
                  <td className="py-3 px-2 text-gray-300">{loc.answer}%</td>
                  <td className="py-3 px-2">
                    <span className={cn(
                      'text-xs font-semibold px-2.5 py-1 rounded-md',
                      loc.status === 'green' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-orange-500/10 text-orange-400'
                    )}>
                      {loc.status === 'green' ? 'Aktiv' : 'Lav konv.'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// ==================== PAGE: SAMTALER ====================
function SamtalerPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Samtaler</h2>
          <p className="text-gray-400 text-sm">Alle AI-samtaler med transkript</p>
        </div>
      </div>

      {/* All recent calls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {recentCalls.map((call, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/[0.07] transition-colors cursor-pointer">
            <div className="flex items-start gap-3">
              <div className={cn(
                'w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0',
                call.type === 'booked' ? 'bg-emerald-500/10' :
                call.type === 'info' ? 'bg-blue-500/10' : 'bg-orange-500/10'
              )}>
                {call.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <span className="text-white font-semibold text-sm">{call.name}</span>
                  <span className="text-gray-500 text-xs">{call.time}</span>
                </div>
                <p className="text-gray-400 text-xs mt-1">{call.loc} — {call.desc}</p>
                <div className="flex gap-2 mt-2">
                  <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/10">{call.dur}</span>
                  <span className={cn(
                    'text-xs px-2 py-0.5 rounded',
                    call.type === 'booked' ? 'bg-emerald-500/10 text-emerald-400' :
                    call.type === 'info' ? 'bg-blue-500/10 text-blue-400' : 'bg-orange-500/10 text-orange-400'
                  )}>
                    {call.type === 'booked' ? 'Booket' : call.type === 'info' ? 'Info' : 'Overført'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Transcripts */}
      <h3 className="text-white font-semibold mb-4">Transkripsjoner</h3>
      <div className="space-y-4">
        {transcripts.map((t, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
            <div className="flex justify-between items-center mb-3">
              <span className="text-white font-semibold">{t.caller} — {t.loc}</span>
              <span className="text-gray-500 text-sm">{t.dur}</span>
            </div>
            <div className="space-y-2">
              {t.lines.map((line, j) => (
                <div key={j} className={cn(
                  'text-sm pl-3 border-l-2',
                  line.who === 'ai' ? 'border-blue-500 text-blue-300' : 'border-gray-600 text-gray-300'
                )}>
                  <span className="text-xs text-gray-500 mr-2">{line.who === 'ai' ? '🤖 AI' : '👤 Kunde'}</span>
                  {line.text}
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-3">
              <span className={cn(
                'text-xs px-2 py-0.5 rounded',
                t.type === 'booking' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'
              )}>
                {t.type === 'booking' ? '📅 Booking' : 'ℹ️ Info'}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-gray-400">{t.loc}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// ==================== PAGE: BOOKINGER ====================
function BookingerPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Bookinger i dag</h2>
          <p className="text-gray-400 text-sm">12 bookinger — fredag 28. mars</p>
        </div>
      </div>

      <div className="space-y-3">
        {bookings.map((b, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between hover:bg-white/[0.07] transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <span className="text-blue-400 font-bold text-sm min-w-[50px]">{b.time}</span>
              <div>
                <p className="text-white font-semibold text-sm">{b.name}</p>
                <p className="text-gray-400 text-xs">{b.service}</p>
              </div>
            </div>
            <span className="text-gray-400 text-xs">📍 {b.loc}</span>
          </div>
        ))}
      </div>
    </>
  );
}

// ==================== PAGE: LOKASJONER ====================
function LokasjonerPage({ onSelectLocation }: { onSelectLocation: (loc: Location) => void }) {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Lokasjoner</h2>
          <p className="text-gray-400 text-sm">Alle {locations.length} aktive lokasjoner</p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard title="Aktive lokasjoner" value={locations.length} icon={MapPin} color="emerald" />
        <StatCard title="Gjennomsnittlig svarrate" value="97.3%" icon={Activity} color="blue" />
        <StatCard title="Beste lokasjon" value="Lillestrøm" subtitle="47.3% konvertering" icon={TrendingUp} color="purple" />
      </div>

      {/* Full location table */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4">Alle lokasjoner</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-2 text-gray-400 font-semibold text-xs uppercase">Lokasjon</th>
                <th className="text-left py-3 px-2 text-gray-400 font-semibold text-xs uppercase">Adresse</th>
                <th className="text-left py-3 px-2 text-gray-400 font-semibold text-xs uppercase">Anrop/dag</th>
                <th className="text-left py-3 px-2 text-gray-400 font-semibold text-xs uppercase">Svarrate</th>
                <th className="text-left py-3 px-2 text-gray-400 font-semibold text-xs uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((loc, i) => (
                <tr
                  key={i}
                  className="border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors"
                  onClick={() => onSelectLocation(loc)}
                >
                  <td className="py-3 px-2 font-medium text-white">{loc.name}</td>
                  <td className="py-3 px-2 text-gray-400">{loc.addr}</td>
                  <td className="py-3 px-2 text-gray-300">{Math.round(loc.calls / 7)}</td>
                  <td className="py-3 px-2 text-gray-300">{loc.answer}%</td>
                  <td className="py-3 px-2">
                    <span className={cn(
                      'text-xs font-semibold px-2.5 py-1 rounded-md',
                      loc.status === 'green' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-orange-500/10 text-orange-400'
                    )}>
                      {loc.status === 'green' ? 'Aktiv' : 'Lav konv.'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// ==================== PAGE: KUNDER ====================
function KunderPage() {
  const [search, setSearch] = useState('');
  const filtered = search
    ? customers.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.loc.toLowerCase().includes(search.toLowerCase()))
    : customers;

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Kunder</h2>
          <p className="text-gray-400 text-sm">Kundebase fra AI-samtaler — 847 registrerte</p>
        </div>
        <input
          type="text"
          placeholder="Søk kunde..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white/5 border border-white/10 text-white px-4 py-2 rounded-lg text-sm outline-none focus:border-blue-500/50 transition-colors"
        />
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Totalt registrerte" value="847" icon={Users} color="blue" />
        <StatCard title="Nye denne uken" value="62" icon={TrendingUp} color="emerald" />
        <StatCard title="Gjengangere" value="34%" icon={Activity} color="purple" />
        <StatCard title="Snitt bookinger" value="2.4" icon={Calendar} color="orange" />
      </div>

      {/* Customer table */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4">Siste registrerte kunder <span className="font-normal text-xs text-gray-500">— viser {filtered.length} nyeste</span></h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-2 text-gray-400 font-semibold text-xs uppercase">Navn</th>
                <th className="text-left py-3 px-2 text-gray-400 font-semibold text-xs uppercase">Telefon</th>
                <th className="text-left py-3 px-2 text-gray-400 font-semibold text-xs uppercase">Lokasjon</th>
                <th className="text-left py-3 px-2 text-gray-400 font-semibold text-xs uppercase">Foretrukket tjeneste</th>
                <th className="text-left py-3 px-2 text-gray-400 font-semibold text-xs uppercase">Siste kontakt</th>
                <th className="text-left py-3 px-2 text-gray-400 font-semibold text-xs uppercase">Bookinger</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors">
                  <td className="py-3 px-2 font-medium text-white">{c.name}</td>
                  <td className="py-3 px-2 text-gray-400">{c.phone}</td>
                  <td className="py-3 px-2 text-gray-300">{c.loc}</td>
                  <td className="py-3 px-2 text-gray-300">{c.service}</td>
                  <td className="py-3 px-2 text-gray-400">{c.last}</td>
                  <td className="py-3 px-2">
                    <span className="bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded-md text-xs font-bold">{c.count}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// ==================== PAGE: RAPPORTER ====================
function RapporterPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Rapporter</h2>
          <p className="text-gray-400 text-sm">Ukentlige og månedlige rapporter</p>
        </div>
      </div>

      <div className="space-y-3">
        {reports.map((r, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5 flex items-center justify-between hover:bg-white/[0.07] transition-colors cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className={cn(
                'w-10 h-10 rounded-lg flex items-center justify-center text-lg',
                r.type === 'weekly' ? 'bg-blue-500/10' : 'bg-purple-500/10'
              )}>
                {r.type === 'weekly' ? '📋' : '📊'}
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{r.title}</p>
                <p className="text-gray-500 text-xs mt-0.5">{r.date} — {r.summary.substring(0, 60)}...</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={cn(
                'text-xs font-semibold px-2.5 py-1 rounded-md',
                r.status === 'new' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-gray-500'
              )}>
                {r.status === 'new' ? 'Ny' : 'Lest'}
              </span>
              <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-400 transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// ==================== PAGE: INNSTILLINGER ====================
function ToggleSwitch({ defaultOn = true, onToggle }: { defaultOn?: boolean; onToggle?: (on: boolean) => void }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div
      className={cn(
        'w-11 h-6 rounded-full relative cursor-pointer transition-all flex-shrink-0',
        on ? 'bg-blue-500' : 'bg-gray-700'
      )}
      onClick={() => { setOn(!on); onToggle?.(!on); }}
    >
      <div className={cn(
        'w-4 h-4 bg-white rounded-full absolute top-1 transition-all shadow',
        on ? 'left-6' : 'left-1'
      )} />
    </div>
  );
}

function InnstillingerPage() {
  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Innstillinger</h2>
        <p className="text-gray-400 text-sm">Konfigurer AI-assistenten</p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-4">
        <h3 className="text-white font-semibold mb-4">AI-assistent</h3>
        <div className="space-y-0">
          {[
            { label: 'AI aktiv', hint: 'Slå av for å stappe AI-svar midlertidig' },
            { label: 'Automatisk booking', hint: 'Tillat AI å booke timer uten bekreftelse' },
            { label: 'SMS-bekreftelse', hint: 'Send SMS til kunde etter booking' },
            { label: 'Ansattvarsel', hint: 'Varsle ansatte om nye bookinger' },
            { label: 'Overføring til ansatt', hint: 'Tillat AI å sette over til et menneske' },
          ].map((s, i) => (
            <div key={i} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
              <div>
                <p className="text-white text-sm">{s.label}</p>
                <p className="text-gray-500 text-xs mt-0.5">{s.hint}</p>
              </div>
              <ToggleSwitch />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4">Varsler</h3>
        <div className="space-y-0">
          {[
            { label: 'E-postvarsler', hint: 'Daglig oppsummering til oh@handzon.no' },
            { label: 'Ukentlig rapport', hint: 'Automatisk rapport hver mandag kl 08:00' },
          ].map((s, i) => (
            <div key={i} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
              <div>
                <p className="text-white text-sm">{s.label}</p>
                <p className="text-gray-500 text-xs mt-0.5">{s.hint}</p>
              </div>
              <ToggleSwitch />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ==================== DETAIL PANEL ====================
function DetailPanel({ content, onClose }: { content: React.ReactNode | null; onClose: () => void }) {
  return (
    <div className={cn('detail-panel', content ? 'open' : '')}>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-1 rounded"
      >
        <X className="w-5 h-5" />
      </button>
      {content}
    </div>
  );
}

// ==================== MAIN DASHBOARD ====================
export default function HandzOnDashboard() {
  const [activePage, setActivePage] = useState('oversikt');
  const [detailContent, setDetailContent] = useState<React.ReactNode | null>(null);

  function showLocationDetail(loc: Location) {
    const locCalls = recentCalls.filter(c => c.loc === loc.name);
    setDetailContent(
      <div>
        <h2 className="text-xl font-bold text-white">{loc.name}</h2>
        <p className="text-gray-400 text-sm mb-6">📍 {loc.addr}</p>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white/5 border border-white/10 rounded-lg p-3">
            <p className="text-gray-500 text-xs">Anrop</p>
            <p className="text-blue-400 text-xl font-bold">{loc.calls}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-3">
            <p className="text-gray-500 text-xs">Bookinger</p>
            <p className="text-emerald-400 text-xl font-bold">{loc.bookings}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-3">
            <p className="text-gray-500 text-xs">Konvertering</p>
            <p className="text-white text-xl font-bold">{loc.rate}%</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-3">
            <p className="text-gray-500 text-xs">Svarrate</p>
            <p className="text-white text-xl font-bold">{loc.answer}%</p>
          </div>
        </div>
        <h4 className="text-gray-400 text-xs font-semibold uppercase mb-3">Siste samtaler herfra</h4>
        {locCalls.length > 0 ? locCalls.map((c, i) => (
          <div key={i} className="flex items-center gap-2 p-2 rounded bg-white/5 mb-2 text-sm">
            <div className={cn(
              'w-1.5 h-1.5 rounded-full flex-shrink-0',
              c.type === 'booked' ? 'bg-emerald-500' : c.type === 'info' ? 'bg-blue-500' : 'bg-orange-500'
            )} />
            <span className="text-white">{c.name}</span>
            <span className="text-gray-500 ml-auto text-xs">{c.time}</span>
          </div>
        )) : (
          <p className="text-gray-500 text-sm">Ingen samtaler akkurat nå</p>
        )}
      </div>
    );
  }

  function showCallDetail(call: RecentCall) {
    const t = transcripts.find(x => x.caller === call.name);
    setDetailContent(
      <div>
        <h2 className="text-xl font-bold text-white">{call.name}</h2>
        <p className="text-gray-400 text-sm mb-6">📍 {call.loc} — {call.time} — {call.dur}</p>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white/5 border border-white/10 rounded-lg p-3">
            <p className="text-gray-500 text-xs">Type</p>
            <p className={cn('text-lg font-bold',
              call.type === 'booked' ? 'text-emerald-400' : call.type === 'info' ? 'text-blue-400' : 'text-orange-400'
            )}>
              {call.type === 'booked' ? 'Booking' : call.type === 'info' ? 'Info' : 'Overført'}
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-3">
            <p className="text-gray-500 text-xs">Varighet</p>
            <p className="text-white text-lg font-bold">{call.dur}</p>
          </div>
        </div>
        {t && (
          <>
            <h4 className="text-gray-400 text-xs font-semibold uppercase mb-3">Transkripsjon</h4>
            <div className="space-y-2">
              {t.lines.map((line, j) => (
                <div key={j} className={cn(
                  'text-sm p-2 rounded bg-white/5 border-l-2',
                  line.who === 'ai' ? 'border-blue-500' : 'border-gray-600'
                )}>
                  <span className={cn('text-xs font-semibold', line.who === 'ai' ? 'text-blue-400' : 'text-gray-400')}>
                    {line.who === 'ai' ? '🤖 AI' : '👤 Kunde'}
                  </span>
                  <p className="text-gray-300 mt-1">{line.text}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex w-56 flex-col gap-1 p-4 border-r border-white/10 min-h-[calc(100vh-64px)] bg-black/50">
          <p className="text-gray-600 text-xs font-semibold uppercase tracking-wider px-3 mb-2">Hovedmeny</p>
          {pages.slice(0, 4).map((page) => {
            const Icon = page.icon;
            return (
              <button
                key={page.id}
                onClick={() => { setActivePage(page.id); setDetailContent(null); }}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left w-full',
                  activePage === page.id
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{page.name}</span>
                {page.badge && (
                  <span className="ml-auto bg-blue-500/20 text-blue-400 text-xs px-1.5 py-0.5 rounded-full font-bold">{page.badge}</span>
                )}
              </button>
            );
          })}

          <div className="h-px bg-white/10 my-2" />
          <p className="text-gray-600 text-xs font-semibold uppercase tracking-wider px-3 mb-2">Verktøy</p>
          {pages.slice(4).map((page) => {
            const Icon = page.icon;
            return (
              <button
                key={page.id}
                onClick={() => { setActivePage(page.id); setDetailContent(null); }}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left w-full',
                  activePage === page.id
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{page.name}</span>
              </button>
            );
          })}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto max-h-[calc(100vh-64px)]">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            {activePage === 'oversikt' && (
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold">Handz On Dashboard</h1>
                  <p className="text-gray-400 mt-1">AI-telefonsvarer oversikt — alle {locations.length} lokasjoner</p>
                </div>
                <div className="flex items-center gap-4">
                  <LiveDemoButton />
                  <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 live-dot" />
                    <span className="text-emerald-400 text-sm">System aktiv</span>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-xs">Sist oppdatert</p>
                    <p className="text-white text-sm">{new Date().toLocaleTimeString('no-NO')}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Render active page */}
            {activePage === 'oversikt' && <OversiktPage onSelectLocation={showLocationDetail} onSelectCall={showCallDetail} />}
            {activePage === 'samtaler' && <SamtalerPage />}
            {activePage === 'bookinger' && <BookingerPage />}
            {activePage === 'lokasjoner' && <LokasjonerPage onSelectLocation={showLocationDetail} />}
            {activePage === 'kunder' && <KunderPage />}
            {activePage === 'rapporter' && <RapporterPage />}
            {activePage === 'innstillinger' && <InnstillingerPage />}
          </div>
        </main>
      </div>

      {/* Detail Panel */}
      <DetailPanel content={detailContent} onClose={() => setDetailContent(null)} />
    </div>
  );
}
