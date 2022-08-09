import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout/Layout';
import { Route, Switch } from 'react-router-dom';
import Medicine from './container/Medicine/Medicine';
import { Provider } from 'react-redux';
import Counter from './container/Counter/Counter';
import { PersistGate } from 'redux-persist/integration/react'
import { configurestore } from './redux/Store';
import Patient from './container/Patients/Patient';
import Doctor from './container/Doctor/Doctor';

function App() {

  const { store ,persistor} = configurestore()

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Switch>
            <Route path={'/Medicine'} exact component={Medicine} />
            <Route path={'/Patient'} exact component={Patient} />
            <Route path={'/Doctor'} exact component={Doctor} />
            <Route path={'/Counter'} exact component={Counter} />
          </Switch>
        </Layout>
      </PersistGate>
    </Provider>

  );
}

export default App;
