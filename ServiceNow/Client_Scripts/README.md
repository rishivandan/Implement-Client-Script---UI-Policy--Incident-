# Client Scripts

All three Client Scripts are on the **Incident** table and are **Active = true**.
Navigation: `System UI -> Client Scripts -> New`

| Script | File | Type | Field | Result |
|---|---|---|---|---|
| Auto set urgency for high impact | `onChange_Auto_Set_Urgency_For_High_Impact.js` | onChange | Impact | Sets Urgency = High when Impact = High |
| Prevent save if Assigned To missing | `onSubmit_Prevent_Save_If_Assigned_To_Missing.js` | onSubmit | - | Blocks save if High impact + no assignee |
| Prevent state change via list edit | `onCellEdit_Prevent_State_Change_Via_List_Edit.js` | onCellEdit | State | Blocks State edits from list view |

The script bodies are exactly as recorded in the original project file
(`Client_Scripts.txt`); only a descriptive header comment was added to each file.
See `../Configuration/Configuration_Notes.md` for notes on wording differences
between the recorded scripts and the screenshots.
