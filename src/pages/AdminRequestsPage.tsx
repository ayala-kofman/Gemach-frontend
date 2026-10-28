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

    if (isLoading) return <div>טוען...</div>;

    const requests = data?.data ?? [];
    return (
        <div>
            <h1>בקשות ממתינות</h1>
            {requests.length === 0 ? (<p>אין בקשות ממתינות</p>) :
                (<ul>{requests.map((req) => (
                    <li key={req.id}>
                        <p>{req.user?.fullName} — {req.user?.email}</p>
                        <p>{req.description}</p>
                        <button onClick={() => approveMutation.mutate(req.id)}>אישור</button>
                        <button onClick={() => rejectMutation.mutate(req.id)}>דחייה</button>
                    </li>))}
                </ul>)}
        </div>
    );
};





export default AdminRequest