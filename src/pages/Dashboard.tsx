
import { Layout } from "@/components/Layout";
import { 
  ChevronRight, 
  Users, 
  Cog, 
  ClipboardCheck, 
  PackageCheck, 
  HeartHandshake,
  TrendingUp,
  CalendarClock,
  PieChart,
  BarChart,
  Dog,
  Cat
} from "lucide-react";
import { Link } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  BarChart as ReBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell
} from "recharts";

// Sample data for charts
const monthlyData = [
  { name: "Jan", próteses: 20 },
  { name: "Fev", próteses: 28 },
  { name: "Mar", próteses: 25 },
  { name: "Abr", próteses: 32 },
  { name: "Mai", próteses: 37 },
  { name: "Jun", próteses: 45 }
];

const petTypeData = [
  { name: "Cães", value: 68 },
  { name: "Gatos", value: 25 },
  { name: "Outros", value: 7 }
];

const COLORS = ["#0284c7", "#ef4444", "#22c55e"];

const Dashboard = () => {
  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Bem-vindo à plataforma de gerenciamento de próteses para pets.
          </p>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-ocean-100 dark:bg-ocean-900/50 p-3 rounded-full">
                  <Dog className="h-6 w-6 text-ocean-600 dark:text-ocean-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Clientes Ativos</p>
                  <h2 className="text-2xl font-bold">186</h2>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-bacon-100 dark:bg-bacon-900/50 p-3 rounded-full">
                  <PackageCheck className="h-6 w-6 text-bacon-600 dark:text-bacon-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Próteses Entregues</p>
                  <h2 className="text-2xl font-bold">42</h2>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-full">
                  <ClipboardCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Em Aprovação</p>
                  <h2 className="text-2xl font-bold">14</h2>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-purple-100 dark:bg-purple-900/50 p-3 rounded-full">
                  <Cog className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Em Produção</p>
                  <h2 className="text-2xl font-bold">7</h2>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart section */}
          <Card className="col-span-2">
            <CardHeader className="pb-2">
              <CardTitle>Próteses Produzidas</CardTitle>
              <CardDescription>Número de próteses por mês</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ReBarChart
                  data={monthlyData}
                  margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
                >
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                      borderRadius: '10px',
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="próteses" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                </ReBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Pie chart */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Distribuição por Tipo</CardTitle>
              <CardDescription>Espécies atendidas</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={petTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {petTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                      borderRadius: '10px',
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                </RePieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Quick access */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Acesso Rápido</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <QuickAccessCard 
              title="Cadastro de Clientes" 
              description="Gerenciar clientes e pets"
              icon={Users} 
              path="/client-registry"
              color="bg-ocean-600"
            />
            <QuickAccessCard 
              title="Design de Próteses" 
              description="Modelagem e especificações"
              icon={Cog} 
              path="/prosthetic-design"
              color="bg-purple-600"
            />
            <QuickAccessCard 
              title="Aprovações" 
              description="Validação de ajustes"
              icon={ClipboardCheck} 
              path="/approval-workflow"
              color="bg-green-600"
            />
            <QuickAccessCard 
              title="Acompanhamento" 
              description="Status dos pedidos"
              icon={PackageCheck} 
              path="/order-tracking"
              color="bg-bacon-600"
            />
            <QuickAccessCard 
              title="Suporte" 
              description="Assistência pós-produção"
              icon={HeartHandshake} 
              path="/support"
              color="bg-amber-600"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

interface QuickAccessCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  path: string;
  color: string;
}

const QuickAccessCard = ({
  title,
  description,
  icon: Icon,
  path,
  color,
}: QuickAccessCardProps) => {
  return (
    <Link to={path} className="block">
      <Card className="h-full hover-lift overflow-hidden transition-all hover:border-ocean-300 dark:hover:border-ocean-700">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-2 rounded-full ${color}`}>
              <Icon className="h-5 w-5 text-white" />
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Dashboard;
