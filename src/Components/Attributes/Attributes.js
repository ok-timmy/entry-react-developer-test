import React from 'react'
import './Attributes.css'

function Attributes({attributeArray}) {
  return (
    <div><h3 className='attribute-header'>{attributeArray.name}:</h3>
    {
        attributeArray.items.map((item)=> {
            if(item.value.charAt(0) === '#')
            {return <button className='attribute-btn' key={item.id} style={{backgroundColor: `${item.value}`}}></button>}

            else return <button className='attribute-btn' key={item.id}>{item.value}</button>
        })
    }
    </div>
  )
}

export default Attributes