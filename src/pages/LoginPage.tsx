import { useForm } from "react-hook-form"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { authApi } from "../api/authApi";
import { useMutation } from "@tanstack/react-query";
import type { LoginRequest ,LoginResponse} from "../types/auth";
import { AxiosError } from "axios";
import type { ApiError } from "../api/api";


const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginRequest>();
    const { login } = useAuth();
    const navigate = useNavigate();

    const { mutate, isPending, error } = useMutation<LoginResponse, AxiosError<ApiError>, LoginRequest>({
        mutationFn: (data) => authApi.login(data),
        onSuccess: (data) => {
            login(data);
            navigate("/");
        }
    })

    return (
        <div className="min-h-screen flex items-center justify-center bg-cream">
            <form onSubmit={handleSubmit(data => mutate(data))} className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
                <h1 className="text-2xl font-bold text-dark mb-6 text-center">התחברות</h1>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">מייל</label>
                    <input id="email" type="email"
                        {...register("email", { required: "יש להזין כתובת מייל", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "כתובת מייל אינה תקינה" } })}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
                    {errors.email && <p className="text-primary text-sm mt-1">{errors.email.message}</p>}
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">סיסמה</label>
                    <input id="password" type="password"
                        {...register("password", { required: "יש להזין סיסמה", minLength: { value: 8, message: "יש להזין לפחות 8 תווים" } })}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
                    {errors.password && <p className="text-primary text-sm mt-1">{errors.password.message}</p>}
                </div>
                {error && <p className="text-primary text-sm mb-4 text-center">התחברות נכשלה, בדקי את הפרטים</p>}
                <button type="submit" disabled={isPending}
                    className="w-full bg-primary text-cream py-2 rounded-lg hover:bg-secondary disabled:opacity-50 transition">
                    {isPending ? "מתחבר..." : "התחבר"}
                </button>
            </form>
        </div>
    )
}
export default Login