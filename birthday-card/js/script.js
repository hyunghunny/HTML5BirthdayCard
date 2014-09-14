/* Author: Hyunghun Cho (hyunghunny@gmail.com)
 *
 * For understanding How to use Backbone.JS, HTML5 Canvas and Audio
 */
var Card = Backbone.Model.extend({
    defaults: {
        img: 'Happy-Birthday-Greetings.png',
        title: 'Happy birthday to you!',
        music: 'Kevin_Lax_-_Happy_Birthday.mp3'
    },

    initialize: function () {        
        console.log("Card object initialized.");
    },

    getImageUrl: function () {
        return 'img/' + this.get('img');
    },

    getMusicUrl: function () {
        return 'res/' + this.get('music');
    }
});

var CardView = Backbone.View.extend({
    el: '#myCard',
    canvas: null,
    audio: null,

    initialize: function () {

        this.render();

        /* 
         * retrieving any HTML element by JQuery returns array object.
         * Select first one of the retrieved array.  
         */
        this.canvas = $('#myCanvas')[0]; 
        this.audio = $('#myAudio')[0];  

        this.setMusic();
        this.showImage();

        console.log('Card view intialized.');
    },

    render: function () {
        // append canvas, audio tag
        this.$el.append('<canvas id="myCanvas" width="730" height="414"></canvas>');
        this.$el.append('<audio id="myAudio"></audio>');

        return this;
    },

    setMusic: function () {

        // Select birthday song
        this.audio.src = this.model.getMusicUrl();
    },

    showImage: function () {
        var context = this.canvas.getContext('2d');
        var imageObj = new Image();

        imageObj.onload = function () {
            context.drawImage(imageObj, 5, 5, 730, 414);
        };
        imageObj.src = this.model.getImageUrl();
    },

    animate: function () {

        var context = this.canvas.getContext('2d');
        // remove previous canvas
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        //TODO:animation effect here

        console.log('Image animated.');
    },

    events: {
        'click': 'showMessage',
        'dblclick': 'animate',
        'mouseover': 'playMusic',
        'mouseout': 'pauseMusic'
    },

    showMessage: function () {

        var context = this.canvas.getContext('2d');

        // Print 'To' message
        context.font = 'bold 20pt Segoe UI';
        context.fillText('To. ' + this.model.get('to'), 10, 50);

        // Print 'title' message
        context.font = 'italic 40pt Calibri';
        context.fillStyle = 'gray';
        context.fillText(this.model.get('title'), 10, 310);

        // Print 'message' message
        context.font = 'italic 20pt Calibri';        
        context.fillText(this.model.get('message'), 10, 350);
 
        // Print 'from' message
        context.font = '10pt Segoe UI';
        context.fillStyle = 'black';
        context.fillText('Sincerely, \n' + this.model.get('from'), 10, 400);

        console.log('The birthday message is shown.');
    },

    playMusic: function () {

        this.audio.play();
        console.log('The birthday song is playing.');
    },

    pauseMusic: function () {

        this.audio.pause();
        console.log('The birthday song paused.');
    }

});


/*************************************************/

var birthdayCard = new Card({    
    to: 'My beloved Joyan',
    from: 'Your father',    
    message:'May happiness be with you all!'
});

var birthdayCardView = new CardView({
    model: birthdayCard
 });


