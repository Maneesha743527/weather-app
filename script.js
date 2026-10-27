const url = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'YOUR_API_KEY';


async function weatherFn(cName) {
	const city = cName.trim();

	if (city === '') {
		showError('Please enter a city name.');
		return;
	}

	const temp = `${url}?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

	try {
		const res = await fetch(temp);
		const data = await res.json();

		if (res.ok) {
			$('#error-message').text('');
			weatherShowFn(data);
		} else {
			showError('City not found. Please try again.');
		}
	} catch (error) {
		console.error('Error fetching weather data:', error);
		showError('Something went wrong. Check your internet connection.');
	}
}

function weatherShowFn(data) {
	$('#city-name').text(`${data.name}, ${data.sys.country}`);
	$('#date').text(moment().format('MMMM Do YYYY, h:mm a'));
	$('#temperature').html(`${Math.round(data.main.temp)}°C`);
	$('#description').text(data.weather[0].description);
	$('#humidity').text(`Humidity: ${data.main.humidity}%`);
	$('#wind-speed').html(`Wind Speed: ${data.wind.speed} m/s`);
	$('#weather-icon').attr(
		'src',
		`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
	);
	$('#weather-info').fadeIn();
}

function showError(message) {
	$('#weather-info').hide();
	$('#error-message').text(message);
}