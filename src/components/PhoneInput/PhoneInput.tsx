import { useEffect, useState } from 'react';
import DropdownSelect from '@/src/components/DropdownSelect/DropdownSelect';
import InputGoogle from '@/src/components/Input/InputGoogle/InputGoogle';
import WUII from '@/src/components/index';
import { COUNTRY_OPTIONS } from './countries';
import styles from './styles';

export interface PhoneInputProps extends WUII<string> {
    defaultCountryCode?: string;
}

/**
 * PhoneInput component combines DropdownSelect (country code with flags)
 * and InputGoogle for phone number input, outputting E.164 standard (+23321223333).
 */
const PhoneInput = ({
    value = '',
    setValue = () => {},
    defaultCountryCode = '+1',
    label = 'Phone Number',
    description = 'Enter your phone number',
    isReadOnly = false,
    styling,
}: PhoneInputProps) => {
    const parsePhoneNumber = (fullValue: string) => {
        if (!fullValue) return { code: defaultCountryCode, number: '' };

        // Find matching country code from options
        const sortedOptions = [...COUNTRY_OPTIONS].sort(
            (a, b) => b.value.length - a.value.length
        );
        const matched = sortedOptions.find((opt) =>
            fullValue.startsWith(opt.value)
        );

        if (matched) {
            return {
                code: matched.value,
                number: fullValue.slice(matched.value.length),
            };
        }

        return { code: defaultCountryCode, number: fullValue };
    };

    const initial = parsePhoneNumber(value);
    const [countryCode, setCountryCode] = useState<string>(initial.code);
    const [phoneNumber, setPhoneNumber] = useState<string>(initial.number);

    useEffect(() => {
        const parsed = parsePhoneNumber(value);
        setCountryCode(parsed.code);
        setPhoneNumber(parsed.number);
    }, [value]);

    const handleCountryChange = (newCode?: string) => {
        const selectedCode = newCode || defaultCountryCode;
        setCountryCode(selectedCode);
        const combined = `${selectedCode}${phoneNumber}`;
        setValue(combined);
    };

    const handleNumberChange = (newNum?: string) => {
        const cleanedNum = (newNum || '').replace(/[^\d]/g, '');
        setPhoneNumber(cleanedNum);
        const combined = `${countryCode}${cleanedNum}`;
        setValue(combined);
    };

    return (
        <div style={styles.container}>
            <div style={styles.dropdownWrapper}>
                <DropdownSelect
                    value={countryCode}
                    setValue={handleCountryChange}
                    options={COUNTRY_OPTIONS}
                    isReadOnly={isReadOnly}
                    styling={styling}
                />
            </div>
            <div style={styles.inputWrapper}>
                <InputGoogle
                    value={phoneNumber}
                    setValue={handleNumberChange}
                    label={label}
                    description={description}
                    isReadOnly={isReadOnly}
                    styling={styling}
                />
            </div>
        </div>
    );
};

export default PhoneInput;
