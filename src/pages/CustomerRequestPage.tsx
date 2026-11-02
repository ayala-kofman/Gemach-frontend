import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMyRequests, createRequest } from "../api/adminApi";

interface RequestForm {
    description: string;
}

const CustomerRequestPage = () => {
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<RequestForm>();

    const { data: myRequests, isLoading } = useQuery({
        queryKey: ["my-requests"],
        queryFn: getMyRequests,
    });

    const mutation = useMutation({
        mutationFn: (data: RequestForm) => createRequest(data.description),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["my-requests"] });
            reset();
        },
    });

    const lastRequest = myRequests?.[myRequests.length - 1];
    const hasPending = lastRequest?.status === "PENDING";

    if (isLoading) return <div className="text-center py-12 text-gray-500">טוען...</div>;

    return (
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-blue-700 mb-6">בקשה לפתוח גמ"ח</h1>

            {lastRequest && (
                <div className={`rounded-xl p-4 mb-6 ${
                    lastRequest.status === "APPROVED" ? "bg-green-50 border border-green-200" :
                    lastRequest.status === "REJECTED" ? "bg-red-50 border border-red-200" :
                    "bg-yellow-50 border border-yellow-200"
                }`}>
                    <p className="font-semibold text-gray-800 mb-1">סטטוס בקשה אחרונה</p>
                    <p className="text-gray-600 text-sm mb-2">{lastRequest.description}</p>
                    <span className={`text-sm font-medium ${
                        lastRequest.status === "APPROVED" ? "text-green-700" :
                        lastRequest.status === "REJECTED" ? "text-red-600" :
                        "text-yellow-700"
                    }`}>
                        {lastRequest.status === "PENDING" && "⏳ ממתין לאישור"}
                        {lastRequest.status === "APPROVED" && "✅ אושר!"}
                        {lastRequest.status === "REJECTED" && "❌ נדחה"}
                    </span>
                </div>
            )}

            {!hasPending && (
                <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="bg-white rounded-xl shadow p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">שליחת בקשה חדשה</h2>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">תאר את הגמ"ח שברצונך לפתוח</label>
                        <textarea
                            {...register("description", {
                                required: "שדה חובה",
                                minLength: { value: 3, message: "תיאור קצר מדי" },
                                maxLength: { value: 500, message: "תיאור ארוך מדי" },
                            })}
                            className="w-full border rounded-lg px-3 py-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                    </div>
                    {mutation.isError && <p className="text-red-500 text-sm mb-3">שגיאה בשליחה, נסי שוב</p>}
                    <button type="submit" disabled={mutation.isPending}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition">
                        {mutation.isPending ? "שולח..." : "שלח בקשה"}
                    </button>
                </form>
            )}

            {hasPending && (
                <p className="text-gray-500 text-center bg-white rounded-xl shadow p-6">
                    יש לך בקשה ממתינה. לא ניתן לשלוח בקשה נוספת עד לקבלת החלטה.
                </p>
            )}
        </div>
    );
};

export default CustomerRequestPage;
