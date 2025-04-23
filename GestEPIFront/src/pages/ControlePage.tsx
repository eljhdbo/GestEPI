import React from 'react'
import { Container, Typography } from '@mui/material'
import ControleTable from '../components/ControleTable'

const ControlePage = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Gestion des Contrôles
      </Typography>
      <ControleTable />
    </Container>
  )
}

export default ControlePage
