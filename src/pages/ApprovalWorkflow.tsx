import { Layout } from "@/components/Layout";
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  Clock, 
  FileText, 
  MessageSquare, 
  ThumbsUp, 
  XCircle 
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { AspectRatio } from "@/components/ui/aspect-ratio";

type ApprovalStatus = "pending" | "approved" | "rejected" | "revision";

interface Approval {
  id: string;
  clientName: string;
  petName: string;
  petType: string;
  designId: string;
  designName: string;
  designVersion: number;
  status: ApprovalStatus;
  createdAt: string;
  comments?: string;
  images: string[];
  measurements: {
    [key: string]: number;
  };
  materialType: string;
  estimatedProduction: string;
  estimatedCost: number;
}

// Sample data for approvals with real prosthetic images
const sampleApprovals: Approval[] = [
  {
    id: "APR001",
    clientName: "Ricardo Silva",
    petName: "Thor",
    petType: "dog",
    designId: "D10023",
    designName: "Prótese Pata Dianteira Standard",
    designVersion: 1,
    status: "pending",
    createdAt: "2025-05-10T14:30:00",
    images: [
      "https://www.handicappedpets.com/media/mageplaza/blog/post/image/w/a/walkin-wheels-rear-dog-wheelchair-dog-using-wheelchair-on-grass-web_3.jpg"
    ],
    measurements: {
      comprimento: 15.2,
      largura: 5.8,
      altura: 7.3,
      circunferência: 18.5
    },
    materialType: "PLA Reforçado",
    estimatedProduction: "5-7 dias",
    estimatedCost: 850
  },
  {
    id: "APR002",
    clientName: "Mariana Costa",
    petName: "Luna",
    petType: "dog",
    designId: "D10024",
    designName: "Prótese Pata Traseira Premium",
    designVersion: 2,
    status: "revision",
    createdAt: "2025-05-08T09:15:00",
    comments: "Cliente pediu ajustes na altura e no encaixe para maior conforto. Segunda revisão.",
    images: [
      "https://vetmed.illinois.edu/wp-content/uploads/2021/05/p-patch-scaled-e1620657180619-768x576.jpeg"
    ],
    measurements: {
      comprimento: 16.7,
      largura: 6.2,
      altura: 8.1,
      circunferência: 20.3
    },
    materialType: "TPU Flexível",
    estimatedProduction: "7-10 dias",
    estimatedCost: 1200
  },
  {
    id: "APR003",
    clientName: "Fernando Mendes",
    petName: "Simba",
    petType: "cat",
    designId: "D10025",
    designName: "Prótese Pata Dianteira Felina",
    designVersion: 1,
    status: "approved",
    createdAt: "2025-05-05T11:45:00",
    images: [
      "https://drsophiayin.com/app/uploads/2017/09/Glue-in-Cat-Prothesis-4.jpg"
    ],
    measurements: {
      comprimento: 8.5,
      largura: 3.2,
      altura: 4.1,
      circunferência: 9.8
    },
    materialType: "PLA Leve",
    estimatedProduction: "4-6 dias",
    estimatedCost: 720
  },
  {
    id: "APR004",
    clientName: "Carolina Souza",
    petName: "Pipoca",
    petType: "dog",
    designId: "D10026",
    designName: "Prótese Pata Dianteira Customizada",
    designVersion: 3,
    status: "rejected",
    createdAt: "2025-05-01T16:20:00",
    comments: "Medidas incompatíveis com o modelo proposto. Nova avaliação necessária.",
    images: [
      "https://www.calibrepress.com/wp-content/uploads/2019/12/GettyImages-1068693964-800x430.jpg"
    ],
    measurements: {
      comprimento: 12.3,
      largura: 4.5,
      altura: 6.0,
      circunferência: 14.7
    },
    materialType: "PLA Reforçado",
    estimatedProduction: "6-8 dias",
    estimatedCost: 950
  }
];

const ApprovalWorkflow = () => {
  const [approvals, setApprovals] = useState<Approval[]>(sampleApprovals);
  const [activeApproval, setActiveApproval] = useState<Approval | null>(null);
  const [activeTab, setActiveTab] = useState<ApprovalStatus | "all">("pending");

  const getStatusColor = (status: ApprovalStatus) => {
    switch (status) {
      case "pending":
        return "bg-amber-500";
      case "approved":
        return "bg-green-500";
      case "rejected":
        return "bg-red-500";
      case "revision":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };
  
  const getStatusBadge = (status: ApprovalStatus) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800">Pendente</Badge>;
      case "approved":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">Aprovado</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800">Rejeitado</Badge>;
      case "revision":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800">Em Revisão</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };
  
  const handleViewApproval = (approval: Approval) => {
    setActiveApproval(approval);
  };
  
  const handleApprove = () => {
    if (!activeApproval) return;
    
    const updatedApprovals = approvals.map(a => 
      a.id === activeApproval.id 
        ? { ...a, status: "approved" as ApprovalStatus } 
        : a
    );
    
    setApprovals(updatedApprovals);
    setActiveApproval({ ...activeApproval, status: "approved" });
    toast.success(`Projeto para ${activeApproval.petName} aprovado com sucesso!`);
  };
  
  const handleReject = () => {
    if (!activeApproval) return;
    
    const updatedApprovals = approvals.map(a => 
      a.id === activeApproval.id 
        ? { ...a, status: "rejected" as ApprovalStatus } 
        : a
    );
    
    setApprovals(updatedApprovals);
    setActiveApproval({ ...activeApproval, status: "rejected" });
    toast.error(`Projeto para ${activeApproval.petName} foi rejeitado.`);
  };
  
  const handleRequestRevision = () => {
    if (!activeApproval) return;
    
    const updatedApprovals = approvals.map(a => 
      a.id === activeApproval.id 
        ? { ...a, status: "revision" as ApprovalStatus } 
        : a
    );
    
    setApprovals(updatedApprovals);
    setActiveApproval({ ...activeApproval, status: "revision" });
    toast.info(`Solicitação de revisão para o projeto de ${activeApproval.petName} enviada.`);
  };

  const filteredApprovals = activeTab === "all" 
    ? approvals 
    : approvals.filter(a => a.status === activeTab);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fluxo de Aprovações</h1>
          <p className="text-muted-foreground">
            Gerencie e aprove os designs de próteses antes da produção.
          </p>
        </div>

        <Tabs defaultValue="pending" value={activeTab} onValueChange={(value) => setActiveTab(value as ApprovalStatus | "all")} className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="pending" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Pendentes</span>
              </TabsTrigger>
              <TabsTrigger value="revision" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Em Revisão</span>
              </TabsTrigger>
              <TabsTrigger value="approved" className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                <span>Aprovados</span>
              </TabsTrigger>
              <TabsTrigger value="rejected" className="flex items-center gap-2">
                <XCircle className="h-4 w-4" />
                <span>Rejeitados</span>
              </TabsTrigger>
              <TabsTrigger value="all" className="flex items-center gap-2">
                <span>Todos</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-1 overflow-auto max-h-[70vh]">
              <h2 className="font-semibold mb-3">Solicitações ({filteredApprovals.length})</h2>
              <div className="space-y-3">
                {filteredApprovals.map((approval) => (
                  <Card 
                    key={approval.id} 
                    className={`hover:shadow-md transition-shadow cursor-pointer ${activeApproval?.id === approval.id ? 'border-primary' : ''}`}
                    onClick={() => handleViewApproval(approval)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{approval.petName}</h3>
                          <p className="text-sm text-muted-foreground">{approval.clientName}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs">{approval.designName}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="mb-1">{getStatusBadge(approval.status)}</div>
                          <p className="text-xs text-muted-foreground">
                            {new Date(approval.createdAt).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {filteredApprovals.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Nenhuma solicitação encontrada nesta categoria.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="col-span-1 lg:col-span-2">
              {activeApproval ? (
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{activeApproval.designName}</CardTitle>
                        <CardDescription>ID: {activeApproval.designId} • Versão {activeApproval.designVersion}</CardDescription>
                      </div>
                      {getStatusBadge(activeApproval.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-semibold mb-2">Informações do Paciente</h3>
                        <div className="space-y-1 text-sm">
                          <p><span className="font-medium">Tutor:</span> {activeApproval.clientName}</p>
                          <p><span className="font-medium">Nome:</span> {activeApproval.petName}</p>
                          <p><span className="font-medium">Tipo:</span> {activeApproval.petType === "dog" ? "Cachorro" : "Gato"}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-semibold mb-2">Detalhes da Prótese</h3>
                        <div className="space-y-1 text-sm">
                          <p><span className="font-medium">Material:</span> {activeApproval.materialType}</p>
                          <p><span className="font-medium">Custo Estimado:</span> R$ {activeApproval.estimatedCost.toFixed(2)}</p>
                          <p><span className="font-medium">Tempo de Produção:</span> {activeApproval.estimatedProduction}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-semibold mb-3">Visualização do Modelo</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-muted rounded-md overflow-hidden relative">
                          <AspectRatio ratio={4/3} className="w-full">
                            <img 
                              src={activeApproval.images[0]} 
                              alt={`${activeApproval.petName} com ${activeApproval.designName}`}
                              className="object-cover w-full h-full"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = "https://placehold.co/400x300/e2e8f0/a0aec0?text=Imagem+não+disponível";
                              }}
                            />
                          </AspectRatio>
                        </div>
                        <div className="bg-muted rounded-md overflow-hidden flex items-center justify-center p-4">
                          <div className="text-center">
                            <div className="text-xl font-bold text-primary mb-2">{activeApproval.designName}</div>
                            <div className="text-sm text-muted-foreground">
                              Material: {activeApproval.materialType} <br />
                              Versão: {activeApproval.designVersion}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-semibold mb-3">Medidas</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {Object.entries(activeApproval.measurements).map(([key, value]) => (
                          <div key={key} className="bg-muted p-3 rounded-md">
                            <p className="text-xs text-muted-foreground">{key}</p>
                            <p className="font-medium">{value} cm</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {activeApproval.comments && (
                      <div>
                        <h3 className="text-sm font-semibold mb-2">Comentários</h3>
                        <div className="bg-muted p-3 rounded-md">
                          <p className="text-sm">{activeApproval.comments}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex flex-col sm:flex-row gap-3 justify-end border-t pt-6">
                    <Button 
                      variant="outline" 
                      onClick={handleReject}
                      className="w-full sm:w-auto"
                      disabled={activeApproval.status === "rejected"}
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Rejeitar
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handleRequestRevision}
                      className="w-full sm:w-auto"
                      disabled={activeApproval.status === "revision"}
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Solicitar Revisão
                    </Button>
                    <Button 
                      onClick={handleApprove}
                      className="w-full sm:w-auto"
                      disabled={activeApproval.status === "approved"}
                    >
                      <ThumbsUp className="mr-2 h-4 w-4" />
                      Aprovar
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <div className="h-full flex items-center justify-center border rounded-lg">
                  <div className="text-center p-8">
                    <FileText className="mx-auto h-12 w-12 text-muted-foreground/60" />
                    <h3 className="mt-4 text-lg font-medium">Nenhum projeto selecionado</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Selecione um projeto da lista para visualizar os detalhes.
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

export default ApprovalWorkflow;
