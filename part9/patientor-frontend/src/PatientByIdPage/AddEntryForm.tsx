import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField, NumberField, DiagnosisSelection, EntryTypeOption } from "./FormField";
import { Entry, EntryType } from "../types";
import { useStateValue } from "../state";

/*
 * use type Entry, but omit id
 * because it is irrelevant for new Entry object.
 */
export type EntryFormValues = Omit<Entry, "id">;

const entryTypeOptions: EntryTypeOption[] = [
  { value: EntryType.HealthCheck, label: "Health check" },
  { value: EntryType.Hospital, label: "Hospital" },
  // { value: EntryType.OccupationalHealthcare, label: "Occupational healthcare" },
];

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {

  const [{ diagnoses }] = useStateValue();

  const isValidDate = (dateString: string) => {
    const regEx = /^\d{4}-\d{2}-\d{2}$/;
    // return true when array not null ie. dateString matches regEx
    return regEx.exec(dateString) != null;
  };

  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        type: EntryType.HealthCheck,
        healthCheckRating: 0,
        dischargeDate: "",
        dischargeCriteria: ""
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        // place all errors in object dictionary
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        else if (values.description.length < 20) {
          errors.description = 'Description min. length is 20';
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        else if (!isValidDate(values.date)) {
          errors.date = 'Date must be formatted YYYY-MM-DD';
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        else if (values.specialist.length < 5) {
          errors.specialist = 'Specialist min. length is 5';
        }
        if (values.dischargeDate) {
          if (!isValidDate(values.dischargeDate)) {
            errors.dischargeDate = 'Date must be formatted YYYY-MM-DD';
          }
        }
        if (values.dischargeCriteria) {
          if (values.dischargeCriteria.length < 10) {
            errors.dischargeCriteria = 'Criteria min. length is 10';
          }
        }
        return errors;
      }}
    >
      {/* isValid returns true if errors is empty */}
      {/* dirty returns false if fields have not been changed */}
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {

        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <SelectField
              label="Type of visit"
              name="type"
              options={entryTypeOptions}
            />
            {/* show below field for Heathcheck */}
            {values.type === EntryType.HealthCheck ?
              <Field
                label="Health check rating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
              />
              : null}
            {/* show below fields for Hospital */}
            {values.type === EntryType.Hospital ? (
              <div>
                <Field
                  label="Discharge date"
                  placeholder="YYYY-MM-DD"
                  name="dischargeDate"
                  component={TextField}
                />
                <Field
                  label="Discharge criteria"
                  placeholder="Criteria"
                  name="dischargeCriteria"
                  component={TextField}
                />
              </div>
            )
              : null}

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

export default AddEntryForm;
