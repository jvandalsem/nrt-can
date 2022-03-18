var browser='edge';

$(document).ready(()=>{
	const cache = localStorage.getItem("date")
	countdown(cache)
})

const addBtn = $('#add')
const resetBtn = $('#reset')
addBtn.on('click',()=>{
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

$('.adder').on('click',()=>{
	$('.todo-form')[0].classList.toggle("show")
	$('.todo-text')[0].focus()
})

$('.todo-text')[0].addEventListener("keyup",(e)=>{
      if (e.keyCode === 13) {
         e.preventDefault();
         $('.todo-go').click()
      }
})

$('.todo-go').on('click',()=>{
	var $todoItem = $(`<div class=\"todo-item\">
					<label for=\"checkbox\"></label>
					<input type=\"checkbox\" class=\"check\"/>
					${$('.todo-text')[0].value}
				</div>`).on('click',function(){
					$(this)[0].classList.toggle('completed')
				})
	$('.todo-list').append($($todoItem))
	$('.todo-text')[0].value = ''
	$('.todo-text')[0].focus()
})
$('.todo-item').each(item=>{
	item.addEventListener('click',()=>{
		console.log('here')
	})
})