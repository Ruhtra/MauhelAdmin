import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AddUserDialog } from "./AddUsers";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface User {
  id: string;
  name: string;
  email: string;
  role: "usuário" | "professor" | "admin";
  phone: string;
  cpf: string;
  photo?: string;
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao@example.com",
    role: "usuário",
    phone: "(11) 98765-4321",
    cpf: "123.456.789-00",
    photo: "https://i.pravatar.cc/150?u=joao@example.com",
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria@example.com",
    role: "professor",
    phone: "(11) 91234-5678",
    cpf: "987.654.321-00",
    photo: "https://i.pravatar.cc/150?u=maria@example.com",
  },
  {
    id: "3",
    name: "Carlos Oliveira",
    email: "carlos@example.com",
    role: "admin",
    phone: "(11) 95555-5555",
    cpf: "111.222.333-44",
  },
];

export function UsersPage() {
  const [users, setUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddUser = (name: string) => {
    const newUser: User = {
      id: (users.length + 1).toString(),
      name,
      email: "",
      role: "usuário",
      phone: "",
      cpf: "",
    };
    setUsers([...users, newUser]);
  };

  const handleEdit = (id: string) => {
    // Implementar a funcionalidade de edição
    console.log(`Editar usuário ${id}`);
  };

  const handleDelete = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Usuários</h1>
      <div className="flex justify-between items-center mb-6">
        <Input
          placeholder="Buscar usuários..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <AddUserDialog
          onAddUser={function (
            user:
              | {
                  email: string;
                  userType: "collaborator" | "teacher";
                  phone: string;
                  fullName: string;
                  cpf: string;
                  photo: File;
                }
              | {
                  email: string;
                  userType: "subscriber";
                  phone: string;
                  firstName: string;
                  lastName: string;
                  state: string;
                  city: string;
                  photo?: File | undefined;
                }
          ): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Foto</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>CPF</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  {user.photo ? (
                    <img
                      src={user.photo}
                      alt={`Foto de ${user.name}`}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 text-xl">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.cpf}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleEdit(user.id)}>
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600"
                      >
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
