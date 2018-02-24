import container from "../../../src/Services/Container/Container";
import TestObject from "./TestObject";

import 'mocha';
import {expect} from 'chai';

describe('new Container().register()', () => {
    it('should register factory function.', () => {

        container.register("testObject", () => {
            return new TestObject("test");
        });

        let testObject = container.make("testObject");

        expect(testObject).to.equal(new TestObject("test"));
    });
});

describe('new Container().register()', () => {
    it('should register singleton object.', () => {

        let obj = new TestObject("test");

        container.register("testObject", () => obj, "singleton");

        let testObject = container.make("testObject");

        let testObject2 = container.make("testObject");

        console.log(testObject);

        console.log(testObject2);

        expect(testObject === testObject2).to.equal(true);
    });
});