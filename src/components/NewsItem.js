import React from 'react'

const NewsItem=(props)=>  {

    let {title,description,imageUrl,newsurl}=props;
    return (
      <div className='my-2'>
       
        <div className="card" >
       <img src={imageUrl} className="card-img-top" alt="..."/>
       <div className="card-body">
       <h5 className="card-title"> {title}</h5>
       <p className="card-text">{description}</p>
      <a href={newsurl} className="btn btn-sm btn-dark">Read More</a>
  </div>
</div>
     </div>
    )
  
}

export default NewsItem
