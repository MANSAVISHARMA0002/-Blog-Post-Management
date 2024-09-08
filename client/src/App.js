import './App.css';
import Login from './components/accounts/login';
import DataProvider from './context/DataProvider';
import Home from  './components/home/homepage'
import {BrowserRouter, Routes, Route, Outlet, Navigate} from 'react-router-dom';
import Header from './components/Header/header';
import {useState} from 'react';
import CreatePost from './components/create/createPost';
import DetailView from './components/details/DetailView';
import Update from './components/create/update';

const PrivateRoute=({isAuthenticated, ...props})=>{
  return isAuthenticated?
  <>
    <Header/>
    <Outlet />
  </>
  : <Navigate replace to='/login'/>
}
function App() {

  const [isAuthenticated, isUserAuthenticated]=useState(false);

  return (
    <DataProvider>
      <BrowserRouter>      
      <div style={{marginTop:64}}/>
        <Routes>
          <Route path='/login' element={<Login isUserAuthenticated={isUserAuthenticated}/>} />
          <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated}/>} >
            <Route path='/' element={<Home/>} />
          </Route>

          <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated}/>} >
            <Route path='/create' element={<CreatePost/>} />
          </Route>

          <Route path='/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated}/>} >
            <Route path='/details/:id' element={<DetailView/>} />
          </Route>

          <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated}/>} >
            <Route path='/update/:id' element={<Update/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
