
import { useNavigate } from "react-router-dom"
import { UserCog, LogOut, Calendar, Clipboard, ChartArea } from "lucide-react"
import { useLocation, Link } from "react-router-dom"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
    SidebarFooter
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/context/auth/useAuth"
// Menu items.
const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: ChartArea,
        roles: ["admin", "superadmin",],
    },
    {
        title: "Calendario",
        url: "/calendario",
        icon: Calendar,
        roles: ["admin", "superadmin",],
    },
    {
        title: "Pacientes",
        url: "/pacientes",
        icon: UserCog,
        roles: ["admin", "superadmin",],
    },
    {
        title: "Historial Clínico",
        url: "/historial",
        icon: Clipboard,
        roles: ["admin", "superadmin",],
    },
]


export function AppSidebar() {
    const location = useLocation()
    const { user, profile } = useAuth()
    const navigate = useNavigate()

    const { signOut } = useAuth();

    const handleLogout = async () => {
        await signOut();
        navigate("/login");
    };

    // 🔹 Mostrar solo los ítems que correspondan al rol actual
    if (!profile) return null;

    const filteredItems = items.filter(item =>
        item.roles.includes(profile.role)
    );
    
    return (

        <Sidebar className="p-2 py-6 shadow-sm border bg-white rounded-r-3xl min-h-[calc(100dvh-10rem)] flex flex-col justify-between">
            <SidebarHeader className="flex items-center my-4 gap-6 ">
                <Avatar className="size-16 ring-2 ring-offset-4 ring-primary">
                    <AvatarImage src={user?.user_metadata.avatar_url} />
                    <AvatarFallback>
                        {user?.user_metadata.picture?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-center gap-1">
                    <span className="text-sm font-medium">{profile?.full_name}</span>
                    <span className="text-xs text-gray-400">{user?.email}</span>
                </div>
            </SidebarHeader>

            <SidebarContent className="h-full">
                <SidebarGroup className="p-4 gap-4!">
                    <SidebarGroupContent>
                        <SidebarMenu className="flex gap-2">
                            {filteredItems.map((item) => {
                                const isActive =
                                    location.pathname === item.url ||
                                    location.pathname.startsWith(`${item.url}/`)

                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            className={cn(
                                                "px-4 py-2 tracking-wider transition-colors text-sm h-9",
                                                isActive
                                                    ? "bg-primary border text-white hover:bg-primary/90! hover:text-white"
                                                    : "hover:border text-foreground/70 hover:text-foreground",
                                            )}
                                        >
                                            <Link to={item.url}>
                                                <item.icon className="mr-2 h-4 w-4" />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="p-4">
                <Button
                    variant={"outline"}
                    onClick={handleLogout}
                    className="text-primary hover:text-primary hover:scale-105 cursor-pointer text-sm!">
                    <LogOut className="size-4" />
                    Cerrar sesión
                </Button>
            </SidebarFooter>
        </Sidebar>
    )
}
