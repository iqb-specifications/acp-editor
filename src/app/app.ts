import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {LanguageTaggedTextComponent} from './components/language-tagged-text/language-tagged-text.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslatePipe, LanguageTaggedTextComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('acp-editor');
  data1 = signal<LanguageTaggedText> ([
    {
      lang: 'de',
      value: 'yoyo jaja'
    }
  ]);
  data2 = signal<LanguageTaggedText>([
    {
      lang: 'de',
      value: 'bommerlunder'
    }
  ]);
}
