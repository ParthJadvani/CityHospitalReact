import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

const initState = {
    isLoading: false,
    doctor: [],
    error: null
}

export const getDoctor = createAsyncThunk(
    'doctor/get',
    async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "doctor"));

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

export const addDoctor = createAsyncThunk(
    'doctor/add',
    async (data) => {
        // console.log(data.prec.name);
        let iData = { data }
        try {
            const rno = Math.floor(Math.random() * 10000);

            const prescRef = ref(storage, 'doctor/' + rno + "_" + data.prec.name);

            await uploadBytes(prescRef, data.prec)
                .then(async (snapshot) => {
                    console.log('Uploaded a blob or file!');

                    await getDownloadURL(snapshot.ref)
                        .then(async (url) => {

                            iData = { ...data, prec: url, presName: rno + "_" + data.prec.name }
                            const docRef = await addDoc(collection(db, "doctor"), iData);

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

export const editDoctor = createAsyncThunk(
    'doctor/update',

    // async (data) => {
    //     let response = await updateDepartmentApiData(data);
    //     return response.data;
    // }

    async (data) => {
        try {
            if (typeof data.prec === "string") {
                console.log("no change imag");

                const aptRef = doc(db, "doctor", data.id);

                await updateDoc(aptRef, data);
                return data;
            } else {
                console.log("change imag");
                const desertRef = ref(storage, 'doctor/' + data.presName);
                let iData = { data }
                // console.log(data);
                await deleteObject(desertRef).then(async () => {
                    const rno = Math.floor(Math.random() * 10000);

                    const prescRef = ref(storage, 'doctor/' + rno + "_" + data.prec.name);
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

                                    const aptRef = doc(db, "doctor", data.id);

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

export const removeDoctor = createAsyncThunk(
    'doctor/remove',

    async (data) => {
        try {
            const desertRef = ref(storage, 'doctor/' + data.presName);
            // console.log(data);
            await deleteObject(desertRef).then(async () => {
                await deleteDoc(doc(db, "doctor", data.id));
                console.log("file deleted success");
            })
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        return data.id;
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

export const doctorSlice = createSlice({
    name: 'doctor',
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getDoctor.pending, pending)
            .addCase(getDoctor.fulfilled, (state, action) => {
                state.isLoading = false;
                // console.log(action);
                state.doctor = action.payload;
            })
            .addCase(getDoctor.rejected, rejected)

            // =====================================================================================

            .addCase(addDoctor.pending, pending)
            .addCase(addDoctor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.doctor = state.doctor.concat(action.payload);
            })
            .addCase(addDoctor.rejected, rejected)

            // =====================================================================================

            .addCase(editDoctor.pending, pending)
            .addCase(editDoctor.fulfilled, (state, action) => {
                state.isLoading = false;
                let Udata = state.doctor.map((v) => {
                    if (v.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return v;
                    }
                })
                state.doctor = Udata;
            })
            .addCase(editDoctor.rejected, rejected)

            // ================================================================================

            .addCase(removeDoctor.pending, pending)
            .addCase(removeDoctor.fulfilled, (state, action) => {
                state.isLoading = false;
                // console.log(action.payload);

                let fdata = state.doctor.filter((v) => v.id !== action.payload);
                state.doctor = fdata;
            })
            .addCase(removeDoctor.rejected, rejected)
    }
})


export default doctorSlice.reducer