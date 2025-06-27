
  document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');
    //const searchBar = document.querySelector('.search-bar');
    //const search = document.querySelector('.search');
    const header = document.querySelector('header');
    
    var abierto=false;
    menuIcon.addEventListener('click', function () {
        if(abierto){
            //search.append(header);
          // header.appendChild(search);
           
            abierto=false;
        }
        else{
            abierto=true;
         
           // navLinks.appendChild(search);
        }
      navLinks.classList.toggle('show');
      
    });
  });
  var mostrando=false;
  function mostrar(){
    var xd=  document.getElementById("sub2");
    if(mostrando){
        xd.style.display="none";
        mostrando=false;
    }
    else{
       
  xd.style.display="block";
mostrando=true;
    }
   



 }