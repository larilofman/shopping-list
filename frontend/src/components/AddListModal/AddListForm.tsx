import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { TextField } from '../FieldForm';
import { useStateValue } from '../../state';

interface Props {
    onSubmit: (values: { name: string }) => void;
    onCancel: () => void;
}

export const AddListForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [{ lists }] = useStateValue();
    return (
        <Formik
            initialValues={{
                name: "",
            }}
            onSubmit={onSubmit}
            validate={values => {
                const requiredError = "Field is required";
                const uniqueViolationError = 'List with that name already exists';
                const errors: { [field: string]: string } = {};
                if (!values.name) {
                    errors.name = requiredError;
                }
                if (lists.map(l => l.name).includes(values.name)) {
                    errors.name = uniqueViolationError;
                }
                return errors;
            }}
        >
            {({ isValid, dirty }) => {
                return (
                    <Form className="form ui">
                        <Field
                            label="Name of the list"
                            placeholder="Name"
                            name="name"
                            component={TextField}
                            autoFocus={true}
                        />
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button type="button" onClick={onCancel} color="red">
                                    Cancel
                                </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                    type="submit"
                                    floated="right"
                                    color="green"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddListForm;
