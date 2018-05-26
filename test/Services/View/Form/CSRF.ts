import 'mocha';
import {expect} from 'chai';

import CSRF from "../../../../src/vendor/Nterprise/View/Form/Fields/CSRF";

describe('new CSRF().render()', () => {
    it('should throw if name not provided.', () => {
        expect(() => {
            new CSRF().setLabel('User Name').setValue('ardeshnachirag@gmail.com').render();
        }).to.throw("Name can not be empty.");
    })
});

describe('new CSRF().render()', () => {
    it('should render text field.', () => {
        let csrfField = new CSRF()
            .setName('_csrf')
            .setValue('_csrfToken');

        let expectedField = `input(type="hidden" name="_csrf" value="_csrfToken")`;

        expect(csrfField.render()).to.equal(expectedField);
    })
});