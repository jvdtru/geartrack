const assert = require('chai').assert

const adicional = require('../src/adicionalTracker')
const moment = require('moment-timezone')
moment.tz.setDefault("Europe/Lisbon")

describe('Adicional', function() {
    this.timeout(0)

    describe('#Adicional', function() {
        it('should extract the messages from the website with success', function(done) {
            const id = '2016122222240929', code = 1750
            adicional.getInfo(id, code, (err, info) => {
                assert.isNull(err)

                assert.equal(moment(info.date_expedition).format("YYYY-MM-DD"), '2016-12-24')
                assert.equal(info.service_type, 'ENTREGA')
                assert.equal(moment(info.updated).format("YYYY-MM-DD HH:mm"), '2016-12-27 15:57')
                assert.equal(info.status, 'DESCARTADO')

                console.log(id + ' attempts: ' + info.retries)
                done()
            })

        });

        it('should fail to extract', function(done) {
            const id = '423423424', code = 1750
            adicional.getInfo(id, code, (err, info) => {
                assert.isNotNull(err)

                done()
            })

        });
    });


});