import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { SharedServiceService } from 'src/app/shared-service.service';



@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.component.html',
  styleUrls: ['./ticket-create.component.css']
})
export class TicketCreateComponent {
 
  constructor( private service: SharedServiceService,) { }

  tickeMixtList: any = [];
  idList: any =[1];
  maxID: any = [];
  
  

  TicketFormGroup = new FormGroup({
    inbound : new FormControl('',[Validators.required, Validators.minLength(2)]),
    outbound : new FormControl('', [Validators.required, Validators.minLength(2)]),
    ticket_type : new FormControl('',[Validators.required]),
    price : new FormControl('',[Validators.required, Validators.max(10000)]),
    from_date : new FormControl('', [Validators.required]),
    to_date: new FormControl('', [Validators.required]),
    seat_number: new FormControl('',[Validators.required])

  })


  get f() {
    return this.TicketFormGroup.controls;
  }

  ngOnInit():void{
    this.loadTicket();
  }

  loadTicket(){
    this.service.getTicketList().subscribe(res =>{
      for (let ticket of res){
        // Because in most of backend ID is autoincrement, it is no nesessery to add ID
        // For this reason i get all id from DB and try to find max ID
        // On Submit() function Below I have added max(id)+1
        this.idList.push(ticket.id)
        // To make validation of not allow dublicate ticket
        // I think for every ticket to create a unik id to joing
        // inboud+outbound+from_date+seat-number
        const ticketMix = ticket.inbound + ticket.outbound + ticket.ticket_type + ticket.from_date + ticket.seat_number;
        // I add them all on ticketMixList and on submit i ceck if exit this unik ID
        this.tickeMixtList.push(ticketMix.toLowerCase())
      }      
      
    })

  }

  submit(){   
    // Create ticket ID tipe to concat 2 string
    const id = Number(this.idList.reduce((a:any,b:any)=>Math.max(a,b))+1)

    const ticket_t_id = id.toString()+'-'+this.f['ticket_type'].value
    var value = {
      employee: localStorage.getItem('id'),
      inbound: this.f['inbound'].value,
      outbound: this.f['outbound'].value,
      ticket_type: this.f['ticket_type'].value,
      ticket_type_id: ticket_t_id,
      price: this.f['price'].value,
      from_date: moment(this.f['from_date'].value).format('MM-DD-YYYY'),
      to_date: moment(this.f['to_date'].value).format('MM-DD-YYYY'),
      seat_number: this.f['seat_number'].value
    }   

    // Create Unice ID and check if exit on this.tickeMixtList

    const ticketMix2 = String(this.f['inbound'].value?.toLocaleLowerCase()) + 
    this.f['outbound'].value?.toLocaleLowerCase() + this.f['ticket_type'].value?.toLocaleLowerCase() +
    moment(this.f['from_date'].value).format('MM-DD-YYYY') + this.f['seat_number'].value;

   
    if (this.tickeMixtList.includes(ticketMix2)){
      alert("This Ticket Exit");
      this.TicketFormGroup.controls.seat_number.patchValue('')
    }else{
      this.service.addTicket(value).subscribe(res=>{
        // console.log(res);
        this.TicketFormGroup.reset();
        this.idList = [];
        this.tickeMixtList = [];
        this.loadTicket();
      })
    }

    


  }

}
