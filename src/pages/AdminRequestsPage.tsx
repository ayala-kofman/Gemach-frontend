import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getRequests, approveRequest, rejectRequest } from "../api/adminApi";

const AdminRequest = () => {
    const queryClient = useQueryClient()
    const { data, isLoading } = useQuery({
        queryKey: ["manager-requests"],
        queryFn: () => getRequests("PENDING"),
    })
    const approveMutation = useMutation({
        mutationFn: (id: number) => approveRequest(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["manager-requests"] }),
    });
    const rejectMutation = useMutation({
        mutationFn: (id: number) => rejectRequest(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["manager-requests"] }),
    });

    if (isLoading) return <div className="text-center py-12 text-gray-500">טוען...</div>;

    const requests = data?.data ?? [];
    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-dark mb-6">בקשות ממתינות</h1>
            {requests.length === 0 ? (
                <div className="bg-white rounded-xl shadow p-8 text-center text-gray-400">אין בקשות ממתינות</div>
            ) : (
                <div className="grid gap-4">
                    {requests.map((req) => (
                        <div key={req.id} className="bg-white rounded-xl shadow p-5">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-semibold text-gray-800">{req.user?.fullName}</p>
                                    <p className="text-gray-500 text-sm">{req.user?.email}</p>
                                </div>
                                <span className="text-gray-400 text-xs">{new Date(req.createdAt).toLocaleDateString("he-IL")}</span>
                            </div>
                            <p className="mt-3 text-gray-700 bg-gray-50 rounded p-3">{req.description}</p>
                            <div className="flex gap-3 mt-4">
                                <button onClick={() => approveMutation.mutate(req.id)}
                                    disabled={approveMutation.isPending || rejectMutation.isPending}
                                    className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50">
                                    אישור
                                </button>
                                <button onClick={() => rejectMutation.mutate(req.id)}
                                    disabled={approveMutation.isPending || rejectMutation.isPending}
                                    className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50">
                                    דחייה
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};





export default AdminRequest