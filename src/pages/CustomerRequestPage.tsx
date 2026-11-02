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

    if (isLoading) return <div>טוען...</div>;

    return (
        <div>
            <h1>בקשה לפתוח גמ"ח</h1>

            {lastRequest && (
                <div>
                    <h2>סטטוס בקשה אחרונה</h2>
                    <p>תיאור: {lastRequest.description}</p>
                    <p>
                        סטטוס:{" "}
                        {lastRequest.status === "PENDING" && "ממתין לאישור"}
                        {lastRequest.status === "APPROVED" && "אושר!"}
                        {lastRequest.status === "REJECTED" && "נדחה"}
                    </p>
                </div>
            )}

            {!hasPending && (
                <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
                    <h2>שליחת בקשה חדשה</h2>
                    <div>
                        <label>תאר את הגמ"ח שברצונך לפתוח:</label>
                        <textarea
                            {...register("description", {
                                required: "שדה חובה",
                                minLength: { value: 3, message: "תיאור קצר מדי" },
                                maxLength: { value: 500, message: "תיאור ארוך מדי" },
                            })}
                        />
                        {errors.description && <p>{errors.description.message}</p>}
                    </div>
                    <button type="submit" disabled={mutation.isPending}>
                        {mutation.isPending ? "שולח..." : "שלח בקשה"}
                    </button>
                    {mutation.isError && <p>שגיאה בשליחה, נסי שוב</p>}
                </form>
            )}

            {hasPending && <p>יש לך בקשה ממתינה. לא ניתן לשלוח בקשה נוספת עד לקבלת החלטה.</p>}
        </div>
    );
};

export default CustomerRequestPage;
