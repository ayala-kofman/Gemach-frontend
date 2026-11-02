import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getMyGemachim } from "../api/gemachApi";

const MyGemachim = () => {
    const navigate = useNavigate();
    const { data: gemachim, isLoading } = useQuery({
        queryKey: ["my-gemachim"],
        queryFn: getMyGemachim,
    });
    if (isLoading) return <div className="text-center py-12 text-gray-500">טוען...</div>;

    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-dark">הגמ"חים שלי</h1>
                <button onClick={() => navigate("/gemachim/new")}
                    className="bg-primary text-cream px-4 py-2 rounded-lg hover:bg-secondary">
                    + הוסף גמ"ח
                </button>
            </div>
            {gemachim?.length === 0 ? (
                <div className="bg-white rounded-xl shadow p-8 text-center text-gray-400">אין גמ"חים עדיין</div>
            ) : (
                <div className="grid gap-4">
                    {gemachim?.map((gemach) => (
                        <div key={gemach.id} className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
                            <div>
                                <h2 className="font-semibold text-gray-800">{gemach.name}</h2>
                                <p className="text-gray-500 text-sm">{gemach.city} · {gemach.category}</p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => navigate(`/gemachim/${gemach.id}`)}
                                    className="bg-primary text-cream px-3 py-1 rounded-lg hover:bg-secondary text-sm">
                                    פרטים
                                </button>
                                <button onClick={() => navigate(`/gemachim/${gemach.id}/edit`)}
                                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-200 text-sm">
                                    ערוך
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyGemachim;
