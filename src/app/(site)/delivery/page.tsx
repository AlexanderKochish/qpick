'use client'
import React from 'react'
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'
import {
  LocalShipping,
  FlashOn,
  Store,
  Place,
  ExpandMore,
  CheckCircle,
  AccessTime,
  Payment,
  Phone,
  Email,
  Map,
  Inventory,
  DoneAll,
} from '@mui/icons-material'
import Link from 'next/link'

export default function DeliveryPage() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <Box textAlign="center" mb={6}>
        <Chip
          icon={<LocalShipping />}
          label="Fast delivery"
          color="primary"
          sx={{ mb: 2, px: 2, py: 1, fontSize: '1rem' }}
        />
        <Typography variant="h2" component="h1" fontWeight={700} gutterBottom>
          Delivery and Pickup
        </Typography>
        <Typography variant="h5" color="text.secondary" component="p">
          Fast and reliable gadget delivery throughout Ukraine
        </Typography>
      </Box>

      <Alert
        severity="info"
        sx={{
          mb: 4,
          borderRadius: 2,
          '& .MuiAlert-icon': { alignItems: 'center' },
        }}
      >
        <Typography fontWeight={600} component="p">
          🚚 Free delivery for orders over 10,000 UAH
          <br />⚡ Express delivery on the day of order in Kyiv and SPb
        </Typography>
      </Alert>

      <Box mb={6}>
        <Typography variant="h4" gutterBottom fontWeight={600} mb={4}>
          Delivery Methods
        </Typography>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%', borderTop: '4px solid #1976d2' }}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <LocalShipping sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />
                <Typography variant="h5" gutterBottom fontWeight={600}>
                  Courier Delivery
                </Typography>
                <Typography color="text.secondary" component="p">
                  Door-to-door delivery at your convenient time
                </Typography>
                <Chip
                  label="1-3 days"
                  color="primary"
                  variant="outlined"
                  sx={{ mt: 1 }}
                />
                <List dense sx={{ mt: 2, textAlign: 'left' }}>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircle color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Free for orders over 10,000 ₴" />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircle color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Order tracking" />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircle color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Fitting and inspection" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%', borderTop: '4px solid #ed6c02' }}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <FlashOn sx={{ fontSize: 60, color: '#ed6c02', mb: 2 }} />
                <Typography variant="h5" gutterBottom fontWeight={600}>
                  Express Delivery
                </Typography>
                <Typography color="text.secondary" component="p">
                  Same-day delivery within the city
                </Typography>
                <Chip
                  label="2-5 hours"
                  color="warning"
                  variant="outlined"
                  sx={{ mt: 1 }}
                />
                <List dense sx={{ mt: 2, textAlign: 'left' }}>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircle color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Same day delivery" />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircle color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Exact arrival time" />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircle color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Available 24/7" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%', borderTop: '4px solid #2e7d32' }}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Store sx={{ fontSize: 60, color: '#2e7d32', mb: 2 }} />
                <Typography variant="h5" gutterBottom fontWeight={600}>
                  Store Pickup
                </Typography>
                <Typography color="text.secondary" component="p">
                  Pick up your order from our store
                </Typography>
                <Chip
                  label="1-2 hours"
                  color="success"
                  variant="outlined"
                  sx={{ mt: 1 }}
                />
                <List dense sx={{ mt: 2, textAlign: 'left' }}>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircle color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Free" />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircle color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Consultation with a specialist" />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircle color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Instant pickup" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box mb={6}>
        <Typography variant="h4" gutterBottom fontWeight={600} mb={3}>
          Delivery Costs
        </Typography>
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'action.hover' }}>
                <TableCell>
                  <Typography fontWeight={600}>City</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={600}>Standard</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={600}>Express</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={600}>Timeline</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Kyiv</TableCell>
                <TableCell>Free*</TableCell>
                <TableCell>300 UAH</TableCell>
                <TableCell>1-2 days / 2-5 hours</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Kharkiv</TableCell>
                <TableCell>Free*</TableCell>
                <TableCell>400 UAH</TableCell>
                <TableCell>1-3 days / 3-6 hours</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Million-plus cities</TableCell>
                <TableCell>150 UAH</TableCell>
                <TableCell>200 UAH</TableCell>
                <TableCell>2-4 days</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Other cities</TableCell>
                <TableCell>100 UAH</TableCell>
                <TableCell>200 UAH</TableCell>
                <TableCell>3-7 days</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 1, display: 'block' }}
        >
          * Free delivery for orders over 10,000 UAH
        </Typography>
      </Box>

      <Card sx={{ mb: 6 }}>
        <CardContent sx={{ p: 4 }}>
          <Grid container alignItems="center" spacing={2} mb={3}>
            <Grid>
              <Place color="primary" sx={{ fontSize: 40 }} />
            </Grid>
            <Grid>
              <Typography variant="h5" fontWeight={600}>
                Pickup Points
              </Typography>
              <Typography color="text.secondary">
                150+ pickup points across Ukraine
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Kyiv
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Place color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Shevchenko St., 10"
                    secondary="Daily 10:00-22:00"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Place color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Shevchenko Ave., 25"
                    secondary="Daily 9:00-21:00"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Place color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary='"Gulliver" Shopping Center'
                    secondary="10:00-23:00, 7 days a week"
                  />
                </ListItem>
              </List>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Saint Petersburg
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Place color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Shevchenko Ave., 60"
                    secondary="Daily 10:00-22:00"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Place color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary='"Gulliver" Shopping Center'
                    secondary="10:00-23:00, 7 days a week"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Place color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Shevchenko St., 12"
                    secondary="Mon-Fri 9:00-21:00, Sat-Sun 10:00-20:00"
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>

          <Button
            variant="outlined"
            startIcon={<Map />}
            sx={{ mt: 3 }}
            component={Link}
            href="/pickup-points"
          >
            View all points on map
          </Button>
        </CardContent>
      </Card>

      <Box mb={6}>
        <Typography variant="h4" gutterBottom fontWeight={600} mb={3}>
          Frequently Asked Questions about Delivery
        </Typography>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography fontWeight={600}>How to track my order?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              After shipping your order, a tracking number will be sent to your
              email and SMS. You can track the delivery status in your personal
              account or on the carrier&apos;s website.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography fontWeight={600}>
              Can I change the delivery address after placing an order?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Yes, you can change the delivery address before the order is
              shipped from the warehouse. To do this, contact our manager by
              phone 8 (800) 555-35-35 or via online chat.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography fontWeight={600}>
              What if I&apos;m not at home during delivery?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              The courier will contact you 1-2 hours before arrival. If you are
              not available, the delivery will be rescheduled to a convenient
              time. Or you can pick up the order at the nearest pickup point.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography fontWeight={600}>
              Do I need to pay for delivery when returning?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              When returning a product of proper quality, delivery is paid by
              the buyer. When returning under warranty or due to defects -
              delivery is paid by the store.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>

      <Box mb={6}>
        <Typography variant="h4" gutterBottom fontWeight={600} mb={4}>
          How to Place an Order
        </Typography>
        <Grid container spacing={3}>
          {[
            {
              icon: <Inventory color="primary" />,
              title: 'Choose a product',
              description: 'Add desired gadgets to your cart',
            },
            {
              icon: <Payment color="primary" />,
              title: 'Place an order',
              description: 'Fill in details and choose delivery method',
            },
            {
              icon: <DoneAll color="primary" />,
              title: 'Confirmation',
              description: 'Our manager will contact you for confirmation',
            },
            {
              icon: <LocalShipping color="primary" />,
              title: 'Receive order',
              description: 'Delivery or pickup at a convenient time',
            },
          ].map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card sx={{ textAlign: 'center', p: 3, height: '100%' }}>
                <Box sx={{ fontSize: 40, mb: 2 }}>{item.icon}</Box>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  {item.title}
                </Typography>
                <Typography color="text.secondary">
                  {item.description}
                </Typography>
                <Box
                  sx={{
                    mt: 2,
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                    fontWeight: 'bold',
                  }}
                >
                  {index + 1}
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Card sx={{ bgcolor: 'grey.50', mb: 6 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom fontWeight={600}>
            Need help with delivery?
          </Typography>
          <Grid container spacing={4} mt={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box display="flex" alignItems="center">
                <Phone sx={{ mr: 2, color: 'primary.main' }} />
                <div>
                  <Typography variant="body2" color="text.secondary">
                    Hotline
                  </Typography>
                  <Typography variant="h6">8 (800) 555-35-35</Typography>
                </div>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box display="flex" alignItems="center">
                <Email sx={{ mr: 2, color: 'primary.main' }} />
                <div>
                  <Typography variant="body2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="h6">delivery@techdevices.ua</Typography>
                </div>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box display="flex" alignItems="center">
                <AccessTime sx={{ mr: 2, color: 'primary.main' }} />
                <div>
                  <Typography variant="body2" color="text.secondary">
                    Working hours
                  </Typography>
                  <Typography variant="h6">24/7 around the clock</Typography>
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
        mb={6}
      >
        <Button
          variant="contained"
          size="large"
          startIcon={<LocalShipping />}
          component={Link}
          href="/cart"
          sx={{ px: 4, py: 1.5 }}
        >
          Proceed to checkout
        </Button>
        <Button
          variant="outlined"
          size="large"
          startIcon={<Phone />}
          component={Link}
          href="/contact"
          sx={{ px: 4, py: 1.5 }}
        >
          Ask a question about delivery
        </Button>
      </Box>

      <Box pt={4} borderTop={1} borderColor="divider">
        <Typography variant="body2" color="text.secondary" align="center">
          * Delivery times are approximate and may change depending on carrier
          workload and weather conditions.
          <br />
          ** For orders under 10,000 ₴, delivery cost is calculated
          automatically during checkout.
          <br />
          *** Express delivery is not available in all regions. Check
          availability when placing an order.
          <br />© {new Date().getFullYear()} TechDevices. All rights reserved.
        </Typography>
      </Box>
    </Container>
  )
}
