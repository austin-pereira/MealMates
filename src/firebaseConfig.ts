import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdAGVjaQaCtxRihasgeuUIx6kgxeNRD74",
  authDomain: "mealmates-db499.firebaseapp.com",
  projectId: "mealmates-db499",
  storageBucket: "mealmates-db499.firebasestorage.app",
  messagingSenderId: "169181666430",
  appId: "1:169181666430:web:ff49e31db7057df79c4c2f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export { auth, googleProvider };
export default app;