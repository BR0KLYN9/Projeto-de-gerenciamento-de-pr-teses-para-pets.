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
  Check,
  Truck,
  Construction,
  Printer,
  ClipboardCheck,
  Clock,
  Search,
  Filter,
  Dog,
  Cat,
  Calendar,
  Hourglass,
  PackageCheck,
  MapPin,
  CalendarClock,
  AlertCircle,
  ChevronRight,
  Mail,
  Phone,
  ChevronDown,
  FileDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Sample orders data
const SAMPLE_ORDERS = [
  {
    id: "OB-2023-001",
    clientName: "Carlos Silva",
    petName: "Rex",
    petType: "dog",
    productName: "Prótese Pata Dianteira - Cão",
    status: "delivered",
    timeline: [
      { date: "2023-08-15", status: "created", description: "Pedido criado" },
      { date: "2023-08-18", status: "approved", description: "Design aprovado pelo cliente" },
      { date: "2023-08-20", status: "production", description: "Prótese em produção" },
      { date: "2023-08-25", status: "quality_check", description: "Controle de qualidade" },
      { date: "2023-08-26", status: "shipping", description: "Em transporte" },
      { date: "2023-08-30", status: "delivered", description: "Entregue ao cliente" }
    ],
    createdAt: "2023-08-15",
    estimatedCompletion: "2023-08-27",
    completedAt: "2023-08-30",
    shippingAddress: "Av. Paulista, 1000, São Paulo - SP",
    shippingMethod: "Express",
    trackingNumber: "BR123456789",
    paymentStatus: "paid",
    totalValue: 1200.00,
    prostheticDetails: {
      material: "PETG",
      color: "#3b82f6",
      reinforcement: "Alto",
      notes: "Adição de reforço extra na articulação conforme solicitado pelo cliente."
    }
  },
  {
    id: "OB-2023-002",
    clientName: "Marina Costa",
    petName: "Luna",
    petType: "cat",
    productName: "Prótese Pata Traseira - Gato",
    status: "shipping",
    timeline: [
      { date: "2023-08-20", status: "created", description: "Pedido criado" },
      { date: "2023-08-24", status: "approved", description: "Design aprovado pelo cliente após revisões" },
      { date: "2023-08-26", status: "production", description: "Prótese em produção" },
      { date: "2023-09-02", status: "quality_check", description: "Controle de qualidade" },
      { date: "2023-09-03", status: "shipping", description: "Em transporte" }
    ],
    createdAt: "2023-08-20",
    estimatedCompletion: "2023-09-03",
    shippingAddress: "Rua das Flores, 250, Rio de Janeiro - RJ",
    shippingMethod: "Standard",
    trackingNumber: "BR987654321",
    paymentStatus: "paid",
    totalValue: 950.00,
    prostheticDetails: {
      material: "TPU Flexível",
      color: "#8b5cf6",
      reinforcement: "Médio",
      notes: "Modelo mais leve e flexível adequado para gatos."
    }
  },
  {
    id: "OB-2023-003",
    clientName: "João Mendes",
    petName: "Toby",
    petType: "dog",
    productName: "Prótese Pata Traseira - Cão",
    status: "production",
    timeline: [
      { date: "2023-08-28", status: "created", description: "Pedido criado" },
      { date: "2023-09-01", status: "approved", description: "Design aprovado pelo cliente" },
      { date: "2023-09-03", status: "production", description: "Prótese em produção" }
    ],
    createdAt: "2023-08-28",
    estimatedCompletion: "2023-09-10",
    shippingAddress: "Rua Horizonte, 789, Belo Horizonte - MG",
    shippingMethod: "Standard",
    trackingNumber: "",
    paymentStatus: "paid",
    totalValue: 1350.00,
    prostheticDetails: {
      material: "PETG",
      color: "#22c55e",
      reinforcement: "Alto",
      notes: "Design reforçado para cães de grande porte. Adição de sistema anti-derrapante."
    }
  },
  {
    id: "OB-2023-004",
    clientName: "Sofia Almeida",
    petName: "Ziggy",
    petType: "dog",
    productName: "Prótese Pata Dianteira - Cão",
    status: "quality_check",
    timeline: [
      { date: "2023-08-25", status: "created", description: "Pedido criado" },
      { date: "2023-08-28", status: "approved", description: "Design aprovado pelo cliente" },
      { date: "2023-08-30", status: "production", description: "Prótese em produção" },
      { date: "2023-09-04", status: "quality_check", description: "Controle de qualidade" }
    ],
    createdAt: "2023-08-25",
    estimatedCompletion: "2023-09-07",
    shippingAddress: "Av. Brasil, 500, Curitiba - PR",
    shippingMethod: "Express",
    trackingNumber: "",
    paymentStatus: "paid",
    totalValue: 1150.00,
    prostheticDetails: {
      material: "PLA",
      color: "#f97316",
      reinforcement: "Médio",
      notes: "Customização de cor especial conforme solicitado pelo cliente."
    }
  },
  {
    id: "OB-2023-005",
    clientName: "Roberto Dias",
    petName: "Bella",
    petType: "dog",
    productName: "Prótese Pata Traseira - Cão",
    status: "created",
    timeline: [
      { date: "2023-09-02", status: "created", description: "Pedido criado" }
    ],
    createdAt: "2023-09-02",
    estimatedCompletion: "2023-09-15",
    shippingAddress: "Rua das Palmeiras, 123, Salvador - BA",
    shippingMethod: "Standard",
    trackingNumber: "",
    paymentStatus: "pending",
    totalValue: 1250.00,
    prostheticDetails: {
      material: "PETG",
      color: "#ec4899",
      reinforcement: "Alto",
      notes: "Aguardando aprovação do design pelo cliente."
    }
  }
];

type OrderStatus = "created" | "approved" | "production" | "quality_check" | "shipping" | "delivered";

const OrderTracking = () => {
  const [orders, setOrders] = useState(SAMPLE_ORDERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [selectedOrder, setSelectedOrder] = useState(orders[0]);
  const [updateStatusDialogOpen, setUpdateStatusDialogOpen] = useState(false);
  const [nextStatus, setNextStatus] = useState<OrderStatus | "">("");
  const [statusNote, setStatusNote] = useState("");

  const filteredOrders = orders.filter(order => 
    (statusFilter === "all" || order.status === statusFilter) &&
    (
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.petName.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleOrderSelect = (order: any) => {
    setSelectedOrder(order);
  };

  const determineNextStatus = (currentStatus: OrderStatus): OrderStatus => {
    const statusOrder: OrderStatus[] = [
      "created", "approved", "production", "quality_check", "shipping", "delivered"
    ];
    
    const currentIndex = statusOrder.indexOf(currentStatus);
    
    if (currentIndex < statusOrder.length - 1) {
      return statusOrder[currentIndex + 1];
    }
    
    return currentStatus;
  };

  const handlePrepareStatusUpdate = () => {
    if (selectedOrder.status === "delivered") {
      toast.error("Este pedido já foi entregue e não pode ser atualizado.");
      return;
    }
    
    const next = determineNextStatus(selectedOrder.status as OrderStatus);
    setNextStatus(next);
    setUpdateStatusDialogOpen(true);
  };

  const handleUpdateStatus = () => {
    if (!nextStatus) return;
    
    const updatedOrder = {
      ...selectedOrder,
      status: nextStatus,
      timeline: [
        ...selectedOrder.timeline,
        {
          date: new Date().toISOString().split('T')[0],
          status: nextStatus,
          description: getStatusDescription(nextStatus) + (statusNote ? ` - ${statusNote}` : "")
        }
      ]
    };
    
    if (nextStatus === "delivered") {
      updatedOrder.completedAt = new Date().toISOString().split('T')[0];
    }
    
    const updatedOrders = orders.map(order => 
      order.id === selectedOrder.id ? updatedOrder : order
    );
    
    setOrders(updatedOrders);
    setSelectedOrder(updatedOrder);
    setNextStatus("");
    setStatusNote("");
    setUpdateStatusDialogOpen(false);
    
    toast.success(`Status atualizado para ${getStatusLabel(nextStatus as OrderStatus)}`);
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Acompanhamento de Pedidos</h1>
          <p className="text-muted-foreground">
            Monitore o status de produção e entrega das próteses.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Orders List */}
          <Card className="lg:col-span-1">
            <CardHeader className="space-y-4">
              <CardTitle>Pedidos</CardTitle>
              <div className="flex flex-col space-y-3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar por ID, cliente ou pet..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as OrderStatus | "all")}>
                  <SelectTrigger>
                    <div className="flex items-center">
                      <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>
                        {statusFilter === "all" 
                          ? "Todos os Status" 
                          : `Status: ${getStatusLabel(statusFilter as OrderStatus)}`
                        }
                      </span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Status</SelectItem>
                    <SelectItem value="created">Aguardando Aprovação</SelectItem>
                    <SelectItem value="approved">Design Aprovado</SelectItem>
                    <SelectItem value="production">Em Produção</SelectItem>
                    <SelectItem value="quality_check">Controle de Qualidade</SelectItem>
                    <SelectItem value="shipping">Em Transporte</SelectItem>
                    <SelectItem value="delivered">Entregue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                {filteredOrders.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Filter className="mx-auto h-12 w-12 opacity-20 mb-2" />
                    <p>Nenhum pedido encontrado</p>
                  </div>
                ) : (
                  filteredOrders.map((order) => (
                    <div
                      key={order.id}
                      className={`p-3 rounded-lg cursor-pointer transition-all border ${
                        selectedOrder?.id === order.id
                          ? "border-primary bg-primary/5"
                          : "hover:border-ocean-300 dark:hover:border-ocean-700"
                      }`}
                      onClick={() => handleOrderSelect(order)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          {order.petType === "dog" ? (
                            <Dog className="h-5 w-5 text-ocean-600 dark:text-ocean-400" />
                          ) : (
                            <Cat className="h-5 w-5 text-ocean-600 dark:text-ocean-400" />
                          )}
                          <div>
                            <div className="font-medium">{order.id}</div>
                            <div className="text-sm text-muted-foreground">
                              {order.clientName} - {order.petName}
                            </div>
                          </div>
                        </div>
                        <OrderStatusBadge status={order.status as OrderStatus} />
                      </div>
                      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(order.createdAt)}
                        </div>
                        <div className="flex items-center">
                          <Hourglass className="h-3 w-3 mr-1" />
                          {order.status === "delivered" 
                            ? `Concluído em ${formatDate(order.completedAt)}`
                            : `Prev. entrega: ${formatDate(order.estimatedCompletion)}`
                          }
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Order Details */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>
                {selectedOrder ? (
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span>Detalhes do Pedido - {selectedOrder.id}</span>
                      <OrderStatusBadge status={selectedOrder.status as OrderStatus} />
                    </div>
                    {selectedOrder.status !== "delivered" && (
                      <Button 
                        onClick={handlePrepareStatusUpdate}
                        className="bg-ocean-600 hover:bg-ocean-700"
                      >
                        <ChevronRight className="h-4 w-4 mr-1" />
                        Atualizar Status
                      </Button>
                    )}
                  </div>
                ) : (
                  "Selecione um pedido"
                )}
              </CardTitle>
              {selectedOrder && (
                <CardDescription>
                  Cliente: {selectedOrder.clientName} | 
                  Produto: {selectedOrder.productName}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              {!selectedOrder ? (
                <div className="text-center py-12 text-muted-foreground">
                  <AlertCircle className="mx-auto h-16 w-16 opacity-20 mb-4" />
                  <p className="text-lg">Selecione um pedido para ver os detalhes</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Timeline */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Timeline do Pedido</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="relative pl-8 space-y-4 before:absolute before:left-[15px] before:top-0 before:bottom-0 before:w-[1px] before:bg-border">
                        {selectedOrder.timeline.map((event, index) => (
                          <TimelineEvent 
                            key={index} 
                            event={event} 
                            isLatest={index === selectedOrder.timeline.length - 1} 
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Order Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Accordion type="single" collapsible defaultValue="info" className="w-full">
                        <AccordionItem value="info" className="border-none">
                          <AccordionTrigger className="py-4 text-base font-semibold">
                            Informações do Pedido
                          </AccordionTrigger>
                          <AccordionContent className="pb-4">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div className="font-medium">ID do Pedido:</div>
                              <div>{selectedOrder.id}</div>
                              
                              <div className="font-medium">Data de Criação:</div>
                              <div>{formatDate(selectedOrder.createdAt)}</div>
                              
                              <div className="font-medium">Previsão de Entrega:</div>
                              <div>{formatDate(selectedOrder.estimatedCompletion)}</div>
                              
                              {selectedOrder.completedAt && (
                                <>
                                  <div className="font-medium">Data de Conclusão:</div>
                                  <div>{formatDate(selectedOrder.completedAt)}</div>
                                </>
                              )}
                              
                              <div className="font-medium">Status de Pagamento:</div>
                              <div className="flex items-center">
                                {selectedOrder.paymentStatus === "paid" ? (
                                  <Badge className="bg-green-600 hover:bg-green-700">Pago</Badge>
                                ) : (
                                  <Badge variant="outline" className="border-amber-300 text-amber-700 bg-amber-50">
                                    Pendente
                                  </Badge>
                                )}
                              </div>
                              
                              <div className="font-medium">Valor Total:</div>
                              <div>R$ {selectedOrder.totalValue.toFixed(2)}</div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="prosthetic" className="border-none">
                          <AccordionTrigger className="py-4 text-base font-semibold">
                            Detalhes da Prótese
                          </AccordionTrigger>
                          <AccordionContent className="pb-4">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div className="font-medium">Produto:</div>
                              <div>{selectedOrder.productName}</div>
                              
                              <div className="font-medium">Material:</div>
                              <div>{selectedOrder.prostheticDetails.material}</div>
                              
                              <div className="font-medium">Cor:</div>
                              <div className="flex items-center">
                                <div 
                                  className="w-3 h-3 rounded-full mr-2" 
                                  style={{ backgroundColor: selectedOrder.prostheticDetails.color }}
                                ></div>
                                <span>{selectedOrder.prostheticDetails.color}</span>
                              </div>
                              
                              <div className="font-medium">Reforço:</div>
                              <div>{selectedOrder.prostheticDetails.reinforcement}</div>
                              
                              <div className="font-medium col-span-2">Observações:</div>
                              <div className="col-span-2 border rounded-md p-2 bg-muted/30">
                                {selectedOrder.prostheticDetails.notes}
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="client" className="border-none">
                          <AccordionTrigger className="py-4 text-base font-semibold">
                            Informações do Cliente
                          </AccordionTrigger>
                          <AccordionContent className="pb-4">
                            <div className="space-y-3 text-sm">
                              <div>
                                <div className="font-medium">Cliente:</div>
                                <div>{selectedOrder.clientName}</div>
                              </div>
                              
                              <div>
                                <div className="font-medium">Pet:</div>
                                <div className="flex items-center">
                                  {selectedOrder.petType === "dog" ? (
                                    <Dog className="h-4 w-4 mr-1 text-ocean-600 dark:text-ocean-400" />
                                  ) : (
                                    <Cat className="h-4 w-4 mr-1 text-ocean-600 dark:text-ocean-400" />
                                  )}
                                  {selectedOrder.petName} ({selectedOrder.petType === "dog" ? "Cão" : "Gato"})
                                </div>
                              </div>
                              
                              <div>
                                <div className="font-medium">Contatos:</div>
                                <div className="flex items-center mt-1">
                                  <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                                  <span className="text-xs">cliente@email.com</span>
                                </div>
                                <div className="flex items-center mt-1">
                                  <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                                  <span className="text-xs">(11) 98765-4321</span>
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                    
                    <div>
                      <Accordion type="single" collapsible defaultValue="shipping" className="w-full">
                        <AccordionItem value="shipping" className="border-none">
                          <AccordionTrigger className="py-4 text-base font-semibold">
                            Informações de Entrega
                          </AccordionTrigger>
                          <AccordionContent className="pb-4">
                            <div className="space-y-3 text-sm">
                              <div>
                                <div className="font-medium">Endereço de Entrega:</div>
                                <div className="flex items-start mt-1">
                                  <MapPin className="h-4 w-4 mr-1 text-muted-foreground shrink-0 mt-0.5" />
                                  <span>{selectedOrder.shippingAddress}</span>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-2">
                                <div className="font-medium">Método de Envio:</div>
                                <div>{selectedOrder.shippingMethod}</div>
                              </div>
                              
                              {selectedOrder.trackingNumber && (
                                <div>
                                  <div className="font-medium">Número de Rastreamento:</div>
                                  <div className="flex items-center space-x-2">
                                    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs">
                                      {selectedOrder.trackingNumber}
                                    </code>
                                    <Button variant="outline" size="sm" onClick={() => toast.success("Link de rastreamento copiado!")}>
                                      Rastrear
                                    </Button>
                                  </div>
                                </div>
                              )}
                              
                              {selectedOrder.status === "shipping" && (
                                <Card className="bg-amber-50 border-amber-200 mt-3">
                                  <CardContent className="p-3 text-xs">
                                    <div className="flex items-start space-x-2">
                                      <Truck className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                                      <div>
                                        <p className="font-medium text-amber-800">Em transporte</p>
                                        <p className="text-amber-700 mt-1">
                                          Previsão de entrega: {formatDate(selectedOrder.estimatedCompletion)}
                                        </p>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              )}
                              
                              {selectedOrder.status === "delivered" && (
                                <Card className="bg-green-50 border-green-200 mt-3">
                                  <CardContent className="p-3 text-xs">
                                    <div className="flex items-start space-x-2">
                                      <Check className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                                      <div>
                                        <p className="font-medium text-green-800">Entrega concluída</p>
                                        <p className="text-green-700 mt-1">
                                          Entregue em: {formatDate(selectedOrder.completedAt)}
                                        </p>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="production" className="border-none">
                          <AccordionTrigger className="py-4 text-base font-semibold">
                            Status de Produção
                          </AccordionTrigger>
                          <AccordionContent className="pb-4">
                            <div className="space-y-4">
                              <div className="relative pl-6 space-y-4 before:absolute before:left-[9px] before:top-1 before:bottom-1 before:w-[1px] before:bg-muted-foreground/20">
                                <div className="flex items-start gap-2">
                                  <div className={`absolute left-0 top-1 h-4 w-4 rounded-full flex items-center justify-center ${
                                    ["approved", "production", "quality_check", "shipping", "delivered"].includes(selectedOrder.status)
                                      ? "bg-green-600 text-white"
                                      : "bg-muted text-muted-foreground"
                                  }`}>
                                    {["approved", "production", "quality_check", "shipping", "delivered"].includes(selectedOrder.status) && (
                                      <Check className="h-2.5 w-2.5" />
                                    )}
                                  </div>
                                  <div className="text-sm">
                                    <div className="font-medium">Design Aprovado</div>
                                    <div className="text-xs text-muted-foreground">
                                      {selectedOrder.status === "created" 
                                        ? "Pendente" 
                                        : `Aprovado em ${formatDate(
                                            selectedOrder.timeline.find(t => t.status === "approved")?.date || ""
                                          )}`
                                      }
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex items-start gap-2">
                                  <div className={`absolute left-0 top-1 h-4 w-4 rounded-full flex items-center justify-center ${
                                    ["production", "quality_check", "shipping", "delivered"].includes(selectedOrder.status)
                                      ? "bg-green-600 text-white"
                                      : "bg-muted text-muted-foreground"
                                  }`}>
                                    {["production", "quality_check", "shipping", "delivered"].includes(selectedOrder.status) && (
                                      <Check className="h-2.5 w-2.5" />
                                    )}
                                  </div>
                                  <div className="text-sm">
                                    <div className="font-medium">Produção Iniciada</div>
                                    <div className="text-xs text-muted-foreground">
                                      {["created", "approved"].includes(selectedOrder.status)
                                        ? "Pendente"
                                        : `Iniciada em ${formatDate(
                                            selectedOrder.timeline.find(t => t.status === "production")?.date || ""
                                          )}`
                                      }
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex items-start gap-2">
                                  <div className={`absolute left-0 top-1 h-4 w-4 rounded-full flex items-center justify-center ${
                                    ["quality_check", "shipping", "delivered"].includes(selectedOrder.status)
                                      ? "bg-green-600 text-white"
                                      : "bg-muted text-muted-foreground"
                                  }`}>
                                    {["quality_check", "shipping", "delivered"].includes(selectedOrder.status) && (
                                      <Check className="h-2.5 w-2.5" />
                                    )}
                                  </div>
                                  <div className="text-sm">
                                    <div className="font-medium">Controle de Qualidade</div>
                                    <div className="text-xs text-muted-foreground">
                                      {["created", "approved", "production"].includes(selectedOrder.status)
                                        ? "Pendente"
                                        : `Realizado em ${formatDate(
                                            selectedOrder.timeline.find(t => t.status === "quality_check")?.date || ""
                                          )}`
                                      }
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex items-start gap-2">
                                  <div className={`absolute left-0 top-1 h-4 w-4 rounded-full flex items-center justify-center ${
                                    ["shipping", "delivered"].includes(selectedOrder.status)
                                      ? "bg-green-600 text-white"
                                      : "bg-muted text-muted-foreground"
                                  }`}>
                                    {["shipping", "delivered"].includes(selectedOrder.status) && (
                                      <Check className="h-2.5 w-2.5" />
                                    )}
                                  </div>
                                  <div className="text-sm">
                                    <div className="font-medium">Envio</div>
                                    <div className="text-xs text-muted-foreground">
                                      {["created", "approved", "production", "quality_check"].includes(selectedOrder.status)
                                        ? "Pendente"
                                        : `Enviado em ${formatDate(
                                            selectedOrder.timeline.find(t => t.status === "shipping")?.date || ""
                                          )}`
                                      }
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex items-start gap-2">
                                  <div className={`absolute left-0 top-1 h-4 w-4 rounded-full flex items-center justify-center ${
                                    selectedOrder.status === "delivered"
                                      ? "bg-green-600 text-white"
                                      : "bg-muted text-muted-foreground"
                                  }`}>
                                    {selectedOrder.status === "delivered" && (
                                      <Check className="h-2.5 w-2.5" />
                                    )}
                                  </div>
                                  <div className="text-sm">
                                    <div className="font-medium">Entrega</div>
                                    <div className="text-xs text-muted-foreground">
                                      {selectedOrder.status !== "delivered"
                                        ? "Pendente"
                                        : `Entregue em ${formatDate(
                                            selectedOrder.timeline.find(t => t.status === "delivered")?.date || ""
                                          )}`
                                      }
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="actions" className="border-none">
                          <AccordionTrigger className="py-4 text-base font-semibold">
                            Ações
                          </AccordionTrigger>
                          <AccordionContent className="pb-4">
                            <div className="grid grid-cols-2 gap-3">
                              <Button variant="outline" onClick={() => toast.success("Email enviado para o cliente!")}>
                                <Mail className="h-4 w-4 mr-2" />
                                Notificar Cliente
                              </Button>
                              <Button variant="outline" onClick={() => toast.success("Detalhes do pedido exportados!")}>
                                <FileDown className="h-4 w-4 mr-2" />
                                Exportar Detalhes
                              </Button>
                              
                              {selectedOrder.status === "delivered" && (
                                <Button 
                                  className="col-span-2 bg-ocean-600 hover:bg-ocean-700"
                                  onClick={() => toast.success("Enviado para suporte pós-entrega!")}
                                >
                                  <Check className="h-4 w-4 mr-2" />
                                  Iniciar Acompanhamento Pós-Entrega
                                </Button>
                              )}
                              
                              {selectedOrder.status !== "delivered" && (
                                <Button 
                                  className="col-span-2 bg-ocean-600 hover:bg-ocean-700"
                                  onClick={handlePrepareStatusUpdate}
                                >
                                  <ChevronRight className="h-4 w-4 mr-2" />
                                  Atualizar Status
                                </Button>
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Update Status Dialog */}
      <Dialog open={updateStatusDialogOpen} onOpenChange={setUpdateStatusDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Atualizar Status do Pedido</DialogTitle>
            <DialogDescription>
              Atualize o status do pedido {selectedOrder?.id}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="next-status">Próximo Status</Label>
              <Select defaultValue={nextStatus} onValueChange={(value) => setNextStatus(value as OrderStatus)}>
                <SelectTrigger id="next-status">
                  <SelectValue placeholder="Selecione o próximo status" />
                </SelectTrigger>
                <SelectContent>
                  {selectedOrder && ["created", "approved", "production", "quality_check", "shipping", "delivered"].map((status, index) => {
                    const currentStatusIndex = ["created", "approved", "production", "quality_check", "shipping", "delivered"].indexOf(selectedOrder.status);
                    // Only show statuses that come after the current one
                    if (index > currentStatusIndex) {
                      return (
                        <SelectItem key={status} value={status}>
                          {getStatusLabel(status as OrderStatus)}
                        </SelectItem>
                      );
                    }
                    return null;
                  })}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status-note">Observações (opcional)</Label>
              <Textarea
                id="status-note"
                placeholder="Adicione notas ou observações sobre esta atualização..."
                value={statusNote}
                onChange={(e) => setStatusNote(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUpdateStatusDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleUpdateStatus} className="bg-ocean-600 hover:bg-ocean-700">
              Atualizar Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  const getStatusDetails = () => {
    switch (status) {
      case "created":
        return { 
          label: "Aguardando Aprovação", 
          color: "bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-300" 
        };
      case "approved":
        return { 
          label: "Design Aprovado", 
          color: "bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-300" 
        };
      case "production":
        return { 
          label: "Em Produção", 
          color: "bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-300" 
        };
      case "quality_check":
        return { 
          label: "Controle de Qualidade", 
          color: "bg-ocean-100 text-ocean-800 hover:bg-ocean-100 border-ocean-300" 
        };
      case "shipping":
        return { 
          label: "Em Transporte", 
          color: "bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-300" 
        };
      case "delivered":
        return { 
          label: "Entregue", 
          color: "bg-green-600 hover:bg-green-700 text-white" 
        };
      default:
        return { label: "Desconhecido", color: "" };
    }
  };

  const { label, color } = getStatusDetails();

  return (
    <Badge
      variant={status === "delivered" ? "default" : "outline"}
      className={color}
    >
      {label}
    </Badge>
  );
};

interface TimelineEventProps {
  event: {
    date: string;
    status: string;
    description: string;
  };
  isLatest: boolean;
}

const TimelineEvent = ({ event, isLatest }: TimelineEventProps) => {
  const getStatusIcon = () => {
    switch (event.status) {
      case "created":
        return <Clock className="h-5 w-5 text-amber-600" />;
      case "approved":
        return <ClipboardCheck className="h-5 w-5 text-blue-600" />;
      case "production":
        return <Printer className="h-5 w-5 text-purple-600" />;
      case "quality_check":
        return <Construction className="h-5 w-5 text-ocean-600" />;
      case "shipping":
        return <Truck className="h-5 w-5 text-amber-600" />;
      case "delivered":
        return <PackageCheck className="h-5 w-5 text-green-600" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };

  return (
    <div className={`pl-6 ${isLatest ? "animate-pulse-light" : ""}`}>
      <div className="absolute -left-1 mt-1.5">
        <div className={`p-1 rounded-full ${
          isLatest ? "bg-ocean-100 dark:bg-ocean-800/50 ring-2 ring-ocean-600" : "bg-muted"
        }`}>
          {getStatusIcon()}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium">{event.description}</p>
        <time className="text-xs text-muted-foreground">{formatDate(event.date)}</time>
      </div>
    </div>
  );
};

const getStatusLabel = (status: OrderStatus): string => {
  switch (status) {
    case "created": return "Aguardando Aprovação";
    case "approved": return "Design Aprovado";
    case "production": return "Em Produção";
    case "quality_check": return "Controle de Qualidade";
    case "shipping": return "Em Transporte";
    case "delivered": return "Entregue";
    default: return "Desconhecido";
  }
};

const getStatusDescription = (status: OrderStatus): string => {
  switch (status) {
    case "created": return "Pedido criado";
    case "approved": return "Design aprovado pelo cliente";
    case "production": return "Prótese em produção";
    case "quality_check": return "Controle de qualidade";
    case "shipping": return "Em transporte";
    case "delivered": return "Entregue ao cliente";
    default: return "Status atualizado";
  }
};

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
};

export default OrderTracking;
