import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  incidents : {category: string, target: number, ph: number, awka: number, project: number, total: number}[] = [
    {category: "Unsafe Act", target: 10, ph: 6, awka: 3, project: 4, total: 13},
    {category: "Near Miss", target: 10, ph: 4, awka: 3, project: 5, total: 12},
    {category: "Unsafe Condition", target: 13, ph: 5, awka: 1, project: 7, total: 13},
    {category: "Restricted Work Case", target: 15, ph: 7, awka: 5, project: 3, total: 15},
    {category: "Lost Time Injury", target: 5, ph: 1, awka: 1, project: 3, total: 3},
    {category: "Road Traffic Accident", target: 0, ph: 0, awka: 0, project: 0, total: 0}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
