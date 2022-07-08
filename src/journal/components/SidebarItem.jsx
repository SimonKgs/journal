import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../store/journal/journalSlice";

export const SidebarItem = ({ id, body, title, date, imagesURLs = [] }) => {
    const dispatch = useDispatch();

    const setActive = () => {
        dispatch(setActiveNote({id, body, title, date, imagesURLs }));
    }

    const newTitle = useMemo( () => {
        return ( title?.length > 10) ? title.substring(0, 10) + '...' : title
    }, [ title ])

    return (
        <ListItem onClick={ setActive } disablePadding>
            <ListItemButton>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid
                    container
                >
                    <ListItemText primary={ newTitle } />
                    <ListItemText primary={body} />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
