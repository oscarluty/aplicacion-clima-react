import { useState } from "react"
export const WeatherApp = () => {

  const urlBase = `https://api.openweathermap.org/data/2.5/weather`
  const API_KEY = '4ee3f3b4229fb4c83af7167385378281'
  const difKelvin = 273.15

  const [ciudad, setCiudad] = useState('')
  const [dataClima, setDataClima] = useState(null)


  const handleCambioCiudad = (e) => {
    setCiudad(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (ciudad.length > 0) fetchClima()
  }

  const fetchClima = async () => {
    try {
      const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`)
      const data = await response.json()
      setDataClima(data)
    } catch (error) {
      console.error('Ocurrio el siguiente problem: ', error)
    }
  }

  return (
    <div className="container">
      <h1>
        Aplicacion del Clima
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={ciudad}
          onChange={handleCambioCiudad}
        />
        <button
          type="submit">
          Buscar
        </button>
      </form>

      {
        dataClima &&
        <div>
          <h2>{dataClima.name}, {dataClima?.sys?.country}</h2>
          <p>Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)}°C</p>
          <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}/>
        </div>
      }

    </div>
  )
}
