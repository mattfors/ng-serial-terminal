import { Inject, Injectable, NgZone } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
  BehaviorSubject,
  catchError,
  filter,
  firstValueFrom,
  from,
  interval,
  map,
  Observable,
  Subject,
  Subscriber,
  takeUntil,
  throwError,
  timer
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SerialService {

  readonly serial: Serial | undefined;
  private port: SerialPort | null = null;
  private abortController: AbortController | null = null;
  private dataStream: WritableStream | null = null;
  private dataSubject: Subject<string> = new Subject<string>();
  private writer: WritableStreamDefaultWriter<Uint8Array> | null = null;
  private connectedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private readonly sink: UnderlyingSink =  {
    write: (chunk: any) => {
      this.ngZone.run(() => {
        this.dataSubject.next(chunk);
      });
    }
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private ngZone: NgZone
  ) {
    this.serial = this.document?.defaultView?.navigator?.serial;
  }

  /**
   * Establishes a connection to a serial port using the Web Serial API.
   */
  open(serialOptions: SerialOptions = { baudRate: 9600 }, options?: SerialPortRequestOptions): Observable<void> {
    return new Observable<void>((observer: Subscriber<void>) => {
      if (!this.serial) {
        observer.error('Web serial not supported.');
        return;
      }
      this.serial.requestPort(options)
        .then((port: SerialPort) => {
          this.port = port;
          return this.port.open(serialOptions);
        })
        .then(() => {
          if (!this.port?.readable || !this.port?.writable) {
            observer.error('Port is not readable or writable.');
            return;
          }
          this.connectedSubject.next(true);
          this.abortController = new AbortController();
          this.dataStream = new WritableStream(this.sink);
          this.writer = this.port?.writable.getWriter();
          observer.next();
          return this.port.readable
            .pipeThrough(new TextDecoderStream())
            .pipeTo(this.dataStream, {signal: this.abortController.signal})
            .catch(() => this.closePort().catch((err) => observer.error(err)));
        })
        .catch((err) => observer.error(err))
        .finally(() => observer.complete());
    });
  }

  isConnected(): Observable<boolean> {
    return this.connectedSubject.asObservable();
  }

  read(): Observable<string> {
    return this.dataSubject.asObservable();
  }

  write(data: string): Observable<void> {
    if (this.writer) {
      return from(this.writer.write(new TextEncoder().encode(data)));

    }
    return throwError(() => new Error('No writer available.'));
  }


  private waitForReadableUnlock(period: number = 50, timeout: number = 5000): Promise<void> {
    return firstValueFrom(interval(period).pipe(
      filter(() => !this.port?.readable?.locked),
      map(() => undefined),
      takeUntil(timer(timeout)),
      catchError(() => throwError(() => new Error('Timeout waiting for readable stream to unlock')))
    ));
  }

  private closePort(): Promise<void> {
    this.abortController = null;
    if (this.writer) {
      this.writer.releaseLock();
      this.writer = null;
    }
    if (this.port) {
      return this.waitForReadableUnlock()
        .then(() => this.port!.close())
        .then(() => {
          this.port = null;
          this.connectedSubject.next(false);
        });
    } else {
      return Promise.resolve();
    }
  }
  close(): void {
    if (this.abortController) {
      this.abortController.abort();
    }
  }

}
