import React from 'react';
import { ListItem, ListItemText, Checkbox, ListItemButton } from '@mui/material';

interface LdListItemProps {
    ld: {
        id: number;
        name: string;
    };
    selected: boolean;
    onToggle: (id: number) => void;
}

const LdListItem: React.FC<LdListItemProps> = ({ ld, selected, onToggle }) => {
    return (
        <ListItem key={ld.id} disablePadding>
            <ListItemButton dense onClick={() => onToggle(ld.id)}>
                <Checkbox
                    edge="start"
                    checked={selected}
                    tabIndex={-1}
                    disableRipple
                />
                <ListItemText primary={ld.name} />
            </ListItemButton>
        </ListItem>
    );
};

export default LdListItem;