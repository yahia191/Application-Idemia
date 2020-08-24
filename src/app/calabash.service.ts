import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalabashService {

  constructor() { }
  
  async getValues1() : Promise<{
      x: string;
      y: string;
      z: number;
      t: number;
      doc: any;
  }>{
    let x='';
    let y='';
    let z=0;
    let t=0;
    let doc;

    return fetch('/assets/Cucumber.html').then(res => res.text()).then(data => {
      
      const parser = new DOMParser();
      doc = parser.parseFromString(data, 'text/html');
        
      for (let index = 0; index < doc.getElementsByTagName("H3").length; index++) {
          if(doc.getElementsByTagName("H3")[index].getAttribute("style")==="cursor: pointer;"){
              y+=doc.getElementsByTagName("H2")[index].textContent+"<br>"+doc.getElementsByTagName("H3")[index].textContent+"<br><br>";
                z++;
            
          }
          if(doc.getElementsByTagName("H3")[index].getAttribute("style")==="background: rgb(196, 13, 13); color: rgb(255, 255, 255); cursor: pointer;"){
              x+=doc.getElementsByTagName("H2")[index].textContent+"<br>"+doc.getElementsByTagName("H3")[index].textContent +"<br><br>";
              t++;
    
          }
      }

      return {x, y, z, t, doc};
    });
  }
}