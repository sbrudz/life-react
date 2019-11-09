export type CellLocation = {
  row: number;
  column: number;
};

export type ImmutableGridRow = ReadonlyArray<boolean>;
export type ImmutableGrid = ReadonlyArray<ImmutableGridRow>;
