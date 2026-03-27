'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  BarChart3, 
  MapPin, 
  Clock, 
  Settings, 
  Bell, 
  Menu,
  X,
  Activity,
  Users,
  TrendingUp,
  MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  name: string;
  icon: React.ElementType;
  href: string;
  badge?: number;
}

const navItems: NavItem[] = [
  { name: 'Oversikt', icon: BarChart3, href: '#dashboard' },
  { name: 'Samtaler', icon: Phone, href: '#calls', badge: 3 },
  { name: 'Avdelinger', icon: MapPin, href: '#locations' },
  { name: 'AI-Statistikk', icon: Activity, href: '#ai-stats' },
  { name: 'Kunder', icon: Users, href: '#customers' },
  { name: 'Innstillinger', icon: Settings, href: '#settings' },
];

interface LiveMetric {
  label: string;
  value: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ElementType;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Oversikt');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [liveMetrics, setLiveMetrics] = useState<LiveMetric[]>([
    { label: 'Aktive samtaler', value: '2', trend: 'up', icon: Phone },
    { label: 'Snitt tid', value: '2m 34s', trend: 'down', icon: Clock },
    { label: 'Suksessrate', value: '94%', trend: 'up', icon: TrendingUp },
  ]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Simuler live oppdateringer
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics(prev => prev.map(metric => {
        if (metric.label === 'Aktive samtaler') {
          const current = parseInt(metric.value);
          const change = Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0;
          const newValue = Math.max(0, current + change);
          return { ...metric, value: newValue.toString(), trend: change > 0 ? 'up' : change < 0 ? 'down' : 'neutral' };
        }
        return metric;
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">Handz On</h1>
                <p className="text-gray-400 text-xs">AI Dashboard</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setActiveItem(item.name)}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                      activeItem === item.name
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </a>
                );
              })}
            </div>

            {/* Right Side - Live Metrics & Actions */}
            <div className="hidden lg:flex items-center gap-6">
              {/* Live Metrics */}
              <div className="flex items-center gap-4 border-r border-white/10 pr-6">
                {liveMetrics.map((metric, i) => {
                  const Icon = metric.icon;
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <Icon className={cn(
                        'w-4 h-4',
                        metric.trend === 'up' ? 'text-emerald-400' : 
                        metric.trend === 'down' ? 'text-red-400' : 'text-gray-400'
                      )} />
                      <div>
                        <p className="text-white text-sm font-semibold">{metric.value}</p>
                        <p className="text-gray-500 text-xs">{metric.label}</p>
                      </div>
                      {metric.trend === 'up' && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 rounded-full bg-emerald-500"
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Time */}
              <div className="text-right">
                <p className="text-white text-sm font-mono">
                  {currentTime.toLocaleTimeString('no-NO', { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="text-gray-500 text-xs">
                  {currentTime.toLocaleDateString('no-NO', { weekday: 'short', day: 'numeric', month: 'short' })}
                </p>
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/95 border-t border-white/10"
            >
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => {
                        setActiveItem(item.name);
                        setIsOpen(false);
                      }}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all',
                        activeItem === item.name
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.name}</span>
                      {item.badge && (
                        <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </a>
                  );
                })}

                {/* Mobile Live Metrics */}
                <div className="pt-4 border-t border-white/10 mt-4">
                  <p className="text-gray-500 text-xs mb-3">Live Status</p>
                  <div className="grid grid-cols-3 gap-4">
                    {liveMetrics.map((metric, i) => {
                      const Icon = metric.icon;
                      return (
                        <div key={i} className="text-center">
                          <Icon className="w-5 h-5 mx-auto mb-1 text-gray-400" />
                          <p className="text-white text-sm font-semibold">{metric.value}</p>
                          <p className="text-gray-500 text-xs">{metric.label}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16" />
    </>
  );
}
