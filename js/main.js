let myhttp = new XMLHttpRequest()
let row = document.querySelector(".row")
let selectdfood= document.querySelector("select")
selectdfood.addEventListener("change",function(){
    getdata(this.value)
})
getdata('steak')

document.getElementById('userInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        const query = event.target.value;
        if (query) {
            getdata(query);
        }
    }
});
function getdata(data){
    myhttp.open("GET", `https://forkify-api.herokuapp.com/api/search?q=${data}`)
myhttp.send()
myhttp.addEventListener("readystatechange", function(){
   if(myhttp.readyState == 4){
    let alldata = JSON.parse(myhttp.response)
    showData(alldata.recipes)

   }
}

)
}
function showData(arr){
    let cartona =''
    for(let index = 0; index < arr.length; index++){
        cartona += `
        <div class="col-md-4">
           <img  class="w-100 md-2"   src="${arr[index].image_url}" alt="">
          <p><b>Title:</b>${arr[index].title}</p>
          <p><b>Recipe Id:</b>${arr[index].recipe_id}</p>
          <p><b>puplisher:</b>${arr[index].publisher}</p>
          <p><b>Social Rank:</b>${arr[index].social_rank}</p>
          </div>`
}
  row.innerHTML = cartona
}


