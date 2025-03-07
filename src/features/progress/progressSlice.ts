import { createSlice } from "@reduxjs/toolkit";


interface ProgressProps {
    prgoress: number;
    color: string;
}

const initialState: ProgressProps = {
    prgoress: 0,
    color: 'blue',
}

const progressSlice = createSlice({
    name: 'progress/perSentMam',
    initialState,
    reducers: {
        increasePerSent(state, action) {
            state.prgoress = state.prgoress + action.payload;
            if(state.prgoress < 25) {
                state.color = 'blue'
            } else if (state.prgoress < 50 && state.prgoress >= 25) {
                state.color = 'green'
            } else if ( state.prgoress >= 50 && state.prgoress < 75) {
                state.color = 'purple'
            } else {
                state.color = 'red';
            }
        }
    }
})

export const {increasePerSent} = progressSlice.actions
export default progressSlice.reducer