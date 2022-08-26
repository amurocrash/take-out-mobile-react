import React, { FC, useContext } from 'react'
import TestContext from '../../store/TestContext'

const Child: FC = () => {
  const ctx = useContext(TestContext)

  return (
    <div>
      {ctx.name} - {ctx.age}
    </div>
  )
}

export default Child