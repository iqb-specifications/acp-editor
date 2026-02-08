interface TextTuple {
  lang: string;
  value: string;
}
interface LanguageTaggedText {
  [index: number]: TextTuple;
}
