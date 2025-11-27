import RegisterForm from './register-form';

function RegisterPage() {
  return (
    <div className="mt-[10%]">
      <h1 className="text-center text-2xl font-medium">Đăng ký</h1>
      <div className="flex justify-center mt-1">
        <RegisterForm />
      </div>
    </div>
  );
}

export default RegisterPage;
