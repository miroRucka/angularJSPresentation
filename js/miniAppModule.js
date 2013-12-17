/**
 * Created with JetBrains WebStorm.
 * User: rucka
 * Date: 30.4.2013
 * Time: 15:46
 * To change this template use File | Settings | File Templates.
 */
var dataModule = angular.module('miniAppServices', ['ngResource']);

dataModule.factory('a', function () {
    var Data = function(){
        this.pozicie = new Array();
        this.ludia = new Array();
        this.init();
    };

    Data.prototype.init = function(){
        var pozicie = new Array();
        pozicie.push("developer");
        pozicie.push("designer");
        pozicie.push("manager");
        this.pozicie = pozicie;

        var ludia = new Array();
        ludia.push({id:0, meno:"Mark", adresa:"ZA", pozicia: this.pozicie[0]});
        ludia.push({id:1, meno:"Jink", adresa:"BA",pozicia: this.pozicie[1]});
        this.ludia = ludia;
    };

    Data.prototype.readClovek = function(id){
        return this.ludia[id];
    }

    Data.prototype.getLudia = function(){
        return this.ludia;
    }

    Data.prototype.getPozicie = function(){
        return this.pozicie;
    }

    Data.prototype.odstranPolozku = function(id){
        this.ludia.splice(id, 1);
    }

    Data.prototype.editujPolozku = function(id, newClovek){
        this.ludia[id] = newClovek;
    }

    Data.prototype.pridajPolozku = function(clovek){
        clovek.id = this.ludia.length;
        this.ludia.push(clovek);
    }

    return new Data();
});

dataModule.factory('staticData', function ($resource) {

    var Data = $resource('https://api.mongolab.com/api/1/databases/pads/collections/ludia/:id',
        { apiKey:'50aa9414e4b0c97193006de8' },
        { update:{ method:'PUT' }},
        { delete:{ method: 'DELETE'}}
    );

    Data.prototype.initPozicie = function(){
        var pozicie = new Array();
        pozicie.push("developer");
        pozicie.push("designer");
        pozicie.push("manager");
        this.pozicie = pozicie;
    };

    Data.prototype.readClovek = function(clovekId, getData){
        var test = Data.get({id:clovekId}, getData);
        return test;
    }

    Data.prototype.getLudia = function(){
        return Data.query();
    }

    Data.prototype.getPozicie = function(){
        return this.pozicie;
    }

    Data.prototype.odstranPolozku = function(clovekId, cb){
        Data.remove({id: clovekId}, cb);
    }

    Data.prototype.editujPolozku = function(id, newClovek, cb){
        var newObject = angular.extend({}, newClovek, {_id:undefined});
        Data.update({id:newClovek._id.$oid}, newObject, cb);
    }

    Data.prototype.pridajPolozku = function(clovek, cb){
        Data.save(clovek, cb);
    }

    var data = new Data();
    data.initPozicie();
    return data;
});