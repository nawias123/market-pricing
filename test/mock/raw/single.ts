import test from 'ava';
import * as nock from 'nock';

import {
    Application,
    Currency,
} from '@node-steam/data';

import {
    Market,
} from 'lib';

import {
    base,
    path,
} from 'test/settings';

// First Valid Item Request
nock(base)
.get(path)
.query({
    appid: Application.CSGO,
    currency: Currency.USD,
    market_hash_name: 'FirstItem',
})
.reply(200, {
    lowest_price: '$1.00',
    median_price: '$1.30',
    success: true,
    volume: '328',
});

const API = new Market({ id: Application.CSGO, currency: Currency.USD, raw: true });

test('Raw Request For Single Item', async (t) => {
    const item = await API.getPrice('FirstItem', { raw: true });
    const should = {
        lowest_price: '$1.00',
        median_price: '$1.30',
        success: true,
        volume: '328',
    };
    t.deepEqual(item, should);
});
