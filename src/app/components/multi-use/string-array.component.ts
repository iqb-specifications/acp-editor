import {Component, effect, input, linkedSignal, model} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {form, FormField, FormValueControl} from '@angular/forms/signals';

@Component({
  selector: 'acp-string-array',
  imports: [TranslateModule, MatFormField, MatLabel, MatInput, FormField],
  template: `
    <form>
      @for (t of [].constructor(arrayLength()); track $index) {
        <mat-form-field class="ltt-full-width">
          <mat-label>{{labelKeyPrefix() | translate}} {{$index + 1}}</mat-label>
          <input matInput [formField]="inputForm.items[$index].text">
        </mat-form-field>
      } @empty {
        <div>{{emptyKey() | translate}}</div>
      }
    </form>
  `,
  styles: [
    `
      .ltt-text-input {
        min-width: 150px;
        max-width: 500px;
        width: 100%;
      }

      .ltt-full-width {
        width: 100%;
      }
    `
    ],
})
export class StringArrayComponent implements FormValueControl<string[]>{
  value = model<string[]>([]);
  arrayLength = input<number>(0);
  labelKeyPrefix = input<string>('');
  emptyKey = input<string>('');

  private readonly formModel = linkedSignal({
    source: this.value,
    computation: (domainModel) => {
      const returnArray: {"text": string}[] = [];
      const aL = this.arrayLength();
      if (aL > 0) {
        for (let i = 0; i < aL ; i++) {
          returnArray.push({"text": domainModel[i] || ''})
        }
      }
      return {"items": returnArray};
    }
  });
  inputForm = form(this.formModel)

  constructor() {
    effect(() => {
      if (this.inputForm().valid()) {
        // todo:
        const oldValue = JSON.stringify(this.value());
        const newValue = this.inputForm.items().value().map(t => t.text);
        if (JSON.stringify(newValue) !== oldValue) this.value.set(newValue);
      }
    });
  }
}
