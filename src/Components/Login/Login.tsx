import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { loginWithGoogle } from "./authReducer";
// import jwt_decode from "jwt-decode";

const Login = () => {
  const error = useSelector((state: RootState) => state.auth.error);
  const loading = useSelector((state: RootState) => state.auth.loading);
  const dispatch = useAppDispatch();
  const handleSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      dispatch(loginWithGoogle(credentialResponse.credential));
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.log("Login Failed")}
      />
      {error && <div className="text-red-600 mt-2 text-sm">{error}</div>}

      {loading && (
        <div className="text-gray-600 mt-2 text-sm">Logging in...</div>
      )}
    </div>
  );
};

export default Login;
