import React from 'react';
import { Search, UserPlus, Mail, Phone } from 'lucide-react';
import { TutorModal } from './TutorModal';

interface Endereco {
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

interface Pet {
  id: string;
  nome: string;
  raca: string;
  porte: string;
  tipo: string;
  sexo: string;
  observacoes: string;
}

interface Tutor {
  id: string;
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
  endereco: Endereco;
  qtdPets: number;
  pets: Pet[];
}

const mockTutors: Tutor[] = [
  {
    id: "#123456",
    nome: "Prabodhan Fitzgerald",
    cpf: "123.456.789-00",
    telefone: "(19) 99999-9999",
    email: "nome@email.com",
    endereco: {
      rua: "Rua das Flores",
      numero: "123",
      complemento: "Apto 45",
      bairro: "Centro",
      cidade: "Campinas",
      estado: "SP",
      cep: "13000-000"
    },
    qtdPets: 1,
    pets: [
      {
        id: "1",
        nome: "Rex",
        especie: "Cachorro",
        raca: "Labrador",
        porte: "Grande",
        tipo: "Cachorro",
        sexo: "Macho",
        observacoes: "Alérgico a ração com corante"
      }
    ]
  },
  // ... outros tutores ...
];

export function TutorsTable() {
  const [tutors, setTutors] = React.useState<Tutor[]>(mockTutors);
  const [selectedTutor, setSelectedTutor] = React.useState<Tutor | null>(null);
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSaveTutor = (updatedTutor: Tutor) => {
    setTutors(tutors.map(tutor => 
      tutor.id === updatedTutor.id ? updatedTutor : tutor
    ));
    setSelectedTutor(null);
  };

  const filteredTutors = tutors.filter(tutor => 
    tutor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tutor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tutor.telefone.includes(searchTerm)
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Tutores</h1>
          <p className="text-gray-500 mt-1">Gerencie os tutores cadastrados no sistema</p>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-8">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Buscar por nome, email ou telefone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        </div>
        
        <button className="bg-blue-500 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors shadow-sm">
          <UserPlus className="h-5 w-5" />
          Novo Tutor
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">ID</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Nome</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Contato</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Endereço</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">Pets</th>
              </tr>
            </thead>
            <tbody>
              {filteredTutors.map((tutor) => (
                <tr 
                  key={tutor.id} 
                  onClick={() => setSelectedTutor(tutor)}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <td className="py-4 px-4 text-sm text-gray-600">{tutor.id}</td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-700">{tutor.nome}</span>
                      <span className="text-sm text-gray-500">{tutor.cpf}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4" />
                        {tutor.telefone}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4" />
                        {tutor.email}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col text-sm text-gray-600">
                      <span>{tutor.endereco.rua}, {tutor.endereco.numero}</span>
                      <span className="text-gray-500">{tutor.endereco.cidade} - {tutor.endereco.estado}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-700">{tutor.qtdPets} pets</span>
                      <span className="text-sm text-gray-500">
                        {tutor.pets.map(pet => pet.nome).join(', ')}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center px-4 py-4 border-t border-gray-200 bg-white">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Linhas por página:</span>
            <select className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>1-5 de 13</span>
            <div className="flex gap-1">
              <button className="p-1 rounded hover:bg-gray-100 disabled:opacity-50" disabled>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="p-1 rounded hover:bg-gray-100">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {selectedTutor && (
        <TutorModal 
          tutor={selectedTutor} 
          onClose={() => setSelectedTutor(null)}
          onSave={handleSaveTutor}
        />
      )}
    </div>
  );
}