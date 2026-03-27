'use client';

import React from 'react';
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
  Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';

// Mock data - skal erstattes med data fra n8n workflow
const mockData = {
  today: {
    calls: 12,
    bookings: 8,
    revenue: 5200,
    avgCallTime: '2m 34s'
  },
  weekly: {
    calls: [15, 22, 18, 25, 30, 12, 8],
    bookings: [10, 15, 12, 18, 22, 8, 5]
  },
  locations: [
    { name: 'Lambertseter', calls: 45, bookings: 32 },
    { name: 'Sandvika', calls: 38, bookings: 28 },
    { name: 'Ski', calls: 22, bookings: 15 },
    { name: 'Lørenskog', calls: 18, bookings: 12 }
  ],
  recentCalls: [
    { time: '14:32', customer: 'Ola Nordmann', service: 'Premium vask', status: 'booked' },
    { time: '14:15', customer: 'Kari Hansen', service: 'Utvendig vask', status: 'booked' },
    { time: '13:58', customer: 'Per Olsen', service: 'Hjulskift', status: 'missed' },
    { time: '13:42', customer: 'Anne Svensen', service: 'Innvendig rens', status: 'booked' }
  ]
};

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ElementType;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color?: string;
}

function StatCard({ title, value, subtitle, icon: Icon, trend, trendValue, color = 'blue' }: StatCardProps) {
  const colorClasses = {
    blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
    emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    orange: 'bg-orange-500/10 border-orange-500/20 text-orange-400',
    purple: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
    red: 'bg-red-500/10 border-red-500/20 text-red-400'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/[0.07] transition-colors"
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
        <div className={cn('p-3 rounded-lg', colorClasses[color as keyof typeof colorClasses])}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </motion.div>
  );
}

function ActivityChart() {
  // Enkel SVG linjegraf
  const data = mockData.weekly.calls;
  const max = Math.max(...data);
  const points = data.map((value, i) => ({
    x: (i / (data.length - 1)) * 100,
    y: 100 - (value / max) * 80
  }));

  const pathD = points.map((p, i) => 
    `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
  ).join(' ');

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
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map(y => (
            <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
          ))}
          {/* Area under line */}
          <path
            d={`${pathD} L 100 100 L 0 100 Z`}
            fill="url(#gradient)"
            opacity="0.3"
          />
          {/* Line */}
          <path
            d={pathD}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        {/* X-axis labels */}
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>Man</span>
          <span>Tir</span>
          <span>Ons</span>
          <span>Tor</span>
          <span>Fre</span>
          <span>Lør</span>
          <span>Søn</span>
        </div>
      </div>
    </div>
  );
}

function LocationStats() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      <h3 className="text-white font-semibold mb-4">Avdelingsoversikt</h3>
      <div className="space-y-4">
        {mockData.locations.map((loc, i) => (
          <div key={i} className="flex items-center justify-between">
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

function RecentCalls() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      <h3 className="text-white font-semibold mb-4">Siste samtaler</h3>
      <div className="space-y-3">
        {mockData.recentCalls.map((call, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
            <div className="flex items-center gap-3">
              <div className={cn(
                'w-2 h-2 rounded-full',
                call.status === 'booked' ? 'bg-emerald-500' : 'bg-red-500'
              )} />
              <div>
                <p className="text-white text-sm">{call.customer}</p>
                <p className="text-gray-500 text-xs">{call.service}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-xs">{call.time}</p>
              <p className={cn(
                'text-xs',
                call.status === 'booked' ? 'text-emerald-400' : 'text-red-400'
              )}>
                {call.status === 'booked' ? 'Booket' : 'Mistet'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HandzOnDashboard() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Handz On Dashboard</h1>
            <p className="text-gray-400 mt-1">AI-telefonsvarer oversikt</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-400 text-sm">System aktiv</span>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-xs">Sist oppdatert</p>
              <p className="text-white text-sm">{new Date().toLocaleTimeString('no-NO')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Samtaler i dag"
          value={mockData.today.calls}
          subtitle="8 bookinger, 4 oppfølging"
          icon={Phone}
          trend="up"
          trendValue="+23% vs i går"
          color="blue"
        />
        <StatCard
          title="Dagens inntekt"
          value={`${mockData.today.revenue.toLocaleString()} kr`}
          subtitle="Estimert fra bookinger"
          icon={DollarSign}
          trend="up"
          trendValue="+15% vs i går"
          color="emerald"
        />
        <StatCard
          title="Gjennomsnittlig samtale"
          value={mockData.today.avgCallTime}
          subtitle="Effektiv håndtering"
          icon={Clock}
          trend="neutral"
          trendValue="Samme som snitt"
          color="orange"
        />
        <StatCard
          title="Aktive avdelinger"
          value={mockData.locations.length}
          subtitle="Alle operasjonelle"
          icon={MapPin}
          color="purple"
        />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Chart - takes 2 columns */}
        <div className="lg:col-span-2">
          <ActivityChart />
        </div>

        {/* Location Stats */}
        <div>
          <LocationStats />
        </div>

        {/* Recent Calls */}
        <div>
          <RecentCalls />
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
                <p className="text-gray-400 text-xs">Sandvika: 5 samtaler på vent</p>
              </div>
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-red-400 text-sm font-medium">Systemvarsel</p>
                <p className="text-gray-400 text-xs">SMS-tjeneste: Forventet forsinkelse</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
