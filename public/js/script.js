console.log("Script file connected");
//changes login button to log out
window.addEventListener('DOMContentLoaded', (event) => {
	//var  profPic = {{profPic}};
    console.log('DOM fully loaded and parsed');
    console.log('profile pic: ' + profPic)
    /* if(!loggedIn){
    	document.getElementById('#btnProf').style.visibility = "hidden";
    } */
	document.querySelector('#btnLogout').onclick = function logout(){
		console.log('clicked logout');
		if(loggedIn){
			//this.innerHTML = 'Logout';
		//true
			console.log('logged in is true');
		   location.replace('/users/logout');
		} else{
		//false
			//this.innerHTML = 'Sign in';
			location.replace('/login');
		}
	}
	//console.log(active);
	var prof = document.getElementsByClassName('profPic');
	if(prof){
		prof[0].style.backgroundImage = `url(${profPic})`;
		//prof[0].style.backgroundSize = 'cover';
		console.log('profile pic rendered');
	}
	/* document.querySelector('#btnProf').onclick = function {
		location.replace('/profile');
	} */
});
//click to enable profile edit
if(document.getElementsByClassName('settingsProfile')){
	document.querySelector('#profEdit').onclick = function(){
		document.querySelector('#profileDetails').classList.add('d-none');
		document.querySelector('#profileEdit').classList.remove('d-none');
		
	}
	document.querySelector('#cancel').onclick = function(){
		document.querySelector('#profileDetails').classList.remove('d-none');
		document.querySelector('#profileEdit').classList.add('d-none');
		
	}
}
