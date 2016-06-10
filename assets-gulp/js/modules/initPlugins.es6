class InitPlugins {
	
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

		if($('#splash-slider').length) {
			$('#splash-slider').carousel();
		}

		return this;
		
	}

}