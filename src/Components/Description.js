import React from 'react'

export default function Description({value}) {
    return (
      <div className="description" data-testid='description'>
        {value}
      </div>
    )
}
