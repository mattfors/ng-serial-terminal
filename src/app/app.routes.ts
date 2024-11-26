import { Routes } from '@angular/router';
import { SerialTerminalComponent } from '../serial-terminal/serial-terminal.component';
import { provideNgxWebSerial, provideNgxWebSerialTest } from 'ngx-web-serial';

export const routes: Routes = [
  {
    path: '',
    component: SerialTerminalComponent,
    providers: [provideNgxWebSerial()]

  },
  {
    path: 'mock',
    component: SerialTerminalComponent,
    providers: [provideNgxWebSerialTest(i => `Hello ${i}!\n`)]

  }
];
