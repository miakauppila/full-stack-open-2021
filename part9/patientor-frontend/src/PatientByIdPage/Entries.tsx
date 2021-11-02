import React from "react";
import { Entry, Patient } from "../types";
import EntryDetails from "./EntryDetails";

interface EntriesProps {
    patient: Patient
}

const Entries = ({ patient }: EntriesProps) => {
    const [error, setError] = React.useState<string | undefined>();
    const entries = patient.entries;

    const setErrorMessage = (error: string) => {
        setError(error);
        setTimeout(() => (setError(undefined)), 5000);
    };

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
            {error && <div style={{color: "red"}}>{error}</div>}
            {entries.map((entry: Entry) =>
                <EntryDetails entry={entry} key={entry.id} patient={patient} setError={setErrorMessage} />
            )}
        </>
    );
};

export default Entries;