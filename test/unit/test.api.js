var $ = window.$;
var server;
function clearStorage() {
    window.localStorage.clear();
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

            function simpleAjaxWithCache (callback) {
                $.ajax({
                    ajaxCache: true,
                    url:'config/cacheValidate/true',
                    success: function (data) {
                        console.log(data);
                        callback(data);
                    }
                });
            }

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
                    JSON.stringify({name: 'request 1'})
                );

                // second time without server respond
                simpleAjaxWithCache (callback)

                expect(callback).always.have.been.calledWithMatch({name: 'request 1'});
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
                    JSON.stringify({name: 'request 1'})
                );
                expect(callback).have.been.calledWithMatch({name: 'request 1'});

                // first time
                simpleAjaxWithCache(callback);
                server.requests[1].respond(
                    200,
                    { "Content-Type": "application/json" },
                    JSON.stringify({name: 'request 2'})
                );
                expect(callback).have.been.calledWithMatch({name: 'request 2'});

            })
        });
    });

    describe('#custom', function () {
        // TODO:
    });

});
