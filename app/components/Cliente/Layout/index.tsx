"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import { CalendarPlus, CalendarCheck, UserCog, LogOut } from "lucide-react"
import type React from "react"
import Image from "next/image"
import { Toaster } from "react-hot-toast"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/firebase/authContext"
import ProtectedMobileHeader from "../../ProtectedMobileHeader"

const navItems = [
  { href: "/cliente/agendar-consulta", label: "Agendar Consulta", icon: CalendarPlus },
  { href: "/cliente/minhas-consultas", label: "Minhas Consultas", icon: CalendarCheck },
  { href: "/cliente/atualizar-perfil", label: "Atualizar Perfil", icon: UserCog },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { userAuth, authLoading, logout } = useAuth()

  // Área do cliente exige login: sem usuário autenticado, volta para o sign-in.
  useEffect(() => {
    if (!authLoading && !userAuth) {
      router.push("/sign-in")
    }
  }, [userAuth, authLoading, router])

  if (authLoading || !userAuth) {
    return (
      <div className="w-full min-h-screen flex flex-col justify-center items-center">
        <p className="text-lg">Carregando...</p>
      </div>
    )
  }

  return (
    <>
      <Toaster position="top-center" />
      <div className="lg:hidden">
        <ProtectedMobileHeader userRole="user" />
      </div>
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
    </>
  )
}
