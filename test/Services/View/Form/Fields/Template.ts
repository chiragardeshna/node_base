import 'mocha';
import {expect} from 'chai';

import TextField from "../../../../../src/vendor/Nterprise/View/Form/Fields/TextField";
import Template from  "../../../../../src/vendor/Nterprise/View/Form/Fields/Template";
import {PUG_SPACE} from "../../../../../src/vendor/Nterprise/View/Constants"

let template = `.form-group.form-float
${PUG_SPACE}.form-line{{errorClass}}
${PUG_SPACE.repeat(2)}{{field}}`;

describe("new Template()", () => {
    describe(".render()", () => {
        it("should render field with given template.", () => {

            let textField = new TextField().setName('username').setLabel('Username');

            let renderedField = new Template(template).render(textField);

            let expectedField = `.form-group.form-float
    .form-line
        input#username.form-control(type="text" name="username" value="" )
        label.form-label Username`;

            expect(renderedField).to.equal(expectedField);
        });
    });

    describe(".render()", () => {
        it("should throw error if given field has no name.", () => {

            let textField = new TextField().setLabel('Username');

            expect(() => {
                new Template(template).render(textField)
            }).to.throw("Name can not be empty.");
        });
    });
});