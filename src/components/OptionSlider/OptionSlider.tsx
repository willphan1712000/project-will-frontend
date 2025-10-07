import styles from './optionSlider.module.css';
import { ReactNode } from 'react';

export type Options = {
  label: ReactNode,
  value: string
}[]

interface Props {
  value: string,
  onChange: (value: string) => void,
  width?: string,
  options: Options,
  color?: string
}

/**
 * Option Slider component, allowing users to select a value they want with the help of element representaion. Label is a React Node jsx that represents the option. For example, if a value was a font, the label would be a React Node jsx that represents a character using the font
 * @param value - a chosen value
 * @param onChange - to set a value
 * @options - list of options, format [{ label: React Node Syntax, value: string }]
 * @returns 
 */
const OptionSlider = ({ value, onChange, width = "200", options, color = "#f0f0f7" }: Props) => {
  return (
    <div className={styles.border} style={{
      width: `${width}px`,
    }}>
      <div className={styles.background} style={{
        background: color
      }}></div>
      <div className={styles.options}>
        {options.map((option, key) => (
            <div
              style={{
                background: color,
                border: value === option.value ? "solid 2px #000" : "solid 1px #000"
              }}
              className={styles.element} 
              key={key}
              onClick={() => onChange(option.value)}
              title={option.value}
              >{option.label}
            </div>
        ))}
      </div>
    </div>
  )
}

export default OptionSlider
