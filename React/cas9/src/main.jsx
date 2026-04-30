import ReactDOM from 'react-dom/client'
import {App} from './App';
import {Provider} from 'react-redux';
import store from './Store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App/>
  </Provider>
)

// da se dodade vo kodot od casot nova componenta so novi reducer i actions fajlovi so minimum 2 akcii