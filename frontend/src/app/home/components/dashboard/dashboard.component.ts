import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as echarts from 'echarts';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  chart: echarts.ECharts;

  ngOnInit(): void {
    this.initChart();
    this.initChart1();
  }

  initChart(): void {
    this.chart = echarts.init(document.getElementById('chart-container'));
    const option: echarts.EChartsOption = {
      xAxis: {
        type: 'category',
        data: ['Jan', '2', '3 ', '4', '5', '6', '7', '8', '9', '10'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [231, 371, 433, 345, 480, 603, 690],
          type: 'bar',
        },
      ],
    };

    this.chart.setOption(option);
  }

  initChart1(): void {
    this.chart = echarts.init(document.getElementById('chart-container1'));
    const option1: echarts.EChartsOption = {
      xAxis: {
        type: 'category',
        show: false,
      },
      yAxis: {
        type: 'value',
        show: false,
      },
      series: [
        {
          data: [120, 200, 150, 80, 70],
          type: 'line',
          areaStyle: {},
          color: '#20c997',
        },
      ],
    };

    // Set the ECharts options
    this.chart.setOption(option1);
  }
}
