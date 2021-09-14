import './App.css';
import {Page} from './components/Page'
function App() {
  const colors = {
    "colorDark": "#002840",
    "colorNormal": "#AADFEE",
    "colorlight" : "#D4EFF7",
    "background" : "#F6F3EE",
    "white" : "#ffffff",
    "grey" : "#eeeeee"
  }
  return(<div className="App"><Page colors = {colors}/></div>);
}
export default App;
