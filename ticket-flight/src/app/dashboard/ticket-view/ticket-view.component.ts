import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SharedServiceService } from 'src/app/shared-service.service';
import { TicketUpdateComponent } from '../ticket-update/ticket-update.component';


@Component({
  selector: 'app-ticket-view',
  templateUrl: './ticket-view.component.html',
  styleUrls: ['./ticket-view.component.css']
})



export class TicketViewComponent {
  
  constructor( 
    private service: SharedServiceService,
    private matDialog: MatDialog
    ) { }

  ticket: any = [];
  displayedColumns: string[] = ['inbound', 'outbound', 'ticket_type', 'ticket_type_id', 'price', 'from_date', 'to_date', 'seat_number', 'update', 'delete'];
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

  updateProduct(product: any){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = product;
    // matDialog open o modal or dialog Box
    this.matDialog.open(TicketUpdateComponent, dialogConfig)
  }
  deleteProduct(id:any){

    alert("Delete Code is made a coment because of creation Way. To understand more contact with balliu@ruxhino.al")

    // Uncoment code below to delete ticket

    // this.service.deleteTicket(id).subscribe(res=>{
    //   console.log(res);
    //   alert("Delete Done")
    // })
  }

}
