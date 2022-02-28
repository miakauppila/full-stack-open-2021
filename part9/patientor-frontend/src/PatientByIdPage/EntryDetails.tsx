import React from "react";
import { Entry, EntryType, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry, Patient } from "../types";
import { Card, Icon } from "semantic-ui-react";
import ConfirmModal from "./ConfirmModal";
import { apiBaseUrl } from "../constants";
import axios from "axios";
import { deleteEntryAction, useStateValue } from "../state";

interface HospitalProps {
    hospitalEntry: HospitalEntry,
    deleteEntry: () => Promise<void>,
}

const HospitalDetails = ({ hospitalEntry, deleteEntry }: HospitalProps) => {
    const [{ diagnoses },] = useStateValue();
    return (
        <Card fluid className="entry-details" style={{ marginBottom: "10px" }}>
            <Card.Content>
                <Card.Header>{hospitalEntry.date}
                    {' '}<Icon name="hospital" size='large' />
                </Card.Header>
                <Card.Description>
                    <p>{hospitalEntry.description}</p>
                    {hospitalEntry.discharge &&
                        <p>Discharge: {hospitalEntry.discharge.date}. {hospitalEntry.discharge.criteria}</p>
                    }
                    {hospitalEntry.diagnosisCodes &&
                        hospitalEntry.diagnosisCodes.map((code: string) =>
                            <li key={code}>{code} {diagnoses[code].name}</li>)
                    }
                     <p style={{ marginTop: "5px" }}>Diagnose by: {hospitalEntry.specialist}</p>
                    <div style={{ position: "relative", bottom: "30px", float: "right", marginBottom: "-40px" }}>
                        <ConfirmModal onConfirm={deleteEntry} />
                    </div>
                </Card.Description>
            </Card.Content>
        </Card>
    );
};

interface OccupationalProps {
    occupEntry: OccupationalHealthcareEntry,
    deleteEntry: () => Promise<void>,
}

const OccupationalDetails = ({ occupEntry, deleteEntry }: OccupationalProps) => {
    const [{ diagnoses },] = useStateValue();
    return (
        <Card fluid className="entry-details" style={{ marginBottom: "10px" }}>
            <Card.Content>
                <Card.Header>{occupEntry.date}
                    {' '}<Icon name="doctor" size='large' />
                </Card.Header>
                <Card.Description>
                    <p>{occupEntry.description}</p>
                    <p>Employer: {occupEntry.employerName}</p>
                    {occupEntry.sickLeave &&
                        <p>Sickleave: from {occupEntry.sickLeave.startDate} to {occupEntry.sickLeave.endDate}</p>}
                    {occupEntry.diagnosisCodes &&
                        occupEntry.diagnosisCodes.map((code: string) =>
                            <li key={code}>{code} {diagnoses[code].name}</li>)
                    }
                    <p style={{ marginTop: "5px" }}>Diagnose by: {occupEntry.specialist}</p>
                    <div style={{ position: "relative", bottom: "30px", float: "right", marginBottom: "-40px" }}>
                        <ConfirmModal onConfirm={deleteEntry} />
                    </div>
                </Card.Description>
            </Card.Content>
        </Card>
    );
};

interface HealthCheckProps {
    healthEntry: HealthCheckEntry,
    deleteEntry: () => Promise<void>,
}

const HealthCheckDetails = ({ healthEntry, deleteEntry }: HealthCheckProps) => {
    const [{ diagnoses },] = useStateValue();

    const getRatingIconColor = (rating: number) => {
        switch (rating) {
            case 0:
                return 'green';
            case 1:
                return 'yellow';
            case 2:
                return 'orange';
            case 3:
                return 'red';
            default:
                return 'green';
        }
    };

    return (
        <Card fluid className="entry-details" style={{ marginBottom: "10px" }}>
            <Card.Content>
                <Card.Header>{healthEntry.date}
                    {' '}<Icon name="heartbeat" size='large' />
                </Card.Header>
                <Card.Description>
                    <p>{healthEntry.description}</p>
                    <p><Icon name='heart' size='large' color={getRatingIconColor(healthEntry.healthCheckRating)} /></p>
                    {healthEntry.diagnosisCodes &&
                        healthEntry.diagnosisCodes.map((code: string) =>
                            <li key={code}>{code} {diagnoses[code].name}</li>)
                    }
                    <p style={{ marginTop: "5px" }}>Diagnose by: {healthEntry.specialist}</p>
                    <div style={{ position: "relative", bottom: "30px", float: "right", marginBottom: "-40px" }}>
                        <ConfirmModal onConfirm={deleteEntry} />
                    </div>
                </Card.Description>
            </Card.Content>
        </Card>

    );
};

interface EntryDetailsProps {
    entry: Entry,
    patient: Patient,
    setError: (message: string) => void
}

const EntryDetails = ({ entry, patient, setError }: EntryDetailsProps) => {

    const [, dispatch] = useStateValue();

    const deleteEntry = async () => {
        try {
            await axios.delete<null>(`${apiBaseUrl}/patients/${patient.id}/entries/${entry.id}`);
            dispatch(deleteEntryAction(patient.id, entry.id));
        } catch (e: unknown) {
            if (e instanceof Error) {
                console.error(e.message || 'Unknown Error');
                setError(e.message || 'Unknown error');
            }
        }
    };

    // Helper function for exhaustive type checking
    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };

    switch (entry.type) {
        case EntryType.Hospital:
            return <HospitalDetails hospitalEntry={entry} deleteEntry={deleteEntry} />;
        case EntryType.OccupationalHealthcare:
            return <OccupationalDetails occupEntry={entry} deleteEntry={deleteEntry} />;
        case EntryType.HealthCheck:
            return <HealthCheckDetails healthEntry={entry} deleteEntry={deleteEntry} />;
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;