import { Toolbar } from '@mui/material'
import { Box } from '@mui/system'
import { Navbar, Sidebar } from '../components'

const drawerWith = 240

export const JournalLayout = ({ children }) => {
    return (
        <Box sx={{ display: 'flex'}} className='animate__animated animate__fadeInDown animate__faster'>
            
            <Navbar drawerWith={ drawerWith } />

            <Sidebar drawerWidth={ drawerWith } />

            <Box
                component={'main'}
                sx={{ flexGrow: 1, p: 2}}
            >
                <Toolbar />

                { children }
            </Box>
        </Box>
    )
}
