import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerialOptionsComponent } from './serial-options.component';

describe('SerialOptionsComponent', () => {
  let component: SerialOptionsComponent;
  let fixture: ComponentFixture<SerialOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SerialOptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SerialOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
