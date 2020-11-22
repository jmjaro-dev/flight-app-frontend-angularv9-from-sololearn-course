import { Component, OnInit } from '@angular/core';
import { FlightsService } from '../flights.service';
import { Flight } from '../flight.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  flights: Flight[] = [];
  selectedOrigin: string;
  selectedDestination: string;
  originList: object[];
  destinationList: object[];
  notice: string= "Select Place of Origin and Destination.";

  constructor(private flightsService: FlightsService) { }

  ngOnInit(): void { 
    this.flightsService.getAllOrigins().subscribe(data => this.originList = data);
    this.flightsService.getAllDestinations().subscribe(data => this.destinationList = data);
  }

  query(): void {
    const origin = this.selectedOrigin;
    const destination = this.selectedDestination;

    this.flightsService.getFlights(origin, destination).subscribe(data => {
      if(data.length > 0) {
        this.flights = data;
      } else {
        this.flights = [];
        this.notice = `No Flights from ${origin} to ${destination}.`
      }
    });
  }
}
