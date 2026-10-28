import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getMyGemachim } from "../api/gemachApi";

const MyGemachim = () => {
    const navigate = useNavigate();
    const { data: gemachim, isLoading } = useQuery({
        queryKey: ["my-gemachim"],
        queryFn: getMyGemachim,
    });
    if (isLoading) return <div>טוען...</div>;

    return (
        <div>
            <h1>הגמ"חים שלי</h1>
            <button onClick={() => navigate("/gemachim/new")}>+ הוסף גמ"ח</button>
            {gemachim?.length === 0 ? (
                <p>אין גמ"חים עדיין</p>
            ) : (
                <ul>
                    {gemachim?.map((gemach) => (
                        <li key={gemach.id}>
                            <strong>{gemach.name}</strong> — {gemach.city}
                            <button onClick={() => navigate(`/gemachim/${gemach.id}`)}>פרטים</button>
                            <button onClick={() => navigate(`/gemachim/${gemach.id}/edit`)}>ערוך</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyGemachim;
