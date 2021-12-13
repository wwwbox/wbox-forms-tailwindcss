import {configure} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import {DateField, DateTimeField, PasswordField, TextField, TimeField} from "../../Components/TextField";
import {Form} from "wbox-forms";
import {cleanup, render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

configure({adapter: new Adapter()});

describe('TailwindInputField', () => {

    it('should render text-field with default props', function () {
        render(
            <Form>
                <TextField name={'testing'} autoComplete={'off'} placeholder={'placeholder'}/>
            </Form>
        );
        let input = screen.getByTestId('wbox-field-testing') as HTMLInputElement;
        expect(input.name).toEqual('testing');
        expect(input.type).toEqual('text');
        expect(input.autocomplete).toEqual('off');
        expect(input.className).toBeTruthy();
        expect(input.placeholder).toEqual('placeholder')
    });

    it('should override using inputProps', function () {
        render(<Form>
            <TextField name={'testing'} autoComplete={'off'} placeholder={'placeholder'}
                       inputProps={{
                           name: 'xyz',
                           type: 'email',
                           title: 'test-title',
                           placeholder: 'my-placeholder',
                           className: 'test-class',
                           autoComplete: 'search'
                       }}/>
        </Form>);
        let input = screen.getByTestId('wbox-field-testing') as HTMLInputElement;
        expect(input.name).toEqual('xyz');
        expect(input.type).toEqual('email');
        expect(input.autocomplete).toEqual('search');
        expect(input.className).toEqual('test-class');
        expect(input.placeholder).toEqual('my-placeholder');
    });

    it('should not override value,onChange when using inputProps', function () {
        let onChangeMock = jest.fn();
        render(<Form>
            <TextField name={'testing'} autoComplete={'off'} placeholder={'placeholder'}
                       inputProps={{
                           value: 'XYZ',
                           onChange: onChangeMock
                       }}/>
        </Form>);
        let input = screen.getByTestId('wbox-field-testing') as HTMLInputElement;
        expect(input.value).not.toEqual('XYZ');
        userEvent.type(input, "test");
        expect(onChangeMock).not.toBeCalled();
    });

    it('should handle change', async function () {
        render(<Form><TextField name={'test'}/></Form>);
        let input = screen.getByTestId('wbox-field-test') as HTMLInputElement;
        userEvent.type(input, "some-value");
        expect(input.value).toEqual("some-value");
    });

    function testType(Component: any, expectedType: string) {
        const wrapper = render(
            <Form>
                <Component name={'testing'}/>
            </Form>
        );
        let input = wrapper.getByTestId('wbox-field-testing') as HTMLInputElement;
        expect(input.type).toEqual(expectedType);
        cleanup();
    }

    it('should render different types of input', function () {
        testType(PasswordField , "password");
        testType(DateField , "date");
        testType(TimeField , "time");
        testType(DateTimeField , "datetime-local");
    });

});