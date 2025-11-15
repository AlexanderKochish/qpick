import {
  CloudinaryUploadWidgetInstanceMethodOpenOptions,
  CloudinaryUploadWidgetSources,
} from 'next-cloudinary'
import React from 'react'

type UploadButtonProps = {
  children: React.ReactElement
  open: (
    widgetSource?: CloudinaryUploadWidgetSources | undefined,
    options?: CloudinaryUploadWidgetInstanceMethodOpenOptions
  ) => void
}

export const UploadButton = ({ children, open }: UploadButtonProps) => {
  const childWithClick = children as React.ReactElement<{
    onClick?: React.MouseEventHandler
  }>

  const handleClick = (e: React.MouseEvent) => {
    childWithClick.props.onClick?.(e)
    open()
  }

  return React.cloneElement(childWithClick, { onClick: handleClick })
}
