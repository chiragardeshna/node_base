import container from "../../../src/Services/Container/Container";
import TestObject from "./TestObject";

import 'mocha';
import {expect} from 'chai';

describe('new Container().register()', () => {
    it('should register factory function.', () => {

        container.register("testObject", () => {
            let name = Math.random();
            return new TestObject(name);
        });

        let testObject = container.make("testObject");
    });
});

describe('new Container().register()', () => {
    it('should register singleton object.', () => {

        container.register("testObject", () => {
            let name = Math.random();
            return new TestObject(name);
        }, "singleton");

        let testObject = container.make("testObject");

        let testObject2 = container.make("testObject");

        expect(testObject === testObject2).to.equal(true);
    });
});