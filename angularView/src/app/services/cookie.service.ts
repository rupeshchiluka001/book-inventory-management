import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor() { }

  private roleKey = "id=";

  getId(): string {
    let cookie = document.cookie;
    let roleIndex = cookie.indexOf(this.roleKey);
    if (roleIndex < 0) return '';
    roleIndex += this.roleKey.length;
    let partition = cookie.substring(roleIndex).indexOf(";");
    return (partition >= 0) ? cookie.substr(roleIndex+7, partition) : cookie.substr(roleIndex+7);
  }
}
