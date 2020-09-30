import { Component, OnInit } from "@angular/core";
import { FilesService } from "../../files.service";
import { ActivatedRoute, Router } from "@angular/router";
import * as Chart from "chart.js";
import { VariableAst } from "@angular/compiler";

@Component({
  templateUrl: "chartjs.component.html",
})
export class ChartJSComponent implements OnInit {
  type: any;
  infototal: any;
  infoSuccess: any;
  infoFail: any;

  tableauResumCucumber = [];
  tableauResumCalabash = [];
  /*  */
  /*  */
  tableauResumMr2250 = [];
  RecupInfo: () => void;
  constructor(
    private FilesService: FilesService,
    private ActivatedRoute: ActivatedRoute,
    private Router: Router
  ) {}
  informationCucumber;
  informationCalabash;
  informationMr2250;

  testtotal1 = 0;
  testtotal2 = 0;
  testtotal3 = 0;
  testPass1 = 0;
  testPass2 = 0;
  testPass3 = 0;
  testFail1 = 0;
  testFail2 = 0;
  testFail3 = 0;

  doc;

  date = "";

  Information(date, type, infototal, infoFail, infoSuccess) {
    this.date = date;
    this.type = type;
    this.infoSuccess = infoSuccess;
    this.infoFail = infoFail;
    this.infototal = infototal;
    this.RecupInfo = function () {
      return;
      "info du jour " +
        this.date +
        " type" +
        this.type +
        "info fail" +
        this.infoFail +
        "info sucess" +
        this.infoSuccess +
        "info total" +
        this.infototal;
    };
  }
  gestionDate() {}
  async getTestAutomation() {
    var recupdate = new Date();
    var dtdebut10 = new Date(new Date().setDate(new Date().getDate() - 30));

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
      this.doc = values.doc;
      this.testtotal1 = values.doc.getElementsByClassName("test-status").length;
      this.testFail1 = values.d;
      this.informationCalabash = new this.Information(
        this.date,
        "Calabash",
        this.testtotal1,
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
    console.log("getCucumber");

    var dtdebut10 = new Date(new Date().setDate(new Date().getDate() - 30));
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
        this.doc = values.doc;
        this.testtotal2 = values.doc.getElementsByTagName("H3").length;
        this.testFail2 = values.t;
        this.informationCucumber = new this.Information(
          this.date,
          "Cucumber",
          this.testtotal2,
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

  async getMr2250Report2() {
    var recupdate = new Date();

    var j, m, recup;

    var dtdebut10 = new Date(new Date().setDate(new Date().getDate() - 30));
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
      const values = await this.FilesService.getMr2250Report2(this.date);

      if (values !== null) {
        this.testPass3 = values.p;
        this.doc = values.doc;
        this.testtotal3 = values.doc.getElementsByTagName("H3").length;
        this.testFail3 = values.o;
        this.informationMr2250 = new this.Information(
          this.date,
          "MR2250v2",
          this.testtotal3,
          this.testFail3,
          this.testPass3
        );

        this.informationMr2250.RecupInfo();
        if (this.tableauResumMr2250.indexOf(this.informationMr2250 === -1)) {
          this.tableauResumMr2250.push(this.informationMr2250);
        }
      }
      recupdate.setDate(recupdate.getDate() - 1);
    }
  }
  tabdatecal: any = [];
  tabtotalcal: any = [];
  tabfailcal: any = [];
  tabpasscal: any = [];

  tabdatecuc: any = [];
  tabtotalcuc: any = [];
  tabfailcuc: any = [];
  tabpasscuc: any = [];

  tabdatemr: any = [];
  tabtotalmr: any = [];
  tabfailmr: any = [];
  tabpassmr: any = [];

  ngOnInit(): void {
    this.Result();
  }
  async Result() {
    try {
      await this.getTestAutomation();
      await this.getCucumber();
      await this.getMr2250Report2();

      for (var i in this.tableauResumCalabash) {
        this.tabdatecal.push(this.tableauResumCalabash[i].date);
        this.tabfailcal.push(this.tableauResumCalabash[i].infoFail);
        this.tabpasscal.push(this.tableauResumCalabash[i].infoSuccess);
        this.tabtotalcal.push(this.tableauResumCalabash[i].infototal);
      }
      for (var j in this.tableauResumCucumber) {
        this.tabdatecuc.push(this.tableauResumCucumber[j].date);
        /*  this.tabfailcuc.push(this.tableauResumCucumber[j].infoFail) +
          this.tableauResumMr2250[j].infoFail;
        this.tabpasscuc.push(this.tableauResumCucumber[j].infoSuccess); */
        this.tabtotalcuc.push(this.tableauResumCucumber[j].infototal);
      }
      for (var k in this.tableauResumMr2250) {
        this.tabdatemr.push(this.tableauResumMr2250[k].date);
        this.tabfailmr.push(this.tableauResumMr2250[k].infoFail);
        this.tabpassmr.push(
          this.tableauResumMr2250[k].infoSuccess +
            this.tableauResumCucumber[k].infoSuccess
        );
        /* this.tabtotalmr.push(this.tableauResumMr2250[k].infototal); */
      }

      console.warn(this.tabdatecuc.reverse());
      console.warn(this.tabfailcuc.reverse());
      console.warn(this.tabpasscuc.reverse());
      console.warn(this.tabtotalcuc.reverse());
      console.warn(this.tabdatecal.reverse());
      console.warn(this.tabfailcal.reverse());
      console.warn(this.tabpasscal.reverse());
      console.warn(this.tabtotalcal.reverse());
      console.warn(this.tabdatemr.reverse());
      console.warn(this.tabfailmr.reverse());
      console.warn(this.tabpassmr.reverse());
      console.warn(this.tabtotalmr.reverse());
    } catch (error) {
      console.log(error);
    }
  }
  /*  */
  // lineChart
  public lineChartData: Array<any> = [
    { data: this.tabtotalcal, label: "Tests MTV2" },
  ];
  public lineChartLabels: Array<any> = this.tabdatecal;
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
    { data: this.tabtotalcuc, label: "Tests MR2250" },
  ];
  public lineChartLabels2: Array<any> = this.tabdatecuc;
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
    //responsive: true,
  };
  public barChartLabels: string[] = this.tabdatecal;
  public barChartType = "bar";
  public barChartLegend = true;

  public barChartData: any[] = [
    {
      data: this.tabpasscal,
      label: "Test PASS",
      backgroundColor: "green",
      borderColor: "green",
      pointBackgroundColor: "green",
      pointBorderColor: "green",
      pointHoverBackgroundColor: "green",
      pointHoverBorderColor: "green",
    },
    {
      data: this.tabfailcal,
      label: "Test FAIL",
      backgroundColor: "red",
    },
  ];

  // barChart2
  public barChartOptions3: any = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  public barChartLabels3: string[] = this.tabdatemr;
  public barChartType3 = "bar";
  public barChartLegend3 = true;

  public barChartData3: any[] = [
    {
      data: this.tabpassmr,
      label: "Test PASS",
      backgroundColor: "green",
    },
    {
      data: this.tabfailmr,
      label: "Test FAIL",
      backgroundColor: "red",
    },
  ];
  /*  */
}
