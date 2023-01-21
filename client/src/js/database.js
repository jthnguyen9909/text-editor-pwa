import { openDB } from "idb";

const initdb = async () =>
  // create a database named 'jate' which will use version 1 of the database
  openDB("jate", 1, {
    // add our database schema if not already initialized
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      // create a new object store for the data and give it key name of id that increments
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// method that accepts some content and adds it to the database
// export the methods we use to put and get from the database
export const putDb = async (content) => {
  console.log("Post to the database");

  // create a connection to the database and version we want to use (1)
  const editorDB = await openDB("jate", 1);
  // create a new transaction and specify the database and data privileges(readwrite)
  const tx = editorDB.transaction("jate", "readwrite");
  // open up desired object store
  const store = tx.objectStore("jate");
  // use .add() method and pass in content
  const request = store.add({ id: 1, value: content });
  // await result
  const result = await request;
  console.log("data added to the database");
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("Get from the database");

  const editorDB = await openDB("jate", 1);
  const tx = editorDB.transaction("jate", "readonly");

  const store = tx.objectStore("jate");
  // use getAll() or getOne(1) to get wanted data
  const request = store.getAll();
  // await result
  const result = await request;
  console.log("result.value", result.value);
  return result.value;
};

initdb();
