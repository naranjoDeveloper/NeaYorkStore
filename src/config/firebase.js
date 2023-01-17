
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { v4 } from "uuid";

const firebaseConfig = {
    apiKey: "AIzaSyDGGB76X5CY_hibDf_W9X7dEnVM49ybtcA",
    authDomain: "fir-upload-4f1b7.firebaseapp.com",
    projectId: "fir-upload-4f1b7",
    storageBucket: "fir-upload-4f1b7.appspot.com",
    messagingSenderId: "975671800592",
    appId: "1:975671800592:web:3d5d96c32cab5ec99e2b95"
};

export const firApp = initializeApp(firebaseConfig);
export const storage = getStorage(firApp);

export async function uploadFile(file) {
    const storageRef = ref(storage, v4());
    await uploadBytes(storageRef, file)
    let url = await getDownloadURL(storageRef)
    return url;
}