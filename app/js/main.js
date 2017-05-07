$(document).ready(function () {
	Cards.updateContext(); // Активация фона и видимой карточки

	$("#arrow-prev").on("click", Cards.prev);
	$("#arrow-next").on("click", Cards.next);
	$(window).on("resize", Cards.fixScroll);
	Cards.jump( $("first-action") );

	// Выключатели ролей
	$("input[name='toggle-role']").change( function () {
		var that = $(this),
				log = gameCore.toggleRole( that.attr("data-target"), that.is(":checked") );
	});

	// Количество игроков
	$("#players-count").change( function () {

	});
});

function dump(obj) {
	var out = '';
	for (var i in obj) {
		out += i + ": " + obj[i] + "\n";
	}

	alert(out);

	// or, if you wanted to avoid alerts...

	var pre = document.createElement('pre');
	pre.innerHTML = out;
	document.body.appendChild(pre)
}

// Функции переключения карточек
var Cards = {
	activeCard: $("section.card:first-of-type"),
	allCards: $("section.card"),

	// Активация текущей карточки и изменение фона
	updateContext: function () {
		var activeCard = this.activeCard;

		// Перебор секций
		$('section.card').each( function () {

			var currSection = $(this);

			if( currSection == activeCard )
				currSection.addClass("card_active");
			else
				currSection.removeClass("card_active");

		});

		// Соответствующий класс фона body
		$("body").removeClass("bg_day bg_night bg_neutral");

		// bg_day
		if( activeCard.hasClass("card_day") )
			$("body").addClass("bg_day");

		// bg_night
		else if( activeCard.hasClass("card_night") )
			$("body").addClass("bg_night");

		// bg_neutral
		else
			$("body").addClass("bg_neutral");
		
	},

	fixScroll: function () {
		setTimeout(function () {

			var that = Cards.activeCard,
				scrl = that.position().top;
			$('html, body').stop().animate({ scrollTop: scrl }, 300);
			Cards.updateContext();

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
		this.activeCard = this.activeCard.prev("select.card");
		this.fixScroll;
	},

	// Скролл к следующей карточке
	next: function () {
		this.activeCard = this.activeCard.next("select.card");
		this.fixScroll;
	}
};

var gameCore = {

	/*=============================
	---------- Переменные ---------
	=============================*/
	playersCount: 0,				// Количество игроков
	currAction: 0,					// Текущий акт
	RoleArchive: [],				// Архив изменения ролей
	Role: {									// Наличие ролей и их состав
		Exist: {									// Наличие ролей
			red:				true,
			mafia:			true,
			don:				true,
			commissar:	true,
			killer:			false,
			whore:			false,
			doctor:			false
		},
		Players: {								// Состав ролей
			red:				[],
			mafia:			[],
			don:				[],
			commissar:	[],
			killer:			[],
			whore:			[],
			doctor:			[]
		}
	},

	/*=============================
	------------- Роли ------------
	=============================*/

	// Включение/выключение роли
	// role - роль [red, mafia, don, commissar, killer, whore, doctor]
	// toggle - boolean (включить или выключить)
	toggleRole( role, toggle = null ) {
		var toggler = this.Role.Exist[role];
		toggler = ( toggle === null ? !toggler : toggle );
		return toggler;
	},

	// Установить роль
	// playerid - номер игрока
	// role - роль [red, mafia, don, commissar, killer, whore, doctor]
	setRole: function ( playerid, role ) {
		var currRole = this.getRole(playerid);
		if( currRole !== false ) {
			delete this.Tole.Players[currRole][playerid];
		}
		this.Role.Players[role].push(playerid);
	},

	// Возвращает роль игрока
	getRole: function ( playerid ) {
		var Players = this.Role.Players;
		for( var elem in Players) {
			if( find(Players[elem], playerid) ) return elem;
		}
		return false;
	},

	// Возвращает всех игроков выбранной роли
	// team - название роли
	// format - string или array (возвращает строку или массив)
	getTeam: function (team, format = "string") {
		var Players = this.Role.Players;

		if( format == "array" )
			return Players[team];
		else {
			var playersString = "";
			for( var i = 0; i < Players[team].length; i++ ) {
				if( i > 0 ) playersString += ", ";
				playersString += Players[team][i];
			}
			return Players[team];
		}
	},

	/*=============================
	---------- Сценарии -----------
	=============================*/
	prevAction: function () {

	},

	nextAction: function () {

	},

	acts: function () {

	}

};