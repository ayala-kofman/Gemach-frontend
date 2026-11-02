import { useQuery } from "@tanstack/react-query";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { getGemachs,getCategories } from "../api/gemachApi";


const HomePage = () => {

    const [q, setQ] = useState("");
    const [city, setCity] = useState("");
    const [category, setCategory] = useState("");
    const [sort, setSort] = useState<"name" | "newest">("name");
    const [page, setPage] = useState(1);
    const navigate = useNavigate()

    const { data, isLoading } = useQuery({
        queryKey: ["gemachim", q, city, category, sort, page],
        queryFn: () => getGemachs({ q, city, category, sort, page }),

    })
    const { data: categories } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-blue-700 mb-6">מאגר הגמ"חים</h1>

            <div className="bg-white rounded-xl shadow p-4 mb-6 flex flex-wrap gap-3">
                <input type="text" placeholder="חיפוש לפי שם..." value={q}
                    onChange={(e) => { setQ(e.target.value); setPage(1); }}
                    className="border rounded px-3 py-2 flex-1 min-w-40" />
                <input type="text" placeholder="עיר" value={city}
                    onChange={(e) => { setCity(e.target.value); setPage(1); }}
                    className="border rounded px-3 py-2 w-36" />
                <select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }}
                    className="border rounded px-3 py-2">
                    <option value="">כל הקטגוריות</option>
                    {categories?.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>))}
                </select>
                <select value={sort} onChange={(e) => setSort(e.target.value as "name" | "newest")}
                    className="border rounded px-3 py-2">
                    <option value="name">לפי שם</option>
                    <option value="newest">חדשים קודם</option>
                </select>
            </div>

            {isLoading ? (
                <div className="text-center py-12 text-gray-500">טוען...</div>
            ) : data?.data.length === 0 ? (
                <div className="text-center py-12 text-gray-500">לא נמצאו גמ"חים</div>
            ) : (
                <div className="grid gap-4">
                    {data?.data.map((gemach) => (
                        <div key={gemach.id} className="bg-white rounded-xl shadow p-4 flex justify-between items-center hover:shadow-md transition">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">{gemach.name}</h2>
                                <p className="text-gray-500 text-sm">{gemach.city} · {gemach.category}</p>
                                <p className="text-gray-400 text-sm">{gemach.itemsCount} חפצים</p>
                            </div>
                            <button onClick={() => navigate(`/gemachim/${gemach.id}`)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                                פרטים
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex justify-center gap-4 mt-6 items-center">
                <button disabled={page === 1} onClick={() => setPage(page - 1)}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-40 hover:bg-gray-300">הקודם</button>
                <span className="text-gray-600">עמוד {page} מתוך {data?.totalPages ?? 1}</span>
                <button disabled={page === data?.totalPages} onClick={() => setPage(page + 1)}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-40 hover:bg-gray-300">הבא</button>
            </div>
        </div>
    );
};
export default HomePage