import React from 'react'

export default function Error({value}) {
    return (
      <div className="error" data-testid='error'>
        {value}
      </div>
    )
}
