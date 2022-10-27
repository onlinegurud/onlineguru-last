import { CssBaseline } from '@mui/material';
import { StyledEngineProvider } from '@mui/styled-engine';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import * as serviceWorker from './serviceWorker';

import reportWebVitals from './reportWebVitals';
import Home from './components/Home';
import Header from './components/Header';
import Contactus from './components/Contactus';
import Facilities from './components/Facilities';
import Footer from './components/Footer';
import Term from './components/Term';
import Refund from './components/Refund';
import Privacy from './components/Privacy';

import { Routes, Route } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <StyledEngineProvider injectFirst>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header></Header>
              <Home />
              <Footer />
            </>
          }
        ></Route>
        <Route
          path="/home"
          element={
            <>
              <Header></Header>
              <Home />
              <Footer />
            </>
          }
        ></Route>
        <Route
          path="/contactus"
          element={
            <>
              <Header></Header>
              <Contactus />
              <Footer />
            </>
          }
        ></Route>
        <Route
          path="/facilities"
          element={
            <>
              <Header></Header>
              <Facilities />
              <Footer />
            </>
          }
        ></Route>
        <Route
          path="/termsandconditions"
          element={
            <>
              <Header last={true}></Header>
              <Term />
              <Footer />
            </>
          }
        ></Route>
        <Route
          path="/privacy"
          element={
            <>
              <Header last={true}></Header>
              <Privacy />
              <Footer />
            </>
          }
        ></Route>
        <Route
          path="/refund"
          element={
            <>
              <Header last={true}></Header>
              <Refund />
              <Footer />
            </>
          }
        ></Route>
      </Routes>

      <App></App>
      <CssBaseline />
    </StyledEngineProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// for IE-11 support un-comment cssVars() and it's import in this file
// and in MatxTheme file

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
reportWebVitals();
