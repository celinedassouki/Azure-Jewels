$(document).ready(function(){
    $(function () {
      $(document).scroll(function () {
          $navv = $(".nav")
          $navv.toggleClass('scrolled', $(this).scrollTop() > $navv.height())
        })
    })
  
    let navigation=document.getElementById('navbar')
  document.getElementById('hamburger').addEventListener('click',()=>{
      navigation.classList.toggle('show')    
  })
  let x=document.getElementById('hamburger')
  document.getElementById("hamburger").addEventListener("click", function () {
    x.classList.toggle("hamclicked")
  })
  })