import { Switch, Route, useLocation } from "wouter";
import { useCallback } from "react";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { SessionProvider } from "@/context/SessionContext";
import KioskLayout from "@/components/layout/KioskLayout";
import Welcome from "@/pages/Welcome";
import Dashboard from "@/pages/Dashboard";
import ElectricityMenu from "@/pages/electricity/ElectricityMenu";
import PayBill from "@/pages/electricity/PayBill";
import ConsumptionHistory from "@/pages/electricity/ConsumptionHistory";
import NewConnection from "@/pages/electricity/NewConnection";
import MeterReading from "@/pages/electricity/MeterReading";
import ReportOutage from "@/pages/electricity/ReportOutage";
import ConnectionStatus from "@/pages/electricity/ConnectionStatus";
import GasMenu from "@/pages/gas/GasMenu";
import BookCylinder from "@/pages/gas/BookCylinder";
import PayPngBill from "@/pages/gas/PayPngBill";
import NewPngConnection from "@/pages/gas/NewPngConnection";
import GasComplaint from "@/pages/gas/GasComplaint";
import TrackDelivery from "@/pages/gas/TrackDelivery";
import SafetyInfo from "@/pages/gas/SafetyInfo";
import WaterMenu from "@/pages/water/WaterMenu";
import PayWaterBill from "@/pages/water/PayWaterBill";
import GenericWaterForm from "@/pages/water/GenericWaterForm";
import MunicipalMenu from "@/pages/municipal/MunicipalMenu";
import PropertyTax from "@/pages/municipal/PropertyTax";
import TradeLicense from "@/pages/municipal/TradeLicense";
import Certificates from "@/pages/municipal/Certificates";
import WastePickup from "@/pages/municipal/WastePickup";
import BuildingPlan from "@/pages/municipal/BuildingPlan";
import GrievanceMenu from "@/pages/grievance/GrievanceMenu";
import FileComplaint from "@/pages/grievance/FileComplaint";
import TrackComplaint from "@/pages/grievance/TrackComplaint";
import DocumentsMenu from "@/pages/documents/DocumentsMenu";
import PrintReceipt from "@/pages/documents/PrintReceipt";
import PaymentHistoryPage from "@/pages/documents/PaymentHistoryPage";
import ApplicationStatusPage from "@/pages/documents/ApplicationStatusPage";
import NoDuesCert from "@/pages/documents/NoDuesCert";
import ServiceSummary from "@/pages/documents/ServiceSummary";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";

function AuthenticatedRoutes() {
  return (
    <KioskLayout>
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/electricity" component={ElectricityMenu} />
        <Route path="/electricity/pay-bill" component={PayBill} />
        <Route path="/electricity/consumption" component={ConsumptionHistory} />
        <Route path="/electricity/new-connection" component={NewConnection} />
        <Route path="/electricity/meter-reading" component={MeterReading} />
        <Route path="/electricity/report-outage" component={ReportOutage} />
        <Route path="/electricity/connection-status" component={ConnectionStatus} />
        <Route path="/gas" component={GasMenu} />
        <Route path="/gas/book-cylinder" component={BookCylinder} />
        <Route path="/gas/pay-bill" component={PayPngBill} />
        <Route path="/gas/new-connection" component={NewPngConnection} />
        <Route path="/gas/complaint" component={GasComplaint} />
        <Route path="/gas/track-delivery" component={TrackDelivery} />
        <Route path="/gas/safety" component={SafetyInfo} />
        <Route path="/water" component={WaterMenu} />
        <Route path="/water/pay-bill" component={PayWaterBill} />
        <Route path="/water/new-connection">{() => <GenericWaterForm titleKey="newWaterConnection" isConnection />}</Route>
        <Route path="/water/meter-reading">{() => <GenericWaterForm titleKey="submitMeterReading" isMeterReading />}</Route>
        <Route path="/water/report-leakage">{() => <GenericWaterForm titleKey="reportLeakage" />}</Route>
        <Route path="/water/sewage">{() => <GenericWaterForm titleKey="sewageComplaint" />}</Route>
        <Route path="/water/quality">{() => <GenericWaterForm titleKey="waterQuality" />}</Route>
        <Route path="/municipal" component={MunicipalMenu} />
        <Route path="/municipal/property-tax" component={PropertyTax} />
        <Route path="/municipal/trade-license" component={TradeLicense} />
        <Route path="/municipal/certificates" component={Certificates} />
        <Route path="/municipal/waste-pickup" component={WastePickup} />
        <Route path="/municipal/building-plan" component={BuildingPlan} />
        <Route path="/grievance" component={GrievanceMenu} />
        <Route path="/grievance/file" component={FileComplaint} />
        <Route path="/grievance/track" component={TrackComplaint} />
        <Route path="/documents" component={DocumentsMenu} />
        <Route path="/documents/print-receipt" component={PrintReceipt} />
        <Route path="/documents/payment-history" component={PaymentHistoryPage} />
        <Route path="/documents/application-status" component={ApplicationStatusPage} />
        <Route path="/documents/no-dues" component={NoDuesCert} />
        <Route path="/documents/service-summary" component={ServiceSummary} />
        <Route>{() => <Dashboard />}</Route>
      </Switch>
    </KioskLayout>
  );
}

function AppRouter() {
  const { isAuthenticated, logout } = useAuth();
  const [, navigate] = useLocation();

  const handleTimeout = useCallback(() => {
    logout();
    navigate("/");
  }, [logout, navigate]);

  const [location] = useLocation();

  const isAdminRoute = location.startsWith("/admin");

  if (isAdminRoute) {
    return (
      <SessionProvider onTimeout={handleTimeout}>
        <Switch>
          <Route path="/admin" component={AdminLogin} />
          <Route path="/admin/dashboard" component={AdminDashboard} />
        </Switch>
      </SessionProvider>
    );
  }

  return (
    <SessionProvider onTimeout={handleTimeout}>
      {isAuthenticated ? (
        <AuthenticatedRoutes />
      ) : (
        <KioskLayout>
          <Welcome />
        </KioskLayout>
      )}
    </SessionProvider>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
