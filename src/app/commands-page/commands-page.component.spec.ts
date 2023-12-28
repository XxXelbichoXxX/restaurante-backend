import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandsPageComponent } from './commands-page.component';

describe('CommandsPageComponent', () => {
  let component: CommandsPageComponent;
  let fixture: ComponentFixture<CommandsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommandsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommandsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
