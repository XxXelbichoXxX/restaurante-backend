import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommandsPageComponent } from './add-commands-page.component';

describe('AddCommandsPageComponent', () => {
  let component: AddCommandsPageComponent;
  let fixture: ComponentFixture<AddCommandsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCommandsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCommandsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
