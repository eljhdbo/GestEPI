import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, IconButton, Typography, Button
  } from '@mui/material'
  import DeleteIcon from '@mui/icons-material/Delete'
  import AddIcon from '@mui/icons-material/Add'
  import { useEffect, useState } from 'react'
  import { api } from '../api'
  import AddEpiModal from './AddEpiModal'
  
  interface Epi {
    id: number
    identifiant_custom: string
    marque: string
    modele: string
    numero_serie: string
    taille?: string
    couleur?: string
    type_epi?: string
    periodicite_controle?: string
    date_achat?: string
    date_fabrication?: string
    date_mise_service?: string
  }
  
  const EpiTable = () => {
    const [epis, setEpis] = useState<Epi[]>([])
    const [openModal, setOpenModal] = useState(false)
  
    const fetchEpis = async () => {
      try {
        const res = await api.get('/epi')
        setEpis(res.data)
      } catch (err) {
        console.error("Erreur récupération des EPI", err)
      }
    }
  
    const deleteEpi = async (id: number) => {
      try {
        await api.delete(`/epi/${id}`)
        setEpis(prev => prev.filter(epi => epi.id !== id))
      } catch (err) {
        console.error("Erreur suppression EPI", err)
      }
    }
  
    useEffect(() => {
      fetchEpis()
    }, [])
  
    return (
      <>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Liste des équipements
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenModal(true)}
          sx={{ mb: 2 }}
        >
          Ajouter un EPI
        </Button>
  
        <AddEpiModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onEpiAdded={fetchEpis}
        />
  
        <TableContainer component={Paper}>
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
                    <IconButton color="error" onClick={() => deleteEpi(epi.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    )
  }
  
  export default EpiTable
  