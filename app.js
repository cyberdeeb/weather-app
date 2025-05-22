const apiKey = 'API_KEY';
const weatherButton = document.getElementById('weatherButton');
const locationInput = document.getElementById('locationInput');
const loading = document.getElementById('loading');
const resultDiv = document.getElementById('result');
const errorDiv = document.getElementById('error');

weatherButton.addEventListener('click', async() => {
  const location = locationInput.value.trim();

  if (!location) return;

  resultDiv.classList.add('hidden');
  errorDiv.classList.add('hidden');
  loading.classList.remove('hidden');

  try {
    const response = await fetch(
            `http://api.weatherstack.com/current?access_key=${apiKey}&query=${location}`
    );

    if (!response.ok) {
      throw new Error('City not found');
    }

    const data = await response.json();
    const outputLocation = data.location.name;
    const temp = data.current.temperature;
    const description = data.current.weather_description;
    const icon = data.current.weather_icons[0];

    resultDiv.innerHTML = `
        <h2>${outputLocation}</h2>
        <p>${description}</p>
        <p>${temp}&deg;F</p>
        <img src="${icon}" />

        `;

    resultDiv.classList.remove('hidden');
  } catch (err) {
    errorDiv.textContent = err.message;
    errorDiv.classList.remove('hidden');
  } finally {
    loading.classList.add('hidden');
  }
});
