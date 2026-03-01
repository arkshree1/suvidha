# SUVIDHA KIOSK - Unified Civic Services Self-Service KIOSK

## Overview
A touch-screen kiosk interface for Indian civic utility offices (C-DAC SUVIDHA Challenge). Portrait layout (1080x1920px) with multilingual support (English, Hindi, Marathi).

## Architecture
- **Frontend-only** app with mock data - no backend API needed
- React + TypeScript + Tailwind CSS
- Routing: wouter
- State: React Context (Auth, Language, Session)
- Icons: lucide-react

## Key Features
- Welcome/Auth screen (Mobile OTP, Aadhaar, Guest login)
- 6 service modules: Electricity, Gas, Water, Municipal, Grievance, Documents
- On-screen NumericKeypad and VirtualKeyboard components
- Session management with 120s auto-logout
- Multilingual support: All 22 scheduled Indian languages + English (23 total) via dropdown selector
  - Languages: English, Hindi, Marathi, Tamil, Bengali, Telugu, Kannada, Gujarati, Malayalam, Punjabi, Odia, Assamese, Urdu, Sanskrit, Sindhi, Nepali, Konkani, Manipuri, Bodo, Dogri, Kashmiri, Maithili, Santali
- Arya - Voice-enabled chatbot (bottom-right corner with pulse animation)
  - Uses Web Speech API for voice input (SpeechRecognition) and output (SpeechSynthesis)
  - Keyword-based routing to service modules
  - Supports multilingual speech in all Indian language locales
- Admin panel at /admin (password: admin123)
- Announcement ticker
- High contrast mode + font size controls
- Receipt screen with print/SMS/QR code

## File Structure
```
client/src/
  context/          - AuthContext, LanguageContext, SessionContext
  data/             - mockData.ts, translations.ts
  components/
    layout/         - Header, Footer, AnnouncementTicker, Breadcrumb, KioskLayout
    common/         - NumericKeypad, VirtualKeyboard, ServiceCard, ReceiptScreen, StatusTracker, LoadingSpinner, CssBarChart, SessionWarningModal
  pages/
    Welcome.tsx, Dashboard.tsx
    electricity/    - ElectricityMenu, PayBill, ConsumptionHistory, NewConnection, MeterReading, ReportOutage, ConnectionStatus
    gas/            - GasMenu, BookCylinder, PayPngBill, NewPngConnection, GasComplaint, TrackDelivery, SafetyInfo
    water/          - WaterMenu, PayWaterBill, GenericWaterForm
    municipal/      - MunicipalMenu, PropertyTax, TradeLicense, Certificates, WastePickup, BuildingPlan
    grievance/      - GrievanceMenu, FileComplaint, TrackComplaint
    documents/      - DocumentsMenu, PrintReceipt, PaymentHistoryPage, ApplicationStatusPage, NoDuesCert, ServiceSummary
    admin/          - AdminLogin, AdminDashboard
```

## Design System (UX4G Government of India)
- Primary: #006EB3
- Secondary: #F26522
- Background: #F5F7FA
- Touch targets: minimum 80x80px
- Font: Noto Sans + Noto Sans Devanagari
- WCAG 2.1 AA color contrast

## Running
`npm run dev` starts Express backend + Vite frontend on same port
