import { configureStore, createStore } from "@reduxjs/toolkit";
import progressSlice from '../features/progress/progressSlice'


const store = configureStore({
  reducer: {
    progress: progressSlice
  }
})


export default store