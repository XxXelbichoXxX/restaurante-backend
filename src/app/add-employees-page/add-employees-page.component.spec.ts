import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeesPageComponent } from './add-employees-page.component';

describe('AddEmployeesPageComponent', () => {
  let component: AddEmployeesPageComponent;
  let fixture: ComponentFixture<AddEmployeesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEmployeesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEmployeesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
