import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './util/theme'; 

//Redux
import {Provider} from 'react-redux';
import store from './redux/store';

import home from './pages/home';
const theme = createTheme(themeFile);

class App extends Component{

  render() {
    return (
      <div className="App">
        <MuiThemeProvider theme = {theme}>
          <Provider store = {store}>
            <Router>
              <div className ="container">
                <Switch>
                  <Route exact path="/" component = {home}/>
                </Switch>
              </div>
            </Router>
          </Provider>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
