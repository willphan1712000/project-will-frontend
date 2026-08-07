import React from 'react';
import * as styles from './styles';
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
    }));

    return (
        <div style={styles.footer}>
            <div style={styles.footerLabel}>Timezone</div>
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
    { value: 'Pacific/Midway', label: '(GMT-11:00) Midway Island' },
    { value: 'Pacific/Honolulu', label: '(GMT-10:00) Hawaii Standard Time' },
    { value: 'America/Anchorage', label: '(GMT-08:00) Alaska Time' },
    {
        value: 'America/Los_Angeles',
        label: '(GMT-07:00) Pacific Time (US & Canada)',
    },
    { value: 'America/Phoenix', label: '(GMT-07:00) Arizona Time' },
    {
        value: 'America/Denver',
        label: '(GMT-06:00) Mountain Time (US & Canada)',
    },
    {
        value: 'America/Chicago',
        label: '(GMT-05:00) Central Time (US & Canada)',
    },
    {
        value: 'America/New_York',
        label: '(GMT-04:00) Eastern Time (US & Canada)',
    },
    { value: 'America/Halifax', label: '(GMT-03:00) Atlantic Time (Canada)' },
    {
        value: 'America/St_Johns',
        label: '(GMT-02:30) Newfoundland Standard Time',
    },
    {
        value: 'America/Argentina/Buenos_Aires',
        label: '(GMT-03:00) Buenos Aires',
    },
    { value: 'America/Sao_Paulo', label: '(GMT-03:00) Brasilia Time' },
    { value: 'America/Noronha', label: '(GMT-02:00) Mid-Atlantic Time' },
    { value: 'Atlantic/Azores', label: '(GMT-01:00) Azores Time' },
    { value: 'UTC', label: '(GMT+00:00) Coordinated Universal Time (UTC)' },
    {
        value: 'Europe/London',
        label: '(GMT+01:00) Greenwich Mean Time / British Summer Time',
    },
    { value: 'Europe/Paris', label: '(GMT+02:00) Central European Time' },
    { value: 'Europe/Istanbul', label: '(GMT+03:00) Istanbul / Turkey Time' },
    { value: 'Asia/Riyadh', label: '(GMT+03:00) Riyadh / Arabia Time' },
    { value: 'Asia/Tehran', label: '(GMT+03:30) Iran Standard Time' },
    { value: 'Asia/Dubai', label: '(GMT+04:00) Gulf Standard Time' },
    { value: 'Asia/Kabul', label: '(GMT+04:30) Afghanistan Time' },
    { value: 'Asia/Karachi', label: '(GMT+05:00) Pakistan Standard Time' },
    { value: 'Asia/Kolkata', label: '(GMT+05:30) India Standard Time' },
    { value: 'Asia/Kathmandu', label: '(GMT+05:45) Nepal Time' },
    { value: 'Asia/Dhaka', label: '(GMT+06:00) Bangladesh Standard Time' },
    { value: 'Asia/Yangon', label: '(GMT+06:30) Myanmar Standard Time' },
    { value: 'Asia/Bangkok', label: '(GMT+07:00) Indochina Time' },
    { value: 'Asia/Singapore', label: '(GMT+08:00) Singapore Standard Time' },
    { value: 'Asia/Shanghai', label: '(GMT+08:00) China Standard Time' },
    { value: 'Asia/Tokyo', label: '(GMT+09:00) Japan Standard Time' },
    { value: 'Asia/Seoul', label: '(GMT+09:00) Korea Standard Time' },
    {
        value: 'Australia/Adelaide',
        label: '(GMT+09:30) Australian Central Time',
    },
    { value: 'Australia/Sydney', label: '(GMT+10:00) Australian Eastern Time' },
    { value: 'Asia/Vladivostok', label: '(GMT+10:00) Vladivostok Time' },
    { value: 'Pacific/Guadalcanal', label: '(GMT+11:00) Solomon Islands Time' },
    {
        value: 'Pacific/Auckland',
        label: '(GMT+12:00) New Zealand Standard Time',
    },
    { value: 'Pacific/Fiji', label: '(GMT+12:00) Fiji Standard Time' },
    { value: 'Pacific/Tongatapu', label: '(GMT+13:00) Tonga Time' },
    { value: 'Pacific/Kiritimati', label: '(GMT+14:00) Line Islands Time' },
];
