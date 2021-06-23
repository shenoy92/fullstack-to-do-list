import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import ProtectedRoute from "./component/protectedRoute";
import Login from './pages/login';
import Registration from './pages/registration';
import Todo from './pages/todo';
import NotFound from './pages/notFound';
import Header from './component/header';
import Loading from './component/loading';
import ApiMsg from './component/apiMsg';
import { getLoaderAndMsgStatus } from './common/helper/fetchData';

function App() {
  const initialLoadingAndMsgStatus = { loader: false, message: '', error: '' };
  const [loadingAndMsgStatus, setLoadingAndMsgStatus] = useState(initialLoadingAndMsgStatus);

  useEffect(() => {
    const loader = getLoaderAndMsgStatus().subscribe((status) => {
      if(status) {
        setLoadingAndMsgStatus(status);
      } else {
        setLoadingAndMsgStatus(status);
      }
      if(status.message || status.error) {
        setTimeout(() => setLoadingAndMsgStatus(initialLoadingAndMsgStatus), 3000);
      }
    });

    return () => {
      loader.unsubscribe();
    }
  },[])

  return (
    <>
      { (loadingAndMsgStatus.message || loadingAndMsgStatus.error)  && 
        <ApiMsg error={loadingAndMsgStatus.error} message={loadingAndMsgStatus.message}/> }
      { loadingAndMsgStatus.loader && <Loading /> }
      <Header />
      <div className="custom-container">
      <BrowserRouter>
        <Switch>
            <Route path="/" component={Login} exact/>
            <Route path="/registration" component={Registration} />
            <ProtectedRoute exact path="/todo" component={Todo} />
            <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
      </div>
    </>
  );
}

export default App;
