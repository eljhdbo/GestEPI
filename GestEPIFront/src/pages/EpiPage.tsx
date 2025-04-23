import React from 'react'
import { Container, Typography } from '@mui/material'
import EpiTable from '../components/EpiTable'

const EpiPage = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Gestion des EPI
      </Typography>
      <EpiTable />
    </Container>
  )
}

export default EpiPage
