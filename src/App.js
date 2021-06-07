import './App.css';
import Login from './components/Login';
import BuildingCard from './components/BuildingCard'
import { useEffect, useState } from 'react';

function App() {
  const [currentUser,setCurrentUser] = useState({})
  const [buildings,setBuildings]=useState([])
  
  useEffect(()=>{
    fetch('http://localhost:3000/buildings')
    .then(res=>res.json())
    .then(buildings=>{
      setBuildings(buildings)
    })
  },[])
  const renderBookings=()=>{
    if(currentUser.bookings.length>0){
      let myBuildings=[]
      for(let i=0; i<currentUser.bookings.length; i++){
        for(let j=0; j<buildings.length; j++){
          if(buildings[j].id===currentUser.bookings[i].building_id){
            if(!myBuildings.includes(buildings[j])){
              myBuildings.push(buildings[j])
            }
            
          }
        }
      }
      return(
        <div className = 'my-building'>
          <h1>My Bookings</h1>
            <div className= 'building-card-container'>
              { myBuildings.map(b=><BuildingCard 
              myBuilding={true} 
              building={b}
              key ={b.id}
              />)}
            </div>
           
        </div>
      )
    }else{
      return(
        <div className ='my-building'>
          <h1>My Bookings</h1>
              <h3>You don't have any bookings! Book now from following list!
              </h3>
        </div>
      ) 
    }
  }
  return (
    <div className="App">
      {!currentUser.username && <Login
      setCurrentUser={setCurrentUser}
      />}
      
      {currentUser.username &&
      <div className ='main-container'>
        <h1>Hi, {currentUser.name}!</h1>
        <h3>Available PPs: {currentUser.piriority_point}</h3>
        <div>
          {renderBookings()}
        </div>
        <div className='building-card-container'>
          { buildings.map(b=><BuildingCard 
            key={b.id} 
            building={b} 
            myBuilding={false}
            setCurrentUser={setCurrentUser}
            currentUser ={currentUser}
            />)}
        </div>
      </div>
       }
    </div>
  );
}

export default App;
