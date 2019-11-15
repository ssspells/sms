import { Component, OnInit } from '@angular/core';
import { ApiKeyService } from 'src/app/services/api-key/api-key.service';

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
  public alerts = [];
  public iconAlerts = {
    success: 'check-circle',
    info: 'info-circle',
    error: 'times-circle',
    warning: 'exclamation-circle'
  };

  constructor(
    private apiKeyService: ApiKeyService
  ) {
    this.apiExists = true;
    this.apiKey = '5dbc68cb5f7074724be6a941';
    this.messagesLeft = 30;
    this.mode = 'manual';
   }

  ngOnInit() {
  }

  getKey() {
    const getKey = this.apiKeyService.getKey();
    if(getKey !== null) {
      this.apiKey = getKey;
      this.apiExists = true;
    } else {
      
    }
  }

  getMessages() {

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

  sendAlert(typeAlert: string = 'info', titleAlert: string, messageAlert: string){
    this.alerts.push({type: typeAlert, title: titleAlert, message: messageAlert});
  }

  closeAlert(index: number){
    this.alerts.splice(index, 1);
  }

}
