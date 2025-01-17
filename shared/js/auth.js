import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const auth = getAuth();

export const checkAuth = () => {
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            window.location.href = '../index.html';
        }
    });
};

export const handleSignOut = () => {
    signOut(auth).then(() => {
        window.location.href = '../index.html';
    });
};