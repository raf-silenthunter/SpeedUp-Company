let selectedDay = null;

export function datePickerInit() {
    const dateInputs = document.querySelectorAll(".date-input");
    // eslint-disable-next-line no-undef
    flatpickr(dateInputs, {
        disableMobile: true,
        minDate: "today",
        maxDate: new Date().fp_incr(60), // 60 days from now
        locale: {
            firstDayOfWeek: 1
        },
        onChange: function(selectedDates) {
            selectedDay = selectedDates[0];
        },
    });
}

export function getSelectedDate() {
    return selectedDay;
}