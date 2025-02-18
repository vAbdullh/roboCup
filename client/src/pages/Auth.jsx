// src/pages/AuthPage.jsx
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/setup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import { quantum } from 'ldrs'
import Header from "../components/Header";
const AuthPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            return navigate("/admin");
        }
    }, [user, navigate]);
    useEffect(() => {
        quantum.register();
    }, []);
    const handleLogin = async (e) => {
        e.preventDefault();
        const adminErrorMessages = [
            "Are you sure you're an admin? 🤔",
            "Access denied! Nice try, though. 😏",
            "Admins only! Move along, citizen. 👮‍♂️",
            "You're not on the admin list. Try again? 🙅‍♂️",
            "This action is for admins only. Elevate your rank first! 🚀",
            "Someone's trying to sneak in... Not today! 🔒",
            "You're not authorized to touch this button! 🔴",
            "Only the chosen ones may enter. You are... not one. 😎",
            "Admin access required. Maybe next time? 🚧",
            "Permission denied. Did you try asking nicely? 🙏",
            "Admin access required. Maybe if you say 'please'? 🚧",
        ];
        const tooManyRequestsErrorMessages = [
            "I get it, you’re excited, but login attempts are not a sport. Try again later. ⏳",
            "Hold up! You’ve reached your limit. Why not do something fun while you wait? 🎮",
            "Whoa there! The system says ‘Chill for a bit’. Login will be back soon. 🧘‍♂️",
            "Hey, easy now! You’ve done enough for today. Let the server catch its breath. 🏃‍♂️💨",
            "Login spamming detected! Maybe take a stroll? We’ll let you back in soon. 🚶‍♂️",
            "Whoa, steady there! The server needs a breather. Check back soon! ⏱️",
            "Hold tight! Too many tries in a row, but we’ll let you in soon. 🚧",
        ];
        try {
            setErr("");
            setLoading(true);
            await signInWithEmailAndPassword(auth, 'test@user.com', '11111111');
            // await signInWithEmailAndPassword(auth, email, password);
            navigate("/admin");
        } catch (error) {
            if (error.code === "auth/invalid-credential") {
                setErr(adminErrorMessages[Math.floor(Math.random() * adminErrorMessages.length)]);
            }
            // handle firebase limt error
            if (error.code === "auth/too-many-requests") {
                setErr(tooManyRequestsErrorMessages[Math.floor(Math.random() * tooManyRequestsErrorMessages.length)]);
                toast.error("Try again after 1 hour, server need to take some rest after your requests");
            }
            console.error("Error logging in:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <div className="w-screen h-dvh grid place-items-center">
                <form className="max-w-lg w-96  md:w-full mx-auto px-10" onSubmit={handleLogin}>
                    <div className="my-5 text-center">
                        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-black md:text-5xl lg:text-5xl">Welcome Back!</h1>
                        <p className="text-gray-600">Log in to continue where you left off.</p>
                    </div>
                    <p className={`min-h-6 text-red-600 my-2`}>{err}</p>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="email" value={email}
                            onChange={(e) => setEmail(e.target.value)} id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="password" value={password}
                            onChange={(e) => setPassword(e.target.value)} id="floating_password" className=" block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                    </div>
                    <button type="submit"
                        disabled={loading}
                        className={`text-white font-bold h-12 bg-[#263741] focus:outline-none rounded-lg text-sm w-full px-5 py-2.5 text-center translate-all transform duration-300 ${loading ? 'cursor-progress' : 'cursor-pointer hover:bg-[#213038]'}`}>
                        {loading ? <l-quantum
                            size="25"
                            speed="1.75"
                            color="white"
                        ></l-quantum> : 'Login'}
                    </button>
                </form>
                <button className="bg-blue-500 text-white p-3 " onClick={handleLogin}>Fast login</button>
            </div>
        </>
    );
};

export default AuthPage;