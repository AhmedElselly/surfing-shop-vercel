const Review = (props) => {
	return(
		<div className="media">
		  {/*<img src={} className="mr-3" alt="..."/>*/}
		  <div className="media-body">
		    <h5 className="mt-0">{props.author.username}</h5>
		    {props.text}
		  </div>
		</div>
	)
}

export default Review;