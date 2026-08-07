export interface TimeSlot {
    startTime: string;
    endTime: string;
    breakTime: string;
    note: string;
    allDay?: boolean;
}

export interface DayAvailability {
    day: string;
    isAvailable: boolean;
    slots: TimeSlot[];
}

export interface SpecificDate {
    date: string;
    startTime: string;
    endTime: string;
    note: string;
    allDay?: boolean;
}

export interface ScheduleData {
    timezone: string;
    schedule: DayAvailability[];
    specificDate: SpecificDate[];
    repeatUntil: string;
}
