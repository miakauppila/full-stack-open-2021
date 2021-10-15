import React from "react";
import { Entry, Patient } from "../types";
import EntryDetails from "./EntryDetails";

interface EntriesProps {
    patient: Patient
}

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