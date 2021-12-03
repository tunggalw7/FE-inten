import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'dashboard',
  template: `<router-outlet></router-outlet>`,
})
export class ReportComponent {
  constructor(private router: Router) {}
}

