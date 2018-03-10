import Hash from "../../../src/Services/Hash/Hash";
import 'mocha';
import {expect} from 'chai';

describe('Hash.compare()', () => {
    it('should compare hash of given string.', () => {
        let password = "TEST@123!x";
        Hash.make(password, 3).then((hashedString) => {
            Hash.check(password, hashedString).then((result) => {
                expect(result).to.equal(true);
            });
        });
    });
});