const body = document.querySelector('body');
const loader = document.querySelector('#loader');
loader.style.display = 'none';
setTimeout(()=>{
    loader.style.display = 'flex';
},50)
window.onload = (e) =>{
    body.style.overflow = 'hidden';
    setTimeout(()=>{
        body.style.overflow = 'scroll';
        loader.style.display = 'none';
    },2600)
}