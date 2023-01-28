//how to make editable table in react js?
//how to make editable table in react js?
import React, { useState } from "react";

export default function App() {
  const [entries, setEntries] = useState([
    { name: "Name 1" },
    { name: "Name 2" }
  ]);
  const [indexToEdit, setIndexToEdit] = useState(-1);
  return (
    <table>
      <thead>
        <tr>
          <td>Name</td>
          <td>Button</td>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry, recordIdx) => (
          <tr>
            <td>
              <input
                type="text"
                value={entry.name}
                disabled={recordIdx !== indexToEdit}
                onChange={(val) => {
                  let _entries = [...entries];
                  _entries[indexToEdit] = val;
                  setEntries(_entries);
                }}
                onBlur={() => {
                  setIndexToEdit(-1);
                }}
              />
            </td>
            <td>
              <button
                onClick={() => {
                  setIndexToEdit(recordIdx);
                }}
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}




//Source: https://stackoverflow.com/questions/64131610


