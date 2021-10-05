import React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import SearchBar from '../Components/SearchBar';
import pokemons from "../Data.json";

let wrapper;
beforeEach(() => {
  wrapper  = render(<SearchBar data={pokemons} handleSelect={()=>{}}></SearchBar>);
 
})

test('searching the pokemon', async () => {
  
  fireEvent.change(screen.getByRole('textbox'), {target: {value: 'c'}})
  expect(screen.getByText(/charmeleon/i)).toHaveTextContent(/charmeleon/i);

})

test('clearing the pokemon', async () => {

  fireEvent.change(screen.getByRole('textbox'), {target: {value: 'c'}})
  fireEvent.click(wrapper.container.querySelector('#clearBtn'))
  expect(screen.getByRole('textbox')).toHaveValue("");

})