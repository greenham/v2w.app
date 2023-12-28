export type TRecipeLine = {
  amount?: string;
  unit?: string;
  ingredient?: string;
};

export type TRecipeLineProps = {
  id?: number;
  line?: TRecipeLine;
  isNew?: boolean;
  onLineConverted?: (line: TRecipeLine) => void;
  onLineRemoved?: (id: number) => void;
};

export type TIngredientDensity = {
  name: string;
  g_whole: number | null;
  g_ml: number;
};
