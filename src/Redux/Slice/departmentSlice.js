import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { deleteDepartmentApiData, getDepartmentApiData, postDepartmentApiData, updateDepartmentApiData } from "../../common/Apis/department.api";

const initState = {
    isLoading: false,
    department: [],
    error: null
}

export const fetchDepartments = createAsyncThunk(
    'department/fetch',
    async () => {
        // await new Promise((res, rej) => setTimeout(res, 2000));

        let response = await getDepartmentApiData();
        return response.data;
    }
);

export const addDepartment = createAsyncThunk(
    'department/add',

    async (data) => {
        let response = await postDepartmentApiData(data);
        return response.data;
    }
);

export const editDepartment = createAsyncThunk(
    'department/update',

    async (data) => {
        let response = await updateDepartmentApiData(data);
        return response.data;
    }
);

export const removeDepartment = createAsyncThunk(
    'department/remove',

    async (id) => {
        await deleteDepartmentApiData(id);
        return id;
    }
)

const pending = (state, action) => {
    state.isLoading = true;
    state.error = null;
}

const rejected = (state, action) => {
    state.isLoading = false;
    state.error = action.error.message;
}


export const departmentSlice = createSlice({
    name: 'department',
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDepartments.pending, pending)
            .addCase(fetchDepartments.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log(action);
                state.department = action.payload;
            })
            .addCase(fetchDepartments.rejected, rejected)
            .addCase(addDepartment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.department = state.department.concat(action.payload);
            })
            .addCase(editDepartment.fulfilled, (state, action) => {
                state.isLoading = false;
                let Udata = state.department.map((v) => {
                    if (v.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return v;
                    }
                })
                state.department = Udata;
            })
            .addCase(removeDepartment.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log(action.payload);

                let fdata = state.department.filter((v) => v.id !== action.payload);
                state.department = fdata;
            })
    }
});


export default departmentSlice.reducer;