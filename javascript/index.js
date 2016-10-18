var sideBar = document.querySelector('.js-playlist');
sideBar.innerHtml = localStorage.getItem("storage");


// 1. Search for soundcloud

var UI = {};																		//creates ui object

UI.enterPress = function(){															//fires when enter is pressed

	document.querySelector(".js-search").addEventListener('keyup', function(e){		//selects and listen to text box
	if (document.querySelector('.search-results').innerHTML !== " "){				//if the page is already full (a search has already been done prior) clear it
		document.querySelector('.search-results').innerHTML = " ";
		}
	var input = document.querySelector("input").value;								//grabs user input from textbox
	
	if(e.which === 13){																//if the key enter is pressed
		soundCloudAPI.getTrack(input);												//push input to .getTrack
		
	}
	
});
}

UI.enterPress();																	//calls function to listen to the enter key


UI.SubmitClick = function(){														//fires when the textbox is clicked is pressed
	document.querySelector(".js-search").addEventListener('click', function(){		//listens if textbox is clicked
		if (document.querySelector('.search-results').innerHTML !== " "){			//clears results if there were pre-existing
		document.querySelector('.search-results').innerHTML = " ";
		}
	var input = document.querySelector("input").value;								//grabs the input the user typed in
	soundCloudAPI.getTrack(input);													//pushes the input to getTrack
});
	
}

UI.SubmitClick();          															//calls function to listen to textbox click


// 2. query sound cloud api

var soundCloudAPI = {};																//creates soundcloud api object

soundCloudAPI.init = function(){													//this code is grabbed from the SoundCloud api
	SC.initialize({
  		client_id: '195d273fb18f4a9a75ebda65c1aa2631'
	});
}

soundCloudAPI.init();																//calls the function


// find all sounds of buskers licensed under 'creative commons share alike'

soundCloudAPI.getTrack = function(inputValue){										//takes user input as an argument
	SC.get('/tracks', {
  		q: inputValue
	}).then(function(tracks) {														
  	soundCloudAPI.renderTrack(tracks);												
	});

}


// 3. Display the cards

soundCloudAPI.renderTrack = function(tracks){

	tracks.forEach(function(track){


		var card = document.createElement('div');
		card.classList.add("card");

		var image = document.createElement('div');
		image.classList.add("image");

		var image_img = document.createElement('img');
		image.classList.add("image_img");
		image_img.src = track.artwork_url || 'soundcloud_logo_0.png';

		var content = document.createElement('div');
		content.classList.add('content');

		var header = document.createElement('div');
		header.classList.add('header');
		header.innerHTML = '<a href = "' + track.permalink_url + '" target = "_blank">'+ track.title +  '"</a>'

		var link = document.createElement('a');
		link.classList.add('link');

		var button = document.createElement('div');
		button.classList.add('button', 'ui', 'attached', 'js-button');
		

		var i = document.createElement('i');
		i.classList.add('icon');
		i.classList.add('add');

		var buttonText = document.createElement('span');
		buttonText.innerHTML = 'Add to Playlist';

		image.appendChild(image_img);
		card.appendChild(image);

		header.appendChild(link);
		content.appendChild(header);
		card.appendChild(content);

		button.appendChild(i);
		button.appendChild(buttonText);

		button.addEventListener('click', function(){
			soundCloudAPI.getEmbed(track.permalink_url);							//when button is clicked, the url for that track will fire into .getEmbed
		});

		card.appendChild(button);

		var searchResults = document.querySelector('.js-search-results');
		searchResults.appendChild(card);

	});
}


soundCloudAPI.getEmbed =  function(trackURL){										//code from soundCloud Api to play track
	SC.oEmbed(trackURL, {
	  auto_play: true
	}).then(function(embed){


	var sideBar = document.querySelector('.js-playlist');							//selects side bar where the widget will display

	
	var box = document.createElement('div');
	box.innerHTML = embed.html;														//creates a box that contains the widget

	sideBar.insertBefore(box, sideBar.firstChild);									//places each new box before the others

	localStorage.setItem("key", sideBar.innerHTML);
	localStorage.setItem("storage", sideBar.innerHTML);
	console.log(localStorage.getItem("storage"));

	});



}


var sideBar = document.querySelector('.col-left');
sideBar.innerHtml = localStorage.getItem("storage");










// 4. add the playlist and play 