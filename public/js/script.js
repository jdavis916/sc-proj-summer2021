console.log("Script file connected");
//changes login button to log out
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    /* if(!loggedIn){
    	document.getElementById('#btnProf').style.visibility = "hidden";
    } */
	document.querySelector('#btnLogout').onclick = function logout(){
		if(loggedIn){
			this.innerHTML = 'Logout';
		//true
		   location.replace('/logout');
		} else{
		//false
			this.innerHTML = 'Sign in';
			location.replace('/login');
		}
	}

	/* document.querySelector('#btnProf').onclick = function {
		location.replace('/profile');
	} */
});