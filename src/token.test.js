import assert from 'assert'
import token from './token.js'

describe('token', () => {
    it('looks more or less like a valid access token', () => {
        assert(typeof token === 'string', `expected token to be typeof string but was ${ typeof token }`)

        const expectedLength = 40
        assert(token.length === expectedLength, `expected token to have a length of ${ expectedLength } but was ${ token.length }`)
    })
})
