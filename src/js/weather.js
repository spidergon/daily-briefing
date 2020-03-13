
function success({ coords }) {

  const {latitude, longitude, accuracy} = coords

  console.log('Votre position actuelle est :')
  console.log(`Latitude : ${latitude}`)
  console.log(`Longitude : ${longitude}`)
  console.log(`La précision est de ${accuracy} mètres.`)


  const url = `/.netlify/functions/weatherapi?lat=${latitude}&lon=${longitude}`

  fetch(url).then(response => {
    return response.json()
  }).then(data => {

    document.querySelector('#city').textContent = data.name
    document.querySelector('#temp').textContent = data.main.temp + "°C"
    document.querySelector('#main').textContent = data.weather[0].main
    document.querySelector('#desc').textContent = data.weather[0].description

    document.querySelector('#weather').classList.remove('hidden')

    console.log(data)
  })
}

function error(err) {
  console.warn(`ERREUR (${err.code}): ${err.message}`)
}

if(navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success, error)
}