import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmployeesModalComponent } from './edit-employees-modal.component';

describe('EditEmployeesModalComponent', () => {
  let component: EditEmployeesModalComponent;
  let fixture: ComponentFixture<EditEmployeesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditEmployeesModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditEmployeesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
