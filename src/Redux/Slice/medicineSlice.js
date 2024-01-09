import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import storage from "redux-persist/lib/storage";


const initState = {
    isLoading: false,
    medicine: [],
    error: null
}

export const fetchMedicine = createAsyncThunk(
    'medicine/fetch',
    // async () => {
    //     // await new Promise((res, rej) => setTimeout(res, 2000));

    //     let response = await getDepartmentApiData();
    //     return response.data;
    // }
    async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "medicine"));

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

export const addMedicine = createAsyncThunk(
    'medicine/add',

    // async (data) => {
    //     let response = await postDepartmentApiData(data);
    //     return response.data;
    // }

    async (data) => {
        // console.log(data.prec.name);
        // console.log(data);
        let iData = { data }
        try {
            const rno = Math.floor(Math.random() * 10000);

            const prescRef = ref(storage, 'medicine/' + rno + "_" + data.prec.name);

            await uploadBytes(prescRef, data.prec)
                .then(async (snapshot) => {
                    console.log('Uploaded a blob or file!');

                    await getDownloadURL(snapshot.ref)
                        .then(async (url) => {

                            iData = { ...data, prec: url, presName: rno + "_" + data.prec.name }
                            const docRef = await addDoc(collection(db, "medicine"), iData);

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


const pending = (state, action) => {
    state.isLoading = true;
    state.error = null;
}

const rejected = (state, action) => {
    state.isLoading = false;
    state.error = action.error.message;
}

export const medicineSlice = createSlice({
    name: 'medicine',
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMedicine.pending, pending)
            .addCase(fetchMedicine.fulfilled, (state, action) => {
                state.isLoading = false;
                // console.log(action);
                state.medicine = action.payload;
            })
            .addCase(fetchMedicine.rejected, rejected)

        // ==============================================================================

        .addCase(addMedicine.pending, pending)
            .addCase(addMedicine.fulfilled, (state, action) => {
                state.isLoading = false;
                // console.log(action);
                state.medicine = state.medicine.concat(action.payload);
            })
            .addCase(addMedicine.rejected, rejected)

        // ==============================================================================
    }
})


export default medicineSlice.reducer;