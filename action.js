const noTimer =  {
    stop: function() {},
    update_display: function () {},
}

const Timer = function(time, display_name, total) {
    display = document.getElementById(display_name)
    this.init_time = time * 60
    this.passed_time = 0
    this.start_time = null
    this.started = false
    this.timers = []
    this.total_timer = total

    this.display = display
    this.display.minute = this.display.getElementsByClassName("minute")[0]
    this.display.second = this.display.getElementsByClassName("second")[0]

    const me = this
    this.display.addEventListener('click', function () { me.on_click() })
}

Timer.prototype.on_click = function() {
    if(this.started) return
    if(this.total_timer === undefined) return

    this.activate()
    this.start()
    if(! this.total_timer.started) total_timer.start()
}

Timer.prototype.activate = function() {
    active_timer.stop()
    active_timer = this
}

Timer.prototype.start = function() {
    this.started = true
    this.display.classList.add('active')
    this.start_time = new Date().getTime() - this.passed_time
    this.update_display()
}

Timer.prototype.update_display = function() {
    var fulldiff = (new Date().getTime() - this.start_time) / 1000
    var diff = Math.round(fulldiff)
    var halfdiff =  fulldiff - diff
    var time_left = this.init_time - diff

    var second = time_left % 60
    var minute = (time_left - second) / 60

    var second_st = second.toString()
    var minute_st = minute.toString()
    if(second_st.length < 2) second_st = '0' + second_st
    if(minute_st.length < 2) minute_st = '0' + minute_st

    if(second === 0 || (minute === 0 && 0 < second && second < 10 && halfdiff < 0) ){
        navigator.vibrate(100)
        body.classList.add('alert')
    }

    if(second <= 1 && minute <= 0) {
        navigator.vibrate(100)
        body.classList.add('finish')
    }

    this.display.minute.innerHTML = minute_st
    this.display.second.innerHTML = second_st
}

Timer.prototype.stop = function() {
    active_timer = noTimer
    this.display.classList.remove('active')
    this.started = false
    this.passed_time = new Date().getTime() - this.start_time
}

Timer.prototype.reset = function() {
    this.display.classList.remove('active')
    this.start_time = new Date().getTime()
    this.passed_time = 0
    this.update_display()

    for(const element of this.timers) {
        element.reset()
    }

}

Timer.prototype.pause = function() {
    self.active_timer = false
    this.total_timer.stop()
    this.stop()
}

const reset_all = function() {
    active_timer.stop()
    total_timer.stop()
    active_timer = noTimer

    for(const timer of [presentation_timer, echange_timer, orient_timer, total_timer]) {
        timer.reset()
    }
}

var presentation_timer = null
var echange_timer = null
var orient_timer = null
var total_timer = null
var reset_button = null
var pause_button = null
var active_timer = noTimer
var body = null

var init = function() {
    body = document.getElementsByTagName('body')[0]
    total_timer = new Timer(20, 'total')
    orient_timer = new Timer(5, 'orientation', total_timer)
    echange_timer = new Timer(10, 'echange', total_timer)
    presentation_timer = new Timer(5, 'presentation', total_timer)

    reset_button = document.getElementById('reinit')
    reset_button.onclick = reset_all

    pause_button = document.getElementById('pause')
    pause_button.onclick = function () { active_timer.pause() }

    setInterval(updateTimers, 500)
}

var updateTimers = function() {
    body.classList.remove('alert')
    body.classList.remove('finish')

    active_timer.update_display()
    if(total_timer.started) total_timer.update_display()
}
