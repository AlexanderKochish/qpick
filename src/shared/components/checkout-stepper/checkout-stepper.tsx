import React from 'react'
import { Step, StepLabel, Stepper } from '@mui/material'

const steps = ['Cart', 'Order', 'Payment']

interface Props {
  activeStep: number
}

const CheckoutStepper = ({ activeStep }: Props) => {
  return (
    <Stepper activeStep={activeStep} sx={{ mt: 3 }}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  )
}

export default CheckoutStepper
