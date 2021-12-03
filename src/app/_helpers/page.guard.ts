import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()

export class PageGuard implements CanActivate {
    
    constructor(public router: Router) {}

    canActivate(): boolean {
        if (this.getToken()) {
            this.router.navigate(['/pages/dashboard/home']);
            return false;
        }
        return true;
    }

    public getToken(): string {
        return localStorage.getItem('user_token');
    } 

    public getJurusan(): string{
        return localStorage.getItem('jurusan');
    }
}