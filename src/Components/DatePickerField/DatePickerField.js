import { useField } from "formik";
import DatePicker from "react-datepicker";

const DatePickerField = ({ ...props }) => {
    const [field, , { setValue }] = useField(props);

    return (
        <DatePicker
            closeOnScroll={true}
            dateFormat="MM/dd/yyyy"
            {...field}
            {...props}
            selected={(field.value && new Date(field.value)) || null}
            on
            onChange={(val) => {
                setValue(val);
            }}
        />
    );
};

export default DatePickerField;
