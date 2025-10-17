function carregarJSON () {
    fetch('dados.json')                                             // Esse "fetch" lê o arquivo JSON
    .then(response => response.json())                              // Converte o texto em um objeto
    .then(dados => {                                                // Aqui o objeto já foi criado
        console.log(dados.nome);
        console.log(dados.cidade);
        document.getElementById('nome').textContent = "Nome: " + dados.nome;   // Aqui ele substitui a tag com id 'texto' pelo conteúdo do objeto "dados" com o valor contido em "nome"
        document.getElementById('idade').textContent = "Idade: " + dados.idade;
        document.getElementById('cidade').textContent = "Cidade: " + dados.cidade;
    })
    .catch(erro => {
        console.error("Erro ao carregar o JSON:", erro);
    })
}

function consumirAPI () {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=-29.7009&longitude=-52.4354&daily=daylight_duration,sunshine_duration,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,rain_sum&current=temperature_2m,is_day,apparent_temperature,rain,wind_speed_10m,wind_direction_10m,relative_humidity_2m,showers,precipitation,weather_code,surface_pressure,pressure_msl,wind_gusts_10m&timezone=America%2FSao_Paulo&forecast_days=1')
    .then(response => response.json())          // Passo 1: Pega os dados da API
    .then(clima => {                            // Passo 2: Recebe os dados na variável "clima" | "clima" é uma variável que existe somente dentro desse .then
        console.log("generationtime_ms: " + clima.generationtime_ms);   
        atualizaCoordenadas(clima);             // Passo 3: Chama a função e envia "clima" como parâmetro
        atualizaTemperatura (clima);
        atualizaHorarioLeitura (clima);
        atualizaSensacaoTermica (clima);
        atualizaSeEDia (clima);
        atualizaChuvaAtual(clima);
        atualizaVelVento(clima);
        atualizaDirVento(clima);
        atualizaUmidadeAr(clima);
        atualizaPressaoAr(clima);
        atualizaDuracaoDia(clima);
        atualizaTemperaturaMax(clima);
        atualizaTemperaturaMin(clima);
        atualizaSensacaoMax(clima);
        atualizaSensacaoMin(clima);
        atualizaSomaChuva(clima);
    })
    .catch(erro => {
        console.error("Erro ao carregar os dados da API: ", erro);
    })
}

function atualizaCoordenadas (clima) {          // Passo 4: Função recebe o parâmetro "clima" que foi enviado no passo 3
    document.getElementById('coordenadas').textContent = `Coordenadas: ${clima.latitude} ${clima.longitude}`;
}

function atualizaTemperatura (clima) {
    document.getElementById('temperatura').textContent = `Temperatura atual: ${clima.current.temperature_2m} °C`;
}

function atualizaHorarioLeitura (clima) {

    let dataStr = clima.current.time;
    let data = new Date(dataStr);

    document.getElementById('footer').textContent = `Horário da última leitura: ${data.toLocaleString()}`;

    // console.log(`${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()} ${data.getHours()}:${data.getMinutes()}`);

}

function atualizaSensacaoTermica (clima) {
    document.getElementById('sensacao').textContent = `Sensação térmica: ${clima.current.apparent_temperature} °C`;
}

function atualizaSeEDia (clima) {
    if (clima.current.is_day > 0)  {
            ehDia = "Sim"
            // console.log(ehDia);
        } else {
            ehDia = "Não"
            // console.log(ehDia);
        }

        document.getElementById('dia').textContent = `É dia? ${ehDia}`;
}

function atualizaChuvaAtual(clima) {
    let chuva = clima.current.rain;
    let chovendo = (chuva > 0) ? "Sim" : "Não";
    document.getElementById('chovendo').textContent = `Está chovendo? ${chovendo}`;
}

function atualizaVelVento(clima) {
    document.getElementById('velVento').textContent = `Velocidade do vento: ${clima.current.wind_speed_10m} km/h`;
}

function atualizaDirVento(clima) {
    document.getElementById('dirVento').textContent = `Direção do vento: ${clima.current.wind_direction_10m}°`;
}

function atualizaUmidadeAr(clima) {
    document.getElementById('umidadeAr').textContent = `Umidade relativa do ar: ${clima.current.relative_humidity_2m}%`;
}

function atualizaPressaoAr(clima) {
    document.getElementById('pressaoAr').textContent = `Pressão do ar: ${clima.current.surface_pressure} hPa`;
}

function atualizaDuracaoDia(clima) {
    let totalSeg = clima.daily.daylight_duration                // Recebe os dados da API
    let horas = Math.floor(totalSeg / 3600);                    // Converte os segundos em horas
    let restoSeg = totalSeg % 3600;                             // Calcula o resto 
    let minutos = Math.floor(restoSeg / 60);                    // Converte o resto em minutos
    let segundos = Math.floor(restoSeg % 60);                   // Converte o resto em minutos
    let duracaoDia = `${horas}h ${minutos}min ${segundos}s`     // Armazena os dados processados e formata de modo legível
    document.getElementById('daylight_duration').textContent = `Duração da luz do dia: ${duracaoDia}`;
}

function atualizaTemperaturaMax(clima) {
    document.getElementById('temperature_2m_max').textContent = `Temperatura máxima de hoje: ${clima.daily.temperature_2m_max} °C`;
}

function atualizaTemperaturaMin(clima) {
    document.getElementById('temperature_2m_min').textContent = `Temperatura mínima de hoje: ${clima.daily.temperature_2m_min} °C`;
}

function atualizaSensacaoMax(clima) {
    document.getElementById('apparent_temperature_max').textContent = `Sensação térmica máxima de hoje: ${clima.daily.apparent_temperature_max} °C`;
}

function atualizaSensacaoMin(clima) {
    document.getElementById('apparent_temperature_min').textContent = `Sensação térmica mínima de hoje: ${clima.daily.apparent_temperature_min} °C`;
}

function atualizaSomaChuva(clima) {
    document.getElementById('rain_sum').textContent = `Chuva acumulada de hoje: ${clima.daily.rain_sum} mm`;
}