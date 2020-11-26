$(document).ready(function(){
    if(!localStorage.getItem('access_token')){
      loginPage()
    } else {
      mainPage()
    }

    $('#link-register').on('click', () => {
      register()
    })
    $('#btn-logout').on('click', () => {
      logout()
    })
    $('#form-login').on('submit', () => {
      mainPage()
    })
    $('#form-regist').on('submit', () => {
      loginPage()
    })
    $('#findRestaurants').on('click', () => {
      restaurantPage()
    })
    // $('#showMyRecipe').on('click', () => {
    //   myrecipe()
    // })
    $('#healthyFood').on('click', () => {
      healthyFoodList()
    })
    $('#othersRecipe').on('click', () => {
      otherRecipe()
    })
    $('#form-create-recipe').on('submit', () => {
      myrecipe()
    })
    // $('#othersRecipe').on('click', () => {
    //   otherRecipe()
    // })
    // $('#othersRecipe').on('click', () => {
    //   otherRecipe()
    // })
  })