"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Layout from "../../components/Cliente/Layout"

export default function UpdateProfile() {
  const [profile, setProfile] = useState({
    name: "João da Silva",
    email: "joao.silva@example.com",
    phone: "(11) 98765-4321",
    address: "Rua das Flores, 123",
    birthDate: "1990-01-01",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você implementaria a lógica para atualizar o perfil
    console.log("Perfil atualizado:", profile)
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 md:text-3xl">Atualizar Perfil</h1>
        <Card>
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input id="name" name="name" value={profile.name} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" name="phone" value={profile.phone} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Input id="address" name="address" value={profile.address} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthDate">Data de Nascimento</Label>
                <Input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  value={profile.birthDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full md:w-auto bg-blueSecundary hover:bg-bluePrimary">
                Atualizar Perfil
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

