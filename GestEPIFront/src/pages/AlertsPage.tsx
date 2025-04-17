import { useEffect, useState } from 'react'
import { Typography, Paper, List, ListItem, ListItemText, Divider } from '@mui/material'
import { api } from '../api'

interface Controle {
  id: number
  date_controle: string
  statut: string
  commentaire: string
  controleur: string
  identifiant_custom: string
  marque: string
  modele: string
}

const AlertsPage = () => {
  const [controles, setControles] = useState<Controle[]>([])

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await api.get('/controles/alerts')
        setControles(res.data)
      } catch (err) {
        console.error("Erreur lors de la récupération des alertes", err)
      }
    }

    fetchAlerts()
  }, [])

  return (
    <Paper sx={{ padding: 3, margin: 2 }}>
      <Typography variant="h5" gutterBottom>📅 Contrôles à venir (30 jours)</Typography>

      {controles.length === 0 ? (
        <Typography>Aucun contrôle prévu dans les 30 prochains jours.</Typography>
      ) : (
        <List>
          {controles.map((controle) => (
            <div key={controle.id}>
              <ListItem>
                <ListItemText
                  primary={`EPI : ${controle.identifiant_custom} (${controle.marque} ${controle.modele})`}
                  secondary={
                    <>
                      <div>Date : {new Date(controle.date_controle).toLocaleDateString()}</div>
                      <div>Contrôleur : {controle.controleur}</div>
                      <div>Statut : {controle.statut}</div>
                      {controle.commentaire && <div>Commentaire : {controle.commentaire}</div>}
                    </>
                  }
                />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      )}
    </Paper>
  )
}

export default AlertsPage
