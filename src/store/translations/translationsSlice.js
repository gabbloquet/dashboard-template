import {createSlice} from "@reduxjs/toolkit";

const translationsSlice = createSlice({
    name: 'Translations',
    initialState: {},
    reducers: {
        setTranslations(state, action) {
            return {...state, messages: action.payload}
        },
    }
})

export const {
    setTranslations
} = translationsSlice.actions;
export default translationsSlice.reducer;
