import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../config/Firebase.js";

const GoogleSignIn = () => {
    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            // Handle successful sign-in
            const user = result.user;
            console.log('User signed in:', user);
        } catch (error) {
            console.error('Error signing in with Google:', error);
            // Handle errors
        }
    };

    return (
        <>
            <button type="button" className="btn btn-primary w-100" onClick={handleGoogleSignIn}>
                <FontAwesomeIcon icon={faGoogle} />
            </button>
        </>
    );
}

export default GoogleSignIn;