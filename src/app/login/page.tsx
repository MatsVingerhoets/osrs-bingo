import LoginForm from "./components/LoginForm";

const LoginPage = async () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="bg-white rounded-xl p-6">
        <h1 className="text-xl mb-4">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
