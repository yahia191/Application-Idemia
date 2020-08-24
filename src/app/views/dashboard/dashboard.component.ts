import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { AppiumService } from '../../appium.service';
import { Chart } from 'chart.js';
import { from } from 'rxjs';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  
  c=0;d=0;
  doc;


  constructor(private appiumService: AppiumService) { }
  ngOnInit(): void {
    this.getValues();
  }
 

   async getValues() {
    const values = await this.appiumService.getValues();

    if(values !== null){
      this.c = values.c;
      this.d = values.d;
      this.doc = values.doc;
    
      document.getElementById("test1").innerHTML+="le nombre de test total "+this.doc.getElementsByClassName('test-status').length;
      document.getElementById("test2").innerHTML+="le nombre de test positif "+this.c+"<br>";
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

}