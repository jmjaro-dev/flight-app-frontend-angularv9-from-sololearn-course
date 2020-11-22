import { Injectable, OnInit } from '@angular/core';
import { Flight } from './flight.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  backendURL: string;

  constructor(private http: HttpClient) {
    this.backendURL = this.getBackEndUrl();
  }

  getAllFlights(): Observable<any> {
    return this.http.get(`${this.backendURL}/flights/`);
  }

  getFlights(orig: string, dest: string): Observable<any> {
    return this.http.get(`${this.backendURL}/flights/query/${orig}/${dest}`);
  }

  postFlight(flight: Flight) {
    return this.http.post(`${this.backendURL}/flights`, flight);
  }

  updateFlight(flight: Flight) {
    return this.http.post(`${this.backendURL}/flights/${flight.id}/update`, flight);
  }

  deleteFlight(id: number) {
    return this.http.post(`${this.backendURL}/flights/${id}/delete`, null);
  }

  getAllOrigins(): Observable<any> {
    return this.http.get(`${this.backendURL}/flights/cities/origins`);
  }

  getAllDestinations(): Observable<any> {
    return this.http.get(`${this.backendURL}/flights/cities/destinations`);
  }

  getBackEndUrl(): string {
    const segements = document.URL.split('/');
    const reggie = new RegExp(/localhost/);
    return reggie.test(segements[2]) ? 'http://localhost:3000' : 'https://nestjs-typeorm-postgres.herokuapp.com';
  }

}