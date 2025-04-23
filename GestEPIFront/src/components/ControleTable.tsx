import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Button, Typography
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { useEffect, useState } from 'react'
import { api } from '../api'
import AddControleModal from './AddControleModal'
import ControleDetailModal from './ControleDetailModal'

// ✅ Import de l'interface depuis le package partagé
import { ControleWithEpi } from 'gestepiinterfacesrgio'

const ControleTable = () => {
  const [controles, setControles] = useState<ControleWithEpi[]>([])
  const [openModal, setOpenModal] = useState(false)
  const [selectedControle, setSelectedControle] = useState<ControleWithEpi | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)

  const fetchControles = async () => {
    try {
      const res = await api.get('/controles')
      setControles(res.data)
    } catch (err) {
      console.error('Erreur fetch contrôles', err)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/controles/${id}`)
      fetchControles()
    } catch (err) {
      console.error('Erreur suppression contrôle', err)
    }
  }

  const openDetails = (controle: ControleWithEpi) => {
    setSelectedControle(controle)
    setDetailOpen(true)
  }

  useEffect(() => {
    fetchControles()
  }, [])

  return (
    <>
      <Typography variant="h5" gutterBottom>Historique des contrôles</Typography>
      <Button variant="contained" onClick={() => setOpenModal(true)} sx={{ mb: 2 }}>
        AJOUTER UN CONTRÔLE
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell>Commentaire</TableCell>
              <TableCell>Contrôleur</TableCell>
              <TableCell>EPI</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {controles.map((controle) => (
              <TableRow
                key={controle.id}
                hover
                onClick={() => openDetails(controle)}
                style={{ cursor: 'pointer' }}
              >
                <TableCell>{controle.id}</TableCell>
                <TableCell>{new Date(controle.date_controle).toLocaleDateString()}</TableCell>
                <TableCell>{controle.statut}</TableCell>
                <TableCell>{controle.commentaire}</TableCell>
                <TableCell>{controle.controleur}</TableCell>
                <TableCell>
                  {controle.epi
                    ? `${controle.epi.identifiant_custom} (${controle.epi.marque} ${controle.epi.modele})`
                    : 'EPI supprimé'}
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <IconButton onClick={() => handleDelete(controle.id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddControleModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onControleAdded={fetchControles}
      />

      <ControleDetailModal
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        controle={selectedControle}
      />
    </>
  )
}

export default ControleTable
