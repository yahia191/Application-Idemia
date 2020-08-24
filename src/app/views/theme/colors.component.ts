import { Component, OnInit } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { Chart } from 'chart.js';
import { from } from 'rxjs';
import { monkeyPatchChartJsLegend } from 'ng2-charts';
import { AppiumService } from '../../appium.service';


@Component({
  templateUrl: 'colors.component.html'
})
export class ColorsComponent implements OnInit {
  eulaContent = '';
  a='';b='';
  c=0;d=0;
  doc;



  constructor(private appiumService: AppiumService) { }
 

   async getValues() {
    const values = await this.appiumService.getValues();

    if(values !== null){
      this.a = values.a;
      this.b = values.b;
      this.c = values.c;
      this.d = values.d;
      this.doc = values.doc;
    
      document.getElementById("test1").innerHTML+="Le nombre total des tests: "+this.doc.getElementsByClassName('test-status').length;
      /* document.getElementById("test10").innerHTML+=this.y+"<br>"; */
      document.getElementById("test2").innerHTML+=this.c+"<br>";
      /* document.getElementById("test20").innerHTML+=this.x+"<br>"; */
      document.getElementById("test3").innerHTML+=this.d+"<br>";


              
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
  ngOnInit(): void {
    this.getValues();
  }
  
    onClickMe() {

  let myContainer = <HTMLElement> document.querySelector("#myDiv")
  myContainer.innerHTML=this.b+"<br>";

  }

  async onClickMe1() {

    let myContainer = <HTMLElement> document.querySelector("#myDiv1")
    myContainer.innerHTML=this.a+"<br>";
    }
  async test(){
     
    console.log(this.d);
  }


}
