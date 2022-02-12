const start_game = document.querySelector('#start_game');
const hangingTN = document.getElementById('hangingTN');
start_game.addEventListener('click', ()=>{
    console.log('huh');
    hangingTN.style.animation = 'pop-up 2.3s ease-out';
    setTimeout(()=>{
        hangingTN.style.display = 'none';
        document.location.reload();
    },2000);
})