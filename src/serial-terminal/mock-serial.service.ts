import { DOCUMENT } from '@angular/common';
import { SerialService } from './serial.service';
import { Injectable, Injector, NgZone } from '@angular/core';



export class MockSerial {
  private readableController: ReadableStreamDefaultController<Uint8Array> | null = null;

  requestPort(options?: SerialPortRequestOptions): Promise<SerialPort> {
    return Promise.resolve({
      open: () => Promise.resolve(),
      close: () => Promise.resolve(),
      readable: new ReadableStream({
        start: (controller) => {
          this.readableController = controller;
        }
      }),
      writable: new WritableStream({
        write: (chunk) => {
          const input = new TextDecoder().decode(chunk);
          let response: string;
          if (input.startsWith('ECHO ')) {
            response = input.slice(5);
          } else if (input.trim() === 'DATE') {
            response = new Date().toISOString();
          } else if (input.trim() === '?') {
            response = 'Available commands:\nECHO <message> - Echoes the message back\nDATE - Returns the current timestamp\n? - Provides a summary of possible commands';
          } else {
            response = 'E';
          }
          response += '\r\n';
          if (this.readableController) {
            this.readableController.enqueue(new TextEncoder().encode(response));
          }
        }
      })
    } as any as SerialPort);
  }
}

export const MOCK_DOCUMENT: Document = {
  defaultView: {
    navigator: {
      serial: new MockSerial()
    }
  }
} as any as Document;


@Injectable()
export class MockSerialService extends SerialService {
  constructor(ngZone: NgZone) {
    super(MOCK_DOCUMENT, ngZone);
  }
}
