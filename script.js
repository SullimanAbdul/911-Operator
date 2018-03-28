window.onload = function(){
	alert('si vous êtes sur ce site via github je vous conseille de le télécharger le dossier et de l installer dans votre wamp');
        var styles = {
            'monTheme': [
             {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{visibility : 'off'}]},
            {elementType: 'labels.text.fill', stylers: [{visibility : 'off'}]},
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
        ]}; 

        var mapOptions = {
            zoom: 13,
            center: new google.maps.LatLng(48.86,2.33),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true,
			scrollwheel: false,
            mapTypeId: 'monTheme'
        }
        var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
        var styledMapType = new google.maps.StyledMapType(styles['monTheme'], {name: 'monTheme'});
        map.mapTypes.set('monTheme', styledMapType);
		map.setOptions({draggable: false});
        
		var police = new google.maps.Marker({
            position: {lat: 48.866667, lng: 2.333333},
            map: map,
			icon: 'img/police.png',
            title: 'POLICIER',
			
        });
		var pompier = new google.maps.Marker({
            position: {lat: 48.836667, lng: 2.349999},
            map: map,
			icon: 'img/pompier.png',
            title: 'POMPIER'
        });
		var ambulance = new google.maps.Marker({
            position: {lat: 48.889667, lng: 2.373333},
            map: map,
			icon: 'img/ambulance.png',
            title: 'AMBULANCIER'
        });

		var info = new google.maps.InfoWindow({
				content : 'Police à vos ordres!'
			});
		var directionsServicePolice = new google.maps.DirectionsService();
		var directionsDisplayPolice = new google.maps.DirectionsRenderer({ 'map': map });
		var directionsServicePompier = new google.maps.DirectionsService();
		var directionsDisplayPompier = new google.maps.DirectionsRenderer({ 'map': map });
		var directionsServiceAmbulance = new google.maps.DirectionsService();
		var directionsDisplayAmbulance = new google.maps.DirectionsRenderer({ 'map': map });
		var urgence_marker = police;
		var urgence_serv =  directionsServicePolice;
		var urgence_disp = directionsDisplayPolice;
		var deplacementPolice = 0;
		var deplacementPompier = 0;
		var deplacementAmbulance = 0;
		
		police.addListener('click', function(){
			info.setContent('Police à vos ordres!');
			info.open(map, police);
			urgence_marker = police;
			urgence_serv =  directionsServicePolice;
			urgence_disp = directionsDisplayPolice;
		});
		pompier.addListener('click', function(){
			info.setContent('Pompier prêt à agir!');
			info.open(map, pompier);
			urgence_marker = pompier;
			urgence_serv =  directionsServicePompier;
			urgence_disp = directionsDisplayPompier;
		});
		ambulance.addListener('click', function(){
			info.setContent('Ambulancier à la rescousse!');
			info.open(map, ambulance);
			urgence_marker = ambulance;
			urgence_serv =  directionsServiceAmbulance;
			urgence_disp = directionsDisplayAmbulance;
		});
		
		map.addListener('click', function(e) {
			info.close();
			if(urgence_marker.title == 'POLICIER' && deplacementPolice == 0){
				deplacementPolice =1;
				
				GO_TO(e.latLng, map);
			}else if( urgence_marker.title == 'AMBULANCIER'&& deplacementAmbulance == 0){	
				deplacementAmbulance= 1;
				GO_TO(e.latLng, map);
			}else if(urgence_marker.title == 'POMPIER'&&deplacementPompier == 0){
				deplacementPompier = 1
				GO_TO(e.latLng, map);
			}
		});

		function GO_TO(latLng, map) {
			var request = {
				origin : urgence_marker.position,
				destination: latLng,
				travelMode : google.maps.DirectionsTravelMode.DRIVING,
				unitSystem: google.maps.DirectionsUnitSystem.METRIC
			};

			urgence_serv.route(request, function(response, status) {
				if (status == google.maps.DirectionsStatus.OK) {
					var coloris = 'blue';
					if (urgence_marker.getTitle() == 'POMPIER')
						coloris = 'red';
					if (urgence_marker.getTitle() == 'AMBULANCIER')
						coloris = 'white';
					//urgence_disp.setDirections(response);
					urgence_disp.setOptions({'suppressMarkers':true});
					urgence_disp.setOptions({polylineOptions:{strokeColor: coloris}, preserveViewport: true});
					var lineSymbol = {
						path: google.maps.SymbolPath.CIRCLE,
						scale: 8,
						strokeColor: coloris
						};

					var polyline = new google.maps.Polyline({
					path: [],
					 icons: [{
						icon:lineSymbol,
						offset: '100%'
						}],

					strokeColor: coloris,
					strokeWeight: 3
				});
				var speed = 0
				var bounds = new google.maps.LatLngBounds();
				var legs = response.routes[0].legs;
				for (i = 0; i < legs.length; i++) {
					var steps = legs[i].steps;
					for (j = 0; j < steps.length; j++) {
						
						var nextSegment = steps[j].path;
						for (k = 0; k < nextSegment.length; k++) {
							speed++;
							polyline.getPath().push(nextSegment[k]);
							bounds.extend(nextSegment[k]);
						}
					}
				}
				polyline.setMap(map);
				urgence_marker.set('map',null);
				
				animateCircle(polyline,request,speed);
				} else {
					window.alert('Directions request failed due to ' + status);
		}	
			});
		}
		function animateCircle(line, request, speed) {
          var count = 0;
		  var tmp = urgence_marker;
          window.setInterval(function() {
            count = (count + 1) % 200;

            var icons = line.get('icons');
			if(icons != null){
            icons[0].offset = (count / 2) + '%';
            line.set('icons', icons);
			if(count == 0){
				line.set('icons',null);
				line.setMap(null);
				tmp.set('position',request.destination);
				tmp.set('map',map);
				modifPos(tmp);
				if(tmp.title == 'POLICIER'){
					deplacementPolice = 0;
				}
				if(tmp.title == 'POMPIER'){
					deplacementPompier = 0;
				}
				if(tmp.title == 'AMBULANCIER'){
					deplacementAmbulance = 0;
				}
			}
			}
        }, speed*0.07);
      }

	  function modifPos(marker){
			var dataString = "nom="+marker.title+"&Latitude="+marker.position.lat()+"&Longitude="+marker.position.lng(); //il faut juste changer le nom du marker 'attentat' & 'attentat.position' etc...

			$.ajax({
			type: "POST",
			url: "php/updategentil.php",
			data: dataString,
			
			});
		}
		modifPos(police);
		modifPos(pompier);
		modifPos(ambulance);
	  
	  
	  
	  
	  
	  
	  
	  //Partie ENNEMIE
	  var incendie = new google.maps.Marker({
            position: {lat: 48.854922, lng: 2.385518},
            map:null,
			draggable : false,
			icon : "img/fire.png",
			title:'Incendie'
        });
		var meurtre = new google.maps.Marker({
            position: {lat: 48.835943, lng: 2.316854},
            map: null,
			draggable : false,
			icon : "img/meurtre.png",
            title: 'Meurtre'
        });
		var malaise = new google.maps.Marker({
            position: {lat: 48.873893, lng: 2.389638},
            map: null,
			draggable : false,
			icon : "img/malaise.png",
            title: 'Malaise'
        });
		
		var accident = new google.maps.Marker({
            position: new google.maps.LatLng(48.874797,2.314107),
            map: null,
			draggable : false,
			icon : "img/accident.png",
            title: 'Accident',
			
        });
		var attentat = new google.maps.Marker({
            position: {lat: 48.857632, lng: 2.347066},
            map: null,
			draggable : true,
			icon : "img/dead.png",
            title: 'Attentat'
        });
		
          // Add the circle for this city to the map.
          var incendieCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: 'grey',
            fillOpacity: 0.35,
            map: null,
			clickable : false,
            center: incendie.position,
            radius:500
          });
		  incendieCircle.bindTo('center', incendie, 'position');
		  var meurtreCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
			clickable : false,
            fillColor: 'grey',
            fillOpacity: 0.35,
            map: null,
            center: meurtre.position,
            radius: 500
          });
		  meurtreCircle.bindTo('center', meurtre, 'position');
		  var malaiseCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
			clickable : false,
            fillColor: 'grey',
            fillOpacity: 0.35,
            map: null,
            center: malaise.position,
            radius: 300
		
          });
		  malaiseCircle.bindTo('center',malaise,'position');
		  var accidentCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
			clickable : false,
            fillColor: 'grey',
            fillOpacity: 0.35,
            map: null,
            center: accident.position,
            radius: 400
          });
		  accidentCircle.bindTo('center',accident,'position');
		  var attentatCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: 'grey',
            fillOpacity: 0.35,
            map: null,
            center: attentat.position,
            radius: 1000,
			clickable : false
          });
		  attentatCircle.bindTo('center',attentat,'position');
	  
	  //Fonction qui va recuperer la pos des cercles dans la base de données
		window.setInterval(function(){
			
			$.ajax({
				type: "POST",
				url: "php/posEnnemi.php",
				datatype: 'JSON',
				success: function (tableauPos) {
				var t= JSON.parse(tableauPos);
				$latI = (t[0]["Latitude"]);
				$lngI = (t[0]["Longitude"]);
				$latMeu = (t[1]["Latitude"]);
				$lngMeu = (t[1]["Longitude"]);
				$latMal = (t[2]["Latitude"]);
				$lngMal = (t[2]["Longitude"]);
				$latAcc = (t[3]["Latitude"]);
				$lngAcc = (t[3]["Longitude"]);
				$latAtt = (t[4]["Latitude"]);
				$lngAtt = (t[4]["Longitude"]);
				
				$lI = parseFloat($latI);
				$lnI = parseFloat($lngI);
				
				$lMeu = parseFloat($latMeu);
				$lnMeu = parseFloat($lngMeu);
				
				$lMal = parseFloat($latMal);
				$lnMal = parseFloat($lngMal);
				
				$lAcc = parseFloat($latAcc);
				$lnAcc = parseFloat($lngAcc);
				
				$lAtt = parseFloat($latAtt);
				$lnAtt = parseFloat($lngAtt);
				if($lI != incendie.position.lat()&&$lnI != incendie.position.lng()){
					info.setContent("Incendie déclaré : les pompiers sont requis");
					incendie.setPosition(new google.maps.LatLng($lI,$lnI));
					incendie.set('map',map);
					incendieCircle.setMap(map);
					info.open(map,incendie);
					incendieCircle.setOptions({fillColor:'#FF0000'});
				}
				if($lMeu != meurtre.position.lat()&&$lnMeu != meurtre.position.lng()){
					info.setContent("Meurtre signalé : envoyez la Police");
					
					meurtre.setPosition(new google.maps.LatLng($lMeu,$lnMeu));
					meurtre.set('map',map);
					meurtreCircle.setMap(map);
					info.open(map,meurtre);
					meurtreCircle.setOptions({fillColor:'#FF0000'});
				}
				if($lMal != malaise.position.lat()&&$lnMal!= malaise.position.lng()){
					info.setContent("Malaise détecté : on a besoin d'une ambulance");
					
					malaise.setPosition(new google.maps.LatLng($lMal,$lnMal));
					malaise.set('map',map);
					malaiseCircle.setMap(map);
					info.open(map,malaise);
					malaiseCircle.setOptions({fillColor:'#FF0000'});
				}
				
				if($lAcc != accident.position.lat()&&$lnAcc!= accident.position.lng()){
					info.setContent("Accident détecté : La police et l'ambulance sont requis");
					
					accident.setPosition(new google.maps.LatLng($lAcc,$lnAcc));
					accident.set('map',map);
					accidentCircle.setMap(map);
					info.open(map,accident);
					accidentCircle.setOptions({fillColor:'#FF0000'});
				}
				if($lAtt != attentat.position.lat()&&$lnAtt!= attentat.position.lng()){
					info.setContent("Attentat déclaré : toutes les unités sont requises");
					
					attentat.setPosition(new google.maps.LatLng($lAtt,$lnAtt));
					attentat.set('map',map);
					attentatCircle.setMap(map);
					info.open(map,attentat);
					attentatCircle.setOptions({fillColor:'#FF0000'});
				}
				
				isIn();
			}
			})
			
		},1000);
		
		
		function isIn(){
			if(incendieCircle.getBounds().contains(pompier.position)){
				incendie.set('map',null);
				incendieCircle.setMap(null);
				return true;
			}
			if(meurtreCircle.getBounds().contains(police.position)){
				meurtre.set('map',null);
				meurtreCircle.setMap(null);
				return true;
			}
			if(malaiseCircle.getBounds().contains(ambulance.position)){
				malaise.set('map',null);
				malaiseCircle.setMap(null);
				return true;
			}
			if(accidentCircle.getBounds().contains(ambulance.position)&&accidentCircle.getBounds().contains(police.position)){
				accident.set('map',null);
				accidentCircle.setMap(null);
				return true;
			}
			if(attentatCircle.getBounds().contains(ambulance.position) && attentatCircle.getBounds().contains(police.position)&&attentatCircle.getBounds().contains(pompier.position)){
				attentat.set('map',null);
				attentatCircle.setMap(null);
				return true;
			}
		
		}
		/*function verifGagnant(){
			$.ajax({
				type: "POST",
				url: "gagnant.php",
				datatype: 'JSON',
				success: function (tableauGagnant) {
				//alert(JSON.stringify(tableauGagnant));
				if(JSON.stringify(tableauGagnant) != ""){
				
					var tab= JSON.parse(tableauGagnant);
					
					if(tab[0]["nomGagnant"] == "gentil"){
						alert("Bravo vous avez sauvé Paris ! ");
					}else{
						alert("Dommage, Paris est dévastée");
						
					}
					window.open("index.html");
				}
				
			}
			})
		
		}*/
		
}
