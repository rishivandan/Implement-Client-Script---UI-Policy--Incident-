# Configuration Notes
**Implement Client Script & UI Policy (Incident)**

## 1. Problem Statement

Incident records need consistent and accurate data entry for effective triage,
routing and resolution. Relying on user awareness and manual checks can lead to
incomplete, inconsistent or incorrect data, which affects reporting accuracy,
SLA compliance and overall service quality.

Conditional field behavior and validation need to be enforced directly at the
user interface level using UI Policies and Client Scripts, which control field
visibility, mandatory status and save-time validation.

## 2. Objective

Demonstrate how ServiceNow client-side controls enforce data integrity on
Incident records: dynamically making fields mandatory, auto-populating values,
controlling field behavior and preventing submission when required conditions
are not met.

## 3. Skills

- Incident Management
- UI Policy
- UI Policy Actions
- Client Scripts
- Form Validation

## 4. Components Configured

| # | Component | Type / Details | Navigation |
|---|---|---|---|
| 1 | High Impact Control | UI Policy (Incident), Impact is High | System UI -> UI Policies |
| 2 | Urgency action | UI Policy Action, Read-only = true | Related list on policy |
| 3 | Auto set urgency for high impact | onChange Client Script, field: Impact | System UI -> Client Scripts |
| 4 | Prevent save if Assigned To missing | onSubmit Client Script | System UI -> Client Scripts |
| 5 | Prevent state change via list edit | onCellEdit Client Script, field: State | System UI -> Client Scripts |

Full details: [`../UI_Policies/High_Impact_Control.md`](../UI_Policies/High_Impact_Control.md)
and [`../Client_Scripts/`](../Client_Scripts/).

## 5. How the Pieces Work Together

**When Impact = High (1):**
- UI Policy makes Assignment group mandatory.
- UI Policy Action makes Urgency read-only.
- onChange script sets Urgency to High and shows an info message.
- onSubmit script blocks saving if Assigned To is empty.

**When Impact changes away from High:**
- "Reverse if false" reverts the UI Policy changes (Assignment group is no
  longer mandatory, Urgency is editable again).
- The onSubmit script no longer blocks the save, so Assigned To is no longer
  required.

**In list view:**
- onCellEdit script blocks direct edits of State; users must open the Incident
  form to change State.

## 6. Testing Checklist

**Test 1 - Mandatory enforcement**
1. Incident -> Create New.
2. Set Impact = High.
3. Leave Assigned To empty and click Submit.

Expected: Incident is NOT saved; error shown for Assigned To. UI Policy actions
(read-only Urgency) and auto-set Urgency work as expected.

**Test 2 - Successful save**
1. Fill the Assigned To field.
2. Click Submit.

Expected: Incident saves without errors. Urgency auto-setting, read-only fields
and State restrictions still work.

**Test 3 - Reverse condition**
1. Open an existing Incident with Impact = High.
2. Change Impact from High to Medium.

Expected: Assigned To no longer mandatory; Urgency editable again; record saves
successfully.

**Test 4 - List edit blocking**
1. Incident -> All (list view).
2. Double-click the State field of any Incident.

Expected: Alert says State cannot be updated via list editing; State value
remains unchanged.

**Test 5 - Form-based update**
1. Open the same Incident record on the form.
2. Change State to a new value and click Update.

Expected: State change saves successfully (form edits are allowed). Assigned To
and Urgency still follow the UI Policy / Client Script rules.

The same cases are tabulated in [`../../Testing/Test_Cases.md`](../../Testing/Test_Cases.md).

## 7. Implementation Notes

- All scripts and the UI Policy are on the Incident table and set Active = true.
- High impact is identified by the value '1' (1 - High) in the scripts.
- The onChange script exits early on form load (isLoading) and when the new
  value is empty.
- The onChange script only acts when Impact becomes High; it does not reset
  Urgency when Impact changes to another value.
- The onSubmit script returns false to block the save and true to allow it.
- The onCellEdit script calls callback(false) to cancel the list edit.
- The Assignment group requirement comes from the UI Policy Action, while the
  Assigned To requirement comes from the onSubmit Client Script.

## 8. Settings Visible in the Screenshots

These settings are shown in the screenshots but were not listed in the original notes
(screenshot numbers refer to the file map in the project `README.md`):

- UI Policy (screenshots 01-02): Application = Global, Order = 100, Global = checked,
  On load = checked, Inherit = unchecked.
- UI Policy Actions (screenshots 03-04): Assignment group has Mandatory = True,
  Visible = Leave alone, Read only = False; Urgency has Mandatory = Leave alone,
  Visible = Leave alone, Read only = True.
- onChange Client Script (screenshot 05): UI Type = Desktop, Application = Global,
  Global = checked, Isolate script = checked.

## 9. Documentation Differences to Be Aware Of

The original text files were kept as the source of truth. A few wording details
differ between them and the screenshots/PDFs:

| Item | Recorded script / notes | Seen in screenshots / PDF |
|---|---|---|
| onChange info message | "Urgency set to High for High impact incident." | "Urgency set to High for High impact incidents." (screenshots 07, 08 and the Implementation PDF) |
| onCellEdit alert text | "State cannot be updated using list editing. Please open the Incident." | "Direct changes to the State field are not allowed." (screenshot 11) |
| onCellEdit script at creation | Field name = State | Screenshot 06 shows the script being created with Field name = -- None --, name in lower case |

## 10. Conclusion

The project shows how UI Policies and Client Scripts work together to enforce
dynamic field behavior, automate updates and prevent incorrect data submission
on Incident forms. Using onChange, onSubmit and onCellEdit scripts with UI
Policy actions, fields like Assigned To and Urgency respond appropriately to
changes in Impact, keeping data clean and consistent. The solution is
lightweight, efficient and easy to implement, making it well suited to
short-duration micro projects while showing practical best practices for form
usability and data integrity in ServiceNow.
