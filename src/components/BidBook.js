import { useState } from "react"

const BidBook=(props)=>{
    const [message,setMessage]=useState("")
    const [bid, setBid]=useState(0)
    const handleBooking =()=>{
        let maxBid=false
           if(bid<props.building.min_piriority_point){
               setMessage(`Minimum bid is ${props.building.min_piriority_point}`)
           }else if(bid>props.building.max_piriority_point){
            setMessage(`Minimum bid is ${props.building.min_piriority_point}!`)
           }else{
               if(props.building.max_piriority_point==bid){
                maxBid=true
               }
               updateBooking(maxBid)
           }
       }

       const updateBooking=(maxBid)=>{
        let bookingObj={
            user_id: props.user.id,
            building_id: props.building.id,
            start_time: props.date.startDate,
            end_time: props.date.endDate,
            confirmed: maxBid
           }
           props.bookBuilding(bookingObj,bid)
           props.setBidBook(false)
       }
    return(
       
        <div className="signup-modal">
            <div className = "signup-modal-content">
                <h3>Bid Book This Building!</h3>
                <h4>This building is already booked, the good news is you can still bid book it!</h4>
                <h4>Max Bid: {props.building.max_piriority_point}</h4>
                <h4>Min Bid: {props.building.min_piriority_point}</h4>
                <label style={{color:"red"}}>{message}</label>
                <input
                type='number'
                min='0'
                max ={props.user.piriority_point}
                onChange={(e)=>setBid(e.target.value)}
                value={bid}
                />
                <div>
                    <button
                    onClick={handleBooking}
                    >Bid Book</button>
                    <button
                    onClick={()=>props.setBidBook(false)}
                    >Go Back</button>
                </div>
            </div>
        </div>
    )
}
export default BidBook