
 const form = document.querySelector('form');
 const errorText = document.getElementById('error-text')
 form.addEventListener('submit', async (e) => {
   e.preventDefault();


   //reset error
   errorText.textContent = ''


   // get values
   const phone = form.mobile.value;
   const password = form.password.value;
   try {
     const res = await fetch('/api/login', { 
       method: 'POST', 
       body: JSON.stringify({ phone, password }),
       headers: {'Content-Type': 'application/json'}
     });
     const data = await res.json();
     if(data.error){
         errorText.textContent = data.error
     }
     if(data.user){
         location.assign('/Home')
     }
   }
   catch (err) {
     console.log(err);
   }
 });