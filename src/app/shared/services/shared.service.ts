import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { AppConfig } from "src/app/app.config";
import { Auth } from "../models/auth.model";


@Injectable({ providedIn: 'root' })
export class SharedService {
  constructor(
    private config: AppConfig,
    private http: HttpClient,
    private location: Location,
  ) {}

  onUsuarioLogged = new EventEmitter<boolean>();
  onLanguageChange = new EventEmitter<string>();


  get Auth(): Auth {
    return JSON.parse(localStorage.getItem('auth') as string) as Auth;
  }

  storeToken(auth: Auth): void {
    localStorage.setItem('auth', JSON.stringify(auth));
  }

  logout() {
    localStorage.removeItem('auth');
  }

  redirecionarPaginaAnterior(): void {
    this.location.back();
  }

  minDateValidation(date: Date) {
    if (date !== undefined) {
      let newDate = new Date(date.getTime() + 60000);
      return newDate;
    } else {
      return;
    }
  }

  reportError(
    message: string,
    data: string,
    methodName: string,
    typeRequest: string
  ): void {
  }

  resultError(
    responseErrorObject: Object | null,
    responseErrorArray: string[] | null,
    data: any,
    methodName: string,
    typeRequest: string
  ): void {
    if (responseErrorArray) {
    } else if (responseErrorObject) {
      this.reportError(
        JSON.stringify(responseErrorObject),
        JSON.stringify(data),
        methodName,
        typeRequest
      );
    }
  }

  fillFormFields(form: FormGroup | null, data: any | null): void {
    if (form) {
      if (data) {
        Object.keys(form.controls).forEach((formKey: any) => {
          if(form.controls[formKey].value instanceof Object) {
          Object.keys(form.controls[formKey].value).forEach((subItem: any) => {
              form.get(`${formKey}.${subItem}`)?.setValue(Object(data.result)[formKey][subItem]);
            });
          } else {
            form.get(formKey)?.setValue(Object(data.result)[formKey]);
            if (formKey === 'userEmail') {
              form.get(formKey)?.disable();
            }
          }
        });
      }
    }
  }



  dateAddMonth(d: Date, n: number): Date {
    const m1 = moment({ y: d.getFullYear(), M: d.getMonth() + 1, d: d.getDate(), h: d.getHours(), m: d.getMinutes(), s: d.getSeconds(), ms: d.getMilliseconds() });
    const d2 = m1.add(n, 'month');
    return d2.toDate();
  }
}
