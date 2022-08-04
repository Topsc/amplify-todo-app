import './App.css';
import { createNote, deleteNote} from './graphql/mutations'
import { listNotes } from './graphql/queries'
import { withAuthenticator, Button, Text, Flex, Heading } from "@aws-amplify/ui-react";
import { useCallback, useEffect, useState } from 'react';
import { API } from 'aws-amplify';

function App({ signOut }) {
  const [ notes, setNotes ] = useState([])

  const fetchNotes = useCallback(async () => {
    const result = await API.graphql({
      query: listNotes,
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    })
    setNotes(result.data.listNotes.items)
  }, [setNotes])

  const handleCreateNote = useCallback(async () => {
    await API.graphql({
      query: createNote,
      variables: { input: { text: window.prompt("New note") } },
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    })
    fetchNotes()
  }, [fetchNotes])

  const handleDeleteNote = useCallback(async (id) => {
    await API.graphql({
      query: deleteNote,
      variables: { input: { id: id } },
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    })
    fetchNotes()
  }, [fetchNotes])

  useEffect(() => {
    fetchNotes()
  }, [fetchNotes])

  return (
    <Flex direction={"column"}>
      <Flex justifyContent={'space-between'}>
        <Heading level={1}>My notes app! Jenny Sun</Heading>
        <Heading level={1}>My notes app!</Heading>
<<<<<<< HEAD
<<<<<<< HEAD
=======
          <h1>Old Iron 666</h1>
>>>>>>> ef829e87f1c4ec89a81f56589cea8fcd3de8ba12
        <Text>Arno_Xu</Text>
=======
<<<<<<< HEAD
        <body>Nikki</body>
=======
        <ol>
            <li>Dexter</li>
        </ol>
>>>>>>> 691ce2aa482dd73cee2949798f68ded52236eb41
>>>>>>> 3e3e9b3b9f6f369fda03c402615bed0c4f94caa6
        <Button onClick={signOut}>Sign Out</Button>
      </Flex>
      {notes.map(note => <Flex alignItems={'center'}>
        <Text>{note.text}</Text>
        <Button onClick={() => handleDeleteNote(note.id)}>Remove</Button>
      </Flex>)}
      <Button onClick={handleCreateNote}>Add Note</Button>
    </Flex>
  );
}

export default withAuthenticator(App);
