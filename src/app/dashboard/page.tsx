"use client"

import { useState } from "react"
import { Heart, MapPin, Users, Filter, Search, TrendingUp, MessageCircle, DollarSign, Instagram, Eye, ChevronLeft, ChevronRight, Bookmark, Calendar, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data de perfis - agora com vídeos e tempo de perfil
const mockProfiles = [
  {
    id: 1,
    name: "Ana Silva",
    type: "influencer",
    instagramHandle: "@anasilva.style",
    instagramUrl: "https://instagram.com/anasilva.style",
    avatar: "https://i.pravatar.cc/400?img=5",
    niche: "Moda",
    followers: "150K",
    monthlyViews: "2.5M",
    distance: 2.5,
    price: "R$ 500-1000",
    engagement: "8.5%",
    bio: "Criadora de conteúdo de moda sustentável. Amo colaborações autênticas!",
    tags: ["Moda", "Lifestyle", "Sustentabilidade"],
    profileAge: "2 anos",
    topVideos: [
      { title: "Look do dia #OOTD", views: "850K", thumbnail: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=600&fit=crop" },
      { title: "Moda Sustentável 101", views: "720K", thumbnail: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=600&fit=crop" }
    ]
  },
  {
    id: 2,
    name: "Carlos Mendes",
    type: "influencer",
    instagramHandle: "@carlosfit",
    instagramUrl: "https://instagram.com/carlosfit",
    avatar: "https://i.pravatar.cc/400?img=12",
    niche: "Fitness",
    followers: "320K",
    monthlyViews: "5.8M",
    distance: 5.8,
    price: "R$ 1000-2000",
    engagement: "12.3%",
    bio: "Personal trainer e atleta. Especialista em transformações reais.",
    tags: ["Fitness", "Saúde", "Motivação"],
    profileAge: "3 anos",
    topVideos: [
      { title: "Treino de Pernas Completo", views: "1.2M", thumbnail: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=600&fit=crop" },
      { title: "Transformação 90 dias", views: "980K", thumbnail: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=600&fit=crop" }
    ]
  },
  {
    id: 3,
    name: "Mariana Costa",
    type: "influencer",
    instagramHandle: "@mari.makeup",
    instagramUrl: "https://instagram.com/mari.makeup",
    avatar: "https://i.pravatar.cc/400?img=9",
    niche: "Beleza",
    followers: "89K",
    monthlyViews: "1.8M",
    distance: 1.2,
    price: "R$ 300-600",
    engagement: "15.7%",
    bio: "Maquiadora profissional. Adoro criar conteúdos criativos e tutoriais.",
    tags: ["Beleza", "Maquiagem", "Skincare"],
    profileAge: "1 ano",
    topVideos: [
      { title: "Maquiagem para Festa", views: "650K", thumbnail: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=600&fit=crop" },
      { title: "Skincare Rotina Noturna", views: "580K", thumbnail: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=600&fit=crop" }
    ]
  },
  {
    id: 4,
    name: "Tech Store SP",
    type: "client",
    instagramHandle: "@techstoresp",
    instagramUrl: "https://instagram.com/techstoresp",
    avatar: "https://i.pravatar.cc/400?img=60",
    niche: "Tecnologia",
    distance: 3.5,
    budget: "R$ 2000-5000",
    bio: "Loja de eletrônicos buscando influenciadores tech para reviews de produtos.",
    tags: ["Tecnologia", "Gadgets", "Reviews"]
  },
  {
    id: 5,
    name: "João Pedro",
    type: "influencer",
    instagramHandle: "@joao.chef",
    instagramUrl: "https://instagram.com/joao.chef",
    avatar: "https://i.pravatar.cc/400?img=15",
    niche: "Gastronomia",
    followers: "210K",
    monthlyViews: "3.2M",
    distance: 4.2,
    price: "R$ 800-1500",
    engagement: "10.2%",
    bio: "Chef e food blogger. Especializado em receitas práticas e deliciosas.",
    tags: ["Gastronomia", "Receitas", "Lifestyle"],
    profileAge: "4 anos",
    topVideos: [
      { title: "Receita de Lasanha Perfeita", views: "1.5M", thumbnail: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=600&fit=crop" },
      { title: "Sobremesa em 5 Minutos", views: "1.1M", thumbnail: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=600&fit=crop" }
    ]
  }
]

const niches = ["Todos", "Moda", "Fitness", "Beleza", "Tecnologia", "Gastronomia", "Viagem", "Games"]

export default function Dashboard() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [saved, setSaved] = useState<typeof mockProfiles>([])
  const [showFilters, setShowFilters] = useState(false)
  const [distance, setDistance] = useState([10])
  const [selectedNiche, setSelectedNiche] = useState("Todos")
  const [userType, setUserType] = useState<"influencer" | "client">("client")

  const currentProfile = mockProfiles[currentIndex]

  const handleNext = () => {
    if (currentIndex < mockProfiles.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setCurrentIndex(0)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else {
      setCurrentIndex(mockProfiles.length - 1)
    }
  }

  const handleSave = () => {
    if (currentProfile && !saved.find(p => p.id === currentProfile.id)) {
      setSaved([...saved, currentProfile])
    }
  }

  const handleMessage = () => {
    alert(`Iniciando conversa com ${currentProfile.name}...`)
  }

  const filteredProfiles = mockProfiles.filter(profile => {
    const nicheMatch = selectedNiche === "Todos" || profile.niche === selectedNiche
    const distanceMatch = profile.distance <= distance[0]
    const typeMatch = userType === "client" ? profile.type === "influencer" : true
    return nicheMatch && distanceMatch && typeMatch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
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
            
            <div className="flex items-center gap-2">
              <Select value={userType} onValueChange={(value: "influencer" | "client") => setUserType(value)}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="client">Sou Cliente</SelectItem>
                  <SelectItem value="influencer">Sou Influencer</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                variant={showFilters ? "default" : "outline"}
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <Tabs defaultValue="discover" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="discover" className="gap-2">
              <Search className="w-4 h-4" />
              Descobrir
            </TabsTrigger>
            <TabsTrigger value="saved" className="gap-2">
              <Bookmark className="w-4 h-4" />
              Salvos ({saved.length})
            </TabsTrigger>
            <TabsTrigger value="stats" className="gap-2">
              <TrendingUp className="w-4 h-4" />
              Estatísticas
            </TabsTrigger>
          </TabsList>

          {/* Filtros */}
          {showFilters && (
            <Card className="mb-6 border-2">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Distância máxima: {distance[0]} km
                    </label>
                    <Slider
                      value={distance}
                      onValueChange={setDistance}
                      max={50}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Nicho</label>
                    <Select value={selectedNiche} onValueChange={setSelectedNiche}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {niches.map(niche => (
                          <SelectItem key={niche} value={niche}>{niche}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tab: Descobrir */}
          <TabsContent value="discover" className="space-y-4">
            {currentProfile ? (
              <div className="flex flex-col items-center gap-4">
                <Card className="w-full max-w-md overflow-hidden">
                  <div className="relative">
                    {/* @ do perfil no topo */}
                    <div className="absolute top-0 left-0 right-0 z-20 p-4 bg-gradient-to-b from-black/60 to-transparent">
                      <a
                        href={currentProfile.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 text-white px-4 py-2 rounded-full hover:scale-105 transition-transform shadow-xl font-bold"
                      >
                        <Instagram className="w-5 h-5" />
                        <span>{currentProfile.instagramHandle}</span>
                      </a>
                    </div>

                    {/* Foto de perfil centralizada */}
                    <div className="w-full h-[320px] bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center pt-16">
                      <img
                        src={currentProfile.avatar}
                        alt={currentProfile.name}
                        className="w-56 h-56 rounded-full object-cover border-8 border-white shadow-2xl"
                      />
                    </div>

                    {/* Informações abaixo da foto */}
                    {currentProfile.type === "influencer" && (
                      <div className="bg-white p-6">
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1 text-purple-600 mb-1">
                              <Users className="w-5 h-5" />
                            </div>
                            <p className="text-2xl font-bold text-gray-900">{currentProfile.followers}</p>
                            <p className="text-xs text-gray-500">Seguidores</p>
                          </div>
                          
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1 text-pink-600 mb-1">
                              <Eye className="w-5 h-5" />
                            </div>
                            <p className="text-2xl font-bold text-gray-900">{currentProfile.monthlyViews}</p>
                            <p className="text-xs text-gray-500">Views/mês</p>
                          </div>
                          
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1 text-orange-600 mb-1">
                              <TrendingUp className="w-5 h-5" />
                            </div>
                            <p className="text-2xl font-bold text-gray-900">{currentProfile.engagement}</p>
                            <p className="text-xs text-gray-500">Engajamento</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="p-6 bg-gradient-to-t from-black/90 via-black/70 to-transparent text-white">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h2 className="text-3xl font-bold mb-1">{currentProfile.name}</h2>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4" />
                            <span>{currentProfile.distance} km de distância</span>
                          </div>
                        </div>
                        <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                          {currentProfile.type === "influencer" ? "Influencer" : "Cliente"}
                        </Badge>
                      </div>
                      
                      <p className="text-sm mb-3 text-white/90">{currentProfile.bio}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {currentProfile.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="bg-white/10 backdrop-blur-sm text-white border-white/20">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      {/* NOVA SEÇÃO: Vídeos + Nicho + Tempo de Perfil */}
                      {currentProfile.type === "influencer" && currentProfile.topVideos ? (
                        <div className="space-y-3">
                          {/* Vídeos com maior visualização */}
                          <div>
                            <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                              <Play className="w-4 h-4" />
                              Vídeos com Maior Visualização
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                              {currentProfile.topVideos.map((video, index) => (
                                <div key={index} className="relative group cursor-pointer">
                                  <div className="aspect-[9/16] rounded-lg overflow-hidden bg-white/10 backdrop-blur-sm">
                                    <img 
                                      src={video.thumbnail} 
                                      alt={video.title}
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-2">
                                      <div className="flex items-center gap-1 text-white mb-1">
                                        <Eye className="w-3 h-3" />
                                        <span className="text-xs font-bold">{video.views}</span>
                                      </div>
                                      <p className="text-[10px] text-white/90 line-clamp-2">{video.title}</p>
                                    </div>
                                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm rounded-full p-1">
                                      <Play className="w-3 h-3 text-white" fill="white" />
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Nicho e Tempo de Perfil */}
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                              <p className="text-xs text-white/70 mb-1">Nicho</p>
                              <p className="text-sm font-bold">{currentProfile.niche}</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                              <div className="flex items-center justify-center gap-1 mb-1">
                                <Calendar className="w-3 h-3 text-white/70" />
                                <p className="text-xs text-white/70">Perfil criado há</p>
                              </div>
                              <p className="text-sm font-bold">{currentProfile.profileAge}</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        // Para clientes, mantém o layout antigo
                        <div className="grid grid-cols-3 gap-3 text-center">
                          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
                            <DollarSign className="w-4 h-4 mx-auto mb-1" />
                            <p className="text-xs font-medium">{currentProfile.budget}</p>
                          </div>
                          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 col-span-2">
                            <p className="text-xs font-medium">{currentProfile.niche}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>

                {/* Botões de ação */}
                <div className="flex items-center justify-center gap-3 w-full max-w-md">
                  <Button
                    size="lg"
                    variant="outline"
                    className="flex-1 h-14 rounded-xl border-2 hover:border-gray-400 hover:bg-gray-50 transition-all gap-2"
                    onClick={handlePrevious}
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <span className="font-semibold">Voltar</span>
                  </Button>
                  
                  <Button
                    size="lg"
                    className="flex-1 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg transition-all gap-2"
                    onClick={handleMessage}
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-semibold">Mensagem</span>
                  </Button>
                  
                  <Button
                    size="lg"
                    className="flex-1 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg transition-all gap-2"
                    onClick={handleSave}
                  >
                    <Bookmark className="w-5 h-5" />
                    <span className="font-semibold">Salvar</span>
                  </Button>
                  
                  <Button
                    size="lg"
                    variant="outline"
                    className="flex-1 h-14 rounded-xl border-2 hover:border-green-500 hover:bg-green-50 transition-all gap-2"
                    onClick={handleNext}
                  >
                    <span className="font-semibold">Próximo</span>
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>

                <p className="text-sm text-gray-500">
                  {filteredProfiles.length - currentIndex - 1} perfis restantes
                </p>
              </div>
            ) : (
              <Card className="w-full max-w-md mx-auto">
                <CardContent className="pt-6 text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Nenhum perfil disponível</h3>
                  <p className="text-gray-500 mb-4">
                    Ajuste seus filtros para ver mais perfis
                  </p>
                  <Button onClick={() => setShowFilters(true)}>
                    Ajustar Filtros
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Tab: Salvos */}
          <TabsContent value="saved">
            {saved.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {saved.map(profile => (
                  <Card key={profile.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      {/* @ do perfil no topo */}
                      <div className="absolute top-0 left-0 right-0 z-20 p-3 bg-gradient-to-b from-black/60 to-transparent">
                        <a
                          href={profile.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 text-white px-3 py-1.5 rounded-full hover:scale-105 transition-transform text-xs font-semibold shadow-lg"
                        >
                          <Instagram className="w-4 h-4" />
                          <span>{profile.instagramHandle}</span>
                        </a>
                        <Badge className="absolute top-3 right-3 bg-purple-500">
                          <Bookmark className="w-3 h-3 mr-1" fill="white" />
                          Salvo
                        </Badge>
                      </div>

                      {/* Foto de perfil */}
                      <div className="h-48 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center pt-12">
                        <img
                          src={profile.avatar}
                          alt={profile.name}
                          className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                        />
                      </div>

                      {/* Informações abaixo da foto */}
                      {profile.type === "influencer" && (
                        <div className="bg-white px-4 py-3 border-b">
                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div>
                              <div className="flex items-center justify-center gap-1 text-purple-600 mb-0.5">
                                <Users className="w-4 h-4" />
                              </div>
                              <p className="text-lg font-bold text-gray-900">{profile.followers}</p>
                              <p className="text-[10px] text-gray-500">Seguidores</p>
                            </div>
                            
                            <div>
                              <div className="flex items-center justify-center gap-1 text-pink-600 mb-0.5">
                                <Eye className="w-4 h-4" />
                              </div>
                              <p className="text-lg font-bold text-gray-900">{profile.monthlyViews}</p>
                              <p className="text-[10px] text-gray-500">Views/mês</p>
                            </div>
                            
                            <div>
                              <div className="flex items-center justify-center gap-1 text-orange-600 mb-0.5">
                                <TrendingUp className="w-4 h-4" />
                              </div>
                              <p className="text-lg font-bold text-gray-900">{profile.engagement}</p>
                              <p className="text-[10px] text-gray-500">Engajamento</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <CardContent className="pt-4">
                      <h3 className="font-bold text-lg mb-1">{profile.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">{profile.niche}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                        <MapPin className="w-4 h-4" />
                        <span>{profile.distance} km</span>
                      </div>
                      <Button className="w-full gap-2">
                        <MessageCircle className="w-4 h-4" />
                        Iniciar Conversa
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bookmark className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Nenhum perfil salvo</h3>
                  <p className="text-gray-500">
                    Comece a salvar perfis de influenciadores e marcas!
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Tab: Estatísticas */}
          <TabsContent value="stats">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Perfis Salvos</p>
                      <p className="text-3xl font-bold">{saved.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Bookmark className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Perfis Vistos</p>
                      <p className="text-3xl font-bold">{currentIndex}</p>
                    </div>
                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                      <Search className="w-6 h-6 text-pink-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Taxa de Interesse</p>
                      <p className="text-3xl font-bold">
                        {currentIndex > 0 ? Math.round((saved.length / currentIndex) * 100) : 0}%
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-4">Sistema de Monetização</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
                    <DollarSign className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Cobrança por Visualizações</p>
                      <p className="text-sm text-gray-600">R$ 1,00 a cada 1.000 views nos vídeos</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 bg-pink-50 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-pink-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Contagem Automática</p>
                      <p className="text-sm text-gray-600">Sistema rastreia views em tempo real</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg">
                    <Users className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Transparência Total</p>
                      <p className="text-sm text-gray-600">Dashboard com métricas detalhadas para ambas as partes</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
