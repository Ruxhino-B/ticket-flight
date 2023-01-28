import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  constructor(private router: Router) { }

  token: any = []
  show: boolean = false


  toggleSidebar() {
    this.toggleSidebarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    if (this.token){
      this.show = true;
      // console.log("token exist", this.token)
    }else{
      console.log("token Does Not exit")
      this.show = false;
    }
  }

  logout() {
    localStorage.clear;
    this.router.navigate(['login']);
  }

}
