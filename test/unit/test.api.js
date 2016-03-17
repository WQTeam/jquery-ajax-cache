var $ = window.$;
var server;
var clock;
function clearStorage() {
    window.localStorage.clear();
}
function simpleAjaxWithCache (callback) {
    $.ajax({
        ajaxCache: true,
        url:'config/cacheValidate/true',
        success: function (data) {
            callback(data);
        }
    });
}

describe('jquery-ajax-cache', function() {
    'use strict';
    before(function() {
        $ajaxCache.config(); // reset $ajaxCache
        clearStorage();
        server = sinon.fakeServer.create();
    });
    after(function() {
        server.restore();
        clearStorage();
    });

    describe('#config', function() {

        describe('#cacheValidate', function () {
            beforeEach(function() {
                server.restore();
                $ajaxCache.config(); // reset $ajaxCache
                clearStorage();
                server = sinon.fakeServer.create();
            });
            it('should be cached when cacheValidate return true', function () {
                var callback = sinon.spy();

                $ajaxCache.config({
                    cacheValidate: function(){
                        return true;
                    }
                });

                // first time
                simpleAjaxWithCache(callback);
                server.requests[0].respond(
                    200,
                    { "Content-Type": "application/json" },
                    JSON.stringify({name: 'cacheValidate 1'})
                );

                // second time without server respond
                simpleAjaxWithCache (callback);

                expect(callback).always.have.been.calledWithMatch({name: 'cacheValidate 1'});
            })
            it('should not be cached when cacheValidate return false', function () {
                var callback = sinon.spy();

                $ajaxCache.config({
                    cacheValidate: function(){
                        return false;
                    }
                });

                // first time
                simpleAjaxWithCache(callback);
                server.requests[0].respond(
                    200,
                    { "Content-Type": "application/json" },
                    JSON.stringify({name: 'cacheValidate 1'})
                );
                expect(callback).have.been.calledWithExactly({name: 'cacheValidate 1'});

                // first time
                simpleAjaxWithCache(callback);
                server.requests[1].respond(
                    200,
                    { "Content-Type": "application/json" },
                    JSON.stringify({name: 'cacheValidate 2'})
                );
                expect(callback).have.been.calledWithExactly({name: 'cacheValidate 2'});

            })
        });
        describe('#timeout', function () {
            beforeEach(function () {
                server.restore();
                $ajaxCache.config(); // reset $ajaxCache
                clearStorage();
                server = sinon.fakeServer.create();
                clock = sinon.useFakeTimers();
            });
            afterEach(function () {
                clock.restore();
            });

            it('should request again when timeout', function () {
                var callback = sinon.spy();

                $ajaxCache.config({
                    cacheValidate: function(){
                        return true;
                    },
                    timeout: 60 // seconds
                });

                // first time
                simpleAjaxWithCache(callback);
                server.requests[0].respond(
                    200,
                    { "Content-Type": "application/json" },
                    JSON.stringify({name: 'timeout 1'})
                );
                expect(callback).have.been.calledWithExactly({name: 'timeout 1'});

                clock.tick(30*1000);
                // not timeout
                simpleAjaxWithCache(callback);
                expect(callback).have.been.calledWithExactly({name: 'timeout 1'});

                clock.tick(30*1000);
                // timeout
                simpleAjaxWithCache (callback);
                server.requests[1].respond(
                    200,
                    { "Content-Type": "application/json" },
                    JSON.stringify({name: 'timeout 2'})
                );
                expect(callback).have.been.calledWithExactly({name: 'timeout 2'});
            })
        });
    });

    describe('#custom', function () {

        var customAjaxNoCache = function(callback) {
            $.ajax({
                ajaxCache: {
                    cacheValidate: function () {
                        return false
                    }
                },
                url:'config/cacheValidate/true',
                success: function (data) {
                    callback(data);
                }
            });
        }
        var customAjaxCache = function(callback) {
            $.ajax({
                ajaxCache: {
                    cacheValidate: function () {
                        return true;
                    }
                },
                url:'config/cacheValidate/true',
                success: function (data) {
                    callback(data);
                }
            });
        }

        describe('#cacheValidate', function () {
            beforeEach(function() {
                server.restore();
                $ajaxCache.config({
                    cacheValidate: function(){
                        return true;
                    }
                });
                clearStorage();
                server = sinon.fakeServer.create();
            });
            it('should not be cached when custom cacheValidate return false', function () {
                var callback = sinon.spy();

                // first time
                customAjaxNoCache(callback);
                server.requests[0].respond(
                    200,
                    { "Content-Type": "application/json" },
                    JSON.stringify({name: 'cacheValidate 1'})
                );
                expect(callback).have.been.calledWithExactly({name: 'cacheValidate 1'});

                // second time without server respond
                customAjaxNoCache (callback)
                server.requests[1].respond(
                    200,
                    { "Content-Type": "application/json" },
                    JSON.stringify({name: 'cacheValidate 2'})
                );
                expect(callback).have.been.calledWithExactly({name: 'cacheValidate 2'});
            })
            it('should be cached when custom cacheValidate return true', function () {
                var callback = sinon.spy();

                // first time
                customAjaxCache(callback);
                server.requests[0].respond(
                    200,
                    { "Content-Type": "application/json" },
                    JSON.stringify({name: 'cacheValidate 1'})
                );
                expect(callback).have.been.calledWithExactly({name: 'cacheValidate 1'});

                // second time without server respond
                customAjaxCache (callback)
                expect(callback).have.been.calledWithExactly({name: 'cacheValidate 1'});
            })
        });
        describe('#timeout', function () {

            beforeEach(function () {
                server.restore();
                $ajaxCache.config(); // reset $ajaxCache
                clearStorage();
                server = sinon.fakeServer.create();
                clock = sinon.useFakeTimers();
            });
            afterEach(function () {
                clock.restore();
            });
            var cache30second = function (callback) {
                $.ajax({
                    ajaxCache: {
                        timeout: 30 // seconds
                    },
                    url:'config/cacheValidate/true',
                    success: function (data) {
                        callback(data);
                    }
                });
            }

            it('should request again when coustom config timeout', function () {
                var callback = sinon.spy();

                $ajaxCache.config({
                    cacheValidate: function(){
                        return true;
                    },
                    timeout: 60 // seconds
                });

                // first time
                cache30second(callback);
                server.requests[0].respond(
                    200,
                    { "Content-Type": "application/json" },
                    JSON.stringify({name: 'timeout 1'})
                );
                expect(callback).have.been.calledWithExactly({name: 'timeout 1'});
                clock.tick(15*1000);
                // not timeout
                cache30second(callback);
                expect(callback).have.been.calledWithExactly({name: 'timeout 1'});

                clock.tick(15*1000);
                // timeout
                cache30second(callback);
                server.requests[1].respond(
                    200,
                    { "Content-Type": "application/json" },
                    JSON.stringify({name: 'timeout 2'})
                );
                expect(callback).have.been.calledWithExactly({name: 'timeout 2'});
            })
        });

        //  test forceRefresh
        //
        //
        describe('#forceRefresh', function () {

            beforeEach(function () {
                server.restore();
                $ajaxCache.config(); // reset $ajaxCache
                clearStorage();
                server = sinon.fakeServer.create();
                clock = sinon.useFakeTimers();
            });
            afterEach(function () {
                clock.restore();
            });
            var cache30second = function (callback) {
                $.ajax({
                    ajaxCache: {
                        timeout: 30 // seconds
                    },
                    url:'config/forceRefresh/true',
                    success: function (data) {
                        callback(data);
                    }
                });
            }
            var cacheForceReflash30second = function (callback) {
                $.ajax({
                    ajaxCache: {
                        timeout: 30, // seconds
                        forceRefresh: true
                    },
                    url:'config/forceRefresh/true',
                    success: function (data) {
                        callback(data);
                    }
                });
            }

            it('should force reflash cache', function () {
                var callback = sinon.spy();

                $ajaxCache.config({
                    cacheValidate: function(){
                        return true;
                    }
                });

                // first time
                cache30second(callback);
                server.requests[0].respond(
                    200,
                    { "Content-Type": "application/json" },
                    JSON.stringify({name: 'force reflash 1'})
                );
                expect(callback).have.been.calledWithExactly({name: 'force reflash 1'});
                clock.tick(15*1000);
                // not timeout
                cacheForceReflash30second(callback);
                server.requests[1].respond(
                    200,
                    { "Content-Type": "application/json" },
                    JSON.stringify({name: 'force reflash 2'})
                );
                expect(callback).have.been.calledWithExactly({name: 'force reflash 2'});

                clock.tick(25*1000);
                cache30second(callback);
                expect(callback).have.been.calledWithExactly({name: 'force reflash 2'});
            })
        });

    });
    describe('#data', function () {
        beforeEach(function () {
            server.restore();
            $ajaxCache.config(); // reset $ajaxCache
            clearStorage();
            server = sinon.fakeServer.create();
            clock = sinon.useFakeTimers();
        });
        afterEach(function () {
            clock.restore();
        });
        var customDefaultAjaxCache = function(sendData,callback) {
            $.ajax({
                ajaxCache: {
                    cacheValidate: function () {
                        return true;
                    }
                },
                data: sendData,
                url:'config/cacheValidate/true',
                success: function (data) {
                    callback(data);
                }
            });
        }
        var customOptionAjaxCache = function(sendData, callback, type) {
            $.ajax({
                ajaxCache: {
                    cacheValidate: function () {
                        return true;
                    }
                },
                type: type,
                data: sendData,
                url:'config/cacheValidate/' + type,
                success: function (data) {
                    callback(data);
                }
            });
        }
        describe('#default', function() {
            it('should request again when data is change', function () {
                var callback1 = sinon.spy();
                var callback2 = sinon.spy();
                var callback3 = sinon.spy();

                customDefaultAjaxCache({a:1}, callback1);
                server.requests[0].respond(
                    200,
                    { "Content-Type": "application/json" },
                    JSON.stringify({name: 'request 1'})
                );
                expect(callback1).have.been.calledWithExactly({name: 'request 1'});
                customDefaultAjaxCache({a:2}, callback2);
                server.requests[1].respond(
                    200,
                    { "Content-Type": "application/json" },
                    JSON.stringify({name: 'request 2'})
                );
                expect(callback2).have.been.calledWithExactly({name: 'request 2'});
                customDefaultAjaxCache({a:1}, callback3);
                expect(callback3).have.been.calledWithExactly({name: 'request 1'});
            })
        })
        describe('#post', function() {
            it('should request again when data is change', function () {
                var callback1 = sinon.spy();
                var callback2 = sinon.spy();
                var callback3 = sinon.spy();

                customOptionAjaxCache({a:1}, callback1, 'POST');
                server.requests[0].respond(
                    200,
                    { "Content-Type": "application/json" },
                    JSON.stringify({name: 'request 1'})
                );
                expect(callback1).have.been.calledWithExactly({name: 'request 1'});
                customOptionAjaxCache({a:2}, callback2, 'POST');
                server.requests[1].respond(
                    200,
                    { "Content-Type": "application/json" },
                    JSON.stringify({name: 'request 2'})
                );
                expect(callback2).have.been.calledWithExactly({name: 'request 2'});
                customOptionAjaxCache({a:1}, callback3, 'POST');
                expect(callback3).have.been.calledWithExactly({name: 'request 1'});
            })
        })
        describe('#get', function() {
            it('should request again when data is change', function () {
                var callback1 = sinon.spy();
                var callback2 = sinon.spy();
                var callback3 = sinon.spy();

                customOptionAjaxCache({a:1}, callback1, 'GET');
                server.requests[0].respond(
                    200,
                    { "Content-Type": "application/json" },
                    JSON.stringify({name: 'request 1'})
                );
                expect(callback1).have.been.calledWithExactly({name: 'request 1'});
                customOptionAjaxCache({a:2}, callback2, 'GET');
                server.requests[1].respond(
                    200,
                    { "Content-Type": "application/json" },
                    JSON.stringify({name: 'request 2'})
                );
                expect(callback2).have.been.calledWithExactly({name: 'request 2'});
                customOptionAjaxCache({a:1}, callback3, 'GET');
                expect(callback3).have.been.calledWithExactly({name: 'request 1'});
            })
        })
    })

});
