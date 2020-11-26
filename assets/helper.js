let port = 'http://localhost:3000/'

function loginPage(){
    $("#regist-page").hide()
    $("#btn-logout").hide()
}

function register(){
    $("#login-page").hide()
    $("#regist-page").show()
}

function login() {
    const email = $("#loginEmail").val()
    const password = $("#loginPassword").val()
    $.ajax({
        url : port + 'login/',
        method : 'post',
        data : {
            email,
            password
        }
    })
    .done(data => {
        let access_token = localStorage.setItem("access_token", data)
        console.log(access_token);
    })
    .fail(err => {
        console.log(err)
    })
}

function signup(){
    const username = $("#registUsername").val()
    const email = $("#registEmail").val()
    const password = $("#registPassword").val()
    $.ajax({
        url : port + 'signup/',
        method : 'post',
        data : {
            username,
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
}

function fetchRecipe(){
    $.ajax({
        url : "",
        method : "get",
        headers : {
            access_token : localStorage.getItem('access_token')
        }
    })
    .done(data => {
        data.forEach(recipe => {
            $('#mainhome').append(``)
        });
    })
    .fail(err => {
        console.log(err)
    })
}