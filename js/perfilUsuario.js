document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");
    Init()
});

function Init(){
    document.querySelector('.toggle-button').addEventListener("click", function() {
  
        document.querySelector('.left-sidebar').classList.toggle('minimize');
      });
      
      document.querySelector('.user-profile').addEventListener('click', function() {
        
        document.querySelector('.left-sidebar').classList.toggle('minimize');
      });
}