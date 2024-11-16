import { Routes } from '@angular/router';
import { SerialTerminalComponent } from '../serial-terminal/serial-terminal.component';
import { SerialService } from '../serial-terminal/serial.service';
import { MockSerialService } from '../serial-terminal/mock-serial.service';

export const routes: Routes = [
  {
    path: '',
    component: SerialTerminalComponent,
    providers: [
      { provide: SerialService, useClass: SerialService }
    ]
  },
  {
    path: 'mock',
    component: SerialTerminalComponent,
    providers: [
      { provide: SerialService, useClass: MockSerialService },
    ]
  }
];
