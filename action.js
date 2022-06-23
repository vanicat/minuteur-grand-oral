var Timer = function(time, display_name, total, next) {
    display = document.getElementById(display_name)
    this.init_time = time * 60
    this.start_time = null
    this.display = display
    this.display.minute = this.display.getElementsByClassName("minute")[0]
    this.display.second = this.display.getElementsByClassName("second")[0]
    this.active = false
    this.next_timer = next
    this.total_timer = total
    this.timers = []
    this.total_active = true

    button = display.getElementsByClassName("start")
    if(button.length > 0){   
        var me = this
        button[0].addEventListener('click', function () {
            me.activate()
            me.start()
            total.start()
        })
    }

    button = display.getElementsByClassName("next")
    if(button.length > 0){   
        var me = this
        button[0].addEventListener('click', function () {me.next()})
    }

    button = display.getElementsByClassName("reset")
    if(button.length > 0){   
        var me = this
        button[0].addEventListener('click', function () {me.reset()})
    }
}

Timer.prototype.activate = function() {
    active.stop()
    active = this
}

Timer.prototype.start = function() {
    this.active = true
    this.display.classList.add('active')
    this.start_time = new Date().getTime()
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

    if(second === 0 || (minute === 0 && second < 5)){
        navigator.vibrate(100)
        all.classList.add('alert')
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
}

Timer.prototype.reset = function() {
    active = {
        stop: function() {},
        update_display: function () {},
        total_active: false
    }
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
var active = {
    stop: function() {},
    update_display: function () {},
    total_active: false
}
var all = null

var init = function() {
    all = document.getElementsByTagName('body')[0]
    total = new Timer(20, 'total')
    orient = new Timer(5, 'orientation', total)
    echange = new Timer(10, 'echange', total, orient)
    presentation = new Timer(5, 'presentation', total, echange)

    total.reset_config([presentation, echange, orient])

    setInterval(updateTimers, 1000)
}

var updateTimers = function() {
    all.classList.remove('alert')
    active.update_display()
    if(active.total_active) total.update_display()
}