import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerialTerminalComponent } from './serial-terminal.component';
import { provideAngularSerialTest } from 'angular-web-serial';

describe('SerialTerminalComponent', () => {
  let component: SerialTerminalComponent;
  let fixture: ComponentFixture<SerialTerminalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SerialTerminalComponent],
      providers: [provideAngularSerialTest()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SerialTerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
