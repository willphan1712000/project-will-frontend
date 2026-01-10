import React, { useState } from 'react';

const Avatar = () => {
    const [image, setImage] = useState(null);
    return (
        <div>
            <input type="file" id="avatar" accept="image/*" />
        </div>
    );
};

export default Avatar;
