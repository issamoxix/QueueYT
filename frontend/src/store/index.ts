// store/index.ts
import { legacy_createStore as createStore} from 'redux';
import rootReducer from './reducers';

const store = createStore(rootReducer);
// const store = configureStore

export default store;
