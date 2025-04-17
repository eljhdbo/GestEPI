import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Grid
  } from '@mui/material'
  
  import React from 'react'
  
  interface Controle {
    id: number
    date_controle: string
    statut: string
    commentaire: string
    controleur: string
    epi?: {
      identifiant_custom: string
      marque: string
      modele: string
      type?: string
      taille?: string
      couleur?: string
    }
  }
  
  interface Props {
    open: boolean
    onClose: () => void
    controle: Controle | null
  }
  
  const ControleDetailModal = ({ open, onClose, controle }: Props) => {
    if (!controle) return null
  
    const {
      id,
      date_controle,
      statut,
      commentaire,
      controleur,
      epi
    } = controle
  
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Détail du contrôle</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography><strong>ID :</strong> {id}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography><strong>Date :</strong> {new Date(date_controle).toLocaleDateString()}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography><strong>Statut :</strong> {statut}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography><strong>Contrôleur :</strong> {controleur}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography><strong>Commentaire :</strong> {commentaire || '—'}</Typography>
            </Grid>
  
            {/* Affichage de l'EPI lié */}
            {epi && (
              <>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mt: 2 }}>Informations EPI</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography><strong>Identifiant :</strong> {epi.identifiant_custom}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography><strong>Marque :</strong> {epi.marque}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography><strong>Modèle :</strong> {epi.modele}</Typography>
                </Grid>
                {epi.type && (
                  <Grid item xs={12}>
                    <Typography><strong>Type :</strong> {epi.type}</Typography>
                  </Grid>
                )}
                {epi.taille && (
                  <Grid item xs={12}>
                    <Typography><strong>Taille :</strong> {epi.taille}</Typography>
                  </Grid>
                )}
                {epi.couleur && (
                  <Grid item xs={12}>
                    <Typography><strong>Couleur :</strong> {epi.couleur}</Typography>
                  </Grid>
                )}
              </>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Fermer</Button>
        </DialogActions>
      </Dialog>
    )
  }
  
  export default ControleDetailModal
  