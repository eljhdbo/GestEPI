import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Epi } from '../../../GestEPIInterfaces/dist/index';
import {
  Button, Container, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, IconButton
} from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';

const EpiPage = () => {
  const [epis, setEpis] = useState<Epi[]>([]);
  const [open, setOpen] = useState(false);
  const [editingEpi, setEditingEpi] = useState<Epi | null>(null);
  const [formData, setFormData] = useState<Omit<Epi, 'id'>>({
    identifiant_custom: '',
    marque: '',
    modele: '',
    numero_serie: '',
    taille: '',
    couleur: '',
    type_epi: '',
    periodicite_controle: '',
    date_achat: '',
    date_fabrication: '',
    date_mise_service: ''
  });

  useEffect(() => {
    fetchEpis();
  }, []);

  const fetchEpis = async () => {
    const res = await axios.get('http://localhost:3002/api/epi');
    setEpis(res.data);
  };

  const handleOpen = (epi?: Epi) => {
    if (epi) {
      setEditingEpi(epi);
      const { id, ...data } = epi;
      setFormData(data);
    } else {
      setEditingEpi(null);
      setFormData({
        identifiant_custom: '',
        marque: '',
        modele: '',
        numero_serie: '',
        taille: '',
        couleur: '',
        type_epi: '',
        periodicite_controle: '',
        date_achat: '',
        date_fabrication: '',
        date_mise_service: ''
      });
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (editingEpi) {
      await axios.put(`http://localhost:3002/api/epi/${editingEpi.id}`, formData);
    } else {
      await axios.post('http://localhost:3002/api/epi', formData);
    }
    handleClose();
    fetchEpis();
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:3002/api/epi/${id}`);
    fetchEpis();
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Gestion des EPI
      </Typography>
      <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()}>
        Ajouter un EPI
      </Button>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Identifiant</TableCell>
              <TableCell>Marque</TableCell>
              <TableCell>Modèle</TableCell>
              <TableCell>N° Série</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Taille</TableCell>
              <TableCell>Couleur</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {epis.map((epi) => (
              <TableRow key={epi.id}>
                <TableCell>{epi.id}</TableCell>
                <TableCell>{epi.identifiant_custom}</TableCell>
                <TableCell>{epi.marque}</TableCell>
                <TableCell>{epi.modele}</TableCell>
                <TableCell>{epi.numero_serie}</TableCell>
                <TableCell>{epi.type_epi}</TableCell>
                <TableCell>{epi.taille}</TableCell>
                <TableCell>{epi.couleur}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(epi)}><Edit /></IconButton>
                  <IconButton onClick={() => handleDelete(epi.id)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editingEpi ? 'Modifier un EPI' : 'Ajouter un EPI'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {Object.keys(formData).map((key) => (
            <TextField
              key={key}
              label={key.replace(/_/g, ' ')}
              name={key}
              value={(formData as any)[key] || ''}
              onChange={handleChange}
              fullWidth
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {editingEpi ? 'Modifier' : 'Ajouter'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EpiPage;
