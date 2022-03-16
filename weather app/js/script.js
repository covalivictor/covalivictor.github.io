/*

//////////////////////////////DOM(DOCUMENT OBJECT MODELS)/////////////////////////

const paragrafUnic = document.querySelector("#p1");

const paragrafe = Array.from(document.querySelectorAll(".paragraf"));


//for each
paragrafe.forEach((p, i) => {
    p.innerText = "Victor" + i;
})

setInterval(() => {
    paragrafe.forEach((p, i) => {
        p.classList.toggle("blue");
        p.classList.toggle("red");
    });

}, 1000);

paragrafUnic.innerText = "DANU";
*/


/*
for( let i = 0; i < 15; i++) {
    const paragraf = document.createElement("p");
    paragraf.innerText = "Victor" + i; //-> Victor 0
    document.querySelector("body").appendChild(paragraf);
}*/


/*

/////////////EVENTS////////////////

const form = document.querySelector("form");

function onSubmit(e) {
    e.preventDefault();
    console.log(e);
    console.log("aa");

    setTimeout(() => {
        console.log("au trecut 2 sec jum");
        form.submit();
    }, 2500);
}

form.addEventListener("submit", onSubmit);
*/
/*
fetch('data.json', {
    method: 'GET',
})
.then(
    function(response) {
        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status code: ' + response.status);
        return;
    }

    //Examine the text in the response.
    response.json().then(function(data) {
        console.log(data);
    });
  }
)
.catch(function(err) {
    console.log('Fetch Error :-S', err);
});
*/

const key = "ec40a3870b022d9259660f79ece52377";

const select = document.querySelector(".form-select");
const city = document.querySelector(".city");
const temp = document.querySelector(".temp");
const icon = document.querySelector(".icon");
const weatherType = document.querySelector(".weather-type");
const time = document.querySelector(".time");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const atmp = document.querySelector(".atmp"); 


const kelvinToCelsius = (degrees) => {
    const celsius = degrees - 273.15;
    return celsius.toFixed(1);
};



const getCities = () => {
    fetch('https://import.cdn.thinkific.com/268732/courses/1081208/cities-210309-164337.json', {
    method: 'GET',
  })
  .then(response => response.json())
  .then(data => {
       data.forEach(city => {
        const option = document.createElement("option");
        option.value = city.id;
        option.text = city.name;
        
        //if it is Copenhagen
        if(city.id === 2618425) {
            option.setAttribute("selected", true);
        }

        select.appendChild(option);
       });    
  })
  .catch((error) => {
    console.log('Error:', error);
  });
}

const getWeather = (cityId = 2618425) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${key}`, {
    method: 'GET',
  })
  .then(response => response.json())
  .then(data => {

    const date = new Date();


    city.innerText = data.name;
    temp.innerText = kelvinToCelsius(data.main.temp) + '\xB0C';
    icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherType.innerText = data.weather[0].description;
    time.innerText = `${date.toLocaleTimeString()}, ${date.toLocaleDateString()}`;
    wind.innerText = `Wind: ${data.wind.speed} m/s`;
    humidity.innerText = `Humidity: ${data.main.humidity} %`; 
    atmp.innerText = `Pressure: ${data.main.pressure} hPa`;
    

    


      console.log('Succes:', data);
  })
  .catch((error) => {
    console.log('Error:', error);
  });
}


getCities();
getWeather();

select.addEventListener("change", function(e) {
    const cityId = e.target.value;
    getWeather(cityId);
});