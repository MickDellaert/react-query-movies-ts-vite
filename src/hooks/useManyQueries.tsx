import * as api from "../api/api";
import * as Interface from "../types/types";

import { useQuery, useQueries } from "@tanstack/react-query";

const useManyQueries = (
  // fetcherFn: { (): Promise<api.Movies>; (context: QueryFunctionContext<string[], any>): unknown },
  fetcherFn: () => Promise<Interface.Media>,
  multiFetcherKey: string,
  type: string,
  itemNumber: number
) => {
  // const {
  //   isLoading,
  //   isError,
  //   data: testData,
  // } = useQuery(["dynamic-query"], fetcherFn, {
  //   select: (testData) => {
  //     const slicedData = testData.results.slice(0, itemNumber);
  //     return slicedData;
  //   },
  // });

  const slicedDetails = useQuery(["many-details-query"], fetcherFn, {
    select: (slicedDetails) => {
      const slicedData = slicedDetails.results.slice(0, itemNumber);
      return slicedData;
    },
  });

  const detailedQueries = useQueries({
    queries:
      slicedDetails.data?.map((item: { id: number; media_type: string }) => {
        return {
          queryKey: [multiFetcherKey, item.id, item.media_type || type],
          queryFn: () => api.getDetails(item.id, item.media_type || type),
        };
      }) ?? [],
  });

  const detailedQueriesTest = detailedQueries.map((e) => e.data);

  const detailedQueriesMediaTypeTest = detailedQueriesTest.map((item, index) => ({
    ...item,
    media_type: slicedDetails.data![index].media_type,
    key: index,
  }));

  const detailedQueriesMediaType = detailedQueries.map((item, index) => ({
    ...item,
    media_type: slicedDetails.data![index].media_type,
    key: index,
  }));

  // const detailedQueriesMediaTypeTestIndexed = detailedQueriesMediaTypeTest.map((item, key) => ({ key, ...item }));
  // const detailedQueriesIndexed = detailedQueriesMediaType.map((item, key) => ({ key, ...item }));

  // console.log(testData);
  // console.log(detailedQueries);
  // console.log(detailedQueriesTest);
  // console.log(detailedQueriesMediaTypeTest);
  // console.log(detailedQueriesMediaTypeTestIndexed);
  // console.log(detailedQueriesMediaType);
  // console.log(detailedQueriesIndexed);

  return {
    detailedQueriesTest,
    // detailedQueriesIndexed,
    detailedQueriesMediaType,
    detailedQueriesMediaTypeTest,
    slicedDetails,
    detailedQueries,
  };
};

export default useManyQueries;
