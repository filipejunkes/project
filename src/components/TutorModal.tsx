import React from 'react';
import { X, User, PawPrint, Save, Plus, Pencil, Check, Trash2, Syringe, Paperclip, FileText } from 'lucide-react';

// ... (interfaces anteriores permanecem iguais)

interface Vacina {
  id: string;
  nome: string;
  data: string;
  proximaData: string;
  veterinario: string;
}

interface Anexo {
  id: string;
  nome: string;
  tipo: string;
  data: string;
  url: string;
}

interface Pet {
  id: string;
  nome: string;
  raca: string;
  porte: string;
  tipo: string;
  sexo: string;
  observacoes: string;
  vacinas: Vacina[];
  anexos: Anexo[];
}

// ... (código anterior até o componente Pet Form)

{editingPetId === pet.id ? (
  <div className="space-y-6">
    {/* ... (campos anteriores do pet) ... */}
    
    <div className="border-t pt-6">
      <h4 className="text-lg font-medium text-gray-900 mb-4">Carteira de Vacinação</h4>
      <div className="space-y-4">
        {pet.vacinas?.map((vacina) => (
          <div key={vacina.id} className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Nome da Vacina
                </label>
                <input
                  type="text"
                  value={vacina.nome}
                  onChange={(e) => handleVacinaChange(pet.id, vacina.id, 'nome', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Veterinário
                </label>
                <input
                  type="text"
                  value={vacina.veterinario}
                  onChange={(e) => handleVacinaChange(pet.id, vacina.id, 'veterinario', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Data da Aplicação
                </label>
                <input
                  type="date"
                  value={vacina.data}
                  onChange={(e) => handleVacinaChange(pet.id, vacina.id, 'data', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Próxima Dose
                </label>
                <input
                  type="date"
                  value={vacina.proximaData}
                  onChange={(e) => handleVacinaChange(pet.id, vacina.id, 'proximaData', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleRemoveVacina(pet.id, vacina.id)}
              className="mt-2 text-red-500 hover:text-red-600 text-sm flex items-center gap-1"
            >
              <Trash2 className="h-4 w-4" />
              Remover
            </button>
          </div>
        ))}
        
        <button
          type="button"
          onClick={() => handleAddVacina(pet.id)}
          className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-gray-600 hover:border-gray-400 transition-colors flex items-center justify-center gap-2"
        >
          <Syringe className="h-4 w-4" />
          Adicionar Vacina
        </button>
      </div>
    </div>

    <div className="border-t pt-6">
      <h4 className="text-lg font-medium text-gray-900 mb-4">Anexos</h4>
      <div className="space-y-4">
        {pet.anexos?.map((anexo) => (
          <div key={anexo.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-700">{anexo.nome}</p>
                <p className="text-xs text-gray-500">Adicionado em {new Date(anexo.data).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={anexo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 text-sm"
              >
                Visualizar
              </a>
              <button
                type="button"
                onClick={() => handleRemoveAnexo(pet.id, anexo.id)}
                className="text-red-500 hover:text-red-600 text-sm"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}

        <div className="relative">
          <input
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={(e) => handleFileUpload(pet.id, e.target.files?.[0])}
            className="hidden"
            id={`file-upload-${pet.id}`}
          />
          <label
            htmlFor={`file-upload-${pet.id}`}
            className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-gray-600 hover:border-gray-400 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Paperclip className="h-4 w-4" />
            Adicionar Anexo (PDF ou Imagem)
          </label>
        </div>
      </div>
    </div>
  </div>
) : (
  <div className="space-y-6">
    {/* ... (visualização dos dados do pet) ... */}
    
    <div className="border-t pt-4">
      <h4 className="text-lg font-medium text-gray-900 mb-4">Carteira de Vacinação</h4>
      {pet.vacinas?.length > 0 ? (
        <div className="space-y-3">
          {pet.vacinas.map((vacina) => (
            <div key={vacina.id} className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Syringe className="h-4 w-4 text-blue-500" />
                <span className="font-medium text-gray-900">{vacina.nome}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                <div>
                  <span className="text-gray-500">Aplicação:</span> {new Date(vacina.data).toLocaleDateString()}
                </div>
                <div>
                  <span className="text-gray-500">Próxima dose:</span> {new Date(vacina.proximaData).toLocaleDateString()}
                </div>
                <div className="col-span-2">
                  <span className="text-gray-500">Veterinário:</span> {vacina.veterinario}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">Nenhuma vacina registrada</p>
      )}
    </div>

    <div className="border-t pt-4">
      <h4 className="text-lg font-medium text-gray-900 mb-4">Anexos</h4>
      {pet.anexos?.length > 0 ? (
        <div className="space-y-2">
          {pet.anexos.map((anexo) => (
            <div key={anexo.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">{anexo.nome}</p>
                  <p className="text-xs text-gray-500">Adicionado em {new Date(anexo.data).toLocaleDateString()}</p>
                </div>
              </div>
              <a
                href={anexo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 text-sm"
              >
                Visualizar
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">Nenhum anexo disponível</p>
      )}
    </div>
  </div>
)}

{/* ... (resto do código permanece igual) ... */}