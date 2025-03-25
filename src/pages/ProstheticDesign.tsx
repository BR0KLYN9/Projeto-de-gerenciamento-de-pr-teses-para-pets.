
import { Layout } from "@/components/Layout";
import { useEffect, useState } from "react";
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
  Dog,
  Cat,
  Users,
  Ruler,
  Cog,
  Check,
  ChevronRight,
  ChevronDown,
  UploadCloud,
  Box, // Replaced Cube with Box
  PawPrint,
  FileText,
  Loader2,
  ZoomIn,
  RotateCw,
  Plus,
  Minus,
  Save
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

// Sample data for clients and their pets
const SAMPLE_CLIENTS = [
  { 
    id: 1, 
    name: "Carlos Silva", 
    pets: [
      { 
        id: 1, 
        name: "Rex", 
        species: "Cachorro", 
        breed: "Golden Retriever", 
        age: 4, 
        medicalCondition: "Amputação da pata dianteira direita"
      }
    ]
  },
  { 
    id: 2, 
    name: "Marina Costa", 
    pets: [
      { 
        id: 2, 
        name: "Luna", 
        species: "Gato", 
        breed: "Siamês", 
        age: 2, 
        medicalCondition: "Malformação congênita na pata traseira esquerda"
      }
    ]
  },
  { 
    id: 3, 
    name: "João Mendes", 
    pets: [
      { 
        id: 3, 
        name: "Toby", 
        species: "Cachorro", 
        breed: "Border Collie", 
        age: 6, 
        medicalCondition: "Amputação pata traseira direita devido a trauma"
      },
      { 
        id: 4, 
        name: "Nina", 
        species: "Cachorro", 
        breed: "Dachshund", 
        age: 8, 
        medicalCondition: "Displasia no quadril, dificuldade de locomoção"
      }
    ]
  }
];

// Sample prosthetic templates
const PROSTHETIC_TEMPLATES = [
  {
    id: 1,
    name: "Prótese Padrão - Pata Dianteira (Cão)",
    description: "Modelo padrão para cães com amputação na pata dianteira.",
    recommendedFor: "Cães de médio porte",
    imageSrc: "https://placehold.co/300x200/2563eb/FFFFFF/png?text=Pr%C3%B3tese+Dianteira",
    limbType: "dianteira"
  },
  {
    id: 2,
    name: "Prótese Padrão - Pata Traseira (Cão)",
    description: "Modelo padrão para cães com amputação na pata traseira.",
    recommendedFor: "Cães de médio porte",
    imageSrc: "https://placehold.co/300x200/2563eb/FFFFFF/png?text=Pr%C3%B3tese+Traseira",
    limbType: "traseira"
  },
  {
    id: 3,
    name: "Prótese Leve - Pata Dianteira (Gato)",
    description: "Modelo leve para gatos com problemas na pata dianteira.",
    recommendedFor: "Gatos de todos os portes",
    imageSrc: "https://placehold.co/300x200/2563eb/FFFFFF/png?text=Pr%C3%B3tese+Gato",
    limbType: "dianteira"
  },
  {
    id: 4,
    name: "Prótese Reforçada - Pata Traseira (Cão)",
    description: "Modelo reforçado para cães grandes com amputação na pata traseira.",
    recommendedFor: "Cães de grande porte",
    imageSrc: "https://placehold.co/300x200/2563eb/FFFFFF/png?text=Pr%C3%B3tese+Refor%C3%A7ada",
    limbType: "traseira"
  }
];

const ProstheticDesign = () => {
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [selectedPet, setSelectedPet] = useState<any>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [step, setStep] = useState(1);
  const [measurements, setMeasurements] = useState({
    limbLength: 15,
    limbCircumference: 20,
    jointCircumference: 18,
    weight: 25
  });
  const [customization, setCustomization] = useState({
    color: "#2563eb",
    material: "PLA",
    flexibility: 50,
    reinforcement: 30,
    grip: 40
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isModelReady, setIsModelReady] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);

  const handleClientSelect = (client: any) => {
    setSelectedClient(client);
    setSelectedPet(null);
  };

  const handlePetSelect = (pet: any) => {
    setSelectedPet(pet);
  };

  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template);
  };

  const handleNextStep = () => {
    if (step === 1 && !selectedPet) {
      toast.error("Selecione um pet para continuar.");
      return;
    }
    
    if (step === 2 && !selectedTemplate) {
      toast.error("Selecione um modelo de prótese para continuar.");
      return;
    }
    
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleGenerateModel = () => {
    setIsGenerating(true);
    
    // Simulate AI model generation
    setTimeout(() => {
      setIsGenerating(false);
      setIsModelReady(true);
      toast.success("Modelo 3D gerado com sucesso!");
    }, 3000);
  };

  const handleSaveDesign = () => {
    toast.success("Projeto salvo com sucesso!");
  };

  const handleSubmitForApproval = () => {
    toast.success("Projeto enviado para aprovação!");
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Design de Próteses</h1>
          <p className="text-muted-foreground">
            Crie e personalize próteses com base nas medidas e necessidades de cada pet.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Processo de Design</CardTitle>
            <CardDescription>
              Siga as etapas para criar uma prótese personalizada
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <StepIndicator 
                number={1} 
                title="Selecionar Pet" 
                isActive={step === 1} 
                isCompleted={step > 1} 
              />
              <StepIndicator 
                number={2} 
                title="Escolher Modelo" 
                isActive={step === 2} 
                isCompleted={step > 2} 
              />
              <StepIndicator 
                number={3} 
                title="Medidas" 
                isActive={step === 3} 
                isCompleted={step > 3} 
              />
              <StepIndicator 
                number={4} 
                title="Personalização" 
                isActive={step === 4} 
                isCompleted={step > 4} 
              />
              <StepIndicator 
                number={5} 
                title="Visualização" 
                isActive={step === 5} 
                isCompleted={step > 5} 
              />
            </div>

            {/* Step 1: Pet Selection */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1 space-y-4">
                    <h3 className="font-semibold text-lg">Selecione o Cliente</h3>
                    <div className="space-y-2 max-h-[400px] overflow-y-auto">
                      {SAMPLE_CLIENTS.map((client) => (
                        <div
                          key={client.id}
                          className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            selectedClient?.id === client.id
                              ? "bg-primary text-primary-foreground"
                              : "border hover:bg-secondary"
                          }`}
                          onClick={() => handleClientSelect(client)}
                        >
                          <div className="font-medium">{client.name}</div>
                          <div className="text-sm opacity-80 flex items-center mt-1 gap-2">
                            <Dog className="h-3 w-3" />
                            <span>{client.pets.length} pets</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 space-y-4">
                    <h3 className="font-semibold text-lg">Selecione o Pet</h3>
                    
                    {!selectedClient ? (
                      <div className="text-center py-12 text-muted-foreground border rounded-lg">
                        <Users className="mx-auto h-12 w-12 opacity-20 mb-2" />
                        <p>Selecione um cliente para ver seus pets</p>
                      </div>
                    ) : selectedClient.pets.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground border rounded-lg">
                        <PawPrint className="mx-auto h-12 w-12 opacity-20 mb-2" />
                        <p>Este cliente não possui pets cadastrados</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {selectedClient.pets.map((pet: any) => (
                          <Card
                            key={pet.id}
                            className={`cursor-pointer transition-all overflow-hidden ${
                              selectedPet?.id === pet.id
                                ? "ring-2 ring-primary ring-offset-2"
                                : "hover:border-ocean-300 dark:hover:border-ocean-700 hover-lift"
                            }`}
                            onClick={() => handlePetSelect(pet)}
                          >
                            <CardContent className="p-6">
                              <div className="flex justify-between items-center mb-3">
                                <div className="flex items-center space-x-3">
                                  {pet.species === "Cachorro" ? (
                                    <Dog className="h-6 w-6 text-ocean-600 dark:text-ocean-400" />
                                  ) : (
                                    <Cat className="h-6 w-6 text-ocean-600 dark:text-ocean-400" />
                                  )}
                                  <h4 className="font-semibold text-lg">{pet.name}</h4>
                                </div>
                                {selectedPet?.id === pet.id && (
                                  <Check className="h-5 w-5 text-primary" />
                                )}
                              </div>
                              
                              <div className="space-y-2 text-sm text-muted-foreground">
                                <div className="flex justify-between">
                                  <span>Espécie:</span>
                                  <span className="font-medium text-foreground">{pet.species}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Raça:</span>
                                  <span className="font-medium text-foreground">{pet.breed}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Idade:</span>
                                  <span className="font-medium text-foreground">{pet.age} anos</span>
                                </div>
                                <Separator className="my-2" />
                                <div>
                                  <span className="block mb-1">Condição Médica:</span>
                                  <span className="font-medium text-foreground">{pet.medicalCondition}</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Template Selection */}
            {step === 2 && (
              <div className="space-y-6">
                <h3 className="font-semibold text-lg">Selecione o Modelo Base</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                  {PROSTHETIC_TEMPLATES.map((template) => (
                    <Card
                      key={template.id}
                      className={`cursor-pointer transition-all overflow-hidden ${
                        selectedTemplate?.id === template.id
                          ? "ring-2 ring-primary ring-offset-2"
                          : "hover:border-ocean-300 dark:hover:border-ocean-700 hover-lift"
                      }`}
                      onClick={() => handleTemplateSelect(template)}
                    >
                      <div className="aspect-video w-full bg-muted relative">
                        <img 
                          src={template.imageSrc} 
                          alt={template.name}
                          className="w-full h-full object-cover" 
                        />
                        {selectedTemplate?.id === template.id && (
                          <div className="absolute top-2 right-2 bg-primary text-primary-foreground p-1 rounded-full">
                            <Check className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-base">{template.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                        <div className="mt-2 text-xs bg-secondary inline-block px-2 py-1 rounded-full">
                          {template.recommendedFor}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary text-primary-foreground rounded-full">
                      <Cog className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium">Recomendação da IA</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Com base nas informações de {selectedPet?.name}, recomendamos o modelo "Prótese Padrão - Pata {selectedPet?.medicalCondition.includes("dianteira") ? "Dianteira" : "Traseira"} (Cão)".
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Measurements */}
            {step === 3 && (
              <div className="space-y-6">
                <h3 className="font-semibold text-lg">Medidas</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Guia de Medidas</CardTitle>
                      <CardDescription>
                        Como realizar as medições corretamente
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 border rounded-lg flex items-start space-x-3">
                          <div className="p-1.5 bg-ocean-100 dark:bg-ocean-900/50 text-ocean-600 dark:text-ocean-400 rounded-full shrink-0">
                            <Ruler className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">Comprimento do Membro</h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              Meça do ponto de amputação até o final do membro saudável correspondente.
                            </p>
                          </div>
                        </div>
                        
                        <div className="p-4 border rounded-lg flex items-start space-x-3">
                          <div className="p-1.5 bg-ocean-100 dark:bg-ocean-900/50 text-ocean-600 dark:text-ocean-400 rounded-full shrink-0">
                            <Ruler className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">Circunferência do Membro</h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              Meça a circunferência do membro no ponto de fixação da prótese.
                            </p>
                          </div>
                        </div>
                        
                        <div className="p-4 border rounded-lg flex items-start space-x-3">
                          <div className="p-1.5 bg-ocean-100 dark:bg-ocean-900/50 text-ocean-600 dark:text-ocean-400 rounded-full shrink-0">
                            <Ruler className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">Circunferência da Articulação</h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              Meça a circunferência na articulação mais próxima ao ponto de fixação.
                            </p>
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <Button 
                            variant="outline"
                            className="w-full"
                            onClick={() => toast.info("Guia detalhado aberto em nova janela.")}
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            Ver guia completo
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="limb-length">Comprimento do Membro (cm)</Label>
                          <div className="flex">
                            <Input
                              id="limb-length"
                              type="number"
                              value={measurements.limbLength}
                              onChange={(e) => setMeasurements({...measurements, limbLength: Number(e.target.value)})}
                              step="0.5"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-1.5">
                          <Label htmlFor="limb-circumference">Circunferência do Membro (cm)</Label>
                          <Input
                            id="limb-circumference"
                            type="number"
                            value={measurements.limbCircumference}
                            onChange={(e) => setMeasurements({...measurements, limbCircumference: Number(e.target.value)})}
                            step="0.5"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="joint-circumference">Circunferência da Articulação (cm)</Label>
                          <Input
                            id="joint-circumference"
                            type="number"
                            value={measurements.jointCircumference}
                            onChange={(e) => setMeasurements({...measurements, jointCircumference: Number(e.target.value)})}
                            step="0.5"
                          />
                        </div>
                        
                        <div className="space-y-1.5">
                          <Label htmlFor="weight">Peso do Animal (kg)</Label>
                          <Input
                            id="weight"
                            type="number"
                            value={measurements.weight}
                            onChange={(e) => setMeasurements({...measurements, weight: Number(e.target.value)})}
                            step="0.5"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-secondary/50 rounded-lg mt-6">
                      <h4 className="font-medium text-sm flex items-center">
                        <UploadCloud className="h-4 w-4 mr-2 text-primary" />
                        Enviar Fotos ou Escaneamento 3D
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1 mb-3">
                        Para maior precisão, envie fotos ou um arquivo de escaneamento 3D do membro.
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" className="text-xs h-8">Enviar Fotos</Button>
                        <Button variant="outline" className="text-xs h-8">Enviar Arquivo 3D</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Customization */}
            {step === 4 && (
              <div className="space-y-6">
                <h3 className="font-semibold text-lg">Personalização</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Materiais e Acabamento</CardTitle>
                        <CardDescription>
                          Escolha o material e acabamento da prótese
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="material">Material</Label>
                          <Select 
                            value={customization.material} 
                            onValueChange={(value) => setCustomization({...customization, material: value})}
                          >
                            <SelectTrigger id="material">
                              <SelectValue placeholder="Selecione o material" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="PLA">PLA</SelectItem>
                              <SelectItem value="PETG">PETG</SelectItem>
                              <SelectItem value="TPU">TPU Flexível</SelectItem>
                              <SelectItem value="Nylon">Nylon</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-1.5">
                          <Label htmlFor="color">Cor</Label>
                          <div className="flex space-x-2">
                            <Input 
                              type="color" 
                              value={customization.color}
                              onChange={(e) => setCustomization({...customization, color: e.target.value})}
                              className="w-12 h-10 p-1"
                            />
                            <Input 
                              type="text" 
                              value={customization.color}
                              onChange={(e) => setCustomization({...customization, color: e.target.value})}
                              className="flex-1"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-3 pt-2">
                          <div className="space-y-1.5">
                            <div className="flex justify-between items-center">
                              <Label htmlFor="flexibility">Flexibilidade</Label>
                              <span className="text-sm text-muted-foreground">{customization.flexibility}%</span>
                            </div>
                            <Slider 
                              id="flexibility"
                              min={0} 
                              max={100} 
                              step={1}
                              value={[customization.flexibility]}
                              onValueChange={(value) => setCustomization({...customization, flexibility: value[0]})}
                            />
                          </div>
                          
                          <div className="space-y-1.5">
                            <div className="flex justify-between items-center">
                              <Label htmlFor="reinforcement">Reforço Estrutural</Label>
                              <span className="text-sm text-muted-foreground">{customization.reinforcement}%</span>
                            </div>
                            <Slider 
                              id="reinforcement"
                              min={0} 
                              max={100} 
                              step={1}
                              value={[customization.reinforcement]}
                              onValueChange={(value) => setCustomization({...customization, reinforcement: value[0]})}
                            />
                          </div>
                          
                          <div className="space-y-1.5">
                            <div className="flex justify-between items-center">
                              <Label htmlFor="grip">Aderência</Label>
                              <span className="text-sm text-muted-foreground">{customization.grip}%</span>
                            </div>
                            <Slider 
                              id="grip"
                              min={0} 
                              max={100} 
                              step={1}
                              value={[customization.grip]}
                              onValueChange={(value) => setCustomization({...customization, grip: value[0]})}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="md:col-span-2 space-y-6">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Características Funcionais</CardTitle>
                        <CardDescription>
                          Adapte as funcionalidades da prótese às necessidades do pet
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="item-1">
                            <AccordionTrigger className="text-base">Sistema de Fixação</AccordionTrigger>
                            <AccordionContent className="space-y-3">
                              <div className="grid grid-cols-3 gap-2 mb-3">
                                <div className="border rounded-lg p-3 text-center hover:border-primary cursor-pointer transition-colors">
                                  <span className="text-sm font-medium">Velcro</span>
                                </div>
                                <div className="border rounded-lg p-3 text-center hover:border-primary cursor-pointer transition-colors">
                                  <span className="text-sm font-medium">Silicone</span>
                                </div>
                                <div className="border rounded-lg p-3 text-center hover:border-primary cursor-pointer transition-colors bg-primary/10 border-primary">
                                  <span className="text-sm font-medium">Híbrido</span>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                O sistema de fixação híbrido combina a facilidade do velcro com o conforto do silicone para uma melhor adaptação.
                              </p>
                            </AccordionContent>
                          </AccordionItem>
                          
                          <AccordionItem value="item-2">
                            <AccordionTrigger className="text-base">Articulações</AccordionTrigger>
                            <AccordionContent className="space-y-3">
                              <div className="grid grid-cols-3 gap-2 mb-3">
                                <div className="border rounded-lg p-3 text-center hover:border-primary cursor-pointer transition-colors">
                                  <span className="text-sm font-medium">Fixa</span>
                                </div>
                                <div className="border rounded-lg p-3 text-center hover:border-primary cursor-pointer transition-colors bg-primary/10 border-primary">
                                  <span className="text-sm font-medium">Simples</span>
                                </div>
                                <div className="border rounded-lg p-3 text-center hover:border-primary cursor-pointer transition-colors">
                                  <span className="text-sm font-medium">Avançada</span>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                A articulação simples permite movimentos básicos, ideal para o primeiro contato do pet com a prótese.
                              </p>
                            </AccordionContent>
                          </AccordionItem>
                          
                          <AccordionItem value="item-3">
                            <AccordionTrigger className="text-base">Amortecimento de Impacto</AccordionTrigger>
                            <AccordionContent className="space-y-3">
                              <div className="grid grid-cols-2 gap-2 mb-3">
                                <div className="border rounded-lg p-3 text-center hover:border-primary cursor-pointer transition-colors">
                                  <span className="text-sm font-medium">Padrão</span>
                                </div>
                                <div className="border rounded-lg p-3 text-center hover:border-primary cursor-pointer transition-colors bg-primary/10 border-primary">
                                  <span className="text-sm font-medium">Premium</span>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                O amortecimento premium inclui uma camada extra de material absorvente para maior conforto.
                              </p>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Recomendações da IA</CardTitle>
                        <CardDescription>
                          Sugestões baseadas nas necessidades específicas do pet
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="p-3 border rounded-lg flex space-x-3">
                          <Cog className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm">
                              <span className="font-medium">Material:</span> Recomendamos o uso de {selectedPet?.species === "Cachorro" ? "PETG" : "TPU Flexível"} para maior durabilidade e conforto.
                            </p>
                          </div>
                        </div>
                        
                        <div className="p-3 border rounded-lg flex space-x-3">
                          <Cog className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm">
                              <span className="font-medium">Estrutura:</span> Considerando o peso e porte do pet, sugerimos um reforço estrutural de {Math.round(measurements.weight * 1.5)}% para garantir resistência adequada.
                            </p>
                          </div>
                        </div>
                        
                        <div className="p-3 border rounded-lg flex space-x-3">
                          <Cog className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm">
                              <span className="font-medium">Adaptação:</span> Devido à {selectedPet?.medicalCondition}, recomendamos um sistema de fixação híbrido para melhor estabilidade e conforto durante o uso.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Visualization and Validation */}
            {step === 5 && (
              <div className="space-y-6">
                <h3 className="font-semibold text-lg">Visualização do Modelo</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <Card className="min-h-[500px] flex flex-col">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-base">Modelo 3D</CardTitle>
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
                        {isGenerating ? (
                          <div className="text-center py-12">
                            <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary mb-4" />
                            <p className="text-muted-foreground">Gerando modelo 3D com IA...</p>
                            <p className="text-sm text-muted-foreground mt-2">Isso pode levar alguns instantes</p>
                          </div>
                        ) : !isModelReady ? (
                          <div className="text-center py-12">
                            <Box className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" /> {/* Changed from Cube to Box */}
                            <Button
                              onClick={handleGenerateModel}
                              className="bg-ocean-600 hover:bg-ocean-700"
                            >
                              <Cog className="mr-2 h-4 w-4" /> Gerar Modelo 3D
                            </Button>
                            <p className="text-sm text-muted-foreground mt-4">
                              O modelo será gerado com base nas medidas e personalizações definidas
                            </p>
                          </div>
                        ) : (
                          <div className="relative w-full h-full min-h-[400px] flex items-center justify-center">
                            <img 
                              src={selectedTemplate?.imageSrc} 
                              alt="Modelo 3D"
                              className="object-contain transition-all duration-300"
                              style={{ 
                                transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                                maxHeight: "400px",
                                filter: `hue-rotate(${customization.color !== "#2563eb" ? "90deg" : "0deg"})`
                              }}
                            />
                            <div className="absolute bottom-4 right-4">
                              <Button variant="outline" size="sm">
                                <ZoomIn className="h-4 w-4 mr-1" /> Tela Cheia
                              </Button>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="md:col-span-1 space-y-6">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Especificações</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="text-sm grid grid-cols-2 gap-3">
                          <div className="font-medium">Pet:</div>
                          <div>{selectedPet?.name} ({selectedPet?.species})</div>
                          
                          <div className="font-medium">Modelo:</div>
                          <div>{selectedTemplate?.name || "Personalizado"}</div>
                          
                          <div className="font-medium">Material:</div>
                          <div>{customization.material}</div>
                          
                          <div className="font-medium">Cor:</div>
                          <div className="flex items-center">
                            <div 
                              className="w-3 h-3 rounded-full mr-2" 
                              style={{ backgroundColor: customization.color }}
                            ></div>
                            {customization.color}
                          </div>
                          
                          <div className="font-medium">Membro:</div>
                          <div>{selectedTemplate?.limbType === "dianteira" ? "Pata Dianteira" : "Pata Traseira"}</div>
                          
                          <div className="font-medium">Estimativa:</div>
                          <div>3-5 dias úteis</div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {isModelReady && (
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">Finalizar Projeto</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <Button 
                            onClick={handleSaveDesign}
                            variant="outline" 
                            className="w-full"
                          >
                            <Save className="mr-2 h-4 w-4" />
                            Salvar Projeto
                          </Button>
                          
                          <Button 
                            onClick={handleSubmitForApproval}
                            className="w-full bg-ocean-600 hover:bg-ocean-700"
                          >
                            <Check className="mr-2 h-4 w-4" />
                            Enviar para Aprovação
                          </Button>
                          
                          <p className="text-xs text-muted-foreground text-center mt-2">
                            Ao enviar para aprovação, o cliente poderá revisar e solicitar ajustes
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <Button
              variant="outline"
              onClick={handlePreviousStep}
              disabled={step === 1}
            >
              Voltar
            </Button>
            <Button
              onClick={handleNextStep}
              disabled={step === 5}
              className="bg-ocean-600 hover:bg-ocean-700"
            >
              {step === 5 ? "Finalizar" : "Próximo"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

interface StepIndicatorProps {
  number: number;
  title: string;
  isActive: boolean;
  isCompleted: boolean;
}

const StepIndicator = ({ number, title, isActive, isCompleted }: StepIndicatorProps) => {
  return (
    <div className="flex-1">
      <div className="flex items-center">
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
            isActive
              ? "bg-primary text-primary-foreground"
              : isCompleted
              ? "bg-primary/20 text-primary"
              : "bg-secondary text-muted-foreground"
          }`}
        >
          {isCompleted ? <Check className="h-4 w-4" /> : number}
        </div>
        <div
          className={`h-1 flex-1 ${
            isCompleted ? "bg-primary/50" : "bg-secondary"
          }`}
        ></div>
      </div>
      <div className="mt-2">
        <p
          className={`text-sm ${
            isActive || isCompleted
              ? "font-medium text-foreground"
              : "text-muted-foreground"
          }`}
        >
          {title}
        </p>
      </div>
    </div>
  );
};

export default ProstheticDesign;
