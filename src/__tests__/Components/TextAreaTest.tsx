import {render, screen} from "@testing-library/react";
import {Form} from "wbox-forms";
import userEvent from "@testing-library/user-event";
import React from "react";
import TextArea from "../../Components/TextArea";

describe('TextArea', () => {

    it('should render field with default props', function () {
        render(
            <Form>
                <TextArea name={'testing'} placeholder={'placeholder'} rows={5}/>
            </Form>
        );
        let input = screen.getByTestId('wbox-field-testing') as HTMLTextAreaElement;
        expect(input.name).toEqual('testing');
        expect(input.rows).toEqual(5);
        expect(input.className).toBeTruthy();
        expect(input.placeholder).toEqual('placeholder');
    });

    it('should override using inputProps', function () {
        render(<Form>
            <TextArea name={'testing'} rows={5} placeholder={'placeholder'}
                      inputProps={{
                          name: 'xyz',
                          title: 'test-title',
                          placeholder: 'my-placeholder',
                          className: 'test-class',
                          rows: 3
                      }}/>
        </Form>);
        let input = screen.getByTestId('wbox-field-testing') as HTMLTextAreaElement;
        expect(input.name).toEqual('xyz');
        expect(input.title).toEqual('test-title');
        expect(input.placeholder).toEqual('my-placeholder');
        expect(input.className).toEqual('test-class');
        expect(input.rows).toEqual(3);
    });

    it('should not override value,onChange when using inputProps', function () {
        let onChangeMock = jest.fn();
        render(<Form>
            <TextArea name={'testing'} placeholder={'placeholder'}
                      inputProps={{
                          value: 'XYZ',
                          onChange: onChangeMock
                      }}/>
        </Form>);
        let input = screen.getByTestId('wbox-field-testing') as HTMLTextAreaElement;
        expect(input.value).not.toEqual('XYZ');
        userEvent.type(input, "test");
        expect(onChangeMock).not.toBeCalled();
    });

    it('should handle change', async function () {
        render(<Form><TextArea name={'test'}/></Form>);
        let input = screen.getByTestId('wbox-field-test') as HTMLTextAreaElement;
        userEvent.type(input, "some-value");
        expect(input.value).toEqual("some-value");
    });

});