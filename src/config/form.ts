import {PUG_SPACE} from "../vendor/Nterprise/View/Constants";
export default {
    field: {

        error: 'span.error {{error}}',
        label: 'label.form-label(for="{{id}}") {{label}}',

        template: `.form-group
${PUG_SPACE}.form-line{{errorClass}}
${PUG_SPACE.repeat(2)}{{field}}`,

        csrf: {
            template: `{{field}}`
        },
        radio: {
            template: `{{field}}`
        },
        checkbox: {
            template: `{{field}}`
        }
    }
};