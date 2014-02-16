

$(document).ready(function(){
    // Target your .container, .wrapper, .post, etc.
    $("#main-video").fitVids();

    // Auto-resize textareas
	$('.needText').autoResize();

    $(window).scroll(function() {
    	var scrollTop = 150;
        if($(window).scrollTop() >= scrollTop){
            if(!($('#mainNav').hasClass('showNav'))){
            	$('#mainNav').addClass('showNav');
            }
        }else{
        	if($('#mainNav').hasClass('showNav')){
            	$('#mainNav').removeClass('showNav');
            }
        }
 	});


    $('.floatLabel').jvFloat();


 });

$('.suggestion').hover(function(){$(this).children('.imgInfo').css('bottom', '0px')}, function(){$(this).children('.imgInfo').css('bottom', '-100px')})




angular.module('AGM', ['ui.bootstrap','ngAnimate']);

var clientSurvey = function ($scope) {

	$scope.singleModel = 0;

	$scope.radioModel = '';

	$scope.checkModel = {
	casual : false,
	suiting : false,
	streetwaer : false,
	corporate : false,
	leisure : false
	};

	$scope.quickgood = '';
	$scope.workgood = '';
	$scope.overgood = '';

	$scope.checkStyles = function(){
		var counter = 0; 
		console.log('counting')
		for(var prop in $scope.checkModel){
			if($scope.checkModel[prop] ===true){counter++}
		}

		if (counter>2){
			$scope.quickgood = 'danger';
			$scope.outfitMsg = 'If you need clothes for lots of different occasions, this takes more time and will require a longer session';
		}else if(counter>=2){
			$scope.quickgood = '';
			$scope.outfitMsg = '';

		}
	}
}

var mainArticles = function ($scope) {

	$scope.articles = [
		{
			title: "I spent $200,000 on men's, and here's what I learned",
			byline: "A 2014 retrospective from the men who know fashion better than anyone",
			author: "James Gallichio",
			category: "meta, fashion, business"
		},{
			title: "Fat Men Don't Have Fat Legs",
			byline: "The reason that tapered pants look good on pretty much everyone",
			author: "James Gallichio",
			category: "fat, men, pants, body, image"
		},{
			title: "Everyone is 3 pant-sizes smaller than they think",
			byline: "On men's distorted body image",
			author: "James Gallichio",
			category: "pants, body, image, pants"
		},{
			title: "Men Just Want to be Comfortable: The 2014 Look",
			byline: "Why skinny is dated and now we're relaxing",
			author: "James Gallichio",
			category: "meta, fashion, comfort, skinny, trends"
		},{
			title: "Fashion Trends are a Reaction to the Past",
			byline: "Why men's fashion keeps changing",
			author: "James Gallichio",
			category: "meta, fashion, trends"
		},{
			title: "The Well-Dressed Man We All Hate",
			byline: "Men's Fashion Rivals",
			author: "James Gallichio",
			category: "fashion, men, rivals, snooty"
		},{
			title: "You Have To Give A Shit Before You Can Not Give A Shit",
			byline: "On knowing the rules, breaking the rules and making the rules",
			author: "James Gallichio",
			category: "rules, trends, meta, fashion"
		},{
			title: "High-End Stores Aren't Intimidating",
			byline: "Luxury doesn't have to be scary",
			author: "James Gallichio",
			category: "luxury, scary"
		}
	]
};

