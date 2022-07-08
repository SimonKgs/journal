import { AddOutlined } from '@mui/icons-material'
import { IconButton, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { startNewNote } from '../../store/journal'
import { JournalLayout } from '../layout/JournalLayout'
import { NoteView, NothingSelectedView } from '../views'


export const JournalPage = () => {

  const { isSaving, active } = useSelector( ( state ) => state.journal);
  const dispatch = useDispatch();

  // console.log(active);
  const onClickNewNote = () => {

    dispatch(startNewNote() );

  }

  return (
      //  component h1 le daria la etiqueta pero sin modificar el texto
    <JournalLayout>
      {/* <Typography>Ipsum in magna adipisicing ea culpa quis Lorem ut dolore cillum enim. Dolor duis ipsum officia sunt enim non eu eu. Officia dolor veniam cillum dolore ullamco commodo velit nulla ipsum non.</Typography> */}

      {
        !!active 
          ? <NoteView />
          : <NothingSelectedView />

      }

      <IconButton
        disabled={ isSaving }
        onClick={onClickNewNote}
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }}/>
      </IconButton>
    </JournalLayout>
    
  )
}
