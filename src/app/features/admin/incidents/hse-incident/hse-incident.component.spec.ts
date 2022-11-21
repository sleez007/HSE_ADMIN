import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HseIncidentComponent } from './hse-incident.component';

describe('HseIncidentComponent', () => {
  let component: HseIncidentComponent;
  let fixture: ComponentFixture<HseIncidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HseIncidentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HseIncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
