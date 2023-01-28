import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  user: string | null = '';
  photo: string | null = '';
  email: string | null = '';
  role: string | null = '';
  permisson: boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.photo = localStorage.getItem('photo');
    this.email = localStorage.getItem('email');
    this.role = localStorage.getItem('role');
    if (this.role === 'Admin') {
      this.permisson = true;
    } else {
      this.permisson = false;
    }
  }
}
