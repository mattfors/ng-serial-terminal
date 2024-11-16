import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { SerialService } from './serial.service';
import { catchError, Observable, OperatorFunction, scan, tap, throwError } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SerialOptionsComponent } from '../serial-options/serial-options.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, CommonModule, FormsModule, SerialOptionsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy {

  serialCommand: string = '';
  errorMessage: string = '';
  data$: Observable<string>;
  connected$: Observable<boolean>;
  serialOptions!: SerialOptions;
  @ViewChild('dataDiv') dataDiv!: ElementRef<HTMLDivElement>;

  constructor(private serialService: SerialService) {
    this.data$ = this.serialService.read().pipe(
      scan((acc, value) => acc + value, ''),
      tap(() => this.scrollToBottom())
    );
    this.connected$ = this.serialService.isConnected();
  }

  connect(): void {
    this.serialService.connect(this.serialOptions).pipe(this.errorHandler()).subscribe();
  }

  close(): void {
    this.serialService.close();
  }

  closePort() {
    this.serialService.port?.close().then(() => console.log('closed port'))
  }

  write(): void {
    this.serialService.write(this.serialCommand + '\r').subscribe({
      next: () => this.serialCommand = '',
      error: (error) => this.errorMessage = error
    });
  }

  errorHandler<T>(): OperatorFunction<T, T> {
    return (source: Observable<T>) => source.pipe(
      tap(() => this.error()),
      catchError(error => {
        this.error(error);
        return throwError(error);
      })
    );
  }

  private error(message: string = ''): void {
    this.errorMessage = message;
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      this.dataDiv.nativeElement.scrollTop = this.dataDiv.nativeElement.scrollHeight;
    }, 0);
  }

  ngOnDestroy(): void {
    this.close();
  }

}
