import { Component, OnInit, Output, EventEmitter, forwardRef } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgForOf } from '@angular/common';


@Component({
  selector: 'app-serial-options',
  standalone: true,
  templateUrl: './serial-options.component.html',
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  styleUrls: ['./serial-options.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SerialOptionsComponent),
      multi: true
    }
  ]
})
export class SerialOptionsComponent implements OnInit {
  serialOptionsForm: FormGroup;
  baudRates: number[] = [9600, 14400, 19200, 38400, 57600, 115200];

  @Output() optionsChange = new EventEmitter<SerialOptions>();

  constructor(private fb: FormBuilder) {
    this.serialOptionsForm = this.fb.group({
      baudRate: [9600, [Validators.required, Validators.min(1)]],
      dataBits: [8, [Validators.min(5), Validators.max(8)]],
      stopBits: [1, [Validators.min(1), Validators.max(2)]],
      parity: ['none'],
      bufferSize: [255, [Validators.min(1)]],
      flowControl: ['none']
    });
  }

  ngOnInit(): void {
    this.serialOptionsForm.valueChanges.subscribe(value => {
      if (this.serialOptionsForm.valid) {
        this.optionsChange.emit(value);
      }
    });
  }


}
