/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('belga_db');

// Delete the document with id: 4260629
db.getCollection('properties')
    .deleteOne(
        {
         id: 4260629
        }
    );
