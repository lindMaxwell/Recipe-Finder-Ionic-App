export interface RecipeSearchResult {
  id: number;
  title: string;
  image: string;
}


 
 
export interface RecipeSearchResponse {
  results: RecipeSearchResult[];
}


//Ingredient measures returned
 
export interface IngredientMeasures {
  us: {
    amount: number;
    unitLong: string;
  };
  metric: {
    amount: number;
    unitLong: string;
  };
}


//This is one ingredient in the response.
 
export interface RecipeIngredient {
  original: string;
  measures: IngredientMeasures;
}


 //One instruction step from the response.
 
export interface RecipeInstructionStep {
  number: number;
  step: string;
}


export interface RecipeInstructionBlock {
  steps: RecipeInstructionStep[];
}


 //This shows the response


export interface RecipeDetailsResponse {
  id: number;
  title: string;
  image: string;

  extendedIngredients: RecipeIngredient[];

  analyzedInstructions: RecipeInstructionBlock[];
}
