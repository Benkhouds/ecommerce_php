const hamburger = document.querySelector('.hamburger') ,
mobileNav= document.querySelector('.mobile-nav');


hamburger.addEventListener('click' , ()=>{

       hamburger.classList.toggle('active'); 
       mobileNav.classList.toggle('active');
})