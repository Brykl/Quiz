import { configureStore, createStore } from "@reduxjs/toolkit";
import progressSlice from '../features/progress/progressSlice'


const store = configureStore({
  reducer: {
    progress: progressSlice
  }
})


export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppStore = typeof store


export default store


// export const makeStore = () => store