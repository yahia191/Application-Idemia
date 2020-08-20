import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { ColorsComponent } from '../theme/colors.component';

@Component({
  templateUrl: 'dashboard.component.html',
  template: `<div onload="function2()"></div>`

})
export class DashboardComponent implements OnInit {


  

  ngOnInit(): void {
    let myCompOneObj = new ColorsComponent();
    myCompOneObj.test();

    
  }
}
