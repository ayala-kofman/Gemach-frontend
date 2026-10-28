import { useForm } from "react-hook-form"
import { useAuth } from "../hooks/useAuth"
import type { LoginRequest } from "../types/auth";
import { useNavigate } from "react-router-dom"
import { authApi } from "../api/authApi";


const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginRequest>();
    const { login } = useAuth();
    const navigate = useNavigate();
    const onSubmit=async(data:LoginRequest)=>{
        const response=await authApi.login(date);
        login(response)
        navigate("/");
    }

    return <form onSubmit={handleSubmit(onSubmit)}>
        <div>
            <label htmlFor="email">מייל</label>
            <input id="email" type="email" {...register("email", { required: "יש להזין כתובת מייל ", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "כתובת מייל אינה תקינה" } })} />
            {errors.email?.message}
        </div>
        <div>
            <label htmlFor="password">סיסמה</label>
            <input id="password" type="text" {...register("password", { required: "יש להזין סיסמה ", minLength: { value: 8, message: "יש להזין לפחות 8 תווים" } })} />
            {errors.password?.message}
        </div>
        <button type="submit">התחבר</button>
    </form>
}
export default Login