import {Component, effect, linkedSignal, model} from '@angular/core';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {form, FormField} from '@angular/forms/signals';
import {TranslatePipe} from '@ngx-translate/core';
import {LanguageTaggedTextComponent} from '../multi-use/language-tagged-text.component';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {MatOption, MatSelect} from '@angular/material/select';
import {ScaleConstants} from '../../models/scale.contants';
import {StringArrayComponent} from '../multi-use/string-array.component';

interface ScaleFormModel {
  "id": string,
  "name": LanguageTaggedText,
  "description": LanguageTaggedText,
  "scaleType": string,
  "typeParametersBase": {
    "method": string,
    "methodParameters": string[],
    "items": {
      "id": string,
      "parameters": {
        "key": string,
        "value": string
      }[]
    }[],
    "minItemNumber": number
  },
  "typeParametersDerived": {
    "source": string,
    "publicVocabularyUrl": string,
    "mappings": MappingInDerivedScale[],
    "else": NewValueInDerivedScale
  },
  "typeParametersAggregated": {
    "method": string,
    "sources": {
      "id": string,
      "weight": number
    }[]
  }
}

@Component({
  selector: 'acp-scale',
  imports: [
    MatLabel,
    MatFormField,
    FormField,
    TranslatePipe,
    MatInput,
    LanguageTaggedTextComponent,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatSelect,
    MatOption,
    StringArrayComponent
  ],
  templateUrl: './scale.component.html',
  styleUrl: 'scale.component.scss'
})

export class ScaleComponent {
  readonly scaleData = model.required<Scale>();

  private readonly formModel = linkedSignal({
    source: this.scaleData,
    computation: (domainModel) => {
      let functionReturn = <ScaleFormModel>{
        id: "",
        name: [],
        description: [],
        scaleType: "BASE",
        typeParametersBase: {
          method: "SCORE_SUM",
          methodParameters: [],
          items: [],
          minItemNumber: 0
        },
        typeParametersDerived: {
          source: "",
          publicVocabularyUrl: "",
          mappings: [],
          else: {
            value: 0,
            label: [],
            description: [],
            publicVocabularyEntry: ""
          }
        },
        typeParametersAggregated: {
          method: "SUM",
          sources: []
        }
      }
      if (domainModel && domainModel.scaleType) {
        functionReturn.id = domainModel.id;
        functionReturn.name = domainModel.name;
        functionReturn.description = domainModel.description || [];
        functionReturn.scaleType = domainModel.scaleType;
        if (domainModel.scaleType === "BASE") {
          const domainParameters = domainModel.typeParameters as ScaleParametersBase;
          functionReturn.typeParametersBase.method = domainParameters.method;
          functionReturn.typeParametersBase.methodParameters = domainParameters.methodParameters || [];
          functionReturn.typeParametersBase.items = domainParameters.items;
          functionReturn.typeParametersBase.minItemNumber = domainParameters.minItemNumber || 0;
        } else if (domainModel.scaleType === "DERIVED") {
          const domainParameters = domainModel.typeParameters as ScaleParametersDerived;
          functionReturn.typeParametersDerived.source = domainParameters.source;
          functionReturn.typeParametersDerived.publicVocabularyUrl = domainParameters.publicVocabularyUrl;
          functionReturn.typeParametersDerived.mappings = domainParameters.mappings;
          functionReturn.typeParametersDerived.else = domainParameters.else;
        } else if (domainModel.scaleType === "AGGREGATED") {
          const domainParameters = domainModel.typeParameters as ScaleParametersAggregated;
          functionReturn.typeParametersAggregated.method = domainParameters.method;
          functionReturn.typeParametersAggregated.sources = domainParameters.sources;
        }
      }
      return functionReturn;
    }
  });
  inputForm = form(this.formModel);

  get ScaleConstTypesString() {
    return ScaleConstants.TypesString;
  };

  get ScaleConstBaseMethods() {
    return ScaleConstants.BaseMethods;
  };

  constructor() {
    effect(() => {
      if (this.inputForm().valid()) {
        const scaleType = this.inputForm.scaleType().value();
        if (this.ScaleConstTypesString.includes(scaleType)) {
          let typeParameters: ScaleParametersBase | ScaleParametersDerived | ScaleParametersAggregated;
          if (scaleType === "BASE") {
            typeParameters = <ScaleParametersBase>{
              method: this.inputForm.typeParametersBase.method().value(),
              methodParameters: this.inputForm.typeParametersBase.methodParameters().value(),
              items: this.inputForm.typeParametersBase.items().value(),
              minItemNumber: this.inputForm.typeParametersBase.minItemNumber().value()
            }
          } else if (scaleType === "DERIVED") {
            typeParameters = <ScaleParametersDerived>{
              source: this.inputForm.typeParametersDerived.source().value(),
              publicVocabularyUrl: this.inputForm.typeParametersDerived.publicVocabularyUrl().value(),
              mappings: this.inputForm.typeParametersDerived.mappings().value(),
              else: this.inputForm.typeParametersDerived.else().value()
            }
          } else {
            typeParameters = <ScaleParametersAggregated>{
              method: this.inputForm.typeParametersAggregated.method().value(),
              sources: this.inputForm.typeParametersAggregated.sources().value()
            }
          }
          this.scaleData.set(<Scale>{
            id: this.inputForm.id().value(),
            name: this.inputForm.name().value(),
            description: this.inputForm.description().value(),
            scaleType: scaleType as ScaleType,
            typeParameters: typeParameters
          });
        }
      }
    });
  }

  protected getArrayLength(method: string) {
    if (method) return ScaleConstants.BaseMethodParameterNumber[method] || 0;
    return 0;
  }
}
