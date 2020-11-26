let port = 'http://localhost:3000/'


function restaurantPage() {
    $('#main-page').hide()
    showRestaurant()
}

function showRestaurant() {
    $.ajax({
        url : port + "restaurants/",
        method : "get",
        headers : {
            access_token : localStorage.getItem("access_token")
        }
    })
    .done(data => {
        data.forEach(element => {
            $('#').append(`
            
            `)
        })
    })
    .fail(err => {
        console.log(err)
    })
}

function mainPage() {
    $("#login-page").hide()
    $("#regist-page").hide()
    $('#main-page').show()
    $("#btn-logout").show()
    $('#show-data-recipe').hide()
    $('#my-recipe').hide()
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
        localStorage.setItem("access_token", data)
    })
    .fail(err => {
        console.log(err)
    })
}

function signup(){
    // const username = $("#registUsername").val()
    const email = $("#registEmail").val()
    const password = $("#registPassword").val()
    $.ajax({
        url : port + 'register',
        method : 'post',
        data : {
            // username,
            email,
            password
        }
    })
    .done(data => {
        console.log(data);
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