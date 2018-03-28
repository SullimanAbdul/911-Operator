window.onload = function(){
			
			var cpt_att = 10;
			$("#nbatt").html("Nombre d'attaques restantes : " + cpt_att);
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
        
		
		var incendie = new google.maps.Marker({
            position: {lat: 48.854922, lng: 2.385518},
            map: map,
            title: 'AttaquePompier',
			draggable : true,
			icon : "img/fire.png",
			title:'Incendie'
        });
		var meurtre = new google.maps.Marker({
            position: {lat: 48.835943, lng: 2.316854},
            map: map,
			draggable : true,
			icon : "img/meurtre.png",
            title: 'Meurtre'
        });
		var malaise = new google.maps.Marker({
            position: {lat: 48.873893, lng: 2.389638},
            map: map,
			draggable : true,
			icon : "img/malaise.png",
            title: 'Malaise'
        });
		
		var accident = new google.maps.Marker({
            position: new google.maps.LatLng(48.874797,2.314107),
            map: map,
			draggable : true,
			icon : "img/accident.png",
            title: 'Accident',
			
        });
		var attentat = new google.maps.Marker({
            position: {lat: 48.857632, lng: 2.347066},
            map: map,
			draggable : true,
			icon : "img/dead.png",
            title: 'Attentat'
        });
		

		
		var info = new google.maps.InfoWindow({
				content : 'attaque en cours'
			});
			
		modifPos(incendie);
		modifPos(malaise);
		modifPos(meurtre);
		modifPos(accident);
		modifPos(attentat);
		
		 
          // Add the circle for this city to the map.
          var incendieCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
			clickable : false,
            fillColor: 'grey',
            fillOpacity: 0.35,
            map: map,
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
            map: map,
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
            map: map,
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
            map: map,
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
            map: map,
            center: attentat.position,
            radius: 1000,
			clickable : false
          });
		  attentatCircle.bindTo('center',attentat,'position');
		
		incendie.addListener('dragend',function(){
			info.setContent( 'incendie créé');
			incendieCircle.setOptions({fillColor:'#FF0000'});
			info.open(map,incendie);
				desactiverDraggable();
				modifPos(incendie);
				chrono1(incendie.title);
				gererAttaque(incendie.title);
				
		}
		)
		
		meurtre.addListener('dragend',function(){
			info.setContent( 'Meurtre effectué');
			meurtreCircle.setOptions({fillColor:'#FF0000'});
			info.open(map,meurtre);
				desactiverDraggable();
				modifPos(meurtre);
				chrono1(meurtre.title);
				gererAttaque(meurtre.title);
		}
		)
		
		malaise.addListener('dragend',function(){
			info.setContent( 'Malaise lancé');
			malaiseCircle.setOptions({fillColor:'#FF0000'});
			info.open(map,malaise);
				desactiverDraggable();
				modifPos(malaise);
				chrono1(malaise.title);
				gererAttaque(malaise.title);
		}
		)
		accident.addListener('dragend',function(){
			info.setContent( 'Accident effectué');
			accidentCircle.setOptions({fillColor:'#FF0000'});
			info.open(map,accident);
				desactiverDraggable();
				modifPos(accident);
				chrono1(accident.title);
				gererAttaque(accident.title);
		}
		)
		attentat.addListener('dragend',function(){
				info.setContent( 'Attentat lancé');
				attentatCircle.setOptions({fillColor:'#FF0000'});
				info.open(map,attentat);
				desactiverDraggable();
				modifPos(attentat);
				chrono1(attentat.title);
				gererAttaque(attentat.title);
		}
		)
		
		function gererAttaque( title){
			var secAttaque =0;
			
			if(title == 'Incendie'){
				secAttaque = 20;
			}else if(title == 'Meurtre'){
				secAttaque = 30;
			}else if(title == 'Malaise'){
				secAttaque = 15;
			}else if(title == 'Accident'){
				secAttaque = 45;
			}else if(title == 'Attentat'){
				secAttaque = 50;
			}
			chrono2(secAttaque,title);
			
		
		
		}
		
		
		
		
		function desactiverDraggable(){
			meurtre.setDraggable(false);
			incendie.setDraggable(false);
			malaise.setDraggable(false);
			accident.setDraggable(false);
			attentat.setDraggable(false);
		}
		function activerDraggable(title){
			if(title == 'Incendie'){
				malaise.setDraggable(true);
				accident.setDraggable(true);
				attentat.setDraggable(true);
				meurtre.setDraggable(true);
			}else if(title == 'Meurtre'){
				accident.setDraggable(true);
				attentat.setDraggable(true);
				incendie.setDraggable(true);
				malaise.setDraggable(true);
			}else if(title == 'Malaise'){
				meurtre.setDraggable(true);
				incendie.setDraggable(true);
				accident.setDraggable(true);
				attentat.setDraggable(true);
			}else if(title == 'Accident'){
				meurtre.setDraggable(true);
				incendie.setDraggable(true);
				malaise.setDraggable(true);
				attentat.setDraggable(true);
			}else if(title == 'Attentat'){
				meurtre.setDraggable(true);
				incendie.setDraggable(true);
				malaise.setDraggable(true);
				accident.setDraggable(true);
			}
			
			
			
		}
		function modifPos(marker){
			var dataString = "nom="+marker.title+"&Latitude="+marker.position.lat()+"&Longitude="+marker.position.lng(); //il faut juste changer le nom du marker 'attentat' & 'attentat.position' etc...

			$.ajax({
			type: "POST",
			url: "php/update.php",
			data: dataString,
			
		});
		}
		window.setInterval(function(){
			$.ajax({
				type: "POST",
			url: "php/pos.php",
			datatype: 'JSON',
			success: function (tableauPos) {
				var t= JSON.parse(tableauPos);
				
				
				$latpolice = (t[0]["Latitude"]);
				$lngpolice = (t[0]["Longitude"]);
				$latpompier = (t[1]["Latitude"]);
				$lngpompier = (t[1]["Longitude"]);
				$latambulance = (t[2]["Latitude"]);
				$lngambulance = (t[2]["Longitude"]);
				
				$lp = parseFloat($latpolice);
				$lnp = parseFloat($lngpolice);
				
				$lpp = parseFloat($latpompier);
				$lnpp = parseFloat($lngpompier);
				$la = parseFloat($latambulance);
				$lna = parseFloat($lngambulance);
				police.setPosition(new google.maps.LatLng($lp,$lnp));
				pompier.setPosition(new google.maps.LatLng($lpp,$lnpp));
				ambulance.setPosition(new google.maps.LatLng($la,$lna));
			}
			})
		},1000);
		
		
		
		function chrono1(title){   //pour le temps entre chaque attaque
			jQuery(function($){
				var s = 15; // nb de secondes entre chaque attaque
				var ms = 1000; 
				var i = 1;
				cpt_att--;
				if (cpt_att == 0) {
					setGagnant("gentil");
					alert('Dommage Paris a réussi à résister !');
					window.open("index.html");
				}
			$("#nbatt").html("Nombre d'attaque(s) restante(s) : " + cpt_att);
			var seconds = $('#seconds');
			setDate();
 
			function setDate(){
 
				is_int(i);
				isZero(ms);
				seconds.html('<strong>' + Math.floor(s) + ( ' : ')+ ms + ' avant de lancer une autre attaque </strong>');
 
				var timer  = setTimeout(setDate,10);
				if(s == 0 && ms == 0) {
				clearTimeout(timer); 
				s=15;
				activerDraggable(title);
				}	
			}
 
			function is_int(value){
				if((parseFloat(value/100) == parseInt(value/100)) && !isNaN(value)){
					i++;
					s-= 1;
				} else {
					i++;
				}
			};
 
			function isZero(value){
				if(value == 0){
					ms = 1000;
				}
				else{
					ms -= 10;
				}
			};
			});
		}
		
		
		
		function chrono2(tps,title){//pour le temps d'une attaque
		
			if(title == 'Incendie'){
				incendie.setDraggable(false);
			}else if(title == 'Meurtre'){
				meurtre.setDraggable(false);
			}else if(title == 'Malaise'){
				malaise.setDraggable(false);
			}else if(title == 'Accident'){
				accident.setDraggable(false);
			}else if(title == 'Attentat'){
				attentat.setDraggable(false);
			}
			
			jQuery(function($){
 
			var seconds2 = $('#seconds'+title);
			
 
			var sAttaque = tps;
			var msAttaque = 1000;
			j = 1;
			setDate2();
 
			function setDate2(){
 
				is_int2(j);
				isZero2(msAttaque);
				seconds2.html('<strong>' + Math.floor(sAttaque) + ( ' : ')+ msAttaque+ ' avant de réussir l\'attaque : '+title+'</strong>');
 
				var timer2  = setTimeout(setDate2,10);
				if(isIn()){
					clearTimeout(timer2);
					seconds2.html('<strong> L\' attaque : '+title+' a échoué </strong>');
					if(title == 'Incendie'){
						incendie.setDraggable(true);
						incendieCircle.setOptions({fillColor:'grey'});
					
					}else if(title == 'Meurtre'){
						meurtre.setDraggable(true);
						meurtreCircle.setOptions({fillColor:'grey'});
					
					}else if(title == 'Malaise'){
						malaise.setDraggable(true);
						malaiseCircle.setOptions({fillColor:'grey'});
					
					}else if(title == 'Accident'){
						accident.setDraggable(true);
						accidentCircle.setOptions({fillColor:'grey'});
					
					}else if(title == 'Attentat'){
						attentat.setDraggable(true);
						attentatCircle.setOptions({fillColor:'grey'});
					}
				}else if(sAttaque <= 0 && msAttaque <= 0) {
					clearTimeout(timer2); 
					sAttaque = tps;
					seconds2.html('<strong> L\' attaque est réussie </strong>');
					setGagnant("mechant");
					alert('Bravo vous avez mis Paris en sang !');
					window.open("index.html");
					if(title == 'Incendie'){
						incendie.setDraggable(true);
						incendieCircle.setOptions({fillColor:'grey'});
					
					}else if(title == 'Meurtre'){
						meurtre.setDraggable(true);
						meurtreCircle.setOptions({fillColor:'grey'});
					
					}else if(title == 'Malaise'){
						malaise.setDraggable(true);
						malaiseCircle.setOptions({fillColor:'grey'});
					
					}else if(title == 'Accident'){
						accident.setDraggable(true);
						accidentCircle.setOptions({fillColor:'grey'});
					
					}else if(title == 'Attentat'){
						attentat.setDraggable(true);
						attentatCircle.setOptions({fillColor:'grey'});
					}
				}	
			}
 
			function is_int2(value){
				if((parseFloat(value/100) == parseInt(value/100)) && !isNaN(value)){
					j++;
					sAttaque-= 1;
				} else {
					j++;
				}
			};
 
			function isZero2(value){
				if(value == 0){
					msAttaque = 1000;
				}
				else{
					msAttaque -= 10;
				}
			};
			});
		}
		
		
		
		
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

		
		
		
		police.addListener('click', function(){
			info.setContent('Police');
			info.open(map, police);
			
		});
		pompier.addListener('click', function(){
			info.setContent('Pompier ');
			info.open(map, pompier);
			
		});
		ambulance.addListener('click', function(){
			info.setContent('Ambulancier ');
			info.open(map, ambulance);
			
		});	
		function isIn(){
			if(incendieCircle.getBounds().contains(pompier.position)&&incendieCircle.fillColor == '#FF0000'){
				return true;
			}
			if(meurtreCircle.getBounds().contains(police.position)){
				return true;
			}
			if(malaiseCircle.getBounds().contains(ambulance.position)){
				return true;
			}
			if(accidentCircle.getBounds().contains(ambulance.position)&&accidentCircle.getBounds.contains(police.position)){
				return true;
			}
			if(attentatCircle.getBounds().contains(ambulance.position) && attentatCircle.getBounds().contains(police.position)&&attentatCircle.getBounds().contains(pompier.position)){
				return true;
			}
		
		}

		function setGagnant(gagnant){
		var dataS = "gagnant="+gagnant; 
			$.ajax({
				type: "POST",
				url: "php/Setgagnant.php",
				data: dataS
			})
		
		}
			
}