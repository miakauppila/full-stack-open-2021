import React from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Container, Icon } from "semantic-ui-react";

import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { setPatientFullDataAction, useStateValue } from "../state";
import Entries from "./Entries";

const PatientByIdPage = () => {
    const [{ patientsFullData }, dispatch] = useStateValue();
    const [error, setError] = React.useState<string | undefined>();

    const { id } = useParams<{ id: string }>();
    const foundPatient: Patient = patientsFullData[id];
    console.log('foundPatient:', foundPatient);

    //only fetch data if patientFullData not found
    React.useEffect(() => {
        if (foundPatient) return;
        const fetchPatientById = async (id: string) => {
            console.log('fetch patientFullData');
            try {
                const { data: patientData } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`
                );
                //dispatch({ type: "SET_PATIENT_FULL_DATA", payload: patientData });
                dispatch(setPatientFullDataAction(patientData));
            } catch (e: unknown) {
                if (e instanceof Error) {
                    console.error(e.message || 'Unknown Error');
                    setError(e.message || 'Unknown error');
                }
            }
        };
        void fetchPatientById(id);
    }, [id]);

    const getGenderIcon = (gender: string) => {
        if (gender === 'male') {
            return 'mars';
        }
        else if (gender === 'female') {
            return 'venus';
        }
        else {
            return 'genderless';
        }
    };

    if (error) {
        return (
            <div className="App">
                <Container>
                    {error}
                </Container>
            </div>
        );
    }
    if (!foundPatient) {
        return (
            <div className="App">
                <Container>
                    Searching patient data
                </Container>
            </div>
        );
    }
    return (
        <div className="App">
            <Container>
                <h2>{foundPatient.name}
                    <Icon name={getGenderIcon(foundPatient.gender)} size='large' /></h2>
                <div>
                    <b>SSN:</b> {foundPatient.ssn}
                </div>
                <div>
                    <b>Occupation:</b> {foundPatient.occupation}
                </div>
                <Entries patient={foundPatient} />
            </Container>
        </div>
    );
};

export default PatientByIdPage;
