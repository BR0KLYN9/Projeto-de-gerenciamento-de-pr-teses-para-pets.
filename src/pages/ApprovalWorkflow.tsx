import { Layout } from "@/components/Layout";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  XCircle,
  Clock,
  RotateCw,
  Search,
  ChevronsUpDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableFooter,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type ApprovalStatus = 'pendente' | 'aprovado' | 'rejeitado' | 'em_revisao';

interface ApprovalItem {
  id: number;
  clientName: string;
  petName: string;
  designName: string;
  submissionDate: string;
  status: ApprovalStatus;
}

const SAMPLE_APPROVALS: ApprovalItem[] = [
  {
    id: 1,
    clientName: "Carlos Silva",
    petName: "Rex",
    designName: "Prótese Padrão - Pata Dianteira (Cão)",
    submissionDate: "2024-08-15",
    status: "pendente",
  },
  {
    id: 2,
    clientName: "Marina Costa",
    petName: "Luna",
    designName: "Prótese Leve - Pata Traseira (Gato)",
    submissionDate: "2024-08-14",
    status: "aprovado",
  },
  {
    id: 3,
    clientName: "João Mendes",
    petName: "Toby",
    designName: "Prótese Reforçada - Pata Dianteira (Cão)",
    submissionDate: "2024-08-13",
    status: "rejeitado",
  },
  {
    id: 4,
    clientName: "Ana Paula",
    petName: "Nina",
    designName: "Prótese Personalizada - Pata Traseira (Cão)",
    submissionDate: "2024-08-12",
    status: "em_revisao",
  },
  {
    id: 5,
    clientName: "Ricardo Pereira",
    petName: "Max",
    designName: "Prótese Padrão - Pata Dianteira (Cão)",
    submissionDate: "2024-08-11",
    status: "pendente",
  },
  {
    id: 6,
    clientName: "Isabela Souza",
    petName: "Mel",
    designName: "Prótese Leve - Pata Traseira (Gato)",
    submissionDate: "2024-08-10",
    status: "aprovado",
  },
  {
    id: 7,
    clientName: "Fernando Oliveira",
    petName: "Bob",
    designName: "Prótese Reforçada - Pata Dianteira (Cão)",
    submissionDate: "2024-08-09",
    status: "rejeitado",
  },
  {
    id: 8,
    clientName: "Juliana Castro",
    petName: "Simba",
    designName: "Prótese Personalizada - Pata Traseira (Cão)",
    submissionDate: "2024-08-08",
    status: "em_revisao",
  },
  {
    id: 9,
    clientName: "Gustavo Lima",
    petName: "Thor",
    designName: "Prótese Padrão - Pata Dianteira (Cão)",
    submissionDate: "2024-08-07",
    status: "pendente",
  },
  {
    id: 10,
    clientName: "Patrícia Santos",
    petName: "Lola",
    designName: "Prótese Leve - Pata Traseira (Gato)",
    submissionDate: "2024-08-06",
    status: "aprovado",
  },
];

const ApprovalWorkflow = () => {
  const [approvals, setApprovals] = useState<ApprovalItem[]>(SAMPLE_APPROVALS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ApprovalStatus | "">("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredApprovals = approvals.filter((approval) => {
    const searchMatch =
      approval.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      approval.petName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      approval.designName.toLowerCase().includes(searchQuery.toLowerCase());
    const statusMatch = statusFilter ? approval.status === statusFilter : true;
    return searchMatch && statusMatch;
  });

  const totalPages = Math.ceil(filteredApprovals.length / itemsPerPage);
  const paginatedApprovals = filteredApprovals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleStatusChange = (id: number, newStatus: ApprovalStatus) => {
    const updatedApprovals = approvals.map((approval) =>
      approval.id === id ? { ...approval, status: newStatus } : approval
    );
    setApprovals(updatedApprovals);
    toast.success(`Status do projeto de ${approvals.find(approval => approval.id === id)?.petName} alterado para ${newStatus}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (status: ApprovalStatus | "") => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Fluxo de Aprovação
          </h1>
          <p className="text-muted-foreground">
            Acompanhe e gerencie as solicitações de aprovação de design de
            próteses.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Solicitações Pendentes</CardTitle>
            <CardDescription>
              Visualize e gerencie as solicitações de aprovação de design.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Buscar cliente, pet ou design..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>

              <div>
                <Label htmlFor="status">Filtrar por Status</Label>
                <Select
                  value={statusFilter}
                  onValueChange={(value) => handleStatusFilterChange(value as ApprovalStatus | "")}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Todos os Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos</SelectItem>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="aprovado">Aprovado</SelectItem>
                    <SelectItem value="rejeitado">Rejeitado</SelectItem>
                    <SelectItem value="em_revisao">Em Revisão</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                variant="outline"
                className="w-full lg:w-auto"
                onClick={() => {
                  setApprovals(SAMPLE_APPROVALS);
                  setSearchQuery("");
                  setStatusFilter("");
                  toast.info("Lista de aprovações redefinida.");
                }}
              >
                <RotateCw className="h-4 w-4 mr-2" />
                Redefinir Filtros
              </Button>
            </div>

            <div className="mt-6 relative overflow-x-auto">
              <Table>
                <TableCaption>
                  Lista de solicitações de aprovação de design de próteses.
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Pet</TableHead>
                    <TableHead>Design</TableHead>
                    <TableHead>Data de Envio</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-center">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedApprovals.map((approval) => (
                    <TableRow key={approval.id}>
                      <TableCell>{approval.clientName}</TableCell>
                      <TableCell>{approval.petName}</TableCell>
                      <TableCell>{approval.designName}</TableCell>
                      <TableCell>{approval.submissionDate}</TableCell>
                      <TableCell className="text-center">
                        {approval.status === "pendente" && (
                          <div className="inline-flex items-center font-medium">
                            <Clock className="h-4 w-4 mr-1 text-yellow-500" />
                            Pendente
                          </div>
                        )}
                        {approval.status === "aprovado" && (
                          <div className="inline-flex items-center font-medium">
                            <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                            Aprovado
                          </div>
                        )}
                        {approval.status === "rejeitado" && (
                          <div className="inline-flex items-center font-medium">
                            <XCircle className="h-4 w-4 mr-1 text-red-500" />
                            Rejeitado
                          </div>
                        )}
                        {approval.status === "em_revisao" && (
                          <div className="inline-flex items-center font-medium">
                            <RotateCw className="h-4 w-4 mr-1 text-blue-500" />
                            Em Revisão
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <Select
                          value={approval.status}
                          onValueChange={(value) =>
                            handleStatusChange(approval.id, value as ApprovalStatus)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Alterar Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pendente">Pendente</SelectItem>
                            <SelectItem value="aprovado">Aprovar</SelectItem>
                            <SelectItem value="rejeitado">Rejeitar</SelectItem>
                            <SelectItem value="em_revisao">
                              Em Revisão
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={6}>
                      Total de solicitações: {filteredApprovals.length}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>

            {filteredApprovals.length > itemsPerPage && (
              <div className="mt-6">
                <Pagination>
                  <PaginationContent>
                    <PaginationPrevious
                      href="#"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    />
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <PaginationItem key={page} active={currentPage === page}>
                          <PaginationLink
                            href="#"
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    )}
                    <PaginationNext
                      href="#"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    />
                  </PaginationContent>
                </Pagination>
              </div>
            )}

            {filteredApprovals.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Search className="mx-auto h-12 w-12 opacity-20 mb-2" />
                <p>Nenhuma solicitação de aprovação encontrada.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ApprovalWorkflow;
