import { PlusSquare, LayoutDashboard,Group, ListIcon } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar"
import { NavLink } from "react-router-dom"

export function AppSidebar({ role }) {
    const items = []
    if (role === "EMPLOYER") {
        items.push(
            {
                title: "Dashboard",
                url: "/employer",
                icon: LayoutDashboard,
            },
            {
                title: "Add Job",
                url: "/employer/add-job",
                icon: PlusSquare,
            },
            {
                title: "Manage jobs",
                url: "/employer/jobs",
                icon: ListIcon,
            },
            
        )
    } else if (role === "ADMIN") {
        items.push(
            {
                title: "Dashboard",
                url: "/admin",
                icon: LayoutDashboard,
            },
            {
                title: "Employers",
                url: "/admin/employers",
                icon: Group,
            },
        )
    }
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>JobPortal Admin</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <NavLink to={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
