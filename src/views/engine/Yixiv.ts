import { httpRequest } from "@/utils";
import {
  IGetPeriodicalList,
  IGetPeriodical,
  IGetRankingListsParams,
  IRecommendPictureParams,
  ISearchAuthorList,
  IUserBestPictureParams,
  IPublicPictureParams,
} from "../types/Yixiv";

export default class Yixiv {
  // 缓存 tags
  private static Tags = null;

  private static recommendPicture = null;

  public static getTags = async () => {
    if(Yixiv.Tags) {
      return Yixiv.Tags;
    }
    const { data } = await httpRequest.get('https://www.vilipix.com/api/v1/search/recommand_tag');
    Yixiv.Tags = data;
    return data;
  };

  public static getRecommendPicture = async (params: IRecommendPictureParams) => {
    if(Yixiv.recommendPicture) {
      return Yixiv.recommendPicture;
    }
    const { data } = await httpRequest.get(`https://www.vilipix.com/api/v1/picture/recommand?limit=${params.limit}&offset=${params.offset}`);
    Yixiv.recommendPicture = data;
    return data;
  };

  public static getUserBestPicture = async (params: IUserBestPictureParams) => {
    const { data } = await httpRequest.get(`https://api2.vilipix.com/api/v1/picture/user_best_picture?limit=8&offset=0&picture_id=${params.picture_id}&user_id=${params.user_id}`);
    return data;
  };

  public static getUserPictureInfo = async (pictureId: string) => {
    const { data } = await httpRequest.get(`https://api2.vilipix.com/api/v1/picture/${pictureId}?picture_id=${pictureId}`);
    return data;
  };

  public static searchUser = async (author_Id: string) => {
    const { data } = await httpRequest.get(`https://api2.vilipix.com/api/v1/search/user?type=author&keyword=${author_Id}&limit=30&offset=0`);
    return data;
  };

  public static getPublicPicture = async (params: IPublicPictureParams) => {
    const { data } = await httpRequest.get('https://www.vilipix.com/api/v1/picture/public',{ params });
    return data;
  };

  public static getRankingList = async (params: IGetRankingListsParams) => {
    const { data } = await httpRequest.get(`https://www.vilipix.com/api/v1/picture/ranking?type=${params.type}&ranking_date=${params.ranking_date}&limit=${params.limit}&offset=${params.offset}`);
    return data;
  };

  public static searchAuthorList = async (params: ISearchAuthorList) => {
    const { data } = await httpRequest.get(`https://www.vilipix.com/api/v1/search/user?type=author&keyword=${params.keyword}&limit=${params.limit}&offset=${params.offset}`);
    return data;
  };

  public static getPeriodicalList = async (params: IGetPeriodicalList) => {
    const { data } = await httpRequest.get(`https://www.vilipix.com/api/v1/album/list?limit=${params.limit}&offset=${params.offset}`);
    return data;
  };

  public static getPeriodical = async (params: IGetPeriodical) => {
    const { data } = await httpRequest.get(`https://www.vilipix.com/api/v1/album/${params.periodicalId}?limit=${params.limit}&offset=${params.offset}`);
    return data;
  };
}
