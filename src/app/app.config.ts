import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AppConfig {
  private host = environment.baseURL;
  // public baseUrl =  this.host + 'api/';
  public baseUrl =  this.host;
}
