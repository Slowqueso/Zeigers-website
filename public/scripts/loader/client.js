const body = document.querySelector('body');
const loader = document.querySelector('#loader');
loader.style.display = 'none';
setTimeout(()=>{
    loader.style.display = 'flex';
},50)

body.style.overflow = 'hidden';
window.onload = (e) =>{
    setTimeout(()=>{
        body.style.overflow = 'scroll';
        loader.style.display = 'none';
    },1000)
}