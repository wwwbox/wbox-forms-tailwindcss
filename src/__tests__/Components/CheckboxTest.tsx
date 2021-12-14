import {render} from "@testing-library/react";
import Checkbox from "../../Components/Checkbox";
import {Form} from "wbox-forms";

describe('Checkbox', () => {
    it('should render checkbox with empty text', function () {
        const wrapper = render(<Form>
            <Checkbox name={'testing-checkbox'}/>
        </Form>);

        const input = wrapper.getByTestId('wbox-field-testing-checkbox') as HTMLInputElement;
        expect(input.type).toEqual('checkbox');
        const label = input.parentElement as HTMLLabelElement;
        const textElement = label.querySelectorAll('span')[1];
        expect(textElement.textContent).toEqual('');
    });

    it('should render checkbox with text', function () {
        const wrapper = render(<Form>
            <Checkbox name={'testing-checkbox'} text={'testing-label'}/>
        </Form>);
        const input = wrapper.getByTestId('wbox-field-testing-checkbox') as HTMLInputElement;
        const label = input.parentElement as HTMLLabelElement;
        const textElement = label.querySelectorAll('span')[1];
        expect(textElement.textContent).toEqual('testing-label');
    });
})