import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { deleteDepartmentApiData, getDepartmentApiData, postDepartmentApiData, updateDepartmentApiData } from "../../common/Apis/department.api";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

const initState = {
    isLoading: false,
    department: [],
    error: null
}

export const fetchDepartments = createAsyncThunk(
    'department/fetch',
    // async () => {
    //     // await new Promise((res, rej) => setTimeout(res, 2000));

    //     let response = await getDepartmentApiData();
    //     return response.data;
    // }
    async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "department"));

            let data = [];

            querySnapshot.forEach((doc) => {
                data.push({
                    id: doc.id,
                    ...doc.data()
                }
                );

            });
            return data;
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
);

export const addDepartment = createAsyncThunk(
    'department/add',

    // async (data) => {
    //     let response = await postDepartmentApiData(data);
    //     return response.data;
    // }

    async (data) => {
        // console.log(data.prec.name);
        let iData = { data }
        try {
            const rno = Math.floor(Math.random() * 10000);

            const prescRef = ref(storage, 'department/' + rno + "_" + data.prec.name);

            await uploadBytes(prescRef, data.prec)
                .then(async (snapshot) => {
                    console.log('Uploaded a blob or file!');

                    await getDownloadURL(snapshot.ref)
                        .then(async (url) => {

                            iData = { ...data, prec: url, presName: rno + "_" + data.prec.name }
                            const docRef = await addDoc(collection(db, "department"), iData);

                            iData = {
                                id: docRef.id,
                                ...data,
                                prec: url,
                                presName: rno + "_" + data.prec.name
                            }
                        })
                });

            return iData;
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
);

export const editDepartment = createAsyncThunk(
    'department/update',

    // async (data) => {
    //     let response = await updateDepartmentApiData(data);
    //     return response.data;
    // }

    async (data) => {
        try {
            if (typeof data.prec === "string") {
                console.log("no change imag");

                const aptRef = doc(db, "department", data.id);

                await updateDoc(aptRef, data);
                return data;
            } else {
                console.log("change imag");
                const desertRef = ref(storage, 'department/' + data.presName);
                let iData = { data }
                // console.log(data);
                await deleteObject(desertRef).then(async () => {
                    const rno = Math.floor(Math.random() * 10000);

                    const prescRef = ref(storage, 'department/' + rno + "_" + data.prec.name);
                    console.log("file deleted success");
                    // await deleteDoc(doc(db, "appointment", data.id));                    

                    await uploadBytes(prescRef, data.prec)
                        .then(async (snapshot) => {
                            console.log('New Uploaded a blob or file!');

                            await getDownloadURL(snapshot.ref)
                                .then(async (url) => {
                                    console.log("new" + url);
                                    iData = { ...data, prec: url, presName: rno + "_" + data.prec.name }
                                    // const docRef = await updateDoc(collection(db, "appointment"), iData);

                                    const aptRef = doc(db, "department", data.id);

                                    await updateDoc(aptRef, iData);

                                    iData = {
                                        // id: aptRef.id,
                                        ...data,
                                        prec: url,
                                        presName: rno + "_" + data.prec.name
                                    }
                                })
                        });
                })
                return iData;
            }
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
);

export const removeDepartment = createAsyncThunk(
    'department/remove',

    async (data) => {
        try {
            const desertRef = ref(storage, 'department/' + data.presName);
            // console.log(data);
            await deleteObject(desertRef).then(async () => {
                await deleteDoc(doc(db, "department", data.id));
                console.log("file deleted success");
            })
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        return data.id;
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
                // console.log(action);
                state.department = action.payload;
            })
            .addCase(fetchDepartments.rejected, rejected)

            // ==============================================================================
            
            .addCase(addDepartment.pending, pending)
            .addCase(addDepartment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.department = state.department.concat(action.payload);
            })
            .addCase(addDepartment.rejected, rejected)

            // ================================================================================

            .addCase(editDepartment.pending, pending)
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
            .addCase(editDepartment.rejected, rejected)

            // ==============================================================================

            .addCase(removeDepartment.pending, pending)
            .addCase(removeDepartment.fulfilled, (state, action) => {
                state.isLoading = false;
                // console.log(action.payload);

                let fdata = state.department.filter((v) => v.id !== action.payload);
                state.department = fdata;
            })
            .addCase(removeDepartment.rejected, rejected)
    }
});


export default departmentSlice.reducer;