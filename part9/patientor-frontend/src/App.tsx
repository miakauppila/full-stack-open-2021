import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { setDiagnosesAction, setPatientListAction, useStateValue } from "./state";
import { Patient, Diagnosis } from "./types";

import PatientListPage from "./PatientListPage";
import PatientByIdPage from "./PatientByIdPage";

const App = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        //dispatch({ type: "SET_PATIENT_LIST", payload: patientListFromApi });
        dispatch(setPatientListAction(patientListFromApi));
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.error(e.message || 'Unknown Error');
        }
      }
    };

    const fetchDiagnosesList = async () => {
      try {
        const { data: diagnosesData } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        //dispatch({ type: "SET_DIAGNOSES_LIST", payload: diagnosesData });
        dispatch(setDiagnosesAction(diagnosesData));
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.error(e.message || 'Unknown Error');
        }
      }
    };

    void fetchPatientList();
    void fetchDiagnosesList();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route exact path="/">
              <PatientListPage />
            </Route>
            <Route path="/patients/:id">
              <PatientByIdPage />
            </Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
