import React from "react";
import { Entry, Patient } from "../types";
import { useStateValue } from "../state";

interface EntriesProps {
    patient: Patient
}

interface EntryDetailsProps {
    entry: Entry
}

const EntryDetails = ({ entry }: EntryDetailsProps) => {
    const [{ diagnoses },] = useStateValue();

    return (
        <div className="entry-details" style={{marginBottom:"10px"}}>
            {entry.date} {entry.description}
            {entry.diagnosisCodes ? (
                entry.diagnosisCodes.map((code: string) =>
                    <li key={code}>{code} {diagnoses[code].name}</li>)
            ) : null
            }
        </div>
    );
};

const Entries = ({ patient }: EntriesProps) => {

    const entries = patient.entries;

    if (!entries.length) {
        return (
            <>
                <h3>Entries</h3>
                <p>No registered entries</p>
            </>
        );
    }

    return (
        <>
            <h3>Entries</h3>
            {entries.map((entry: Entry) =>
                <EntryDetails entry={entry} key={entry.id} />
            )}
        </>
    );
};

export default Entries;