import LoginForm from './login-form';

function LoginPage() {
  return (
    <div className="mt-[10%]">
      <h1 className="text-center text-2xl font-medium">Đăng nhập</h1>
      <div className="flex justify-center mt-1">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
