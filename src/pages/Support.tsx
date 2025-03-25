
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
  MessageSquare,
  Clock,
  Search,
  Dog,
  Cat,
  Mail,
  Phone,
  Calendar,
  AlertCircle,
  Tag,
  Plus,
  Send,
  MessageCircle,
  Star,
  ChevronRight,
  Check,
  FileText,
  HeartHandshake,
  Paperclip,
  Video,
  Activity,
  ClipboardList,
  ClipboardCheck,
  Edit,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Sample support tickets
const SAMPLE_TICKETS = [
  {
    id: "ST-2023-001",
    clientName: "Carlos Silva",
    petName: "Rex",
    petType: "dog",
    productId: "OB-2023-001",
    subject: "Ajuste necessário na prótese",
    description: "A prótese está causando um pouco de desconforto na parte superior. Precisamos de ajustes.",
    status: "open",
    priority: "high",
    createdAt: "2023-09-05",
    updatedAt: "2023-09-05",
    messages: [
      {
        author: "Carlos Silva",
        role: "cliente",
        content: "Olá, a prótese do Rex está um pouco apertada na região superior e está causando desconforto. Poderiam me ajudar?",
        timestamp: "2023-09-05T10:23:00",
        attachments: []
      },
      {
        author: "Ana Souza",
        role: "suporte",
        content: "Olá Carlos, lamento pelo desconforto. Poderia enviar fotos da região afetada? Isso nos ajudará a identificar o ajuste necessário.",
        timestamp: "2023-09-05T14:30:00",
        attachments: []
      },
      {
        author: "Carlos Silva",
        role: "cliente",
        content: "Claro, acabei de enviar as fotos por e-mail. É possível ajustar sem precisar fazer uma nova prótese?",
        timestamp: "2023-09-05T15:45:00",
        attachments: [
          { name: "foto1.jpg", size: "2.3 MB", type: "image" }
        ]
      }
    ],
    therapyRecommendations: null,
    scheduledAppointment: null
  },
  {
    id: "ST-2023-002",
    clientName: "Marina Costa",
    petName: "Luna",
    petType: "cat",
    productId: "OB-2023-002",
    subject: "Dúvidas sobre adaptação",
    description: "Estou com dúvidas sobre como ajudar Luna a se adaptar à prótese",
    status: "in_progress",
    priority: "normal",
    createdAt: "2023-09-03",
    updatedAt: "2023-09-04",
    messages: [
      {
        author: "Marina Costa",
        role: "cliente",
        content: "Olá, recebi a prótese da Luna, mas ela está tendo dificuldade para se adaptar. Vocês têm alguma recomendação?",
        timestamp: "2023-09-03T09:15:00",
        attachments: []
      },
      {
        author: "Pedro Santos",
        role: "suporte",
        content: "Olá Marina! Entendo sua preocupação. A adaptação para gatos pode ser um pouco mais desafiadora. Deixe-me compartilhar algumas recomendações...",
        timestamp: "2023-09-03T11:20:00",
        attachments: []
      },
      {
        author: "Pedro Santos",
        role: "suporte",
        content: "Preparei um guia especial para adaptação de gatos. Verifique o anexo abaixo. Recomendo também sessões curtas com a prótese, aumentando gradualmente o tempo.",
        timestamp: "2023-09-03T11:25:00",
        attachments: [
          { name: "guia-adaptacao-gatos.pdf", size: "1.5 MB", type: "document" }
        ]
      },
      {
        author: "Marina Costa",
        role: "cliente",
        content: "Muito obrigada! Vou seguir essas recomendações. Uma dúvida: quanto tempo em média leva para a completa adaptação?",
        timestamp: "2023-09-04T10:05:00",
        attachments: []
      }
    ],
    therapyRecommendations: {
      recommendedBy: "Dr. Ana Lima",
      recommendation: "Exercícios leves de adaptação, 15 minutos, 3x ao dia",
      date: "2023-09-04"
    },
    scheduledAppointment: null
  },
  {
    id: "ST-2023-003",
    clientName: "João Mendes",
    petName: "Toby",
    petType: "dog",
    productId: "OB-2023-003",
    subject: "Fisioterapia pós-adaptação",
    description: "Procurando recomendações para fisioterapia",
    status: "closed",
    priority: "normal",
    createdAt: "2023-08-25",
    updatedAt: "2023-08-29",
    closedAt: "2023-08-29",
    messages: [
      {
        author: "João Mendes",
        role: "cliente",
        content: "Olá! O Toby já está se adaptando muito bem com a prótese, mas gostaria de saber se vocês têm recomendações para fisioterapia que ajudariam no fortalecimento muscular.",
        timestamp: "2023-08-25T16:40:00",
        attachments: []
      },
      {
        author: "Carla Oliveira",
        role: "especialista",
        content: "Olá João! Fico feliz em saber que o Toby está se adaptando bem. Para o caso dele, recomendamos algumas sessões de fisioterapia específicas que ajudarão no fortalecimento da musculatura.",
        timestamp: "2023-08-26T09:30:00",
        attachments: []
      },
      {
        author: "João Mendes",
        role: "cliente",
        content: "Isso seria ótimo. Vocês têm profissionais parceiros que recomendam?",
        timestamp: "2023-08-26T10:45:00",
        attachments: []
      },
      {
        author: "Carla Oliveira",
        role: "especialista",
        content: "Sim! Temos parceria com a Clínica PetFisio, que é especializada em reabilitação para animais com próteses. Estou enviando o contato e um plano inicial de exercícios que você pode fazer em casa.",
        timestamp: "2023-08-28T14:15:00",
        attachments: [
          { name: "plano-exercicios-toby.pdf", size: "2.1 MB", type: "document" },
          { name: "clinicas-parceiras.pdf", size: "1.2 MB", type: "document" }
        ]
      },
      {
        author: "João Mendes",
        role: "cliente",
        content: "Perfeito! Já entrei em contato com eles e agendei a primeira sessão. Muito obrigado pela ajuda!",
        timestamp: "2023-08-29T11:20:00",
        attachments: []
      }
    ],
    therapyRecommendations: {
      recommendedBy: "Dr. Paulo Ribeiro",
      recommendation: "10 sessões de hidroterapia e exercícios de fortalecimento",
      date: "2023-08-28"
    },
    scheduledAppointment: {
      date: "2023-09-05",
      time: "14:00",
      with: "Dr. Paulo Ribeiro",
      location: "Clínica PetFisio",
      type: "fisioterapia"
    }
  },
  {
    id: "ST-2023-004",
    clientName: "Sofia Almeida",
    petName: "Ziggy",
    petType: "dog",
    productId: "OB-2023-004",
    subject: "Agendamento de consulta de acompanhamento",
    description: "Solicitando agendamento para avaliação de progresso",
    status: "open",
    priority: "normal",
    createdAt: "2023-09-04",
    updatedAt: "2023-09-04",
    messages: [
      {
        author: "Sofia Almeida",
        role: "cliente",
        content: "Bom dia! Gostaria de agendar uma consulta de acompanhamento para o Ziggy. Já faz duas semanas que ele está usando a prótese e queria uma avaliação profissional do progresso.",
        timestamp: "2023-09-04T08:50:00",
        attachments: []
      }
    ],
    therapyRecommendations: null,
    scheduledAppointment: null
  },
  {
    id: "ST-2023-005",
    clientName: "Roberto Dias",
    petName: "Bella",
    petType: "dog",
    productId: "OB-2023-005",
    subject: "Dúvida sobre garantia",
    description: "Solicitando informações sobre a política de garantia",
    status: "closed",
    priority: "low",
    createdAt: "2023-08-22",
    updatedAt: "2023-08-23",
    closedAt: "2023-08-23",
    messages: [
      {
        author: "Roberto Dias",
        role: "cliente",
        content: "Olá, gostaria de saber mais detalhes sobre a garantia da prótese. Qual é o período coberto e o que exatamente está incluído nela?",
        timestamp: "2023-08-22T13:10:00",
        attachments: []
      },
      {
        author: "Pedro Santos",
        role: "suporte",
        content: "Olá Roberto, a garantia da prótese é de 6 meses a partir da data de entrega. Ela cobre defeitos de fabricação, ajustes necessários e substituição de peças. Estou anexando nossa política completa para sua consulta.",
        timestamp: "2023-08-22T15:40:00",
        attachments: [
          { name: "politica-garantia.pdf", size: "0.8 MB", type: "document" }
        ]
      },
      {
        author: "Roberto Dias",
        role: "cliente",
        content: "Perfeito, muito obrigado pela informação e pela rapidez na resposta!",
        timestamp: "2023-08-23T09:15:00",
        attachments: []
      }
    ],
    therapyRecommendations: null,
    scheduledAppointment: null
  }
];

// Sample knowledge base articles
const KNOWLEDGE_BASE_ARTICLES = [
  {
    id: 1,
    title: "Como ajudar seu pet a se adaptar a uma prótese",
    category: "Adaptação",
    excerpt: "Guia completo para facilitar a adaptação de cães e gatos a novas próteses.",
    readingTime: "5 min",
    createdAt: "2023-08-10"
  },
  {
    id: 2,
    title: "Cuidados diários com próteses para pets",
    category: "Manutenção",
    excerpt: "Aprenda como cuidar e manter a prótese do seu pet em perfeito estado.",
    readingTime: "4 min",
    createdAt: "2023-08-15"
  },
  {
    id: 3,
    title: "Exercícios recomendados para reabilitação",
    category: "Fisioterapia",
    excerpt: "Série de exercícios que ajudam na recuperação e adaptação de pets com próteses.",
    readingTime: "7 min",
    createdAt: "2023-08-20"
  },
  {
    id: 4,
    title: "Sinais de problemas em próteses: quando buscar ajuda",
    category: "Saúde",
    excerpt: "Aprenda a identificar sinais de que a prótese pode estar causando desconforto ou problemas.",
    readingTime: "3 min",
    createdAt: "2023-08-25"
  },
  {
    id: 5,
    title: "Perguntas frequentes sobre garantia e suporte",
    category: "Suporte",
    excerpt: "Respostas para as dúvidas mais comuns sobre nossos serviços de suporte e políticas de garantia.",
    readingTime: "6 min",
    createdAt: "2023-08-30"
  }
];

// Sample therapy partners
const THERAPY_PARTNERS = [
  {
    id: 1,
    name: "Clínica PetFisio",
    specialty: "Fisioterapia e Reabilitação",
    address: "Av. Paulista, 1200, São Paulo - SP",
    phone: "(11) 3456-7890",
    email: "contato@petfisio.com.br",
    rating: 4.8,
    services: ["Hidroterapia", "Laserterapia", "Eletroestimulação", "Acupuntura"]
  },
  {
    id: 2,
    name: "Centro de Reabilitação Animal",
    specialty: "Reabilitação Neurológica e Ortopédica",
    address: "Rua das Flores, 300, Rio de Janeiro - RJ",
    phone: "(21) 2345-6789",
    email: "contato@reabilitacaoanimal.com.br",
    rating: 4.7,
    services: ["Fisioterapia", "Hidroterapia", "Terapia de Fortalecimento"]
  },
  {
    id: 3,
    name: "PetReab",
    specialty: "Reabilitação Pós-Cirúrgica",
    address: "Av. do Contorno, 500, Belo Horizonte - MG",
    phone: "(31) 3456-7890",
    email: "contato@petreab.com.br",
    rating: 4.5,
    services: ["Fisioterapia", "Terapia Ocupacional", "Hidroterapia"]
  },
  {
    id: 4,
    name: "Fisiovet",
    specialty: "Fisioterapia Animal",
    address: "Rua Dr. Neto, 123, Curitiba - PR",
    phone: "(41) 3456-7890",
    email: "contato@fisiovet.com.br",
    rating: 4.9,
    services: ["Fisioterapia", "Laserterapia", "Acupuntura", "Massoterapia"]
  }
];

type TicketStatus = "open" | "in_progress" | "closed";
type TicketPriority = "low" | "normal" | "high";

const Support = () => {
  const [tickets, setTickets] = useState(SAMPLE_TICKETS);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<TicketStatus | "all">("all");
  const [selectedTicket, setSelectedTicket] = useState(tickets[0]);
  const [newMessage, setNewMessage] = useState("");
  const [createTicketDialogOpen, setCreateTicketDialogOpen] = useState(false);
  const [newTicket, setNewTicket] = useState({
    clientName: "",
    petName: "",
    petType: "dog",
    productId: "",
    subject: "",
    description: "",
    priority: "normal" as TicketPriority
  });
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    date: "",
    time: "",
    with: "",
    location: "",
    type: "fisioterapia"
  });
  const [therapyRecommendationDialogOpen, setTherapyRecommendationDialogOpen] = useState(false);
  const [newTherapyRecommendation, setNewTherapyRecommendation] = useState({
    recommendedBy: "",
    recommendation: ""
  });

  const filteredTickets = tickets.filter(ticket => 
    (statusFilter === "all" || ticket.status === statusFilter) &&
    (
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleTicketSelect = (ticket: any) => {
    setSelectedTicket(ticket);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) {
      toast.error("A mensagem não pode estar vazia.");
      return;
    }

    const newMessageObj = {
      author: "Você",
      role: "suporte",
      content: newMessage,
      timestamp: new Date().toISOString(),
      attachments: []
    };

    const updatedTicket = {
      ...selectedTicket,
      messages: [...selectedTicket.messages, newMessageObj],
      status: selectedTicket.status === "open" ? "in_progress" as TicketStatus : selectedTicket.status,
      updatedAt: new Date().toISOString().split('T')[0]
    };

    const updatedTickets = tickets.map(ticket => 
      ticket.id === selectedTicket.id ? updatedTicket : ticket
    );

    setTickets(updatedTickets);
    setSelectedTicket(updatedTicket);
    setNewMessage("");
    toast.success("Mensagem enviada com sucesso!");
  };

  const handleCreateTicket = () => {
    if (!newTicket.clientName || !newTicket.subject || !newTicket.description) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const currentDate = new Date().toISOString().split('T')[0];
    const newTicketObj = {
      id: `ST-2023-${tickets.length + 1}`.padStart(11, '0'),
      ...newTicket,
      status: "open" as TicketStatus,
      createdAt: currentDate,
      updatedAt: currentDate,
      messages: [
        {
          author: newTicket.clientName,
          role: "cliente",
          content: newTicket.description,
          timestamp: new Date().toISOString(),
          attachments: []
        }
      ],
      therapyRecommendations: null,
      scheduledAppointment: null
    };

    setTickets([...tickets, newTicketObj]);
    setCreateTicketDialogOpen(false);
    setNewTicket({
      clientName: "",
      petName: "",
      petType: "dog",
      productId: "",
      subject: "",
      description: "",
      priority: "normal"
    });
    toast.success("Ticket criado com sucesso!");
  };

  const handleChangeTicketStatus = (status: TicketStatus) => {
    const updatedTicket = {
      ...selectedTicket,
      status,
      updatedAt: new Date().toISOString().split('T')[0],
      ...(status === "closed" ? { closedAt: new Date().toISOString().split('T')[0] } : {})
    };

    const updatedTickets = tickets.map(ticket => 
      ticket.id === selectedTicket.id ? updatedTicket : ticket
    );

    setTickets(updatedTickets);
    setSelectedTicket(updatedTicket);
    toast.success(`Status do ticket atualizado para ${getStatusLabel(status)}`);
  };

  const handleAddAppointment = () => {
    if (!newAppointment.date || !newAppointment.time || !newAppointment.with) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const updatedTicket = {
      ...selectedTicket,
      scheduledAppointment: newAppointment,
      updatedAt: new Date().toISOString().split('T')[0],
      messages: [
        ...selectedTicket.messages,
        {
          author: "Sistema",
          role: "sistema",
          content: `Agendamento marcado: ${newAppointment.type} com ${newAppointment.with} no dia ${formatDate(newAppointment.date)} às ${newAppointment.time} em ${newAppointment.location || "Local a definir"}.`,
          timestamp: new Date().toISOString(),
          attachments: []
        }
      ]
    };

    const updatedTickets = tickets.map(ticket => 
      ticket.id === selectedTicket.id ? updatedTicket : ticket
    );

    setTickets(updatedTickets);
    setSelectedTicket(updatedTicket);
    setScheduleDialogOpen(false);
    setNewAppointment({
      date: "",
      time: "",
      with: "",
      location: "",
      type: "fisioterapia"
    });
    toast.success("Agendamento adicionado com sucesso!");
  };

  const handleAddTherapyRecommendation = () => {
    if (!newTherapyRecommendation.recommendedBy || !newTherapyRecommendation.recommendation) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const updatedTicket = {
      ...selectedTicket,
      therapyRecommendations: {
        ...newTherapyRecommendation,
        date: new Date().toISOString().split('T')[0]
      },
      updatedAt: new Date().toISOString().split('T')[0],
      messages: [
        ...selectedTicket.messages,
        {
          author: "Sistema",
          role: "sistema",
          content: `Nova recomendação de terapia por ${newTherapyRecommendation.recommendedBy}: ${newTherapyRecommendation.recommendation}`,
          timestamp: new Date().toISOString(),
          attachments: []
        }
      ]
    };

    const updatedTickets = tickets.map(ticket => 
      ticket.id === selectedTicket.id ? updatedTicket : ticket
    );

    setTickets(updatedTickets);
    setSelectedTicket(updatedTicket);
    setTherapyRecommendationDialogOpen(false);
    setNewTherapyRecommendation({
      recommendedBy: "",
      recommendation: ""
    });
    toast.success("Recomendação de terapia adicionada com sucesso!");
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Suporte ao Cliente</h1>
          <p className="text-muted-foreground">
            Gerencie tickets de suporte, recomendações de fisioterapia e acompanhamento pós-produção.
          </p>
        </div>

        <Tabs defaultValue="tickets">
          <TabsList className="w-full border-b mb-4 pb-0">
            <TabsTrigger value="tickets" className="flex-1">
              <MessageSquare className="h-4 w-4 mr-2" />
              Tickets de Suporte
            </TabsTrigger>
            <TabsTrigger value="knowledge" className="flex-1">
              <FileText className="h-4 w-4 mr-2" />
              Base de Conhecimento
            </TabsTrigger>
            <TabsTrigger value="therapy" className="flex-1">
              <HeartHandshake className="h-4 w-4 mr-2" />
              Parceiros de Fisioterapia
            </TabsTrigger>
          </TabsList>

          {/* Tickets Tab */}
          <TabsContent value="tickets" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Ticket List */}
              <Card className="lg:col-span-1">
                <CardHeader className="space-y-4 pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle>Tickets</CardTitle>
                    <Button 
                      onClick={() => setCreateTicketDialogOpen(true)} 
                      className="bg-ocean-600 hover:bg-ocean-700"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Novo
                    </Button>
                  </div>
                  <div className="flex flex-col space-y-3">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Buscar ticket..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
                      <Button
                        variant={statusFilter === "all" ? "default" : "outline"}
                        size="sm"
                        className={statusFilter === "all" ? "bg-ocean-600 hover:bg-ocean-700" : ""}
                        onClick={() => setStatusFilter("all")}
                      >
                        Todos
                      </Button>
                      <Button
                        variant={statusFilter === "open" ? "default" : "outline"}
                        size="sm"
                        className={statusFilter === "open" ? "bg-amber-600 hover:bg-amber-700" : ""}
                        onClick={() => setStatusFilter("open")}
                      >
                        Abertos
                      </Button>
                      <Button
                        variant={statusFilter === "in_progress" ? "default" : "outline"}
                        size="sm"
                        className={statusFilter === "in_progress" ? "bg-purple-600 hover:bg-purple-700" : ""}
                        onClick={() => setStatusFilter("in_progress")}
                      >
                        Em Andamento
                      </Button>
                      <Button
                        variant={statusFilter === "closed" ? "default" : "outline"}
                        size="sm"
                        className={statusFilter === "closed" ? "bg-green-600 hover:bg-green-700" : ""}
                        onClick={() => setStatusFilter("closed")}
                      >
                        Resolvidos
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                    {filteredTickets.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <MessageSquare className="mx-auto h-12 w-12 opacity-20 mb-2" />
                        <p>Nenhum ticket encontrado</p>
                      </div>
                    ) : (
                      filteredTickets.map((ticket) => (
                        <div
                          key={ticket.id}
                          className={`p-3 rounded-lg cursor-pointer transition-all border ${
                            selectedTicket?.id === ticket.id
                              ? "border-primary bg-primary/5"
                              : "hover:border-ocean-300 dark:hover:border-ocean-700"
                          }`}
                          onClick={() => handleTicketSelect(ticket)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                              {ticket.petType === "dog" ? (
                                <Dog className="h-5 w-5 text-ocean-600 dark:text-ocean-400" />
                              ) : (
                                <Cat className="h-5 w-5 text-ocean-600 dark:text-ocean-400" />
                              )}
                              <div>
                                <div className="font-medium">{ticket.subject}</div>
                                <div className="text-sm text-muted-foreground">
                                  {ticket.clientName} - {ticket.petName}
                                </div>
                              </div>
                            </div>
                            <TicketStatusBadge status={ticket.status as TicketStatus} />
                          </div>
                          <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {formatDate(ticket.createdAt)}
                            </div>
                            <div className="flex items-center">
                              <MessageSquare className="h-3 w-3 mr-1" />
                              {ticket.messages.length} mensagens
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Ticket Details */}
              <Card className="lg:col-span-2">
                <CardHeader className="pb-3">
                  <CardTitle>
                    {selectedTicket ? (
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <span>
                            {selectedTicket.subject}
                          </span>
                          <TicketStatusBadge status={selectedTicket.status as TicketStatus} />
                          <PriorityBadge priority={selectedTicket.priority as TicketPriority} />
                        </div>
                        {selectedTicket.status !== "closed" && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm">
                                Ações <ChevronRight className="h-4 w-4 ml-1" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Gerenciar Ticket</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              {selectedTicket.status === "open" && (
                                <DropdownMenuItem onClick={() => handleChangeTicketStatus("in_progress")}>
                                  <Clock className="h-4 w-4 mr-2" />
                                  Marcar em Progresso
                                </DropdownMenuItem>
                              )}
                              {selectedTicket.status !== "closed" && (
                                <DropdownMenuItem onClick={() => handleChangeTicketStatus("closed")}>
                                  <Check className="h-4 w-4 mr-2" />
                                  Marcar como Resolvido
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem onClick={() => setTherapyRecommendationDialogOpen(true)}>
                                <ClipboardList className="h-4 w-4 mr-2" />
                                Adicionar Recomendação
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => setScheduleDialogOpen(true)}>
                                <Calendar className="h-4 w-4 mr-2" />
                                Agendar Consulta
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    ) : (
                      "Selecione um ticket"
                    )}
                  </CardTitle>
                  {selectedTicket && (
                    <CardDescription>
                      ID: {selectedTicket.id} | Cliente: {selectedTicket.clientName} | Pet: {selectedTicket.petName}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  {!selectedTicket ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <AlertCircle className="mx-auto h-16 w-16 opacity-20 mb-4" />
                      <p className="text-lg">Selecione um ticket para ver os detalhes</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Information Cards */}
                      {(selectedTicket.therapyRecommendations || selectedTicket.scheduledAppointment) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          {selectedTicket.therapyRecommendations && (
                            <Card className="border-purple-300 bg-purple-50 dark:bg-purple-900/10">
                              <CardContent className="p-4">
                                <div className="flex items-start space-x-3">
                                  <ClipboardCheck className="h-5 w-5 text-purple-600 shrink-0 mt-0.5" />
                                  <div>
                                    <h4 className="text-sm font-medium text-purple-900 dark:text-purple-300">Recomendação de Terapia</h4>
                                    <p className="text-xs text-purple-800 dark:text-purple-400 mt-1">
                                      Por: {selectedTicket.therapyRecommendations.recommendedBy}
                                    </p>
                                    <p className="text-xs text-purple-800 dark:text-purple-400 mt-1">
                                      {selectedTicket.therapyRecommendations.recommendation}
                                    </p>
                                    <p className="text-xs text-purple-700/70 dark:text-purple-400/70 mt-2">
                                      Adicionado em {formatDate(selectedTicket.therapyRecommendations.date)}
                                    </p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          )}
                          
                          {selectedTicket.scheduledAppointment && (
                            <Card className="border-green-300 bg-green-50 dark:bg-green-900/10">
                              <CardContent className="p-4">
                                <div className="flex items-start space-x-3">
                                  <Calendar className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                  <div>
                                    <h4 className="text-sm font-medium text-green-900 dark:text-green-300">Agendamento</h4>
                                    <p className="text-xs text-green-800 dark:text-green-400 mt-1">
                                      {selectedTicket.scheduledAppointment.type.charAt(0).toUpperCase() + selectedTicket.scheduledAppointment.type.slice(1)} com {selectedTicket.scheduledAppointment.with}
                                    </p>
                                    <p className="text-xs text-green-800 dark:text-green-400 mt-1">
                                      Data: {formatDate(selectedTicket.scheduledAppointment.date)} às {selectedTicket.scheduledAppointment.time}
                                    </p>
                                    <p className="text-xs text-green-800 dark:text-green-400 mt-1">
                                      Local: {selectedTicket.scheduledAppointment.location}
                                    </p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          )}
                        </div>
                      )}
                      
                      {/* Messages */}
                      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
                        {selectedTicket.messages.map((message, index) => (
                          <div 
                            key={index} 
                            className={`p-4 rounded-lg ${
                              message.role === "cliente" 
                                ? "bg-muted/50 border"
                                : message.role === "sistema"
                                ? "bg-ocean-50 dark:bg-ocean-900/10 border-ocean-200 dark:border-ocean-800 border"
                                : "bg-primary/5 border-primary/20 border"
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center">
                                <span className="font-medium">{message.author}</span>
                                <Badge 
                                  variant="outline" 
                                  className={`ml-2 text-xs ${
                                    message.role === "cliente"
                                      ? "bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-300"
                                      : message.role === "sistema"
                                      ? "bg-ocean-100 text-ocean-800 hover:bg-ocean-100 border-ocean-300"
                                      : "bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-300"
                                  }`}
                                >
                                  {message.role.charAt(0).toUpperCase() + message.role.slice(1)}
                                </Badge>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {formatDateTime(message.timestamp)}
                              </div>
                            </div>
                            <p className="text-sm whitespace-pre-line">
                              {message.content}
                            </p>
                            {message.attachments.length > 0 && (
                              <div className="mt-3 space-y-2">
                                <div className="text-xs font-medium text-muted-foreground">Anexos:</div>
                                <div className="flex flex-wrap gap-2">
                                  {message.attachments.map((attachment, idx) => (
                                    <div 
                                      key={idx}
                                      className="flex items-center space-x-2 bg-background border rounded-md px-3 py-1.5 text-xs"
                                    >
                                      <Paperclip className="h-3 w-3 text-muted-foreground" />
                                      <span>{attachment.name}</span>
                                      <Badge variant="outline" className="ml-1 text-[10px] px-1">
                                        {attachment.size}
                                      </Badge>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      
                      {/* Reply Box */}
                      {selectedTicket.status !== "closed" && (
                        <div className="space-y-3 pt-3 border-t">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="reply" className="text-sm font-medium">
                              Responder
                            </Label>
                            <div className="flex space-x-1">
                              <Button variant="outline" size="sm" className="h-7 px-2">
                                <Paperclip className="h-3.5 w-3.5" />
                              </Button>
                              <Button variant="outline" size="sm" className="h-7 px-2">
                                <Video className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </div>
                          <Textarea
                            id="reply"
                            placeholder="Digite sua resposta..."
                            className="min-h-[100px]"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                          />
                          <div className="flex justify-end">
                            <Button 
                              onClick={handleSendMessage}
                              className="bg-ocean-600 hover:bg-ocean-700"
                            >
                              <Send className="h-4 w-4 mr-2" />
                              Enviar
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Knowledge Base Tab */}
          <TabsContent value="knowledge" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-3">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle>Base de Conhecimento</CardTitle>
                    <div className="relative w-full max-w-sm">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Buscar artigos..."
                        className="pl-8"
                      />
                    </div>
                  </div>
                  <CardDescription>
                    Artigos e guias para suporte e fisioterapia pós-produção
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {KNOWLEDGE_BASE_ARTICLES.map((article) => (
                      <Card key={article.id} className="hover-lift">
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-base">{article.title}</CardTitle>
                            <Badge variant="outline" className="ml-2 shrink-0">
                              {article.category}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-3">
                          <p className="text-sm text-muted-foreground">
                            {article.excerpt}
                          </p>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {article.readingTime}
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 px-2 text-ocean-600 hover:text-ocean-700 hover:bg-ocean-50 dark:text-ocean-400 dark:hover:bg-ocean-900/20"
                            onClick={() => toast.success("Artigo aberto!")}
                          >
                            Ler artigo
                            <ChevronRight className="h-3 w-3 ml-1" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Therapy Partners Tab */}
          <TabsContent value="therapy" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-3">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Parceiros de Fisioterapia</h2>
                  <Button 
                    variant="outline"
                    onClick={() => toast.success("Planilha exportada com sucesso!")}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Exportar Lista
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {THERAPY_PARTNERS.map((partner) => (
                    <Card key={partner.id} className="hover-lift">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{partner.name}</CardTitle>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                            <span className="ml-1 text-sm">{partner.rating}</span>
                          </div>
                        </div>
                        <CardDescription>
                          {partner.specialty}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3 pb-3">
                        <div className="text-sm">
                          <div className="flex items-center mb-1">
                            <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                            <span>{partner.address}</span>
                          </div>
                          <div className="flex items-center mb-1">
                            <Phone className="h-4 w-4 text-muted-foreground mr-2" />
                            <span>{partner.phone}</span>
                          </div>
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 text-muted-foreground mr-2" />
                            <span>{partner.email}</span>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Serviços</h4>
                          <div className="flex flex-wrap gap-2">
                            {partner.services.map((service, index) => (
                              <Badge key={index} variant="outline">
                                {service}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-3 border-t">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toast.success("Informações de contato copiadas!")}
                        >
                          <Phone className="h-3.5 w-3.5 mr-1" />
                          Contatar
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toast.success("Redirecionando para o mapa...")}
                        >
                          <MapPin className="h-3.5 w-3.5 mr-1" />
                          Ver no Mapa
                        </Button>
                        <Button 
                          size="sm"
                          className="bg-ocean-600 hover:bg-ocean-700"
                          onClick={() => setScheduleDialogOpen(true)}
                        >
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          Agendar
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Recursos para Profissionais</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="hover-lift">
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center">
                          <div className="p-3 bg-ocean-100 dark:bg-ocean-900/50 rounded-full mb-4">
                            <FileText className="h-6 w-6 text-ocean-600 dark:text-ocean-400" />
                          </div>
                          <h3 className="font-medium mb-2">Guias para Fisioterapeutas</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Materiais especializados para profissionais de fisioterapia animal.
                          </p>
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => toast.success("Guias abertos!")}
                          >
                            Acessar Guias
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="hover-lift">
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center">
                          <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-full mb-4">
                            <Activity className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                          </div>
                          <h3 className="font-medium mb-2">Planos de Reabilitação</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Modelos de planos de reabilitação para diferentes tipos de próteses.
                          </p>
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => toast.success("Planos abertos!")}
                          >
                            Ver Planos
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="hover-lift">
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center">
                          <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-full mb-4">
                            <Video className="h-6 w-6 text-green-600 dark:text-green-400" />
                          </div>
                          <h3 className="font-medium mb-2">Vídeos Educativos</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Tutoriais e demonstrações para técnicas de fisioterapia com próteses.
                          </p>
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => toast.success("Biblioteca de vídeos aberta!")}
                          >
                            Assistir Vídeos
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Ticket Dialog */}
      <Dialog open={createTicketDialogOpen} onOpenChange={setCreateTicketDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Criar Novo Ticket</DialogTitle>
            <DialogDescription>
              Crie um novo ticket de suporte para atendimento ao cliente.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="client-name">Nome do Cliente*</Label>
                <Input
                  id="client-name"
                  value={newTicket.clientName}
                  onChange={(e) => setNewTicket({...newTicket, clientName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-id">ID do Produto</Label>
                <Input
                  id="product-id"
                  placeholder="ex: OB-2023-001"
                  value={newTicket.productId}
                  onChange={(e) => setNewTicket({...newTicket, productId: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pet-name">Nome do Pet</Label>
                <Input
                  id="pet-name"
                  value={newTicket.petName}
                  onChange={(e) => setNewTicket({...newTicket, petName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pet-type">Tipo do Pet</Label>
                <Select 
                  value={newTicket.petType} 
                  onValueChange={(value) => setNewTicket({...newTicket, petType: value})}
                >
                  <SelectTrigger id="pet-type">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dog">Cão</SelectItem>
                    <SelectItem value="cat">Gato</SelectItem>
                    <SelectItem value="other">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject">Assunto*</Label>
              <Input
                id="subject"
                value={newTicket.subject}
                onChange={(e) => setNewTicket({...newTicket, subject: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Descrição*</Label>
              <Textarea
                id="description"
                className="min-h-[100px]"
                value={newTicket.description}
                onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="priority">Prioridade</Label>
              <Select 
                value={newTicket.priority} 
                onValueChange={(value) => setNewTicket({...newTicket, priority: value as TicketPriority})}
              >
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Baixa</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateTicketDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleCreateTicket} className="bg-ocean-600 hover:bg-ocean-700">
              Criar Ticket
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Schedule Appointment Dialog */}
      <Dialog open={scheduleDialogOpen} onOpenChange={setScheduleDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Agendar Consulta</DialogTitle>
            <DialogDescription>
              Agende uma consulta de fisioterapia ou acompanhamento.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="appointment-date">Data*</Label>
                <Input
                  id="appointment-date"
                  type="date"
                  value={newAppointment.date}
                  onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="appointment-time">Horário*</Label>
                <Input
                  id="appointment-time"
                  type="time"
                  value={newAppointment.time}
                  onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="appointment-with">Profissional/Parceiro*</Label>
              <Input
                id="appointment-with"
                value={newAppointment.with}
                onChange={(e) => setNewAppointment({...newAppointment, with: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="appointment-location">Local</Label>
              <Input
                id="appointment-location"
                value={newAppointment.location}
                onChange={(e) => setNewAppointment({...newAppointment, location: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="appointment-type">Tipo de Consulta</Label>
              <Select 
                value={newAppointment.type} 
                onValueChange={(value) => setNewAppointment({...newAppointment, type: value})}
              >
                <SelectTrigger id="appointment-type">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fisioterapia">Fisioterapia</SelectItem>
                  <SelectItem value="avaliacao">Avaliação</SelectItem>
                  <SelectItem value="ajuste">Ajuste de Prótese</SelectItem>
                  <SelectItem value="acompanhamento">Acompanhamento</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setScheduleDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleAddAppointment} className="bg-ocean-600 hover:bg-ocean-700">
              Agendar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Therapy Recommendation Dialog */}
      <Dialog open={therapyRecommendationDialogOpen} onOpenChange={setTherapyRecommendationDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Adicionar Recomendação de Terapia</DialogTitle>
            <DialogDescription>
              Adicione recomendações de fisioterapia ou exercícios.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="recommended-by">Recomendado Por*</Label>
              <Input
                id="recommended-by"
                placeholder="Nome do profissional"
                value={newTherapyRecommendation.recommendedBy}
                onChange={(e) => setNewTherapyRecommendation({...newTherapyRecommendation, recommendedBy: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="recommendation">Recomendação*</Label>
              <Textarea
                id="recommendation"
                className="min-h-[100px]"
                placeholder="Detalhes da terapia recomendada, exercícios, frequência, etc."
                value={newTherapyRecommendation.recommendation}
                onChange={(e) => setNewTherapyRecommendation({...newTherapyRecommendation, recommendation: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTherapyRecommendationDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleAddTherapyRecommendation} className="bg-ocean-600 hover:bg-ocean-700">
              Adicionar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

interface TicketStatusBadgeProps {
  status: TicketStatus;
}

const TicketStatusBadge = ({ status }: TicketStatusBadgeProps) => {
  const getStatusDetails = () => {
    switch (status) {
      case "open":
        return { 
          label: "Aberto", 
          color: "bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-300" 
        };
      case "in_progress":
        return { 
          label: "Em Andamento", 
          color: "bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-300" 
        };
      case "closed":
        return { 
          label: "Resolvido", 
          color: "bg-green-600 hover:bg-green-700 text-white" 
        };
      default:
        return { label: "Desconhecido", color: "" };
    }
  };

  const { label, color } = getStatusDetails();

  return (
    <Badge
      variant={status === "closed" ? "default" : "outline"}
      className={color}
    >
      {label}
    </Badge>
  );
};

interface PriorityBadgeProps {
  priority: TicketPriority;
}

const PriorityBadge = ({ priority }: PriorityBadgeProps) => {
  const getPriorityDetails = () => {
    switch (priority) {
      case "low":
        return { 
          label: "Baixa", 
          color: "bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-300" 
        };
      case "normal":
        return { 
          label: "Normal", 
          color: "bg-green-100 text-green-800 hover:bg-green-100 border-green-300" 
        };
      case "high":
        return { 
          label: "Alta", 
          color: "bg-red-100 text-red-800 hover:bg-red-100 border-red-300" 
        };
      default:
        return { label: "Normal", color: "" };
    }
  };

  const { label, color } = getPriorityDetails();

  return (
    <Badge
      variant="outline"
      className={color}
    >
      {label}
    </Badge>
  );
};

const getStatusLabel = (status: TicketStatus): string => {
  switch (status) {
    case "open": return "Aberto";
    case "in_progress": return "Em Andamento";
    case "closed": return "Resolvido";
    default: return "Desconhecido";
  }
};

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
};

const formatDateTime = (dateTimeString: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateTimeString).toLocaleDateString('pt-BR', options);
};

export default Support;
