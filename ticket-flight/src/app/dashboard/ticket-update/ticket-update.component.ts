import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { SharedServiceService } from 'src/app/shared-service.service';

@Component({
  selector: 'app-ticket-update',
  templateUrl: './ticket-update.component.html',
  styleUrls: ['./ticket-update.component.css']
})
export class TicketUpdateComponent {

ticket: any = [];

constructor(
  private matDialogRef: MatDialogRef<TicketUpdateComponent>,
  private service: SharedServiceService,
  private route: Router,
  @Inject(MAT_DIALOG_DATA) data: any) {
  this.ticket = data
}


TicketFormGroup : any = [];

  

  ngOnInit(): void {
    this.TicketFormGroup =  new FormGroup({
      inbound : new FormControl(`${this.ticket.inbound}`,[Validators.required, Validators.minLength(2)]),
      outbound : new FormControl(`${this.ticket.outbound}`, [Validators.required, Validators.minLength(2)]),
      ticket_type : new FormControl(this.ticket.ticket_type,[Validators.required]),
      price : new FormControl(this.ticket.price,[Validators.required, Validators.max(10000)]),
      from_date : new FormControl('', [Validators.required]),
      to_date: new FormControl('', [Validators.required]),
      seat_number: new FormControl(this.ticket.seat_number,[Validators.required])
      
    })

    // console.log(this.ticket.id,"Ticket ID")
  }

  get f() {
    return this.TicketFormGroup.controls;
  }

  submit(){
    const id = this.ticket.id

    const ticket_t_id = id.toString()+'-'+this.f['ticket_type'].value
    var value = {
      inbound: this.f['inbound'].value,
      outbound: this.f['outbound'].value,
      ticket_type: this.f['ticket_type'].value,
      ticket_type_id: ticket_t_id,
      price: this.f['price'].value,
      from_date: moment(this.f['from_date'].value).format('MM-DD-YYYY'),
      to_date: moment(this.f['to_date'].value).format('MM-DD-YYYY'),
      seat_number: this.f['seat_number'].value
    } 
    this.service.updateTicket(this.ticket.id, value).subscribe(res=>{
      // console.log(res)
    }, error =>{
      alert("Somthing Wrong Happened")
    },()=>{
      this.matDialogRef.close();
      this.reloadPage();
    })
  }


  reloadPage() {
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.onSameUrlNavigation = 'reload';
    this.route.navigate(['./']);

  }

}
