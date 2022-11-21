import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpaIncidentComponent } from './cpa-incident.component';

describe('CpaIncidentComponent', () => {
  let component: CpaIncidentComponent;
  let fixture: ComponentFixture<CpaIncidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpaIncidentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CpaIncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
