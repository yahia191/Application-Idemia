import { Component, OnInit } from "@angular/core";
import { Chart } from "chart.js";
import { FilesService } from "../../files.service";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";

@Component({
  templateUrl: "dashboard.component.html",
})
export class DashboardComponent implements OnInit {
  z = 0;
  t = 0;
  c = 0;
  d = 0;
  p = 0;
  o = 0;
  sum = [];
  somme = 0;

  doc;

  date = "";

  constructor(
    private filesService: FilesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.date = this.activatedRoute.snapshot.paramMap.get("date");

        if (!this.date) {
          this.router.navigateByUrl("/404");
        } else {
          this.getTestAutomation();
          this.getCucumber();
          this.getMr2250Report2();
        }
      }
    });
  }

  ngOnInit(): void {}

  async getTestAutomation() {
    const values = await this.filesService.getTestAutomation(this.date);

    if (values !== null) {
      this.c = values.c;
      this.d = values.d;
      this.doc = values.doc;

      document.getElementById("test1").innerHTML =
        this.doc.getElementsByClassName("test-status").length + " TEST";
      document.getElementById("test2").innerHTML =
        "le nombre de test pass " + this.c + "<br>";
      document.getElementById("test3").innerHTML =
        "le nombre de test fail " + this.d + "<br>";

      new Chart("myChart", {
        type: "doughnut",
        data: {
          labels: ["pass", "fail"],
          datasets: [
            {
              label: "i% des tests",
              data: [this.c, this.d],
              backgroundColor: [
                "rgba(102, 204, 0, 0.2)",
                "rgba(204, 0, 0, 0.2)",
              ],

              borderWidth: 1,
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: "pourcentages des test pass/ fail",
          },
        },
      });
    }
  }

  async getCucumber() {
    const values = await this.filesService.getCucumber(this.date);

    if (values !== null) {
      this.z = values.z;
      this.t = values.t;
      this.doc = values.doc;
      this.sum.push(values.z);
      this.somme = this.sum[0] + this.sum[1];
      document.getElementById("test11").innerHTML =
        this.doc.getElementsByTagName("H3").length + " TEST";
      document.getElementById("test12").innerHTML =
        "le nombre de test pass " + this.somme + "<br>";
      /*document.getElementById("test13").innerHTML =
        "le nombre de test fail " + this.t + "<br>";*/

      console.warn(this.somme);

      new Chart("myChart1", {
        type: "doughnut",
        data: {
          labels: ["pass", "fail"],
          datasets: [
            {
              label: "i% des tests",
              data: [this.z, this.t],
              backgroundColor: [
                "rgba(102, 204, 0, 0.2)",
                "rgba(204, 0, 0, 0.2)",
              ],

              borderWidth: 1,
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: "pourcentages des test pass/ fail",
          },
        },
      });
    }
  }

  async getMr2250Report2() {
    const values = await this.filesService.getMr2250Report2(this.date);

    if (values !== null) {
      this.p = values.p;
      this.o = values.o;
      this.doc = values.doc;
      this.sum.push(values.p);
      /* this.somme = this.sum[0] + this.sum[1]; */

      /* document.getElementById("test21").innerHTML =
        this.doc.getElementsByTagName("H3").length + " TEST"; */
      /*.getElementById("test22").innerHTML =
        "le nombre de test pass " + this.p + "<br>";*/
      document.getElementById("test13").innerHTML =
        "le nombre de test fail " + this.o + "<br>";

      /* new Chart("myChart2", {
        type: "doughnut",
        data: {
          labels: ["pass", "fail"],
          datasets: [
            {
              label: "i% des tests",
              data: [this.p, this.o],
              backgroundColor: [
                "rgba(102, 204, 0, 0.2)",
                "rgba(204, 0, 0, 0.2)",
              ],

              borderWidth: 1,
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: "pourcentages des test pass/ fail",
          },
        },
      }); */
    }
  }
}
