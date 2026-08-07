import React from 'react';
import * as styles from './styles';
import WUII from '..';

interface TabsProps {
    activeTab: 'weekly' | 'specific';
    onTabChange: (tab: 'weekly' | 'specific') => void;
    styling?: WUII['styling'];
}

export default function Tabs({
    activeTab,
    onTabChange,
    styling,
}: TabsProps): React.JSX.Element {
    const containerBgColor = styling?.backgroundColor || '#ffffff';
    const inactiveTextColor = styling?.textColor || '#1f2937';
    const activeBgColor = styling?.primaryColor || '#c23b36';

    return (
        <div
            style={{
                ...styles.toggleContainer,
                backgroundColor: containerBgColor,
            }}
            role="tablist"
            aria-label="Repeat mode"
        >
            <button
                onClick={() => onTabChange('weekly')}
                style={{
                    ...styles.tabButtonBase,
                    backgroundColor:
                        activeTab === 'weekly' ? activeBgColor : 'transparent',
                    color:
                        activeTab === 'weekly' ? '#ffffff' : inactiveTextColor,
                }}
                role="tab"
                aria-selected={activeTab === 'weekly'}
            >
                Repeat weekly
            </button>
            <button
                onClick={() => onTabChange('specific')}
                style={{
                    ...styles.tabButtonBase,
                    backgroundColor:
                        activeTab === 'specific'
                            ? activeBgColor
                            : 'transparent',
                    color:
                        activeTab === 'specific'
                            ? '#ffffff'
                            : inactiveTextColor,
                }}
                role="tab"
                aria-selected={activeTab === 'specific'}
            >
                Specific date
            </button>
        </div>
    );
}
