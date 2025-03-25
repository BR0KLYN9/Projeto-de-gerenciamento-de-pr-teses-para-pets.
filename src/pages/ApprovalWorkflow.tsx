
import { Layout } from "@/components/Layout";
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Check,
  X,
  MessageSquare,
  Clock,
  AlertCircle,
  ThumbsUp,
  RotateCw,
  Send,
  Download,
  ChevronRight,
  CheckCheck,
  History,
  Filter,
  Search,
  Dog,
  Cat,
  Plus,
  Minus,
  ZoomIn
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

// Sample approval requests data
const SAMPLE_APPROVALS = [
  {
    id: 1,
    clientName: "Carlos Silva",
    petName: "Rex",
    petType: "dog",
    requestDate: "2023-09-10",
    status: "pending",
    design: {
      name: "Prótese Pata Dianteira - Cão",
      preview: "https://placehold.co/300x200/2563eb/FFFFFF/png?text=Pr%C3%B3tese+Dianteira",
      material: "PETG",
      color: "#3b82f6"
    },
    comments: [
      {
        author: "Dr. Ana Lima",
        role: "Veterinária",
        date: "2023-09-11",
        content: "A prótese parece adequada para o caso do Rex, mas sugiro verificar o ajuste na parte superior."
      }
    ]
  },
  {
    id: 2,
    clientName: "Marina Costa",
    petName: "Luna",
    petType: "cat",
    requestDate: "2023-09-08",
    status: "revisions",
    design: {
      name: "Prótese Pata Traseira - Gato",
      preview: "https://placehold.co/300x200/2563eb/FFFFFF/png?text=Pr%C3%B3tese+Gato",
      material: "TPU Flexível",
      color: "#8b5cf6"
    },
    comments: [
      {
        author: "Marina Costa",
        role: "Cliente",
        date: "2023-09-09",
        content: "Acho que a prótese está um pouco grande para a Luna. Ela é uma gata pequena e delicada."
      },
      {
        author: "Pedro Santos",
        role: "Designer",
        date: "2023-09-10",
        content: "Vamos ajustar o tamanho conforme solicitado. Também faremos modificações na estrutura para torná-la mais leve."
      }
    ],
    revisionRequests: [
      {
        id: 1,
        date: "2023-09-09",
        description: "Reduzir o tamanho geral em 15%",
        status: "completed"
      },
      {
        id: 2,
        date: "2023-09-09",
        description: "Tornar a estrutura mais leve",
        status: "in_progress"
      }
    ]
  },
  {
    id: 3,
    clientName: "João Mendes",
    petName: "Toby",
    petType: "dog",
    requestDate: "2023-09-05",
    status: "approved",
    approvalDate: "2023-09-08",
    design: {
      name: "Prótese Pata Traseira - Cão",
      preview: "https://placehold.co/300x200/2563eb/FFFFFF/png?text=Pr%C3%B3tese+Traseira",
      material: "PETG",
      color: "#22c55e"
    },
    comments: [
      {
        author: "João Mendes",
        role: "Cliente",
        date: "2023-09-07",
        content: "O design parece perfeito! Estou impressionado com a atenção aos detalhes."
      },
      {
        author: "Dr. Felipe Costa",
        role: "Veterinário",
        date: "2023-09-07",
        content: "Aprovado do ponto de vista veterinário. A estrutura está adequada para o tipo de atividade do Toby."
      },
      {
        author: "João Mendes",
        role: "Cliente",
        date: "2023-09-08",
        content: "Aprovado! Mal posso esperar para ver o Toby com sua nova prótese."
      }
    ]
  },
  {
    id: 4,
    clientName: "Sofia Almeida",
    petName: "Ziggy",
    petType: "dog",
    requestDate: "2023-09-01",
    status: "approved",
    approvalDate: "2023-09-04",
    design: {
      name: "Prótese Pata Dianteira - Cão",
      preview: "https://placehold.co/300x200/2563eb/FFFFFF/png?text=Pr%C3%B3tese+Ziggy",
      material: "PLA",
      color: "#f97316"
    },
    comments: [
      {
        author: "Sofia Almeida",
        role: "Cliente",
        date: "2023-09-02",
        content: "A cor está perfeita! Ziggy vai adorar."
      },
      {
        author: "Sofia Almeida",
        role: "Cliente",
        date: "2023-09-04",
        content: "Aprovado! Design perfeito para o Ziggy."
      }
    ]
  },
  {
    id: 5,
    clientName: "Roberto Dias",
    petName: "Bella",
    petType: "dog",
    requestDate: "2023-09-07",
    status: "pending",
    design: {
      name: "Prótese Pata Traseira - Cão",
      preview: "https://placehold.co/300x200/2563eb/FFFFFF/png?text=Pr%C3%B3tese+Bella",
      material: "PETG",
      color: "#ec4899"
    },
    comments: []
  }
];

type ApprovalStatus = "pending" | "revisions" | "approved" | "rejected";

const ApprovalWorkflow = () => {
  const [approvals, setApprovals] = useState(SAMPLE_APPROVALS);
  const [activeFilter, setActiveFilter] = useState<ApprovalStatus | "all">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApproval, setSelectedApproval] = useState(approvals[0]);
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [revisionDialogOpen, setRevisionDialogOpen] = useState(false);
  const [revisionDescription, setRevisionDescription] = useState("");

  const filteredApprovals = approvals.filter(approval => 
    (activeFilter === "all" || approval.status === activeFilter) &&
    (
      approval.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      approval.petName.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleApprovalSelect = (approval: any) => {
    setSelectedApproval(approval);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) {
      toast.error("O comentário não pode estar vazio.");
      return;
    }

    const updatedApproval = {
      ...selectedApproval,
      comments: [
        ...selectedApproval.comments,
        {
          author: "Você",
          role: "Designer",
          date: new Date().toISOString().split('T')[0],
          content: newComment
        }
      ]
    };

    const updatedApprovals = approvals.map(approval => 
      approval.id === selectedApproval.id ? updatedApproval : approval
    );

    setApprovals(updatedApprovals);
    setSelectedApproval(updatedApproval);
    setNewComment("");
    toast.success("Comentário adicionado com sucesso!");
  };

  const handleApprove = () => {
    const updatedApproval = {
      ...selectedApproval,
      status: "approved" as ApprovalStatus,
      approvalDate: new Date().toISOString().split('T')[0]
    };

    const updatedApprovals = approvals.map(approval => 
      approval.id === selectedApproval.id ? updatedApproval : approval
    );

    setApprovals(updatedApprovals);
    setSelectedApproval(updatedApproval);
    toast.success("Projeto aprovado com sucesso! Prosseguindo para a produção.");
  };

  const handleRequestRevisions = () => {
    if (!revisionDescription.trim()) {
      toast.error("A descrição da revisão não pode estar vazia.");
      return;
    }

    const newRevisionRequest = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      description: revisionDescription,
      status: "pending"
    };

    const updatedApproval = {
      ...selectedApproval,
      status: "revisions" as ApprovalStatus,
      revisionRequests: selectedApproval.revisionRequests 
        ? [...selectedApproval.revisionRequests, newRevisionRequest]
        : [newRevisionRequest]
    };

    const updatedApprovals = approvals.map(approval => 
      approval.id === selectedApproval.id ? updatedApproval : approval
    );

    setApprovals(updatedApprovals);
    setSelectedApproval(updatedApproval);
    setRevisionDialogOpen(false);
    setRevisionDescription("");
    toast.success("Solicitação de revisão enviada com sucesso!");
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Aprovações</h1>
          <p className="text-muted-foreground">
            Gerencie o processo de validação dos designs de próteses pelos clientes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Approvals List */}
          <Card className="lg:col-span-1">
            <CardHeader className="space-y-4">
              <CardTitle>Solicitações</CardTitle>
              <div className="flex flex-col space-y-3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar cliente ou pet..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
                  <Button
                    variant={activeFilter === "all" ? "default" : "outline"}
                    size="sm"
                    className={activeFilter === "all" ? "bg-ocean-600 hover:bg-ocean-700" : ""}
                    onClick={() => setActiveFilter("all")}
                  >
                    Todos
                  </Button>
                  <Button
                    variant={activeFilter === "pending" ? "default" : "outline"}
                    size="sm"
                    className={activeFilter === "pending" ? "bg-amber-600 hover:bg-amber-700" : ""}
                    onClick={() => setActiveFilter("pending")}
                  >
                    Pendentes
                  </Button>
                  <Button
                    variant={activeFilter === "revisions" ? "default" : "outline"}
                    size="sm"
                    className={activeFilter === "revisions" ? "bg-purple-600 hover:bg-purple-700" : ""}
                    onClick={() => setActiveFilter("revisions")}
                  >
                    Em Revisão
                  </Button>
                  <Button
                    variant={activeFilter === "approved" ? "default" : "outline"}
                    size="sm"
                    className={activeFilter === "approved" ? "bg-green-600 hover:bg-green-700" : ""}
                    onClick={() => setActiveFilter("approved")}
                  >
                    Aprovados
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                {filteredApprovals.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Filter className="mx-auto h-12 w-12 opacity-20 mb-2" />
                    <p>Nenhuma solicitação encontrada</p>
                  </div>
                ) : (
                  filteredApprovals.map((approval) => (
                    <div
                      key={approval.id}
                      className={`p-3 rounded-lg cursor-pointer transition-all border ${
                        selectedApproval?.id === approval.id
                          ? "border-primary bg-primary/5"
                          : "hover:border-ocean-300 dark:hover:border-ocean-700"
                      }`}
                      onClick={() => handleApprovalSelect(approval)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          {approval.petType === "dog" ? (
                            <Dog className="h-5 w-5 text-ocean-600 dark:text-ocean-400" />
                          ) : (
                            <Cat className="h-5 w-5 text-ocean-600 dark:text-ocean-400" />
                          )}
                          <div>
                            <div className="font-medium">{approval.clientName}</div>
                            <div className="text-sm text-muted-foreground">
                              Pet: {approval.petName}
                            </div>
                          </div>
                        </div>
                        <StatusBadge status={approval.status} />
                      </div>
                      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {approval.status === "approved" 
                            ? `Aprovado em ${formatDate(approval.approvalDate)}`
                            : `Enviado em ${formatDate(approval.requestDate)}`
                          }
                        </div>
                        <div className="flex items-center">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          {approval.comments.length} comentários
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Approval Details */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>
                {selectedApproval ? (
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span>Detalhes da Aprovação</span>
                      <StatusBadge status={selectedApproval.status} />
                    </div>
                  </div>
                ) : (
                  "Selecione uma solicitação"
                )}
              </CardTitle>
              {selectedApproval && (
                <CardDescription>
                  Cliente: {selectedApproval.clientName} | 
                  Pet: {selectedApproval.petName} ({selectedApproval.petType === "dog" ? "Cão" : "Gato"})
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              {!selectedApproval ? (
                <div className="text-center py-12 text-muted-foreground">
                  <AlertCircle className="mx-auto h-16 w-16 opacity-20 mb-4" />
                  <p className="text-lg">Selecione uma solicitação para ver os detalhes</p>
                </div>
              ) : (
                <Tabs defaultValue="preview">
                  <TabsList className="mb-4">
                    <TabsTrigger value="preview">Visualização</TabsTrigger>
                    <TabsTrigger value="comments">Comentários ({selectedApproval.comments.length})</TabsTrigger>
                    {selectedApproval.status === "revisions" && (
                      <TabsTrigger value="revisions">
                        Revisões ({selectedApproval.revisionRequests?.length || 0})
                      </TabsTrigger>
                    )}
                  </TabsList>
                  
                  <TabsContent value="preview" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-2">
                        <Card className="min-h-[400px] flex flex-col">
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-center">
                              <CardTitle className="text-base">
                                {selectedApproval.design.name}
                              </CardTitle>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm" onClick={() => setZoom(Math.min(zoom + 10, 150))}>
                                  <Plus className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => setZoom(Math.max(zoom - 10, 50))}>
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => setRotation(rotation + 45)}>
                                  <RotateCw className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="flex-1 flex items-center justify-center">
                            <div className="relative w-full h-full min-h-[300px] flex items-center justify-center">
                              <img 
                                src={selectedApproval.design.preview} 
                                alt="Modelo 3D"
                                className="object-contain transition-all duration-300"
                                style={{ 
                                  transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                                  maxHeight: "300px",
                                  filter: `hue-rotate(${selectedApproval.design.color !== "#2563eb" ? "90deg" : "0deg"})`
                                }}
                              />
                              <div className="absolute bottom-4 right-4">
                                <Button variant="outline" size="sm">
                                  <ZoomIn className="h-4 w-4 mr-1" /> Tela Cheia
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div className="md:col-span-1 space-y-4">
                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base">Especificações</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="text-sm grid grid-cols-2 gap-2">
                              <div className="font-medium">Modelo:</div>
                              <div>{selectedApproval.design.name}</div>
                              
                              <div className="font-medium">Material:</div>
                              <div>{selectedApproval.design.material}</div>
                              
                              <div className="font-medium">Cor:</div>
                              <div className="flex items-center">
                                <div 
                                  className="w-3 h-3 rounded-full mr-2" 
                                  style={{ backgroundColor: selectedApproval.design.color }}
                                ></div>
                                <span>{selectedApproval.design.color}</span>
                              </div>
                              
                              <div className="font-medium">Enviado em:</div>
                              <div>{formatDate(selectedApproval.requestDate)}</div>
                              
                              {selectedApproval.status === "approved" && (
                                <>
                                  <div className="font-medium">Aprovado em:</div>
                                  <div>{formatDate(selectedApproval.approvalDate)}</div>
                                </>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                        
                        {selectedApproval.status === "pending" && (
                          <Card>
                            <CardContent className="p-4">
                              <div className="space-y-3">
                                <Button 
                                  className="w-full bg-green-600 hover:bg-green-700" 
                                  onClick={handleApprove}
                                >
                                  <ThumbsUp className="mr-2 h-4 w-4" />
                                  Aprovar Design
                                </Button>
                                
                                <Button 
                                  variant="outline" 
                                  className="w-full" 
                                  onClick={() => setRevisionDialogOpen(true)}
                                >
                                  <RotateCw className="mr-2 h-4 w-4" />
                                  Solicitar Revisão
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                        
                        {selectedApproval.status === "approved" && (
                          <Card className="bg-green-600/10 border-green-600/30">
                            <CardContent className="p-4">
                              <div className="text-center space-y-2">
                                <CheckCheck className="h-8 w-8 text-green-600 mx-auto" />
                                <p className="font-medium text-green-700 dark:text-green-500">
                                  Aprovado pelo Cliente
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Design aprovado em {formatDate(selectedApproval.approvalDate)}
                                </p>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="mt-2"
                                  onClick={() => toast.success("Arquivo 3D baixado com sucesso!")}
                                >
                                  <Download className="h-3 w-3 mr-1" />
                                  Baixar Arquivo 3D
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                        
                        {selectedApproval.status === "revisions" && (
                          <Card className="bg-purple-600/10 border-purple-600/30">
                            <CardContent className="p-4">
                              <div className="text-center space-y-2">
                                <RotateCw className="h-6 w-6 text-purple-600 mx-auto" />
                                <p className="font-medium text-purple-700 dark:text-purple-500">
                                  Em Revisão
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Aguardando conclusão das revisões solicitadas
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="comments" className="space-y-4">
                    <div className="space-y-4">
                      {selectedApproval.comments.length === 0 ? (
                        <div className="text-center py-6 text-muted-foreground border rounded-lg">
                          <MessageSquare className="mx-auto h-10 w-10 opacity-20 mb-2" />
                          <p>Nenhum comentário ainda</p>
                        </div>
                      ) : (
                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
                          {selectedApproval.comments.map((comment, index) => (
                            <div key={index} className="p-4 border rounded-lg">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <div className="font-medium">{comment.author}</div>
                                  <div className="text-xs text-muted-foreground">{comment.role}</div>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {formatDate(comment.date)}
                                </div>
                              </div>
                              <p className="text-sm">{comment.content}</p>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <Separator className="my-4" />
                      
                      <div className="space-y-3">
                        <Label htmlFor="new-comment">Adicionar Comentário</Label>
                        <Textarea
                          id="new-comment"
                          placeholder="Escreva seu comentário ou feedback..."
                          className="min-h-[100px]"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                        />
                        <div className="flex justify-end">
                          <Button onClick={handleAddComment}>
                            <Send className="h-4 w-4 mr-2" />
                            Enviar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  {selectedApproval.status === "revisions" && (
                    <TabsContent value="revisions" className="space-y-4">
                      <div className="space-y-4">
                        {selectedApproval.revisionRequests?.map((revision, index) => (
                          <div key={index} className="p-4 border rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center space-x-2">
                                <History className="h-4 w-4 text-purple-600" />
                                <span className="font-medium">Revisão #{index + 1}</span>
                              </div>
                              <RevisionStatusBadge status={revision.status} />
                            </div>
                            <p className="text-sm my-2">{revision.description}</p>
                            <div className="text-xs text-muted-foreground mt-1">
                              Solicitado em: {formatDate(revision.date)}
                            </div>
                          </div>
                        ))}
                        
                        <Button 
                          variant="outline" 
                          className="w-full mt-4"
                          onClick={() => setRevisionDialogOpen(true)}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Adicionar Nova Revisão
                        </Button>
                      </div>
                    </TabsContent>
                  )}
                </Tabs>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Revision Dialog */}
      <Dialog open={revisionDialogOpen} onOpenChange={setRevisionDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Solicitar Revisão</DialogTitle>
            <DialogDescription>
              Descreva as alterações necessárias para o design da prótese.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="revision-description">Descrição da Revisão</Label>
              <Textarea
                id="revision-description"
                placeholder="Descreva detalhadamente as revisões necessárias..."
                className="min-h-[120px]"
                value={revisionDescription}
                onChange={(e) => setRevisionDescription(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="revision-type">Tipo de Revisão</Label>
              <Select defaultValue="structural">
                <SelectTrigger id="revision-type">
                  <SelectValue placeholder="Selecione o tipo de revisão" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="structural">Estrutural</SelectItem>
                  <SelectItem value="aesthetic">Estética</SelectItem>
                  <SelectItem value="functional">Funcional</SelectItem>
                  <SelectItem value="material">Material</SelectItem>
                  <SelectItem value="size">Tamanho/Dimensões</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="revision-priority">Prioridade</Label>
              <Select defaultValue="normal">
                <SelectTrigger id="revision-priority">
                  <SelectValue placeholder="Selecione a prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Baixa</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                  <SelectItem value="urgent">Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRevisionDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleRequestRevisions} className="bg-purple-600 hover:bg-purple-700">
              Solicitar Revisão
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

interface StatusBadgeProps {
  status: ApprovalStatus;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getStatusDetails = () => {
    switch (status) {
      case "pending":
        return { label: "Pendente", variant: "warning" };
      case "revisions":
        return { label: "Em Revisão", variant: "purple" };
      case "approved":
        return { label: "Aprovado", variant: "success" };
      case "rejected":
        return { label: "Rejeitado", variant: "destructive" };
      default:
        return { label: "Desconhecido", variant: "outline" };
    }
  };

  const { label, variant } = getStatusDetails();

  return (
    <Badge
      variant={variant === "success" ? "default" : "outline"}
      className={
        variant === "warning" 
          ? "bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-300"
          : variant === "purple"
          ? "bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-300"
          : variant === "success"
          ? "bg-green-600 hover:bg-green-700"
          : variant === "destructive"
          ? "bg-destructive/10 text-destructive hover:bg-destructive/20 border-destructive/30"
          : ""
      }
    >
      {label}
    </Badge>
  );
};

interface RevisionStatusBadgeProps {
  status: string;
}

const RevisionStatusBadge = ({ status }: RevisionStatusBadgeProps) => {
  const getStatusDetails = () => {
    switch (status) {
      case "pending":
        return { label: "Pendente", variant: "warning" };
      case "in_progress":
        return { label: "Em Andamento", variant: "info" };
      case "completed":
        return { label: "Concluído", variant: "success" };
      default:
        return { label: "Desconhecido", variant: "outline" };
    }
  };

  const { label, variant } = getStatusDetails();

  return (
    <Badge
      variant="outline"
      className={
        variant === "warning" 
          ? "bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-300"
          : variant === "info"
          ? "bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-300"
          : variant === "success"
          ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-300"
          : ""
      }
    >
      {label}
    </Badge>
  );
};

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
};

export default ApprovalWorkflow;
