import 'mocha';
import {expect} from 'chai';

import CSRF from "../../../../../src/vendor/Nterprise/View/Form/Fields/CSRF";

describe('new CSRF().output()', () => {
    it('should render text field.', () => {
        let csrfField = new CSRF()
            .setName('_csrf')
            .setValue('_csrfToken');

        let expectedField = `input(type="hidden" name="_csrf" value="_csrfToken")`;

        expect(csrfField.output()).to.equal(expectedField);
    })
});