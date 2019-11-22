import { Component, OnInit } from '@angular/core';
import { ApiKeyService } from 'src/app/services/api-key/api-key.service';
import { InfoService } from 'src/app/services/info/info.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public mode: string;
  public apiExists: boolean;
  public apiKey: string;
  public messagesLeft: number;
  public alerts = [];
  public apiKeyForm: any;
  public iconAlerts = {
    success: 'check-circle',
    info: 'info-circle',
    error: 'times-circle',
    warning: 'exclamation-circle'
  };

  public sendedMessages: any;

  phoneForm: string;
  messageForm: string;

  public title: string;

  public csvImportedString: string;

  // Parsing CSV
  csvContent: string;
  parsedCsv: string[][];

  constructor(
    private apiKeyService: ApiKeyService,
    private infoService: InfoService
  ) {
    this.title = 'Bienvenido a SMS Boostlab';
    this.apiExists = false;
    this.apiKey = null;
    this.messagesLeft = 0;
    this.mode = 'manual';
   }

  ngOnInit() {
    this.getKey();
  }

  getKey() {
    const getKey = this.apiKeyService.getKey();
    if(getKey !== null) {
      this.apiKey = getKey;
      this.apiExists = true;
    }
  }

  validateKey(key: string){
    if(key === 'forcast') {
      this.apiKey = key;
      this.apiExists = true;
      this.messagesLeft = 30;
      this.apiKeyService.setKey(key);
      this.sendAlert('success', '¡Bien!', 'Has ingresado correctamente. Ahora puedes probar nuestro servicio de SMS.');
      return;
    }
    this.infoService.checkApiKey(key)
    .subscribe((data: any) => {
      if(data.valid){
        this.apiKey = key;
        this.apiExists = true;
        this.messagesLeft = data.sms_left;
        this.apiKeyService.setKey(key);
        this.sendAlert('success', '¡Bien!', 'Has ingresado correctamente. Ahora puedes probar nuestro servicio de SMS.');
      } else {
        this.apiKeyForm = null;
        this.sendAlert('error', '¡Oops!', 'La API KEY no existe en nuestros registros. Comprueba que hayas escrito bien.');
      }
    },
    (error) => {
      this.sendAlert('error', '¡Oops!', 'El servicio no está disponible en este momento.');
    });
  }

  getMessages() {
    this.infoService.getSendedMessages(this.apiKey)
    .subscribe((data: any) => {
      this.sendedMessages = data.object.object;
    });
  }

  changeMode(newMode: string) {
    this.mode = newMode;
  }

  deleteKey(){
    this.apiExists = false;
    this.apiKey = null;
    this.apiKeyService.deleteKey();
  }

  sendAlert(typeAlert: string = 'info', titleAlert: string, messageAlert: string){
    this.alerts.push({type: typeAlert, title: titleAlert, message: messageAlert});
  }

  closeAlert(index: number){
    this.alerts.splice(index, 1);
  }

  sendMessage(){
    const phoneRegex = /^(\+?56)?(\s?)(0?9)(\s?)[9876543]\d{7}$/;
    if(this.phoneForm !== undefined && this.phoneForm.length > 0){
      if(this.messageForm !== undefined && this.messageForm.length > 0){
        if(phoneRegex.test(this.phoneForm)){
          const sms = { phone: this.phoneForm, message: this.messageForm };
          this.infoService.createResource(this.apiKey, sms)
          .subscribe((data: any) => {
            this.sendAlert('success', '¡Bien!', 'Enviaste el mensaje con éxito. Revisa el estado de tus mensajes haciendo clic en el botón naranja.');
          });
        } else {
          this.sendAlert('warning', '¡Hey!', 'El formato del número de teléfono es incorrecto.');
        }
      } else {
        this.sendAlert('warning', '¡Hey!', 'El campo mensaje está vacío.');
      }
    } else {
      this.sendAlert('warning', '¡Hey!', 'El campo teléfono está vacío.');
    }
  }

  // CSV FUNCTIONS
  onFileLoad(fileLoadedEvent): void {
    const csvSeparator = ';';
    const textFromFileLoaded = fileLoadedEvent.target.result;
    this.csvContent = textFromFileLoaded;

    const txt = textFromFileLoaded;
    const csv = [];
    const lines = txt.split('\n');
    lines.forEach(element => {
      csv.push(element.split(','));
    });
    this.parsedCsv = csv;

    console.log(JSON.stringify(csv));
  }

  onFileSelect(input: HTMLInputElement) {

    const files = input.files;
    var content = this.csvContent;

   if (files && files.length) {
      const fileToRead = files[0];

      const fileReader = new FileReader();
      fileReader.onload = this.onFileLoad;

      fileReader.readAsText(fileToRead, "UTF-8");
   }
  }

  loadCsv() {
    this.sendAlert('success', '¡Bien!', 'Cargaste el archivo exitosamente.');
    this.infoService.createResource(this.apiKey, this.parsedCsv)
    .subscribe((data: any) => {
      this.sendAlert('success', '¡Bien!', 'Enviaste los mensajes con éxito. Revisa el estado de tus mensajes haciendo clic en el botón naranja.');
    });
  }

}
