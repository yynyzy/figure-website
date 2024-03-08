interface INavigation {
  key: string,
  label: string,
  path: string,
};
const router: INavigation[] = [
  {
    key: 'home',
    label: '首页',
    path: '/yixiv',
  },
  {
    key: 'new',
    label: '新作',
    path: '/yixiv/new',

  },
  {
    key: 'ranking',
    label: '排行榜',
    path: '/yixiv/ranking',

  },
  {
    key: 'periodical',
    label: '特辑',
    path: '/yixiv/periodical',

  }
];

export {
  router,
};
export type { INavigation };
