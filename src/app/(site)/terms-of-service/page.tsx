'use client'
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Button,
} from '@mui/material'
import {
  Gavel,
  LocalShipping,
  Security,
  Help,
  ContactSupport,
  Description,
  ExpandMore,
  CheckCircle,
  Warning,
  ContactMail,
  PrivacyTip,
} from '@mui/icons-material'
import Link from 'next/link'
import BaseCard from '@/shared/components/base-card/base-card'
import Alert from '@mui/material/Alert'
import Phone from '@mui/icons-material/Phone'

const TermsOfService = () => {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <Box textAlign="center" mb={6}>
        <Chip
          icon={<Gavel />}
          label="Legal Terms"
          color="primary"
          sx={{ mb: 2, px: 2, py: 1, fontSize: '1rem', fontWeight: 600 }}
        />
        <Typography variant="h2" component="h1" fontWeight={700} gutterBottom>
          Terms of Service
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Please read these terms carefully before using our services
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Last updated:{' '}
          {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Typography>
      </Box>

      <Alert severity="info" sx={{ mb: 4, borderRadius: 2 }}>
        <Typography fontWeight={600}>
          By accessing or using TechDevices services, you agree to be bound by
          these terms. If you disagree with any part, you may not access our
          services.
        </Typography>
      </Alert>

      <Grid container spacing={4} mb={6}>
        <Grid size={{ xs: 12, md: 4 }}>
          <BaseCard>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Gavel sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />
              <Typography variant="h5" gutterBottom fontWeight={600}>
                Service Terms
              </Typography>
              <Typography color="text.secondary">
                Our commitment to providing quality services and your
                responsibilities as a user
              </Typography>
            </CardContent>
          </BaseCard>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <BaseCard>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <LocalShipping sx={{ fontSize: 60, color: '#2e7d32', mb: 2 }} />
              <Typography variant="h5" gutterBottom fontWeight={600}>
                Delivery Terms
              </Typography>
              <Typography color="text.secondary">
                Information about shipping, delivery times, and responsibility
              </Typography>
            </CardContent>
          </BaseCard>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <BaseCard>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Security sx={{ fontSize: 60, color: '#ed6c02', mb: 2 }} />
              <Typography variant="h5" gutterBottom fontWeight={600}>
                Privacy & Security
              </Typography>
              <Typography color="text.secondary">
                How we protect your data and your privacy rights
              </Typography>
            </CardContent>
          </BaseCard>
        </Grid>
      </Grid>

      <Box mb={6}>
        <Typography variant="h4" gutterBottom fontWeight={600} mb={4}>
          Terms Overview
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <BaseCard>
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  color="success.main"
                  fontWeight={600}
                >
                  <CheckCircle sx={{ verticalAlign: 'middle', mr: 1 }} />
                  User Rights
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Right to quality products"
                      secondary="All products meet manufacturer specifications"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Right to warranty support"
                      secondary="24-month warranty on all devices"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Right to return"
                      secondary="14-day return policy for unused items"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Right to data protection"
                      secondary="Your personal information is securely stored"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </BaseCard>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <BaseCard>
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  color="error.main"
                  fontWeight={600}
                >
                  <Warning sx={{ verticalAlign: 'middle', mr: 1 }} />
                  User Responsibilities
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Warning color="error" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Provide accurate information"
                      secondary="Ensure all details are correct when ordering"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Warning color="error" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Proper product use"
                      secondary="Follow manufacturer guidelines for use"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Warning color="error" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Account security"
                      secondary="Keep your login credentials secure"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Warning color="error" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Compliance with laws"
                      secondary="Use services in accordance with applicable laws"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </BaseCard>
          </Grid>
        </Grid>
      </Box>

      <Box mb={6}>
        <Typography variant="h4" gutterBottom fontWeight={600} mb={3}>
          Detailed Terms & Conditions
        </Typography>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Gavel sx={{ mr: 2, color: 'primary.main' }} />
              <Typography fontWeight={600}>Service Terms</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              By using TechDevices services, you agree to comply with all
              applicable laws and regulations. You are responsible for
              maintaining the confidentiality of your account and password.
            </Typography>
            <Typography paragraph>
              We reserve the right to refuse service to anyone for any reason at
              any time. You understand that your content may be transferred
              unencrypted and involve transmissions over various networks.
            </Typography>
            <Typography>
              Prices for our products are subject to change without notice. We
              reserve the right to discontinue any product at any time.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocalShipping sx={{ mr: 2, color: 'primary.main' }} />
              <Typography fontWeight={600}>Delivery Terms</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              Delivery times are estimates and are not guaranteed. We are not
              responsible for delays caused by carriers, weather conditions, or
              other unforeseen circumstances.
            </Typography>
            <Typography paragraph>
              Risk of loss and title for items pass to you upon our delivery to
              the carrier. You are responsible for filing any claims with
              carriers for damaged or lost shipments.
            </Typography>
            <Typography>
              Free shipping offers apply to standard shipping only and may
              exclude certain products or locations. Additional charges may
              apply for expedited shipping or special handling.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Security sx={{ mr: 2, color: 'primary.main' }} />
              <Typography fontWeight={600}>
                Privacy & Data Protection
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              We collect personal information that you provide to us such as
              name, address, contact information, passwords and security data,
              and payment information.
            </Typography>
            <Typography paragraph>
              We use your information to provide and improve our services,
              process your transactions, and communicate with you. We do not
              sell your personal information to third parties.
            </Typography>
            <Typography>
              We implement security measures designed to protect your
              information from unauthorized access. However, we cannot guarantee
              that unauthorized access, hacking, data loss, or other breaches
              will never occur.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PrivacyTip sx={{ mr: 2, color: 'primary.main' }} />
              <Typography fontWeight={600}>Return & Refund Policy</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              You have 14 calendar days to return an item from the date you
              received it. To be eligible for a return, your item must be unused
              and in the same condition that you received it.
            </Typography>
            <Typography paragraph>
              Once your return is received and inspected, we will send you an
              email to notify you that we have received your returned item. We
              will also notify you of the approval or rejection of your refund.
            </Typography>
            <Typography>
              If approved, your refund will be processed, and a credit will
              automatically be applied to your original method of payment within
              7-10 business days.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>

      <Box mb={6}>
        <Typography variant="h4" gutterBottom fontWeight={600} mb={4}>
          Important Information
        </Typography>
        <Grid container spacing={3}>
          {[
            {
              icon: <Help color="primary" />,
              title: 'Questions',
              description:
                'If you have any questions about these Terms, please contact us.',
            },
            {
              icon: <Warning color="primary" />,
              title: 'Updates',
              description:
                'We may update these terms periodically. Check this page for changes.',
            },
            {
              icon: <ContactSupport color="primary" />,
              title: 'Support',
              description:
                'Our support team is available to help with any concerns.',
            },
            {
              icon: <Description color="primary" />,
              title: 'Documents',
              description:
                'Access all legal documents in our documentation center.',
            },
          ].map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <BaseCard>
                <Box sx={{ fontSize: 40, mb: 2 }}>{item.icon}</Box>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  {item.title}
                </Typography>
                <Typography color="text.secondary">
                  {item.description}
                </Typography>
              </BaseCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      <BaseCard>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom fontWeight={600}>
            Need Help Understanding Our Terms?
          </Typography>
          <Grid container spacing={4} mt={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box display="flex" alignItems="center">
                <ContactMail sx={{ mr: 2, color: 'primary.main' }} />
                <div>
                  <Typography variant="body2" color="text.secondary">
                    Email Support
                  </Typography>
                  <Typography variant="h6">legal@techdevices.ua</Typography>
                </div>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box display="flex" alignItems="center">
                <Phone sx={{ mr: 2, color: 'primary.main' }} />
                <div>
                  <Typography variant="body2" color="text.secondary">
                    Legal Department
                  </Typography>
                  <Typography variant="h6">+38 (098) 111 11 11</Typography>
                </div>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </BaseCard>

      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        gap={2}
        justifyContent="center"
        my={6}
      >
        <Button
          variant="contained"
          size="large"
          startIcon={<Description />}
          component={Link}
          href="/documents/terms.pdf"
          sx={{ px: 4, py: 1.5 }}
        >
          Download Full Terms (PDF)
        </Button>
        <Button
          variant="outlined"
          size="large"
          startIcon={<ContactMail />}
          component={Link}
          href="/contact"
          sx={{ px: 4, py: 1.5 }}
        >
          Contact Legal Department
        </Button>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box>
        <Typography variant="body2" color="text.secondary" align="center">
          * These terms govern your use of TechDevices website and services. By
          using our services, you agree to these terms.
          <br />
          ** We reserve the right to modify these terms at any time. Changes
          will be effective immediately upon posting to the website.
          <br />
          *** If any provision of these terms is held to be invalid or
          unenforceable, that provision will be enforced to the maximum extent
          possible.
          <br />
          <br />© {new Date().getFullYear()} TechDevices. All rights reserved.
        </Typography>
      </Box>
    </Container>
  )
}

export default TermsOfService
