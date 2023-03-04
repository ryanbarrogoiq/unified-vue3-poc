export const TYPE_CLIENT_VISIT = 1;

export const TYPE_MEETING = 2;

export const TYPE_HOLIDAY = 3;

export const TYPE_SICKNESS = 4;

export const TYPE_TRAINING = 6;

export const VISIT_TYPES = [
    TYPE_CLIENT_VISIT,
    TYPE_MEETING,
    TYPE_HOLIDAY,
    TYPE_SICKNESS,
    TYPE_TRAINING,
];

export const TYPE_HOLIDAY_KEY = 'holiday';
export const TYPE_SICKNESS_KEY = 'sickness';

export const KEY_MAPPINGS = {
    [TYPE_HOLIDAY]: TYPE_HOLIDAY_KEY,
    [TYPE_SICKNESS]: TYPE_SICKNESS_KEY,
};
