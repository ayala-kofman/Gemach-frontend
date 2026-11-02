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

    const inputClass = "w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary";
    const labelClass = "block text-sm font-medium text-gray-700 mb-1";

    return (
        <div className="max-w-xl mx-auto p-6">
            <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="bg-white rounded-xl shadow p-6">
                <h1 className="text-2xl font-bold text-dark mb-6">{isEdit ? "עריכת גמ\"ח" : "הוספת גמ\"ח"}</h1>
                <div className="mb-4">
                    <label className={labelClass}>שם</label>
                    <input {...register("name", { required: "שדה חובה" })} className={inputClass} />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>
                <div className="mb-4">
                    <label className={labelClass}>עיר</label>
                    <input {...register("city", { required: "שדה חובה" })} className={inputClass} />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                </div>
                <div className="mb-4">
                    <label className={labelClass}>כתובת</label>
                    <input {...register("address", { required: "שדה חובה" })} className={inputClass} />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
                </div>
                <div className="mb-4">
                    <label className={labelClass}>טלפון</label>
                    <input {...register("phone", { required: "שדה חובה" })} className={inputClass} />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                </div>
                <div className="mb-4">
                    <label className={labelClass}>קטגוריה</label>
                    <select {...register("category", { required: "שדה חובה" })} className={inputClass}>
                        <option value="">בחר קטגוריה</option>
                        {categories?.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
                </div>
                <div className="mb-4">
                    <label className={labelClass}>שעות פעילות (רשות)</label>
                    <input {...register("openingHours")} className={inputClass} />
                </div>
                <div className="mb-6">
                    <label className={labelClass}>תיאור (רשות)</label>
                    <textarea {...register("description")} className={`${inputClass} h-24 resize-none`} />
                </div>
                <button type="submit" disabled={mutation.isPending}
                    className="w-full bg-primary text-cream py-2 rounded-lg hover:bg-secondary disabled:opacity-50 transition">
                    {mutation.isPending ? "שומר..." : isEdit ? "שמור שינויים" : "הוסף גמ\"ח"}
                </button>
            </form>
        </div>
    );
};

export default GemachForm;
