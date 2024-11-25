import { Routes } from '@angular/router';
import { SerialTerminalComponent } from '../serial-terminal/serial-terminal.component';
import { provideAngularSerialTest, provideAngularSerial } from 'angular-web-serial';

export const routes: Routes = [
  {
    path: '',
    component: SerialTerminalComponent,
    providers: [provideAngularSerial()]

  },
  {
    path: 'mock',
    component: SerialTerminalComponent,
    providers: [provideAngularSerialTest(i => `Hello ${i}!\n`)]

  }
];
