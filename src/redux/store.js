import { configureStore } from "@reduxjs/toolkit";
import toastReducer from "@redux/"

export default configureStore({
    reducer: {
        toast: toastReducer,

    }
});
