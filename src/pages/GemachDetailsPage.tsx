import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createItem, deleteItem } from "../api/itemApi";
import { useAuth } from "../hooks/useAuth";
import type { ItemRequest } from "../types/itemRequest";
import { getGemachById, getGemachItems } from "../api/gemachApi"


const GemachDetails = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const isManager = user?.id === gemach?.managerId;
    const [showAddItem, setShowAddItem] = useState(false);

    const { id } = useParams()
    const gemachId = Number(id)
    const { register, handleSubmit, reset, formState: { errors } } = useForm<ItemRequest>();

    const { data: gemach, isLoading: gemachLoading } = useQuery({
        queryKey: ["gemach", gemachId],
        queryFn: () => getGemachById(gemachId),
    });
    const { data: items, isLoading: itemsLoading } = useQuery({
        queryKey: ["items", gemachId],
        queryFn: () => getGemachItems(gemachId),
    });
    const addItemMutation = useMutation({
        mutationFn: (data: ItemRequest) => createItem(gemachId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["items", gemachId] });
            reset();
            setShowAddItem(false);
        },
    });
    const deleteItemMutation = useMutation({
        mutationFn: (itemId: number) => deleteItem(itemId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["items", gemachId] }),
    });

    if (gemachLoading || itemsLoading) return <div>טוען...</div>;
    if (!gemach) return <div>גמ"ח לא נמצא</div>;
    return (
        <div>
            <h1>{gemach.name}</h1>
            <p>עיר: {gemach.city}</p>
            <p>כתובת: {gemach.address}</p>
            <p>טלפון: {gemach.phone}</p>
            <p>קטגוריה: {gemach.category}</p>
            {gemach.openingHours && <p>שעות פעילות: {gemach.openingHours}</p>}
            {gemach.description && <p>תיאור: {gemach.description}</p>}

            <h2>חפצים</h2>
            {items?.length === 0 ? (<p>אין חפצין</p>) : (
                <ul>
                    {items?.map((item) => (<li key={item.id}>
                        <strong>{item.name}</strong>-{item.category}
                        <span>|{item.isAvailable ? `זמין(${item.availableQuantity})` : "מושאל"}</span>
                        {isManager && (<button onClick={() => deleteItemMutation.mutate(item.id)}>מחק</button>)}
                    </li>))}
                </ul>)}
            {isManager && (
                <div>
                    <button onClick={() => setShowAddItem(!showAddItem)}>
                        {showAddItem ? "ביטול" : "+ הוסף חפץ"}
                    </button>
                    {showAddItem && (
                        <form onSubmit={handleSubmit((data) => addItemMutation.mutate(data))}>
                            <input {...register("name", { required: "שדה חובה" })} placeholder="שם חפץ" />
                            {errors.name && <p>{errors.name.message}</p>}
                            <input type="number" {...register("totalQuantity", { required: "שדה חובה", valueAsNumber: true, min: 1 })} placeholder="כמות" />
                            <input {...register("category", { required: "שדה חובה" })} placeholder="קטגוריה" />
                            <input {...register("description")} placeholder="תיאור (רשות)" />
                            <button type="submit" disabled={addItemMutation.isPending}>הוסף</button>
                        </form>
                    )}
                </div>
            )}

            {isManager && (<button onClick={() => navigate(`/gemachim/${gemachId}/edit`)}>ערוך גמ"ח</button>)}

        </div>);
};


export default GemachDetails