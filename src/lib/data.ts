// Mock data for Handz On Dashboard
// Skal erstattes med live data fra n8n workflows

export interface Location {
  name: string;
  calls: number;
  bookings: number;
  rate: number;
  answer: number;
  status: 'green' | 'amber' | 'red';
  addr: string;
}

export interface RecentCall {
  name: string;
  type: 'booked' | 'info' | 'transferred' | 'missed';
  icon: string;
  loc: string;
  desc: string;
  time: string;
  dur: string;
}

export interface TranscriptLine {
  who: 'ai' | 'human';
  text: string;
}

export interface Transcript {
  caller: string;
  loc: string;
  dur: string;
  type: 'booking' | 'info';
  lines: TranscriptLine[];
}

export interface Booking {
  time: string;
  name: string;
  service: string;
  loc: string;
}

export interface Customer {
  name: string;
  phone: string;
  loc: string;
  service: string;
  last: string;
  count: number;
}

export interface Report {
  title: string;
  date: string;
  type: 'weekly' | 'monthly';
  status: 'new' | 'read';
  summary: string;
}

export const locations: Location[] = [
  { name: 'Lambertseter', calls: 112, bookings: 45, rate: 40.2, answer: 98.2, status: 'green', addr: 'Lambertseter senter' },
  { name: 'Alna', calls: 105, bookings: 42, rate: 40.0, answer: 97.8, status: 'green', addr: 'Alna senter' },
  { name: 'Skullerud', calls: 98, bookings: 38, rate: 38.8, answer: 98.5, status: 'green', addr: 'Skullerudveien 15' },
  { name: 'Manglerud', calls: 95, bookings: 36, rate: 37.9, answer: 96.1, status: 'green', addr: 'Manglerud senter' },
  { name: 'Bryn', calls: 101, bookings: 40, rate: 39.6, answer: 97.4, status: 'green', addr: 'Brynsveien 3' },
  { name: 'Ryen', calls: 88, bookings: 33, rate: 37.5, answer: 98.0, status: 'green', addr: 'Ryensvingen 1' },
  { name: 'Helsfyr', calls: 92, bookings: 35, rate: 38.0, answer: 97.1, status: 'green', addr: 'Helsfyr T-bane' },
  { name: 'Tveita', calls: 78, bookings: 28, rate: 35.9, answer: 96.8, status: 'amber', addr: 'Tveita senter' },
  { name: 'Furuset', calls: 85, bookings: 32, rate: 37.6, answer: 97.5, status: 'green', addr: 'Furuset senter' },
  { name: 'Stovner', calls: 82, bookings: 30, rate: 36.6, answer: 95.2, status: 'amber', addr: 'Stovner senter' },
  { name: 'Grorud', calls: 79, bookings: 29, rate: 36.7, answer: 98.1, status: 'green', addr: 'Grorud senter' },
  { name: 'Romsås', calls: 72, bookings: 25, rate: 34.7, answer: 97.9, status: 'green', addr: 'Romsås senter' },
  { name: 'Lørenskog', calls: 86, bookings: 35, rate: 40.7, answer: 97.6, status: 'green', addr: 'Metro senter' },
  { name: 'Lillestrøm', calls: 74, bookings: 35, rate: 47.3, answer: 98.4, status: 'green', addr: 'Lillestrøm Torv' },
];

export const recentCalls: RecentCall[] = [
  { name: 'Erik Johansen', type: 'booked', icon: '📅', loc: 'Lambertseter', desc: 'Utvendig vask — i morgen kl 14:00', time: '3 min siden', dur: '1:42' },
  { name: 'Maria Olsen', type: 'booked', icon: '📅', loc: 'Bryn', desc: 'Premium vask — lørdag kl 10:30', time: '8 min siden', dur: '2:15' },
  { name: 'Anders Berg', type: 'info', icon: 'ℹ️', loc: 'Alna', desc: 'Spurte om pris for innvendig rens', time: '12 min siden', dur: '0:58' },
  { name: 'Ukjent nummer', type: 'transferred', icon: '🔀', loc: 'Stovner', desc: 'Overført til ansatt — spesiell forespørsel', time: '18 min siden', dur: '0:34' },
  { name: 'Kristine Haugen', type: 'booked', icon: '📅', loc: 'Skullerud', desc: 'Innvendig + utvendig — onsdag kl 09:00', time: '25 min siden', dur: '2:48' },
  { name: 'Thomas Lie', type: 'info', icon: 'ℹ️', loc: 'Manglerud', desc: 'Spurte om åpningstider i helgen', time: '31 min siden', dur: '0:45' },
  { name: 'Silje Kristiansen', type: 'booked', icon: '📅', loc: 'Lillestrøm', desc: 'Utvendig vask — mandag kl 11:00', time: '38 min siden', dur: '1:55' },
  { name: 'Petter Nilsen', type: 'booked', icon: '📅', loc: 'Lørenskog', desc: 'Premium pakke — tirsdag kl 13:30', time: '42 min siden', dur: '3:02' },
];

export const transcripts: Transcript[] = [
  {
    caller: 'Erik Johansen', loc: 'Lambertseter', dur: '1:42', type: 'booking',
    lines: [
      { who: 'ai', text: 'Hei, og velkommen til Handz On Bilvask! Hvordan kan jeg hjelpe deg?' },
      { who: 'human', text: 'Hei, jeg vil gjerne bestille en utvendig vask.' },
      { who: 'ai', text: 'Selvfølgelig! Hvilken lokasjon passer best for deg?' },
      { who: 'human', text: 'Lambertseter.' },
      { who: 'ai', text: 'Flott! Vi har ledig tid i morgen kl 14:00. Passer det?' },
      { who: 'human', text: 'Ja, det er perfekt.' },
      { who: 'ai', text: 'Da har jeg booket utvendig vask på Lambertseter i morgen kl 14:00. Du får en SMS-bekreftelse. Ha en fin dag!' },
    ]
  },
  {
    caller: 'Maria Olsen', loc: 'Bryn', dur: '2:15', type: 'booking',
    lines: [
      { who: 'ai', text: 'Hei, og velkommen til Handz On Bilvask! Hvordan kan jeg hjelpe deg?' },
      { who: 'human', text: 'Hei! Hva koster premium-vasken deres?' },
      { who: 'ai', text: 'Premium-pakken koster 599 kr og inkluderer utvendig vask, innvendig støvsuging, og polering. Skal jeg booke en time?' },
      { who: 'human', text: 'Ja, på Bryn helst. Har dere ledig lørdag?' },
      { who: 'ai', text: 'Lørdag kl 10:30 er ledig på Bryn. Skal jeg booke den?' },
      { who: 'human', text: 'Ja takk!' },
      { who: 'ai', text: 'Herlig! Premium vask på Bryn, lørdag kl 10:30. SMS-bekreftelse er på vei. Velkommen!' },
    ]
  },
  {
    caller: 'Anders Berg', loc: 'Alna', dur: '0:58', type: 'info',
    lines: [
      { who: 'ai', text: 'Hei, og velkommen til Handz On Bilvask!' },
      { who: 'human', text: 'Hei, hva koster innvendig rens?' },
      { who: 'ai', text: 'Innvendig rens starter på 399 kr. Vi tilbyr også en komplett pakke med utvendig vask for 699 kr. Ønsker du å booke?' },
      { who: 'human', text: 'Nei, jeg skal bare sjekke prisen. Takk!' },
      { who: 'ai', text: 'Ingen problem! Ring gjerne tilbake når du er klar. Ha en fin dag!' },
    ]
  },
];

export const bookings: Booking[] = [
  { time: '09:00', name: 'Kristine Haugen', service: 'Innvendig + utvendig', loc: 'Skullerud' },
  { time: '09:30', name: 'Lars Pedersen', service: 'Utvendig vask', loc: 'Alna' },
  { time: '10:00', name: 'Anne Bakken', service: 'Premium pakke', loc: 'Lambertseter' },
  { time: '10:30', name: 'Maria Olsen', service: 'Premium vask', loc: 'Bryn' },
  { time: '11:00', name: 'Silje Kristiansen', service: 'Utvendig vask', loc: 'Lillestrøm' },
  { time: '11:30', name: 'Knut Hansen', service: 'Innvendig rens', loc: 'Helsfyr' },
  { time: '12:00', name: 'Ingrid Dahl', service: 'Utvendig vask', loc: 'Furuset' },
  { time: '13:00', name: 'Erik Johansen', service: 'Utvendig vask', loc: 'Lambertseter' },
  { time: '13:30', name: 'Petter Nilsen', service: 'Premium pakke', loc: 'Lørenskog' },
  { time: '14:00', name: 'Tone Larsen', service: 'Innvendig + utvendig', loc: 'Manglerud' },
  { time: '14:30', name: 'Rune Hauge', service: 'Utvendig vask', loc: 'Grorud' },
  { time: '15:00', name: 'Mette Sørensen', service: 'Premium pakke', loc: 'Ryen' },
];

export const customers: Customer[] = [
  { name: 'Erik Johansen', phone: '+47 912 34 567', loc: 'Lambertseter', service: 'Utvendig vask', last: 'I dag', count: 3 },
  { name: 'Maria Olsen', phone: '+47 923 45 678', loc: 'Bryn', service: 'Premium pakke', last: 'I dag', count: 5 },
  { name: 'Kristine Haugen', phone: '+47 934 56 789', loc: 'Skullerud', service: 'Innvendig + utvendig', last: 'I dag', count: 2 },
  { name: 'Lars Pedersen', phone: '+47 945 67 890', loc: 'Alna', service: 'Utvendig vask', last: 'I går', count: 1 },
  { name: 'Silje Kristiansen', phone: '+47 956 78 901', loc: 'Lillestrøm', service: 'Utvendig vask', last: 'I dag', count: 4 },
  { name: 'Petter Nilsen', phone: '+47 967 89 012', loc: 'Lørenskog', service: 'Premium pakke', last: 'I dag', count: 2 },
  { name: 'Anne Bakken', phone: '+47 978 90 123', loc: 'Lambertseter', service: 'Innvendig rens', last: 'I går', count: 7 },
  { name: 'Knut Hansen', phone: '+47 989 01 234', loc: 'Helsfyr', service: 'Innvendig rens', last: '2 dager siden', count: 1 },
  { name: 'Ingrid Dahl', phone: '+47 990 12 345', loc: 'Furuset', service: 'Utvendig vask', last: 'I dag', count: 3 },
  { name: 'Tone Larsen', phone: '+47 901 23 456', loc: 'Manglerud', service: 'Innvendig + utvendig', last: 'I dag', count: 2 },
  { name: 'Rune Hauge', phone: '+47 412 34 567', loc: 'Grorud', service: 'Utvendig vask', last: 'I dag', count: 1 },
  { name: 'Mette Sørensen', phone: '+47 423 45 678', loc: 'Ryen', service: 'Premium pakke', last: 'I dag', count: 6 },
  { name: 'Geir Kristoffersen', phone: '+47 434 56 789', loc: 'Stovner', service: 'Utvendig vask', last: 'I går', count: 2 },
  { name: 'Lise Berg', phone: '+47 445 67 890', loc: 'Tveita', service: 'Innvendig rens', last: '2 dager siden', count: 1 },
  { name: 'Trond Haugen', phone: '+47 456 78 901', loc: 'Romsås', service: 'Premium pakke', last: 'I går', count: 4 },
];

export const reports: Report[] = [
  { title: 'Ukerapport — Uke 13', date: '24. mars 2026', type: 'weekly', status: 'new', summary: '1 247 anrop, 483 bookinger, 97.3% svarrate. Lillestrøm toppresterte.' },
  { title: 'Ukerapport — Uke 12', date: '17. mars 2026', type: 'weekly', status: 'read', summary: '1 014 anrop, 392 bookinger, 95.2% svarrate. Ny rekord for Bryn.' },
  { title: 'Månedsrapport — Februar 2026', date: '1. mars 2026', type: 'monthly', status: 'read', summary: '3 842 anrop, 1 488 bookinger, 96.1% snitt svarrate. Stovner forbedret seg 12%.' },
  { title: 'Ukerapport — Uke 11', date: '10. mars 2026', type: 'weekly', status: 'read', summary: '987 anrop, 378 bookinger, 96.4% svarrate.' },
  { title: 'Ukerapport — Uke 10', date: '3. mars 2026', type: 'weekly', status: 'read', summary: '923 anrop, 351 bookinger, 95.8% svarrate.' },
  { title: 'Månedsrapport — Januar 2026', date: '1. februar 2026', type: 'monthly', status: 'read', summary: '3 201 anrop, 1 203 bookinger, 94.7% snitt svarrate. Første fulle driftsmåned.' },
  { title: 'Ukerapport — Uke 9', date: '24. februar 2026', type: 'weekly', status: 'read', summary: '891 anrop, 334 bookinger, 95.1% svarrate.' },
  { title: 'Oppstartsrapport', date: '15. januar 2026', type: 'monthly', status: 'read', summary: 'Alle 14 lokasjoner aktivert. Første uke: 412 anrop, 142 bookinger.' },
];

// Chart data
export const weekLabels = ['Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør', 'Søn'];
export const weekCalls = [156, 189, 172, 201, 198, 186, 145];
export const weekBookings = [58, 72, 65, 81, 78, 74, 55];

// Computed stats
export function getStats() {
  const totalCalls = locations.reduce((s, l) => s + l.calls, 0);
  const totalBookings = locations.reduce((s, l) => s + l.bookings, 0);
  const avgAnswer = (locations.reduce((s, l) => s + l.answer, 0) / locations.length).toFixed(1);
  const savedRevenue = Math.round(totalBookings * 500);
  const convRate = ((totalBookings / totalCalls) * 100).toFixed(1);
  const missed = totalCalls - Math.round(totalCalls * 0.973);

  return { totalCalls, totalBookings, avgAnswer, savedRevenue, convRate, missed };
}
