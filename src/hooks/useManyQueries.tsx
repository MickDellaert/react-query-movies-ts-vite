import * as api from "../api/api";
import * as Interface from "../types/types";

import { useQuery, useQueries, UseQueryOptions } from "@tanstack/react-query";

const useManyQueries = (
  // fetcherFn: { (): Promise<api.Movies>; (context: QueryFunctionContext<string[], any>): unknown },
  fetcherFn: () => Promise<Interface.Media>,
  multiFetcherKey: string,
  type: string,
  itemNumber: number
) => {
  const slicedDetails = useQuery(["many-details-usequeries-query"], fetcherFn, {
    select: (data) => {
      const slicedData = data.results.slice(0, itemNumber);
      return slicedData;
    },
  });

  const slicedDetailsSucces = slicedDetails.isSuccess ? slicedDetails.data : [];

  const detailedQueries = useQueries({
    queries:
      slicedDetailsSucces.map<UseQueryOptions<Interface.Details, Error>>((item: { id: number; media_type: string }) => {
        return {
          queryKey: [multiFetcherKey, item.id, item.media_type || type],
          queryFn: () => api.getDetails(item.id, item.media_type || type),
        };
      }) ?? [],
  });

  const detailedQueriesMediaTypeData = detailedQueries.map((item, index) => ({
    ...item.data,
    media_type: slicedDetailsSucces[index].media_type,
    key: index,
  })) as Interface.Details[];

  return {
    detailedQueries,
    detailedQueriesMediaTypeData,
  };
};

export default useManyQueries;
