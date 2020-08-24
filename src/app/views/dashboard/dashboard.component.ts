import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { AppiumService } from '../../appium.service';
import { Chart } from 'chart.js';
import { from } from 'rxjs';
import { CalabashService } from '../../calabash.service';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  z=0;t=0;
  c=0;d=0;
  doc;
  calabashService: any;


  constructor(private appiumService: AppiumService, calabashService: CalabashService) { }
  
  ngOnInit(): void {
    this.getValues();
  }
 

   async getValues() {
    const values = await this.appiumService.getValues();
    

    if(values !== null){
      this.c = values.c;
      this.d = values.d;
      this.doc = values.doc;
    
      document.getElementById("test1").innerHTML+=this.doc.getElementsByClassName('test-status').length + " TEST";
      document.getElementById("test2").innerHTML+="le nombre de test pass "+this.c+"<br>";
      document.getElementById("test3").innerHTML+="le nombre de test fail "+this.d+"<br>";


              
              new Chart('myChart', {
                type: 'doughnut',
                data: {
                    labels: ['pass', 'fail'],
                    datasets: [{
                        label: 'i% des tests',
                        data:[this.c,this.d],
                        backgroundColor: [
                            'rgba(102, 204, 0, 0.2)',
                            'rgba(204, 0, 0, 0.2)'
                        ],
                        
                        borderWidth: 1
                    }]
                },
                options: {
                  title:{
                    display:true,
                    text:'pourcentages des test pass/ fail'
                  }
                }
            }); 
        
  }



}


async getValues1() {
  const values = await this.calabashService.getValues1();

  if(values !== null){
    this.z = values.z;
    this.t = values.t;
    this.doc = values.doc;
  
    document.getElementById("test11").innerHTML+=this.doc.getElementsByTagName("H3").length + " TEST";
    document.getElementById("test12").innerHTML+="le nombre de test pass "+this.z+"<br>";
    document.getElementById("test13").innerHTML+="le nombre de test fail "+this.t+"<br>";


    new Chart('myChart1', {
      type: 'doughnut',
      data: {
          labels: ['pass', 'fail'],
          datasets: [{
              label: 'i% des tests',
              data:[this.z,this.t],
              backgroundColor: [
                  'rgba(102, 204, 0, 0.2)',
                  'rgba(204, 0, 0, 0.2)'
              ],
              
              borderWidth: 1
          }]
      },
      options: {
        title:{
          display:true,
          text:'pourcentages des test pass/ fail'
        }
      }
  });

  }

  
}



}