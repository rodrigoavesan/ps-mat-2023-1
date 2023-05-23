import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import HeaderBar from './components/ui/HeaderBar'
import Box from '@mui/material/Box'
import PaymentMethodList from './pages/payment_methods/PaymentMethodList'
import PaymentMethodForm from './pages/payment_methods/PaymentMethodForm'
import CarrierList from './pages/carrier/CarrierList'
import CarrierForm from './pages/carrier/CarrierForm'

function AuthGuard({children}){
  //Estaremos autenticados se tivermos um token gravado no localStorage
  if(window.localStorage.getItem('token')) return children
  else return <Navigate to="/login" repalce/>
}

function App() {

  return (
    <BrowserRouter>
      <HeaderBar />
      <Box sx={{ m: '25px auto', p:'16px' }}>
        <Routes>
          <Route path="/" element={<AuthGuard> <Home /> </AuthGuard> } />
          <Route path="/login" element={<Login />} />

          <Route path="/payment_method" element={<AuthGuard> <PaymentMethodList /> </AuthGuard> } />
          <Route path="/payment_method/new" element={<AuthGuard> <PaymentMethodForm /> </AuthGuard> } />


          <Route path="/payment_method/:id" element={<AuthGuard> <PaymentMethodForm /> </AuthGuard> } /> 


          <Route path="/carrier" element={<AuthGuard> <CarrierList /> </AuthGuard> } />
          <Route path="/carrier/new" element={<AuthGuard> <CarrierForm /> </AuthGuard> } />


        </Routes>
      </Box>
    </BrowserRouter>
  )
}

export default App
