import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ConstantProvider {

  constructor(public http: Http) {
    console.log('Hello ConstantProvider Provider');
  }

  public rootUrl: string = 'https://rewards.plutonply.com/dd_api/';  
  public server_url: string = this.rootUrl + 'index.php/app/';
  public upload_url: string ='https://rewards.plutonply.com/dd_api/app/uploads/';

  public backButton = 0;

}
