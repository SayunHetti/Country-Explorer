import { db } from "../firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

export const useFavorites = (user) => {
  const getFavorites = async () => {
    if (!user) return [];
    const ref = doc(db, "favorites", user.uid);
    const snap = await getDoc(ref);
    return snap.exists() ? snap.data().countries || [] : [];
  };

  const addFavorite = async (code) => {
    const ref = doc(db, "favorites", user.uid);
    await setDoc(ref, {}, { merge: true });
    await updateDoc(ref, { countries: arrayUnion(code) });
  };

  const removeFavorite = async (code) => {
    const ref = doc(db, "favorites", user.uid);
    await updateDoc(ref, { countries: arrayRemove(code) });
  };

  return { getFavorites, addFavorite, removeFavorite };
};
