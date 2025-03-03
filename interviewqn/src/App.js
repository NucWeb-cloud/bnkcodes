import './App.css';
import Circle from './components/circleqn/Circle';
import Child from './components/Context/Child';
import Parent from './components/Context/Parent';
import Cart from './components/Fetch/Cart';
import Users from './components/Fetch/Users';



function App() {
  return (
   <>
   <Circle/>

   <div>
    <Parent> <Child /> </Parent>
   </div>
   <div>
    {/* <Cart/> */}
   </div>
   <div>
<Users/>
   </div>
   </>
  );
}

export default App;
