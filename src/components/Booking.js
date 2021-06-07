const Booking=(props)=>{
    return(
        <div>
            <h3>From: {new Date(props.booking.start_time).toLocaleDateString()} 
            to: {new Date(props.booking.end_time).toLocaleDateString()}
            </h3>
        </div>
    )
}
export default Booking