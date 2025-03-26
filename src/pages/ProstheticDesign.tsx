
import { Layout } from "@/components/Layout";
import { 
  Box, 
  Ruler, 
  Settings, 
  Printer, 
  FileDown, 
  Calendar, 
  CheckSquare,
  Scale, 
  BarChart, 
  Camera
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

interface Design {
  id: string;
  name: string;
  version: number;
  status: "design" | "measurements" | "modeling" | "approval" | "production" | "completed";
  clientName: string;
  petName: string;
  petType: string;
  createdAt: string;
  updatedAt: string;
  measurements: {
    [key: string]: number;
  };
  materialType: string;
  estimatedCost: number;
  productionTime: string;
  images: string[];
  petImage?: string;
  notes?: string;
}

const sampleDesigns: Design[] = [
  {
    id: "DSN001",
    name: "Prótese Pata Dianteira Standard",
    version: 2,
    status: "production",
    clientName: "Ricardo Silva",
    petName: "Thor",
    petType: "Cachorro",
    createdAt: "2025-05-01T10:00:00",
    updatedAt: "2025-05-15T14:30:00",
    measurements: {
      comprimento: 15.2,
      largura: 5.8,
      altura: 7.3,
      circunferência: 18.5
    },
    materialType: "PLA Reforçado",
    estimatedCost: 850,
    productionTime: "5-7 dias",
    images: [
      "https://www.handicappedpets.com/media/mageplaza/blog/post/image/w/a/walkin-wheels-rear-dog-wheelchair-dog-using-wheelchair-on-grass-web_3.jpg",
      "https://doglab.com/wp-content/uploads/A-prosthetic-front-leg-for-a-dog-with-missing-limb-850x520.jpg",
      "https://barkpost.com/wp-content/uploads/2015/02/featmed5.jpg"
    ],
    petImage: "https://www.dogingtonpost.com/wp-content/uploads/2019/08/GoldenRetrieverProsthetic.jpg",
    notes: "Ajustes realizados para maior conforto."
  },
  {
    id: "DSN002",
    name: "Prótese Pata Traseira Premium",
    version: 3,
    status: "completed",
    clientName: "Mariana Costa",
    petName: "Luna",
    petType: "Cachorro",
    createdAt: "2025-04-20T14:00:00",
    updatedAt: "2025-05-10T16:45:00",
    measurements: {
      comprimento: 16.7,
      largura: 6.2,
      altura: 8.1,
      circunferência: 20.3
    },
    materialType: "TPU Flexível",
    estimatedCost: 1200,
    productionTime: "7-10 dias",
    images: [
      "https://www.wakeupvet.com/hs-fs/hubfs/3d-printed-prosthetic-legs-for-dogs.jpg?width=600&height=338&name=3d-printed-prosthetic-legs-for-dogs.jpg",
      "https://www.petsrq.com/wp-content/uploads/2022/07/Dog-Prosthetic-Leg-2-1024x680.jpg",
      "https://www.fabbric.in/wp-content/uploads/2022/08/FidoBraces-01-1-1080x550.jpeg"
    ],
    petImage: "https://www.sydneyvetspecialists.com.au/wp-content/uploads/2017/08/Holly-with-prosthesis-682x1024.jpg",
    notes: "Design customizado para maior mobilidade."
  },
  {
    id: "DSN003",
    name: "Prótese Pata Dianteira Felina",
    version: 1,
    status: "approval",
    clientName: "Fernando Mendes",
    petName: "Simba",
    petType: "Gato",
    createdAt: "2025-05-05T09:30:00",
    updatedAt: "2025-05-12T11:15:00",
    measurements: {
      comprimento: 8.5,
      largura: 3.2,
      altura: 4.1,
      circunferência: 9.8
    },
    materialType: "PLA Leve",
    estimatedCost: 720,
    productionTime: "4-6 dias",
    images: [
      "https://drsophiayin.com/app/uploads/2017/09/Glue-in-Cat-Prothesis-4.jpg",
      "https://abcnews.go.com/images/Lifestyle/ht_vincent_cat_titanium_leg_2_jc_150205_4x3_992.jpg"
    ],
    petImage: "https://metro.co.uk/wp-content/uploads/2018/01/ad_262268277.jpg?quality=90&strip=all",
    notes: "Design leve e resistente para gatos."
  },
  {
    id: "DSN004",
    name: "Prótese Pata Dianteira Customizada",
    version: 4,
    status: "design",
    clientName: "Carolina Souza",
    petName: "Pipoca",
    petType: "Cachorro",
    createdAt: "2025-04-25T16:00:00",
    updatedAt: "2025-05-01T18:20:00",
    measurements: {
      comprimento: 12.3,
      largura: 4.5,
      altura: 6.0,
      circunferência: 14.7
    },
    materialType: "PLA Reforçado",
    estimatedCost: 950,
    productionTime: "6-8 dias",
    images: [
      "https://i.pinimg.com/originals/1b/a6/24/1ba6243d91f8a80fcca27bceacef4b33.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/e/e5/Pet_dog_with_prosthetic_leg.jpg",
      "https://petprosthetics.com/wp-content/uploads/bb-plugin/cache/prosthetic-animal-prosthetics-square.jpg"
    ],
    petImage: "https://static.scientificamerican.com/blogs/cache/file/BB1F0C23-9C65-47B0-938171E9E3A61065_source.jpg",
    notes: "Design ergonômico para cães ativos."
  },
  {
    id: "DSN005",
    name: "Prótese Pata Traseira Articulada",
    version: 1,
    status: "measurements",
    clientName: "Gustavo Almeida",
    petName: "Bethoven",
    petType: "Cachorro",
    createdAt: "2025-05-10T08:00:00",
    updatedAt: "2025-05-10T08:00:00",
    measurements: {
      comprimento: 18.0,
      largura: 7.0,
      altura: 9.0,
      circunferência: 22.0
    },
    materialType: "TPU Flexível",
    estimatedCost: 1300,
    productionTime: "8-12 dias",
    images: [
      "https://media-cldnry.s-nbcnews.com/image/upload/t_focal-380x380,f_auto,q_auto:best/rockcms/2023-03/230317-dog-prosthetics-al-1256-82a1ef.jpg",
      "https://gfycat.com/welcomegratefulhorsemouse-dog-prosthetic-3d-printing-engineering",
      "https://www.3dsourced.com/wp-content/uploads/2023/02/3D-Printed-Prosthetics-For-Dogs.jpg"
    ],
    petImage: "https://i.guim.co.uk/img/media/fe8409183a0cb006c8a26c90fecf4a168ee6c218/0_0_1024_1024/master/1024.jpg?width=700&quality=85&auto=format&fit=max&s=a7d07435be68bd1bb7af7dc98db84a3e",
    notes: "Design articulado para maior flexibilidade."
  },
  {
    id: "DSN006",
    name: "Prótese Pata Dianteira Leve",
    version: 2,
    status: "modeling",
    clientName: "Isabela Martins",
    petName: "Mia",
    petType: "Gato",
    createdAt: "2025-05-12T11:00:00",
    updatedAt: "2025-05-18T16:00:00",
    measurements: {
      comprimento: 7.5,
      largura: 2.8,
      altura: 3.5,
      circunferência: 8.5
    },
    materialType: "PLA Leve",
    estimatedCost: 680,
    productionTime: "3-5 dias",
    images: [
      "https://thumbs.dreamstime.com/b/orange-tabby-cat-prosthetic-limb-orange-tabby-cat-prosthetic-limb-sitting-120449478.jpg",
      "https://www.thedodo.com/dodowell/cat-gets-prosthetic-legs",
      "https://cdn.shopify.com/s/files/1/0566/7193/0225/files/image3_63e1a6fa-0afe-4693-bad2-ee1ec3d6b9aa_1024x1024.jpg?v=1627504946"
    ],
    petImage: "https://static01.nyt.com/images/2021/06/02/multimedia/02xp-cat/02xp-cat-jumbo.jpg",
    notes: "Design ultra leve para gatos delicados."
  }
];

const ProstheticDesign = () => {
  const [designs, setDesigns] = useState<Design[]>(sampleDesigns);
  const [activeDesign, setActiveDesign] = useState<Design | null>(null);
  const [activeTab, setActiveTab] = useState<string>("design");
  
  const getStatusColor = (status: Design["status"]) => {
    switch (status) {
      case "design":
        return "bg-gray-500";
      case "measurements":
        return "bg-amber-500";
      case "modeling":
        return "bg-blue-500";
      case "approval":
        return "bg-purple-500";
      case "production":
        return "bg-ocean-500";
      case "completed":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusBadge = (status: Design["status"]) => {
    switch (status) {
      case "design":
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-800">Design</Badge>;
      case "measurements":
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800">Medidas</Badge>;
      case "modeling":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800">Modelagem</Badge>;
      case "approval":
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800">Aprovação</Badge>;
      case "production":
        return <Badge variant="outline" className="bg-ocean-100 text-ocean-800 border-ocean-200 dark:bg-ocean-900/30 dark:text-ocean-400 dark:border-ocean-800">Produção</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">Concluído</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  const handleViewDesign = (design: Design) => {
    setActiveDesign(design);
  };

  const handleUpdateStatus = (newStatus: Design["status"]) => {
    if (!activeDesign) return;

    const updatedDesigns = designs.map(d =>
      d.id === activeDesign.id ? { ...d, status: newStatus } : d
    );

    setDesigns(updatedDesigns);
    setActiveDesign({ ...activeDesign, status: newStatus });
    toast.success(`Status atualizado para ${newStatus}`);
  };

  const filteredDesigns = activeTab === "all"
    ? designs
    : designs.filter(d => d.status === activeTab);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Design de Próteses</h1>
          <p className="text-muted-foreground">
            Crie e gerencie os designs de próteses para pets.
          </p>
        </div>

        <Tabs defaultValue="design" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="design" className="flex items-center gap-2">
                <Box className="h-4 w-4" />
                <span>Design</span>
              </TabsTrigger>
              <TabsTrigger value="measurements" className="flex items-center gap-2">
                <Ruler className="h-4 w-4" />
                <span>Medidas</span>
              </TabsTrigger>
              <TabsTrigger value="modeling" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Modelagem</span>
              </TabsTrigger>
              <TabsTrigger value="approval" className="flex items-center gap-2">
                <CheckSquare className="h-4 w-4" />
                <span>Aprovação</span>
              </TabsTrigger>
              <TabsTrigger value="production" className="flex items-center gap-2">
                <Printer className="h-4 w-4" />
                <span>Produção</span>
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex items-center gap-2">
                <FileDown className="h-4 w-4" />
                <span>Concluído</span>
              </TabsTrigger>
              <TabsTrigger value="all" className="flex items-center gap-2">
                <span>Todos</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-1 overflow-auto max-h-[70vh]">
              <h2 className="font-semibold mb-3">Designs ({filteredDesigns.length})</h2>
              <div className="space-y-3">
                {filteredDesigns.map((design) => (
                  <Card
                    key={design.id}
                    className={`hover:shadow-md transition-shadow cursor-pointer ${activeDesign?.id === design.id ? 'border-primary' : ''}`}
                    onClick={() => handleViewDesign(design)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex gap-3">
                          {design.petImage && (
                            <div className="w-16 h-16 rounded-md overflow-hidden">
                              <img 
                                src={design.petImage} 
                                alt={design.petName} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div>
                            <h3 className="font-semibold">{design.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {design.clientName} • {design.petName}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs">Versão {design.version}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="mb-1">{getStatusBadge(design.status)}</div>
                          <p className="text-xs text-muted-foreground">
                            {new Date(design.createdAt).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {filteredDesigns.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Nenhum design encontrado nesta categoria.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="col-span-1 lg:col-span-2">
              {activeDesign ? (
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{activeDesign.name}</CardTitle>
                        <CardDescription>
                          ID: {activeDesign.id} • Criado em {new Date(activeDesign.createdAt).toLocaleDateString('pt-BR')}
                        </CardDescription>
                      </div>
                      {getStatusBadge(activeDesign.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-semibold mb-2">Informações do Paciente</h3>
                        <div className="space-y-3 text-sm">
                          <p><span className="font-medium">Tutor:</span> {activeDesign.clientName}</p>
                          <p><span className="font-medium">Nome:</span> {activeDesign.petName}</p>
                          <p><span className="font-medium">Tipo:</span> {activeDesign.petType}</p>
                          {activeDesign.petImage && (
                            <div className="mt-2">
                              <p className="font-medium mb-1">Foto do Pet:</p>
                              <div className="w-full max-w-[200px] rounded-md overflow-hidden">
                                <img 
                                  src={activeDesign.petImage} 
                                  alt={activeDesign.petName} 
                                  className="w-full h-auto object-cover"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold mb-2">Detalhes da Prótese</h3>
                        <div className="space-y-1 text-sm">
                          <p><span className="font-medium">Material:</span> {activeDesign.materialType}</p>
                          <p><span className="font-medium">Custo Estimado:</span> R$ {activeDesign.estimatedCost.toFixed(2)}</p>
                          <p><span className="font-medium">Tempo de Produção:</span> {activeDesign.productionTime}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold mb-3">Visualização do Modelo</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {activeDesign.images.map((img, index) => (
                          <div key={index} className="bg-muted rounded-md overflow-hidden aspect-square flex items-center justify-center">
                            <img
                              src={img}
                              alt={`${activeDesign.name} view ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold mb-3">Medidas</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {Object.entries(activeDesign.measurements).map(([key, value]) => (
                          <div key={key} className="bg-muted p-3 rounded-md">
                            <p className="text-xs text-muted-foreground">{key}</p>
                            <p className="font-medium">{value} cm</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {activeDesign.notes && (
                      <div>
                        <h3 className="text-sm font-semibold mb-2">Notas</h3>
                        <div className="bg-muted p-3 rounded-md">
                          <p className="text-sm">{activeDesign.notes}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2 border-t pt-4">
                    <Button
                      variant="outline"
                      onClick={() => handleUpdateStatus("design")}
                      disabled={activeDesign.status === "design"}
                    >
                      Design
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleUpdateStatus("measurements")}
                      disabled={activeDesign.status === "measurements"}
                    >
                      Medidas
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleUpdateStatus("modeling")}
                      disabled={activeDesign.status === "modeling"}
                    >
                      Modelagem
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleUpdateStatus("approval")}
                      disabled={activeDesign.status === "approval"}
                    >
                      Aprovação
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleUpdateStatus("production")}
                      disabled={activeDesign.status === "production"}
                    >
                      Produção
                    </Button>
                    <Button
                      onClick={() => handleUpdateStatus("completed")}
                      disabled={activeDesign.status === "completed"}
                    >
                      Concluído
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <div className="h-full flex items-center justify-center border rounded-lg">
                  <div className="text-center p-8">
                    <Box className="mx-auto h-12 w-12 text-muted-foreground/60" />
                    <h3 className="mt-4 text-lg font-medium">Nenhum design selecionado</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Selecione um design da lista para visualizar os detalhes.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ProstheticDesign;
