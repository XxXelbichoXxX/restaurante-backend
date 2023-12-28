import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMenuPageComponent } from './add-menu-page.component';

describe('AddMenuPageComponent', () => {
  let component: AddMenuPageComponent;
  let fixture: ComponentFixture<AddMenuPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddMenuPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddMenuPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
