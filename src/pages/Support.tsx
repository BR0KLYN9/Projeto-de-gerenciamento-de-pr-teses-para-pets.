
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle2, 
  Clock, 
  FileText, 
  Calendar, 
  MessageSquare, 
  AlertCircle,
  Map,
  Send,
  Phone,
  RefreshCw,
  XCircle,
  Plus,
  Tag
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

type TicketStatus = "open" | "in_progress" | "waiting" | "resolved" | "closed";
type TicketPriority = "low" | "medium" | "high" | "urgent";

interface TherapyRecommendation {
  type: string;
  description: string;
  frequency: string;
  duration: string;
}

interface AppointmentDetails {
  date: string;
  time: string;
  practitioner: string;
  location: string;
  notes?: string;
}

interface Message {
  id: string;
  sender: "client" | "staff";
  content: string;
  timestamp: string;
  attachments?: string[];
}

interface SupportTicket {
  id: string;
  clientName: string;
  petName: string;
  petType: string;
  productId: string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
  therapyRecommendations: TherapyRecommendation;
  scheduledAppointment: AppointmentDetails | null;
  closedAt?: string;
}

// Sample data for tickets
const sampleTickets: SupportTicket[] = [
  {
    id: "TK2505",
    clientName: "Rodrigo Almeida",
    petName: "Max",
    petType: "Cachorro",
    productId: "PT1023",
    subject: "Ajuste na prótese frontal",
    description: "A prótese parece um pouco apertada na pata frontal do Max. Ele demonstra desconforto após alguns minutos de uso.",
    status: "open",
    priority: "medium",
    createdAt: "2025-05-14T08:30:00",
    updatedAt: "2025-05-14T08:30:00",
    messages: [
      {
        id: "MSG001",
        sender: "client",
        content: "Bom dia, a prótese que recebemos parece estar um pouco apertada. O Max fica desconfortável depois de usá-la por alguns minutos. Precisamos de ajuste.",
        timestamp: "2025-05-14T08:30:00"
      }
    ],
    therapyRecommendations: {
      type: "Fisioterapia de Adaptação",
      description: "Exercícios de adaptação para a nova prótese, focando em movimentos graduais e controlados",
      frequency: "3 vezes por semana",
      duration: "30 minutos por sessão"
    },
    scheduledAppointment: null
  },
  {
    id: "TK2504",
    clientName: "Patrícia Santos",
    petName: "Nina",
    petType: "Gato",
    productId: "PT1022",
    subject: "Treinamento para uso da prótese",
    description: "Nina recebeu a prótese há 5 dias e está tendo dificuldade em se adaptar. Precisamos de orientação para facilitar o processo.",
    status: "in_progress",
    priority: "medium",
    createdAt: "2025-05-12T14:15:00",
    updatedAt: "2025-05-13T10:20:00",
    messages: [
      {
        id: "MSG002",
        sender: "client",
        content: "Olá, a Nina está com dificuldade para se adaptar à prótese nova. Podem nos ajudar com algumas orientações?",
        timestamp: "2025-05-12T14:15:00"
      },
      {
        id: "MSG003",
        sender: "staff",
        content: "Boa tarde Patrícia! Entendemos a situação. Vamos agendar uma videochamada para amanhã para demonstrar algumas técnicas que podem ajudar a Nina a se adaptar melhor. Qual seria o melhor horário para vocês?",
        timestamp: "2025-05-12T15:45:00"
      },
      {
        id: "MSG004",
        sender: "client",
        content: "Perfeito! Amanhã estamos disponíveis entre 14h e 16h. Qualquer horário nesse intervalo funciona para nós.",
        timestamp: "2025-05-12T16:30:00"
      },
      {
        id: "MSG005",
        sender: "staff",
        content: "Ótimo! Vamos agendar para amanhã às 14:30. Enviaremos o link da chamada por e-mail. Até lá!",
        timestamp: "2025-05-12T17:00:00"
      }
    ],
    therapyRecommendations: {
      type: "Adaptação Progressiva",
      description: "Introdução gradual à prótese com períodos curtos de uso inicialmente, aumentando progressivamente",
      frequency: "Diário",
      duration: "Iniciar com 10 minutos, aumentando 5 minutos por dia"
    },
    scheduledAppointment: {
      date: "2025-05-13",
      time: "14:30",
      practitioner: "Dra. Camila Fernandes",
      location: "Videochamada",
      notes: "Demonstração de técnicas de adaptação para felinos"
    }
  },
  {
    id: "TK2503",
    clientName: "Bruno Costa",
    petName: "Rex",
    petType: "Cachorro",
    productId: "PT1019",
    subject: "Fisioterapia pós-adaptação",
    description: "Rex está usando a prótese há 3 semanas e se adaptou bem. Gostaria de saber se há algum exercício específico que possa ajudar a fortalecer os músculos.",
    status: "resolved",
    priority: "low",
    createdAt: "2025-05-05T09:45:00",
    updatedAt: "2025-05-11T16:30:00",
    messages: [
      {
        id: "MSG006",
        sender: "client",
        content: "Bom dia! O Rex está indo muito bem com a prótese, já se adaptou. Existem exercícios que possam ajudar a fortalecer os músculos da pata?",
        timestamp: "2025-05-05T09:45:00"
      },
      {
        id: "MSG007",
        sender: "staff",
        content: "Olá Bruno! Que ótima notícia sobre o Rex! Sim, temos alguns exercícios específicos que podem ajudar. Vou preparar um material com instruções e enviar para você ainda hoje.",
        timestamp: "2025-05-05T11:20:00"
      },
      {
        id: "MSG008",
        sender: "staff",
        content: "Bruno, segue em anexo o guia de exercícios de fortalecimento. Comece com 10 minutos diários e aumente gradualmente conforme o Rex for se sentindo confortável.",
        timestamp: "2025-05-05T16:40:00"
      },
      {
        id: "MSG009",
        sender: "client",
        content: "Muito obrigado! Já recebi o material e vamos começar hoje mesmo.",
        timestamp: "2025-05-05T17:15:00"
      },
      {
        id: "MSG010",
        sender: "client",
        content: "Queria dar um retorno - o Rex está respondendo super bem aos exercícios. Notamos uma melhora significativa na força e na coordenação!",
        timestamp: "2025-05-11T15:45:00"
      },
      {
        id: "MSG011",
        sender: "staff",
        content: "Que notícia maravilhosa, Bruno! Estamos muito contentes com o progresso do Rex. Continue com os exercícios e, se precisar, estamos à disposição!",
        timestamp: "2025-05-11T16:30:00"
      }
    ],
    therapyRecommendations: {
      type: "Fortalecimento Muscular",
      description: "Exercícios específicos para fortalecer a musculatura ao redor da área da prótese, incluindo caminhadas controladas e exercícios de resistência leve",
      frequency: "5 vezes por semana",
      duration: "15-20 minutos por sessão"
    },
    scheduledAppointment: null
  },
  {
    id: "TK2502",
    clientName: "Fernanda Lima",
    petName: "Bella",
    petType: "Cachorro",
    productId: "PT1015",
    subject: "Manutenção da prótese",
    description: "A prótese da Bella está apresentando algum desgaste no material de contato. Gostaria de agendar uma manutenção.",
    status: "waiting",
    priority: "high",
    createdAt: "2025-04-28T13:10:00",
    updatedAt: "2025-05-12T09:05:00",
    messages: [
      {
        id: "MSG012",
        sender: "client",
        content: "Boa tarde, notei que a parte de contato da prótese da Bella está apresentando desgaste. Precisamos de manutenção.",
        timestamp: "2025-04-28T13:10:00"
      },
      {
        id: "MSG013",
        sender: "staff",
        content: "Olá Fernanda. Obrigado por nos avisar. Poderia enviar algumas fotos do desgaste para avaliarmos?",
        timestamp: "2025-04-28T14:30:00"
      },
      {
        id: "MSG014",
        sender: "client",
        content: "Claro, seguem as fotos em anexo.",
        timestamp: "2025-04-28T15:20:00"
      },
      {
        id: "MSG015",
        sender: "staff",
        content: "Recebemos as fotos. Realmente precisa de manutenção. Podemos agendar para a próxima semana, teria disponibilidade na terça ou quarta-feira?",
        timestamp: "2025-04-29T09:15:00"
      },
      {
        id: "MSG016",
        sender: "client",
        content: "Quarta-feira seria perfeito! Qual horário?",
        timestamp: "2025-04-29T10:40:00"
      },
      {
        id: "MSG017",
        sender: "staff",
        content: "Ótimo! Vamos agendar para quarta, dia 05/05, às 14h. Por favor, confirme se esse horário funciona para você.",
        timestamp: "2025-04-29T11:25:00"
      },
      {
        id: "MSG018",
        sender: "client",
        content: "Confirmado! Estaremos lá na quarta às 14h. Obrigada!",
        timestamp: "2025-04-29T12:10:00"
      },
      {
        id: "MSG019",
        sender: "staff",
        content: "Fernanda, precisamos reagendar sua manutenção devido a um problema técnico no nosso equipamento. Poderia ser na sexta-feira (07/05) no mesmo horário?",
        timestamp: "2025-05-03T16:40:00"
      },
      {
        id: "MSG020",
        sender: "client",
        content: "Sem problemas, sexta às 14h está confirmado!",
        timestamp: "2025-05-03T17:55:00"
      }
    ],
    therapyRecommendations: {
      type: "Adaptação Contínua",
      description: "Manter os exercícios regulares enquanto aguarda a manutenção da prótese",
      frequency: "Diário",
      duration: "15 minutos por sessão"
    },
    scheduledAppointment: {
      date: "2025-05-07",
      time: "14:00",
      practitioner: "Técnico Carlos Oliveira",
      location: "Unidade Central",
      notes: "Traga a prótese e o pet para ajustes finais"
    }
  },
  {
    id: "TK2501",
    clientName: "Gustavo Mendes",
    petName: "Toddy",
    petType: "Cachorro",
    productId: "PT1010",
    subject: "Consulta de acompanhamento",
    description: "Toddy está usando a prótese há 2 meses. Gostaríamos de agendar uma consulta de rotina para verificar se está tudo bem.",
    status: "closed",
    priority: "low",
    createdAt: "2025-04-15T10:30:00",
    updatedAt: "2025-04-25T16:45:00",
    closedAt: "2025-04-25T16:45:00",
    messages: [
      {
        id: "MSG021",
        sender: "client",
        content: "Olá, gostaria de agendar uma consulta de rotina para o Toddy. Ele está usando a prótese há 2 meses já.",
        timestamp: "2025-04-15T10:30:00"
      },
      {
        id: "MSG022",
        sender: "staff",
        content: "Bom dia Gustavo! Podemos agendar para a próxima semana. Quais dias seriam melhores para você?",
        timestamp: "2025-04-15T11:45:00"
      },
      {
        id: "MSG023",
        sender: "client",
        content: "Segunda ou terça seria ideal, de preferência pela manhã.",
        timestamp: "2025-04-15T13:20:00"
      },
      {
        id: "MSG024",
        sender: "staff",
        content: "Perfeito! Temos disponibilidade na terça, dia 21/04, às 10h. Funciona para você?",
        timestamp: "2025-04-15T14:50:00"
      },
      {
        id: "MSG025",
        sender: "client",
        content: "Sim, está ótimo! Confirmo para terça às 10h.",
        timestamp: "2025-04-15T15:30:00"
      },
      {
        id: "MSG026",
        sender: "staff",
        content: "Ótimo! Agendamento confirmado. Até terça-feira!",
        timestamp: "2025-04-15T16:15:00"
      },
      {
        id: "MSG027",
        sender: "staff",
        content: "Gustavo, obrigado pela visita hoje. Como conversamos, o Toddy está se adaptando muito bem à prótese. Continue com os exercícios recomendados e volte daqui a 3 meses para nova avaliação, ou antes se notar qualquer problema.",
        timestamp: "2025-04-21T12:30:00"
      },
      {
        id: "MSG028",
        sender: "client",
        content: "Muito obrigado pelo atendimento! Estou muito satisfeito com os resultados. Seguiremos as recomendações e retornaremos para acompanhamento.",
        timestamp: "2025-04-21T18:45:00"
      }
    ],
    therapyRecommendations: {
      type: "Manutenção",
      description: "Exercícios de manutenção para garantir a adaptação contínua e o fortalecimento muscular",
      frequency: "3 vezes por semana",
      duration: "20 minutos por sessão"
    },
    scheduledAppointment: {
      date: "2025-07-21",
      time: "10:00",
      practitioner: "Dr. Ricardo Sousa",
      location: "Unidade Central",
      notes: "Consulta de acompanhamento trimestral"
    }
  }
];

const Support = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>(sampleTickets);
  const [activeTicket, setActiveTicket] = useState<SupportTicket | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [newMessage, setNewMessage] = useState("");
  
  const getStatusColor = (status: TicketStatus) => {
    switch (status) {
      case "open":
        return "bg-amber-500";
      case "in_progress":
        return "bg-ocean-500";
      case "waiting":
        return "bg-purple-500";
      case "resolved":
        return "bg-green-500";
      case "closed":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };
  
  const getStatusBadge = (status: TicketStatus) => {
    switch (status) {
      case "open":
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800">Aberto</Badge>;
      case "in_progress":
        return <Badge variant="outline" className="bg-ocean-100 text-ocean-800 border-ocean-200 dark:bg-ocean-900/30 dark:text-ocean-400 dark:border-ocean-800">Em Andamento</Badge>;
      case "waiting":
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800">Aguardando</Badge>;
      case "resolved":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">Resolvido</Badge>;
      case "closed":
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-800">Fechado</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };
  
  const getPriorityBadge = (priority: TicketPriority) => {
    switch (priority) {
      case "low":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">Baixa</Badge>;
      case "medium":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800">Média</Badge>;
      case "high":
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800">Alta</Badge>;
      case "urgent":
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800">Urgente</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };
  
  const handleViewTicket = (ticket: SupportTicket) => {
    setActiveTicket(ticket);
  };
  
  const handleSendMessage = () => {
    if (!activeTicket || !newMessage.trim()) return;
    
    const now = new Date().toISOString();
    const newMsg: Message = {
      id: `MSG${Math.floor(Math.random() * 10000)}`,
      sender: "staff",
      content: newMessage,
      timestamp: now
    };
    
    const updatedTicket = {
      ...activeTicket,
      messages: [...activeTicket.messages, newMsg],
      updatedAt: now
    };
    
    const updatedTickets = tickets.map(t => 
      t.id === activeTicket.id ? updatedTicket : t
    );
    
    setActiveTicket(updatedTicket);
    setTickets(updatedTickets);
    setNewMessage("");
    toast.success("Mensagem enviada com sucesso!");
  };
  
  const handleUpdateStatus = (newStatus: TicketStatus) => {
    if (!activeTicket) return;
    
    const now = new Date().toISOString();
    const statusMap: Record<TicketStatus, string> = {
      "open": "aberto",
      "in_progress": "em andamento",
      "waiting": "aguardando",
      "resolved": "resolvido",
      "closed": "fechado"
    };
    
    let updatedTicket = {
      ...activeTicket,
      status: newStatus,
      updatedAt: now
    };
    
    if (newStatus === "closed") {
      updatedTicket = {
        ...updatedTicket,
        closedAt: now
      };
    }
    
    const updatedTickets = tickets.map(t => 
      t.id === activeTicket.id ? updatedTicket : t
    ) as SupportTicket[];
    
    setActiveTicket(updatedTicket as SupportTicket);
    setTickets(updatedTickets);
    toast.success(`Status atualizado para ${statusMap[newStatus]}`);
  };

  const filteredTickets = activeTab === "all" 
    ? tickets 
    : tickets.filter(t => t.status === activeTab);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Suporte ao Cliente</h1>
          <p className="text-muted-foreground">
            Gerenciar chamados de suporte, fisioterapia e acompanhamento de pacientes.
          </p>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="open" className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                <span>Abertos</span>
              </TabsTrigger>
              <TabsTrigger value="in_progress" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Em Andamento</span>
              </TabsTrigger>
              <TabsTrigger value="waiting" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Aguardando</span>
              </TabsTrigger>
              <TabsTrigger value="resolved" className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                <span>Resolvidos</span>
              </TabsTrigger>
              <TabsTrigger value="closed" className="flex items-center gap-2">
                <XCircle className="h-4 w-4" />
                <span>Fechados</span>
              </TabsTrigger>
              <TabsTrigger value="all" className="flex items-center gap-2">
                <span>Todos</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-1 overflow-auto max-h-[70vh]">
              <h2 className="font-semibold mb-3">Chamados ({filteredTickets.length})</h2>
              <div className="space-y-3">
                {filteredTickets.map((ticket) => (
                  <Card 
                    key={ticket.id} 
                    className={`hover:shadow-md transition-shadow cursor-pointer ${activeTicket?.id === ticket.id ? 'border-primary' : ''}`}
                    onClick={() => handleViewTicket(ticket)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{ticket.subject}</h3>
                          <p className="text-sm text-muted-foreground">
                            {ticket.clientName} • {ticket.petName}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs">{ticket.productId}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="mb-1">{getStatusBadge(ticket.status)}</div>
                          <div className="mb-1">{getPriorityBadge(ticket.priority)}</div>
                          <p className="text-xs text-muted-foreground">
                            {new Date(ticket.createdAt).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {filteredTickets.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Nenhum chamado encontrado nesta categoria.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="col-span-1 lg:col-span-2">
              {activeTicket ? (
                <Card className="h-full overflow-hidden flex flex-col">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{activeTicket.subject}</CardTitle>
                        <CardDescription>
                          Ticket #{activeTicket.id} • Criado em {new Date(activeTicket.createdAt).toLocaleDateString('pt-BR')}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        {getStatusBadge(activeTicket.status)}
                        {getPriorityBadge(activeTicket.priority)}
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="h-8" size="sm">
                            <Tag className="h-3.5 w-3.5 mr-1" />
                            Mudar Status
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Atualizar Status</DialogTitle>
                            <DialogDescription>
                              Selecione o novo status para este chamado
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid grid-cols-2 gap-3 py-4">
                            <Button 
                              variant="outline" 
                              className="flex-col h-auto py-3 justify-start items-start"
                              onClick={() => {
                                handleUpdateStatus("open");
                                document.dispatchEvent(new CustomEvent('close-dialog'));
                              }}
                            >
                              <AlertCircle className="h-4 w-4 mb-1" />
                              <span className="font-medium">Aberto</span>
                              <span className="text-xs text-muted-foreground">Novo chamado</span>
                            </Button>
                            <Button 
                              variant="outline" 
                              className="flex-col h-auto py-3 justify-start items-start"
                              onClick={() => {
                                handleUpdateStatus("in_progress");
                                document.dispatchEvent(new CustomEvent('close-dialog'));
                              }}
                            >
                              <Clock className="h-4 w-4 mb-1" />
                              <span className="font-medium">Em Andamento</span>
                              <span className="text-xs text-muted-foreground">Atendimento iniciado</span>
                            </Button>
                            <Button 
                              variant="outline" 
                              className="flex-col h-auto py-3 justify-start items-start"
                              onClick={() => {
                                handleUpdateStatus("waiting");
                                document.dispatchEvent(new CustomEvent('close-dialog'));
                              }}
                            >
                              <RefreshCw className="h-4 w-4 mb-1" />
                              <span className="font-medium">Aguardando</span>
                              <span className="text-xs text-muted-foreground">Esperando cliente/agendamento</span>
                            </Button>
                            <Button 
                              variant="outline" 
                              className="flex-col h-auto py-3 justify-start items-start"
                              onClick={() => {
                                handleUpdateStatus("resolved");
                                document.dispatchEvent(new CustomEvent('close-dialog'));
                              }}
                            >
                              <CheckCircle2 className="h-4 w-4 mb-1" />
                              <span className="font-medium">Resolvido</span>
                              <span className="text-xs text-muted-foreground">Problema solucionado</span>
                            </Button>
                            <Button 
                              variant="outline" 
                              className="flex-col h-auto py-3 justify-start items-start col-span-2"
                              onClick={() => {
                                handleUpdateStatus("closed");
                                document.dispatchEvent(new CustomEvent('close-dialog'));
                              }}
                            >
                              <XCircle className="h-4 w-4 mb-1" />
                              <span className="font-medium">Fechado</span>
                              <span className="text-xs text-muted-foreground">Encerrar definitivamente</span>
                            </Button>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => document.dispatchEvent(new CustomEvent('close-dialog'))}>
                              Cancelar
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Button variant="outline" className="h-8" size="sm">
                        <Phone className="h-3.5 w-3.5 mr-1" />
                        Ligar para Cliente
                      </Button>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="h-8" size="sm">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            Agendar Consulta
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Agendar Consulta</DialogTitle>
                            <DialogDescription>
                              Agende uma consulta para o paciente {activeTicket.petName}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            {/* Simplified form fields */}
                            <div className="flex flex-col gap-1">
                              <label htmlFor="date" className="text-sm font-medium">Data</label>
                              <input 
                                id="date" 
                                type="date" 
                                className="border rounded-md px-3 py-2"
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <label htmlFor="time" className="text-sm font-medium">Horário</label>
                              <input 
                                id="time" 
                                type="time" 
                                className="border rounded-md px-3 py-2"
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <label htmlFor="type" className="text-sm font-medium">Tipo de Consulta</label>
                              <select 
                                id="type" 
                                className="border rounded-md px-3 py-2"
                              >
                                <option value="ajuste">Ajuste de Prótese</option>
                                <option value="fisioterapia">Fisioterapia</option>
                                <option value="acompanhamento">Acompanhamento</option>
                                <option value="avaliacao">Avaliação</option>
                              </select>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit" onClick={() => {
                              toast.success("Consulta agendada com sucesso!");
                              document.dispatchEvent(new CustomEvent('close-dialog'));
                            }}>
                              Agendar
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="h-8" size="sm">
                            <Map className="h-3.5 w-3.5 mr-1" />
                            Fisioterapia
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Recomendações de Fisioterapia</DialogTitle>
                            <DialogDescription>
                              Visualize e atualize as recomendações de fisioterapia para {activeTicket.petName}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4">
                            <div className="mb-4 bg-muted p-3 rounded-md">
                              <h3 className="text-sm font-medium mb-2">Recomendações Atuais</h3>
                              <div className="space-y-2 text-sm">
                                <p><span className="font-medium">Tipo:</span> {activeTicket.therapyRecommendations.type}</p>
                                <p><span className="font-medium">Descrição:</span> {activeTicket.therapyRecommendations.description}</p>
                                <p><span className="font-medium">Frequência:</span> {activeTicket.therapyRecommendations.frequency}</p>
                                <p><span className="font-medium">Duração:</span> {activeTicket.therapyRecommendations.duration}</p>
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              <h3 className="text-sm font-medium">Atualizar Recomendações</h3>
                              <div className="flex flex-col gap-1">
                                <label htmlFor="therapy-type" className="text-xs font-medium">Tipo</label>
                                <input 
                                  id="therapy-type" 
                                  type="text" 
                                  className="border rounded-md px-3 py-2 text-sm"
                                  placeholder="Ex: Fortalecimento Muscular"
                                />
                              </div>
                              <div className="flex flex-col gap-1">
                                <label htmlFor="therapy-desc" className="text-xs font-medium">Descrição</label>
                                <textarea 
                                  id="therapy-desc" 
                                  className="border rounded-md px-3 py-2 text-sm"
                                  placeholder="Descreva os exercícios recomendados"
                                  rows={3}
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col gap-1">
                                  <label htmlFor="therapy-freq" className="text-xs font-medium">Frequência</label>
                                  <input 
                                    id="therapy-freq" 
                                    type="text" 
                                    className="border rounded-md px-3 py-2 text-sm"
                                    placeholder="Ex: 3 vezes por semana"
                                  />
                                </div>
                                <div className="flex flex-col gap-1">
                                  <label htmlFor="therapy-duration" className="text-xs font-medium">Duração</label>
                                  <input 
                                    id="therapy-duration" 
                                    type="text" 
                                    className="border rounded-md px-3 py-2 text-sm"
                                    placeholder="Ex: 20 minutos por sessão"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit" onClick={() => {
                              toast.success("Recomendações de fisioterapia atualizadas!");
                              document.dispatchEvent(new CustomEvent('close-dialog'));
                            }}>
                              Atualizar Recomendações
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  
                  <div className="px-6 py-2 bg-muted/50">
                    <div className="flex justify-between">
                      <div className="text-sm">
                        <span className="font-medium">Cliente:</span> {activeTicket.clientName}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Pet:</span> {activeTicket.petName} ({activeTicket.petType})
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Produto:</span> {activeTicket.productId}
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <CardContent className="p-0 flex-grow overflow-auto">
                    <div className="px-6 py-4 space-y-4 max-h-[360px] overflow-y-auto">
                      <div className="bg-muted p-3 rounded-md">
                        <h3 className="text-sm font-medium mb-2">Descrição do Problema</h3>
                        <p className="text-sm">{activeTicket.description}</p>
                      </div>
                      
                      {activeTicket.messages.map((message) => (
                        <div 
                          key={message.id} 
                          className={`flex ${message.sender === 'client' ? 'justify-start' : 'justify-end'}`}
                        >
                          <div 
                            className={`max-w-[80%] rounded-lg p-3 ${
                              message.sender === 'client' 
                                ? 'bg-muted' 
                                : 'bg-primary text-primary-foreground'
                            }`}
                          >
                            <div className="text-sm">{message.content}</div>
                            <div className="text-xs mt-1 text-right opacity-70">
                              {new Date(message.timestamp).toLocaleTimeString('pt-BR', { 
                                hour: '2-digit', 
                                minute: '2-digit',
                                day: '2-digit',
                                month: '2-digit'
                              })}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="p-4 mt-auto border-t">
                    {activeTicket.status !== "closed" ? (
                      <div className="flex items-center w-full gap-2">
                        <input
                          type="text"
                          placeholder="Digite sua mensagem..."
                          className="flex-grow px-3 py-2 rounded-md border"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                        />
                        <Button 
                          onClick={handleSendMessage}
                          disabled={!newMessage.trim()}
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Enviar
                        </Button>
                      </div>
                    ) : (
                      <div className="w-full text-center text-muted-foreground text-sm bg-muted py-2 rounded-md">
                        Este chamado foi fechado em {activeTicket.closedAt ? new Date(activeTicket.closedAt).toLocaleDateString('pt-BR') : 'data desconhecida'}
                      </div>
                    )}
                  </CardFooter>
                </Card>
              ) : (
                <div className="h-full flex items-center justify-center border rounded-lg">
                  <div className="text-center p-8">
                    <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/60" />
                    <h3 className="mt-4 text-lg font-medium">Nenhum chamado selecionado</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Selecione um chamado da lista para visualizar os detalhes.
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

export default Support;
