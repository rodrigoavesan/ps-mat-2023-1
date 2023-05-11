import React from 'react'
import PageTitle from '../../components/ui/PageTitle'
import TextField from '@mui/material/TextField'
import SendIcon from '@mui/icons-material/Send'
import Fab from '@mui/material/Fab'
import myfetch from '../../utils/myfetch'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Notification from '../../components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import PaymentMethod from '../../models/PaymentMethod'

export default function PaymentMethodForm() {
  const API_PATH = '/payment_methods'

  const navigate = useNavigate()

  const [state, setState] = React.useState({
    paymentMethod: {}, // Objeto vazio
    showWaiting: false,
    notif: {
      show:false,
      severity:'success',
      message:''
    }
  })
  const {
    paymentMethod,
    showWaiting,
    notif
  } = state

  function handleFormFieldChange(event) {
    const paymentMethodCopy = {...paymentMethod}
    paymentMethodCopy[event.target.name] = event.target.value
    setState({...state, paymentMethod: paymentMethodCopy})
  }

  function handleFormSubmit(event) {
    event.preventDefault()    // Evita que a página seja recarregada

    // Envia os dados para o back-end
    sendData()
  }

  async function sendData() {
    setState({...state, showWaiting: true})
    try {

      //Chama a validação da bíblioteca Joi
      await PaymentMethod.validateAsync(paymentMethod)

      await myfetch.post(API_PATH, paymentMethod)
      setState({
        ...state,
        showWaiting: false,
        notif:{
          severity: 'success',
          show:true,
          message: 'Novo item salvo com sucesso'
        }
      })
    }
    catch(error) {
      console.error(error)
      setState({
        ...state,
        showWaiting: false,
        notif:{
          severity: 'error',
          show:true,
          message: 'ERRO: ' + error.message
        }
      })
    }
  }

  function handleNotifClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    //Se o item for salvo com suceeso, retorna á página de listagem
    if(notif.severity === 'success') navigate(-1)

    setState({ ...state, notif: {...notif, show: false } })

  };



  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showWaiting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Notification 
        show={notif.show} 
        severity={notif.severity}
        onClose={handleNotifClose}
      >
        {notif.message}
      </Notification>

      <PageTitle title="Cadastrar novo método de pagamento" />


      <form onSubmit={handleFormSubmit}>
        <TextField 
          label="Descrição" 
          variant="filled"
          fullWidth
          required
          name="description"  // Nome do campo na tabela
          value={paymentMethod.description}   // Nome do campo na tabela
          onChange={handleFormFieldChange}
        />

        <TextField 
          label="Taxa de operação" 
          variant="filled"
          type="number"
          fullWidth
          required
          name="operator_fee"  // Nome do campo na tabela
          value={paymentMethod.operator_fee}   // Nome do campo na tabela
          onChange={handleFormFieldChange}
        />

        <Fab 
          variant="extended" 
          color="secondary"
          type="submit"
        >
          <SendIcon sx={{ mr: 1 }} />
          Enviar
        </Fab>

      </form>
    </>
  )
}