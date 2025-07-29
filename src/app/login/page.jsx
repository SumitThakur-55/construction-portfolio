// src/app/login/page.js
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold text-center mt-8">Login</h1>
      <LoginForm />
    </div>
  );
}