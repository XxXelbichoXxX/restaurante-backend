import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMenuPageComponent } from './edit-menu-page.component';

describe('EditMenuPageComponent', () => {
  let component: EditMenuPageComponent;
  let fixture: ComponentFixture<EditMenuPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditMenuPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditMenuPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
