import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "@firebase/storage";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};
export const firebaseApp = initializeApp(firebaseConfig);

export const storage = getStorage(firebaseApp);
export const auth = getAuth(firebaseApp);

export const uploadImageToFireBase = async (imageAsFile) => {
  console.log("start of upload");
  if (imageAsFile === "") {
    console.error(`not an image, the image file is a ${typeof imageAsFile}`);
  } else {
    const storageRef = ref(storage, `/product-images/${uuidv4()}`);
    const uploadTask = uploadBytesResumable(storageRef, imageAsFile);
    await uploadTask
      .then((snapshot) => {
        const progress =
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      })
      .catch((error) => console.error(error));
    return await getDownloadURL(uploadTask.snapshot.ref);
  }
};

export const deleteFileFromFirebase = async (imageURL) => {
  console.log("start of upload");
  const storageRef = ref(storage, imageURL);
  await deleteObject(storageRef)
    .then(() => {
      console.log("success delete image");
    })
    .catch((error) => {
      console.error(error);
    });
};

export const createFireBaseAuth = async (email, password) => {
  let check;
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      check = userCredential.user;
    })
    .catch((error) => {
      console.error(error);
    });
  return check;
};
