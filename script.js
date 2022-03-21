// Attempting to get rid of unknown browser error
var browser='firefox';
const today = new Date().toISOString().slice(0,10)

//Get localStorage date on page load
$(document).ready(()=>{
	const cacheDate = localStorage.getItem("date")
	countdown(cacheDate)
	try{
		const weightCache= JSON.parse(localStorage.getItem('weight'))
		$('#current-val')[0].innerHTML = weightCache[today]
		const calcLoss = (weightDict) => {
			let weights = Object.keys(weightDict).map(function(key){
				return parseInt(weightDict[key])
			})
			return (Math.max(...weights) - Math.min(...weights))
		}
		$('#total-val')[0].innerHTML = String(calcLoss(weightCache))
	}catch{
		$('#current-val')[0].innerHTML = 'New'
	}
})

// Change the date on countdown
$('#add').on('click',()=>{
    const shitDate = new Date($('.date').val())
    if(shitDate.toString()==='Invalid Date'){
        $('.date')[0].classList.add('invalid')
    }
    else{
		$('.date')[0].classList.remove('invalid')
        const myDate = new Date(shitDate.getTime()+Math.abs(shitDate.getTimezoneOffset()*60000))
		localStorage.setItem("date",myDate)
		clearInterval(ticker)
        countdown(myDate.toString())
       
    }
})
// Create ticker
var ticker;
const countdown = date=>{
	if (date && date!='null'){
		var target = new Date(date).getTime()
		ticker = setInterval(()=>{
			var w;
			var d;
			var now = (new Date).getTime()
			var distance = target - now
			var days = Math.floor(distance / (1000 * 60 * 60 * 24));
			var weeks = Math.floor(days / 7)
			days = days - (weeks*7)
			var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			var seconds = Math.floor((distance % (1000 * 60)) / 1000);
			if (weeks===1){w = ' Week'}else{w = ' Weeks'}
			if (days===1){d = ' Day'}else{d = ' Days'}
			if (minutes-10<0){minutes=`0${minutes.toString()}`}
			if (seconds-10<0){seconds=`0${seconds.toString()}`}
			$('.items')[0].innerHTML = `<div>${weeks}${w}, ${days}${d}, ${hours}:${minutes}:${seconds}`
		},1000)
	}
}

// To Do form
$('.adder').on('click',()=>{
	$('.todo-form')[0].classList.toggle("show")
	$('.todo-text')[0].focus()
})

// To do add on enter key event
$('.todo-text')[0].addEventListener("keyup",(e)=>{
      if (e.keyCode === 13) {
         e.preventDefault();
         $('.todo-go').click()
      }
})

// Add new todo item
$('.todo-go').on('click',()=>{
	var $todoItem = $(`<div class=\"todo-item\">
						<label for=\"checkbox\"></label>
						<input type=\"checkbox\" class=\"check\"/>
						${$('.todo-text')[0].value}
					</div>`).on('click',function(){$(this)[0].classList.toggle('completed')
				})
	$('.todo-list').append($($todoItem))
	$('.todo-text')[0].value = ''
	$('.todo-text')[0].focus()
})

//Weight change forms
$('body').on('click',('[data-editable]'), function() {
	var $el = $(this)
	var $input = $('<input maxlength=6 placeholder=\'New Day\'/>').val( $el.text() )
	$input.addClass('changeCurrent')
	$el.replaceWith( $input )
  
	var save = ()=>{
		var $p = $('<p data-editable />').text( $input.val() )
    	$input.replaceWith( $p )
		var storeWeight
		if (JSON.parse(localStorage.getItem('weight')).length!=0){
			storeWeight = JSON.parse(localStorage.getItem('weight'))
		}else{
			storeWeight = {}
		}
		console.log(storeWeight)
		storeWeight[today] = $input.val()
		storeWeight['dummyA'] = "170"
		storeWeight['dummyB'] = "168.2"
		localStorage.setItem('weight',JSON.stringify(storeWeight))
	};
	$input.one('blur', save).focus();
	
	$input[0].addEventListener("keyup",(e)=>{
		if (e.keyCode === 13) {
			e.preventDefault();
			save()
		}
	})
});

