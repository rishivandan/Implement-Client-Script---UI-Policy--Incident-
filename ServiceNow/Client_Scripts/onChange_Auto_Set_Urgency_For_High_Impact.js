/*
 * Client Script : Auto set urgency for high impact
 * Table         : Incident
 * Type          : onChange
 * Field name    : Impact
 * Active        : true
 *
 * Purpose:
 * Runs when the Impact field changes. If Impact is set to High (1),
 * Urgency is automatically set to High (1) and an info message is shown.
 *
 * Verify:
 * Open an Incident record and change Impact to High.
 * Urgency should update automatically to High.
 */
function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue == '') {
        return;
    }

    if (newValue == '1') {
        g_form.setValue('urgency', '1');
        g_form.addInfoMessage('Urgency set to High for High impact incident.');
    }
}
