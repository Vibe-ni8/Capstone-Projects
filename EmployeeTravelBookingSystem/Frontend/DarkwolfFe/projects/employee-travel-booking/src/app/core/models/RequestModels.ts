export interface TravelRequest {
id?: string;
employeeId: string;
employeeName?: string;
destination: string;
startDate: string; // ISO
endDate: string; // ISO
purpose: string;
travelType: 'Domestic' | 'International';
mode: 'Flight' | 'Train' | 'Bus' | 'Cab';
accommodationRequired: boolean;
project?: string;
client?: string;
costCenter?: string;
estimatedBudget?: number;
status?: 'New'|'PendingRM'|'RejectedByRM'|'ApprovedByRM'|'PendingTravelDesk'|'Booked'|'Completed';
createdAt?: string;
}