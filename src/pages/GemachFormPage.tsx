import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getGemachById, createGemach, upDataGemach, getCategories } from "../api/gemachApi";
import type { gemachRequest } from "../types/gemachRequest";
import { useEffect } from "react";

const GemachForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;
    const gemachId = Number(id);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<gemachRequest>();
    const { data: gemachData } = useQuery({
        queryKey: ["gemach", gemachId],
        queryFn: () => getGemachById(gemachId),
        enabled: isEdit,
    });
    useEffect(() => {
        if (gemachData) reset(gemachData);
    }, [gemachData,reset]);
    const { data: categories } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });
    const mutation = useMutation({
        mutationFn: (data: gemachRequest) =>
            isEdit ? upDataGemach(gemachId, data) : createGemach(data),
        onSuccess: (data) => navigate(`/gemachim/${data.id}`),
    });

    return (
        <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
            <h1>{isEdit ? "עריכת גמ\"ח" : "הוספת גמ\"ח"}</h1>
            <div>
                <label>שם:</label>
                <input {...register("name", { required: "שדה חובה" })} />
                {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div>
                <label>עיר:</label>
                <input {...register("city", { required: "שדה חובה" })} />
                {errors.city && <p>{errors.city.message}</p>}
            </div>
            <div>
                <label>כתובת:</label>
                <input {...register("address", { required: "שדה חובה" })} />
                {errors.address && <p>{errors.address.message}</p>}
            </div>
            <div>
                <label>טלפון:</label>
                <input {...register("phone", { required: "שדה חובה" })} />
                {errors.phone && <p>{errors.phone.message}</p>}
            </div>
            <div>
                <label>קטגוריה:</label>
                <select {...register("category", { required: "שדה חובה" })}>
                    <option value="">בחר קטגוריה</option>
                    {categories?.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                {errors.category && <p>{errors.category.message}</p>}
            </div>
            <div>
                <label>שעות פעילות:</label>
                <input {...register("openingHours")} />
            </div>
            <div>
                <label>תיאור:</label>
                <textarea {...register("description")} />
            </div>
            <button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "שומר..." : isEdit ? "שמור שינויים" : "הוסף גמ\"ח"}
            </button>
        </form>
    );
};

export default GemachForm;
