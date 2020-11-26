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
  })