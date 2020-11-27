$(document).ready(function(){
    if(!localStorage.getItem('access_token')){
      loginPage()
      $("#home-nav").hide()
   
    } else {
      mainPage()
    }

    $('#link-register').on('click', () => {
      register()
    })
    $('#btn-logout').on('click', () => {
      logout()
    })
    $('#form-login').on('submit', (e) => {
      e.preventDefault()
      login()
    })
    $('#form-regist').on('submit', (e) => {
      e.preventDefault()
      signup()
    })
    // $('#findRestaurants').on('click', () => {
    //   restaurantPage()
    // })
    // $('#showMyRecipe').on('click', () => {
    //   myrecipe()
    // })
    // $('#healthyFood').on('click', () => {
    //   healthyFoodList()
    // })
    // $('#othersRecipe').on('click', () => {
    //   otherRecipe()
    // })
    $('#form-create-recipe').on('submit', (e) => {
      e.preventDefault()
      createRecipe()
    })
    $('#form-search-edamamme').on('submit', (e)=>{
      e.preventDefault()
      fetchDataHealthyFood()
    })
    // $('#othersRecipe').on('click', () => {
    //   otherRecipe()
    // })
    // $('#othersRecipe').on('click', () => {
    //   otherRecipe()
    // })
  })