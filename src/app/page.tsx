"use client"

import { useState } from "react"
import { Heart, Mail, User, Phone, MapPin, Briefcase, Instagram, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

const niches = ["Moda", "Fitness", "Beleza", "Tecnologia", "Gastronomia", "Viagem", "Games", "Lifestyle", "Educação", "Negócios"]

export default function Home() {
  const [accountType, setAccountType] = useState<"influencer" | "client">("influencer")
  const [step, setStep] = useState<"form" | "verification" | "success">("form")
  const [isVerifying, setIsVerifying] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    niche: "",
    instagramHandle: "",
    tiktokHandle: "",
    companyName: "",
    budget: ""
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSocialLogin = (platform: "instagram" | "tiktok") => {
    setIsVerifying(true)
    // Simulação de verificação
    setTimeout(() => {
      setIsVerifying(false)
      setStep("verification")
      setTimeout(() => {
        setStep("success")
      }, 2000)
    }, 1500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsVerifying(true)
    // Simulação de envio de email de verificação
    setTimeout(() => {
      setIsVerifying(false)
      setStep("verification")
    }, 1500)
  }

  const handleVerificationComplete = () => {
    setStep("success")
  }

  if (step === "verification") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <Mail className="w-10 h-10 text-purple-600 animate-pulse" />
              </div>
              <h2 className="text-2xl font-bold">Verificando seu email</h2>
              <p className="text-gray-600">
                Enviamos um link de verificação para <strong>{formData.email}</strong>
              </p>
              <p className="text-sm text-gray-500">
                Clique no link do email para confirmar sua conta
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Aguardando confirmação...</span>
              </div>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleVerificationComplete}
              >
                Simular Verificação (Demo)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (step === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold">Conta verificada com sucesso!</h2>
              <p className="text-gray-600">
                Bem-vindo ao My Influencer, {formData.name}!
              </p>
              <div className="space-y-2">
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  {accountType === "influencer" ? "Influenciador" : "Cliente"}
                </Badge>
                <p className="text-sm text-gray-500">
                  Sua conta foi criada e verificada
                </p>
              </div>
              <Button 
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                onClick={() => window.location.href = "/dashboard"}
              >
                Ir para o Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" fill="white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                My Influencer
              </h1>
              <p className="text-xs text-gray-500">Conectando marcas e criadores</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Crie sua conta
          </h2>
          <p className="text-gray-600">
            Junte-se à maior plataforma de matchmaking entre influenciadores e marcas
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <Tabs value={accountType} onValueChange={(value) => setAccountType(value as "influencer" | "client")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="influencer">Sou Influenciador</TabsTrigger>
                <TabsTrigger value="client">Sou Cliente/Marca</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>

          <CardContent>
            {/* Login Social */}
            <div className="space-y-3 mb-6">
              <p className="text-sm font-medium text-center text-gray-600">Conecte-se rapidamente com:</p>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="w-full h-12 gap-2 border-2 hover:border-purple-500 hover:bg-purple-50"
                  onClick={() => handleSocialLogin("instagram")}
                  disabled={isVerifying}
                >
                  {isVerifying ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Instagram className="w-5 h-5" />
                      <span className="font-semibold">Instagram</span>
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-12 gap-2 border-2 hover:border-pink-500 hover:bg-pink-50"
                  onClick={() => handleSocialLogin("tiktok")}
                  disabled={isVerifying}
                >
                  {isVerifying ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                      </svg>
                      <span className="font-semibold">TikTok</span>
                    </>
                  )}
                </Button>
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Ou preencha o formulário</span>
                </div>
              </div>
            </div>

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Campos Comuns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    {accountType === "influencer" ? "Nome Completo" : "Nome do Responsável"}
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      placeholder="Seu nome"
                      className="pl-10"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(11) 99999-9999"
                      className="pl-10"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Localização</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="location"
                      placeholder="Cidade, Estado"
                      className="pl-10"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Campos Específicos para Influenciador */}
              {accountType === "influencer" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="niche">Nicho de Atuação</Label>
                    <Select value={formData.niche} onValueChange={(value) => handleInputChange("niche", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione seu nicho" />
                      </SelectTrigger>
                      <SelectContent>
                        {niches.map(niche => (
                          <SelectItem key={niche} value={niche}>{niche}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="instagram">Instagram (opcional)</Label>
                      <div className="relative">
                        <Instagram className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="instagram"
                          placeholder="@seuusuario"
                          className="pl-10"
                          value={formData.instagramHandle}
                          onChange={(e) => handleInputChange("instagramHandle", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tiktok">TikTok (opcional)</Label>
                      <div className="relative">
                        <svg className="absolute left-3 top-3 h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                        </svg>
                        <Input
                          id="tiktok"
                          placeholder="@seuusuario"
                          className="pl-10"
                          value={formData.tiktokHandle}
                          onChange={(e) => handleInputChange("tiktokHandle", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Campos Específicos para Cliente */}
              {accountType === "client" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="company">Nome da Empresa</Label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="company"
                        placeholder="Nome da sua empresa"
                        className="pl-10"
                        value={formData.companyName}
                        onChange={(e) => handleInputChange("companyName", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="niche">Área de Interesse</Label>
                      <Select value={formData.niche} onValueChange={(value) => handleInputChange("niche", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a área" />
                        </SelectTrigger>
                        <SelectContent>
                          {niches.map(niche => (
                            <SelectItem key={niche} value={niche}>{niche}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="budget">Orçamento Mensal</Label>
                      <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o orçamento" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="500-1000">R$ 500 - R$ 1.000</SelectItem>
                          <SelectItem value="1000-2500">R$ 1.000 - R$ 2.500</SelectItem>
                          <SelectItem value="2500-5000">R$ 2.500 - R$ 5.000</SelectItem>
                          <SelectItem value="5000+">R$ 5.000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </>
              )}

              {/* Aviso de Verificação */}
              <div className="flex items-start gap-2 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Verificação de Autenticidade</p>
                  <p>
                    Enviaremos um email de verificação para confirmar sua identidade. 
                    {accountType === "influencer" && " Você também pode conectar suas redes sociais para verificação automática."}
                  </p>
                </div>
              </div>

              {/* Botão de Envio */}
              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                disabled={isVerifying}
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Criando conta...
                  </>
                ) : (
                  "Criar Conta"
                )}
              </Button>

              <p className="text-xs text-center text-gray-500">
                Ao criar uma conta, você concorda com nossos Termos de Serviço e Política de Privacidade
              </p>
            </form>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Verificação Automática</h3>
              <p className="text-sm text-gray-600">
                Conecte suas redes sociais para verificação instantânea
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="font-semibold mb-2">Matches Perfeitos</h3>
              <p className="text-sm text-gray-600">
                Algoritmo inteligente conecta você com parceiros ideais
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Briefcase className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">Negociações Seguras</h3>
              <p className="text-sm text-gray-600">
                Plataforma segura para fechar parcerias profissionais
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
