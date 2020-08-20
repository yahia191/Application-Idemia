import { Component, OnInit } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { Chart } from 'chart.js';
import { from } from 'rxjs';
import { monkeyPatchChartJsLegend } from 'ng2-charts';


@Component({
  templateUrl: 'colors.component.html'
})
export class ColorsComponent implements OnInit {



a='';b='';
c=0;d=0;
  constructor() { }
   ngOnInit(): void {
    fetch('/assets/Test-Automation-Report.html').then(res => res.text()).then(data => {
      
            let parser = new DOMParser(),
                doc = parser.parseFromString(data, 'text/html');
                
                for (let index = 0; index < doc.getElementsByClassName('test-status').length; index++) {
                  if(doc.getElementsByClassName('test-status')[index].textContent==="pass"){
                    this.b+=doc.getElementsByClassName('test-name')[index].textContent+"<br>";
                    this.c++;
                  }else{
                    this.a+=doc.getElementsByClassName('test-name')[index].textContent +"<br>";
                    this.d++;
                  }
              }
     
      
              document.getElementById("test1").innerHTML+="le nombre de test total "+doc.getElementsByClassName('test-status').length+"<br>"; 
              document.getElementById("test2").innerHTML+="le nombre de test pass "+this.c+"<br>";
             /*  document.getElementById("test10").innerHTML+=this.b+"<br>"; */
              document.getElementById("test3").innerHTML+="le nombre de test fail "+this.d+"<br>";
              /* document.getElementById("test20").innerHTML+=this.a+"<br>"; */
              
              var myChart = new Chart('myChart', {
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
        });
        
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
  
  
  /* public doughnutChartLabels = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData = [
    [350, 450, 100],
  ];
  public doughnutChartType = 'doughnut'; */
  

}
