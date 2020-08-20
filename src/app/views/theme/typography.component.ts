import { Component, OnInit } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { Chart } from 'chart.js';
import { from } from 'rxjs';
import { monkeyPatchChartJsLegend } from 'ng2-charts';

@Component({
  templateUrl: 'typography.component.html'
})
export class TypographyComponent implements OnInit {

  eulaContent = '';
x='';y='';
z=0;t=0;

  constructor(private sanitizer: DomSanitizer) { }
  ngOnInit(): void {
    fetch('/assets/Cucumber.html').then(res => res.text()).then(data => {
      
            let parser = new DOMParser(),
                doc = parser.parseFromString(data, 'text/html');
                
                for (let index = 0; index < doc.getElementsByTagName("H3").length; index++) {
                    if(doc.getElementsByTagName("H3")[index].getAttribute("style")==="cursor: pointer;"){
                        this.y+=doc.getElementsByTagName("H2")[index].textContent+"<br>"+doc.getElementsByTagName("H3")[index].textContent+"<br><br>";
                         this.z++;
                      
                    }
                    if(doc.getElementsByTagName("H3")[index].getAttribute("style")==="background: rgb(196, 13, 13); color: rgb(255, 255, 255); cursor: pointer;"){
                        this.x+=doc.getElementsByTagName("H2")[index].textContent+"<br>"+doc.getElementsByTagName("H3")[index].textContent +"<br><br>";
                        this.t++;
             
                    }
                }
                

                document.getElementById("test1").innerHTML+="le nombre de test total "+doc.getElementsByTagName("H3").length;
                /* document.getElementById("test10").innerHTML+=this.y+"<br>"; */
                document.getElementById("test2").innerHTML+="le nombre de test positif "+this.z+"<br>";
                /* document.getElementById("test20").innerHTML+=this.x+"<br>"; */
                document.getElementById("test3").innerHTML+="le nombre de test fail "+this.t+"<br>";


                /*  */
                var myChart = new Chart('myChart', {
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


        });


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
