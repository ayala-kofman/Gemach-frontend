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
    return <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="fullName">שם מלא:</label>
                <input id="fullName" type="text" {...register("fullName", { required: "שדה חובה" })} />
                {errors.fullName?.message}
            </div>
            <div>
                <label htmlFor="email">מייל:</label>
                <input id="email" type="email" {...register("email", { required: "יש להזין כתובת מייל ", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "כתובת מייל אינה תקינה" } })} />
                {errors.email?.message}
            </div>
            <div>
                <label htmlFor="password">סיסמה:</label>
                <input id="password" type="password"{...register("password", { required: "יש להזין סיסמה ", minLength: { value: 8, message: "יש להזין לפחות 8 תווים" } })} />
                {errors.password?.message}
            </div>
            <div>
                <label htmlFor="phone">פלאפון:</label>
                <input id="phone" type="text"{...register("phone")} />
                {errors.phone?.message}

            </div>
            <button type="submit" disabled={isPending}>{isPending ? "שולח...":"שליחה" }</button>
            {error && (<p>
                {error.response?.status === 409 ? "כתובת המייל כבר קיימת במערכת" : error.response?.data?.error ?? "ההרשמה נכשלה נסי שוב"}
            </p>)}
        </form>
    </>
}
export default Register