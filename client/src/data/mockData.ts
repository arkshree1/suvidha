export const mockCitizen = {
  name: "Ramesh Kumar",
  mobile: "9876543210",
  aadhaar: "XXXX-XXXX-7890",
  accounts: {
    electricity: {
      consumerId: "MH-042-789456",
      area: "Pune Ward 12",
      outstanding: 1245.50,
      dueDate: "20 Dec 2024",
      units: 312,
      arrears: 0,
      name: "Ramesh Kumar",
    },
    gas: {
      customerId: "PNG-45678",
      type: "PNG",
      outstanding: 876.00,
      dueDate: "28 Dec 2024",
      name: "Ramesh Kumar",
    },
    water: {
      accountId: "PCB-98765",
      outstanding: 340.00,
      dueDate: "25 Dec 2024",
      name: "Ramesh Kumar",
      units: 45,
    },
    municipal: {
      propertyId: "PMC-2024-45678",
      outstanding: 12500.00,
      name: "Ramesh Kumar",
    }
  }
};

export const mockPaymentHistory = [
  { id: "TXN-2024-001", date: "15 Nov 2024", service: "Electricity", description: "Monthly Bill Payment", amount: 1180.00, status: "Success" },
  { id: "TXN-2024-002", date: "10 Nov 2024", service: "Water", description: "Water Bill Q3 2024", amount: 340.00, status: "Success" },
  { id: "TXN-2024-003", date: "05 Nov 2024", service: "Gas", description: "PNG Monthly Bill", amount: 650.00, status: "Success" },
  { id: "TXN-2024-004", date: "01 Nov 2024", service: "Municipal", description: "Property Tax H2 2024", amount: 6250.00, status: "Success" },
  { id: "TXN-2024-005", date: "20 Oct 2024", service: "Electricity", description: "Monthly Bill Payment", amount: 1040.00, status: "Success" },
  { id: "TXN-2024-006", date: "15 Oct 2024", service: "Gas", description: "LPG Cylinder Booking", amount: 903.00, status: "Success" },
  { id: "TXN-2024-007", date: "10 Oct 2024", service: "Water", description: "Water Bill Q2 2024", amount: 285.00, status: "Success" },
  { id: "TXN-2024-008", date: "01 Oct 2024", service: "Electricity", description: "Monthly Bill Payment", amount: 1120.00, status: "Failed" },
  { id: "TXN-2024-009", date: "20 Sep 2024", service: "Gas", description: "PNG Monthly Bill", amount: 720.00, status: "Success" },
  { id: "TXN-2024-010", date: "15 Sep 2024", service: "Municipal", description: "Trade License Fee", amount: 2500.00, status: "Success" },
];

export const mockGrievances = [
  { id: "GRV-2024-00142", department: "Electricity", category: "Power Outage", description: "Frequent power cuts in Ward 12 area during evening hours", status: "Resolved", filedDate: "10 Nov 2024", updatedDate: "18 Nov 2024", officerName: "Mr. Suresh Patil" },
  { id: "GRV-2024-00198", department: "Water", category: "Low Pressure", description: "Very low water pressure on 3rd floor since last week", status: "Under Investigation", filedDate: "22 Nov 2024", updatedDate: "25 Nov 2024", officerName: "Ms. Priya Sharma" },
  { id: "GRV-2024-00201", department: "Municipal", category: "Waste Collection", description: "No waste pickup for the last 3 days in sector 5", status: "Assigned to Officer", filedDate: "28 Nov 2024", updatedDate: "29 Nov 2024", officerName: "Mr. Rajesh Gupta" },
  { id: "GRV-2024-00215", department: "Gas", category: "Billing Issue", description: "Incorrect meter reading on November bill", status: "Submitted", filedDate: "02 Dec 2024", updatedDate: "02 Dec 2024", officerName: "" },
  { id: "GRV-2024-00220", department: "Water", category: "Leakage", description: "Pipeline leakage near main road junction ward 8", status: "Resolved", filedDate: "05 Dec 2024", updatedDate: "12 Dec 2024", officerName: "Mr. Amit Deshmukh" },
];

export const mockConsumption = [
  { month: "Jul 2024", units: 280, amount: 1120 },
  { month: "Aug 2024", units: 310, amount: 1245 },
  { month: "Sep 2024", units: 295, amount: 1180 },
  { month: "Oct 2024", units: 260, amount: 1040 },
  { month: "Nov 2024", units: 320, amount: 1280 },
  { month: "Dec 2024", units: 312, amount: 1245 },
];

export const mockAdminTransactions = [
  { id: 1, time: "09:15 AM", citizenId: "CIT-001", service: "Electricity", amount: 1245.50, status: "Success" },
  { id: 2, time: "09:22 AM", citizenId: "CIT-002", service: "Water", amount: 340.00, status: "Success" },
  { id: 3, time: "09:30 AM", citizenId: "CIT-003", service: "Gas", amount: 903.00, status: "Success" },
  { id: 4, time: "09:45 AM", citizenId: "CIT-004", service: "Municipal", amount: 6250.00, status: "Failed" },
  { id: 5, time: "10:01 AM", citizenId: "CIT-005", service: "Electricity", amount: 980.00, status: "Success" },
  { id: 6, time: "10:15 AM", citizenId: "CIT-006", service: "Gas", amount: 876.00, status: "Success" },
  { id: 7, time: "10:30 AM", citizenId: "CIT-007", service: "Water", amount: 450.00, status: "Success" },
  { id: 8, time: "10:45 AM", citizenId: "CIT-008", service: "Electricity", amount: 1100.00, status: "Success" },
  { id: 9, time: "11:00 AM", citizenId: "CIT-009", service: "Municipal", amount: 2500.00, status: "Success" },
  { id: 10, time: "11:15 AM", citizenId: "CIT-010", service: "Gas", amount: 650.00, status: "Failed" },
  { id: 11, time: "11:30 AM", citizenId: "CIT-011", service: "Electricity", amount: 1350.00, status: "Success" },
  { id: 12, time: "11:45 AM", citizenId: "CIT-012", service: "Water", amount: 280.00, status: "Success" },
  { id: 13, time: "12:00 PM", citizenId: "CIT-013", service: "Municipal", amount: 12500.00, status: "Success" },
  { id: 14, time: "12:15 PM", citizenId: "CIT-014", service: "Gas", amount: 720.00, status: "Success" },
  { id: 15, time: "12:30 PM", citizenId: "CIT-015", service: "Electricity", amount: 890.00, status: "Success" },
  { id: 16, time: "12:45 PM", citizenId: "CIT-016", service: "Water", amount: 560.00, status: "Failed" },
  { id: 17, time: "01:00 PM", citizenId: "CIT-017", service: "Gas", amount: 903.00, status: "Success" },
  { id: 18, time: "01:15 PM", citizenId: "CIT-018", service: "Municipal", amount: 3500.00, status: "Success" },
  { id: 19, time: "01:30 PM", citizenId: "CIT-019", service: "Electricity", amount: 1500.00, status: "Success" },
  { id: 20, time: "01:45 PM", citizenId: "CIT-020", service: "Water", amount: 420.00, status: "Success" },
];

export const mockAnnouncements = [
  "Power outage in Ward 5 on 15 Dec from 10am-2pm for maintenance work",
  "Water supply disruption in Sector 8 on 18 Dec from 6am-12pm",
  "Last date for Property Tax payment without penalty: 31 Dec 2024",
  "New LPG connection applications now accepted online through SUVIDHA portal",
  "Municipal waste collection schedule revised for December-January holiday season",
];

export const mockApplications = [
  { id: "APP-2024-1001", type: "Electricity New Connection", status: "Under Review", date: "01 Dec 2024" },
  { id: "APP-2024-1002", type: "Water Connection", status: "Approved", date: "15 Nov 2024" },
  { id: "APP-2024-1003", type: "Trade License Renewal", status: "Applied", date: "05 Dec 2024" },
  { id: "APP-2024-1004", type: "Building Plan Approval", status: "Scrutiny", date: "20 Nov 2024" },
];

export const wardAreas = [
  "Ward 1 - Shivajinagar",
  "Ward 2 - Kothrud",
  "Ward 3 - Deccan",
  "Ward 4 - Swargate",
  "Ward 5 - Hadapsar",
  "Ward 6 - Koregaon Park",
  "Ward 7 - Aundh",
  "Ward 8 - Baner",
  "Ward 9 - Hinjewadi",
  "Ward 10 - Wakad",
  "Ward 11 - Pimpri",
  "Ward 12 - Chinchwad",
];

export const mockWeeklyUsage = [
  { day: "Mon", transactions: 45 },
  { day: "Tue", transactions: 62 },
  { day: "Wed", transactions: 58 },
  { day: "Thu", transactions: 71 },
  { day: "Fri", transactions: 55 },
  { day: "Sat", transactions: 38 },
  { day: "Sun", transactions: 22 },
];

export const grievanceCategories: Record<string, string[]> = {
  Electricity: ["Power Outage", "Voltage Fluctuation", "Meter Fault", "Billing Issue", "Street Light", "Other"],
  Gas: ["Gas Leak", "Low Pressure", "Billing Issue", "Delivery Delay", "Meter Fault", "Other"],
  Water: ["Low Pressure", "No Supply", "Leakage", "Water Quality", "Billing Issue", "Other"],
  Municipal: ["Waste Collection", "Road Damage", "Drainage Issue", "Illegal Construction", "Noise Pollution", "Other"],
};
