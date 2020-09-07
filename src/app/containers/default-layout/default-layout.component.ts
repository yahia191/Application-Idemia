import { Component, OnInit } from "@angular/core";
import { navItems } from "../../_nav";
import { File } from "../../files.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./default-layout.component.html",
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = navItems;

  ngOnInit(): void {}

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}
