import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksModalComponent } from './books-modal.component';

describe('BooksModalComponent', () => {
  let component: BooksModalComponent;
  let fixture: ComponentFixture<BooksModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BooksModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BooksModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
