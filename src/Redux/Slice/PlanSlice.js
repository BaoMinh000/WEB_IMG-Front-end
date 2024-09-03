import { createSlice } from "@reduxjs/toolkit";

const planSlice = createSlice({
    name: "plan",
    initialState: {
        get_plan: {
            data: {},
            isFetching: false,
            error: false,
        },
        plans: {
            list: [],
            isFetching: false,
            error: false,
        },
        addPlan: {
            isFetching: false,
            error: false,
            success: false,
        },
        updatePlan: {
            isFetching: false,
            error: false,
            success: false,
        },
        deletePlan: {
            isFetching: false,
            error: false,
            success: false,
        },
        Search: {
            SearchValue: "",
        },
    },
    reducers: {
        // Actions for getting plan by ID
        getPlanIdStart: (state) => {
            state.get_plan.isFetching = true;
            state.get_plan.error = false;
        },
        getPlanIdSuccess: (state, action) => {
            state.get_plan.isFetching = false;
            state.get_plan.data = action.payload;
            state.get_plan.error = false;
        },
        getPlanIdFailure: (state) => {
            state.get_plan.isFetching = false;
            state.get_plan.error = true;
        },

        // Actions for fetching all plans
        fetchPlansStart: (state) => {
            state.plans.isFetching = true;
            state.plans.error = false;
        },
        fetchPlansSuccess: (state, action) => {
            state.plans.isFetching = false;
            state.plans.list = action.payload;
            state.plans.error = false;
        },
        fetchPlansFailure: (state) => {
            state.plans.isFetching = false;
            state.plans.error = true;
        },

        // Actions for adding a plan
        addPlanStart: (state) => {
            state.addPlan.isFetching = true;
            state.addPlan.error = false;
            state.addPlan.success = false;
        },
        addPlanSuccess: (state) => {
            state.addPlan.isFetching = false;
            state.addPlan.error = false;
            state.addPlan.success = true;
        },
        addPlanFailure: (state) => {
            state.addPlan.isFetching = false;
            state.addPlan.error = true;
            state.addPlan.success = false;
        },

        // Actions for updating a plan
        updatePlanStart: (state) => {
            state.updatePlan.isFetching = true;
            state.updatePlan.error = false;
            state.updatePlan.success = false;
        },
        updatePlanSuccess: (state) => {
            state.updatePlan.isFetching = false;
            state.updatePlan.error = false;
            state.updatePlan.success = true;
        },
        updatePlanFailure: (state) => {
            state.updatePlan.isFetching = false;
            state.updatePlan.error = true;
            state.updatePlan.success = false;
        },

        // Actions for deleting a plan
        deletePlanStart: (state) => {
            state.deletePlan.isFetching = true;
            state.deletePlan.error = false;
            state.deletePlan.success = false;
        },
        deletePlanSuccess: (state) => {
            state.deletePlan.isFetching = false;
            state.deletePlan.error = false;
            state.deletePlan.success = true;
        },
        deletePlanFailure: (state) => {
            state.deletePlan.isFetching = false;
            state.deletePlan.error = true;
            state.deletePlan.success = false;
        },

        // Action for updating search value
        setSearchValue: (state, action) => {
            state.Search.SearchValue = action.payload;
        },
    },
});

export const {
    getPlanIdStart,
    getPlanIdSuccess,
    getPlanIdFailure,
    fetchPlansStart,
    fetchPlansSuccess,
    fetchPlansFailure,
    addPlanStart,
    addPlanSuccess,
    addPlanFailure,
    updatePlanStart,
    updatePlanSuccess,
    updatePlanFailure,
    deletePlanStart,
    deletePlanSuccess,
    deletePlanFailure,
    setSearchValue,
} = planSlice.actions;

export default planSlice.reducer;
