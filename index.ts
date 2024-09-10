export interface WrapperGuid {
  wrapperGuid: string;
}
interface ColumnFlags {
  filterIgnorable?: boolean;
  noSort?: boolean;
  locked?: boolean;
}
export interface ColumnInfo {
  id: number;
  title: string;
  type: string;
  semanticCategory: string;
  flags: ColumnFlags;
}
interface WrapperFlags {
  statistics?: boolean;
  distinct?: boolean;
  filterRows?: boolean;
  sortRows?: boolean;
}
export interface DatasetInfo {
  rowCount: number;
  flags: WrapperFlags;
  columns: ColumnInfo[];
}
export interface GetValuesParams {
  wrapperGuid: string;
  offset: number;
  rowCount: number;
  columnIndexes?: number[];
  rowIDs?: number[];
  rowIDsOnly?: boolean;
  textLength?: number;
}
export type Value = number | string;
export interface Table {
  rowIDs: string[];
  table?: Value[][];
  textIDs?: Record<number, Record<string, string>>;
}
export interface DistinctParams {
  wrapperGuid: string;
  columnId: number;
  sortByCount?: boolean;
}
export type BasicStatAggregationType = 'NDEFINED' |
  'MINIMUM' |
  'MAXIMUM' |
  'RANGE' |
  'MEAN' |
  'STD_DEVIATION' |
  'MEDIAN' |
  'DIFF_VALUES' |
  'MODE' |
  'MODE_COUNT' |
  'SUM' |
  'TIME_MIN' |
  'TIME_MAX';
export interface BasicStatAggregation {
  value: Value;
  type: BasicStatAggregationType;
}
export interface StatisticsResponse {
  basicStatistics: BasicStatAggregation[];
}
export interface StatisticsParams {
  wrapperGuid: string;
  columnId: number;
}
export interface ColumnSortParams {
  columnId: number;
  columnName: string;
  columnType: string;
  descending: boolean;
}
export interface SortParams {
  wrapperGuid: string;
  columns: ColumnSortParams[];
}
export const enum FilterAction {
  EQUAL = 0,
  NOT_EQUAL = 1,
  LESS = 2,
  LESS_EQUAL = 3,
  GREATER = 4,
  GREATER_EQUAL = 5
}
export interface FilterParams {
  wrapperGuid: string;
  value: number;
  strValue: string;
  day?: number;
  month?: number;
  year?: number;
  action: FilterAction;
  columnId: number;
  columnName: string;
  columnType: string;
  howsearch: number;
  matchCase: boolean;
  useRegEx: boolean;
  usePDL: boolean;
  delta?: number;
}
export const enum SearchMethod {
  SIMPLE = 0,
  WHOLE_WORD = 1,
  WHOLE_TEXT = 2,
  BY_PALONGVALUE = 3
}
interface TargetColumnParams {
  wrapperGuid: string;
  columnId: number;
  columnName: string;
  columnType: string;
}
export interface SearchParams extends TargetColumnParams {
  doubleValue: number;
  delta: number;
  intValue: number | string;
  text: string;
  searchFrom: number;
  day: number;
  month: number;
  year: number;
  searchHow: SearchMethod;
  matchCase: boolean;
  searchUp: boolean;
  useRegex: boolean;
  uniqueId: string;
  wildcard?: boolean;
  ignoreWhiteSpaces?: boolean;
  dotMatchesNewLine?: boolean;
  isSpanCacheEnd?: boolean;
}

export interface SearchResponse {
  foundPosition: number;
}

export interface BinaryContentParams {
  wrapperGuid: string;
  key: string;
  fileName?: string;
}

export interface ApiRequestor {
  wrapperGuid(): Promise<WrapperGuid>;
  info(params: WrapperGuid): Promise<DatasetInfo>;
  abort?(params: WrapperGuid): Promise<void>;
  statistics?(params: StatisticsParams): Promise<StatisticsResponse>;
  sort(params: SortParams): Promise<WrapperGuid>;
  filter(params: FilterParams): Promise<WrapperGuid>;
  search(params: SearchParams): Promise<SearchResponse>;
  values(params: GetValuesParams): Promise<Table>;
  distinct(params: DistinctParams): ApiRequestor;
  getBinaryContent(params: BinaryContentParams): Promise<string>;
}

export interface TConditionNode {
  cond?: TCondition; // by default means TCondition.equal
  borderCond?: TBorderConditions;
  val?: string;
  dVal?: string | number;
  dVal2?: string | number;
  columnName?: string;
  columnFunc?: string;
  op?: TColumnOperation;
  inverse?: boolean;
  pdlQuery?: string;
  srlQuery?: string;
  comment?: string;
  children?: Array<this>;
  cdata?: string;
}

export const enum TCondition {
  equal,
  less,
  more,
  not_equal,
  less_equal,
  more_equal,
  interval,
  func
}

export const enum TBorderConditions {
  not_borders = 0,
  include_low_border = 1,
  include_upper_border = 2,
  include_all = 3
}

export const enum TColumnOperation {
  co_none,
  co_AND,
  co_OR,
  co_term
}

export type FormValueBasic = string | number | boolean;
export type FormValue = FormValueBasic | FormValueBasic[] | undefined;
interface IFormComponent {
  getValue(): FormValue;
  setValue(val: FormValueBasic[]): Promise<void> | void;
  reset(): void;
}

export interface IWidget {
  dispose(): void;
  onUpdateAppearance(): void;
  render(parent: HTMLElement): void;
  updateData(requestor: ApiRequestor): void;
  hasSelection?(): boolean;
  selectByDDExpression?(cond?: TConditionNode, isUserCond?: boolean): void;
  getFormHandler?(): IFormComponent;
  updateApprSchema?(schema: ApprTab[]): Promise<ApprTab[]>
}

export interface WidgetArgs {
  isEditor: boolean;
  setAppearance(appr: Record<string, any>): void;
  getApprValue(key: string): ApprValue | undefined;
  openDrillDown(condition: TConditionNode, optional?: { navigate?: boolean }): void;
}

export type ApprValue = string | number;
export interface ApprCtrl {
  apprKey: string;
  label: string;
  defaultValue?: ApprValue;
  type: string;
  props?: Record<string, any>;
  hidden?: boolean | (() => boolean);
}

export interface ApprTab {
  label: string;
  icon?: string;
  items: ApprCtrl[];
}
