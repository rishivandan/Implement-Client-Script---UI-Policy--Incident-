/*
 * Client Script : Prevent state change via list edit
 * Table         : Incident
 * Type          : onCellEdit
 * Field name    : State
 * Active        : true
 *
 * Purpose:
 * Runs whenever the State field is edited directly in a list view. It shows
 * an alert and cancels the edit, so State can only be changed from the
 * Incident form.
 *
 * Verify:
 * Open the Incident list and double-click the State field of any record.
 * An alert should appear and the State value should remain unchanged.
 */
function onCellEdit(sysIDs, table, oldValues, newValue, callback) {

    alert('State cannot be updated using list editing. Please open the Incident.');

    callback(false);
}
