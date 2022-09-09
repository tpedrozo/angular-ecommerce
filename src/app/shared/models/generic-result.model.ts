export interface GenericSimpleResult {
  errors: string[];
  success: boolean;
}

export interface GenericResult<TResult> extends GenericSimpleResult {
  result: TResult;
  totalElements: number;
}
