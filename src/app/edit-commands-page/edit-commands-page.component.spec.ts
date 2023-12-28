import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCommandsPageComponent } from './edit-commands-page.component';

describe('EditCommandsPageComponent', () => {
  let component: EditCommandsPageComponent;
  let fixture: ComponentFixture<EditCommandsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCommandsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditCommandsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
