import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  fakeArray = new Array(30);
  public mode: string;
  public apiExists: boolean;
  public apiKey: string;
  public messagesLeft: number;

  constructor() {
    this.apiExists = true;
    this.apiKey = '5dbc68cb5f7074724be6a941';
    this.messagesLeft = 30;
    this.mode = 'manual';
   }

  ngOnInit() {
  }

  changeMode(newMode: string) {
    this.mode = newMode;
  }

  deleteKey(){
    this.apiExists = false;
    this.apiKey = null;
  }

  sendForm(phone: string, message: string){
    // Function for sending the data to the service.
  }

}
