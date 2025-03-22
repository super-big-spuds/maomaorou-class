/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: { input: any; output: any; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  LessonContentDynamicZoneInput: { input: any; output: any; }
  NewContentDynamicZoneInput: { input: any; output: any; }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any; }
};

export type AboutUs = {
  __typename?: 'AboutUs';
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type AboutUsEntity = {
  __typename?: 'AboutUsEntity';
  attributes?: Maybe<AboutUs>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type AboutUsEntityResponse = {
  __typename?: 'AboutUsEntityResponse';
  data?: Maybe<AboutUsEntity>;
};

export type AboutUsInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type BooleanFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  contains?: InputMaybe<Scalars['Boolean']['input']>;
  containsi?: InputMaybe<Scalars['Boolean']['input']>;
  endsWith?: InputMaybe<Scalars['Boolean']['input']>;
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  eqi?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['Boolean']['input']>;
  gte?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  lt?: InputMaybe<Scalars['Boolean']['input']>;
  lte?: InputMaybe<Scalars['Boolean']['input']>;
  ne?: InputMaybe<Scalars['Boolean']['input']>;
  nei?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<BooleanFilterInput>;
  notContains?: InputMaybe<Scalars['Boolean']['input']>;
  notContainsi?: InputMaybe<Scalars['Boolean']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  startsWith?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Category = {
  __typename?: 'Category';
  courses?: Maybe<CourseRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  image: UploadFileEntityResponse;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type CategoryCoursesArgs = {
  filters?: InputMaybe<CourseFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CategoryEntity = {
  __typename?: 'CategoryEntity';
  attributes?: Maybe<Category>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type CategoryEntityResponse = {
  __typename?: 'CategoryEntityResponse';
  data?: Maybe<CategoryEntity>;
};

export type CategoryEntityResponseCollection = {
  __typename?: 'CategoryEntityResponseCollection';
  data: Array<CategoryEntity>;
  meta: ResponseCollectionMeta;
};

export type CategoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<CategoryFiltersInput>>>;
  courses?: InputMaybe<CourseFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<CategoryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CategoryFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type CategoryInput = {
  courses?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  image?: InputMaybe<Scalars['ID']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Chapter = {
  __typename?: 'Chapter';
  course?: Maybe<CourseEntityResponse>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  lessons?: Maybe<LessonRelationResponseCollection>;
  name: Scalars['String']['output'];
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  sequence: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type ChapterLessonsArgs = {
  filters?: InputMaybe<LessonFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ChapterEntity = {
  __typename?: 'ChapterEntity';
  attributes?: Maybe<Chapter>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type ChapterEntityResponse = {
  __typename?: 'ChapterEntityResponse';
  data?: Maybe<ChapterEntity>;
};

export type ChapterEntityResponseCollection = {
  __typename?: 'ChapterEntityResponseCollection';
  data: Array<ChapterEntity>;
  meta: ResponseCollectionMeta;
};

export type ChapterFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ChapterFiltersInput>>>;
  course?: InputMaybe<CourseFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  lessons?: InputMaybe<LessonFiltersInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ChapterFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ChapterFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  sequence?: InputMaybe<IntFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ChapterInput = {
  course?: InputMaybe<Scalars['ID']['input']>;
  lessons?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  sequence?: InputMaybe<Scalars['Int']['input']>;
};

export type ChapterRelationResponseCollection = {
  __typename?: 'ChapterRelationResponseCollection';
  data: Array<ChapterEntity>;
};

export type ComponentBuyOptionBuyOption = {
  __typename?: 'ComponentBuyOptionBuyOption';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Int']['output'];
};

export type ComponentBuyOptionBuyOptionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBuyOptionBuyOptionFiltersInput>>>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentBuyOptionBuyOptionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBuyOptionBuyOptionFiltersInput>>>;
  price?: InputMaybe<IntFilterInput>;
};

export type ComponentBuyOptionBuyOptionInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
};

export type ComponentLessonContentTextContent = {
  __typename?: 'ComponentLessonContentTextContent';
  id: Scalars['ID']['output'];
  richText: Scalars['String']['output'];
};

export type ComponentLessonContentVideoContent = {
  __typename?: 'ComponentLessonContentVideoContent';
  id: Scalars['ID']['output'];
  video: UploadFileEntityResponse;
};

export type ComponentLessonContentYoutubeLesson = {
  __typename?: 'ComponentLessonContentYoutubeLesson';
  id: Scalars['ID']['output'];
  url: Scalars['String']['output'];
};

export type Course = {
  __typename?: 'Course';
  buyOption?: Maybe<Array<Maybe<ComponentBuyOptionBuyOption>>>;
  category?: Maybe<CategoryEntityResponse>;
  chapters?: Maybe<ChapterRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  firstDurationDay: Scalars['Int']['output'];
  firstPrice: Scalars['Int']['output'];
  image: UploadFileEntityResponse;
  isFirstBuy?: Maybe<Scalars['Boolean']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  renewDurationDay: Scalars['Int']['output'];
  renewPrice: Scalars['Int']['output'];
  sequence: Scalars['Int']['output'];
  staredLessons?: Maybe<Array<Maybe<LessonEntityResponse>>>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  withUserStatus?: Maybe<UserCoursesStatusEntityResponse>;
};


export type CourseBuyOptionArgs = {
  filters?: InputMaybe<ComponentBuyOptionBuyOptionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type CourseChaptersArgs = {
  filters?: InputMaybe<ChapterFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CourseEntity = {
  __typename?: 'CourseEntity';
  attributes?: Maybe<Course>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type CourseEntityResponse = {
  __typename?: 'CourseEntityResponse';
  data?: Maybe<CourseEntity>;
};

export type CourseEntityResponseCollection = {
  __typename?: 'CourseEntityResponseCollection';
  data: Array<CourseEntity>;
  meta: ResponseCollectionMeta;
};

export type CourseFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<CourseFiltersInput>>>;
  buyOption?: InputMaybe<ComponentBuyOptionBuyOptionFiltersInput>;
  category?: InputMaybe<CategoryFiltersInput>;
  chapters?: InputMaybe<ChapterFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  firstDurationDay?: InputMaybe<IntFilterInput>;
  firstPrice?: InputMaybe<IntFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<CourseFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CourseFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  renewDurationDay?: InputMaybe<IntFilterInput>;
  renewPrice?: InputMaybe<IntFilterInput>;
  sequence?: InputMaybe<IntFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type CourseInput = {
  buyOption?: InputMaybe<Array<InputMaybe<ComponentBuyOptionBuyOptionInput>>>;
  category?: InputMaybe<Scalars['ID']['input']>;
  chapters?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  firstDurationDay?: InputMaybe<Scalars['Int']['input']>;
  firstPrice?: InputMaybe<Scalars['Int']['input']>;
  image?: InputMaybe<Scalars['ID']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  renewDurationDay?: InputMaybe<Scalars['Int']['input']>;
  renewPrice?: InputMaybe<Scalars['Int']['input']>;
  sequence?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CourseRelationResponseCollection = {
  __typename?: 'CourseRelationResponseCollection';
  data: Array<CourseEntity>;
};

export type CreateOrderWithPaymentInput = {
  courseId: Scalars['String']['input'];
  optionId?: InputMaybe<Scalars['String']['input']>;
};

export type DateFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  contains?: InputMaybe<Scalars['Date']['input']>;
  containsi?: InputMaybe<Scalars['Date']['input']>;
  endsWith?: InputMaybe<Scalars['Date']['input']>;
  eq?: InputMaybe<Scalars['Date']['input']>;
  eqi?: InputMaybe<Scalars['Date']['input']>;
  gt?: InputMaybe<Scalars['Date']['input']>;
  gte?: InputMaybe<Scalars['Date']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  lt?: InputMaybe<Scalars['Date']['input']>;
  lte?: InputMaybe<Scalars['Date']['input']>;
  ne?: InputMaybe<Scalars['Date']['input']>;
  nei?: InputMaybe<Scalars['Date']['input']>;
  not?: InputMaybe<DateFilterInput>;
  notContains?: InputMaybe<Scalars['Date']['input']>;
  notContainsi?: InputMaybe<Scalars['Date']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  startsWith?: InputMaybe<Scalars['Date']['input']>;
};

export type DateTimeFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  contains?: InputMaybe<Scalars['DateTime']['input']>;
  containsi?: InputMaybe<Scalars['DateTime']['input']>;
  endsWith?: InputMaybe<Scalars['DateTime']['input']>;
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  eqi?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  ne?: InputMaybe<Scalars['DateTime']['input']>;
  nei?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<DateTimeFilterInput>;
  notContains?: InputMaybe<Scalars['DateTime']['input']>;
  notContainsi?: InputMaybe<Scalars['DateTime']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  startsWith?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DecorationSetting = {
  __typename?: 'DecorationSetting';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  landingPageBackgroundImage: UploadFileEntityResponse;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type DecorationSettingEntity = {
  __typename?: 'DecorationSettingEntity';
  attributes?: Maybe<DecorationSetting>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type DecorationSettingEntityResponse = {
  __typename?: 'DecorationSettingEntityResponse';
  data?: Maybe<DecorationSettingEntity>;
};

export type DecorationSettingInput = {
  landingPageBackgroundImage?: InputMaybe<Scalars['ID']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export enum Enum_Order_Status {
  Cancelled = 'cancelled',
  Pending = 'pending',
  Success = 'success'
}

export enum Enum_Payment_Status {
  Cancelled = 'cancelled',
  Failed = 'failed',
  Pending = 'pending',
  Success = 'success'
}

export enum Enum_Payment_Transactionservice {
  Newebpay = 'newebpay'
}

export type Error = {
  __typename?: 'Error';
  code: Scalars['String']['output'];
  message?: Maybe<Scalars['String']['output']>;
};

export type Faq = {
  __typename?: 'Faq';
  answer: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  question: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type FaqEntity = {
  __typename?: 'FaqEntity';
  attributes?: Maybe<Faq>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type FaqEntityResponse = {
  __typename?: 'FaqEntityResponse';
  data?: Maybe<FaqEntity>;
};

export type FaqEntityResponseCollection = {
  __typename?: 'FaqEntityResponseCollection';
  data: Array<FaqEntity>;
  meta: ResponseCollectionMeta;
};

export type FaqFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<FaqFiltersInput>>>;
  answer?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<FaqFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<FaqFiltersInput>>>;
  question?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type FaqInput = {
  answer?: InputMaybe<Scalars['String']['input']>;
  question?: InputMaybe<Scalars['String']['input']>;
};

export type FileInfoInput = {
  alternativeText?: InputMaybe<Scalars['String']['input']>;
  caption?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type FloatFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  contains?: InputMaybe<Scalars['Float']['input']>;
  containsi?: InputMaybe<Scalars['Float']['input']>;
  endsWith?: InputMaybe<Scalars['Float']['input']>;
  eq?: InputMaybe<Scalars['Float']['input']>;
  eqi?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  ne?: InputMaybe<Scalars['Float']['input']>;
  nei?: InputMaybe<Scalars['Float']['input']>;
  not?: InputMaybe<FloatFilterInput>;
  notContains?: InputMaybe<Scalars['Float']['input']>;
  notContainsi?: InputMaybe<Scalars['Float']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  startsWith?: InputMaybe<Scalars['Float']['input']>;
};

export type GenericMorph = AboutUs | Category | Chapter | ComponentBuyOptionBuyOption | ComponentLessonContentTextContent | ComponentLessonContentVideoContent | ComponentLessonContentYoutubeLesson | Course | DecorationSetting | Faq | I18NLocale | Lesson | New | Order | OrderCourse | Payment | Term | UploadFile | UploadFolder | UserCoursesStatus | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsUser;

export type I18NLocale = {
  __typename?: 'I18NLocale';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type I18NLocaleEntity = {
  __typename?: 'I18NLocaleEntity';
  attributes?: Maybe<I18NLocale>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type I18NLocaleEntityResponse = {
  __typename?: 'I18NLocaleEntityResponse';
  data?: Maybe<I18NLocaleEntity>;
};

export type I18NLocaleEntityResponseCollection = {
  __typename?: 'I18NLocaleEntityResponseCollection';
  data: Array<I18NLocaleEntity>;
  meta: ResponseCollectionMeta;
};

export type I18NLocaleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  code?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<I18NLocaleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type IdFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  contains?: InputMaybe<Scalars['ID']['input']>;
  containsi?: InputMaybe<Scalars['ID']['input']>;
  endsWith?: InputMaybe<Scalars['ID']['input']>;
  eq?: InputMaybe<Scalars['ID']['input']>;
  eqi?: InputMaybe<Scalars['ID']['input']>;
  gt?: InputMaybe<Scalars['ID']['input']>;
  gte?: InputMaybe<Scalars['ID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  lt?: InputMaybe<Scalars['ID']['input']>;
  lte?: InputMaybe<Scalars['ID']['input']>;
  ne?: InputMaybe<Scalars['ID']['input']>;
  nei?: InputMaybe<Scalars['ID']['input']>;
  not?: InputMaybe<IdFilterInput>;
  notContains?: InputMaybe<Scalars['ID']['input']>;
  notContainsi?: InputMaybe<Scalars['ID']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  startsWith?: InputMaybe<Scalars['ID']['input']>;
};

export type IntFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  contains?: InputMaybe<Scalars['Int']['input']>;
  containsi?: InputMaybe<Scalars['Int']['input']>;
  endsWith?: InputMaybe<Scalars['Int']['input']>;
  eq?: InputMaybe<Scalars['Int']['input']>;
  eqi?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  nei?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<IntFilterInput>;
  notContains?: InputMaybe<Scalars['Int']['input']>;
  notContainsi?: InputMaybe<Scalars['Int']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  startsWith?: InputMaybe<Scalars['Int']['input']>;
};

export type JsonFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  contains?: InputMaybe<Scalars['JSON']['input']>;
  containsi?: InputMaybe<Scalars['JSON']['input']>;
  endsWith?: InputMaybe<Scalars['JSON']['input']>;
  eq?: InputMaybe<Scalars['JSON']['input']>;
  eqi?: InputMaybe<Scalars['JSON']['input']>;
  gt?: InputMaybe<Scalars['JSON']['input']>;
  gte?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  lt?: InputMaybe<Scalars['JSON']['input']>;
  lte?: InputMaybe<Scalars['JSON']['input']>;
  ne?: InputMaybe<Scalars['JSON']['input']>;
  nei?: InputMaybe<Scalars['JSON']['input']>;
  not?: InputMaybe<JsonFilterInput>;
  notContains?: InputMaybe<Scalars['JSON']['input']>;
  notContainsi?: InputMaybe<Scalars['JSON']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  startsWith?: InputMaybe<Scalars['JSON']['input']>;
};

export type Lesson = {
  __typename?: 'Lesson';
  chapter?: Maybe<ChapterEntityResponse>;
  content: Array<Maybe<LessonContentDynamicZone>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  isStar: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  sequence: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type LessonContentDynamicZone = ComponentLessonContentTextContent | ComponentLessonContentVideoContent | ComponentLessonContentYoutubeLesson | Error;

export type LessonEntity = {
  __typename?: 'LessonEntity';
  attributes?: Maybe<Lesson>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type LessonEntityResponse = {
  __typename?: 'LessonEntityResponse';
  data?: Maybe<LessonEntity>;
};

export type LessonEntityResponseCollection = {
  __typename?: 'LessonEntityResponseCollection';
  data: Array<LessonEntity>;
  meta: ResponseCollectionMeta;
};

export type LessonFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<LessonFiltersInput>>>;
  chapter?: InputMaybe<ChapterFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  isStar?: InputMaybe<BooleanFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<LessonFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<LessonFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  sequence?: InputMaybe<IntFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type LessonInput = {
  chapter?: InputMaybe<Scalars['ID']['input']>;
  content?: InputMaybe<Array<Scalars['LessonContentDynamicZoneInput']['input']>>;
  isStar?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  sequence?: InputMaybe<Scalars['Int']['input']>;
};

export type LessonRelationResponseCollection = {
  __typename?: 'LessonRelationResponseCollection';
  data: Array<LessonEntity>;
};

export type Mutation = {
  __typename?: 'Mutation';
  AddZeroPriceCourseToMyCourse?: Maybe<UserCoursesStatusEntityResponse>;
  UpdateSelfUserPassword?: Maybe<UsersPermissionsUserEntityResponse>;
  UpdateSelfUserProfile?: Maybe<UsersPermissionsUserEntityResponse>;
  /** Change user password. Confirm with the current password. */
  changePassword?: Maybe<UsersPermissionsLoginPayload>;
  createCategory?: Maybe<CategoryEntityResponse>;
  createChapter?: Maybe<ChapterEntityResponse>;
  createCourse?: Maybe<CourseEntityResponse>;
  createFaq?: Maybe<FaqEntityResponse>;
  createLesson?: Maybe<LessonEntityResponse>;
  createNew?: Maybe<NewEntityResponse>;
  createOrder?: Maybe<OrderEntityResponse>;
  createOrderCourse?: Maybe<OrderCourseEntityResponse>;
  createOrderWithPayment?: Maybe<CreateOrderWithPaymentResponse>;
  createPayment?: Maybe<PaymentEntityResponse>;
  createUploadFile?: Maybe<UploadFileEntityResponse>;
  createUploadFolder?: Maybe<UploadFolderEntityResponse>;
  createUserCoursesStatus?: Maybe<UserCoursesStatusEntityResponse>;
  /** Create a new role */
  createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>;
  /** Create a new user */
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  deleteAboutUs?: Maybe<AboutUsEntityResponse>;
  deleteCategory?: Maybe<CategoryEntityResponse>;
  deleteChapter?: Maybe<ChapterEntityResponse>;
  deleteCourse?: Maybe<CourseEntityResponse>;
  deleteDecorationSetting?: Maybe<DecorationSettingEntityResponse>;
  deleteFaq?: Maybe<FaqEntityResponse>;
  deleteLesson?: Maybe<LessonEntityResponse>;
  deleteNew?: Maybe<NewEntityResponse>;
  deleteOrder?: Maybe<OrderEntityResponse>;
  deleteOrderCourse?: Maybe<OrderCourseEntityResponse>;
  deletePayment?: Maybe<PaymentEntityResponse>;
  deleteTerm?: Maybe<TermEntityResponse>;
  deleteUploadFile?: Maybe<UploadFileEntityResponse>;
  deleteUploadFolder?: Maybe<UploadFolderEntityResponse>;
  deleteUserCoursesStatus?: Maybe<UserCoursesStatusEntityResponse>;
  /** Delete an existing role */
  deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>;
  /** Delete an existing user */
  deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  /** Confirm an email users email address */
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
  /** Request a reset password token */
  forgotPassword?: Maybe<UsersPermissionsPasswordPayload>;
  login: UsersPermissionsLoginPayload;
  multipleUpload: Array<Maybe<UploadFileEntityResponse>>;
  /** Register a user */
  register: UsersPermissionsLoginPayload;
  removeFile?: Maybe<UploadFileEntityResponse>;
  /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  updateAboutUs?: Maybe<AboutUsEntityResponse>;
  updateCategory?: Maybe<CategoryEntityResponse>;
  updateChapter?: Maybe<ChapterEntityResponse>;
  updateCourse?: Maybe<CourseEntityResponse>;
  updateDecorationSetting?: Maybe<DecorationSettingEntityResponse>;
  updateFaq?: Maybe<FaqEntityResponse>;
  updateFileInfo: UploadFileEntityResponse;
  updateLesson?: Maybe<LessonEntityResponse>;
  updateNew?: Maybe<NewEntityResponse>;
  updateOrder?: Maybe<OrderEntityResponse>;
  updateOrderCourse?: Maybe<OrderCourseEntityResponse>;
  updatePayment?: Maybe<PaymentEntityResponse>;
  updateTerm?: Maybe<TermEntityResponse>;
  updateUploadFile?: Maybe<UploadFileEntityResponse>;
  updateUploadFolder?: Maybe<UploadFolderEntityResponse>;
  updateUserCoursesStatus?: Maybe<UserCoursesStatusEntityResponse>;
  /** Update an existing role */
  updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>;
  /** Update an existing user */
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  upload: UploadFileEntityResponse;
  userDoneHandlePayment?: Maybe<OrderEntityResponse>;
};


export type MutationAddZeroPriceCourseToMyCourseArgs = {
  courseId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationUpdateSelfUserPasswordArgs = {
  userNewPasswordInfo?: InputMaybe<UpdateSelfUserPasswordInput>;
};


export type MutationUpdateSelfUserProfileArgs = {
  userProfile?: InputMaybe<UpdateSelfUserProfileInput>;
};


export type MutationChangePasswordArgs = {
  currentPassword: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
};


export type MutationCreateCategoryArgs = {
  data: CategoryInput;
};


export type MutationCreateChapterArgs = {
  data: ChapterInput;
};


export type MutationCreateCourseArgs = {
  data: CourseInput;
};


export type MutationCreateFaqArgs = {
  data: FaqInput;
};


export type MutationCreateLessonArgs = {
  data: LessonInput;
};


export type MutationCreateNewArgs = {
  data: NewInput;
};


export type MutationCreateOrderArgs = {
  data: OrderInput;
};


export type MutationCreateOrderCourseArgs = {
  data: OrderCourseInput;
};


export type MutationCreateOrderWithPaymentArgs = {
  courses?: InputMaybe<Array<InputMaybe<CreateOrderWithPaymentInput>>>;
};


export type MutationCreatePaymentArgs = {
  data: PaymentInput;
};


export type MutationCreateUploadFileArgs = {
  data: UploadFileInput;
};


export type MutationCreateUploadFolderArgs = {
  data: UploadFolderInput;
};


export type MutationCreateUserCoursesStatusArgs = {
  data: UserCoursesStatusInput;
};


export type MutationCreateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
};


export type MutationCreateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteChapterArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteCourseArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteFaqArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteLessonArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteNewArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteOrderArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteOrderCourseArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeletePaymentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUploadFileArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUploadFolderArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserCoursesStatusArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUsersPermissionsRoleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUsersPermissionsUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationEmailConfirmationArgs = {
  confirmation: Scalars['String']['input'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};


export type MutationMultipleUploadArgs = {
  field?: InputMaybe<Scalars['String']['input']>;
  files: Array<InputMaybe<Scalars['Upload']['input']>>;
  ref?: InputMaybe<Scalars['String']['input']>;
  refId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};


export type MutationRemoveFileArgs = {
  id: Scalars['ID']['input'];
};


export type MutationResetPasswordArgs = {
  code: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
};


export type MutationUpdateAboutUsArgs = {
  data: AboutUsInput;
};


export type MutationUpdateCategoryArgs = {
  data: CategoryInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateChapterArgs = {
  data: ChapterInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateCourseArgs = {
  data: CourseInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateDecorationSettingArgs = {
  data: DecorationSettingInput;
};


export type MutationUpdateFaqArgs = {
  data: FaqInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateFileInfoArgs = {
  id: Scalars['ID']['input'];
  info?: InputMaybe<FileInfoInput>;
};


export type MutationUpdateLessonArgs = {
  data: LessonInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateNewArgs = {
  data: NewInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateOrderArgs = {
  data: OrderInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateOrderCourseArgs = {
  data: OrderCourseInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdatePaymentArgs = {
  data: PaymentInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateTermArgs = {
  data: TermInput;
};


export type MutationUpdateUploadFileArgs = {
  data: UploadFileInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateUploadFolderArgs = {
  data: UploadFolderInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateUserCoursesStatusArgs = {
  data: UserCoursesStatusInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
  id: Scalars['ID']['input'];
};


export type MutationUploadArgs = {
  field?: InputMaybe<Scalars['String']['input']>;
  file: Scalars['Upload']['input'];
  info?: InputMaybe<FileInfoInput>;
  ref?: InputMaybe<Scalars['String']['input']>;
  refId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationUserDoneHandlePaymentArgs = {
  orderId: Scalars['ID']['input'];
};

export type New = {
  __typename?: 'New';
  content: Array<Maybe<NewContentDynamicZone>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  image: UploadFileEntityResponse;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type NewContentDynamicZone = ComponentLessonContentTextContent | ComponentLessonContentVideoContent | ComponentLessonContentYoutubeLesson | Error;

export type NewEntity = {
  __typename?: 'NewEntity';
  attributes?: Maybe<New>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type NewEntityResponse = {
  __typename?: 'NewEntityResponse';
  data?: Maybe<NewEntity>;
};

export type NewEntityResponseCollection = {
  __typename?: 'NewEntityResponseCollection';
  data: Array<NewEntity>;
  meta: ResponseCollectionMeta;
};

export type NewFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<NewFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<NewFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<NewFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type NewInput = {
  content?: InputMaybe<Array<Scalars['NewContentDynamicZoneInput']['input']>>;
  image?: InputMaybe<Scalars['ID']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Order = {
  __typename?: 'Order';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  order_courses?: Maybe<OrderCourseRelationResponseCollection>;
  payments?: Maybe<PaymentRelationResponseCollection>;
  status: Enum_Order_Status;
  totalPrice?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<UsersPermissionsUserEntityResponse>;
};


export type OrderOrder_CoursesArgs = {
  filters?: InputMaybe<OrderCourseFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type OrderPaymentsArgs = {
  filters?: InputMaybe<PaymentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type OrderCourse = {
  __typename?: 'OrderCourse';
  course?: Maybe<CourseEntityResponse>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  durationDay: Scalars['Int']['output'];
  option?: Maybe<Scalars['String']['output']>;
  order?: Maybe<OrderEntityResponse>;
  price: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type OrderCourseEntity = {
  __typename?: 'OrderCourseEntity';
  attributes?: Maybe<OrderCourse>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type OrderCourseEntityResponse = {
  __typename?: 'OrderCourseEntityResponse';
  data?: Maybe<OrderCourseEntity>;
};

export type OrderCourseEntityResponseCollection = {
  __typename?: 'OrderCourseEntityResponseCollection';
  data: Array<OrderCourseEntity>;
  meta: ResponseCollectionMeta;
};

export type OrderCourseFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<OrderCourseFiltersInput>>>;
  course?: InputMaybe<CourseFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  durationDay?: InputMaybe<IntFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<OrderCourseFiltersInput>;
  option?: InputMaybe<StringFilterInput>;
  or?: InputMaybe<Array<InputMaybe<OrderCourseFiltersInput>>>;
  order?: InputMaybe<OrderFiltersInput>;
  price?: InputMaybe<IntFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type OrderCourseInput = {
  course?: InputMaybe<Scalars['ID']['input']>;
  durationDay?: InputMaybe<Scalars['Int']['input']>;
  option?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['ID']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
};

export type OrderCourseRelationResponseCollection = {
  __typename?: 'OrderCourseRelationResponseCollection';
  data: Array<OrderCourseEntity>;
};

export type OrderEntity = {
  __typename?: 'OrderEntity';
  attributes?: Maybe<Order>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type OrderEntityResponse = {
  __typename?: 'OrderEntityResponse';
  data?: Maybe<OrderEntity>;
};

export type OrderEntityResponseCollection = {
  __typename?: 'OrderEntityResponseCollection';
  data: Array<OrderEntity>;
  meta: ResponseCollectionMeta;
};

export type OrderFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<OrderFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<OrderFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<OrderFiltersInput>>>;
  order_courses?: InputMaybe<OrderCourseFiltersInput>;
  payments?: InputMaybe<PaymentFiltersInput>;
  status?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  user?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type OrderInput = {
  order_courses?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  payments?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  status?: InputMaybe<Enum_Order_Status>;
  user?: InputMaybe<Scalars['ID']['input']>;
};

export type OrderRelationResponseCollection = {
  __typename?: 'OrderRelationResponseCollection';
  data: Array<OrderEntity>;
};

export type Pagination = {
  __typename?: 'Pagination';
  page: Scalars['Int']['output'];
  pageCount: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type PaginationArg = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
};

export type Payment = {
  __typename?: 'Payment';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  order?: Maybe<OrderEntityResponse>;
  status: Enum_Payment_Status;
  transactionId?: Maybe<Scalars['String']['output']>;
  transactionService: Enum_Payment_Transactionservice;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type PaymentEntity = {
  __typename?: 'PaymentEntity';
  attributes?: Maybe<Payment>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type PaymentEntityResponse = {
  __typename?: 'PaymentEntityResponse';
  data?: Maybe<PaymentEntity>;
};

export type PaymentEntityResponseCollection = {
  __typename?: 'PaymentEntityResponseCollection';
  data: Array<PaymentEntity>;
  meta: ResponseCollectionMeta;
};

export type PaymentFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<PaymentFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<PaymentFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<PaymentFiltersInput>>>;
  order?: InputMaybe<OrderFiltersInput>;
  status?: InputMaybe<StringFilterInput>;
  transactionId?: InputMaybe<StringFilterInput>;
  transactionService?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type PaymentInput = {
  order?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<Enum_Payment_Status>;
  transactionId?: InputMaybe<Scalars['String']['input']>;
  transactionService?: InputMaybe<Enum_Payment_Transactionservice>;
};

export type PaymentRelationResponseCollection = {
  __typename?: 'PaymentRelationResponseCollection';
  data: Array<PaymentEntity>;
};

export enum PublicationState {
  Live = 'LIVE',
  Preview = 'PREVIEW'
}

export type Query = {
  __typename?: 'Query';
  aboutUs?: Maybe<AboutUsEntityResponse>;
  buyedCourses?: Maybe<Array<Maybe<CourseEntityResponse>>>;
  categories?: Maybe<CategoryEntityResponseCollection>;
  category?: Maybe<CategoryEntityResponse>;
  chapter?: Maybe<ChapterEntityResponse>;
  chapters?: Maybe<ChapterEntityResponseCollection>;
  course?: Maybe<CourseEntityResponse>;
  courseByTitle?: Maybe<CourseEntityResponse>;
  courses?: Maybe<CourseEntityResponseCollection>;
  decorationSetting?: Maybe<DecorationSettingEntityResponse>;
  faq?: Maybe<FaqEntityResponse>;
  faqs?: Maybe<FaqEntityResponseCollection>;
  i18NLocale?: Maybe<I18NLocaleEntityResponse>;
  i18NLocales?: Maybe<I18NLocaleEntityResponseCollection>;
  lesson?: Maybe<LessonEntityResponse>;
  lessons?: Maybe<LessonEntityResponseCollection>;
  me?: Maybe<UsersPermissionsMe>;
  myLesson?: Maybe<LessonEntityResponse>;
  myOrder?: Maybe<OrderEntityResponse>;
  myOrders?: Maybe<Array<Maybe<OrderEntityResponse>>>;
  new?: Maybe<NewEntityResponse>;
  newByTitle?: Maybe<NewEntityResponse>;
  news?: Maybe<NewEntityResponseCollection>;
  order?: Maybe<OrderEntityResponse>;
  orderCourse?: Maybe<OrderCourseEntityResponse>;
  orderCourses?: Maybe<OrderCourseEntityResponseCollection>;
  orders?: Maybe<OrderEntityResponseCollection>;
  payment?: Maybe<PaymentEntityResponse>;
  payments?: Maybe<PaymentEntityResponseCollection>;
  term?: Maybe<TermEntityResponse>;
  uploadFile?: Maybe<UploadFileEntityResponse>;
  uploadFiles?: Maybe<UploadFileEntityResponseCollection>;
  uploadFolder?: Maybe<UploadFolderEntityResponse>;
  uploadFolders?: Maybe<UploadFolderEntityResponseCollection>;
  userCoursesStatus?: Maybe<UserCoursesStatusEntityResponse>;
  userCoursesStatuses?: Maybe<UserCoursesStatusEntityResponseCollection>;
  usersPermissionsRole?: Maybe<UsersPermissionsRoleEntityResponse>;
  usersPermissionsRoles?: Maybe<UsersPermissionsRoleEntityResponseCollection>;
  usersPermissionsUser?: Maybe<UsersPermissionsUserEntityResponse>;
  usersPermissionsUsers?: Maybe<UsersPermissionsUserEntityResponseCollection>;
};


export type QueryAboutUsArgs = {
  publicationState?: InputMaybe<PublicationState>;
};


export type QueryCategoriesArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryCategoryArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryChapterArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryChaptersArgs = {
  filters?: InputMaybe<ChapterFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryCourseArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryCourseByTitleArgs = {
  title: Scalars['String']['input'];
};


export type QueryCoursesArgs = {
  filters?: InputMaybe<CourseFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryDecorationSettingArgs = {
  publicationState?: InputMaybe<PublicationState>;
};


export type QueryFaqArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryFaqsArgs = {
  filters?: InputMaybe<FaqFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryI18NLocaleArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryI18NLocalesArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryLessonArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryLessonsArgs = {
  filters?: InputMaybe<LessonFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryMyLessonArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMyOrderArgs = {
  orderId: Scalars['ID']['input'];
};


export type QueryNewArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryNewByTitleArgs = {
  title: Scalars['String']['input'];
};


export type QueryNewsArgs = {
  filters?: InputMaybe<NewFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryOrderArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryOrderCourseArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryOrderCoursesArgs = {
  filters?: InputMaybe<OrderCourseFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryOrdersArgs = {
  filters?: InputMaybe<OrderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryPaymentArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryPaymentsArgs = {
  filters?: InputMaybe<PaymentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryTermArgs = {
  publicationState?: InputMaybe<PublicationState>;
};


export type QueryUploadFileArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryUploadFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryUploadFolderArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryUploadFoldersArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryUserCoursesStatusArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryUserCoursesStatusesArgs = {
  filters?: InputMaybe<UserCoursesStatusFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryUsersPermissionsRoleArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryUsersPermissionsRolesArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryUsersPermissionsUserArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryUsersPermissionsUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ResponseCollectionMeta = {
  __typename?: 'ResponseCollectionMeta';
  pagination: Pagination;
};

export type StringFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  containsi?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  eqi?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  nei?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<StringFilterInput>;
  notContains?: InputMaybe<Scalars['String']['input']>;
  notContainsi?: InputMaybe<Scalars['String']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Term = {
  __typename?: 'Term';
  content: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TermEntity = {
  __typename?: 'TermEntity';
  attributes?: Maybe<Term>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type TermEntityResponse = {
  __typename?: 'TermEntityResponse';
  data?: Maybe<TermEntity>;
};

export type TermInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateSelfUserPasswordInput = {
  newPassword: Scalars['String']['input'];
  originalPassword: Scalars['String']['input'];
};

export type UpdateSelfUserProfileInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UploadFile = {
  __typename?: 'UploadFile';
  alternativeText?: Maybe<Scalars['String']['output']>;
  caption?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  ext?: Maybe<Scalars['String']['output']>;
  formats?: Maybe<Scalars['JSON']['output']>;
  hash: Scalars['String']['output'];
  height?: Maybe<Scalars['Int']['output']>;
  mime: Scalars['String']['output'];
  name: Scalars['String']['output'];
  previewUrl?: Maybe<Scalars['String']['output']>;
  provider: Scalars['String']['output'];
  provider_metadata?: Maybe<Scalars['JSON']['output']>;
  related?: Maybe<Array<Maybe<GenericMorph>>>;
  size: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  url: Scalars['String']['output'];
  width?: Maybe<Scalars['Int']['output']>;
};

export type UploadFileEntity = {
  __typename?: 'UploadFileEntity';
  attributes?: Maybe<UploadFile>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type UploadFileEntityResponse = {
  __typename?: 'UploadFileEntityResponse';
  data?: Maybe<UploadFileEntity>;
};

export type UploadFileEntityResponseCollection = {
  __typename?: 'UploadFileEntityResponseCollection';
  data: Array<UploadFileEntity>;
  meta: ResponseCollectionMeta;
};

export type UploadFileFiltersInput = {
  alternativeText?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  caption?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  ext?: InputMaybe<StringFilterInput>;
  folder?: InputMaybe<UploadFolderFiltersInput>;
  folderPath?: InputMaybe<StringFilterInput>;
  formats?: InputMaybe<JsonFilterInput>;
  hash?: InputMaybe<StringFilterInput>;
  height?: InputMaybe<IntFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  mime?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFileFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  previewUrl?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  provider_metadata?: InputMaybe<JsonFilterInput>;
  size?: InputMaybe<FloatFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  url?: InputMaybe<StringFilterInput>;
  width?: InputMaybe<IntFilterInput>;
};

export type UploadFileInput = {
  alternativeText?: InputMaybe<Scalars['String']['input']>;
  caption?: InputMaybe<Scalars['String']['input']>;
  ext?: InputMaybe<Scalars['String']['input']>;
  folder?: InputMaybe<Scalars['ID']['input']>;
  folderPath?: InputMaybe<Scalars['String']['input']>;
  formats?: InputMaybe<Scalars['JSON']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Int']['input']>;
  mime?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  previewUrl?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  provider_metadata?: InputMaybe<Scalars['JSON']['input']>;
  size?: InputMaybe<Scalars['Float']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
};

export type UploadFileRelationResponseCollection = {
  __typename?: 'UploadFileRelationResponseCollection';
  data: Array<UploadFileEntity>;
};

export type UploadFolder = {
  __typename?: 'UploadFolder';
  children?: Maybe<UploadFolderRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  files?: Maybe<UploadFileRelationResponseCollection>;
  name: Scalars['String']['output'];
  parent?: Maybe<UploadFolderEntityResponse>;
  path: Scalars['String']['output'];
  pathId: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type UploadFolderChildrenArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type UploadFolderFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UploadFolderEntity = {
  __typename?: 'UploadFolderEntity';
  attributes?: Maybe<UploadFolder>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type UploadFolderEntityResponse = {
  __typename?: 'UploadFolderEntityResponse';
  data?: Maybe<UploadFolderEntity>;
};

export type UploadFolderEntityResponseCollection = {
  __typename?: 'UploadFolderEntityResponseCollection';
  data: Array<UploadFolderEntity>;
  meta: ResponseCollectionMeta;
};

export type UploadFolderFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
  children?: InputMaybe<UploadFolderFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  files?: InputMaybe<UploadFileFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFolderFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
  parent?: InputMaybe<UploadFolderFiltersInput>;
  path?: InputMaybe<StringFilterInput>;
  pathId?: InputMaybe<IntFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UploadFolderInput = {
  children?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  files?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<Scalars['ID']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
  pathId?: InputMaybe<Scalars['Int']['input']>;
};

export type UploadFolderRelationResponseCollection = {
  __typename?: 'UploadFolderRelationResponseCollection';
  data: Array<UploadFolderEntity>;
};

export type UserCoursesStatus = {
  __typename?: 'UserCoursesStatus';
  course?: Maybe<CourseEntityResponse>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  expiredAt: Scalars['Date']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<UsersPermissionsUserEntityResponse>;
};

export type UserCoursesStatusEntity = {
  __typename?: 'UserCoursesStatusEntity';
  attributes?: Maybe<UserCoursesStatus>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type UserCoursesStatusEntityResponse = {
  __typename?: 'UserCoursesStatusEntityResponse';
  data?: Maybe<UserCoursesStatusEntity>;
};

export type UserCoursesStatusEntityResponseCollection = {
  __typename?: 'UserCoursesStatusEntityResponseCollection';
  data: Array<UserCoursesStatusEntity>;
  meta: ResponseCollectionMeta;
};

export type UserCoursesStatusFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UserCoursesStatusFiltersInput>>>;
  course?: InputMaybe<CourseFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  expiredAt?: InputMaybe<DateFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UserCoursesStatusFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UserCoursesStatusFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  user?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type UserCoursesStatusInput = {
  course?: InputMaybe<Scalars['ID']['input']>;
  expiredAt?: InputMaybe<Scalars['Date']['input']>;
  user?: InputMaybe<Scalars['ID']['input']>;
};

export type UsersPermissionsCreateRolePayload = {
  __typename?: 'UsersPermissionsCreateRolePayload';
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsDeleteRolePayload = {
  __typename?: 'UsersPermissionsDeleteRolePayload';
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars['String']['input'];
  password: Scalars['String']['input'];
  provider?: Scalars['String']['input'];
};

export type UsersPermissionsLoginPayload = {
  __typename?: 'UsersPermissionsLoginPayload';
  jwt?: Maybe<Scalars['String']['output']>;
  user: UsersPermissionsMe;
};

export type UsersPermissionsMe = {
  __typename?: 'UsersPermissionsMe';
  blocked?: Maybe<Scalars['Boolean']['output']>;
  confirmed?: Maybe<Scalars['Boolean']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  role?: Maybe<UsersPermissionsMeRole>;
  username: Scalars['String']['output'];
};

export type UsersPermissionsMeRole = {
  __typename?: 'UsersPermissionsMeRole';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  type?: Maybe<Scalars['String']['output']>;
};

export type UsersPermissionsPasswordPayload = {
  __typename?: 'UsersPermissionsPasswordPayload';
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsPermission = {
  __typename?: 'UsersPermissionsPermission';
  action: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UsersPermissionsPermissionEntity = {
  __typename?: 'UsersPermissionsPermissionEntity';
  attributes?: Maybe<UsersPermissionsPermission>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type UsersPermissionsPermissionFiltersInput = {
  action?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UsersPermissionsPermissionRelationResponseCollection = {
  __typename?: 'UsersPermissionsPermissionRelationResponseCollection';
  data: Array<UsersPermissionsPermissionEntity>;
};

export type UsersPermissionsRegisterInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UsersPermissionsRole = {
  __typename?: 'UsersPermissionsRole';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  permissions?: Maybe<UsersPermissionsPermissionRelationResponseCollection>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  users?: Maybe<UsersPermissionsUserRelationResponseCollection>;
};


export type UsersPermissionsRolePermissionsArgs = {
  filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type UsersPermissionsRoleUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UsersPermissionsRoleEntity = {
  __typename?: 'UsersPermissionsRoleEntity';
  attributes?: Maybe<UsersPermissionsRole>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type UsersPermissionsRoleEntityResponse = {
  __typename?: 'UsersPermissionsRoleEntityResponse';
  data?: Maybe<UsersPermissionsRoleEntity>;
};

export type UsersPermissionsRoleEntityResponseCollection = {
  __typename?: 'UsersPermissionsRoleEntityResponseCollection';
  data: Array<UsersPermissionsRoleEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsRoleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  permissions?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  users?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type UsersPermissionsRoleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  permissions?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  type?: InputMaybe<Scalars['String']['input']>;
  users?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type UsersPermissionsUpdateRolePayload = {
  __typename?: 'UsersPermissionsUpdateRolePayload';
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsUser = {
  __typename?: 'UsersPermissionsUser';
  blocked?: Maybe<Scalars['Boolean']['output']>;
  confirmed?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  orders?: Maybe<OrderRelationResponseCollection>;
  provider?: Maybe<Scalars['String']['output']>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  username: Scalars['String']['output'];
};


export type UsersPermissionsUserOrdersArgs = {
  filters?: InputMaybe<OrderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UsersPermissionsUserEntity = {
  __typename?: 'UsersPermissionsUserEntity';
  attributes?: Maybe<UsersPermissionsUser>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type UsersPermissionsUserEntityResponse = {
  __typename?: 'UsersPermissionsUserEntityResponse';
  data?: Maybe<UsersPermissionsUserEntity>;
};

export type UsersPermissionsUserEntityResponseCollection = {
  __typename?: 'UsersPermissionsUserEntityResponseCollection';
  data: Array<UsersPermissionsUserEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsUserFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  blocked?: InputMaybe<BooleanFilterInput>;
  confirmationToken?: InputMaybe<StringFilterInput>;
  confirmed?: InputMaybe<BooleanFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsUserFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  orders?: InputMaybe<OrderFiltersInput>;
  password?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  resetPasswordToken?: InputMaybe<StringFilterInput>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  username?: InputMaybe<StringFilterInput>;
};

export type UsersPermissionsUserInput = {
  blocked?: InputMaybe<Scalars['Boolean']['input']>;
  confirmationToken?: InputMaybe<Scalars['String']['input']>;
  confirmed?: InputMaybe<Scalars['Boolean']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  orders?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  password?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  resetPasswordToken?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['ID']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UsersPermissionsUserRelationResponseCollection = {
  __typename?: 'UsersPermissionsUserRelationResponseCollection';
  data: Array<UsersPermissionsUserEntity>;
};

export type CreateOrderWithPaymentResponse = {
  __typename?: 'createOrderWithPaymentResponse';
  error?: Maybe<Scalars['String']['output']>;
  orderId?: Maybe<Scalars['ID']['output']>;
  paymentUrl?: Maybe<Scalars['String']['output']>;
};

export type UpdateProfileDataMutationVariables = Exact<{
  userProfile?: InputMaybe<UpdateSelfUserProfileInput>;
}>;


export type UpdateProfileDataMutation = { __typename?: 'Mutation', UpdateSelfUserProfile?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null, attributes?: { __typename?: 'UsersPermissionsUser', username: string, email: string } | null } | null } | null };

export type UpdateUserPasswordMutationVariables = Exact<{
  data?: InputMaybe<UpdateSelfUserPasswordInput>;
}>;


export type UpdateUserPasswordMutation = { __typename?: 'Mutation', UpdateSelfUserPassword?: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', id?: string | null } | null } | null };

export type GetMyOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyOrdersQuery = { __typename?: 'Query', myOrders?: Array<{ __typename?: 'OrderEntityResponse', data?: { __typename?: 'OrderEntity', id?: string | null, attributes?: { __typename?: 'Order', status: Enum_Order_Status, createdAt?: any | null, totalPrice?: number | null } | null } | null } | null> | null };

export type GetAboutusQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAboutusQuery = { __typename?: 'Query', aboutUs?: { __typename?: 'AboutUsEntityResponse', data?: { __typename?: 'AboutUsEntity', id?: string | null, attributes?: { __typename?: 'AboutUs', content?: string | null, updatedAt?: any | null } | null } | null } | null };

export type GetArticleContentQueryVariables = Exact<{
  title: Scalars['String']['input'];
}>;


export type GetArticleContentQuery = { __typename?: 'Query', newByTitle?: { __typename?: 'NewEntityResponse', data?: { __typename?: 'NewEntity', id?: string | null, attributes?: { __typename?: 'New', title: string, updatedAt?: any | null, content: Array<{ __typename: 'ComponentLessonContentTextContent', richText: string } | { __typename: 'ComponentLessonContentVideoContent', video: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } } | { __typename: 'ComponentLessonContentYoutubeLesson', url: string } | { __typename: 'Error' } | null> } | null } | null } | null };

export type GetCategoryDataQueryVariables = Exact<{
  categoryId: Scalars['ID']['input'];
}>;


export type GetCategoryDataQuery = { __typename?: 'Query', category?: { __typename?: 'CategoryEntityResponse', data?: { __typename?: 'CategoryEntity', attributes?: { __typename?: 'Category', courses?: { __typename?: 'CourseRelationResponseCollection', data: Array<{ __typename?: 'CourseEntity', attributes?: { __typename?: 'Course', title: string, image: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } } | null }> } | null } | null } | null } | null };

export type GetCoursesQueryDataQueryVariables = Exact<{
  courseIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>> | InputMaybe<Scalars['ID']['input']>>;
}>;


export type GetCoursesQueryDataQuery = { __typename?: 'Query', courses?: { __typename?: 'CourseEntityResponseCollection', data: Array<{ __typename?: 'CourseEntity', id?: string | null, attributes?: { __typename?: 'Course', title: string, firstPrice: number, renewPrice: number, isFirstBuy?: boolean | null, buyOption?: Array<{ __typename?: 'ComponentBuyOptionBuyOption', id: string, name: string, price: number } | null> | null, image: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string } | null } | null } } | null }> } | null };

export type RegisterUserMutationVariables = Exact<{
  userData: UsersPermissionsRegisterInput;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', register: { __typename?: 'UsersPermissionsLoginPayload', jwt?: string | null } };

export type CreateOrderWithPaymentMutationVariables = Exact<{
  courses?: InputMaybe<Array<CreateOrderWithPaymentInput> | CreateOrderWithPaymentInput>;
}>;


export type CreateOrderWithPaymentMutation = { __typename?: 'Mutation', createOrderWithPayment?: { __typename?: 'createOrderWithPaymentResponse', paymentUrl?: string | null, orderId?: string | null, error?: string | null } | null };

export type GetCourseQueryDataQueryVariables = Exact<{
  title: Scalars['String']['input'];
}>;


export type GetCourseQueryDataQuery = { __typename?: 'Query', courseByTitle?: { __typename?: 'CourseEntityResponse', data?: { __typename?: 'CourseEntity', id?: string | null, attributes?: { __typename?: 'Course', title: string, description: string, firstPrice: number, renewPrice: number, firstDurationDay: number, renewDurationDay: number, updatedAt?: any | null, buyOption?: Array<{ __typename?: 'ComponentBuyOptionBuyOption', id: string, name: string, price: number } | null> | null, chapters?: { __typename?: 'ChapterRelationResponseCollection', data: Array<{ __typename?: 'ChapterEntity', id?: string | null, attributes?: { __typename?: 'Chapter', name: string, sequence: number, lessons?: { __typename?: 'LessonRelationResponseCollection', data: Array<{ __typename?: 'LessonEntity', id?: string | null, attributes?: { __typename?: 'Lesson', name: string, sequence: number } | null }> } | null } | null }> } | null, image: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string } | null } | null } } | null } | null } | null };

export type GetFaqQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFaqQuery = { __typename?: 'Query', faqs?: { __typename?: 'FaqEntityResponseCollection', data: Array<{ __typename?: 'FaqEntity', id?: string | null, attributes?: { __typename?: 'Faq', question: string, answer: string } | null }> } | null };

export type GetLearningCourseDataQueryVariables = Exact<{
  title: Scalars['String']['input'];
}>;


export type GetLearningCourseDataQuery = { __typename?: 'Query', courseByTitle?: { __typename?: 'CourseEntityResponse', data?: { __typename?: 'CourseEntity', id?: string | null, attributes?: { __typename?: 'Course', title: string, description: string, updatedAt?: any | null, chapters?: { __typename?: 'ChapterRelationResponseCollection', data: Array<{ __typename?: 'ChapterEntity', id?: string | null, attributes?: { __typename?: 'Chapter', name: string, sequence: number, lessons?: { __typename?: 'LessonRelationResponseCollection', data: Array<{ __typename?: 'LessonEntity', id?: string | null, attributes?: { __typename?: 'Lesson', name: string, sequence: number, content: Array<{ __typename: 'ComponentLessonContentTextContent' } | { __typename: 'ComponentLessonContentVideoContent' } | { __typename: 'ComponentLessonContentYoutubeLesson' } | { __typename: 'Error' } | null> } | null }> } | null } | null }> } | null, image: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string } | null } | null } } | null } | null } | null };

export type GetMyLessonQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetMyLessonQuery = { __typename?: 'Query', myLesson?: { __typename?: 'LessonEntityResponse', data?: { __typename?: 'LessonEntity', id?: string | null, attributes?: { __typename?: 'Lesson', name: string, sequence: number, updatedAt?: any | null, content: Array<{ __typename: 'ComponentLessonContentTextContent', richText: string } | { __typename: 'ComponentLessonContentVideoContent', video: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } } | { __typename: 'ComponentLessonContentYoutubeLesson', url: string } | { __typename: 'Error' } | null> } | null } | null } | null };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UsersPermissionsLoginPayload', jwt?: string | null } };

export type ResetPasswordWithCodeMutationVariables = Exact<{
  password: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
  code: Scalars['String']['input'];
}>;


export type ResetPasswordWithCodeMutation = { __typename?: 'Mutation', resetPassword?: { __typename?: 'UsersPermissionsLoginPayload', user: { __typename?: 'UsersPermissionsMe', username: string } } | null };

export type SendForgetPasswordEmailMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type SendForgetPasswordEmailMutation = { __typename?: 'Mutation', forgotPassword?: { __typename?: 'UsersPermissionsPasswordPayload', ok: boolean } | null };

export type GetBuyedCoursesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBuyedCoursesQuery = { __typename?: 'Query', buyedCourses?: Array<{ __typename?: 'CourseEntityResponse', data?: { __typename?: 'CourseEntity', id?: string | null, attributes?: { __typename?: 'Course', title: string, staredLessons?: Array<{ __typename?: 'LessonEntityResponse', data?: { __typename?: 'LessonEntity', id?: string | null, attributes?: { __typename?: 'Lesson', name: string, content: Array<{ __typename: 'ComponentLessonContentTextContent' } | { __typename: 'ComponentLessonContentVideoContent' } | { __typename: 'ComponentLessonContentYoutubeLesson' } | { __typename: 'Error' } | null> } | null } | null } | null> | null, withUserStatus?: { __typename?: 'UserCoursesStatusEntityResponse', data?: { __typename?: 'UserCoursesStatusEntity', attributes?: { __typename?: 'UserCoursesStatus', expiredAt: any } | null } | null } | null, image: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string } | null } | null } } | null } | null } | null> | null };

export type GetOrderDataQueryVariables = Exact<{
  orderId: Scalars['ID']['input'];
}>;


export type GetOrderDataQuery = { __typename?: 'Query', myOrder?: { __typename?: 'OrderEntityResponse', data?: { __typename?: 'OrderEntity', id?: string | null, attributes?: { __typename?: 'Order', status: Enum_Order_Status, createdAt?: any | null, totalPrice?: number | null, order_courses?: { __typename?: 'OrderCourseRelationResponseCollection', data: Array<{ __typename?: 'OrderCourseEntity', id?: string | null, attributes?: { __typename?: 'OrderCourse', price: number, course?: { __typename?: 'CourseEntityResponse', data?: { __typename?: 'CourseEntity', attributes?: { __typename?: 'Course', title: string, image: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } } | null } | null } | null } | null }> } | null } | null } | null } | null };

export type ConfirmPaymentMutationVariables = Exact<{
  orderId: Scalars['ID']['input'];
}>;


export type ConfirmPaymentMutation = { __typename?: 'Mutation', userDoneHandlePayment?: { __typename?: 'OrderEntityResponse', data?: { __typename?: 'OrderEntity', id?: string | null } | null } | null };

export type GetMainPageQueryDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMainPageQueryDataQuery = { __typename?: 'Query', courses?: { __typename?: 'CourseEntityResponseCollection', data: Array<{ __typename?: 'CourseEntity', id?: string | null, attributes?: { __typename?: 'Course', title: string, sequence: number, category?: { __typename?: 'CategoryEntityResponse', data?: { __typename?: 'CategoryEntity', id?: string | null, attributes?: { __typename?: 'Category', image: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string } | null } | null } } | null } | null } | null, image: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string } | null } | null } } | null }> } | null, decorationSetting?: { __typename?: 'DecorationSettingEntityResponse', data?: { __typename?: 'DecorationSettingEntity', id?: string | null, attributes?: { __typename?: 'DecorationSetting', landingPageBackgroundImage: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } } | null } | null } | null, news?: { __typename?: 'NewEntityResponseCollection', data: Array<{ __typename?: 'NewEntity', id?: string | null, attributes?: { __typename?: 'New', title: string, createdAt?: any | null, image: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string } | null } | null } } | null }> } | null };

export type RegisterMutationVariables = Exact<{
  username: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UsersPermissionsLoginPayload', jwt?: string | null } };

export type GetTermQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTermQuery = { __typename?: 'Query', term?: { __typename?: 'TermEntityResponse', data?: { __typename?: 'TermEntity', id?: string | null, attributes?: { __typename?: 'Term', content: string, updatedAt?: any | null } | null } | null } | null };

export type GetIsUserFirstBuyAndPriceQueryVariables = Exact<{
  courseId: Scalars['ID']['input'];
}>;


export type GetIsUserFirstBuyAndPriceQuery = { __typename?: 'Query', course?: { __typename?: 'CourseEntityResponse', data?: { __typename?: 'CourseEntity', id?: string | null, attributes?: { __typename?: 'Course', isFirstBuy?: boolean | null } | null } | null } | null };

export type AddZeroPriceCourseMutationVariables = Exact<{
  courseId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type AddZeroPriceCourseMutation = { __typename?: 'Mutation', AddZeroPriceCourseToMyCourse?: { __typename?: 'UserCoursesStatusEntityResponse', data?: { __typename?: 'UserCoursesStatusEntity', id?: string | null } | null } | null };

export type GetUserCoursesStatusQueryVariables = Exact<{
  courseIds?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
}>;


export type GetUserCoursesStatusQuery = { __typename?: 'Query', courses?: { __typename?: 'CourseEntityResponseCollection', data: Array<{ __typename?: 'CourseEntity', attributes?: { __typename?: 'Course', withUserStatus?: { __typename?: 'UserCoursesStatusEntityResponse', data?: { __typename?: 'UserCoursesStatusEntity', attributes?: { __typename?: 'UserCoursesStatus', expiredAt: any, course?: { __typename?: 'CourseEntityResponse', data?: { __typename?: 'CourseEntity', id?: string | null } | null } | null } | null } | null } | null } | null }> } | null };

export type GetUserCourseStatusQueryVariables = Exact<{
  courseId: Scalars['ID']['input'];
}>;


export type GetUserCourseStatusQuery = { __typename?: 'Query', course?: { __typename?: 'CourseEntityResponse', data?: { __typename?: 'CourseEntity', attributes?: { __typename?: 'Course', withUserStatus?: { __typename?: 'UserCoursesStatusEntityResponse', data?: { __typename?: 'UserCoursesStatusEntity', attributes?: { __typename?: 'UserCoursesStatus', expiredAt: any } | null } | null } | null } | null } | null } | null };

export type GetUserProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserProfileQuery = { __typename?: 'Query', me?: { __typename?: 'UsersPermissionsMe', id: string, username: string, email?: string | null } | null };


export const UpdateProfileDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateProfileData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userProfile"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateSelfUserProfileInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UpdateSelfUserProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userProfile"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userProfile"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateProfileDataMutation, UpdateProfileDataMutationVariables>;
export const UpdateUserPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateUserPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateSelfUserPasswordInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UpdateSelfUserPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userNewPasswordInfo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>;
export const GetMyOrdersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMyOrders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myOrders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetMyOrdersQuery, GetMyOrdersQueryVariables>;
export const GetAboutusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAboutus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aboutUs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAboutusQuery, GetAboutusQueryVariables>;
export const GetArticleContentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getArticleContent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newByTitle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentLessonContentVideoContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentLessonContentTextContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"richText"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentLessonContentYoutubeLesson"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetArticleContentQuery, GetArticleContentQueryVariables>;
export const GetCategoryDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCategoryData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"courses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetCategoryDataQuery, GetCategoryDataQueryVariables>;
export const GetCoursesQueryDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCoursesQueryData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"courseIds"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"courses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"courseIds"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"firstPrice"}},{"kind":"Field","name":{"kind":"Name","value":"renewPrice"}},{"kind":"Field","name":{"kind":"Name","value":"isFirstBuy"}},{"kind":"Field","name":{"kind":"Name","value":"buyOption"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetCoursesQueryDataQuery, GetCoursesQueryDataQueryVariables>;
export const RegisterUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"registerUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userData"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UsersPermissionsRegisterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userData"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"jwt"}}]}}]}}]} as unknown as DocumentNode<RegisterUserMutation, RegisterUserMutationVariables>;
export const CreateOrderWithPaymentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createOrderWithPayment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"courses"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateOrderWithPaymentInput"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOrderWithPayment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"courses"},"value":{"kind":"Variable","name":{"kind":"Name","value":"courses"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paymentUrl"}},{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<CreateOrderWithPaymentMutation, CreateOrderWithPaymentMutationVariables>;
export const GetCourseQueryDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCourseQueryData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"courseByTitle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"firstPrice"}},{"kind":"Field","name":{"kind":"Name","value":"renewPrice"}},{"kind":"Field","name":{"kind":"Name","value":"firstDurationDay"}},{"kind":"Field","name":{"kind":"Name","value":"renewDurationDay"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"buyOption"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"chapters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"lessons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}}]}}]}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetCourseQueryDataQuery, GetCourseQueryDataQueryVariables>;
export const GetFaqDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getFAQ"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"faqs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"answer"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetFaqQuery, GetFaqQueryVariables>;
export const GetLearningCourseDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLearningCourseData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"courseByTitle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"chapters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"lessons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetLearningCourseDataQuery, GetLearningCourseDataQueryVariables>;
export const GetMyLessonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMyLesson"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myLesson"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentLessonContentVideoContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentLessonContentTextContent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"richText"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComponentLessonContentYoutubeLesson"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetMyLessonQuery, GetMyLessonQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"identifier"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"jwt"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const ResetPasswordWithCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"resetPasswordWithCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"passwordConfirmation"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"passwordConfirmation"},"value":{"kind":"Variable","name":{"kind":"Name","value":"passwordConfirmation"}}},{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]} as unknown as DocumentNode<ResetPasswordWithCodeMutation, ResetPasswordWithCodeMutationVariables>;
export const SendForgetPasswordEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"sendForgetPasswordEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"forgotPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}}]}}]}}]} as unknown as DocumentNode<SendForgetPasswordEmailMutation, SendForgetPasswordEmailMutationVariables>;
export const GetBuyedCoursesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getBuyedCourses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"buyedCourses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"staredLessons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"withUserStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expiredAt"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetBuyedCoursesQuery, GetBuyedCoursesQueryVariables>;
export const GetOrderDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOrderData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"order_courses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetOrderDataQuery, GetOrderDataQueryVariables>;
export const ConfirmPaymentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ConfirmPayment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userDoneHandlePayment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<ConfirmPaymentMutation, ConfirmPaymentMutationVariables>;
export const GetMainPageQueryDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMainPageQueryData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"courses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"decorationSetting"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"landingPageBackgroundImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"news"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetMainPageQueryDataQuery, GetMainPageQueryDataQueryVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"jwt"}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const GetTermDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTerm"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"term"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetTermQuery, GetTermQueryVariables>;
export const GetIsUserFirstBuyAndPriceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getIsUserFirstBuyAndPrice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"course"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isFirstBuy"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetIsUserFirstBuyAndPriceQuery, GetIsUserFirstBuyAndPriceQueryVariables>;
export const AddZeroPriceCourseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddZeroPriceCourse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"AddZeroPriceCourseToMyCourse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"courseId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<AddZeroPriceCourseMutation, AddZeroPriceCourseMutationVariables>;
export const GetUserCoursesStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUserCoursesStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"courseIds"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"courses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"courseIds"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"withUserStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expiredAt"}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetUserCoursesStatusQuery, GetUserCoursesStatusQueryVariables>;
export const GetUserCourseStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUserCourseStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"course"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"withUserStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expiredAt"}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetUserCourseStatusQuery, GetUserCourseStatusQueryVariables>;
export const GetUserProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUserProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<GetUserProfileQuery, GetUserProfileQueryVariables>;