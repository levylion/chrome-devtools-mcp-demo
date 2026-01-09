import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Batch {
  id: number;
  name: string;
  style: string;
  startDate: string;
  status: string;
  targetOG: number;
  currentGravity: number;
  temp: number;
  pressure: number;
}

@Injectable({
  providedIn: 'root'
})
export class BrewService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

  getActiveBatches(): Observable<Batch[]> {
    return this.http.get<Batch[]>(`${this.apiUrl}/batches`);
  }

  getBatchStats(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/batches/${id}`);
  }
}
