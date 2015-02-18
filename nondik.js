var txarra 		= "img/0.png",
	kaxkarra 	= "img/1.png",
	ona 		= "img/2.png",
	osoona 		= "img/3.png",
	stream 		= "img/4.png",
	hasiHemen	= [43.319, -1.979], // aldatu zure beharretara
	zooma 		= 12, // aldatu zure beharretara
	nondik 		= "http://ttanttakun.org/nondik/", // hau baita ere
	editing 	= false;

var contentString = '<div id="nondik-form"> <form action="'+nondik+'nondik.php" method="post"><p>Kalitatea aukeratu mesedez. Internet bidez entzuten badezute aukeratu <i>Internet bidez</i>.</p><select id="nondik-kalitatea" name="kalitatea"><optgroup label="Irratia"><option value="0">Oso txarra</option><option value="1">Kaxkarra</option><option value="2">Ona</option><option value="3">Oso ona</option></optgroup><optgroup label="Internet"><option value="4">Internet bidez</option></optgroup></select><p><input type="hidden" id="latitudea" name="latitudea" value="lol" ><input type="hidden" id="longitudea" name="longitudea" value="lol" ><input type="submit" value="Bidali" class="awesome green" \/></p></form></div>';

var infowindow = new google.maps.InfoWindow({
    content: contentString,
    maxWidth: 200
});


function hasi() {
    var latlng = new google.maps.LatLng(hasiHemen[0],hasiHemen[1]);
    var aukerak = {
      zoom: zooma,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("map_canvas"), aukerak);

   	google.maps.event.addListener(map, 'click', function(event) {
		if(!getCookie("nondik") && editing){
    		placeMarker(event.latLng, map);
		}
  	});
	  
   	marraztuPuntuak(map);

	var botoiaSortu = '<a onclick="setEditing()" id="gehitu-botoia" class="awesome large green">JARRI PUNTUA</a>';
	var dagoenekoSortuta = '<a id="gehitu-botoia" class="awesome large red">DAGOENEKO JARRI DUZU</a>';
	
	if(!getCookie("nondik")){
		$('#jarripuntua').html(botoiaSortu);
	} else {
		$('#jarripuntua').html(dagoenekoSortuta);
	}

}


function placeMarker(location, map) {
	var clickedLocation = new google.maps.LatLng(location);
	var marker = new google.maps.Marker({
    	position: location, 
    	map: map
	});

	infowindow.open(map,marker);

	$('[name=latitudea]').val(marker.getPosition().lat());
	$('[name=longitudea]').val(marker.getPosition().lng());
}


function marraztuPuntuak(map){
	$.getJSON('nondik.json', function(data) {
		$.each(data, function(key, val) {

		  	switch(val.kalitatea){
		  		case '0':
		  			ikon = txarra;
		  			break;
		  		case '1':
		  			ikon = kaxkarra;
		  			break;
		  		case '2':
		  			ikon = ona;
		  			break;
		  		case '3':
		  			ikon = osoona;
		  			break;
		  		case '4':
		  			ikon = stream;
		  			break;
		  	}

			var ll = new google.maps.LatLng(val.lat,val.lng);
			
			var newmarker = new google.maps.Marker({
				position: ll, 
				icon: ikon,
				map: map
			});
		});
	});
}

function setEditing() {
	if(getCookie("nondik")){
		alert('Dagoeneko jarri duzu egunekoa!');
	} else {
		if(!editing){
			editing = true;
			alert('Klikatu mapan marka jarri nahi duzun tokian!');
		} else {
			editing = false;
		}	
	}
}

function getCookie(c_name) {
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++){
		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
		if (x==c_name) {
			return unescape(y);
		}
	}
}

