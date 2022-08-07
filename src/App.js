import "./App.css";
import { createNote, deleteNote } from "./graphql/mutations";
import { listNotes } from "./graphql/queries";
import {
  withAuthenticator,
  Button,
  Text,
  Flex,
  Heading,
} from "@aws-amplify/ui-react";
import { useCallback, useEffect, useState } from "react";
import { API } from "aws-amplify";

function App({ signOut }) {
  const [notes, setNotes] = useState([]);

  const fetchNotes = useCallback(async () => {
    const result = await API.graphql({
      query: listNotes,
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    setNotes(result.data.listNotes.items);
  }, [setNotes]);

  const handleCreateNote = useCallback(async () => {
    await API.graphql({
      query: createNote,
      variables: { input: { text: window.prompt("New note") } },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    fetchNotes();
  }, [fetchNotes]);

  const handleDeleteNote = useCallback(
    async (id) => {
      await API.graphql({
        query: deleteNote,
        variables: { input: { id: id } },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      fetchNotes();
    },
    [fetchNotes]
  );

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return (
    <Flex direction={"column"}>
      <Flex justifyContent={"space-between"}>
        <Heading level={1}>My notes app!</Heading>
        <body> zhangrunqing V2</body>
        <Heading level={1}>My notes app! cass here</Heading>
        <Heading level={2}>Student name</Heading>
        <h1>Shawnssc1994</h1>
        <ul>
          <li>Gaohui Lin</li>
          <li>Test</li>
          <li>jtt-42</li>
          <li>Gaohui Test JTT-42 boris z </li>
          <li>zhangrunqing</li>
          <li>Hi Lawrence</li>
          <li>Old Iron 666</li>
          <li>Arno_Xu</li>
          <li>change me</li>
          <li>change me</li>
          <li>Declan</li>
          <li>hahahahahah007</li>
          <li>Shelton</li>
          <li>Skye</li>
          <li>hahahahah xixixixix</li>
          <li>Shelton</li>
          <li> Liz Q</li>
          <li>Devops Devops</li>
          <li>Gaohui Lin</li>
          <li>Nikki</li>
          <li>Hello from Lina</li>
          <li>cassie</li>
        </ul>
        <Button onClick={signOut}>Sign Out</Button>
      </Flex>
      {notes.map((note) => (
        <Flex alignItems={"center"}>
          <Text>{note.text}</Text>
          <Button onClick={() => handleDeleteNote(note.id)}>Remove</Button>
        </Flex>
      ))}
      <Button onClick={handleCreateNote}>Add Note</Button>

      <h1>practice practice </h1>
      <h2>devops devops</h2>

      <h3>study hard</h3>
    </Flex>
  );
}

export default withAuthenticator(App);