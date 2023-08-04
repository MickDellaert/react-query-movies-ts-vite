import * as api from "../api/api";

import { useQuery, useQueries, QueryFunctionContext } from "@tanstack/react-query";

const useManyQueries = (
  fetcherFn: { (): Promise<api.Movies>; (context: QueryFunctionContext<string[], any>): unknown },
  multiFetcherKey: string,
  type: string,
  itemNumber: number
) => {
  // const multifetcher = "multifetcher"

  const { isLoading, data } = useQuery(["dynamic-query"], fetcherFn, {
    select: (data: api.Movies) => {
      const slicedData = data.results.slice(0, itemNumber);
      return slicedData;
    },
  });

  // const { isLoading: popularLoading, data: trendingData } = useQuery(["popular-movies"], api.getPopular);

  const userQueries = useQueries({
    queries:
      data?.map((item: { id: number; media_type: string }) => {
        return {
          queryKey: [multiFetcherKey, item.id, item.media_type || type],
          queryFn: () => api.getDetails(item.id, item.media_type || type),
          // enabled: !!trendingData,
          // select: (data) => data.data.map((item, key) => ({key, ...item}))
        };
      }) ?? [],
  });

  // const userQueriesTest = userQueries.map(obj =>({...obj, media_type: type}))
  const userQueriesIndexed = userQueries.map((item, key) => ({ key, ...item }));

  return { userQueriesIndexed, data, userQueries };
};

export default useManyQueries;
