import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesasComponent } from './mesas.component';

describe('MesasComponent', () => {
  let component: MesasComponent;
  let fixture: ComponentFixture<MesasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MesasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MesasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
