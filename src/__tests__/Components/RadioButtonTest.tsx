import {render} from "@testing-library/react";
import {Form} from "wbox-forms";
import RadioButton from "../../Components/RadioButton";

describe('RadioButton', () => {

    it('should render radio button', function () {
        let options = [{text: 'option 1', value: 'v1'}, {text: 'option 2', value: 'v2'}];
        const wrapper = render(<Form>
            <RadioButton name={'testing-radio'} options={options}/>
        </Form>);

        const inputs = wrapper.getAllByTestId('wbox-field-testing-radio') as HTMLInputElement[];
        for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i];
            expect(input.type).toEqual('radio');
            const label = input.parentElement as HTMLLabelElement;
            const textElement = label.querySelectorAll('span')[1];
            expect(textElement.textContent).toEqual(options[i].text);
            const spaceSpan = label.nextElementSibling;
            if (i < inputs.length - 1) {
                // eslint-disable-next-line jest/no-conditional-expect
                expect(spaceSpan).toBeTruthy();
            } else {
                // eslint-disable-next-line jest/no-conditional-expect
                expect(spaceSpan).toEqual(null);
            }
        }
    });

});