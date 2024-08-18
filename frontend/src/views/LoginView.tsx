import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button } from '../components/common/buttons';
import { useAuth } from '../providers/AuthProvider';

// Define the props type for the component
interface LoginViewProps {
  onSwitch: () => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onSwitch }) => {
  const { login, isLoading, error } = useAuth();
  const [form, setForm] = useState<{ email: string; password: string }>({
    email: "",
    password: ""
  });

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(form);
  };

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [id]: value }));
  };

  // Styles for input fields
  const inputStyle = "w-full bg-gray-100 px-2 py-3 my-1 text-sm outline-none border border-transparent rounded-md hover:border-orange-500 focus:border-b-2 focus:border-orange-500 focus:border-t-0 focus:border-l-0 focus:border-r-0 transition focus:duration-200";

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white border border-gray-100 rounded-md shadow-md">
        <h1 className="text-3xl font-medium text-center my-6 font-arch">Log in</h1>

        <form onSubmit={handleSubmit}>
          {/* Error message display */}
          <div className={`w-full flex justify-center transition duration-200 ${error ? 'h-fit p-2 mb-6' : 'h-0'}`}>
            {error && <p className='text-red-600 text-sm font-medium'>{error}</p>}
          </div>

          {/* Email input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-xs font-medium text-gray-500">Email</label>
            <input
              type="text"
              id="email"
              className={inputStyle}
              value={form.email}
              onChange={handleChange}
            />
          </div>

          {/* Password input */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-xs font-medium text-gray-500">Password</label>
            <input
              type="password"
              id="password"
              className={inputStyle}
              value={form.password}
              onChange={handleChange}
            />
          </div>

          {/* Submit button */}
          <Button
            type='submit'
            isLoading={isLoading}
            disabled={!form.email || !form.password || isLoading}
            width='full'
          >
            Login
          </Button>
        </form>
      </div>

      {/* Switch to sign up */}
      <p className="mt-4 text-center text-sm text-gray-800 tracking-wide">
        Don't have an account?{' '}
        <button onClick={onSwitch} className="font-bold">
          Sign up
        </button>
      </p>
    </div>
  );
};

export default LoginView;
