import { Component, OnInit } from "@angular/core";
import { FilesService } from "../../files.service";
import { ActivatedRoute, Router } from "@angular/router";
import * as Chart from "chart.js";
import { VariableAst } from "@angular/compiler";

@Component({
  templateUrl: "chartjs.component.html",
})
export class ChartJSComponent implements OnInit {
  /*  */
  // lineChart
  public lineChartData: Array<any> = [
    { data: [74, 74, 74, 74, 0, 0], label: "Tests MTV2" },
  ];
  public lineChartLabels: Array<any> = [
    "20200912",
    "20200912",
    "20200913",
    "20200913",
    "20200914",
    "20200914",
  ];
  public lineChartOptions: any = {
    animation: false,
    responsive: true,
  };
  public lineChartColours: Array<any> = [
    {
      // grey
      backgroundColor: "rgba(148,159,177,0.2)",
      borderColor: "rgba(148,159,177,1)",
      pointBackgroundColor: "rgba(148,159,177,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(148,159,177,0.8)",
    },
  ];

  // lineChart2
  public lineChartData2: Array<any> = [
    { data: [180, 180, 180, 180, 0, 0], label: "Tests MR2250" },
  ];
  public lineChartLabels2: Array<any> = [
    "20200912",
    "20200912",
    "20200913",
    "20200913",
    "20200914",
    "20200914",
  ];
  public lineChartOptions2: any = {
    animation: false,
    responsive: true,
  };
  public lineChartColours2: Array<any> = [
    {
      // grey
      backgroundColor: "rgba(148,159,177,0.2)",
      borderColor: "rgba(148,159,177,1)",
      pointBackgroundColor: "rgba(148,159,177,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(148,159,177,0.8)",
    },
  ];
  public lineChartLegend = true;
  public lineChartType = "line";

  // barChart1
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  public barChartLabels: string[] = [
    "20200912",
    "20200912",
    "20200913",
    "20200913",
    "20200914",
    "20200914",
  ];
  public barChartType = "bar";
  public barChartLegend = true;

  public barChartData: any[] = [
    {
      data: [42, 42, 42, 42, 0, 0],
      label: "Test PASS",
      backgroundColor: "rgba(75, 192, 192, 0.8)",
    },
    {
      data: [32, 32, 32, 32, 0, 0],
      label: "Test FAIL",
      backgroundColor: "rgba(255, 99, 132, 0.8)",
    },
  ];

  // barChart2
  public barChartOptions2: any = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  public barChartLabels2: string[] = [
    "20200912",
    "20200912",
    "20200913",
    "20200913",
    "20200914",
    "20200914",
  ];
  public barChartType2 = "bar";
  public barChartLegend2 = true;

  public barChartData2: any[] = [
    {
      data: [167, 167, 167, 167, 0, 0],
      label: "Test PASS",
      backgroundColor: "rgba(75, 192, 192, 0.8)",
    },
    {
      data: [13, 13, 13, 13, 0, 0],
      label: "Test FAIL",
      backgroundColor: "rgba(255, 99, 132, 0.8)",
    },
  ];
  /*  */

  type: any;
  infoSuccess: any;
  infoFail: any;

  tableauResumCucumber = [];
  tableauResumCalabash = [];
  RecupInfo: () => void;
  constructor(
    private FilesService: FilesService,
    private ActivatedRoute: ActivatedRoute,
    private Router: Router
  ) {}
  informationCucumber;
  informationCalabash;

  testPass2 = 0;

  testFail2 = 0;

  testPass1 = 0;

  testFail1 = 0;

  doc;

  date = "";

  Information(date, type, infoFail, infoSuccess) {
    this.date = date;
    this.type = type;
    this.infoFail = infoFail;
    this.infoSuccess = infoSuccess;
    this.RecupInfo = function () {
      return;
      "info du jour " +
        this.date +
        " type" +
        this.type +
        "info fail" +
        this.infoFail +
        "info sucess" +
        this.infoSuccess;
    };
  }
  gestionDate() {}
  async getTestAutomation() {
    var recupdate = new Date();
    var dtdebut10 = new Date(new Date().setDate(new Date().getDate() - 4));

    var j, m, recup;

    while (dtdebut10 < recupdate) {
      var dd = recupdate.getDate();
      var mm = recupdate.getMonth() + 1;
      var yyyy = recupdate.getFullYear();
      if (dd < 10) {
        j = "0" + dd;
      } else {
        j = dd;
      }
      if (mm < 10) {
        m = "0" + mm;
      } else {
        m = mm;
      }
      recup = yyyy + "" + m + "" + j;
      this.date = recup;
      const values = await this.FilesService.getTestAutomation(this.date);
      /* if (values !== null)  {*/
      this.testPass1 = values.c;
      this.testFail1 = values.d;
      this.doc = values.doc;
      this.informationCalabash = new this.Information(
        this.date,
        "Calabash",
        this.testFail1,
        this.testPass1
      );

      this.informationCalabash.RecupInfo();

      this.tableauResumCalabash.push(this.informationCalabash);
      /* } */
      recupdate.setDate(recupdate.getDate() - 1);
    }
  }

  async getCucumber() {
    var recupdate = new Date();

    var j, m, recup;

    var dtdebut10 = new Date(new Date().setDate(new Date().getDate() - 4));
    while (dtdebut10 < recupdate) {
      var dd = recupdate.getDate();
      var mm = recupdate.getMonth() + 1;
      var yyyy = recupdate.getFullYear();
      if (dd < 10) {
        j = "0" + dd;
      } else {
        j = dd;
      }
      if (mm < 10) {
        m = "0" + mm;
      } else {
        m = mm;
      }
      recup = yyyy + "" + m + "" + j;
      this.date = recup;
      const values = await this.FilesService.getCucumber(this.date);

      if (values !== null) {
        this.testPass2 = values.z;
        this.testFail2 = values.t;
        this.doc = values.doc;
        this.informationCucumber = new this.Information(
          this.date,
          "Cucumber",
          this.testFail2,
          this.testPass2
        );

        this.informationCucumber.RecupInfo();
        if (
          this.tableauResumCucumber.indexOf(this.informationCucumber === -1)
        ) {
          this.tableauResumCucumber.push(this.informationCucumber);
        }
      }
      recupdate.setDate(recupdate.getDate() - 1);
    }
  }
  ngOnInit(): void {
    this.getTestAutomation();
    this.getCucumber();

    this.Result();
  }
  async Result() {
    try {
      await this.getTestAutomation();
      await this.getCucumber();

      //console.log(this.tableauResumCalabash);

      //console.log(this.tableauResumCucumber);
    } catch (error) {
      console.log(error);
    }
  }
}
