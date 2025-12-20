/* ============================
   SEARCH (Home Page)
   ============================ */

export interface RecipeSearchResponse {
  results: RecipeSearchResult[];
  offset: number;
  number: number;
  totalResults: number;
}

export interface RecipeSearchResult {
  id: number;
  title: string;
  image: string;
  imageType?: string;
}


/* ============================
   RECIPE DETAILS
   ============================ */

export interface RecipeDetailsResponse {
  id: number;
  title: string;
  image: string;

  readyInMinutes?: number;
  servings?: number;
  instructions?: string | null;

  extendedIngredients?: ExtendedIngredient[];
}


/* ============================
   INGREDIENTS
   ============================ */

export interface ExtendedIngredient {
  id?: number;
  name: string;

  // basic values Spoonacular provides
  amount: number;
  unit: string;
  original?: string;

  // Spoonacular also provides measures (metric/us)
  measures?: {
    us: MeasureUnit;
    metric: MeasureUnit;
  };
}

export interface MeasureUnit {
  amount: number;
  unitShort: string;
  unitLong: string;
}

