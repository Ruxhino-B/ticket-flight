import { Component } from '@angular/core';
import {Chart, registerables} from 'node_modules/chart.js'
import { SharedServiceService } from '../shared-service.service';

Chart.register(...registerables)

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor( private service: SharedServiceService,){}

  outbound: any = [];
  data: any = {};
  city: any = [];
  number: any = [];

  ngOnInit(): void{
    
    this.loadTicket();
    
    
  }

  loadTicket(){
    this.service.getTicketList().subscribe(res =>{
      for (let ticket of res){        
        this.outbound.push(ticket.outbound)        
      }     
      this.countData();
      this.renderChart();
    })

  }

  

  countData(){  
    this.outbound.forEach((element:any) => {
    this.data[element] = (this.data[element] || 0) + 1;
    });
    
  }

  renderChart(){
    const cityes = Object.keys(this.data)
    const numbers = Object.values(this.data);
    const myChart = new Chart("piechart", {
      type: 'bar',
      data: {
          labels: cityes,
          datasets: [{
              // label: this.data,
              data: numbers,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  }); 

  // console.log("THis are number",numbers)
  }

  

}
