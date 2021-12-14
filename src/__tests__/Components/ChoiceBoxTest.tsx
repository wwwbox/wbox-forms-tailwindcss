import {render} from "@testing-library/react";
import {ChoiceBoxBase} from "../../Components/ChoiceBoxBase";
import {ChoiceBoxClassName} from "../../Theme/Theme";

describe('ChoiceBox', () => {

    it('should render choice box', async function () {
        const classNames: ChoiceBoxClassName = {
            optionText: {error: '', normal: ''},
            space: {horizontal: {normal: '', error: ''}, vertical: {error: '', normal: ''}},
            wrapper: {normal: '', error: ''},
            input: {horizontal: {error: '', normal: ''}, vertical: {error: '', normal: ''}},
            label: {vertical: {error: '', normal: ''}, horizontal: {error: '', normal: ''}}
        };
        const classNameBuilderMock = {
            build: jest.fn()
        };
        classNameBuilderMock.build.mockReturnValueOnce('label-class')
            .mockReturnValueOnce('input-class')
            .mockReturnValueOnce('space-class')
            .mockReturnValueOnce('text-class');
        const fieldStateMock: any = {};
        const wrapper = render(<ChoiceBoxBase type={'radio'}
                                              classNames={classNames}
                                              classNameBuilder={classNameBuilderMock}
                                              orientation={'vertical'}
                                              field={fieldStateMock}
                                              dataTestId={'test-id'}
                                              name={'testing-name'}
                                              checked={false}
                                              value={'testing-value'}
                                              handleChange={jest.fn()}
                                              text={'testing-label'}/>
        );

        const input = wrapper.getByTestId('test-id') as HTMLInputElement;
        expect(input.type).toEqual('radio');
        expect(input.name).toEqual('testing-name');
        expect(input.className).toEqual('input-class');
        expect(input.checked).toEqual(false);
        expect(input.value).toEqual('testing-value');
        const label = input.parentElement as HTMLLabelElement;
        expect(label.className).toEqual('label-class');
        const spaceElement = label.querySelectorAll('span')[0];
        const textElement = label.querySelectorAll('span')[1];
        expect(spaceElement.className).toEqual('space-class');
        expect(textElement.className).toEqual('text-class');
        expect(textElement.textContent).toEqual('testing-label');

        //handleChange could not be tested check this
        //https://github.com/testing-library/react-testing-library/issues/532#issuecomment-554728634

    });

});