import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  wolfLookInside : boolean = false;

  changeWolfPosition() { 
    this.wolfLookInside = !this.wolfLookInside; 
    console.log('Home - Wolf position changed');
  }
  
}
