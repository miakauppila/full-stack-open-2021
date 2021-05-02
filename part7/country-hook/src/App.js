import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  //get data from rest API with axios
  //useEffect runs when name changes
  useEffect(() => {
    console.log('useEffect')
    if (name !== '') {
      axios
        .get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
        .then((response) => {
          console.log('response', response)
          setCountry({
            found: true,
            data: {
              capital: response.data[0].capital,
              population: response.data[0].population,
              flag: response.data[0].flag
            }
          });
        })
        .catch((error) => {
          console.log(error);
          setCountry({ found: false })
        });
    }
  }, [name]);

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`} />
    </div>
  )
}

const App = () => {
  const [name, setName] = useState('')

  //custom hooks
  const nameInput = useField('text')
  const country = useCountry(name)

  // fetch in useCountry hook
  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
