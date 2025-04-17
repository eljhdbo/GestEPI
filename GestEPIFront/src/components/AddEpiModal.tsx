import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, Grid
  } from '@mui/material'
  import { useState } from 'react'
  import { api } from '../api'
  
  interface Props {
    open: boolean
    onClose: () => void
    onEpiAdded: () => void
  }
  
  const AddEpiModal = ({ open, onClose, onEpiAdded }: Props) => {
    const [formData, setFormData] = useState({
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
    })
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }
  
    const handleSubmit = async () => {
      try {
        await api.post('/epi', formData)
        onEpiAdded()
        onClose()
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
        })
      } catch (err) {
        console.error("Erreur lors de l'ajout", err)
      }
    }
  
    return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>Ajouter un EPI</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {Object.entries(formData).map(([key, value]) => (
              <Grid item xs={6} key={key}>
                <TextField
                  fullWidth
                  label={key.replaceAll('_', ' ')}
                  name={key}
                  value={value}
                  onChange={handleChange}
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Annuler</Button>
          <Button variant="contained" onClick={handleSubmit}>Ajouter</Button>
        </DialogActions>
      </Dialog>
    )
  }
  
  export default AddEpiModal
  