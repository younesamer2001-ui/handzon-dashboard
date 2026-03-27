# Handz On Dashboard

AI-telefonsvarer dashboard for Handz On Bilvask.

## Tech Stack
- Next.js 14
- React + TypeScript
- Tailwind CSS
- Framer Motion

## Dashboard Features
- 📊 Real-time samtalestatistikk
- 📈 Aktivitetsgrafer
- 🏢 Avdelingsoversikt
- 📞 Siste samtaler
- 🤖 AI-ytelse metrics
- ⚠️ Varsler og alerts

## Data Flow
```
Vapi AI Agent → n8n Workflow → Dashboard API → React Frontend
```

## Development
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Deployment
Deployes til Vercel med statisk export.
