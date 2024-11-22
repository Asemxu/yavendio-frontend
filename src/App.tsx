import './assets/App.css';
import ChatApp from './components/ChatApp';
import { ToastContainer } from 'react-toastify';
const App = () => {
  return (
    <main className="App">
      <div className="App-body">
        <ChatApp />
      </div>
      <ToastContainer />
    </main>
  );
}

export default App;
