let port = 'http://localhost:3000/'

// ---- Restaurant from Zomato
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

//---- HealthyFood from Edammam
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
    const food = $('#searchFood').val()
    $.ajax({
        url : port + "edamam",
        method : "POST",
        headers : {
            access_token : localStorage.getItem("access_token")
        },
        data:{
            food
        }
    })
    .done(data =>{
        console.log(data.hits);
        $('#edammame-list').empty()
        data.hits.forEach((e)=>{
            $('#edammame-list').append(`
                <div class = "col mb-4">
                    <div class="card" style="width: 20rem;">
                        <div class="card-header bg-secondary">
                        <h5 class="card-title text-center">${e.recipe.label}</h5>
                        </div>
                        <div class="card-body">    
                            <img src="${e.recipe.image}" style="height: 200px;" class="card-img-top" alt="...">
                            <table class="table table-borderless">
                                <th>Diet</th>
                                <td>${e.recipe.dietLabels}</td>  
                            </tr>
                            <tr>
                                <th>Health</th>
                                <td>${e.recipe.healthLabels}</td> 
                                
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
    .always(_ => $('#searchFood').val(""))
}

//--- Others Recipe from MealDB
function othersRecipePage(){
    $("#login-page").hide()
    $("#regist-page").hide()
    $("#list-page").hide()
    $("#btn-logout").show()
    $('#show-data-recipe').hide()
    $('#my-recipe').hide()
    $('#zomato-page').hide()
    $('#edammame-page').hide()
    $('#meal-db-page').show()
    fetchDataOthersRecipe()
}
function fetchDataOthersRecipe(){
    $.ajax({
        url : port + "mealDB",
        method : "GET",
        headers : {
            access_token : localStorage.getItem("access_token")
        }
    })
    .done(data => {
        let dataMeal = data.meals[0]
        let ingredients = []
        for(const key in dataMeal){
            if(key.includes('strIngredient') && dataMeal[key]) ingredients.push(dataMeal[key])
        }
        console.log(ingredients.join(', '), '<<< hasil ingredients');
        console.log(data.meals[0]);
        $('#meal-db-list').append(`
        <div class = "col mb-4">
        <div class="card" >
        <div class="card-header bg-info">
            <h5 class="card-title text-center">${data.meals[0].strMeal}</h5>
        </div>
        <div class="card-body">
            <img src="${data.meals[0].strMealThumb}" style="height: 400px;" class="card-img-top" alt="...">
            <table class="table table-borderless">
                <tr>
                    <th>Ingredients</th>
                    <td>${ingredients.join(', ')}</td> 
                </tr>
                <tr>
                <th>Instructions</th>
                <td>${data.meals[0].strInstructions}</td> 
                </tr>
            </table>
        </div>

          <div class="card-footer">
            <a class="btn mr-sm-2 btn-primary"  tabindex="-1" aria-disabled="true" id="btn-meal" onclick="othersRecipePage()">Other Recipe</a>
          </div>
        </div>
      </div>

        
        `)
    })
    .fail(xhr => console.log(xhr))
}


function mainPage() {
    $("#login-page").hide()
    $("#regist-page").hide()
    $('#list-page').show()
    $("#btn-logout").show()
    $('#show-data-recipe').hide()
    $('#my-recipe').hide()
    $('#zomato-page').hide()
    $('#edammame-page').hide()
    $('#meal-db-page').hide(); $('#home-nav').show()
    console.log(localStorage.getItem('access_token'));
}

function loginPage(){
    $("#regist-page").hide(); $("#login-page").show();
    $("#btn-logout").hide()
    $('#main-page').hide(); $('#home-nav').hide();
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
        Swal.fire(
            'Welcome!',
            'Welcome to the Recipe App',
            'success'
        )
    })
    .fail(err => {
        console.log(err)
        Swal.fire(
            'Error!!!',
            'Wrong email/password',
            'error'
        )
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
        Swal.fire(
            'Good job!',
            'Please log in!',
            'success'
        )
    })
    .fail(err => {
        console.log(err)
        Swal.fire(
            'Error!!!',
            'Password must be more than 6 characters',
            'error'
        )
    })
}

function logout(){
    localStorage.clear()
    loginPage()
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}




// ---- My Recipe
function myRecipePage(){
    $("#login-page").hide()
    $("#regist-page").hide()
    $("#list-page").hide()
    $("#btn-logout").show()
    $('#show-data-recipe').hide()
    $('#my-recipe').show()
    $('#zomato-page').hide()
    $('#edammame-page').hide()
    $('#meal-db-page').hide()
    // $('#show-data-recipe').hide()
    fetchRecipe()
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
        $('#recipe-list').empty()
        data.forEach(recipe => {
            $('#recipe-list').append(`
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
                    <button type="button" class="btn btn-primary" id="btn-show" onclick = "recipeById(${recipe.id})">Show</button>
                    <button type="button" class="btn btn-danger" id="btn-delete" onclick = "deleteRecipe(${recipe.id})">Delete</button>
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

function createRecipe() {
    const name = $('#inputName').val()
    const ingredients = $('#inputIngredients').val()
    const steps = $('#inputSteps').val()
    const portion = $('#inputPortion').val()
    const cooking_time = $('#inputCookingTime').val()
    const type = $('#inputType').val()
    $.ajax({
        url : port + 'recipes',
        method : 'POST',
        data : {
            name,
            ingredients,
            steps,
            portion,
            cooking_time,
            type
        },
        headers : {
            access_token : localStorage.getItem('access_token')
        }
    })
    .done(data => {
        myRecipePage()
    })
    .fail(err => {
        console.log(err);
    })
    .always(_ =>{
        // $('#create-recipe').trigger('reset')
        const name = $('#inputName').val("")
        const ingredients = $('#inputIngredients').val("")
        const steps = $('#inputSteps').val("")
        const portion = $('#inputPortion').val("")
        const cooking_time = $('#inputCookingTime').val("")
        const type = $('#inputType').val("")
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
    .done(data => {
       myRecipePage();
    })
    .fail(err => {
        console.log(err);
    })
}

function recipeById(id) {
    myRecipePage()
    // $('#container-create-show').hide()
    $('#show-data-recipe').show()
    $.ajax({
        url : port + "recipes/" + id,
        method : "get",
        headers : {
            access_token : localStorage.getItem('access_token')
        }
    })
    .done(data => {
        $('#show-data-recipe').empty()
        $('#show-data-recipe').append(`
            <div class="card">
                <div class="card-title text-center text-danger"> 
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
        url: port + 'loginGoogle',
        data: {google_access_token}
    })
    .done(res => {
        localStorage.setItem('access_token', res.access_token)
        mainPage()
        Swal.fire(
            'Welcome!',
            'Welcome to the Recipe App',
            'success'
        )
    })
    .fail(err => {
        console.log(err)
    })
}