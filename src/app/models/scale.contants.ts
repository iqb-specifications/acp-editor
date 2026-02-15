import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class ScaleConstants {
  public static TypesString = ["BASE", "DERIVED", "AGGREGATED"];
  public static BaseMethods = ["SCORE_SUM", "SCORE_RATIO", "SCORE_MEAN", "SCORE_MEDIAN", "WLE", "CODE_COUNT"];
  public static BaseMethodParameterNumber: { [id: string]: number; } = {
    "SCORE_SUM": 1,
    "SCORE_RATIO": 1,
    "SCORE_MEAN": 0,
    "SCORE_MEDIAN": 0,
    "WLE": 3,
    "CODE_COUNT": 1
  };
  public static DerivedMethods = ["EQUALS", "LESS_THAN", "MORE_THAN", "MAX", "MIN"];
  public static AggregatedMethods = ["SUM", "MEAN"];
  public static ItemParameterKeys = ["LOGIT_FULL_CREDIT", "LOGIT_PARTIAL_CREDIT_1", "LOGIT_PARTIAL_CREDIT_2",
    "LOGIT_PARTIAL_CREDIT_3", "WEIGHT"];
}
