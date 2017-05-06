// Возможность скролла
var canScroll = false;

$(document).ready(function () {
	canScroll = true;
	Cards.updateContext(); // Активация фона и видимой карточки

	$("#arrow-prev").on("click", Cards.prev);
	$("#arrow-next").on("click", Cards.next);
	$(window).on("resize", Cards.fixScroll);
	Cards.jump( $("first-action") );
});

// Функции переключения карточек
var Cards = {
	activeCard: $("section.card:first-of-type"),

	// Активация текущей карточки и изменение фона
	updateContext: function () {
		// Высота скролла
		var scrollPos = $(document).scrollTop();

		// Перебор секций
		$('section.card').each( function () {

			// Переменные секции
			var currSection = $(this),
					currSectionStart = currSection.position().top,
					currSectionEnd = currSectionStart + currSection.height();
		// Обработка текущего элемента
			// Выполняет условия скролла
			if( currSectionStart <= scrollPos + 5 && currSectionEnd > scrollPos ) {

				// Добавить активный класс
				currSection.addClass("card_active");
				$("body").removeClass("bg_day bg_night bg_neutral");
				Cards.activeCard = currSection;

				// Соответствующий класс фона body
				// bg_day
				if( currSection.hasClass("card_day") )
					$("body").addClass("bg_day");

				// bg_night
				else if( currSection.hasClass("card_night") )
					$("body").addClass("bg_night");

				// bg_neutral
				else
					$("body").addClass("bg_neutral");
			}

			// Не выполняет условия скролла
			else {
				// Удалить активный класс
				currSection.removeClass("card_active");
			}
		});
	},

	fixScroll: function () {
		setTimeout(function () {
			var that = Cards.activeCard,
				scrl = that.position().top;
			$('html, body').stop().animate({ scrollTop: scrl }, 300);
		}, 750);
	},

	jump: function ( obj ) {
		if( typeof obj !== 'object' ) return false;
		if( !obj.hasClass("card") ) return false;
		Cards.activeCard = obj;
		Cards.foxScroll;
		Cards.updateContext;
	},

	// Скролл к предыдущей карточке
	prev: function () {
		if( !canScroll ) return false;
		var scrollTop = $(document).scrollTop(),
				scrollTo = scrollTop - $(window).height();
		$.when (
			canScroll = false,
			$("#arrow-prev").addClass("arrow-prev_animated"),
			$('html, body').stop().animate({ scrollTop: scrollTo }, 300)
		).then(function () {
			canScroll = true;
			$("#arrow-prev").removeClass("arrow-prev_animated");
			Cards.updateContext();
			Cards.fixScroll;
		});
	},

	// Скролл к следующей карточке
	next: function () {
		if( !canScroll ) return false;
		var scrollTop = $(document).scrollTop(),
				scrollTo = scrollTop + $(window).height();
		$.when (
			canScroll = false,
			$("#arrow-next").addClass("arrow-next_animated"),
			$('html, body').stop().animate({ scrollTop: scrollTo }, 300)
		).then(function () {
			canScroll = true;
			$("#arrow-next").removeClass("arrow-next_animated");
			Cards.updateContext();
			Cards.fixScroll;
		});
	}
};