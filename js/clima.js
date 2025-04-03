async function getClima() {
    const key = 'b1b15e88fa797225412429c1c50c122a1';
    let city = document.querySelector('#city_name').value;

    if (!city) {
        city = 'Brusque';  
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric&lang=pt_br`;

    const response = await fetch(apiUrl);
    const objJson = await response.json();

    if (objJson.cod !== 200) {
        alert("Cidade não encontrada!")
    }

    console.log(objJson);
    return objJson;
}

async function mostrarClima() {  
    document.querySelector('#loader').style.display = 'inline-block';
    document.querySelector('#icon-search').style.display = 'none';
    const objClima = await getClima();

    const mostrarInfo = {
        name: objClima.name,
        temp: Math.round(objClima.main.temp),
        feels_like: Math.round(objClima.main.feels_like), 
        temp_min: Math.round(objClima.main.temp_min), 
        temp_max: Math.round(objClima.main.temp_max), 
        pressure: objClima.main.pressure,
        humidity: objClima.main.humidity,
        sea_level: objClima.main.sea_level,
        grnd_level: objClima.main.grnd_level,
        tempIcon: objClima.weather[0].icon,
        description: objClima.weather[0].description
    };

    document.querySelector('#name').innerHTML = `${mostrarInfo.name}`;
    document.querySelector('#temp').innerHTML = `${mostrarInfo.temp}<span>°C</span>`;
    document.querySelector('#feels_like').innerHTML = `${mostrarInfo.feels_like}<span>°</span>`;
    document.querySelector('#temp_min').innerHTML = `${mostrarInfo.temp_min}<span>°</span>`;
    document.querySelector('#temp_max').innerHTML = `${mostrarInfo.temp_max}<span>°</span>`;
    document.querySelector('#pressure').innerHTML = `${mostrarInfo.pressure}hPa`;
    document.querySelector('#humidity').innerHTML = `${mostrarInfo.humidity}%`;
    document.querySelector('#sea_level').innerHTML = `${mostrarInfo.sea_level}hPa`;
    document.querySelector('#grnd_level').innerHTML = `${mostrarInfo.grnd_level}hPa`;
    document.querySelector('#description').innerHTML = `${mostrarInfo.description}`;
    document.querySelector('#clima_atual').setAttribute('src', `https://openweathermap.org/img/wn/${mostrarInfo.tempIcon}@2x.png`);
    
    document.querySelector('#loader').style.display = 'none';
    document.querySelector('#icon-search').style.display = 'inline-block';
}

function mostrarDataHora() {
    const agora = new Date();
            
    const diasSemana = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
    const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

    const diaSemana = diasSemana[agora.getDay()];  
    const dia = agora.getDate();  
    const mes = meses[agora.getMonth()];  
    const horas = String(agora.getHours()).padStart(2, '0');  
    const minutos = String(agora.getMinutes()).padStart(2, '0');  

    const dataHoraFormatada = `${diaSemana}, ${dia} de ${mes} ${horas}:${minutos}`;

    document.querySelector('#date').innerHTML = dataHoraFormatada;
}
setInterval(mostrarDataHora, 60000);

window.onload = () => {
    mostrarDataHora();
    mostrarClima();

    document.querySelector('#city_name').addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            mostrarClima();
        }
    });
};
