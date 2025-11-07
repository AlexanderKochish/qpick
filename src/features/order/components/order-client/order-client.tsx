import s from './order-client.module.css'
import BaseCard from '@/shared/components/base-card/base-card'
import Image from 'next/image'
import addressMap from '../../../../../public/delivery.png'
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'

const OrderClient = () => {
  return (
    <section className={s.orderSection}>
      <h2>Оформление заказа</h2>
      <div className={s.order}>
        <BaseCard>
          <div className={s.title}>
            <strong>Доставка курьером</strong>
            <span>10 $</span>
          </div>
          <Image
            src={addressMap}
            alt="Карта с адресом"
            width={375}
            height={145}
            sizes="(max-width: 375px) 100vw, 375px"
            quality={85}
            priority={false}
            placeholder="blur"
            className={s.img}
          />
          <FormControl size="small" className={s.form}>
            <InputLabel id="demo-simple-select-label">City</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={10}
              label="City"
              // onChange={handleChange}
            >
              <MenuItem value={10}>London</MenuItem>
              <MenuItem value={20}>New York</MenuItem>
              <MenuItem value={30}>Kiev</MenuItem>
            </Select>
            <TextField
              id="outlined-basic"
              label="Улица / Район"
              variant="outlined"
              size="small"
              fullWidth
            />
            <div className={s.formBottom}>
              <TextField
                id="outlined-basic"
                label="Дом"
                variant="outlined"
                fullWidth
                size="small"
              />
              <TextField
                id="outlined-basic"
                label="Подъезд"
                variant="outlined"
                fullWidth
                size="small"
              />
              <TextField
                id="outlined-basic"
                label="Квартира"
                variant="outlined"
                fullWidth
                size="small"
              />
            </div>
          </FormControl>
        </BaseCard>
        <div className={s.orderDetails}>
          <BaseCard>
            <strong>Ваш заказ</strong>
            <div className={s.details}>
              <div>
                <span>1х Наушники Apple BYZ S852I</span>
                <span>₸ 2 927</span>
              </div>
              <div>
                <span>Доставка ₸ 2 927</span>
                <span>₸ 2 927</span>
              </div>
              <div>
                <span>К оплате</span>
                <span>₸ 2 927</span>
              </div>
            </div>
          </BaseCard>
          <BaseCard>
            <div className={s.input}>
              <InputLabel id="payment-type">
                <strong>Способы оплаты</strong>
              </InputLabel>
              <Select
                fullWidth
                size="small"
                labelId="payment-type"
                id="payment-type"
                value={10}
                label="Payment type"
                // onChange={handleChange}
              >
                <MenuItem value={10}>Mono Bank</MenuItem>
                <MenuItem value={20}>Stripe</MenuItem>
                <MenuItem value={30}>Pay Pal</MenuItem>
              </Select>
            </div>
          </BaseCard>
          <BaseCard>
            <div className={s.input}>
              <InputLabel htmlFor="phone">
                <strong>Номер получателя</strong>
              </InputLabel>
              <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                fullWidth
                size="small"
              />
            </div>
          </BaseCard>
          <Button variant="contained">Закончить оформление</Button>
        </div>
      </div>
    </section>
  )
}

export default OrderClient
