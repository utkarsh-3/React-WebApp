import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { getClient, watchGetClient, updateClient } from './store/fetchClient';
import ClientReducer from './store/fetchClient';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();


let store = createStore(ClientReducer, compose(applyMiddleware(sagaMiddleware, thunk), (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__())
);
sagaMiddleware.run(watchGetClient);
store.subscribe(() => { console.log(store.getState()) });
store.dispatch(getClient());




ReactDOM.render(
    <Provider store={store}>
     
            <App />
      
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();

export default store;