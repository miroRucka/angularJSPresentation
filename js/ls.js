/**
 * @fileOverview Data service
 * @author <a href="mailto:nike@nike.sk">NIKÃ‰, spol. s r.o.</a>
 * @version 0.0.1
 */'use strict';

/**
 * Data service bude zabalovat vsetky volania na server.
 * Tato vrstva sa v uducnosti bude menit napr za XMPP. Taktiez bude sluzit ako proxy resp cache pre volania.
 */
angular.module("data.service", []);

angular.module("data.service").service('dataService', function() {
    var _subscribeCb = [];
    var _events = [];
    //dummy init data
    for (var i = 1; i < 10; i++) {
        _events.push({
            id : i,
            team : {
                home : 'Home team ' + i,
                away : 'Away team ' + i
            },
            score : {
                home : 0,
                away : 0
            },
            name : 'Event name ' + i,
            status : 'Event status ' + i,
            odds : {
                home : 1 + Math.floor(Math.random() * 11),
                draw : 1 + Math.floor(Math.random() * 11),
                away : 1 + Math.floor(Math.random() * 11)
            },
            favorite : false

        });
    }
    //generate dummy data
    var t = setInterval(function() {
        for (var i = 0; i < _events.length; i++) {
            _events[i].odds = {
                home : 1 + Math.floor(Math.random() * 11),
                draw : 1 + Math.floor(Math.random() * 11),
                away : 1 + Math.floor(Math.random() * 11)
            }
        }

        //push "data" to subscribers
        broadcast(_events);
    }, 1500);

    /**
     * Broadcast to subscribers
     */
    var broadcast = function(data) {
        for (var i = 0; i < _subscribeCb.length; i++) {
            _subscribeCb[i](data);
        }
    };
    /**
     * Get events (dummy data)
     */
    this.getEvents = function() {
        return _events;
    }

    /**
     * Subscribe for events from data service
     */
    this.subscribe = function(cb) {
        _subscribeCb.push(cb);
    };

});
/**
 * Created with JetBrains WebStorm.
 * User: rucka
 * Date: 18.6.2013
 * Time: 14:49
 * To change this template use File | Settings | File Templates.
 */
