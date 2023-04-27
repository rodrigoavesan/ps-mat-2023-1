import React from 'react'
import Typography from '@mui/material/Typography'
import myfetch from '../../utils/myfetch'

export default function PaymentMethodList() {

  const [paymentMethods, setPaymentMethods] = React.useState([])

  async function fetchData() {
    try {
      const result = await myfetch.get('/payment_methods')
      setPaymentMethods(result)
    }
    catch(error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <Typography variant="h3" component="h1" sx={{ textAlign: 'center' }}>
        Listagem de métodos de pagamento
      </Typography>

      <div>{JSON.stringify(paymentMethods)}</div>
    </>
  )
}