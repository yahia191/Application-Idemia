import { Injectable } from "@angular/core";

export enum File {
  cucumber = "Cucumber.html",
  testAutomation = "Test-Automation-Report.html",
  mr2250report2 = "MR2250_report2.html",
}

@Injectable({
  providedIn: "root",
})
export class FilesService {
  constructor() {}

  ngOnInit() {}

  getCucumber(
    folderName: string
  ): Promise<{
    x: string;
    y: string;
    z: number;
    t: number;
    doc: any;
  }> {
    let x = "";
    let y = "";
    let z = 0;
    let t = 0;
    let doc;

    return fetch("/assets/dates/" + folderName + "/" + File.cucumber)
      .then((res) => res.text())
      .then((data) => {
        const parser = new DOMParser();
        doc = parser.parseFromString(data, "text/html");

        for (
          let index = 0;
          index < doc.getElementsByTagName("H3").length;
          index++
        ) {
          if (
            doc.getElementsByTagName("H3")[index].getAttribute("style") ===
            "cursor: pointer;"
          ) {
            y +=
              doc.getElementsByTagName("H2")[index].textContent +
              "<br>" +
              doc.getElementsByTagName("H3")[index].textContent +
              "<br><br>";
            z++;
          }
          if (
            doc.getElementsByTagName("H3")[index].getAttribute("style") ===
            "background: rgb(196, 13, 13); color: rgb(255, 255, 255); cursor: pointer;"
          ) {
            x +=
              doc.getElementsByTagName("H2")[index].textContent +
              "<br>" +
              doc.getElementsByTagName("H3")[index].textContent +
              "<br><br>";
            t++;
          }
        }
        console.warn(z, t);

        return { x, y, z, t, doc };
      });
  }

  getMr2250Report2(
    folderName: string
  ): Promise<{
    e: string;
    f: string;
    p: number;
    o: number;
    doc: any;
  }> {
    let e = "";
    let f = "";
    let p = 0;
    let o = 0;
    let doc;

    return fetch("/assets/dates/" + folderName + "/" + File.mr2250report2)
      .then((res) => res.text())
      .then((data) => {
        const parser = new DOMParser();
        doc = parser.parseFromString(data, "text/html");

        for (
          let index = 0;
          index < doc.getElementsByTagName("H3").length;
          index++
        ) {
          if (
            doc.getElementsByTagName("H3")[index].getAttribute("style") ===
            "cursor: pointer;"
          ) {
            f +=
              doc.getElementsByTagName("H2")[index].textContent +
              "<br>" +
              doc.getElementsByTagName("H3")[index].textContent +
              "<br><br>";
            p++;
          }
          if (
            doc.getElementsByTagName("H3")[index].getAttribute("style") ===
            "background: rgb(196, 13, 13); color: rgb(255, 255, 255); cursor: pointer;"
          ) {
            e +=
              doc.getElementsByTagName("H2")[index].textContent +
              "<br>" +
              doc.getElementsByTagName("H3")[index].textContent +
              "<br><br>";
            o++;
          }
          console.warn(p, o);
        }
        return { e, f, p, o, doc };
      });
  }

  getTestAutomation(
    folderName: string
  ): Promise<{
    a: string;
    b: string;
    c: number;
    d: number;
    doc: any;
  }> {
    let a = "";
    let b = "";
    let c = 0;
    let d = 0;
    let doc;

    return fetch("/assets/dates/" + folderName + "/" + File.testAutomation)
      .then((res) => res.text())
      .then((data) => {
        let parser = new DOMParser(),
          doc = parser.parseFromString(data, "text/html");

        for (
          let index = 0;
          index < doc.getElementsByClassName("test-status").length;
          index++
        ) {
          if (
            doc.getElementsByClassName("test-status")[index].textContent ===
            "pass"
          ) {
            b +=
              doc.getElementsByClassName("test-name")[index].textContent +
              "<br>";
            c++;
          } else {
            a +=
              doc.getElementsByClassName("test-name")[index].textContent +
              "<br>";
            d++;
          }
        }
        //console.log(folderName + " :" + d + c);
        return { a, b, c, d, doc };
      });
  }
}
