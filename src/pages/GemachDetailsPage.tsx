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
    const isManager = user?.id === gemach?.managerId;
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

    if (gemachLoading || itemsLoading) return <div className="text-center py-12 text-gray-500">טוען...</div>;
    if (!gemach) return <div className="text-center py-12 text-gray-500">גמ"ח לא נמצא</div>;
    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="bg-white rounded-xl shadow p-6 mb-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-dark">{gemach.name}</h1>
                        <span className="inline-block bg-cream text-dark text-sm px-2 py-1 rounded mt-1">{gemach.category}</span>
                    </div>
                    {isManager && (
                        <button onClick={() => navigate(`/gemachim/${gemachId}/edit`)}
                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded hover:bg-gray-200 text-sm">
                            ✏️ ערוך
                        </button>
                    )}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-gray-600">
                    <p>📍 {gemach.city} — {gemach.address}</p>
                    <p>📞 {gemach.phone}</p>
                    {gemach.openingHours && <p>🕐 {gemach.openingHours}</p>}
                    {gemach.description && <p className="col-span-2">{gemach.description}</p>}
                </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">חפצים</h2>
                {items?.length === 0 ? (
                    <p className="text-gray-400">אין חפצים</p>
                ) : (
                    <ul className="divide-y">
                        {items?.map((item) => (
                            <li key={item.id} className="py-3 flex justify-between items-center">
                                <div>
                                    <span className="font-medium text-gray-800">{item.name}</span>
                                    <span className="text-gray-400 text-sm mr-2">· {item.category}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`text-sm px-2 py-1 rounded ${item.isAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                                        {item.isAvailable ? `זמין (${item.availableQuantity})` : "מושאל"}
                                    </span>
                                    {isManager && (
                                        <button onClick={() => deleteItemMutation.mutate(item.id)}
                                            className="text-red-500 hover:text-red-700 text-sm">מחק</button>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                {isManager && (
                    <div className="mt-4">
                        <button onClick={() => setShowAddItem(!showAddItem)}
                            className="bg-primary text-cream px-4 py-2 rounded-lg hover:bg-secondary text-sm">
                            {showAddItem ? "ביטול" : "+ הוסף חפץ"}
                        </button>
                        {showAddItem && (
                            <form onSubmit={handleSubmit((data) => addItemMutation.mutate(data))} className="mt-4 grid grid-cols-2 gap-3">
                                <div>
                                    <input {...register("name", { required: "שדה חובה" })} placeholder="שם חפץ"
                                        className="w-full border rounded px-3 py-2" />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                                </div>
                                <div>
                                    <input {...register("category", { required: "שדה חובה" })} placeholder="קטגוריה"
                                        className="w-full border rounded px-3 py-2" />
                                    {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
                                </div>
                                <div>
                                    <input type="number" {...register("totalQuantity", { required: "שדה חובה", valueAsNumber: true, min: 1 })} placeholder="כמות"
                                        className="w-full border rounded px-3 py-2" />
                                </div>
                                <div>
                                    <input {...register("description")} placeholder="תיאור (רשות)"
                                        className="w-full border rounded px-3 py-2" />
                                </div>
                                <button type="submit" disabled={addItemMutation.isPending}
                                    className="col-span-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50">
                                    {addItemMutation.isPending ? "שומר..." : "הוסף חפץ"}
                                </button>
                            </form>
                        )}
                    </div>
                )}
            </div>
        </div>);
};


export default GemachDetails