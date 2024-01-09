import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

const initState = {
    isLoading: false,
    apt: [],
    error: null
}

export const aptAdd = createAsyncThunk(
    'appointment/add',
    async (data) => {
        // console.log(data.prec.name);
        let iData = { data }
        try {
            const rno = Math.floor(Math.random() * 10000);

            const prescRef = ref(storage, 'prescription/' + rno + "_" + data.prec.name);

            await uploadBytes(prescRef, data.prec)
                .then(async (snapshot) => {
                    console.log('Uploaded a blob or file!');

                    await getDownloadURL(snapshot.ref)
                        .then(async (url) => {

                            iData = { ...data, prec: url, presName: rno + "_" + data.prec.name }
                            const docRef = await addDoc(collection(db, "appointment"), iData);

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

export const getApt = createAsyncThunk(
    'appointment/get',
    async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "appointment"));

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

export const deleteApt = createAsyncThunk(
    'appointment/delete',
    async (data) => {
        try {
            const desertRef = ref(storage, 'prescription/' + data.presName);
            // console.log(data);
            await deleteObject(desertRef).then(async () => {
                await deleteDoc(doc(db, "appointment", data.id));
                // console.log("file deleted success");
            })
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        return data.id;
    }
);

export const UpdateApt = createAsyncThunk(
    'appointment/update',

    async (data) => {
        try {
            if (typeof data.prec === "string") {
                console.log("no change imag");

                const aptRef = doc(db, "appointment", data.id);

                await updateDoc(aptRef, data);
                return data;
            } else {
                console.log("change imag");
                const desertRef = ref(storage, 'prescription/' + data.presName);
                let iData = { data }
                // console.log(data);
                await deleteObject(desertRef).then(async () => {
                    const rno = Math.floor(Math.random() * 10000);

                    const prescRef = ref(storage, 'prescription/' + rno + "_" + data.prec.name);
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

                                    const aptRef = doc(db, "appointment", data.id);

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

const pending = (state, action) => {
    state.isLoading = true;
    state.error = null;
}

const rejected = (state, action) => {
    state.isLoading = false;
    state.error = action.error.message;
}

export const appointmentSlice = createSlice({
    name: 'appointment',
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(aptAdd.pending, pending)
            .addCase(aptAdd.fulfilled, (state, action) => {
                state.isLoading = false;
                // console.log(action.payload);
                state.apt = state.apt.concat(action.payload);
            })
            .addCase(aptAdd.rejected, rejected)
            .addCase(getApt.fulfilled, (state, action) => {
                state.isLoading = false;
                // console.log(action);
                state.apt = action.payload;
            })
            .addCase(deleteApt.fulfilled, (state, action) => {
                state.isLoading = false;
                // console.log(action.payload);
                state.apt = state.apt.filter((v) => v.id !== action.payload);
                // let fdata = state.apt = state.apt.filter((v) => v.id !== action.payload);
                // state.apt = fdata;
            })
            .addCase(UpdateApt.fulfilled, (state, action) => {
                state.isLoading = false;
                // console.log(action);
                let Udata = state.apt.map((v) => {
                    if (v.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return v;
                    }
                })
                state.apt = Udata;
            })
    }
})


export default appointmentSlice.reducer