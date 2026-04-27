// seed.js
// =============================================================================
//  Seed the database with realistic test data.
//  Run with: npm run seed
//
//  Required minimum:
//    - 2 users
//    - 4 projects (split across the users)
//    - 5 tasks (with embedded subtasks and tags arrays)
//    - 5 notes (some attached to projects, some standalone)
//
//  Use the bcrypt module to hash passwords before inserting users.
//  Use ObjectId references for relationships (projectId, ownerId).
// =============================================================================

require('dotenv').config();
const bcrypt = require('bcryptjs');
const { connect } = require('./db/connection');
const { deserializeStream } = require('bson');

(async () => {
  const db = await connect();

  // OPTIONAL: clear existing data so re-seeding is idempotent
  await db.collection('users').deleteMany({});
  await db.collection('projects').deleteMany({});
  await db.collection('tasks').deleteMany({});
  await db.collection('notes').deleteMany({});


  const hashed_password = await bcrypt.hash('anas123', 10);
  

  //USERS
  const  u1 = await db.collection('users').insertOne({
    name: 'Anas',
    email: 'anas@gmail.com',
    passwordHash: hashed_password,
    createdAt: new Date()
  });
  const userId1 = u1.insertedId;

  const u2 = await db.collection('users').insertOne({
    name: 'ali',
    email: 'ali@gmail.com',
    passwordHash: hashed_password,
    createdAt: new Date()
  });
  const userId2 = u2.insertedId;





  //PROJECTS
  const p1 = await db.collection('projects').insertOne({
    ownerId: userId1,
    name: 'Project 1',
    description: 'This is the first project.',
    archived: false,
    createdAt: new Date()
  });

  const p2 = await db.collection('projects').insertOne({
    ownerId: userId2,
    name: 'Project 2',
    description: 'This is the second project.',
    archived: false,
    createdAt: new Date()
  });
  const p3 = await db.collection('projects').insertOne({
    ownerId: userId1,
    name: 'Project 3',
    description: 'This is the third project.',
    archived: false,
    createdAt: new Date()
  });
  const p4 = await db.collection('projects').insertOne({
    ownerId: userId2,
    name: 'Project 4',
    description: 'This is the fourth project.',
    archived: false,
    createdAt: new Date()
  });


  const p1_id = p1.insertedId;
  const p2_id = p2.insertedId;
  const p3_id = p3.insertedId;
  const p4_id = p4.insertedId;

  //TASKS

  const t1 = await db.collection('tasks').insertOne({
    ownerId: userId1,
    projectId: p1_id,
    title: 'Task 1',
    status: 'todo',
    priority: 3,
    tags: ['urgent'],
    subtasks: [
      { title: 'Outline sections', done: true },
      { title: 'Draft', done: false }
    ],
    createdAt: new Date(),
    description: 'This is the first task.',
    dueDate: new Date()
  });

  const t2 = await db.collection('tasks').insertOne({
    ownerId: userId2,
    projectId: p2_id,
    title: 'Task 2',
    status: 'todo',
    priority: 1,
    tags: ['low-priority'],
    subtasks: [
      { title: 'Write essay', done: false },
      { title: 'Write Introduction', done: false }
    ],
    createdAt: new Date(),
    description: 'This is the second task.',
    dueDate: new Date()
  });

  const t3 = await db.collection('tasks').insertOne({
    ownerId: userId1,
    projectId: p1_id,
    title: 'Task 3',
    status: 'todo',
    priority: 2,
    tags: ['medium-priority'],
    subtasks: [
      { title: 'Review draft', done: false },
      { title: 'Edit content', done: false }
    ],
    createdAt: new Date(),
    description: 'This is the third task.',
    dueDate: new Date()
  });

  const t4 = await db.collection('tasks').insertOne({
    ownerId: userId2,
    projectId: p3_id,
    title: 'Task 4',
    status: 'in-progress',
    priority: 1,
    tags: ['medium-priority'],
    subtasks: [
      { title: 'Do assignment', done: false },
      { title: 'Write code', done: false }
    ],
    createdAt: new Date(),
    description: 'This is the fourth task.',
    dueDate: new Date()
  });

  const t5 = await db.collection('tasks').insertOne({
    ownerId: userId1,
    projectId: p5_id,
    title: 'Task 5',
    status: 'in-progress',
    priority: 1,
    tags: ['medium-priority'],
    subtasks: [
      { title: 'Give viva', done: false },
      { title: 'Attend class', done: false }
    ],
    createdAt: new Date(),
    description: 'This is the fifth task.',
    dueDate: new Date()
  });



  //NOTES


  const n1 = await db.collection('notes').insertOne({
    ownerId: userId1,
    projectId: p1_id,
    title: 'Note 1',
    content: 'This is the first note.',
    tags: ['important'],
    createdAt: new Date()
  });

  const n2 = await db.collection('notes').insertOne({
    ownerId: userId2,
    projectId: p2_id,
    title: 'Note 2',
    content: 'This is the second note.',
    tags: ['general'],
    createdAt: new Date()
  });
  const n3 = await db.collection('notes').insertOne({
    ownerId: userId1,
    projectId: p1_id,
    title: 'Note 3',
    content: 'This is the third note.',
    tags: ['general'],
    createdAt: new Date()
  });
  const n4 = await db.collection('notes').insertOne({
    ownerId: userId2,
    projectId: p3_id,
    title: 'Note 4',
    content: 'This is the fourth note.',
    tags: ['important'],    
    createdAt: new Date()
  });

  const n5 = await db.collection('notes').insertOne({
    ownerId: userId1,
    projectId: p5_id,
    title: 'Note 5',
    content: 'This is the fifth note.',
    tags: ['general'],
    createdAt: new Date()
  });





  console.log('TODO: implement seed.js');
  process.exit(0);

  
})();






