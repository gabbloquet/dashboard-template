import {combineReducers} from '@reduxjs/toolkit'
import translationsReducer from "./translations/translationsSlice";
import userStrategyReducer from "./strategy/strategySlice";

const rootReducer = combineReducers({
    userStrategy: userStrategyReducer,
    translations: translationsReducer
})

export default rootReducer;
