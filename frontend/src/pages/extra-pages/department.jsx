// material-ui
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
} from '@mui/material';

import MainCard from 'components/MainCard';
import { useState } from 'react';

export default function DepartmentPage() {
  const [departments, setDepartments] = useState([
    {
      id: 1,
      shortName: "CS",
      keyName: "CSC",
      fullName: "Computer Science Department",
      description: "Department of computing",
      createdAt: "2025-01-01",
      updatedAt: "2025-01-10"
    }
  ]);

  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);

  // ---------------- CREATE ----------------
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [newDept, setNewDept] = useState({
    shortName: "",
    keyName: "",
    fullName: "",
    description: ""
  });

  // confirmation before creating new department
  const [openConfirmCreateDialog, setOpenConfirmCreateDialog] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const handleOpenCreateDialog = () => setOpenCreateDialog(true);

  const handleSubmitCreate = () => {
    setOpenConfirmCreateDialog(true);
  };

  const handleFinalCreate = () => {
    if (confirmText !== newDept.fullName) {
      alert("Typed name does not match the full name!");
      return;
    }

    const now = new Date().toISOString().split("T")[0];

    setDepartments(prev => [
      ...prev,
      {
        ...newDept,
        id: Date.now(),
        createdAt: now,
        updatedAt: now
      }
    ]);

    setOpenConfirmCreateDialog(false);
    setOpenCreateDialog(false);
    setConfirmText("");
    setNewDept({
      shortName: "",
      keyName: "",
      fullName: "",
      description: ""
    });
  };

  // ---------------- EDIT & DELETE ----------------
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedDept, setSelectedDept] = useState(null);

  const handleOpenEditDialog = (dept) => {
    setSelectedDept(dept);
    setOpenEditDialog(true);
  };

  const handleSaveEdit = () => {
    const now = new Date().toISOString().split("T")[0];

    setDepartments(prev =>
      prev.map(d => d.id === selectedDept.id ?
        { ...selectedDept, updatedAt: now } : d)
    );
    setOpenEditDialog(false);
  };

  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [deleteText, setDeleteText] = useState("");

  const openDeleteConfirm = () => {
    setOpenConfirmDelete(true);
  };

  const handleFinalDelete = () => {
    if (deleteText !== selectedDept.fullName) {
      alert("Type correct full name to delete!");
      return;
    }

    setDepartments(prev => prev.filter(d => d.id !== selectedDept.id));
    setOpenConfirmDelete(false);
    setOpenEditDialog(false);
  };

  // ---------- Pagination Data ----------
  const paginatedDepartments = departments.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const totalPages = Math.ceil(departments.length / rowsPerPage);

  return (
    <MainCard title="Departments">
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" color="success" onClick={handleOpenCreateDialog}>
          New Department
        </Button>
      </Box>

      {/* ====================== TABLE ===================== */}
      <TableContainer component={Paper} sx={{ maxHeight: 330, overflowY: 'auto' }}>
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
                <TableCell align="center">{dept.shortName}</TableCell>
                <TableCell align="center">{dept.keyName}</TableCell>
                <TableCell align="center">{dept.fullName}</TableCell>
                <TableCell align="center">{dept.createdAt}</TableCell>
                <TableCell align="center">{dept.updatedAt}</TableCell>
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


      {/* ====================== CREATE DIALOG ====================== */}
      <Dialog open={openCreateDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Department</DialogTitle>

        <DialogContent dividers>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={8}>
              <Typography fontWeight="bold">Short Name (max 30)</Typography>
              <TextField
                fullWidth
                value={newDept.shortName}
                inputProps={{ maxLength: 30 }}
                placeholder="Ex: IT"
                onChange={(e) => setNewDept({ ...newDept, shortName: e.target.value })}
              />
            </Grid>

            <Grid item xs={4}>
              <Typography fontWeight="bold" align="right">Key (max 10)</Typography>
              <TextField
                fullWidth
                value={newDept.keyName}
                inputProps={{ maxLength: 10 }}
                placeholder="Ex: INF"
                onChange={(e) => setNewDept({ ...newDept, keyName: e.target.value })}
              />
            </Grid>
          </Grid>

          <Box mt={3}>
            <Typography fontWeight="bold">Full Name (max 100)</Typography>
            <TextField
              fullWidth
              value={newDept.fullName}
              inputProps={{ maxLength: 100 }}
              placeholder="Ex: Information Technology"
              onChange={(e) => setNewDept({ ...newDept, fullName: e.target.value })}
            />
          </Box>

          <Box mt={3}>
            <Typography fontWeight="bold">Description (max 2000)</Typography>
            <TextField
              fullWidth
              multiline
              rows={5}
              value={newDept.description}
              inputProps={{ maxLength: 2000 }}
              placeholder="Enter department description..."
              onChange={(e) => setNewDept({ ...newDept, description: e.target.value })}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenCreateDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmitCreate}>
            Save
          </Button>
        </DialogActions>
      </Dialog>


      {/* CONFIRM CREATE */}
      <Dialog open={openConfirmCreateDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Confirm Create Department</DialogTitle>
        <DialogContent dividers>
          <Typography>Please type the full name:</Typography>

          <Typography fontWeight="bold" mt={1} color="blue">
            {newDept.fullName}
          </Typography>

          <TextField
            fullWidth
            placeholder="Type exactly here"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenConfirmCreateDialog(false)}>Cancel</Button>
          <Button color="success" variant="contained" onClick={handleFinalCreate}>
            Confirm Create
          </Button>
        </DialogActions>
      </Dialog>


      {/* ====================== EDIT DIALOG ====================== */}
      <Dialog open={openEditDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Department</DialogTitle>
        <DialogContent dividers>
          {selectedDept && (
            <>
              <Grid container spacing={2} mt={1}>
                <Grid item xs={8}>
                  <Typography fontWeight="bold">Short Name</Typography>
                  <TextField
                    fullWidth
                    value={selectedDept.shortName}
                    inputProps={{ maxLength: 30 }}
                    onChange={(e) => setSelectedDept({ ...selectedDept, shortName: e.target.value })}
                  />
                </Grid>

                <Grid item xs={4}>
                  <Typography fontWeight="bold" align="right">Key</Typography>
                  <TextField
                    fullWidth
                    value={selectedDept.keyName}
                    inputProps={{ maxLength: 10 }}
                    onChange={(e) => setSelectedDept({ ...selectedDept, keyName: e.target.value })}
                  />
                </Grid>
              </Grid>

              <Box mt={3}>
                <Typography fontWeight="bold">Full Name</Typography>
                <TextField
                  fullWidth
                  value={selectedDept.fullName}
                  onChange={(e) => setSelectedDept({ ...selectedDept, fullName: e.target.value })}
                />
              </Box>

              <Box mt={3}>
                <Typography fontWeight="bold">Description</Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  value={selectedDept.description}
                  onChange={(e) => setSelectedDept({ ...selectedDept, description: e.target.value })}
                />
              </Box>
            </>
          )}
        </DialogContent>

        <DialogActions>
          <Button color="error" onClick={openDeleteConfirm}>Delete</Button>
          <Button variant="contained" onClick={handleSaveEdit}>Save</Button>
          <Button onClick={() => setOpenEditDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>


      {/* DELETE CONFIRM */}
      <Dialog open={openConfirmDelete} maxWidth="sm" fullWidth>
        <DialogTitle>Confirm Delete Department</DialogTitle>

        <DialogContent dividers>
          <Typography>Type this name to delete:</Typography>

          <Typography fontWeight="bold" mt={1} color="red">
            {selectedDept?.fullName}
          </Typography>

          <TextField
            fullWidth
            placeholder="Type exactly here"
            value={deleteText}
            onChange={(e) => setDeleteText(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenConfirmDelete(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleFinalDelete}>
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>

    </MainCard>
  );
}
