import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TravelRequest } from '../../core/models/RequestModels';

@Injectable({
  providedIn: 'root'
})
export class TravelService {

  private base = 'https://localhost:7070/api/travel'; // change to your API
  
  constructor(private http: HttpClient) {}


  createRequest(payload: TravelRequest): Observable<any> {
    return this.http.post(this.base, payload);
  }

  getMyRequests(employeeId: string): Observable<TravelRequest[]>{
    return this.http.get<TravelRequest[]>(`${this.base}/employee/${employeeId}`);
  }

  getPendingApprovals(managerId: string){
    return this.http.get<TravelRequest[]>(`${this.base}/pending/manager/${managerId}`);
  }

  approve(requestId:string, payload:any){
    return this.http.post(`${this.base}/${requestId}/approve`, payload);
  }

  reject(requestId:string, payload:any){
    return this.http.post(`${this.base}/${requestId}/reject`, payload);
  }

  getAllPendingForTravelDesk(){
    return this.http.get<TravelRequest[]>(`${this.base}/pending/traveldesk`);
  }

  updateBooking(requestId:string, booking:any){
    return this.http.post(`${this.base}/${requestId}/booking`, booking);
  }

  getById(id:string){
    return this.http.get<TravelRequest>(`${this.base}/${id}`);
  }
  
}
