# Schema Design — Personal Productivity Hub

> Fill in every section below. Keep answers concise.

---

## 1. Collections Overview

Briefly describe each collection (1–2 sentences each):

- **users** —
- **projects** —
- **tasks** —
- **notes** —

---

## 2. Document Shapes

For each collection, write the document shape (field name + type + required/optional):

### users
{
  _id: ObjectId,
  email: string (required, unique),
  passwordHash: string (required),
  name: string (required),
  createdAt: Date (required)
}

### projects
{
  _id: ObjectId,
  ownerId: ObjectId (required, reference to users),
  name: string (required),
  description: string (optional)
  archived: boolean (required, default: false),
  createdAt: Date (required)
}


### tasks

{
  _id: ObjectId,
  ownerId: ObjectId (required, reference to users),
  projectId: ObjectId (required, reference to projects),
  title: string (required),
  status: string (required: "todo" | "in-progress" | "done"),
  priority: number (required),
  tags: [string] (optional),
  subtasks: [
    {
      title: string (required),
      done: boolean (required)
    }
  ] (optional),
  createdAt: Date (required),
  description: string (optional),
  dueDate: Date (optional)
}

### notes

{
  _id: ObjectId,
  ownerId: ObjectId (required, reference to users),
  projectId: ObjectId (optional, reference to projects),
  title: string (required)
  content: string (required),
  tags: [string] (required),
  createdAt: Date (required)
}
---

## 3. Embed vs Reference — Decisions

For each relationship, state whether you embedded or referenced, and **why** (one sentence):

| Relationship                       | Embed or Reference? | Why? |
|-----------------------------------|---------------------|------|
| Subtasks inside a task            |     embed           |subtasks are owned by tasks and is nested inside it so its not queried separately  |


| Tags on a task                    |      embed          |tags are just strings inside tasks and they dont have their own identity     |

| Project → Task ownership          |      refernce       |tasks have project id link something like a foriegn key      |

| Note → optional Project link      |      reference      |notes may or may not belong to a project and can be queired independently so refence is used      |

---

## 4. Schema Flexibility Example

Name one field that exists on **some** documents but not **all** in the same collection. Explain why this is acceptable (or even useful) in MongoDB.

"dueDate" in tasks collection

Some tasks have a deadline , while others are open-ended and simply omit the field entirely. In a relational database this would require a nullable column on every row. In MongoDB, the field simply does not exist on documents that don't need it, keeping documents clean. Another example can be "description inside projects collection.