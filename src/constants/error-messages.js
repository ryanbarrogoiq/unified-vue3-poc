export const ERRORS = {
    GENERAL : {
        SERVER_ERROR: 'Something went wrong, Kindly contact the administration if issue still persist.',
        SESSION_EXPIRED: 'Session has expired. Kindly logout and login again',
    },
    /**
     * Validation error messages.
     */
    VALIDATION : {
        INVALID_DATE_RANGE: 'Date given must be after [rangeStartDate] and before [rangeEndDate]',
        START_DATE_AFTER_END_DATE: 'Start Date cannot be after End Date',
        START_DATE_AFTER_END_DATE_CUSTOM: '[endDate] must be after [startDate]',
        START_DATE_SAME_OR_AFTER_END_DATE: 'End date must be the same or after Start date',
        START_DATE_SAME_OR_AFTER_END_DATE_CUSTOM: 'Start Date cannot be after End Date',
        REQUIRED_INPUT: '[name] is required.',
        MINIMUM_RANGE: 'A minimum range of [minimumRange] [unit] must be selected',
        MAXIMUM_RANGE: 'A maximum range of [maximumRange] [unit] must be selected'
    },

    PERMISSION : {
        // This error message will display if we're able to handle the permission check before calling the API.
        NOT_ENOUGH_PERMISSION : `You do not have access to this. The user is missing required permission string. [permission].`,
        // This error message will display if we're not able to handle the permission from the API which gives us 403 status code.
        NOT_ENOUGH_PERMISSION_UNHANDLED : `[errorMessage] [permission]. Unhandled [forbiddenType]`,
    },
};
