var game_anim;
var total_score;
var typer_view;
var text_input;
var game_started = false;

var Word = Backbone.Model.extend({
	move: function() {
		this.set({y:this.get('y') + this.get('speed')});
	}
});

var Words = Backbone.Collection.extend({
	model:Word
});

var WordView = Backbone.View.extend({
	initialize: function() {
		$(this.el).css({position:'absolute', overflow: "hidden", "min-width":"1000px", width: "auto !important", width: "1000px"});
		var string = this.model.get('string');
		var letter_width = 25;
		var word_width = string.length * letter_width;
		if(this.model.get('x') + word_width > $(window).width()) {
			this.model.set({x:$(window).width() - word_width});
		}
		for(var i = 0;i < string.length;i++) {
			$(this.el)
				.append($('<div>')
					.css({
						width:letter_width + 'px',
						padding:'5px 2px',
						'border-radius':'4px',
						'background-color':'#fff',
						border:'1px solid #ccc',
						'text-align':'center',
						float:'left'
					})
					.text(string.charAt(i).toUpperCase()));
		}
		
		this.listenTo(this.model, 'remove', this.remove);
		
		this.render();
	},
	
	render:function() {
		$(this.el).hide();
		$(this.el).css({
			top:this.model.get('y') + 'px',
			left:this.model.get('x') + 'px'
		});
		var highlight = this.model.get('highlight');
		$(this.el).find('div').each(function(index,element) {
			if(index < highlight) {
				$(element).css({'font-weight':'bolder','background-color':'#aaa',color:'#fff'});
			} else {
				$(element).css({'font-weight':'normal','background-color':'#fff',color:'#000'});
			}
		});
		$(this.el).show();
	}
});

/* SCORE SYSTEM */
var Score = Backbone.Model.extend({
	defaults: {
		value: 0
	},

	increase: function() {
		this.set({value:this.get('value') + 50});
	},

	decrease: function(punishment) {
		if(this.get('value') > 0) {
			this.set({value:this.get('value') - punishment});
		}
	}
});

var ScoreView = Backbone.View.extend({
	el:  "#total-score",

	initialize: function() {
		this.render();
	},

	render: function() {
		if(game_started) {
			this.$el.html('Score : ' + this.model.get('value'));
		} else {
			this.$el.html('Final Score : ' + this.model.get('value'));
		}
	}
});

var TyperView = Backbone.View.extend({
	initialize: function() {
		game_started = true;

		var wrapper = $('<div>')
			.css({
				position:'fixed',
				top:'0',
				left:'0',
				width:'100%',
				height:'100%'
			})
			.addClass("container-fluid");
		this.wrapper = wrapper;
		
		var self = this;
		text_input = $('<input>')
			.addClass('form-control')
			.css({
				'border-radius':'4px',
				position:'absolute',
				bottom:'0',
				'min-width':'80%',
				width:'80%',
				'margin-bottom':'10px',
				'z-index':'1000'
			}).keyup(function() {
				var words = self.model.get('words');
				var mistyped = true;
				for(var i = 0;i < words.length;i++) {
					var word = words.at(i);
					var typed_string = $(this).val();
					var string = word.get('string');
					if(string.toLowerCase().indexOf(typed_string.toLowerCase()) == 0) {
						mistyped = false;
						word.set({highlight:typed_string.length});
						if(typed_string.length == string.length) {
							$(this).val('');
							total_score.model.increase();
						}
					} else {
						word.set({highlight:0});
					}
				}

				if(mistyped) {
					total_score.model.decrease(10);
				}
			});
		
		$(this.el)
			.append(wrapper
				.append($('<form>')
					.attr({
						role:'form'
					})
					.submit(function() {
						return false;
					})
					.append(text_input)));
		
		text_input.css({left:((wrapper.width() - text_input.width()) / 2) + 'px'});
		text_input.focus();
		
		this.listenTo(this.model, 'change', this.render);

		$(this.el)
			.append(wrapper
				.append($('<div>')
					.append($('<div>')
						.addClass("col-xs-2 col-md-2 col-lg-1")
						.append($('<button>')
							.attr({
								class:'btn btn-block btn-large btn-primary',
								id:'start'
							})
							.css({
								'position': 'absolute',
								'z-index': '1000'
							})
							.append("Start")))
					.append($('<div>')
						.addClass("col-xs-2 col-md-2 col-lg-1")
						.append($('<button>')
							.attr({
								class:'btn  btn-block btn-large btn-danger',
								id:'stop'
							})
							.css({
								'position': 'absolute',
								'z-index': '1000'
							})
							.append("Stop")))
					.append($('<div>')
						.addClass("col-xs-2 col-md-2 col-lg-1")
						.append($('<button>')
							.attr({
								class:'btn  btn-block btn-large btn-warning',
								id:'pause'
							})
							.css({
								'position': 'absolute',
								'z-index': '1000'
							})
							.append("Pause")))
					.append($('<div>')
						.addClass("col-xs-2 col-md-2 col-lg-1")
						.append($('<button>')
							.attr({
								class:'btn  btn-block btn-large btn-success',
								id:'resume'
							})
							.css({
								'position': 'absolute',
								'z-index': '1000'
							})
							.append("Resume")))
					.append($('<div>')
						.append($('<h2>')
							.attr({
								id: "total-score"
							}))
						.attr({
							class: "col-xs-3 pull-right"
						})
						.css({
							"z-index": "1000"
						}))
					.addClass("row"))
				);
	},
	
	events: {
		"click .btn#start": "startClicked",
		"click .btn#stop": "stopClicked",
		"click .btn#pause": "pauseClicked",
		"click .btn#resume": "startClicked"
	},

	startClicked: function() {
		this.model.start();
	},

	stopClicked: function() {
		this.model.end();
	},

	pauseClicked: function() {
		this.model.pause();
	},

	render: function() {
		var model = this.model;
		var words = model.get('words');
		
		for(var i = 0;i < words.length;i++) {
			var word = words.at(i);
			if(!word.get('view')) {
				var word_view_wrapper = $('<div>');
				this.wrapper.append(word_view_wrapper);
				word.set({
					view:new WordView({
						model: word,
						el: word_view_wrapper
					})
				});
			} else {
				word.get('view').render();
			}
		}
	}
});

var Typer = Backbone.Model.extend({
	defaults:{
		max_num_words:10,
		min_distance_between_words:50,
		words:new Words(),
		min_speed:1,
		max_speed:5
	},
	
	initialize: function() {
		typer_view = new TyperView({
			model: this,
			el: $(document.body)
		});

		text_input.prop('disabled', true);

		total_score = new ScoreView({
			model: new Score()
		});

		var vendors = ['ms', 'moz', 'webkit', 'o'];
  		for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
  		  window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
  		  window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
  		                             || window[vendors[x]+'CancelRequestAnimationFrame'];
  		}
	},

	end: function() {
		text_input.prop('disabled', true);
		game_started = false;
		game_anim = null;
	},

	pause: function() {
		text_input.prop('disabled', true);
		window.cancelAnimationFrame(game_anim);
		game_anim = null;
	},

	start: function() {
		var animation_delay = 100;
		var self = this;
		
		if(!game_started) {
			self.initialize();
			window.cancelAnimationFrame(game_anim);
			game_started = true;
		}

		function loop() {
  			self.iterate();
  			game_anim = window.requestAnimationFrame(loop);
        }
        loop();
		text_input.prop('disabled', false);
		text_input.focus();
	},
	
	iterate: function() {
		var words = null;
		words = this.get('words');
		if(words.length < this.get('max_num_words')) {
			var top_most_word = undefined;
			for(var i = 0;i < words.length;i++) {
				var word = words.at(i);
				if(!top_most_word) {
					top_most_word = word;
				} else if(word.get('y') < top_most_word.get('y')) {
					top_most_word = word;
				}
			}
			
			if(!top_most_word || top_most_word.get('y') > this.get('min_distance_between_words')) {
				var random_company_name_index = this.random_number_from_interval(0,company_names.length - 1);
				var string = company_names[random_company_name_index];
				var filtered_string = '';
				for(var j = 0;j < string.length;j++) {
					if(/^[a-zA-Z()]+$/.test(string.charAt(j))) {
						filtered_string += string.charAt(j);
					}
				}
				
				var word = new Word({
					x:this.random_number_from_interval(0,$(window).width()),
					y:0,
					string:filtered_string,
					speed:this.random_number_from_interval(this.get('min_speed'),this.get('max_speed'))
				});
				words.add(word);
			}
		}
		
		var words_to_be_removed = [];
		if(game_started) {
			for(var i = 0;i < words.length;i++) {
				var word = words.at(i);
				word.move();
				
				if(word.get('y') > $(window).height() || word.get('move_next_iteration')) {
					words_to_be_removed.push(word);
				}
				
				if(word.get('highlight') && word.get('string').length == word.get('highlight')) {
					word.set({move_next_iteration:true});
				}
			}
		} else {
			for(var i = 0;i < words.length;i++) {
				var word = words.at(i);
				words_to_be_removed.push(word);
			}
		}
		
		
		for(var i = 0;i < words_to_be_removed.length;i++) {
			words.remove(words_to_be_removed[i]);
		}
		total_score.render();
		this.trigger('change');
	},
	
	random_number_from_interval: function(min,max) {
	    return Math.floor(Math.random()*(max-min+1)+min);
	}
});