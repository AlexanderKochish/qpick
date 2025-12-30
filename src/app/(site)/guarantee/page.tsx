'use client'
import React from 'react'
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Grid,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
} from '@mui/material'
import {
  Security,
  Build,
  LocalShipping,
  VerifiedUser,
  ExpandMore,
  CheckCircle,
  Warning,
  Phone,
  Email,
  AccessTime,
  Description,
} from '@mui/icons-material'
import Link from 'next/link'

export default function GuaranteePage() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <Box textAlign="center" mb={6}>
        <Chip
          icon={<VerifiedUser />}
          label="Official warranty"
          color="primary"
          sx={{ mb: 2, px: 2, py: 1, fontSize: '1rem' }}
        />
        <Typography variant="h2" component="h1" fontWeight={700} gutterBottom>
          Warranty and Service
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          We guarantee the quality of every purchase and provide full support
        </Typography>
      </Box>

      <Grid container spacing={4} mb={6}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: '100%', borderTop: '4px solid #1976d2' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Security sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />
              <Typography variant="h5" gutterBottom fontWeight={600}>
                24 months warranty
              </Typography>
              <Typography color="text.secondary">
                All devices come with an official manufacturer warranty for 2
                years
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: '100%', borderTop: '4px solid #2e7d32' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Build sx={{ fontSize: 60, color: '#2e7d32', mb: 2 }} />
              <Typography variant="h5" gutterBottom fontWeight={600}>
                Authorized service
              </Typography>
              <Typography color="text.secondary">
                Service is provided at official manufacturer service centers
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: '100%', borderTop: '4px solid #ed6c02' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <LocalShipping sx={{ fontSize: 60, color: '#ed6c02', mb: 2 }} />
              <Typography variant="h5" gutterBottom fontWeight={600}>
                Free repair
              </Typography>
              <Typography color="text.secondary">
                In case of a warranty claim, repair is performed free of charge
                within 14 days
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Alert severity="info" sx={{ mb: 4, borderRadius: 2 }}>
        <Typography fontWeight={600}>
          Warranty is activated automatically upon purchase. Keep your receipt
          and warranty card!
        </Typography>
      </Alert>

      <Box mb={6}>
        <Typography variant="h4" gutterBottom fontWeight={600}>
          What does the warranty cover?
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom color="success.main">
                  <CheckCircle sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Warranty cases
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="success" />
                    </ListItemIcon>
                    <ListItemText primary="Manufacturing defects" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="success" />
                    </ListItemIcon>
                    <ListItemText primary="Component failure" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="success" />
                    </ListItemIcon>
                    <ListItemText primary="Software malfunctions" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="success" />
                    </ListItemIcon>
                    <ListItemText primary="Battery issues" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom color="error.main">
                  <Warning sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Non-warranty cases
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Warning color="error" />
                    </ListItemIcon>
                    <ListItemText primary="Mechanical damage" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Warning color="error" />
                    </ListItemIcon>
                    <ListItemText primary="Liquid damage" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Warning color="error" />
                    </ListItemIcon>
                    <ListItemText primary="Improper use" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Warning color="error" />
                    </ListItemIcon>
                    <ListItemText primary="Unauthorized modifications" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box mb={6}>
        <Typography variant="h4" gutterBottom fontWeight={600} mb={3}>
          Frequently Asked Questions
        </Typography>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography fontWeight={600}>
              How is the warranty activated?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Warranty is activated automatically upon purchase. To confirm, you
              need to provide a receipt or warranty card. The warranty start
              date is the purchase date.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography fontWeight={600}>
              What to do if the device breaks down?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              1. Contact us by phone or via online chat
              <br />
              2. Provide purchase details and problem description
              <br />
              3. Send the device to the service center (free courier pickup)
              <br />
              4. Receive the repaired device within 14 days
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography fontWeight={600}>Can I extend the warranty?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Yes, you can extend the warranty for an additional year. The
              extension cost is 10% of the product price. Contact our service
              center to arrange extended warranty.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography fontWeight={600}>
              Does the warranty cover accessories?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Original accessories (chargers, headphones, cases) come with a
              12-month warranty. Non-original accessories have a 6-month
              warranty.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>

      <Box mb={6}>
        <Typography variant="h4" gutterBottom fontWeight={600}>
          Warranty Repair Process
        </Typography>
        <Grid container spacing={3} mt={2}>
          {[
            {
              step: 1,
              title: 'Application',
              description: 'Submit an application online or by phone',
            },
            {
              step: 2,
              title: 'Diagnostics',
              description: 'Free diagnostics within 1-2 days',
            },
            {
              step: 3,
              title: 'Repair',
              description: 'Free repair within 14 days',
            },
            {
              step: 4,
              title: 'Return',
              description: 'Delivery of the repaired device',
            },
          ].map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item.step}>
              <Card
                sx={{
                  textAlign: 'center',
                  p: 3,
                  minHeight: '100%',
                  position: 'relative',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 15,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                  }}
                >
                  {item.step}
                </Box>
                <Typography variant="h6" mt={5} mb={2} fontWeight={600}>
                  {item.title}
                </Typography>
                <Typography color="text.secondary">
                  {item.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Card
        sx={{ mb: 6, bgcolor: 'primary.light', color: 'primary.contrastText' }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom fontWeight={600}>
            Service Center Contacts
          </Typography>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <Phone sx={{ mr: 2 }} />
                <div>
                  <Typography variant="body2">Phone</Typography>
                  <Typography variant="h6">8 (800) 555-35-35</Typography>
                </div>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <Email sx={{ mr: 2 }} />
                <div>
                  <Typography variant="body2">Email</Typography>
                  <Typography variant="h6">service@techdevices.ua</Typography>
                </div>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <AccessTime sx={{ mr: 2 }} />
                <div>
                  <Typography variant="body2">Working hours</Typography>
                  <Typography variant="h6">Mon-Fri: 9:00-20:00</Typography>
                </div>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        gap={2}
        justifyContent="center"
      >
        <Button
          variant="contained"
          size="large"
          startIcon={<Description />}
          component={Link}
          href="/documents/warranty-terms.pdf"
          sx={{ px: 4, py: 1.5 }}
        >
          Download warranty terms (PDF)
        </Button>
        <Button
          variant="outlined"
          size="large"
          startIcon={<Phone />}
          component={Link}
          href="/contact"
          sx={{ px: 4, py: 1.5 }}
        >
          Contact support
        </Button>
      </Box>

      <Box mt={6} pt={4} borderTop={1} borderColor="divider">
        <Typography variant="body2" color="text.secondary" align="center">
          * Warranty terms may differ for different manufacturers. Check details
          when purchasing.
          <br />
          ** Repair times are approximate and may vary depending on case
          complexity and spare parts availability.
          <br />© {new Date().getFullYear()} TechDevices. All rights reserved.
        </Typography>
      </Box>
    </Container>
  )
}
