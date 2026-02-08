import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageTaggedText } from './language-tagged-text.component';

describe('LanguageTaggedText', () => {
  let component: LanguageTaggedText;
  let fixture: ComponentFixture<LanguageTaggedText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageTaggedText]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguageTaggedText);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
