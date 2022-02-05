
 const form = document.querySelector('form');
 const errorText = document.getElementById('error-text')
 form.addEventListener('submit', async (e) => {
   e.preventDefault();


   //reset error
   errorText.textContent = ''


   // get values
   const email = form.email.value;
   const name = form.username.value;
   const phone = form.mobilenumber.value;
   const password = form.password.value;
   try {
     const res = await fetch('/api/register', { 
       method: 'POST', 
       body: JSON.stringify({ name,phone,email, password }),
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