import './App.scss';
import { IndexPage } from './pages/IndexPage';
import { Footer } from './components/footer/Footer';
import { NavigationBar } from './components/navigation/NavigationBar';

function App() {
  return (
    <div className="App">
			<NavigationBar offCanvasPlacement="end" />
      <IndexPage/>
      <Footer />
    </div>
  );
}

export default App;
