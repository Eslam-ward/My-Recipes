document.addEventListener("DOMContentLoaded", function () {
    const row = document.querySelector(".row");
    const selectdfood = document.querySelector("select");

    selectdfood.addEventListener("change", function () {
        getData(this.value);
    });

    document.getElementById('userInput').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            const query = event.target.value;
            if (query) {
                getData(query);
            }
        }
    });

    // Initial call to get data for 'steak'
    getData('steak');

    function getData(data) {
        fetch(`https://forkify-api.herokuapp.com/api/search?q=${data}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(alldata => {
                showData(alldata.recipes);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                row.innerHTML = `<p>Sorry, something went wrong. Please try again later.</p>`;
            });
    }

    function showData(arr) {
        let cartona = '';
        for (let index = 0; index < arr.length; index++) {
            cartona += `
                <div class="col-md-4">
                    <img class="w-100 md-2" src="${arr[index].image_url}" alt="">
                    <p><b>Title:</b> ${arr[index].title}</p>
                    <p><b>Recipe Id:</b> ${arr[index].recipe_id}</p>
                    <p><b>Publisher:</b> ${arr[index].publisher}</p>
                    <p><b>Social Rank:</b> ${arr[index].social_rank}</p>
                </div>`;
        }
        row.innerHTML = cartona;
    }
});
