# UI Policy: High Impact Control

Navigation: `System UI -> UI Policies -> New`
Access needed: administrative or configuration access

## Policy settings

| Property | Value |
|---|---|
| Name (Short description) | High Impact Control |
| Table | Incident |
| Active | true |
| Reverse if false | true (when the condition is no longer met, changes applied by the policy are automatically reverted) |
| Condition | Impact **is** 1 - High |

The policy is triggered only when the Incident Impact is High.

## Steps

1. Log in to the ServiceNow instance with administrative/configuration access.
2. Go to System UI -> UI Policies and click New.
3. Enter the Name, Table and Active values above.
4. Set the condition: Impact is 1 - High.
5. Set Reverse if false to true.
6. Review the configuration and click Submit.

## UI Policy Action 1: Assignment group

| Property | Value |
|---|---|
| Field name | Assignment group |
| Mandatory | true |

Effect: when Impact = High, the Assignment group field becomes mandatory.

## UI Policy Action 2: Urgency

Open the High Impact Control UI Policy, scroll to the UI Policy Actions related
list and click New.

| Property | Value |
|---|---|
| Field name | Urgency |
| Read-only | true |
| Visible | Leave as is (do not change). The field stays visible; its behaviour is controlled by Read-only. |

Click Submit. The action is linked to High Impact Control and applies to the
Urgency field whenever an Incident has High impact.

**Optional verification**
1. Open an Incident record.
2. Set Impact to High -> Urgency should become read-only.
3. Change Impact to another value -> Urgency should become editable again (Reverse if false).

## Summary

| Item | Setting |
|---|---|
| UI Policy | High Impact Control |
| Table | Incident |
| Condition | Impact is 1 - High |
| Reverse if false | true |
| Action: Assignment group | Mandatory = true |
| Action: Urgency | Read-only = true, Visible unchanged |

## Related screenshots

- `Screenshots/Milestone 1 Create UI Policy on Incident/High Impact Control UI Policy configuration(1).jpg`
- `Screenshots/Milestone 1 Create UI Policy on Incident/High Impact Control UI Policy configuration(2).jpg`
- `Screenshots/Milestone 1 Create UI Policy on Incident/High Impact Control UI Policy configuration(3).jpg`
- `Screenshots/Milestone 6 Testing the Configuration/Test Successful Save.png`
