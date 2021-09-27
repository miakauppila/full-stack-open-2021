import React from "react";
import { Entry, Patient } from "../types";
import { useStateValue } from "../state";

interface EntryProps {
    patient: Patient
}

const Entries = ({ patient }: EntryProps) => {

    const [{ diagnoses },] = useStateValue();
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
                <p key={entry.id}>{entry.date} {entry.description}</p>
            )}
            {entries.map((entry: Entry) =>
                entry.diagnosisCodes ? (
                    entry.diagnosisCodes.map((code: string) =>
                        <li key={code}>{code} {diagnoses[code].name}</li>)
                ) : null
            )}
        </>
    );
};

export default Entries;