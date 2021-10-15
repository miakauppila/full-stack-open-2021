import React from "react";
import { Entry, EntryType, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from "../types";
import { useStateValue } from "../state";
import { Card, Icon } from "semantic-ui-react";


const HospitalDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
    const [{ diagnoses },] = useStateValue();
    return (
        <Card fluid className="entry-details" style={{ marginBottom: "10px" }}>
            <Card.Content>
                <Card.Header>{entry.date}
                    {' '}<Icon name="hospital" size='large' />
                </Card.Header>
                <Card.Description>
                    <p>{entry.description}</p>
                    {entry.discharge &&
                        <p>Discharge: {entry.discharge.date}. {entry.discharge.criteria}</p>
                    }
                    {entry.diagnosisCodes ? (
                        entry.diagnosisCodes.map((code: string) =>
                            <li key={code}>{code} {diagnoses[code].name}</li>)
                    ) : null
                    }
                </Card.Description>
            </Card.Content>
        </Card>
    );
};

const OccupationalDetails: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
    const [{ diagnoses },] = useStateValue();
    return (
        <Card fluid className="entry-details" style={{ marginBottom: "10px" }}>
            <Card.Content>
                <Card.Header>{entry.date}
                    {' '}<Icon name="doctor" size='large' />
                </Card.Header>
                <Card.Description>
                    <p>{entry.description}</p>
                    <p>Employer: {entry.employerName}</p>
                    {entry.sickLeave &&
                        <p>Sickleave: from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</p>}
                    {entry.diagnosisCodes ? (
                        entry.diagnosisCodes.map((code: string) =>
                            <li key={code}>{code} {diagnoses[code].name}</li>)
                    ) : null
                    }
                </Card.Description>
            </Card.Content>
        </Card>
    );
};

const HealthCheckDetails: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
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
                <Card.Header>{entry.date}
                    {' '}<Icon name="heartbeat" size='large' />
                </Card.Header>
                <Card.Description>
                    <p>{entry.description}</p>
                    <p><Icon name='heart' size='large' color={getRatingIconColor(entry.healthCheckRating)} /></p>
                    {entry.diagnosisCodes ? (
                        entry.diagnosisCodes.map((code: string) =>
                            <li key={code}>{code} {diagnoses[code].name}</li>)
                    ) : null
                    }
                </Card.Description>
            </Card.Content>
        </Card>

    );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {

    // Helper function for exhaustive type checking
    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };

    switch (entry.type) {
        case EntryType.Hospital:
            return <HospitalDetails entry={entry} />;
        case EntryType.OccupationalHealthcare:
            return <OccupationalDetails entry={entry} />;
        case EntryType.HealthCheck:
            return <HealthCheckDetails entry={entry} />;
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;