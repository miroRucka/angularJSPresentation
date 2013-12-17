/**
 * @autor rucka
 */
describe("Unit: Testing services", function () {

    beforeEach(function () {
        module('pads');
    });

    it('should contain a service',
        inject(function (sluzba) {
            expect(sluzba).not.toBe(null);
        }));

    it('test for static data',
        inject(function (a) {
            expect(a.getLudia().length).toEqual(2);
        }));

    it('test for remove one item from static data',
        inject(function (a) {
            a.odstranPolozku(0);
            expect(a.getLudia().length).toEqual(1);
        }));

});