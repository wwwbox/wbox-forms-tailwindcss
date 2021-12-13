import {FieldValidator, Form} from "wbox-forms";
import SelectField from "../Components/SelectField";
import Checkbox from "../Components/Checkbox";
import RadioButton from "../Components/RadioButton";
import TextArea from "../Components/TextArea";
import {DateField, DateTimeField, PasswordField, TextField, TimeField} from "../Components/TextField";

class CheckValidator implements FieldValidator {
    validate(value: any, rules: any): boolean {
        console.log('validate', value);
        return value === true;
    }
}

export function AllElementsExample() {
    let colors = [
        {text: 'Red', value: 'red'},
        {text: 'Blue', value: 'blue'},
        {text: 'Green', value: 'green'}
    ];
    return <Form>
        <TextField name={'name'} autoComplete={'off'} validationRules={'^ali$'}/>
        <PasswordField name={'password'} validationRules={'pass'}/>
        <DateField name={'date'}/>
        <TimeField name={'time'}/>
        <DateTimeField name={'datetime'}/>
        <SelectField name={'color'} options={colors} validationRules={'^blue$'}/>
        <Checkbox name={'checkbox'} validationRules={true} fieldValidator={() => new CheckValidator()}
                  text={'Dummy Checkbox'}/>
        <RadioButton name={'radio'} validationRules={'^green$'} options={colors}/>
        <TextArea rows={5} placeholder={'Message...'} name={'message'}/>
    </Form>
}