
import { Layout } from "@/components/Layout";
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dog, 
  Cat, 
  Search, 
  UserPlus, 
  Users, 
  Plus, 
  Trash,
  Edit,
  Save,
  PlusCircle,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

// Example client data
const SAMPLE_CLIENTS = [
  { 
    id: 1, 
    name: "Carlos Silva", 
    email: "carlos.silva@email.com", 
    phone: "(11) 98765-4321",
    address: "Av. Paulista, 1000",
    city: "São Paulo",
    pets: [
      { 
        id: 1, 
        name: "Rex", 
        species: "Cachorro", 
        breed: "Golden Retriever", 
        age: 4, 
        weight: 28.5, 
        medicalCondition: "Amputação da pata dianteira direita"
      }
    ]
  },
  { 
    id: 2, 
    name: "Marina Costa", 
    email: "marina.costa@email.com", 
    phone: "(21) 99876-5432",
    address: "Rua das Flores, 250",
    city: "Rio de Janeiro",
    pets: [
      { 
        id: 2, 
        name: "Luna", 
        species: "Gato", 
        breed: "Siamês", 
        age: 2, 
        weight: 3.8, 
        medicalCondition: "Malformação congênita na pata traseira esquerda"
      }
    ]
  },
  { 
    id: 3, 
    name: "João Mendes", 
    email: "joao.mendes@email.com", 
    phone: "(31) 97654-3210",
    address: "Rua Horizonte, 789",
    city: "Belo Horizonte",
    pets: [
      { 
        id: 3, 
        name: "Toby", 
        species: "Cachorro", 
        breed: "Border Collie", 
        age: 6, 
        weight: 18.2, 
        medicalCondition: "Amputação pata traseira direita devido a trauma"
      },
      { 
        id: 4, 
        name: "Nina", 
        species: "Cachorro", 
        breed: "Dachshund", 
        age: 8, 
        weight: 7.5, 
        medicalCondition: "Displasia no quadril, dificuldade de locomoção"
      }
    ]
  }
];

type Client = typeof SAMPLE_CLIENTS[0];
type Pet = Client['pets'][0];

const ClientRegistry = () => {
  const [clients, setClients] = useState<Client[]>(SAMPLE_CLIENTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [newClientOpen, setNewClientOpen] = useState(false);
  const [newPetOpen, setNewPetOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [editMode, setEditMode] = useState(false);

  // New client form state
  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: ""
  });

  // New pet form state
  const [newPet, setNewPet] = useState({
    name: "",
    species: "Cachorro",
    breed: "",
    age: "",
    weight: "",
    medicalCondition: ""
  });

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  );

  const handleAddClient = () => {
    if (!newClient.name || !newClient.email || !newClient.phone) {
      toast.error("Nome, email e telefone são obrigatórios!");
      return;
    }

    const newClientObj: Client = {
      id: clients.length + 1,
      ...newClient,
      pets: []
    };

    setClients([...clients, newClientObj]);
    setNewClient({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: ""
    });
    setNewClientOpen(false);
    toast.success("Cliente adicionado com sucesso!");
  };

  const handleAddPet = () => {
    if (!selectedClient) return;
    if (!newPet.name || !newPet.species || !newPet.breed) {
      toast.error("Nome, espécie e raça são obrigatórios!");
      return;
    }

    const petObj: Pet = {
      id: Date.now(),
      name: newPet.name,
      species: newPet.species,
      breed: newPet.breed,
      age: Number(newPet.age),
      weight: Number(newPet.weight),
      medicalCondition: newPet.medicalCondition
    };

    const updatedClients = clients.map(client => {
      if (client.id === selectedClient.id) {
        return {
          ...client,
          pets: [...client.pets, petObj]
        };
      }
      return client;
    });

    setClients(updatedClients);
    setSelectedClient(prev => prev ? {
      ...prev,
      pets: [...prev.pets, petObj]
    } : null);
    setNewPet({
      name: "",
      species: "Cachorro",
      breed: "",
      age: "",
      weight: "",
      medicalCondition: ""
    });
    setNewPetOpen(false);
    toast.success("Pet adicionado com sucesso!");
  };

  const handleClientSelect = (client: Client) => {
    setSelectedClient(client);
    setSelectedPet(null);
    setEditMode(false);
  };

  const handlePetSelect = (pet: Pet) => {
    setSelectedPet(pet);
    setEditMode(false);
  };

  const handleUpdateClient = () => {
    if (!selectedClient) return;
    
    const updatedClients = clients.map(client => 
      client.id === selectedClient.id ? selectedClient : client
    );
    
    setClients(updatedClients);
    setEditMode(false);
    toast.success("Cliente atualizado com sucesso!");
  };

  const handleUpdatePet = () => {
    if (!selectedClient || !selectedPet) return;
    
    const updatedClients = clients.map(client => {
      if (client.id === selectedClient.id) {
        return {
          ...client,
          pets: client.pets.map(pet => 
            pet.id === selectedPet.id ? selectedPet : pet
          )
        };
      }
      return client;
    });
    
    setClients(updatedClients);
    setSelectedClient(prev => {
      if (!prev) return null;
      return {
        ...prev,
        pets: prev.pets.map(pet => 
          pet.id === selectedPet.id ? selectedPet : pet
        )
      };
    });
    
    setEditMode(false);
    toast.success("Pet atualizado com sucesso!");
  };

  const handleDeleteClient = () => {
    if (!selectedClient) return;
    
    const updatedClients = clients.filter(client => client.id !== selectedClient.id);
    setClients(updatedClients);
    setSelectedClient(null);
    toast.success("Cliente removido com sucesso!");
  };

  const handleDeletePet = () => {
    if (!selectedClient || !selectedPet) return;
    
    const updatedClients = clients.map(client => {
      if (client.id === selectedClient.id) {
        return {
          ...client,
          pets: client.pets.filter(pet => pet.id !== selectedPet.id)
        };
      }
      return client;
    });
    
    setClients(updatedClients);
    setSelectedClient(prev => {
      if (!prev) return null;
      return {
        ...prev,
        pets: prev.pets.filter(pet => pet.id !== selectedPet.id)
      };
    });
    setSelectedPet(null);
    toast.success("Pet removido com sucesso!");
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cadastro de Clientes</h1>
          <p className="text-muted-foreground">
            Gerencie clientes e seus pets para facilitar o processo de criação de próteses.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Client list section */}
          <Card className="lg:col-span-1">
            <CardHeader className="space-y-4">
              <CardTitle>Clientes</CardTitle>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Pesquisar clientes..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button 
                onClick={() => setNewClientOpen(true)} 
                className="w-full bg-ocean-600 hover:bg-ocean-700"
              >
                <UserPlus className="mr-2 h-4 w-4" /> Novo Cliente
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                {filteredClients.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="mx-auto h-12 w-12 opacity-20 mb-2" />
                    <p>Nenhum cliente encontrado</p>
                  </div>
                ) : (
                  filteredClients.map((client) => (
                    <div
                      key={client.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedClient?.id === client.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary"
                      }`}
                      onClick={() => handleClientSelect(client)}
                    >
                      <div className="font-medium">{client.name}</div>
                      <div className="text-sm opacity-80">{client.email}</div>
                      <div className="text-sm opacity-80 flex items-center mt-1 gap-2">
                        <Dog className="h-3 w-3" />
                        <span>{client.pets.length} pets</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Client details section */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>
                {selectedClient ? (
                  <div className="flex justify-between items-center">
                    <span>Detalhes do Cliente</span>
                    <div className="flex gap-2">
                      {editMode ? (
                        <Button
                          onClick={selectedPet ? handleUpdatePet : handleUpdateClient}
                          variant="default"
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Save className="h-4 w-4 mr-1" /> Salvar
                        </Button>
                      ) : (
                        <Button
                          onClick={() => setEditMode(true)}
                          variant="outline"
                          size="sm"
                        >
                          <Edit className="h-4 w-4 mr-1" /> Editar
                        </Button>
                      )}
                      <Button
                        onClick={selectedPet ? handleDeletePet : handleDeleteClient}
                        variant="destructive"
                        size="sm"
                      >
                        <Trash className="h-4 w-4 mr-1" /> Excluir
                      </Button>
                    </div>
                  </div>
                ) : (
                  "Selecione um cliente"
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!selectedClient ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Users className="mx-auto h-16 w-16 opacity-20 mb-4" />
                  <p className="text-lg">Selecione um cliente para ver os detalhes</p>
                </div>
              ) : (
                <Tabs defaultValue="info">
                  <TabsList className="mb-4">
                    <TabsTrigger value="info">Informações</TabsTrigger>
                    <TabsTrigger value="pets">Pets ({selectedClient.pets.length})</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="info" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="name">Nome</Label>
                        <Input
                          id="name"
                          value={selectedClient.name}
                          onChange={(e) => setSelectedClient({...selectedClient, name: e.target.value})}
                          disabled={!editMode}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email" 
                          value={selectedClient.email}
                          onChange={(e) => setSelectedClient({...selectedClient, email: e.target.value})}
                          disabled={!editMode}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input
                          id="phone"
                          value={selectedClient.phone}
                          onChange={(e) => setSelectedClient({...selectedClient, phone: e.target.value})}
                          disabled={!editMode}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="city">Cidade</Label>
                        <Input
                          id="city"
                          value={selectedClient.city}
                          onChange={(e) => setSelectedClient({...selectedClient, city: e.target.value})}
                          disabled={!editMode}
                        />
                      </div>
                      <div className="space-y-1.5 md:col-span-2">
                        <Label htmlFor="address">Endereço</Label>
                        <Input
                          id="address"
                          value={selectedClient.address}
                          onChange={(e) => setSelectedClient({...selectedClient, address: e.target.value})}
                          disabled={!editMode}
                        />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="pets" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Lista de Pets</h3>
                      <Button 
                        onClick={() => setNewPetOpen(true)} 
                        size="sm" 
                        className="bg-ocean-600 hover:bg-ocean-700"
                      >
                        <Plus className="mr-1 h-4 w-4" /> Adicionar Pet
                      </Button>
                    </div>
                    
                    {selectedClient.pets.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <div className="flex justify-center mb-3">
                          <Dog className="h-12 w-12 opacity-20" />
                          <Cat className="h-12 w-12 opacity-20 ml-2" />
                        </div>
                        <p>Nenhum pet cadastrado</p>
                        <Button 
                          onClick={() => setNewPetOpen(true)} 
                          variant="link" 
                          className="mt-2 text-ocean-600 dark:text-ocean-400"
                        >
                          Adicionar um pet
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {selectedClient.pets.map((pet) => (
                          <div
                            key={pet.id}
                            className={`p-3 border rounded-lg cursor-pointer transition-all ${
                              selectedPet?.id === pet.id
                                ? "border-primary bg-primary/5"
                                : "hover:border-ocean-300 dark:hover:border-ocean-700"
                            }`}
                            onClick={() => handlePetSelect(pet)}
                          >
                            <div className="flex justify-between items-center">
                              <div className="flex items-center space-x-2">
                                {pet.species === "Cachorro" ? (
                                  <Dog className="h-5 w-5 text-ocean-600 dark:text-ocean-400" />
                                ) : (
                                  <Cat className="h-5 w-5 text-ocean-600 dark:text-ocean-400" />
                                )}
                                <span className="font-medium">{pet.name}</span>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {pet.breed}
                              </div>
                            </div>
                            
                            {selectedPet?.id === pet.id && (
                              <div className="mt-3 space-y-3 pt-3 border-t">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <div className="space-y-1.5">
                                    <Label htmlFor="pet-name">Nome</Label>
                                    <Input
                                      id="pet-name"
                                      value={selectedPet.name}
                                      onChange={(e) => setSelectedPet({...selectedPet, name: e.target.value})}
                                      disabled={!editMode}
                                    />
                                  </div>
                                  <div className="space-y-1.5">
                                    <Label htmlFor="pet-species">Espécie</Label>
                                    <Select 
                                      value={selectedPet.species} 
                                      onValueChange={(value) => setSelectedPet({...selectedPet, species: value})}
                                      disabled={!editMode}
                                    >
                                      <SelectTrigger id="pet-species">
                                        <SelectValue placeholder="Selecione" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Cachorro">Cachorro</SelectItem>
                                        <SelectItem value="Gato">Gato</SelectItem>
                                        <SelectItem value="Outro">Outro</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="space-y-1.5">
                                    <Label htmlFor="pet-breed">Raça</Label>
                                    <Input
                                      id="pet-breed"
                                      value={selectedPet.breed}
                                      onChange={(e) => setSelectedPet({...selectedPet, breed: e.target.value})}
                                      disabled={!editMode}
                                    />
                                  </div>
                                  <div className="space-y-1.5">
                                    <Label htmlFor="pet-age">Idade (anos)</Label>
                                    <Input
                                      id="pet-age"
                                      type="number"
                                      value={selectedPet.age}
                                      onChange={(e) => setSelectedPet({...selectedPet, age: Number(e.target.value)})}
                                      disabled={!editMode}
                                    />
                                  </div>
                                  <div className="space-y-1.5">
                                    <Label htmlFor="pet-weight">Peso (kg)</Label>
                                    <Input
                                      id="pet-weight"
                                      type="number"
                                      step="0.1"
                                      value={selectedPet.weight}
                                      onChange={(e) => setSelectedPet({...selectedPet, weight: Number(e.target.value)})}
                                      disabled={!editMode}
                                    />
                                  </div>
                                  <div className="space-y-1.5 md:col-span-3">
                                    <Label htmlFor="pet-condition">Condição Médica</Label>
                                    <Input
                                      id="pet-condition"
                                      value={selectedPet.medicalCondition}
                                      onChange={(e) => setSelectedPet({...selectedPet, medicalCondition: e.target.value})}
                                      disabled={!editMode}
                                    />
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* New Client Dialog */}
      <Dialog open={newClientOpen} onOpenChange={setNewClientOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Novo Cliente</DialogTitle>
            <DialogDescription>
              Insira as informações do cliente para cadastro.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="new-name">Nome*</Label>
                <Input
                  id="new-name"
                  value={newClient.name}
                  onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="new-email">Email*</Label>
                  <Input
                    id="new-email"
                    type="email"
                    value={newClient.email}
                    onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="new-phone">Telefone*</Label>
                  <Input
                    id="new-phone"
                    value={newClient.phone}
                    onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="new-address">Endereço</Label>
                <Input
                  id="new-address"
                  value={newClient.address}
                  onChange={(e) => setNewClient({...newClient, address: e.target.value})}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="new-city">Cidade</Label>
                <Input
                  id="new-city"
                  value={newClient.city}
                  onChange={(e) => setNewClient({...newClient, city: e.target.value})}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewClientOpen(false)}>Cancelar</Button>
            <Button onClick={handleAddClient} className="bg-ocean-600 hover:bg-ocean-700">Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Pet Dialog */}
      <Dialog open={newPetOpen} onOpenChange={setNewPetOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Novo Pet</DialogTitle>
            <DialogDescription>
              Adicione um pet para {selectedClient?.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="new-pet-name">Nome*</Label>
                <Input
                  id="new-pet-name"
                  value={newPet.name}
                  onChange={(e) => setNewPet({...newPet, name: e.target.value})}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="new-pet-species">Espécie*</Label>
                <Select 
                  value={newPet.species} 
                  onValueChange={(value) => setNewPet({...newPet, species: value})}
                >
                  <SelectTrigger id="new-pet-species">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cachorro">Cachorro</SelectItem>
                    <SelectItem value="Gato">Gato</SelectItem>
                    <SelectItem value="Outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="new-pet-breed">Raça*</Label>
                <Input
                  id="new-pet-breed"
                  value={newPet.breed}
                  onChange={(e) => setNewPet({...newPet, breed: e.target.value})}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="new-pet-age">Idade (anos)</Label>
                <Input
                  id="new-pet-age"
                  type="number"
                  value={newPet.age}
                  onChange={(e) => setNewPet({...newPet, age: e.target.value})}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="new-pet-weight">Peso (kg)</Label>
                <Input
                  id="new-pet-weight"
                  type="number"
                  step="0.1"
                  value={newPet.weight}
                  onChange={(e) => setNewPet({...newPet, weight: e.target.value})}
                />
              </div>
              <div className="space-y-1.5 col-span-2">
                <Label htmlFor="new-pet-condition">Condição Médica</Label>
                <Input
                  id="new-pet-condition"
                  value={newPet.medicalCondition}
                  onChange={(e) => setNewPet({...newPet, medicalCondition: e.target.value})}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewPetOpen(false)}>Cancelar</Button>
            <Button onClick={handleAddPet} className="bg-ocean-600 hover:bg-ocean-700">Adicionar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default ClientRegistry;
