async function getClima() {
    const key = '359706c0ee754da274f1977932d61a7c';
    let city = document.querySelector('#city_name').value;

    if (!city) {
        city = 'Brusque';  
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric&lang=pt_br`;

    const response = await fetch(apiUrl);
    const objJson = await response.json();

    if (objJson.cod !== 200) {
        alert("Cidade não encontrada!");
    }

    console.log(objJson);
    return objJson;
}

async function mostrarClima() {  
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
    }
}

function mostrarDataHora() {
    const agora = new Date();
            
    // Definir os dias da semana e os meses
    const diasSemana = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
    const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

    const diaSemana = diasSemana[agora.getDay()];  // Obtém o dia da semana
    const dia = agora.getDate();  // Obtém o dia do mês
    const mes = meses[agora.getMonth()];  // Obtém o nome do mês
    const horas = String(agora.getHours()).padStart(2, '0');  // Obtém as horas
    const minutos = String(agora.getMinutes()).padStart(2, '0');  // Obtém os minutos

    // Formatação final: Exemplo "qua, 12 de março 14:39"
    const dataHoraFormatada = `${diaSemana}, ${dia} de ${mes} ${horas}:${minutos}`;

    // Exibe a data e hora no elemento com id "hora"
    document.querySelector('#date').innerHTML = dataHoraFormatada;
}

// Atualiza a data e hora a cada minuto (para garantir que o tempo mostrado seja sempre correto)
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
