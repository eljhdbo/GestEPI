import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, MenuItem, Grid
  } from '@mui/material'
  import { useEffect, useState } from 'react'
  import { api } from '../api'
  
  interface Props {
    open: boolean
    onClose: () => void
    onControleAdded: () => void
  }
  
  interface EpiOption {
    id: number
    identifiant_custom: string
  }
  
  const AddControleModal = ({ open, onClose, onControleAdded }: Props) => {
    const [epis, setEpis] = useState<EpiOption[]>([])
    const [form, setForm] = useState({
      epi_id: '',
      date_controle: '',
      statut: '',
      commentaire: '',
      controleur: ''
    })
  
    useEffect(() => {
      const fetchEpiOptions = async () => {
        const res = await api.get('/epi')
        setEpis(res.data)
      }
      fetchEpiOptions()
    }, [])
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [e.target.name]: e.target.value })
    }
  
    const handleSubmit = async () => {
      try {
        await api.post('/controles', {
          ...form,
          epi_id: parseInt(form.epi_id)
        })
        onControleAdded()
        onClose()
        setForm({ epi_id: '', date_controle: '', statut: '', commentaire: '', controleur: '' })
      } catch (err) {
        console.error("Erreur ajout contrôle", err)
      }
    }
  
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Ajouter un contrôle</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="EPI"
                name="epi_id"
                value={form.epi_id}
                onChange={handleChange}
              >
                {epis.map((epi) => (
                  <MenuItem key={epi.id} value={epi.id}>
                    {epi.identifiant_custom}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
  
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="date_controle"
                label="Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={form.date_controle}
                onChange={handleChange}
              />
            </Grid>
  
            <Grid item xs={6}>
              <TextField
                fullWidth
                select
                name="statut"
                label="Statut"
                value={form.statut}
                onChange={handleChange}
              >
                <MenuItem value="Conforme">Conforme</MenuItem>
                <MenuItem value="À réparer">À réparer</MenuItem>
                <MenuItem value="À mettre au rebut">À mettre au rebut</MenuItem>
              </TextField>
            </Grid>
  
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contrôleur"
                name="controleur"
                value={form.controleur}
                onChange={handleChange}
              />
            </Grid>
  
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                label="Commentaire"
                name="commentaire"
                value={form.commentaire}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Annuler</Button>
          <Button variant="contained" onClick={handleSubmit}>Ajouter</Button>
        </DialogActions>
      </Dialog>
    )
  }
  
  export default AddControleModal
  