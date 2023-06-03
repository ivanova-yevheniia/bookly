import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

export const loginUser = (auth, email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const logoutUser = (auth) =>
  signOut(auth).catch((err) => console.log(err));

export const registerUser = async (auth, email, password, displayName) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  if (!user) {
    throw new Error("No user error!");
  }

  await updateProfile(user, {
    ...user,
    displayName,
  });
};
