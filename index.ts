export interface WrapperGuid {
  wrapperGuid: string;
}
interface ColumnFlags {
  filterIgnorable?: boolean;
  noSort?: boolean;
  locked?: boolean;
}
const enum SemanticCategory {
  Min = 0,
  Generic = 0,
  PersonFullName = 1,
  Person1stName = 2,
  PersonMiddleName = 3,
  PersonSurname = 4,
  PersonTitle = 5,
  MilitaryRank = 6,
  OccupationPosition = 7,
  GenericPersonAttribute = 8,
  FullPostalAddress = 9,
  ZipCode = 10,
  CountryCitizenship = 11,
  StateProvinceRegion = 12,
  City = 13,
  StreetAddress = 14,
  Email = 15,
  TelephoneNumber = 16,
  SocialSecurityNumber = 17,
  DateofBirth = 18,
  Age = 19,
  EmployerName = 20,
  EmploymentAddress = 21,
  CustomerID = 22,
  ProductID = 23,
  OrganizationFullName = 24,
  OrganizationAbbreviation = 25,
  OrganizationOwnershipType = 26,
  CurrencyCode = 27,
  CurrencyAmount = 28,
  EventDate = 29,
  URL = 30,
  Max = 30
}
export interface ColumnInfo {
  id: number;
  title: string;
  type: string;
  semanticCategory: SemanticCategory;
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
type Value = number | string;
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
export const enum BasicStatAggregationType {
  NDEFINED = "NDEFINED",
  MINIMUM = "MINIMUM",
  MAXIMUM = "MAXIMUM",
  RANGE = "RANGE",
  MEAN = "MEAN",
  STD_DEVIATION = "STD_DEVIATION",
  MEDIAN = "MEDIAN",
  DIFF_VALUES = "DIFF_VALUES",
  MODE = "MODE",
  MODE_COUNT = "MODE_COUNT",
  SUM = "SUM",
  TIME_MIN = "TIME_MIN",
  TIME_MAX = "TIME_MAX"
}
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
const enum FilterAction {
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
const enum SearchMethod {
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
