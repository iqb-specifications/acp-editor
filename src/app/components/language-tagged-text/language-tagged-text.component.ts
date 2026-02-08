import {Component, effect, input, linkedSignal, model, output, signal} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {form, FormField} from '@angular/forms/signals';

@Component({
  selector: 'acp-language-tagged-text',
  imports: [TranslateModule, MatFormField, MatLabel, MatInput, FormField],
  template: `
    <form class="ltt-text-input">
      @if (multiLine()) {
        <mat-form-field class="ltt-full-width">
          <mat-label>{{labelKey() | translate}}</mat-label>
          <textarea matInput [placeholder]="placeholderKey() | translate"
          [formField]="inputForm.text" ></textarea>
        </mat-form-field>
      } @else {
        <mat-form-field class="ltt-full-width">
          <mat-label>{{labelKey() | translate}}</mat-label>
          <input matInput [placeholder]="placeholderKey() | translate" [formField]="inputForm.text">
        </mat-form-field>
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
export class LanguageTaggedTextComponent {
  readonly textList = model.required<LanguageTaggedText>();
  multiLine = input.required<boolean>();
  placeholderKey = input<string>('');
  labelKey = input<string>('');
  textChanged = output<LanguageTaggedText>();


  private readonly formModel = linkedSignal({
    source: this.textList,
    computation: (domainModel) => domainModel && domainModel[0] ?
      {
        "text": domainModel[0].value
      } : {
        "text": ""
      }
  });
  inputForm = form(this.formModel)

  constructor() {
    effect(() => {
      if (this.inputForm().valid()) {
        this.textList.set(
          [
            {
              lang: "de",
              value: this.inputForm.text().value()
            }
          ]
        )
      }
    });
  }
}
