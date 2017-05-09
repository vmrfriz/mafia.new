$(document).ready(function () {
	Cards.context(); // Активация фона и видимой карточки

	$("#arrow-prev").on("click", Cards.prev);
	$("#arrow-next").on("click", Cards.next);
	$(window).on("resize", Cards.scroll);
	Cards.jump( $("first-action") );

	// Выключатели ролей
	$("input[name='toggle-role']").change( function () {
		var that = $(this),
				log = gameCore.toggleRole( that.attr("data-target"), that.is(":checked") );
	});

	// Количество игроков
	$("#players-count").change( function () {
			console.log( Cards.activeCard );
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
	document.body.appendChild(pre);
};

// Функции переключения карточек
var Cards = {
	active:	$("section.card:first"),
	all:		$("section.card"),

	// Обновление контекста для активной карточки
	context:function () {
						var active = this.active;

						// section .card_active
						$('section.card').each( function () {
							var currSection = $(this);
							if( currSection == active )
								currSection.addClass("card_active");
							else
								currSection.removeClass("card_active");
						});

						$("body").removeClass("bg_day bg_night bg_neutral");

						// body .bg_day
						if( active.hasClass("card_day") )
							$("body").addClass("bg_day");

						// body .bg_night
						else if( active.hasClass("card_night") )
							$("body").addClass("bg_night");

						// body .bg_neutral
						else
							$("body").addClass("bg_neutral");
					},

	// Скролл к выбранной карточке
	scroll:	function () {
						console.log( this );
						var scrl = this.active.position().top;
						$('html, body').stop().animate({ scrollTop: scrl }, 300);
						this.context;
						return true;
					},

	// Активация выбранной карточки
	jump:		function ( obj ) {
						if( typeof obj !== 'object' ) return false;
						if( !obj.hasClass("card") ) return false;
						this.active = obj;
						this.scroll;
						this.context;
					},

	// Активация предыдущей карточки
	prev:		function () {
						Cards.active = Cards.active.prev("select.card");
						Cards.scroll;
					},

	// Активация следующей карточки
	next:		function () {
						Cards.active = Cards.active.next("section.card");
						Cards.scroll;
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
	toggleRole:	function ( role, toggle = null ) {
								var toggler = this.Role.Exist[role];
								toggler = ( toggle === null ? !toggler : toggle );
								return toggler;
							},

	// Установить роль
	// playerid - номер игрока
	// role - роль [red, mafia, don, commissar, killer, whore, doctor]
	setRole:		function ( playerid, role ) {
								var currRole = this.getRole(playerid);
								if( currRole !== false ) {
									delete this.Tole.Players[currRole][playerid];
								}
								this.Role.Players[role].push(playerid);
							},

	// Возвращает роль игрока
	getRole:		function ( playerid ) {
								var Players = this.Role.Players;
								for( var elem in Players) {
									if( find(Players[elem], playerid) ) return elem;
								}
								return false;
							},

	// Возвращает всех игроков выбранной роли
	// team - название роли
	// format - string или array (возвращает строку или массив)
	getTeam:		function (team, format = "string") {
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
	prevAction:	function () {

							},

	nextAction:	function () {

							},

	acts:				function () {

							}

};