export class InitPlugins {
	
	constructor() {

	}


	webfonts() {

		 WebFont.load({
            google: {
                families: [ 'Ubuntu:400,300,400italic,700,500:latin,latin-ext' ]
            }
        });

		return this;

	}

	carousel() {

		if($('.carousel').length) {
			$('.carousel').carousel();
		}

		return this;
		
	}

	gMap() {

		let googleMap = $('#map');

		if(googleMap.length > 0) {
		    var map = new GMaps({
		        div: '#map',
		        lat: 47.5181846,
		        lng: 19.0338753,
		        zoom: 15,
		        scrollwheel: false,
		        styles: [
				    {
				        "featureType": "administrative",
				        "elementType": "all",
				        "stylers": [
				            {
				                "visibility": "on"
				            }
				        ]
				    }
				],
		        draggable: false
		//        disableDoubleClickZoom: false,
		//        zoomControl: false,
		//        disableDefaultUI: true
		    });

		    map.addMarker({
		        lat: 47.5181846,
		        lng: 19.0338753,
		        title: 'MJ CAVE',
		        icon: "/assets/images/marker.png"
		    });
		}

		return this;

	}

	gridGallery() {

		let gallery = $('.grid');

		if (gallery.length) {

			$(window).resize(function(){
				var gW = parseInt($('.grid').width() / 4);
		        console.log(gW);

		        $('.grid').masonry({
		          // options
		          itemSelector: '.grid-item',
		          columnWidth: gW
		        });
			}).trigger('resize');


		}

		return this;
        
	}

	fancybox() {

		$(".fancybox-thumb").fancybox({
            fitToView: true,
            prevEffect: 'none',
            nextEffect: 'none',
            helpers: {
                title : null,
                thumbs: {
                    width: 100,
                    height: 100
                }
            },
            beforeShow : function(){

            }
        });

        return this;

	}

}