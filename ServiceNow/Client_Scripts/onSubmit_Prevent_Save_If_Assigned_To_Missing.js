/*
 * Client Script : Prevent save if Assigned To missing
 * Table         : Incident
 * Type          : onSubmit
 * Active        : true
 *
 * Purpose:
 * Runs when the user tries to save the record. If Impact is High (1) and
 * Assigned To is empty, an error is shown on the field and the save is
 * blocked.
 *
 * Verify:
 * Set Impact to High, leave Assigned To empty and try to save.
 * The save should be blocked with an error message on Assigned To.
 */
function onSubmit() {
    if (g_form.getValue('impact') == '1' &&
        g_form.getValue('assigned_to') == '') {

        g_form.showErrorBox(
            'assigned_to',
            'Assigned To is mandatory for High impact incidents.'
        );
        return false;
    }
    return true;
}
