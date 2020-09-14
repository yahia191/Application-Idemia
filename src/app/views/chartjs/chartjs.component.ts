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
