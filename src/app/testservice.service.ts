import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestserviceService  {

  a='';b='';
c=0;d=0;



  constructor() { }
  test():any{
    
     fetch('/assets/Test-Automation-Report.html').then(res => res.text()).then(data => {

      let parser = new DOMParser(),
        doc = parser.parseFromString(data, 'text/html');

      for (let index = 0; index < doc.getElementsByClassName('test-status').length; index++) {
        if (doc.getElementsByClassName('test-status')[index].textContent === "pass") {
          this.b += doc.getElementsByClassName('test-name')[index].textContent + "<br>";
          this.c++;
        }
        else {
          this.a += doc.getElementsByClassName('test-name')[index].textContent + "<br>";
          this.d++;
        }
      }


      document.getElementById("test1").innerHTML += "le nombre de test total " + doc.getElementsByClassName('test-status').length + "<br>";
      document.getElementById("test2").innerHTML += "le nombre de test pass " + this.c + "<br>";
       document.getElementById("test10").innerHTML+=this.b+"<br>"; 
      document.getElementById("test3").innerHTML += "le nombre de test fail " + this.d + "<br>";
       document.getElementById("test20").innerHTML+=this.a+"<br>"; 
       return this.a;
      
    });
    
  } 
}
