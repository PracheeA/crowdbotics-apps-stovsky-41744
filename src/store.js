import { configureStore } from "@reduxjs/toolkit";

// import authSlice from './redux/authSlice';
// import quotationData from './redux/quotation';
// import contractorQuotation from "./redux/contractorQuotation";
// import feedBack from "./redux/feedBack";
// import contractorOrder from "./redux/contractorOrder";

const store = configureStore({
  reducer: {
    // user:authSlice,
    // projectList: quotationData,
    // feedbackUser:feedBack,
    // data:contractorQuotation,
    // contractorOrder:contractorOrder
  },
})

export default store