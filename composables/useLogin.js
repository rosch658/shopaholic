export default function useLogin() {
  const loginToken = useState("login", () => "");
  const setLoginToken = (token) => {
    loginToken.value = token;
  };

  return { loginToken, setLoginToken };
}
