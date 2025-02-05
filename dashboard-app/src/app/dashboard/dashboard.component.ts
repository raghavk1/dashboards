import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import * as Highcharts from 'highcharts';
import ExportingModule from 'highcharts/modules/exporting';
import DataModule from 'highcharts/modules/data';
import WindBarbModule from 'highcharts/modules/windbarb';
import MoreModule from 'highcharts/highcharts-more';

// Initialize the modules
//these modules will help you use polar and other charts as well
ExportingModule(Highcharts);
DataModule(Highcharts);
WindBarbModule(Highcharts);
MoreModule(Highcharts);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      polar: true,
      type: 'line',
    },

    title: {
      text: '',
      // x: -80,
    },

    pane: {
      size: '100%',
    },

    xAxis: {
      categories: [
        'Sales',
        'Marketing',
        'Development',
        'Customer Support',
        'Information Technology',
        'Administration',
      ],
      tickmarkPlacement: 'on',
      lineWidth: 0,
    },

    yAxis: {
      gridLineInterpolation: 'polygon',
      lineWidth: 0,
      min: 0,
    },

    tooltip: {
      shared: true,
      pointFormat:
        '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>',
    },

    legend: {
      align: 'right',
      verticalAlign: 'bottom',
      // y: 70,
      // layout: 'vertical',
    },

    series: [
      {
        name: 'Allocated Budget',
        type: 'line',
        data: [430, 190, 600, 350, 170, 340],
        pointPlacement: 'on',
      },
      {
        name: 'Actual Spending',
        type: 'line',
        data: [500, 390, 420, 310, 260, 300],
        pointPlacement: 'on',
      },
      {
        name: 'Other Spendings',
        type: 'line',
        data: [400, 190, 520, 110, 240, 370],
        pointPlacement: 'on',
      },
    ],
  };
  barChart!: Chart;
  pieChart!: Chart;
  total: number = 200;
  inProgress: number = 80;
  Accepted: number = 60;

  ngOnInit() {
    this.initBarChart();
    this.initPieChart();
  }

  initBarChart() {
    this.barChart = new Chart({
      chart: {
        type: 'column',
      },
      title: {
        text: '',
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr'],
      },
      yAxis: {
        title: {
          text: 'Values',
        },
      },
      series: [
        {
          name: 'Total',
          type: 'column',
          data: [80, 90, 70, 60],
        },
        {
          name: 'Returned',
          type: 'column',
          data: [20, 30, 20, 15], // Adjusted values
        },
        {
          name: 'InProgress',
          type: 'column',
          data: [30, 40, 25, 20], // Adjusted values
        },
        {
          name: 'Accepted',
          type: 'column',
          data: [30, 20, 25, 25], // Adjusted values
        },
      ],
    });
  }

  initPieChart() {
    this.pieChart = new Chart({
    chart: {
      type: 'donut',
    },
    title: {
      text: 'Pie Chart Example',
    },
    series: [
      {
        name: 'Brands',
        type: 'pie',
        data: [
          { name: 'Team A', y: 44 },
          { name: 'Team B', y: 55 },
          { name: 'Team C', y: 13 },
          { name: 'Team D', y: 33 },
        ],
      },
    ],
  });
  }
  // initPieChart() {
  //   this.pieChart = new Chart({
  //     chart: {
  //       type: 'pie',
  //     },
  //     title: {
  //       text: 'My Profile',
  //       useHTML: true,
  //     },
  //     plotOptions: {
  //       pie: {
  //         innerSize: '70%', // Creates the donut hole
  //         dataLabels: {
  //           enabled: true,
  //           format: '<b>{point.name}</b>: {point.percentage:.1f} %',
  //         },
  //       },
  //     },
  //     series: [
  //       {
  //         name: 'Brands',
  //         type: 'pie',
  //         data: [
  //           { name: 'Pending', y: 31 },
  //           { name: 'Completed', y: 69 },
  //         ],
  //       },
  //     ],
  //   });
  // }
}
