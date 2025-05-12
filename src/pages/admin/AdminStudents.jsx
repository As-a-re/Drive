import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/Table";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/DropdownMenu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/Dialog";
import { Label } from "../../components/ui/Label";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/Avatar";
import { MoreHorizontal, Search, Plus, Eye, Edit, Trash, Download } from "lucide-react";
import api from "../../services/api";
import toast from "react-hot-toast";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.getUsers();
        setStudents(response.data.filter(user => user.role === 'student'));
      } catch (error) {
        console.error("Error fetching students:", error);
        toast.error("Failed to load students");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.phone.includes(searchTerm) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "text-green-600";
      case "inactive":
        return "text-red-600";
      case "pending":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Enrolled Courses</TableHead>
                <TableHead>Total Payments</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3, 4, 5].map((i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
                      <div>
                        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-1"></div>
                        <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-48 bg-gray-200 rounded animate-pulse mb-1"></div>
                    <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-8 w-8 bg-gray-200 rounded animate-pulse ml-auto"></div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Students</h1>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Student
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
              <DialogDescription>Enter the student details below to create a new student account.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" type="email" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input id="phone" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowAddDialog(false)}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search students..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Enrolled Courses</TableHead>
              <TableHead>Total Payments</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student._id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={student.profileImage} />
                      <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{student.name}</div>
                      <div className="text-xs text-gray-500">{student._id}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>{student.email}</div>
                  <div className="text-xs text-gray-500">{student.phone}</div>
                </TableCell>
                <TableCell>{student.enrolledCourses?.length || 0}</TableCell>
                <TableCell>GH₵{student.totalPayments?.toLocaleString() || 0}</TableCell>
                <TableCell>{new Date(student.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className={`font-medium ${getStatusColor(student.status)}`}>
                    {student.status?.charAt(0).toUpperCase() + student.status?.slice(1) || "Active"}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit student
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Export data
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete student
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