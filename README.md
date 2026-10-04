# ServiceNow Incident Management
## Client Scripts and UI Policies

> Naan Mudhalvan Mini Project: **Implement Client Script & UI Policy (Incident)**

## Project Overview

ServiceNow is a cloud-based platform widely used for IT Service Management (ITSM).
Incident Management is one of its core processes, and every disruption is captured
as an Incident record carrying fields such as Impact, Urgency, Priority,
Assignment Group, Assigned To and State.

This project improves data accuracy and consistency while creating and updating
Incident records. It uses **UI Policies** and **Client Scripts** on the Incident
table to control fields dynamically, automatically populate values, validate
required information before saving, and prevent incorrect updates. The controls
respond to the **Impact** field and affect Assignment Group, Assigned To, Urgency
and State.

## Problem Statement

In a default ServiceNow instance, users can leave important fields empty or change
them in ways that do not follow the business process. For High Impact incidents in
particular:

- High Impact incidents are saved without an Assignment Group or an Assigned To user.
- Urgency is set inconsistently, so the calculated Priority does not reflect the real severity.
- State is changed directly from the Incident list, bypassing the checks available on the form.

## Objectives

- Enforce mandatory fields automatically when Impact is High.
- Keep Urgency consistent with Impact by setting it automatically and locking it.
- Validate the record before it is saved, and show clear messages to the user.
- Restrict risky direct edits of State from the list view while keeping form updates available.
- Return the form to its normal behaviour when Impact is no longer High.

## Technologies Used

| Technology | Use in this project |
|---|---|
| ServiceNow platform | Hosts the Incident table, form and list |
| UI Policy and UI Policy Actions | No-code control of field behaviour (mandatory, read-only) |
| Client Scripts (JavaScript) | onChange, onSubmit and onCellEdit logic using the `g_form` API |

## ServiceNow Module

**Incident Management**: the Incident table, Incident form and Incident list.
Configuration is done under `System UI -> UI Policies` and `System UI -> Client Scripts`
and requires administrative or configuration access.

## Features Implemented

1. Makes Assignment Group mandatory when Impact is High.
2. Makes Urgency read-only when Impact is High.
3. Automatically sets Urgency to High when Impact is changed to High.
4. Prevents saving a High Impact Incident when Assigned To is empty.
5. Prevents users from changing State directly from the Incident list.
6. Allows State changes through the Incident form.
7. Reverses UI Policy restrictions when Impact is changed from High to another value.

## Client Scripts

All scripts are on the Incident table and are active. Source: [`ServiceNow/Client_Scripts/`](ServiceNow/Client_Scripts/)

| Script | Type | Field | Behaviour |
|---|---|---|---|
| [Auto set urgency for high impact](ServiceNow/Client_Scripts/onChange_Auto_Set_Urgency_For_High_Impact.js) | onChange | Impact | Sets Urgency to High and shows an info message when Impact becomes High |
| [Prevent save if Assigned To missing](ServiceNow/Client_Scripts/onSubmit_Prevent_Save_If_Assigned_To_Missing.js) | onSubmit | n/a | Blocks the save and shows an error on Assigned To when Impact is High and Assigned To is empty |
| [Prevent state change via list edit](ServiceNow/Client_Scripts/onCellEdit_Prevent_State_Change_Via_List_Edit.js) | onCellEdit | State | Shows an alert and cancels the edit when State is edited in the list view |

## UI Policies

Source: [`ServiceNow/UI_Policies/High_Impact_Control.md`](ServiceNow/UI_Policies/High_Impact_Control.md)

**High Impact Control** (Incident table, Active, Reverse if false = true).
Condition: Impact is 1 - High.

| UI Policy Action | Setting |
|---|---|
| Assignment group | Mandatory = true |
| Urgency | Read-only = true (Visible unchanged) |

## System Workflow

**When Impact = High**
- The UI Policy makes Assignment group mandatory and Urgency read-only.
- The onChange script sets Urgency to High and shows an info message.
- The onSubmit script blocks saving if Assigned To is empty.

**When Impact changes away from High**
- "Reverse if false" reverts the UI Policy changes (Assignment group is no longer mandatory; Urgency is editable again).
- The onSubmit script no longer blocks the save.

**In the Incident list**
- The onCellEdit script blocks direct edits of State; State must be changed from the Incident form.

```
User creates/updates incident
        -> Incident form and list (ServiceNow UI)
        -> UI Policies and Client Scripts (field control, automation, validation)
        -> Incident table (stored by the ServiceNow platform)
```

## Implementation

1. Create the **High Impact Control** UI Policy on Incident with condition *Impact is 1 - High* and *Reverse if false*.
2. Add the UI Policy Action making **Assignment group** mandatory.
3. Add the UI Policy Action making **Urgency** read-only.
4. Create the **onChange** Client Script on the Impact field.
5. Create the **onSubmit** Client Script for save validation.
6. Create the **onCellEdit** Client Script on the State field.
7. Test the configuration (see Testing).

Detailed steps and notes: [`ServiceNow/Configuration/Configuration_Notes.md`](ServiceNow/Configuration/Configuration_Notes.md)
and [`Documentation/Implementation_Documentation.pdf`](Documentation/Implementation_Documentation.pdf).

## Testing

Five test cases cover mandatory enforcement, successful save, the reverse condition,
list edit blocking and form-based State update. See [`Testing/Test_Cases.md`](Testing/Test_Cases.md)
and [`Documentation/Testing_Documentation.pdf`](Documentation/Testing_Documentation.pdf).

## Screenshots

### UI Policy
| | |
|---|---|
| ![UI Policy creation](Screenshots/Milestone%201%20Create%20UI%20Policy%20on%20Incident/High%20Impact%20Control%20UI%20Policy%20configuration%281%29.jpg) | ![Condition and reverse if false](Screenshots/Milestone%201%20Create%20UI%20Policy%20on%20Incident/High%20Impact%20Control%20UI%20Policy%20configuration%282%29.jpg) |
| UI Policy creation | Condition (Impact is 1 - High) and Reverse if false |
| ![Assignment group action](Screenshots/Milestone%201%20Create%20UI%20Policy%20on%20Incident/High%20Impact%20Control%20UI%20Policy%20configuration%283%29.jpg) | ![Urgency action](Screenshots/Milestone%206%20Testing%20the%20Configuration/Test%20Successful%20Save.png) |
| Assignment group set to Mandatory | Urgency set to Read-only |

### Client Scripts
| | |
|---|---|
| ![onChange script](Screenshots/Milestone%203%20Create%20onChange%20Client%20Script/Create%20Client%20Script.jpeg) | ![onCellEdit script](Screenshots/Milestone%206%20Testing%20the%20Configuration/Test%20Form-Based%20Update.jpeg) |
| onChange Client Script configuration | onCellEdit Client Script creation |

### Behaviour and Testing
| | |
|---|---|
| ![Urgency auto-set](Screenshots/Milestone%202%20Create%20UI%20Policy%20Action%20%23U2013%20Urgency/Configure%20the%20Urgency%20Field.png) | ![Mandatory enforcement](Screenshots/Milestone%206%20Testing%20the%20Configuration/Test%20Mandatory%20Enforcement.jpg) |
| Urgency auto-set to High and read-only | Mandatory enforcement on a new Incident |
| ![onSubmit validation](Screenshots/Milestone%204%20Create%20onSubmit%20Client%20Script%20%28Save%20Validation%29/Create%20Client%20Script.jpeg) | ![Reverse condition](Screenshots/Milestone%206%20Testing%20the%20Configuration/Reverse%20Condition%20Test.jpeg) |
| onSubmit validation error on Assigned To | Reverse condition (Impact set to Medium) |
| ![List edit blocking](Screenshots/Milestone%206%20Testing%20the%20Configuration/Test%20List%20Edit%20Blocking.jpeg) | ![Incident list](Screenshots/Milestone%205%20Create%20onCellEdit%20Client%20Script/Create%20Client%20Script%282%29.png) |
| State list edit blocked by alert | Incident list view |
| ![Incident form State](Screenshots/Milestone%205%20Create%20onCellEdit%20Client%20Script/Create%20Client%20Script%281%29.png) | |
| Incident form showing State | |

### Screenshot file map

Screenshot numbers 01-13 used in the project notes correspond to these files:

| No. | File |
|---|---|
| 01 | `Screenshots/Milestone 1 Create UI Policy on Incident/High Impact Control UI Policy configuration(1).jpg` |
| 02 | `Screenshots/Milestone 1 Create UI Policy on Incident/High Impact Control UI Policy configuration(2).jpg` |
| 03 | `Screenshots/Milestone 1 Create UI Policy on Incident/High Impact Control UI Policy configuration(3).jpg` |
| 04 | `Screenshots/Milestone 6 Testing the Configuration/Test Successful Save.png` |
| 05 | `Screenshots/Milestone 3 Create onChange Client Script/Create Client Script.jpeg` |
| 06 | `Screenshots/Milestone 6 Testing the Configuration/Test Form-Based Update.jpeg` |
| 07 | `Screenshots/Milestone 2 Create UI Policy Action #U2013 Urgency/Configure the Urgency Field.png` |
| 08 | `Screenshots/Milestone 6 Testing the Configuration/Test Mandatory Enforcement.jpg` |
| 09 | `Screenshots/Milestone 4 Create onSubmit Client Script (Save Validation)/Create Client Script.jpeg` |
| 10 | `Screenshots/Milestone 6 Testing the Configuration/Reverse Condition Test.jpeg` |
| 11 | `Screenshots/Milestone 6 Testing the Configuration/Test List Edit Blocking.jpeg` |
| 12 | `Screenshots/Milestone 5 Create onCellEdit Client Script/Create Client Script(2).png` |
| 13 | `Screenshots/Milestone 5 Create onCellEdit Client Script/Create Client Script(1).png` |

## Team Members

| Team Member | Role/Contribution |
|---|---|
| Rishi Vandan S | Team Lead / ServiceNow Configuration |
| Abishek R | Member |
| Akash Kar | Member |
| Fanas N S | Member |
| L R Aravind Surya | Member |

Programme: BE CSE (AIML), IIIrd Year, 5th Semester.

## Team Contributions

Roles are listed in the table above and in [`Team/Team_Members.md`](Team/Team_Members.md).
No further breakdown of individual technical contributions is recorded in this package.

## Documentation Note

**Documentation Note:**
This project documentation has been adapted from an existing reference implementation of the Naan Mudhalven mini project. The technical structure, ServiceNow configuration, implementation approach, and testing workflow are retained as the reference basis, with team-specific information updated for the current team.

The screenshots in `Screenshots/` are retained from the reference implementation; they were not recreated for this team.

## Project Documentation

| Document | Description |
|---|---|
| [Project_Overview.pdf](Documentation/Project_Overview.pdf) | Introduction, problem statement, objectives, features and architecture |
| [Implementation_Documentation.pdf](Documentation/Implementation_Documentation.pdf) | Setup, configuration steps, functional documentation, known issues, future enhancements |
| [Testing_Documentation.pdf](Documentation/Testing_Documentation.pdf) | Test cases with expected results and screenshots |
| [Configuration_Notes.md](ServiceNow/Configuration/Configuration_Notes.md) | Configuration summary, how the components work together, implementation notes |

### Known Issues and Future Enhancements (from the project documentation)

- Requires access to a configured ServiceNow instance.
- Client Scripts are configured specifically for the Incident table.
- The State restriction applies to direct list editing; State changes through the form are allowed.
- The controls are client-side, so additional server-side validation may be required for integrations or other ways of creating records.

Possible future work listed in the reference documentation: server-side validation using Business Rules,
automatic Incident assignment, SLA integration, email notifications for High Impact
Incidents, automatic Priority calculation, dashboards and reports, Category/Subcategory
validation, and automated routing to Assignment Groups.
