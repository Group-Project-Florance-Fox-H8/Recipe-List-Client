let port = 'http://localhost:3000/'


function restaurantPage() {
    $("#login-page").hide()
    $("#regist-page").hide()
    $("#list-page").hide()
    $("#btn-logout").show()
    $('#show-data-recipe').hide()
    $('#my-recipe').hide()
    $('#zomato-page').show()
    $('#edammame-page').hide()
    $('#meal-db-page').hide()
    showRestaurant()
}

function showRestaurant() {
    $.ajax({
        url : port + "restaurants",
        method : "GET",
        headers : {
            access_token : localStorage.getItem("access_token")
        }
    })
    .done(data => {
        $('#zomato-list').empty()
        console.log(data.restaurants);
        data.restaurants.forEach((e)=>{
            $('#zomato-list').append(`
                <div class = "col mb-4">
                <div class="card" style="width: 20rem;">
                <div class="card-header bg-secondary">
                    <h5 class="card-title text-center">${e.restaurant.name}</h5>
                </div>
                <div class="card-body">
                    
                    <img src="${e.restaurant.featured_image}" style="height: 200px;" class="card-img-top" alt="...">
                    <table class="table table-borderless">
                    <th>Location</th>
                    <td>${e.restaurant.location.address}</td>  
                    </tr>
                    <tr>
                    <th>Cuisines</th>
                    <td>${e.restaurant.cuisines}</td> 
                    
                    </tr>
                    <tr>
                    <th>Open Hours</th>
                    <td>${e.restaurant.timings}</td>
                    <!--   -->
                    </tr>
                    <tr>
                    <th>Rating</th>
                    <td>${e.restaurant.user_rating.aggregate_rating}</td>
                    
                    </tr>
                </table>
                </div>
            </div>
            </div>
            `)
        })
    })
    .fail(err => {
        console.log(err)
    })
}

function healthyFoodPage(){
    $("#login-page").hide()
    $("#regist-page").hide()
    $("#list-page").hide()
    $("#btn-logout").show()
    $('#show-data-recipe').hide()
    $('#my-recipe').hide()
    $('#zomato-page').hide()
    $('#edammame-page').show()
    $('#meal-db-page').hide()
    fetchDataHealthyFood()
}
function fetchDataHealthyFood(){
    $.ajax({
        url : port + "recipes2",
        method : "GET",
        headers : {
            access_token : localStorage.getItem("access_token")
        }
    })
    .done(data =>{
        console.log(data.hits);
        $('#edammame-list').empty()
        data.hits.forEach((e)=>{
            $('#edammame-list').append(`
                <div class = "col mb-4">
                    <div class="card" style="width: 20rem;">
                        <div class="card-header">
                        <h5 class="card-title text-center">${e.recipe.label}</h5>
                        </div>
                        <div class="card-body">    
                            <img src="${e.recipe.image}" style="height: 200px;" class="card-img-top" alt="...">
                            <table class="table table-borderless">
                                <th>Diet</th>
                                <td>${e.recipe.dietlabels}</td>  
                            </tr>
                            <tr>
                                <th>Health</th>
                                <td>${e.recipe.healthlabels}</td> 
                                
                            </tr>
                            <tr>
                                <th>Ingredients</th>
                                <td>${e.recipe.ingredientLines}</td>
                                <!--   -->
                            </tr>
                            <tr>
                                <th>Calories</th>
                                <td>${e.recipe.calories}</td>
                                
                            </tr>
                            </table>
                        </div>
                    </div>
                </div>
            `)
        })
    })
    .fail(xhr => console.log(xhr))
}
function mainPage() {
    $("#login-page").hide()
    $("#regist-page").hide()
    $('#main-page').show()
    $("#btn-logout").show()
    $('#show-data-recipe').hide()
    $('#my-recipe').hide()
    $('#zomato-page').hide()
    $('#edammame-page').hide()
    $('#meal-db-page').hide()
    console.log(localStorage.getItem('access_token'));
}

function loginPage(){
    $("#regist-page").hide()
    $("#btn-logout").hide()
    $('#main-page').hide()
}

function register(){
    $("#login-page").hide()
    $("#regist-page").show()
    $("#btn-logout").hide()
    $('#main-page').hide()
}

function login() {
    const email = $("#loginEmail").val()
    const password = $("#loginPassword").val()
    $.ajax({
        url : port + 'login',
        method : 'post',
        data : {
            email,
            password
        }
    })
    .done(data => {
        localStorage.setItem("access_token", data.access_token)
        mainPage()
    })
    .fail(err => {
        console.log(err)
    })
}

function signup(){
    const email = $("#registEmail").val()
    const password = $("#registPassword").val()
    $.ajax({
        url : port + 'register',
        method : 'post',
        data : {
            email,
            password
        }
    })
    .done(data => {
        console.log(data);
        loginPage()
    })
    .fail(err => {
        console.log(err)
    })
}

function logout(){
    localStorage.removeItem('access_token')
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

function fetchRecipe(){
    $.ajax({
        url : port + "recipes",
        method : "get",
        headers : {
            access_token : localStorage.getItem('access_token')
        }
    })
    .done(data => {
        data.forEach(recipe => {
            $('#mainhome').append(`
            <div class = "col mb-4">
                <div class="card" style="width: 15rem;">
                  <div class="card-body">
                    <h5 class="card-title text-center">${recipe.name}</h5>
                  </div>
                  <table class="table table-borderless">
                      <th>Cooking Time</th>
                      <td>${recipe.cooking_time}</td>
                    </tr>
                    <tr>
                      <th>Type</th>
                      <td>${recipe.type}</td>
                    </tr>
                  </table>
                  <div class="card-body">
                    <a class="btn btn-primary" id="btn-show" onclick = "recipeById(${recipe.id})">Show</a>
                    <a class="btn btn-danger" id="btn-delete" onclick = "deleteRecipe(${recipe.id})">Delete</a>
                  </div>
                </div>
              </div>
            `)
        });
    })
    .fail(err => {
        console.log(err)
    })
}

function deleteRecipe(id){
    $.ajax({
        url : port + "recipes/" + id,
        method : "delete",
        headers : {
            access_token : localStorage.getItem('access_token')
        } 
    })
    ,done(data => {
        myrecipe()
    })
    .fail(err => {
        console.log(err);
    })
}

function myrecipe() {
    $('#main-page').hide()
    $("#my-recipe").show()
    // fetchRecipe()
}

function createRecipe() {
    const name = $('#inputName').val()
    const ingredients = $('#inputIngredients').val()
    const steps = $('#inputSteps').val()
    const portion = $('#inputPortion').val()
    const cooking_time = $('#inputCookingTime').val()
    const type = $('inputType').val()
    $.ajax({
        url : port + 'recipes',
        method : 'post',
        data : {
            name,
            ingredients,
            steps,
            portion,
            cooking_time,
            type
        }
    })
    .done(data => {
        myrecipe()
    })
    .fail(err => {
        console.log(err);
    })
}

function showRecipe(){
    $('#main-page').hide()
    $('#show-data-recipe').show()
    recipeById()
}


function recipeById(id) {
    $.ajax({
        url : port + "recipes/" + id,
        method : "get",
        headers : {
            access_token : localStorage.getItem('access_token')
        }
    })
    .done(data => {
       $('#show-data-recipe').append(`
       <div class="card">
       <div class="card-title text-center"> 
         <h1> ${data.name} </h1> 
       </div>
       <div class="card-body">
         <table class="table table-borderless">
           <tr>
             <th>Ingredients</th>
             <td>${data.ingredients}</td>
           </tr>
           <tr>
             <th>Steps</th>
             <td>${data.steps}</td>
           </tr>
           <tr>
             <th>Portion</th>
             <td>${data.portion}</td>
           </tr>
           <tr>
             <th>Cooking Time</th>
             <td>${data.cooking_time}</td>
           </tr>
           <tr>
             <th>Type</th>
             <td>${data.type}</td>
           </tr>
         </table>
       </div>
       <div class="card-footer">
         <a class="btn btn-primary" id="btn-back" onclick ="mainPage()">Back To Home</a>
       </div>  
     </div>   
    `) 
    })
    .fail(err => {
        console.log(err)
    })
}

function onSignIn(googleUser) {
    var google_access_token = googleUser.getAuthResponse().id_token
    $.ajax({
        method: 'POST',
        url: baseURL + '/loginGoogle',
        data: {google_access_token}
    })
    .done(res => {
        localStorage.setItem('access_token', res.access_token)
        $('#emaillogin').val('')
        $('#passwordlogin').val('')
        checkauth()
    })
    .fail(err => {
        console.log(err)
    })
}