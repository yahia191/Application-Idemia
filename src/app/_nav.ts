import { INavData } from "@coreui/angular";

function test() {
  var start = "2020-08-23";
  var v1start = start.split("-");
  var recupdate = new Date(start);
  var today = new Date();
  var a = [];
  var c;
  var j, m, recup;
  while (recupdate < today) {
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

    a.push(recup);
    recupdate.setDate(recupdate.getDate() + 1);
  }
  var fin1 = {
    name: "Dashboard",
    title: true,
  };

  var fin3;

  return a.reverse();
}

const list = test();

let items: INavData[] = [
  {
    name: "Dashboard",
    title: true,
  },
  {
    name: "charts",
    url: "/charts",
    icon: "icon-pie-chart",
  },
  {
    name: "Tests par date",
    title: true,
  },
];

list.forEach((element) => {
  items.push({
    name: element,
    url: "/dashboard/" + element,
    icon: "icon-layers",
  });
});

export const navItems: INavData[] = items;
