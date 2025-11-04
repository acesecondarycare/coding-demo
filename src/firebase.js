import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore/lite";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDE8RiMyVpiqR13l_DlJ-ocCi8JX6H2JD4",
  authDomain: "netflix-clone-armaan1.firebaseapp.com",
  projectId: "netflix-clone-armaan1",
  storageBucket: "netflix-clone-armaan1.firebasestorage.app",
  messagingSenderId: "7303802217",
  appId: "1:7303802217:web:f1de890dafa35c8a30a1f8",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    console.log(
      "Signup values:",
      name,
      typeof name,
      email,
      typeof email,
      password,
      typeof password
    );
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.error(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const login = async (email, password) => {
  try {
    console.log(
      "Login values:",
      email,
      typeof email,
      password,
      typeof password
    );
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Login error:", error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const logout = async () => {
  await signOut(auth);
};

export { auth, db, login, signup, logout };
