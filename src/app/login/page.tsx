import LoginForm from "./components/LoginForm";

const LoginPage = async () => {
  return (
    <div className="w-full flex justify-center">
      <div className="bg-white rounded-xl">
        <h1 className="text-xl mb-2">Login Page</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
