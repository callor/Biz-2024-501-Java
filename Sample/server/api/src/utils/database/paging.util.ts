const PAGING_TOP = 'SELECT A.* FROM ( SELECT ROWNUM AS RNUM, A.* FROM(';
const PAGING_BOTTOM = ') A ) A WHERE RNUM <= ( #page# * #limit# ) AND RNUM > ( #page# - 1 ) * #limit# ';

type PagingQueryParam = [string, any[]];
type Paging = { page?: number; limit?: number };

export class PagingUtils {
  static setPagingQuery(
    [query, params]: PagingQueryParam,
    paging: Paging = { page: 1, limit: 10 },
  ): [string, any[], { page: number; limit: number }] {
    const { page, limit = 10 } = paging;
    const bottom = PAGING_BOTTOM.replace(/#page#/g, `'${page}'`).replace(/#limit#/g, `'${limit}'`);
    return [`${PAGING_TOP}${query}${bottom}`, params, { page, limit }];
  }

  static setPagingArray<T>(arr: T[], paging: Paging = { page: 1 }): T[] {
    const { page, limit = 10 } = paging;
    const start = (page - 1) * limit;
    const last = start + limit;
    return arr.slice(start, last);
  }
}
