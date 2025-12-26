import { useAuth } from "@/context/auth/useAuth";

export default function DashboardPage() {
    const { signOut } = useAuth();
    return (
        <div>
            <h2>Admin Dashboard</h2>
            <p>Welcome to the admin dashboard!</p>
            <button onClick={signOut}>Sign Out</button>
        </div>
    );
}