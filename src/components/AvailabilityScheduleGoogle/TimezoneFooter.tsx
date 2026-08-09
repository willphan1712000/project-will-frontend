import React from 'react';
import styles from './styles';
import DropdownSelect from '@/src/components/DropdownSelect/DropdownSelect';
import WUII from '..';

interface TimezoneFooterProps {
    timezone: string;
    onTimezoneChange: (tz?: string) => void;
    styling?: WUII['styling'];
}

export default function TimezoneFooter({
    timezone,
    onTimezoneChange,
    styling,
}: TimezoneFooterProps): React.JSX.Element {
    const dropdownOptions = TIMEZONES.map((tz) => ({
        value: tz.value,
        label: <span>{tz.label}</span>,
        labelContent: tz.label,
    }));

    return (
        <div style={styles.footer}>
            <div style={styles.timezoneSelectWrapper}>
                <DropdownSelect
                    value={timezone}
                    setValue={onTimezoneChange}
                    options={dropdownOptions}
                    description="Select timezone"
                    styling={styling}
                />
            </div>
        </div>
    );
}

const TIMEZONES = [
    { value: 'Etc/GMT+12', label: '(UTC-12:00) International Date Line West' },
    { value: 'Pacific/Midway', label: '(UTC-11:00) Midway Island, Samoa' },
    { value: 'Pacific/Honolulu', label: '(UTC-10:00) Hawaii' },
    { value: 'Pacific/Marquesas', label: '(UTC-09:30) Marquesas Islands' },
    { value: 'America/Anchorage', label: '(UTC-09:00) Alaska' },
    {
        value: 'America/Los_Angeles',
        label: '(UTC-08:00) Pacific Time (US & Canada)',
    },
    {
        value: 'America/Denver',
        label: '(UTC-07:00) Mountain Time (US & Canada)',
    },
    {
        value: 'America/Chicago',
        label: '(UTC-06:00) Central Time (US & Canada)',
    },
    {
        value: 'America/New_York',
        label: '(UTC-05:00) Eastern Time (US & Canada)',
    },
    { value: 'America/Halifax', label: '(UTC-04:00) Atlantic Time (Canada)' },
    { value: 'America/St_Johns', label: '(UTC-03:30) Newfoundland' },
    { value: 'America/Sao_Paulo', label: '(UTC-03:00) Brasilia, Buenos Aires' },
    { value: 'Atlantic/South_Georgia', label: '(UTC-02:00) Mid-Atlantic' },
    { value: 'Atlantic/Azores', label: '(UTC-01:00) Azores' },
    { value: 'Etc/UTC', label: '(UTC+00:00) London, Dublin, Lisbon, UTC' },
    {
        value: 'Europe/Paris',
        label: '(UTC+01:00) Amsterdam, Berlin, Paris, Rome',
    },
    { value: 'Europe/Athens', label: '(UTC+02:00) Athens, Cairo, Jerusalem' },
    { value: 'Europe/Moscow', label: '(UTC+03:00) Moscow, Baghdad, Riyadh' },
    { value: 'Asia/Tehran', label: '(UTC+03:30) Tehran' },
    { value: 'Asia/Dubai', label: '(UTC+04:00) Abu Dhabi, Muscat, Baku' },
    { value: 'Asia/Kabul', label: '(UTC+04:30) Kabul' },
    {
        value: 'Asia/Karachi',
        label: '(UTC+05:00) Islamabad, Karachi, Tashkent',
    },
    {
        value: 'Asia/Kolkata',
        label: '(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi',
    },
    { value: 'Asia/Kathmandu', label: '(UTC+05:45) Kathmandu' },
    { value: 'Asia/Dhaka', label: '(UTC+06:00) Astana, Dhaka' },
    { value: 'Asia/Yangon', label: '(UTC+06:30) Yangon (Rangoon)' },
    { value: 'Asia/Bangkok', label: '(UTC+07:00) Bangkok, Hanoi, Jakarta' },
    {
        value: 'Asia/Shanghai',
        label: '(UTC+08:00) Beijing, Perth, Singapore, Taipei',
    },
    { value: 'Australia/Eucla', label: '(UTC+08:45) Eucla' },
    { value: 'Asia/Tokyo', label: '(UTC+09:00) Osaka, Sapporo, Tokyo, Seoul' },
    { value: 'Australia/Adelaide', label: '(UTC+09:30) Adelaide, Darwin' },
    {
        value: 'Australia/Sydney',
        label: '(UTC+10:00) Brisbane, Melbourne, Sydney',
    },
    { value: 'Australia/Lord_Howe', label: '(UTC+10:30) Lord Howe Island' },
    {
        value: 'Pacific/Noumea',
        label: '(UTC+11:00) Solomon Is., New Caledonia',
    },
    {
        value: 'Pacific/Auckland',
        label: '(UTC+12:00) Auckland, Wellington, Fiji',
    },
    { value: 'Pacific/Chatham', label: '(UTC+12:45) Chatham Islands' },
    { value: 'Pacific/Tongatapu', label: "(UTC+13:00) Nuku'alofa, Tonga" },
    { value: 'Pacific/Kiritimati', label: '(UTC+14:00) Kiritimati' },
];
