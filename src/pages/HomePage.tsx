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

    if (isLoading) return <div>טוען...</div>;

    return (
        <div>
            <h1>מאגר הגמ"חים</h1>
            <input type="text" placeholder="חיפוש..." value={q}
                onChange={(e) => { setQ(e.target.value); setPage(1); }} />
            <input type="text" placeholder="עיר" value={city}
                onChange={(e) => { setCity(e.target.value); setPage(1); }} />

            <select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }}>
                <option value="">כל הקטגוריות</option>
                {categories?.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>))}
            </select>
            <select value={sort} onChange={(e) => setSort(e.target.value as "name" | "newest")}>
                <option value="name">לפי שם</option>
                <option value="newest">חדשים קודם</option>
            </select>
            <ul>
                {data?.data.map((gemach) => (
                    <li key={gemach.id}>
                        <strong>{gemach.name}</strong> — {gemach.city} — {gemach.category}
                        <button onClick={() => navigate(`/gemachim/${gemach.id}`)}>פרטים</button>
                    </li>))}
            </ul>
            <div>
                <button disabled={page === 1} onClick={() => setPage(page - 1)}>הקודם</button>
                <span> עמוד {page} מתוך {data?.totalPages} </span>
                <button disabled={page === data?.totalPages} onClick={() => setPage(page + 1)}>הבא</button>
            </div>
        </div>
    );
};
export default HomePage