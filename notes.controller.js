const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();
  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);
  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgGreen("Note was added"));
}

async function editNote(id, changedData) {
  const notes = await getNotes();

  notes.forEach((note) => {
    if (note.id === id) {
      note.title = changedData;
    }
    return note;
  });

  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgCyan("Note was changed to:", changedData));
}

async function removeNote(id) {
  const notes = await getNotes();
  const filteredByIdNote = notes.filter((note) => note.id !== id);
  await fs.writeFile(notesPath, JSON.stringify(filteredByIdNote));

  console.log(chalk.bgRed("Note was removed"));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

module.exports = {
  addNote,
  getNotes,
  removeNote,
  editNote,
};
