import { Component, OnInit } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { Chart } from 'chart.js';
import { from } from 'rxjs';
import { monkeyPatchChartJsLegend } from 'ng2-charts';
import { CalabashService } from '../../calabash.service';
/* import { warn } from 'console'; */

@Component({
  templateUrl: 'typography.component.html'
})
export class TypographyComponent implements OnInit {

  eulaContent = '';
  x='';y='';
  z=0;t=0;
  doc;

  constructor(
    private calabashService: CalabashService
  ) { }

  async getValues() {
    const values = await this.calabashService.getValues();

    if(values !== null){
      this.x = values.x;
      this.y = values.y;
      this.z = values.z;
      this.t = values.t;
      this.doc = values.doc;
    
      document.getElementById("test1").innerHTML+="le nombre de test total "+this.doc.getElementsByTagName("H3").length;
      /* document.getElementById("test10").innerHTML+=this.y+"<br>"; */
      document.getElementById("test2").innerHTML+="le nombre de test positif "+this.z+"<br>";
      /* document.getElementById("test20").innerHTML+=this.x+"<br>"; */
      document.getElementById("test3").innerHTML+="le nombre de test fail "+this.t+"<br>";


      new Chart('myChart', {
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

  ngOnInit(): void {
    this.getValues();
  }
  
    onClickMe() {

  let myContainer = <HTMLElement> document.querySelector("#myDiv")
  myContainer.innerHTML=this.y+"<br>";

  }

  async onClickMe1() {

    let myContainer = <HTMLElement> document.querySelector("#myDiv1")
    myContainer.innerHTML=this.x+"<br>";
    }
  async test(){
     
    console.log(this.t);
  }

}
