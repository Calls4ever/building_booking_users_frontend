import { useState } from "react"
import DatePicker from "react-datepicker";
import BidBook from "./BidBook";
import Booking from "./Booking";
const BuildingCard =(props)=>{
    const [bookToggle, setBookToggle] =useState(false)
    const [booking,setBooking] =useState({startDate: new Date(), endDate:new Date()})
    const [bidBook, setBidBook] =useState(false)
    const [booked,setBooked] =useState()
    
    const handleBooking = (e)=>{

        e.preventDefault()
        console.log('clicked')
        if(props.building.bookings.length>0){
           let booked = props.building.bookings.find(bo=>{
               if(new Date(bo.start_time)<new Date(booking.startDate)){
                   if(new Date(bo.end_time)> new Date(booking.startDate) ||new Date(bo.end_time)> new Date(booking.endDate)){
                       return bo
                   }
               }else if(new Date(bo.start_time)>new Date(booking.startDate)){
                if(new Date(bo.start_time)< new Date(booking.endDate) || new Date(bo.end_time) < new Date(booking.endDate)){
                    return bo
                }
               }
           })
           if(booked){
            if(booked.confirmed){
                window.alert('Already booked, try other date!')
            }else{
                setBooked(booked)
                setBidBook(true)
            }
            
           }else{
            let bookingObj={
                user_id: props.currentUser.id,
                building_id: props.building.id,
                start_time: booking.startDate,
                end_time: booking.endDate,
                confirmed: false
            }
            bookBuilding(bookingObj)
           }
           
        }else{
            let bookingObj={
                user_id: props.currentUser.id,
                building_id: props.building.id,
                start_time: booking.startDate,
                end_time: booking.endDate,
                confirmed: false
            }
            
            bookBuilding(bookingObj)
        }
        
    }
    const bookBuilding=(bookingObj, pp=0)=>{

        let updatedPiriorityPoint=props.currentUser.piriority_point-pp
        console.log(bookingObj)
        fetch(`http://localhost:3000/bookings`,{
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify(bookingObj)
        })
        .then(res=>res.json())
        .then(bo=>{
            if(bo){
                fetch(`http://localhost:3000/users/${props.currentUser.id}`,{
                    method: 'PATCH',
                    headers: {
                        'accept': 'application/json',
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        piriority_point: updatedPiriorityPoint
                    })
                })
                .then(res=>res.json())
                .then(newUser=>{
                    if(newUser){
                        props.setCurrentUser(newUser)
                        console.log(newUser)
                        window.alert("Your booking has confirmed and we will keep you updated")
                    }
                })
            }else{
                window.alert('System Error')
            }
            
        })
    }
    const renderDatePicker=()=>{
        return(
            <div className='date-container'>
                <h3>From</h3>

                <DatePicker 
                    selected ={booking.startDate}
                    onChange ={(date)=>setBooking({...booking, startDate: new Date(date)})}
                />
                <h3>To</h3>
                <DatePicker 
                    selected ={booking.endDate}
                    onChange ={(date)=>setBooking({...booking, endDate:new Date(date)})}
                />
                <button
                onClick={(e)=>handleBooking(e)}
                >Confirm</button>
            </div> 
            )
    }
    return(
        <div className='building-container'>
            <h2>{props.building.name}</h2>
            <img src={props.building.img_url}/>
            <h3>Location: {props.building.location}</h3>
            <button
            onClick={()=>setBookToggle(!bookToggle)}
            >{props.myBuilding?'Cancel':'Book'}</button>
            {bookToggle && renderDatePicker()}
            {props.myBuilding && 
            <div>
                {props.building.bookings.map(bo=><Booking booking ={bo}/>)}
            </div>
            }
            {bidBook && <BidBook
                user = {props.currentUser}
                building = {props.building}
                setBidBook ={setBidBook}
                booked ={booked}
                date={booking}
                bookBuilding={bookBuilding}
            />}
        </div>
    )
}
export default BuildingCard