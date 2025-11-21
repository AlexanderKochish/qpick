import { AppBar, Tab, Tabs } from '@mui/material'
import React from 'react'
import s from './product-details-tabs.module.css'

interface Props {
  activeTab: number
  setActiveTab: (value: number) => void
}

const ProductDetailsTabs = ({ activeTab, setActiveTab }: Props) => {
  return (
    <AppBar position="static" className={s.tabsAppBar}>
      <Tabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
        className={s.tabs}
      >
        <Tab label="Описание" />
        <Tab label="Характеристики" />
        <Tab label="Отзывы и оценки" />
        <Tab label="Вопросы и ответы" />
      </Tabs>
    </AppBar>
  )
}

export default ProductDetailsTabs
