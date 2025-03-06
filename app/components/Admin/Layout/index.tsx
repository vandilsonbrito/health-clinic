"use client"
import Link from "next/link"
import { usePathname } from 'next/navigation';
import { Grid, Users, Calendar, LogOut, UserPlus} from "lucide-react"
import type React from "react" 
import Image from "next/image"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/firebase/authContext";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: Grid },
  { href: "/admin/adicionar-profissional", label: "Cadastrar Profissionais", icon: UserPlus },
  { href: "/admin/consultas-agendadas", label: "Consultas Agendadas", icon: Calendar },
  { href: "/admin/pacientes-cadastrados", label: "Pacientes Cadastrados", icon: Users },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { logout } = useAuth();


  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-[20%] xl:w-[21%] 2xl:w-[18%] bg-bluePrimary text-white flex-col">
        <div className="flex items-center justify-center p-4">
          <Image 
            src="/logo-clinia-saude-white.png" 
            alt="Logo Clínica Mais Saúde" 
            width={100}
            height={100}
            />
        </div>
        <nav className="flex-1 pt-6">
          <ul className="space-y-5 px-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-2 p-3 rounded-lg hover:bg-blueSecundary transition-colors",
                    pathname === item.href && "bg-[#2ea7e3]",
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-semibold">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4">
          <Button 
            onClick={() => logout()}
            variant="outline" 
            className="w-full text-blueSecundary font-bold border-white hover:bg-blueSecundary hover:text-white">
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-8 overflow-auto">{children}</main>
    </div>
  )
}

