async function getClima() {
    const key = '359706c0ee754da274f1977932d61a7c';
    let city = document.querySelector('#city_name').value;

    // Se o campo estiver vazio, use uma cidade padrão
    if (!city) {
        city = 'Brusque';  
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric&lang=pt_br`;

    const response = await fetch(apiUrl);
    const objJson = await response.json();
    console.log(objJson);
    return objJson;
}

async function mostrarClima() {  
    document.querySelector('.info-clima').style.display = 'block';

    const objClima = await getClima();

    const mostrarInfo = {
        name: objClima.name,
        temp: objClima.main.temp,
        feels_like: objClima.main.feels_like,
        temp_min: objClima.main.temp_min,
        temp_max: objClima.main.temp_max,
        pressure: objClima.main.pressure,
        humidity: objClima.main.humidity,
        sea_level: objClima.main.sea_level,
        grnd_level: objClima.main.grnd_level
    };

    document.querySelector('#name').innerHTML = `${mostrarInfo.name}`;
    document.querySelector('#temp').innerHTML = `${mostrarInfo.temp}<span>°C</span>`;
    document.querySelector('#feels_like').innerHTML = `${mostrarInfo.feels_like}°C`;
    document.querySelector('#temp_min').innerHTML = `${mostrarInfo.temp_min}°C`;
    document.querySelector('#temp_max').innerHTML = `${mostrarInfo.temp_max}°C`;
    document.querySelector('#pressure').innerHTML = `${mostrarInfo.pressure}hPa`;
    document.querySelector('#humidity').innerHTML = `${mostrarInfo.humidity}%`;
    document.querySelector('#sea_level').innerHTML = `${mostrarInfo.sea_level}hPa`;
    document.querySelector('#grnd_level').innerHTML = `${mostrarInfo.grnd_level}hPa`;

    const clima = document.querySelector('#clima_atual');
    const imagens = [
        'https://openweathermap.org/img/wn/10n@2x.png',
        'https://openweathermap.org/img/wn/11d@2x.png',
        'https://openweathermap.org/img/wn/01d@2x.png',
        'https://openweathermap.org/img/wn/03d@2x.png',
        'https://openweathermap.org/img/wn/50d@2x.png',
        'https://openweathermap.org/img/wn/09d@2x.png'
    ];
    
    switch(objClima.weather[0].main) {
        case 'Rain':
            clima.src = imagens[0];
            break;
        case 'Thunderstorm':
            clima.src = imagens[1];
            break;
        case 'Clear':
            clima.src = imagens[2];
            break;
        case 'Clouds':
            clima.src = imagens[3];
            break;
        case 'Atmosphere':
            clima.src = imagens[4];
            break;
        case 'Drizzle':
            clima.src = imagens[5];
            break;
        default:
            clima.src = imagens[2];  // Caso o clima não seja identificado, use a imagem de céu limpo.
    }
}

window.onload = mostrarClima; 