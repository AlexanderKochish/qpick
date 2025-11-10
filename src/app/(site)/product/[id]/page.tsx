import { getProductById } from '@/features/products/actions/actions'
import BaseCard from '@/shared/components/base-card/base-card'
import s from './page.module.css'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material'
import { ChevronUpIcon, Heart } from 'lucide-react'
import Image from 'next/image'
import ActionsButtons from '@/features/products/components/actions-buttons/actions-buttons'
import Slider from '@/shared/components/slider/slider'

const ProductDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const product = await getProductById(id)

  return (
    <div className={s.wrapper}>
      <h4>{product?.category.name.toUpperCase()}</h4>
      <BaseCard>
        <div>
          <Heart color="#1C1C27" />
        </div>
        <div className={s.imagesWrapper}>
          {product?.images && (
            <Slider
              slides={product.images.map((image) => (
                <Image
                  key={image.id}
                  src={image.url}
                  alt="product card"
                  width={350}
                  height={370}
                  sizes="(max-width: 480px) 90vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 350px"
                  quality={85}
                  style={{
                    width: 290,
                    height: 310,
                    objectFit: 'cover',
                  }}
                />
              ))}
            />
          )}
        </div>
        <div>
          <strong>{product?.name}</strong>
          <span>{product?.price.toNumber()}</span>
        </div>
      </BaseCard>
      <div className={s.desc}>
        <Accordion className={s.accordion}>
          <AccordionSummary
            expandIcon={<ChevronUpIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">Description</Typography>
          </AccordionSummary>
          <AccordionDetails>{product?.description}</AccordionDetails>
        </Accordion>
        <ActionsButtons productId={product?.id} />
      </div>
    </div>
  )
}

export default ProductDetails
