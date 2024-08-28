import React, { useState } from 'react';
import './style.css'; // Updated to use the converted CSS

function SwitchTabs({ data, onTabChange }) {
    const [selectedTab, setSelectedTab] = useState(0);
    const [left, setLeft] = useState(0);

    function activeTab(item, index) {
        setLeft(index * 100);
        setTimeout(() => {
            setSelectedTab(index);
        }, 300);
        onTabChange(item, index);
    }

    return (
        <div className='switchingTabs'>
            <div className="tabItems">
                {data.map((item, index) => (
                    <span
                        key={index}
                        className={`tabItem ${selectedTab === index ? 'active' : ""}`}
                        onClick={() => activeTab(item, index)}
                    >
                        {item}
                    </span>
                ))}
                <span className="movingBg" style={{ left }}></span>
            </div>
        </div>
    );
}

export default SwitchTabs;
