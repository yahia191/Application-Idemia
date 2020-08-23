import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppiumService {

  constructor() { }
  
  async getValues() : Promise<{
      a: string;
      b: string;
      c: number;
      d: number;
      doc: any;
  }>{
    let a='';
    let b='';
    let c=0;
    let d=0;
    let doc;

    return fetch('/assets/Test-Automation-Report.html').then(res => res.text()).then(data => {

      let parser = new DOMParser(),
        doc = parser.parseFromString(data, 'text/html');

      for (let index = 0; index < doc.getElementsByClassName('test-status').length; index++) {
        if (doc.getElementsByClassName('test-status')[index].textContent === "pass") {
          b+= doc.getElementsByClassName('test-name')[index].textContent + "<br>";
          c++;
        }
        else {
          a+= doc.getElementsByClassName('test-name')[index].textContent + "<br>";
          d++;
        }
      }

      return {a, b, c, d, doc};
    });
  }
}