import * as api from "../api/api";

import { useQuery, useQueries, QueryFunctionContext } from "@tanstack/react-query";

const useManyQueries = (
  fetcherFn: { (): Promise<api.Movies>; (context: QueryFunctionContext<string[], any>): unknown },
  multiFetcherKey: string,
  type: string,
  itemNumber: number
) => {
  // const multifetcher = "multifetcher"

  const { isLoading, isError, data } = useQuery(["dynamic-query"], fetcherFn, {
    select: (data: api.Movies) => {
      const slicedData = data.results.slice(0, itemNumber);
      return slicedData;
    },
  });

  // const { isLoading: popularLoading, data: trendingData } = useQuery(["popular-movies"], api.getPopular);

  const detailedQueries = useQueries({
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


  const detailedQueriesMediaType = detailedQueries.map((item, index) => ({ ...item, media_type: data![index].media_type }));
  const detailedQueriesIndexed = detailedQueriesMediaType.map((item, key) => ({ key, ...item }));

  return { detailedQueriesIndexed, data, detailedQueries};
};

export default useManyQueries;
