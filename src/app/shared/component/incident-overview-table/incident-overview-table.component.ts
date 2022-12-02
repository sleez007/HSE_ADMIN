import { Component, Input, OnInit } from '@angular/core';
import { OfficeModel } from 'src/app/features/admin/dashboard/core/model';

@Component({
  selector: 'app-incident-overview-table',
  templateUrl: './incident-overview-table.component.html',
  styleUrls: ['./incident-overview-table.component.scss']
})
export class IncidentOverviewTableComponent implements OnInit {

  @Input() headerList : string[] = []
  @Input() tableContent: OfficeModel[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
