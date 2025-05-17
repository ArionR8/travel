import { useState } from 'react';

export default function useNavViewModel() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(prev => !prev);
    };

    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    return {
        dropdownOpen,
        toggleDropdown,
        closeDropdown,
    };
}
