import { Component, Input, OnInit } from '@angular/core';
import { StaffData } from '../../core/model';

@Component({
  selector: 'app-staff-card',
  templateUrl: './staff-card.component.html',
  styleUrls: ['./staff-card.component.scss']
})
export class StaffCardComponent implements OnInit {

  @Input() staff!: StaffData

  @Input() index!: number

  constructor() { }

  ngOnInit(): void {
  }

}
