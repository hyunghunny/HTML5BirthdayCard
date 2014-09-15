/* Author: Hyunghun Cho (hyunghunny@gmail.com)
 *
 * For understanding How to use HTML5 Canvas and Audio in Backbone.JS
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
    state: null,
    events: {
        'click': 'onClick',
        'dblclick': 'showImage',
        'mouseover': 'playMusic',
        'mouseout': 'pauseMusic'
    },

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

        // Set a birthday song from model
        this.audio.src = this.model.getMusicUrl();
    },

    onClick: function () {
        switch (this.state) {
            case 'image':
                this.showHeart();
                break;
            case 'heart':
                this.showMessage();
                break;
            case 'message':
                // ignore state change
                break;
        }
    },

    showImage: function () {
        var view = this;
        var context = view.canvas.getContext('2d');
        var imageObj = new Image();

        // clear canvas
        context.clearRect(0, 0, view.canvas.width, view.canvas.height);

        imageObj.onload = function () {
            context.drawImage(imageObj, 5, 5, 730, 414);
        };
        imageObj.src = view.model.getImageUrl();

        console.log('An image is shown.');
        this.state = 'image';
    },

    showHeart: function () {
        var view = this;
        var context = view.canvas.getContext('2d');
        // clear canvas
        context.clearRect(0, 0, view.canvas.width, view.canvas.height);

        context.strokeStyle = "#000000";
        context.strokeWeight = 3;
        context.shadowOffsetX = 4.0;
        context.shadowOffsetY = 4.0;
        context.lineWidth = 10.0;
        context.fillStyle = "#FF0000";
        var d = 150;
        var k = 100;

        context.moveTo(k, k + d / 4);
        context.quadraticCurveTo(k, k, k + d / 4, k);
        context.quadraticCurveTo(k + d / 2, k, k + d / 2, k + d / 4);
        context.quadraticCurveTo(k + d / 2, k, k + d * 3 / 4, k);
        context.quadraticCurveTo(k + d, k, k + d, k + d / 4);
        context.quadraticCurveTo(k + d, k + d / 2, k + d * 3 / 4, k + d * 3 / 4);
        context.lineTo(k + d / 2, k + d);
        context.lineTo(k + d / 4, k + d * 3 / 4);
        context.quadraticCurveTo(k, k + d / 2, k, k + d / 4);
        context.stroke();
        context.fill();

        console.log('A heart is shown.');
        this.state = 'heart';
    },

    showMessage: function () {
        var view = this;
        var context = this.canvas.getContext('2d');

        // Print 'To' message
        context.font = 'bold 20pt Segoe UI';
        context.fillText('To. ' + view.model.get('to'), 10, 50);

        // Print 'title' message
        context.font = 'italic 40pt Calibri';
        context.fillStyle = 'gray';
        context.fillText(view.model.get('title'), 10, 310);

        // Print 'message' message
        context.font = 'italic 20pt Calibri';
        context.fillText(this.model.get('message'), 10, 350);

        // Print 'from' message
        context.font = '10pt Segoe UI';
        context.fillStyle = 'black';
        context.fillText('Sincerely, \n' + view.model.get('from'), 10, 400);

        console.log('The birthday message is shown.');
        this.state = 'message';
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
 

