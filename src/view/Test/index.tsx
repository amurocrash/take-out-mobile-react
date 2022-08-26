import React, { FC, useContext } from 'react'
import TestContext from '../../store/TestContext'
import Child from './child'

const Test: FC = () => {

  const ctx = useContext(TestContext)

  return (
    <div>
      <TestContext.Consumer>
        {
          (value) => {
            return (
              <div>
                {value.name} - {value.age}
              </div>
            )
          }
        }
      </TestContext.Consumer>
      <div>
        {ctx.name} - {ctx.age}
      </div>
      <TestContext.Provider value={{ name: 'kamiu', age: 19 }}>
        <Child /> 
      </TestContext.Provider>
    </div>
  )
}

export default Test