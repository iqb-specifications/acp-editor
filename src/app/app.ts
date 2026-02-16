import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {LanguageTaggedTextComponent} from './components/multi-use/language-tagged-text.component';
import {ScaleComponent} from './components/scale.component/scale.component';
import {StringArrayComponent} from './components/multi-use/string-array.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslatePipe, LanguageTaggedTextComponent, ScaleComponent, StringArrayComponent],
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
  data3 = signal<Scale>({
    id: "eded",
    name: [],
    description: [],
    scaleType: "BASE",
    typeParameters: {
      method: "SCORE_RATIO",
      methodParameters: ['aa', 'bb'],
      items: []
    }
  });
  data4 = signal<string[]>([
    'aa', 'bb'
  ])

  protected printScaleData() {
    console.debug(this.data3());
  }
}
