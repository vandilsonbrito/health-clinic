"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Layout from "../../components/Cliente/Layout"
import ProfileForm from "@/app/components/Cliente/Appointment/ProfileForm"

export default function UpdateProfile() {

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 md:text-3xl">Atualizar Perfil</h1>
        <Card>
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
          </CardHeader>
          <CardContent>
            <ProfileForm/>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

