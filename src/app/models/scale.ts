const ItemParameterKeys = ["LOGIT_FULL_CREDIT", "LOGIT_PARTIAL_CREDIT_1", "LOGIT_PARTIAL_CREDIT_2",
  "LOGIT_PARTIAL_CREDIT_3", "WEIGHT"];

interface ItemParameter {
  key: "LOGIT_FULL_CREDIT" | "LOGIT_PARTIAL_CREDIT_1" | "LOGIT_PARTIAL_CREDIT_2" | "LOGIT_PARTIAL_CREDIT_3" | "WEIGHT";
  value: string
}

interface ItemInBaseScale {
  id: string;
  parameters: ItemParameter[];
}

const ScaleBaseMethods = ["SCORE_SUM", "SCORE_RATIO", "SCORE_MEAN", "SCORE_MEDIAN", "WLE", "CODE_COUNT"];

interface ScaleParametersBase {
  method: "SCORE_SUM" | "SCORE_RATIO" | "SCORE_MEAN" | "SCORE_MEDIAN" | "WLE" | "CODE_COUNT";
  methodParameters: string[];
  items: ItemInBaseScale[];
  minItemNumber?: number
}

interface NewValueInDerivedScale {
  value: number;
  label: LanguageTaggedText;
  description: LanguageTaggedText;
  publicVocabularyEntry: string
}

const ScaleDerivedMethods = ["EQUALS", "LESS_THAN", "MORE_THAN", "MAX", "MIN"];

interface MappingInDerivedScale {
  method: "EQUALS" | "LESS_THAN" | "MORE_THAN" | "MAX" | "MIN";
  methodParameters: string[];
  newValue: NewValueInDerivedScale[]
}
interface ScaleParametersDerived {
  source: string;
  publicVocabularyUrl: string;
  mappings: MappingInDerivedScale[];
  else: NewValueInDerivedScale;
}

interface SourceInAggregatedScale {
  id: string;
  weight: number;
}

const ScaleAggregatedMethods = ["SUM", "MEAN"];

interface ScaleParametersAggregated {
  method: "SUM" | "MEAN";
  sources: SourceInAggregatedScale[];
}

const ScaleTypesString = ["BASE", "DERIVED", "AGGREGATED"];
type ScaleType = "BASE" | "DERIVED" | "AGGREGATED";

interface Scale {
  id: string;
  name: LanguageTaggedText;
  description?: LanguageTaggedText;
  scaleType: ScaleType;
  typeParameters: ScaleParametersBase | ScaleParametersDerived | ScaleParametersAggregated;
}
