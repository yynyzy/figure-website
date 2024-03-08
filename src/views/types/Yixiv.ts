type Pagination = {
  limit: number
  offset: number
}

export enum TagColor {
  'c1'='rgb(127, 126, 200)',
  'c2'='rgb(192, 126, 200)',
  'c3'='rgb(200, 126, 138)',
  'c4'='rgb(200, 164, 126)',
  'c5'='rgb(126, 165, 200)',
  'c6'='rgb(148, 200, 126)',
  'c7'='rgb(200, 195, 126)',
  'c8'='rgb(126, 195, 200)',
};

export enum SearchType {
  'AUTHOR'='author',
  'TAG'='tag',
};

export interface ITag {
  tag_id: number
  title: string
  zh?: string | null
};

export interface IRecommendPictureParams extends Pagination {};

export interface IUserBestPictureParams {
  picture_id: number | string
  user_id: number | number
};

export interface IPublicPictureParams extends Pagination {
  sort?: string,
  tags?: string,
  type?: number,
  author_user_id?: string,
};

export interface IGetRankingListsParams extends Pagination {
  type: number
  ranking_date: string
};

export interface ISearchAuthorList extends Pagination {
  keyword: string
};

export interface IGetPeriodicalList extends Pagination {};

export interface IGetPeriodical extends Pagination {
  periodicalId: string
};
