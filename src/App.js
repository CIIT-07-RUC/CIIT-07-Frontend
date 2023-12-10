import './App.scss';
import { IndexPage } from './pages/IndexPage';
import { Footer } from './components/footer/Footer';
import { NavigationMain } from './components/navigation/NavigationMain';

function App() {
  return (
    <div className="App">
			<NavigationMain offCanvasPlacement="end" />
      <IndexPage/>
      <Footer />
    </div>
  );
}

export default App;
