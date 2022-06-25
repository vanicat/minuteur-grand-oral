const noTimer =  {
    stop: function() {},
    update_display: function () {},
    total_active: false
}

const Timer = function(time, display_name, total) {
    display = document.getElementById(display_name)
    this.init_time = time * 60
    this.passed_time = 0
    this.start_time = null
    this.display = display
    this.display.minute = this.display.getElementsByClassName("minute")[0]
    this.display.second = this.display.getElementsByClassName("second")[0]
    this.active = false
    this.timers = []
    this.total_active = true
    this.total_timer = total

    const me = this
    this.display.addEventListener('click', function () { me.on_click() })
    

    button = display.getElementsByClassName("next")
    if(button.length > 0){   
        button[0].addEventListener('click', function () {me.next()})
    }

    button = display.getElementsByClassName("reset")
    if(button.length > 0){   
        button[0].addEventListener('click', function () {me.reset()})
    }
}

Timer.prototype.on_click = function() {
    if(this.active) return
    if(this.total_timer === undefined) return

    if(! this.total_timer.active) {
        this.activate()
        this.start()
        total.start()
        return
    } else {
        this.activate()
        this.start()
    }
}

Timer.prototype.activate = function() {
    active.stop()
    active = this
}

Timer.prototype.start = function() {
    this.active = true
    this.display.classList.add('active')
    this.start_time = new Date().getTime() - this.passed_time
    this.update_display()
}

Timer.prototype.update_display = function() {
    var diff = Math.round((new Date().getTime() - this.start_time) / 1000)
    var time_left = this.init_time - diff

    var second = time_left % 60
    var minute = (time_left - second) / 60

    var second_st = second.toString()
    var minute_st = minute.toString()
    if(second_st.length < 2) second_st = '0' + second_st
    if(minute_st.length < 2) minute_st = '0' + minute_st

    if(second === 0 || (minute === 0 && 0 < second < 5)){
        navigator.vibrate(100)
        all.classList.add('alert')
    }

    if(second <= 1 && minute <= 0) {
        navigator.vibrate(100)
        all.classList.add('finish')
    }

    this.display.minute.innerHTML = minute_st
    this.display.second.innerHTML = second_st
}

Timer.prototype.next = function() {
    this.next_timer.activate()
    this.next_timer.start()
}

Timer.prototype.stop = function() {
    this.display.classList.remove('active')
    this.active = false
    this.passed_time =new Date().getTime() - this.start_time
}

Timer.prototype.reset = function() {
    active = noTimer
    this.display.classList.remove('active')
    this.start_time = new Date().getTime()
    this.update_display()

    for(const element of this.timers) {
        element.reset()
    }

}

Timer.prototype.reset_config = function(timers) {
    this.timers = timers
}

var presentation = null
var echange = null
var orient = null
var total = null
var active = noTimer
var all = null

var init = function() {
    all = document.getElementsByTagName('body')[0]
    total = new Timer(20, 'total')
    orient = new Timer(5, 'orientation', total)
    echange = new Timer(10, 'echange', total)
    presentation = new Timer(5, 'presentation', total)

    total.reset_config([presentation, echange, orient])

    setInterval(updateTimers, 1000)
}

var updateTimers = function() {
    all.classList.remove('alert')
    all.classList.remove('finish')

    active.update_display()
    if(active.total_active) total.update_display()
}