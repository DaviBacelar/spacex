import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LaunchState {
  flight_number: number,
  mission_name: string,
  launch_date_utc: string,
  launch_success: boolean,
  links: {
    // not all missions have this property and there is no consistence from the api on the data type.
    mission_patch_small?: any
  }
}

let items: any = localStorage.getItem('favouritesLaunches');

if(items) {
  items = JSON.parse(items);
}

else {
  items = [];
}

const initialState: LaunchState[] = items;

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addFavourite(state, action: PayloadAction<any>) {
      // No need to copy the state. immer kicks in.
      state.push(action.payload);
      localStorage.setItem('favouritesLaunches', JSON.stringify(state));
    },

    removeFavourite(state, action: PayloadAction<any>) {
      // No need to copy the state. immer kicks in.
      let array = state.filter(launch => JSON.stringify(launch) !== JSON.stringify(action.payload));
      localStorage.removeItem('favouritesLaunches');
      localStorage.setItem('favouritesLaunches', JSON.stringify(array));
      return array;
    }
  }
});

export const { addFavourite, removeFavourite } = favouritesSlice.actions;
export default favouritesSlice.reducer;
