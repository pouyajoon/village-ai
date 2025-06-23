import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Drawer, List, Toolbar, Autocomplete, TextField, Box, IconButton } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import LdListItem from './LdListItem';
import lieuxDits from './lieux-dits.json';

const drawerWidth = 240;

interface LdDrawerProps {
    lieuxDits: { id: number; name: string; }[];
    selectedLds: number[];
    onToggleLd: (id: number) => void;
    onSelectAll: () => void;
    onDeselectAll: () => void;
    onFilterChange: (filter: string) => void;
    mobileOpen: boolean;
    handleDrawerToggle: () => void;
}

const LdDrawer: React.FC<LdDrawerProps> = ({ lieuxDits: filteredLieuxDits, selectedLds, onToggleLd, onSelectAll, onDeselectAll, onFilterChange, mobileOpen, handleDrawerToggle }) => {
    const { t } = useTranslation();

    const drawerContent = (
        <div>
            <Toolbar />
            <Box sx={{ p: 2 }}>
                <Autocomplete
                    options={lieuxDits.filter(ld => ld.active).map(option => option.name)}
                    onInputChange={(event, newInputValue) => {
                        onFilterChange(newInputValue);
                    }}
                    renderInput={(params) => <TextField {...params} label={t('Search')} variant="standard" />}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 1 }}>
                    <IconButton onClick={onSelectAll} title={t('Select All')}>
                        <CheckBoxIcon />
                    </IconButton>
                    <IconButton onClick={onDeselectAll} title={t('Deselect All')}>
                        <CheckBoxOutlineBlankIcon />
                    </IconButton>
                </Box>
            </Box>
            <List>
                {filteredLieuxDits.map((ld) => (
                    <LdListItem
                        key={ld.id}
                        ld={ld}
                        selected={selectedLds.includes(ld.id)}
                        onToggle={onToggleLd}
                    />
                ))}
            </List>
        </div>
    );

    return (
        <>
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {drawerContent}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
            >
                {drawerContent}
            </Drawer>
        </>
    );
};

export default LdDrawer;