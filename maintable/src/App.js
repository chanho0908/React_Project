import './App.css';
import { FreshmanTable } from './component/view/FreshmanTable.js';
import { JuniorTable } from './component/view/JuniorTable';
import { SophomoreTable } from './component/view/SophomoreTable';

function App() {
  return (
    <div style={
        {
          width:'100%', 
          display:'flex', 
          flexDirection:'column', 
          justifyContent:'center', 
          alignItems:'center'
        }}
      >
      <FreshmanTable/>
      <SophomoreTable/>
      <JuniorTable/>
    </div>
  );
}

export default App;
