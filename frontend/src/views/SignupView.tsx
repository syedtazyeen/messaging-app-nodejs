import React, { useState } from 'react'
import { Button } from '../components/common/buttons'
import { useAuth } from '../providers/AuthProvider'

const SignupView: React.FC<{ onSwitch: () => void }> = ({ onSwitch }) => {
    const { signup, isLoading, error } = useAuth()
    const [form, setForm] = useState<{ email: string; password: string, username: string }>({ email: "", password: "", username: "" });


    const handleSubmit = (e: any) => {
        e.preventDefault();
        signup(form).then(resp => {
            console.log(resp);
            onSwitch();
        })
    }

    const inputStyle = "w-full bg-gray-100 px-2 py-3 my-1 text-sm outline-none border border-transparent rounded-md hover:border-orange-500 focus:border-b-2 focus:border-orange-500 focus:border-t-0 focus:border-l-0 focus:border-r-0 transtion focus:duration-200"

    return (
        <div className="flex flex-col gap-4 items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white border border-gray-100 rounded-md shadow-md">
                <h1 className="text-3xl font-medium text-center my-6 font-arch">Sign up</h1>

                <form onSubmit={handleSubmit}>


                    <div className={`${error ? 'h-fit p-2 mb-6' : 'h-0'} w-full flex justify-center transition duration-200`}>
                        <p className='text-red-600 text-sm font-medium'>{error}</p>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="username" className="block text-xs font-medium text-gray-500">Username</label>
                        <input
                            type="text"
                            id="username"
                            className={inputStyle}
                            value={form.username}
                            onChange={e => setForm({ ...form, username: e.target.value })}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-xs font-medium text-gray-500">Email</label>
                        <input
                            type="text"
                            id="email"
                            className={inputStyle}
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-xs font-medium text-gray-500">Password</label>
                        <input
                            type="password"
                            id="password"
                            className={inputStyle}
                            value={form.password}
                            onChange={e => setForm({ ...form, password: e.target.value })}
                        />
                    </div>

                    <Button
                        type='submit'
                        isLoading={isLoading}
                        disabled={form.email === "" || form.password === "" || isLoading}
                        width='full'>Sign up</Button>
                </form>
            </div>

            <p className="mt-4 text-center text-sm text-gray-800 tracking-wide">
                Already have an account? <button onClick={onSwitch} className="font-bold">Log in</button>
            </p>
        </div>
    )
}

export default SignupView;

