import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SharedServiceService } from 'src/app/shared-service.service';


@Component({
  selector: 'app-ticket-view',
  templateUrl: './ticket-view.component.html',
  styleUrls: ['./ticket-view.component.css']
})



export class TicketViewComponent {
  
  constructor( private service: SharedServiceService,) { }

  ticket: any = [];
  displayedColumns: string[] = ['inbound', 'outbound', 'ticket_type', 'ticket_type_id', 'price', 'from_date', 'to_date', 'seat_number'];
  userTicket: any = [];
  
  

  ngOnInit(): void{
    this.loadTicket();
    
  }

  loadTicket(){
    this.service.getTicketList().subscribe(res=>{
      if(localStorage.getItem('role')==='Admin'){
        this.ticket = new MatTableDataSource(res);
      }else{

       const empid = localStorage.getItem('id');      
    //  Because I dont want to filter in backend(because Firebase dont offer this oportunity) request.user
    // I try ti get all data from backend and filter then in front-end
    // For this reason i check if ticket.employee.id is eqal with login/user.id save on localstorage
       for (let ticket of res){
       
        if (ticket.employee.id == empid){
          this.userTicket.push(ticket)          
        }
       }

       this.ticket = new MatTableDataSource(this.userTicket)
      }     
      
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.ticket.filter = filterValue.trim().toLowerCase();
  }

}
