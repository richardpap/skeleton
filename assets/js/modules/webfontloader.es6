class WebFontLoader {
	
	constructor() {

	}

	init() {

		 WebFont.load({
            google: {
                families: ['Open Sans:300,400,500,700:latin-ext'];
            }
        });

	}

}