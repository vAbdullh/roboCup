// src/pages/AdminDashboard.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import Teams from "../components/admin/Teams";
import Matches from "../components/admin/Matches";
import Logs from "../components/admin/Logs";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState('Teams');

    return (
        <div className="bg min-h-screen flex flex-col xl:flex-row bg-[#f6f8fd]">
            <section className="p-4 xl:p-10 w-full mt-14 xl:mt-0 xl:ml-64 inline-block ">
                <h1
                    key={selected} className="text-3xl font-bold fade-in my-3 ">
                    Manage {selected}
                </h1>
                {selected === 'Teams' && <Teams />}
                {selected === 'Matches' && <Matches />}
                {selected === 'Logs' && <Logs />}
            </section>
            <Sidebar selected={selected} setSelected={setSelected} />
        </div>
    );
};

export default AdminDashboard;