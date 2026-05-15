const form = document.querySelector('.hero_banner-search-form');
const destinationInput = document.querySelector('.search-input.destination-input');
const cityList = document.getElementById('city-list');
const cityListContainer = document.querySelector('.city_list_container');

let allCities = [];

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const response = await fetch('uploads/index.php', {
        method: 'POST',
        body: new FormData(form),           // send the form data to the server
    });
    const data = await response.json();

    if (data.status === false) {
        console.log(data.errors);

        if (data.errors.includes('Destination is required')) {
            document.querySelector('.search-input.destination-input').classList.add('active');
        }
    } else {
        console.log(data.message);
    }

});


async function searchResult(){
    try {
        const response = await fetch('https://countriesnow.space/api/v0.1/countries/state/cities', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                country: 'India',
                state: 'Himachal Pradesh',
            }),
        });
        const data = await response.json();
        allCities = data.data;
        console.log(allCities);
        } catch (error) {
            console.log(error);
        }
    
}



destinationInput.addEventListener('input', async (e) => {
    console.log(e.target.value);
    cityListContainer.style.display = 'block';
    const searchCity= e.target.value.toLowerCase().trim();
    const filteredCities = allCities.filter(city => city.toLowerCase().includes(searchCity));
    console.log(filteredCities);

    showList(filteredCities);

// The blur event listener in JavaScript triggers when an element loses focus
    destinationInput.addEventListener('blur', () => {
        setTimeout(() => {
            cityListContainer.style.display = 'none';
        }, 400);
    });
    

});
    

function showList(filteredCities){

    cityList.innerHTML = '';

    filteredCities.forEach(city => {
        const li = document.createElement('li');
        li.textContent = city;
        li.style.listStyle = 'none';

        li.addEventListener('click', () => {
            destinationInput.value = city;
            cityList.innerHTML = '';
        });
        cityList.appendChild(li);
    });
};
searchResult()