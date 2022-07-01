import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ActivationAccount from './components/auth/ActivationAccount';
import ForgotPassword from './components/auth/ForgotPassword';
import Dashboard from './views/dashboard/Dashboard';
import Login from './views/login/Login';
import Portfolio from './views/portfolio/Portfolio';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path='/dashboard/portfolio' element={<Dashboard children='portfolio'/>}/>
            <Route path='/dashboard/warehouse' element={<Dashboard children='warehouse'/>}/>
            <Route path='/dashboard/order' element={<Dashboard children='order'/>}/>
            <Route path='/dashboard/customer' element={<Dashboard children='customer'/>}/>
            <Route path='/dashboard/account' element={<Dashboard children='account'/>}/>
            <Route path='/dashboard/blog' element={<Dashboard children='blog'/>}/>
            <Route path='/dashboard/message' element={<Dashboard children='message'/>}/>
            <Route path='/dashboard/calendar' element={<Dashboard children='calendar'/>}/>
            <Route path='/dashboard' element={<Dashboard />}/>
            <Route path='/login' element={<Login element='login'/>}/>
            <Route path='/register' element={<Login element='register'/>}/>
            <Route path='/user/activate/:activationToken' element={<ActivationAccount/>}/>
            <Route path='/forgot_password' element={<ForgotPassword/>}/>
            <Route path='/portfolio' element={<Portfolio/>}/>
            <Route path='/' element={<Portfolio/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
