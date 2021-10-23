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
  { value: EntryType.OccupationalHealthcare, label: "Occupational healthcare" },
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
        discharge: {
          date: "",
          criteria: ""
        },
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: ""
        }
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        // place all errors in object dictionary
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const errors: { [field: string]: any } = {};

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
        if (values.discharge.date) {
          if (!isValidDate(values.discharge.date)) {
            errors.discharge = {};
            errors.discharge.date = 'Date must be formatted YYYY-MM-DD';
          }
        }
        if (values.discharge.criteria) {
          if (values.discharge.criteria.length < 10) {
            errors.discharge = {};
            errors.discharge.criteria = 'Criteria min. length is 10';
          }
        }
        if (values.type === EntryType.OccupationalHealthcare) {
          if (!values.employerName) {
            errors.employerName = requiredError;
          }
          else if (values.employerName.length < 3) {
            errors.employerName = 'Employer name min. length is 3';
          }
        }
        if (values.sickLeave.startDate) {
          if (!isValidDate(values.sickLeave.startDate)) {
            errors.sickLeave = {};
            errors.sickLeave.startDate = 'Date must be formatted YYYY-MM-DD';
          }
          if (!values.sickLeave.endDate) {
            errors.sickLeave = {};
            errors.sickLeave.endDate = 'In case of sick leave, both start and end dates are required';
          }
        }
        if (values.sickLeave.endDate) {
          if (!isValidDate(values.sickLeave.endDate)) {
            errors.sickLeave = {};
            errors.sickLeave.endDate = 'Date must be formatted YYYY-MM-DD';
          }
          if (!values.sickLeave.startDate) {
            errors.sickLeave = {};
            errors.sickLeave.startDate = 'In case of sick leave, both start and end dates are required';
          }
        }
        return errors;
      }}
    >
      {/* isValid returns true if errors is empty */}
      {/* dirty returns false if fields have not been changed */}
      {
        ({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {

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
                    name="discharge.date"
                    component={TextField}
                  />
                  <Field
                    label="Discharge criteria"
                    placeholder="Criteria"
                    name="discharge.criteria"
                    component={TextField}
                  />
                </div>
              )
                : null}

              {/* show below fields for Occupational Healthcare */}
              {values.type === EntryType.OccupationalHealthcare ? (
                <div>
                  <Field
                    label="Employer name"
                    placeholder="Employer name"
                    name="employerName"
                    component={TextField}
                  />
                  <Field
                    label="Sick leave start date"
                    placeholder="YYYY-MM-DD"
                    name="sickLeave.startDate"
                    component={TextField}
                  />
                  <Field
                    label="Sick leave end date"
                    placeholder="YYYY-MM-DD"
                    name="sickLeave.endDate"
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
        }
      }
    </Formik >
  );
};

export default AddEntryForm;
