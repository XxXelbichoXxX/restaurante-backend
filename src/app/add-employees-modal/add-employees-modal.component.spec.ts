import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeesModalComponent } from './add-employees-modal.component';

describe('AddEmployeesModalComponent', () => {
  let component: AddEmployeesModalComponent;
  let fixture: ComponentFixture<AddEmployeesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEmployeesModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEmployeesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
