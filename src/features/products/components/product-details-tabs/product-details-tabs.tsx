import { AppBar, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import s from './product-details-tabs.module.css'
import {
  Build,
  Description,
  QuestionAnswer,
  Reviews,
} from '@mui/icons-material'

interface Props {
  activeTab: number
  setActiveTab: (value: number) => void
}

const ProductDetailsTabs = ({ activeTab, setActiveTab }: Props) => {
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <AppBar position="static" className={s.tabsAppBar}>
      <Tabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
        className={s.tabs}
      >
        <Tab
          icon={<Description />}
          iconPosition="start"
          label={isSmall ? null : 'Description'}
        />
        <Tab
          icon={<Build />}
          iconPosition="start"
          label={isSmall ? null : 'Characteristics'}
        />
        <Tab
          icon={<Reviews />}
          iconPosition="start"
          label={isSmall ? null : 'Reviews and ratings'}
        />
        <Tab
          icon={<QuestionAnswer />}
          iconPosition="start"
          label={isSmall ? null : 'Frequently asked questions'}
        />
      </Tabs>
    </AppBar>
  )
}

export default ProductDetailsTabs
