/* ============= GAME FUNCTIONS ============= */

	// Check answer

		(function($){
			$.fn.checkAnswer = function(){

				$(document).ready(function(){

					var num1 = $('.num1').html();
					var num2 = $('.num2').html();
					var ans = $('.ans').val();
					
					if ( num1 * num2 == ans ) {
						$('.ans').css('border-color', '#2ecc71');
						setTimeout(ansWasCorrect, 500);
					} else {
						$('.ans').css('border-color', '#e74c3c');
						setTimeout(ansWasIncorrect, 500);
					}

					// Correct

						function ansWasCorrect() {
							
							if (localStorage.getItem('questionsCorrect') === null) {
								localStorage['questionsCorrect'] = 1;
							} else {
								var increment = parseInt(localStorage['questionsCorrect']) + 1;
								localStorage['questionsCorrect'] = increment;
							}
							
							if (localStorage.getItem('questionsAttempted') === null) {
								localStorage['questionsAttempted'] = 1;
							} else {
								var increment = parseInt(localStorage['questionsAttempted']) + 1;
								localStorage['questionsAttempted'] = increment;
							}

							$(document).clearAnswer();
							$(document).nextQuestion();

						}

					// Incorrect

						function ansWasIncorrect() {
							
							if (localStorage.getItem('questionsAttempted') === null) {
								localStorage['questionsAttempted'] = 1;
							} else {
								var increment = parseInt(localStorage['questionsAttempted']) + 1;
								localStorage['questionsAttempted'] = increment;
							}

							$(document).clearAnswer();

						}

				});

			};
		})(jQuery);

	// Update score

		(function($){
			$.fn.updateScore = function(){

				$(document).ready(function(){

					if (localStorage.getItem('questionsAttempted') === null) {
						localStorage['questionsAttempted'] = 0;
						var result = localStorage['questionsAttempted'];
						$('.scoreDenom').html(result);
					} else {
						var result = localStorage['questionsAttempted'];
						$('.scoreDenom').html(result);
					}

					if (localStorage.getItem('questionsCorrect') === null) {
						localStorage['questionsCorrect'] = 0;
						var result = localStorage['questionsCorrect'];
						$('.scoreNum').html(result);
					} else {
						var result = localStorage['questionsCorrect'];
						$('.scoreNum').html(result);
					}

					if (localStorage.getItem('questionsCorrect') === null && localStorage.getItem('questionsAttempted') === null) {
						$('.scorePercent').html('100');
					} else {
						var result = parseInt(localStorage['questionsCorrect']) / parseInt(localStorage['questionsAttempted']) * 100;
						var result = Math.round(result);
						$('.scorePercent').html(result);
					}

				});
				
			};
		})(jQuery);

	// Reset score

		(function($){
			$.fn.resetScore = function(){

				$(document).ready(function(){

					localStorage['questionsAttempted'] = 0;
					localStorage['questionsCorrect'] = 0;

					$(document).updateScore();

				});
				
			};
		})(jQuery);

	// Next question

		(function($){
			$.fn.nextQuestion = function(){

				$(document).ready(function(){

					if ( localStorage.getItem('difficulty') == 'hard' ) {

						$(document).diffHard();
						var num1 = Math.floor(Math.random() * 100) + 1;
						var num2 = Math.floor(Math.random() * 12) + 1;

					} else if ( localStorage.getItem('difficulty') == 'extreme' ) {

						$(document).diffExtreme();
						var num1 = Math.floor(Math.random() * 100) + 1;
						var num2 = Math.floor(Math.random() * 100) + 1;

					} else {

						$(document).diffNormal();
						var num1 = Math.floor(Math.random() * 12) + 1;
						var num2 = Math.floor(Math.random() * 12) + 1;

					}

					$('.num1').html(num1);
					$('.num2').html(num2);

				});
				
			};
		})(jQuery);

	// Clear answer

		(function($){
			$.fn.clearAnswer = function(){

				$(document).ready(function(){

					$('.ans').css('border-color', '#ddd');
					$('.ans').val('');
					$(document).updateScore();

				});

			};
		})(jQuery);

	// Difficulties

		(function($){
			$.fn.diffNormal = function(){

				$(document).ready(function(){

					localStorage['difficulty'] = 'normal';

					$('a.normal').addClass('active');
					$('a.hard').removeClass('active');
					$('a.extreme').removeClass('active');

				});

			};
		})(jQuery);

		(function($){
			$.fn.diffHard = function(){

				$(document).ready(function(){

					localStorage['difficulty'] = 'hard';

					$('a.normal').removeClass('active');
					$('a.hard').addClass('active');
					$('a.extreme').removeClass('active');

				});

			};
		})(jQuery);

		(function($){
			$.fn.diffExtreme = function(){

				$(document).ready(function(){

					localStorage['difficulty'] = 'extreme';

					$('a.normal').removeClass('active');
					$('a.hard').removeClass('active');
					$('a.extreme').addClass('active');

				});

			};
		})(jQuery);

/* ============= MAIN ============= */

	$(document).ready(function(){

		$(document).updateScore();
		$(document).nextQuestion();
		$('.ans').focus();

		$('.ans').keypress(function(e){
			if(e.which == 13) {
	        	$(document).checkAnswer();
	        }
		});

		// Reset score
		
			$('a.reset').click(function(){
				$(document).resetScore();
			});

		// Change difficulty
		
			$('a.normal').click(function(){
				$(document).diffNormal();
				$(document).nextQuestion();
			});
		
			$('a.hard').click(function(){
				$(document).diffHard();
				$(document).nextQuestion();
			});
		
			$('a.extreme').click(function(){
				$(document).diffExtreme();
				$(document).nextQuestion();
			});

		// Open cookie popup
		
			$('.cookies').click(function(){
				$('.cookies').fadeOut();
				localStorage['cookies'] = 'closed';
			});

			if ( localStorage['cookies'] == 'closed' ) {

				$('.cookies').remove();

			}

	});