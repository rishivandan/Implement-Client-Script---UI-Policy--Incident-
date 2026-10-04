# Test Cases

Test scenarios and expected results are taken from the project's
`Documentation/Testing_Documentation.pdf` and the testing checklist in
`ServiceNow/Configuration/Configuration_Notes.md`. The project documentation
records expected results and screenshots only; it does not state a formal actual
result or pass/fail status for each case, so those fields are marked
"Not specified" rather than assumed.

| Test Case ID | Test Scenario | Action/Input | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|
| TC-01 | Mandatory enforcement | Incident -> Create New. Set Impact = High. Leave Assigned To empty and click Submit. | Assignment Group becomes mandatory. Urgency becomes read-only and is automatically set to High. Incident is NOT saved; error shown for Assigned To. | Not specified (see `Screenshots/Milestone 6 Testing the Configuration/Test Mandatory Enforcement.jpg` and `Screenshots/Milestone 4 Create onSubmit Client Script (Save Validation)/Create Client Script.jpeg`) | Not specified |
| TC-02 | Successful save | Fill the Assigned To field with a valid user. Click Submit. | Incident saves without errors. Urgency auto-setting, read-only fields and State restrictions still work. | Not specified (no dedicated screenshot in the project) | Not specified |
| TC-03 | Reverse condition | Open an existing Incident with Impact = High. Change Impact from High to Medium. | Assignment Group is no longer mandatory. Urgency is editable again. Assigned To is no longer required. Incident can be saved. | Not specified (see `Screenshots/Milestone 6 Testing the Configuration/Reverse Condition Test.jpeg`) | Not specified |
| TC-04 | List edit blocking | Incident -> All (list view). Double-click the State field of any Incident. | An alert is displayed and the State change is blocked; State value remains unchanged. | Not specified (see `Screenshots/Milestone 6 Testing the Configuration/Test List Edit Blocking.jpeg`) | Not specified |
| TC-05 | Form-based update | Open the same Incident on the form. Change State to a new value and click Update. | State change saves successfully (form edits are allowed). Assigned To and Urgency still follow the UI Policy / Client Script rules. | Not specified (no dedicated screenshot of a saved State change; `Screenshots/Milestone 5 Create onCellEdit Client Script/Create Client Script(1).png` shows an Incident form with State = In Progress) | Not specified |
