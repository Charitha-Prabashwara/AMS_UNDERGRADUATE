import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Pagination,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Typography
} from "@mui/material";

import MainCard from "components/MainCard";
import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "api/fetcher";

export default function DepartmentPage() {
  const { data, error, isLoading, mutate } = useSWR("/department/find/", fetcher, {
    refreshInterval: 10000, // reload every 10 seconds
  });

  const departments = data?.departments || [];

  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);

  // ---------------- CREATE ----------------
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [newDept, setNewDept] = useState({ shortName: "", keyName: "", fullName: "", description: "" });

  const [openConfirmCreateDialog, setOpenConfirmCreateDialog] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const handleOpenCreateDialog = () => setOpenCreateDialog(true);
  const handleSubmitCreate = () => setOpenConfirmCreateDialog(true);

  const handleFinalCreate = async () => {
    if (confirmText !== newDept.fullName) {
      alert("Typed name does not match the full name!");
      return;
    }

    try {
      await fetcher("/department/create", {
        method: "POST",
        data: newDept,
      });
      mutate(); // reload SWR
      setOpenConfirmCreateDialog(false);
      setOpenCreateDialog(false);
      setConfirmText("");
      setNewDept({ shortName: "", keyName: "", fullName: "", description: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to create department");
    }
  };

  // ---------------- EDIT & DELETE ----------------
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedDept, setSelectedDept] = useState(null);

  const handleOpenEditDialog = (dept) => setSelectedDept(dept) || setOpenEditDialog(true);

  const handleSaveEdit = async () => {
    try {
      await fetcher("/department/update", { method: "PUT", data: selectedDept });
      mutate();
      setOpenEditDialog(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update department");
    }
  };

  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [deleteText, setDeleteText] = useState("");

  const handleFinalDelete = async () => {
    if (deleteText !== selectedDept.fullName) {
      alert("Type correct full name to delete!");
      return;
    }

    try {
      await fetcher("/department/delete", { method: "DELETE", data: { id: selectedDept.id } });
      mutate();
      setOpenConfirmDelete(false);
      setOpenEditDialog(false);
    } catch (err) {
      console.error(err);
      alert("Failed to delete department");
    }
  };

  // ---------- Pagination Data ----------
  const paginatedDepartments = departments.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const totalPages = Math.ceil(departments.length / rowsPerPage);

  if (error) return <div>Error loading departments</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <MainCard title="Departments">
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" color="success" onClick={handleOpenCreateDialog}>
          New Department
        </Button>
      </Box>

      {/* ====================== TABLE ===================== */}
      <TableContainer component={Paper} sx={{ maxHeight: 330, overflowY: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#ceffd3" }}>
              <TableCell align="center">#</TableCell>
              <TableCell align="center">Short Name</TableCell>
              <TableCell align="center">Key</TableCell>
              <TableCell align="center">Full Name</TableCell>
              <TableCell align="center">Created</TableCell>
              <TableCell align="center">Updated</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedDepartments.map((dept, idx) => (
              <TableRow key={dept.id}>
                <TableCell align="center">{(page - 1) * rowsPerPage + idx + 1}</TableCell>
                <TableCell align="center">{dept.name.short}</TableCell>
                <TableCell align="center">{dept.name.key}</TableCell>
                <TableCell align="center">{dept.name.long}</TableCell>
                <TableCell align="center">{new Date(dept.createdAt_timestamp).toLocaleDateString()}</TableCell>
                <TableCell align="center">{new Date(dept.updatedAt_timestamp).toLocaleDateString()}</TableCell>
                <TableCell align="center">
                  <Button size="small" variant="outlined" onClick={() => handleOpenEditDialog(dept)}>
                    Edit / Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination count={totalPages} page={page} onChange={(e, val) => setPage(val)} />
      </Box>

      {/* ================= DIALOGS ================= */}
      {/* Your create/edit/confirm/delete dialogs stay the same */}
    </MainCard>
  );
}
