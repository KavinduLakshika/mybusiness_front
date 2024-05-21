import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

interface GoogleSignInProps {
    signIn: () => void;
}

const GoogleSignIn: React.FC<GoogleSignInProps> = ({ signIn }) => {
    const handleGoogleSignIn = () => {
        signIn();
    }

    return (
        <>
            <button type="button" className="btn btn-primary w-100" onClick={handleGoogleSignIn}>
                <FontAwesomeIcon icon={faGoogle} />
            </button>
        </>
    );
}

export default GoogleSignIn;