import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Launch {
  flight_number: number,
  mission_name: string,
  launch_date_utc: string,
  launch_success: boolean,
  links: {
    // not all missions have this property and there is no consistence from the api on the data type.
    mission_patch_small?: any 
  }
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.spacexdata.com/v3',
    prepareHeaders(headers) {
      return headers;
    }
  }),
  endpoints(builder) {
    return {
      fetchLaunches: builder.query<Launch[], number | void>({
        query() {
          return "/launches";       
        }
      })
    }
  } 
});

export const { useFetchLaunchesQuery } = apiSlice;
