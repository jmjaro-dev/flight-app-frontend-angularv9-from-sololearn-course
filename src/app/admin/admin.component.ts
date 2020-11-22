import { Component, OnInit } from '@angular/core';
import { Flight } from '../flight.model';
import { FlightsService } from '../flights.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  
  origin: string;
  destination: string;
  flightNumber: number;
  depart: Date;
  arrive: Date;
  nonstop: boolean = false;
  flightList: any[];
  loading: boolean = true;

  constructor(private flightsService: FlightsService) { }

  ngOnInit(): void {
    this.refresh();
  }

  toggleNonStop() {
    this.nonstop = !this.nonstop;
  }

  sendFlight() {
    const flight: Flight = {
      origin: this.origin,
      destination: this.destination,
      flightNumber: this.flightNumber,
      depart: this.depart,
      arrive: this.arrive,
      nonstop: this.nonstop
    }

    console.log(flight);
    this.flightsService.postFlight(flight).subscribe(data => {
      if(data) {
        this.refresh();
      }
    });
  }

  update(flight: Flight) {
    this.flightsService.updateFlight(flight).subscribe(data => {
      if(data && data['affected']) {
        this.refresh();
      }
    });
  }

  delete(flight: Flight) {
    if (window.confirm('Are you sure you want to delete this flight? ')){
      this.flightsService.deleteFlight(flight.id).subscribe(data =>{
        if(data && data['affected']){
          this.refresh();
        }
      });
    }
  }

  refresh() {
    this.loading = true;
    this.flightsService.getAllFlights().subscribe(data =>{
      this.flightList = data;
      this.loading = false;
    })
  }
}
