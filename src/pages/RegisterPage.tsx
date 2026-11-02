import { useForm } from "react-hook-form"
import type { LoginResponse, RegisterRequest } from "../types/auth"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { authApi } from "../api/authApi"
import { AxiosError } from "axios"
import type { ApiError } from "../api/api"


const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterRequest>();
    const navigate = useNavigate();
    const { login } = useAuth();
    const { mutate, isPending, error } = useMutation<LoginResponse, AxiosError<ApiError>, RegisterRequest>
        ({
            mutationFn: (data) => authApi.register(data),
            onSuccess: (data) => {
                login(data)
                navigate("/")
            }
        })
    const onSubmit = (data: RegisterRequest) => {
        mutate(data);
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
                <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">הרשמה</h1>
                <div className="mb-4">
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">שם מלא</label>
                    <input id="fullName" type="text" {...register("fullName", { required: "שדה חובה" })}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">מייל</label>
                    <input id="email" type="email" {...register("email", { required: "יש להזין כתובת מייל", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "כתובת מייל אינה תקינה" } })}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">סיסמה</label>
                    <input id="password" type="password" {...register("password", { required: "יש להזין סיסמה", minLength: { value: 8, message: "יש להזין לפחות 8 תווים" } })}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                </div>
                <div className="mb-6">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">טלפון (רשות)</label>
                    <input id="phone" type="text" {...register("phone")}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>
                {error && <p className="text-red-500 text-sm mb-4 text-center">
                    {error.response?.status === 409 ? "כתובת המייל כבר קיימת במערכת" : "ההרשמה נכשלה, נסי שוב"}
                </p>}
                <button type="submit" disabled={isPending}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition">
                    {isPending ? "שולח..." : "הרשמה"}
                </button>
            </form>
        </div>
    )
}
export default Register