import React from 'react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import App from '../App'

const server = setupServer(
  rest.get('http://localhost:5000/pokemon/charmeleon', (req, res, ctx) => {
    return res(ctx.json( {name: 'charmeleon', description: "At which hour 't swings its burning tail,  't elevates the temperature to unbearably high levels."}))
  }),
)
beforeEach(() => {
  server.listen();
  render(<App/>);
})
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('App to have Search Bar', async () => {

  expect(screen.getByPlaceholderText(/Search pokemon/i)).toBeInTheDocument();

})

test('App to show Shakesperean description upon search', async () => {

  fireEvent.change(screen.getByPlaceholderText(/Search pokemon/i), {target: {value: 'charmeleon'}})
  fireEvent.click(screen.getByTestId(/charmeleon/i))

  const description = await screen.findByTestId('description')

  expect(description).toBeInTheDocument();
  expect(description.textContent.trim()).toEqual("At which hour 't swings its burning tail,  't elevates the temperature to unbearably high levels.")
})

test('App to show error if search fails', async () => {
  server.use(
    // Runtime request handler override for the "GET http://localhost:5000/pokemon/charmeleon".
    rest.get('http://localhost:5000/pokemon/charmeleon', (req, res, ctx) => {
      return res(ctx.json({ error: {message:"Something went Wrong! Please try again"} }))
    }),
  )
  fireEvent.change(screen.getByPlaceholderText(/Search pokemon/i), {target: {value: 'charmeleon'}})
  fireEvent.click(screen.getByTestId(/charmeleon/i))

  const error = await screen.findByTestId("error")

  expect(error).toBeInTheDocument();
  expect(error.textContent.trim()).toEqual("Something went Wrong! Please try again")
})


