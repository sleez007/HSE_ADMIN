import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OptionModel } from 'src/app/features/admin/core/model';
import { SwitchState } from 'src/app/features/admin/dashboard/core/model';

@Component({
  selector: 'app-project-filter',
  templateUrl: './project-filter.component.html',
  styleUrls: ['./project-filter.component.scss']
})
export class ProjectFilterComponent implements OnInit {
  @Input() switchState: SwitchState = SwitchState.OFFICE;
  @Input() projectValue: string | number = ''
  @Input() projectOptions: OptionModel[] = []
  @Output() toggleSwitch : EventEmitter<SwitchState> = new EventEmitter();
  @Output() filter : EventEmitter<{start: string | Date , end: string | Date}> = new EventEmitter();
  @Output() filterDropDown : EventEmitter<string| number> = new EventEmitter();

  maxDate = new Date();

  filterForm = this.fb.group({
    start: ['', [Validators.required]],
    end: ['', [Validators.required]],
  })

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit(): void {}

  submit() {
    if(this.filterForm.valid){
      const data = { start: this.filterForm.value.start ?? '', end: this.filterForm.value.start ?? '' };
      this.filter.emit(data);
    }else{
      alert("Kindly fill out the form properly")
    }
  }

  changeSwitchState(isProject: boolean){
    this.toggleSwitch.emit(isProject ?  SwitchState.PROJECT : SwitchState.OFFICE)
  }

  projectChangeListener(value: string | number) {
    this.filterDropDown.emit(value)
  }

}
