import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  constructor(private jwtHelperService: JwtHelperService) {}

  getToken(): string | null {
    return window.localStorage.getItem('jwtToken');
  }

  saveToken(token: string): void {
    window.localStorage.setItem('jwtToken', token);
  }

  destroyToken(): void {
    window.localStorage.removeItem('jwtToken');
  }

  tokenIsValid(): boolean {
    const token = this.getToken();

    return (
      token !== null &&
      token !== undefined &&
      !this.jwtHelperService.isTokenExpired(token)
    );
  }
}
