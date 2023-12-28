import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdiEmployeesPageComponent } from './edi-employees-page.component';

describe('EdiEmployeesPageComponent', () => {
  let component: EdiEmployeesPageComponent;
  let fixture: ComponentFixture<EdiEmployeesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EdiEmployeesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EdiEmployeesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
