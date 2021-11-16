import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import SelectField from "../../Components/SelectField";
import {Form} from "wbox-forms";

describe('SelectField', () => {
    const options = [
        {text: 'Option 1', value: '1'},
        {text: 'Option 2', value: '2'},
    ];

    it('should render select element', async function () {
        render(<Form>
            <SelectField name={'test'} options={options}/>
        </Form>);
        const option1 = await waitFor(() => screen.getByText(options[0].text)) as HTMLOptionElement;
        const option2 = await waitFor(() => screen.getByText(options[1].text)) as HTMLOptionElement;
        expect(option1.value).toEqual(options[0].value);
        expect(option2.value).toEqual(options[1].value);
    });

    it('should handle change', async function () {
        render(<Form>
            <SelectField name={'test'} options={options}/>
        </Form>);
        let select = screen.getByTestId('wbox-field-test') as HTMLSelectElement;
        fireEvent.change(select, {target: {value: '2'}});
        expect(select.value).toEqual("2");
    });
})