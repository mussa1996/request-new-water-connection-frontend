import React, { Component } from "react";
import Routers from './routers/Router'
import { Router } from 'react-router-dom'
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createBrowserHistory } from "history";
import store from './reducers/store';
import { Provider } from "react-redux";
// import './index.css'
import './login.css'
const history = createBrowserHistory();

// const theme = createTheme();
class App extends Component {
    render() {
        return (
          // <ThemeProvider theme={theme}>
              <Provider store={store}>
                <Router history={history}>
                    <Routers />
                </Router>
            </Provider>
          //  </ThemeProvider> 
          
        )
    } 
}
export default App;
 
 