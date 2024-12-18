import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-validation-messages',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="shouldShowErrors" class="mt-1 text-sm text-red-600">
      <p *ngFor="let error of errorMessages">{{ error }}</p>
    </div>
  `
})
export class ValidationMessagesComponent {
  @Input() control!: AbstractControl | null;
  @Input() messages: {[key: string]: string} = {};

  get errorMessages(): string[] {
    if (!this.control || !this.control.errors || !this.control.touched) {
      return [];
    }

    return Object.keys(this.control.errors)
      .map(key => this.messages[key])
      .filter(message => message);
  }

  get shouldShowErrors(): boolean {
    return this.control?.errors && this.control?.touched && this.errorMessages.length > 0;
  }
}