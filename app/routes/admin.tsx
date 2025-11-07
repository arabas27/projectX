import React, { useState } from "react";

export function meta() {
  return [{ title: "Admin" }];
}

type Student = { id: number; name: string; level: string; room: string };
type Teacher = { id: number; name: string; subject: string };
type User = { id: number; username: string; role: string };
type Subject = { id: number; name: string };

const initialStudents: Student[] = [
  { id: 1, name: "Alice Johnson", level: "Grade 1", room: "A" },
  { id: 2, name: "Ben Smith", level: "Grade 2", room: "B" },
];

const initialTeachers: Teacher[] = [
  { id: 1, name: "Mrs. Parker", subject: "Math" },
  { id: 2, name: "Mr. Brown", subject: "English" },
];

const initialUsers: User[] = [
  { id: 1, username: "admin", role: "admin" },
  { id: 2, username: "teacher1", role: "teacher" },
];

const initialSubjects: Subject[] = [
  { id: 1, name: "Math" },
  { id: 2, name: "English" },
  { id: 3, name: "Science" },
];

export default function Admin() {
  const [tab, setTab] = useState<
    "students" | "teachers" | "users" | "subjects"
  >("students");

  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);

  // Local form state for quick add
  const [newStudent, setNewStudent] = useState({
    name: "",
    level: "Grade 1",
    room: "A",
  });
  const [newTeacher, setNewTeacher] = useState({ name: "", subject: "Math" });
  const [newUser, setNewUser] = useState({ username: "", role: "teacher" });
  const [newSubject, setNewSubject] = useState({ name: "" });

  // Desktop-first: student filters and edit state
  const [searchLevel, setSearchLevel] = useState<string>("All");
  const [searchRoom, setSearchRoom] = useState<string>("All");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<{
    name: string;
    level: string;
    room: string;
  }>({ name: "", level: "Grade 1", room: "A" });
  // Teacher inline edit state
  const [teacherEditingId, setTeacherEditingId] = useState<number | null>(null);
  const [teacherEditValues, setTeacherEditValues] = useState<{
    name: string;
    subject: string;
  }>({ name: "", subject: "Math" });
  // User inline edit state (match teachers)
  const [userEditingId, setUserEditingId] = useState<number | null>(null);
  const [userEditValues, setUserEditValues] = useState<{
    username: string;
    role: string;
  }>({ username: "", role: "teacher" });
  // Subject inline edit state (match teachers/users)
  const [subjectEditingId, setSubjectEditingId] = useState<number | null>(null);
  const [subjectEditValues, setSubjectEditValues] = useState<{ name: string }>({
    name: "",
  });

  function addStudent() {
    if (!newStudent.name.trim()) return;
    setStudents((s) => [...s, { id: Date.now(), ...newStudent }]);
    setNewStudent({ name: "", level: "Grade 1", room: "A" });
  }

  function deleteStudent(id: number) {
    setStudents((s) => s.filter((x) => x.id !== id));
  }

  function addTeacher() {
    if (!newTeacher.name.trim()) return;
    setTeachers((t) => [...t, { id: Date.now(), ...newTeacher }]);
    setNewTeacher({ name: "", subject: "Math" });
  }

  function deleteTeacher(id: number) {
    setTeachers((t) => t.filter((x) => x.id !== id));
  }

  function addUser() {
    if (!newUser.username.trim()) return;
    setUsers((u) => [...u, { id: Date.now(), ...newUser }]);
    setNewUser({ username: "", role: "teacher" });
  }

  function deleteUser(id: number) {
    setUsers((u) => u.filter((x) => x.id !== id));
  }

  function addSubject() {
    if (!newSubject.name.trim()) return;
    setSubjects((s) => [...s, { id: Date.now(), ...newSubject }]);
    setNewSubject({ name: "" });
  }

  function deleteSubject(id: number) {
    setSubjects((s) => s.filter((x) => x.id !== id));
  }

  const filteredStudents = students.filter((s) => {
    if (searchLevel !== "All" && s.level !== searchLevel) return false;
    if (searchRoom !== "All" && s.room !== searchRoom) return false;
    return true;
  });

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Admin
        </h1>

        <nav className="flex gap-2 mb-4">
          <Tab
            label="Students"
            active={tab === "students"}
            onClick={() => setTab("students")}
          />
          <Tab
            label="Teachers"
            active={tab === "teachers"}
            onClick={() => setTab("teachers")}
          />
          <Tab
            label="Users"
            active={tab === "users"}
            onClick={() => setTab("users")}
          />
          <Tab
            label="Subjects"
            active={tab === "subjects"}
            onClick={() => setTab("subjects")}
          />
        </nav>

        <section className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          {tab === "students" && (
            <div>
              <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-3">
                Manage Students
              </h2>

              {/* Section 1: Search */}
              <section
                aria-labelledby="students-search"
                className="mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-700"
              >
                <h3 id="students-search" className="sr-only">
                  Search students
                </h3>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-700 dark:text-gray-200">
                      Level
                    </label>
                    <select
                      className="p-2 rounded border"
                      value={searchLevel}
                      onChange={(e) => setSearchLevel(e.target.value)}
                    >
                      <option>All</option>
                      <option>Grade 1</option>
                      <option>Grade 2</option>
                      <option>Grade 3</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-700 dark:text-gray-200">
                      Room
                    </label>
                    <select
                      className="p-2 rounded border"
                      value={searchRoom}
                      onChange={(e) => setSearchRoom(e.target.value)}
                    >
                      <option>All</option>
                      <option>A</option>
                      <option>B</option>
                      <option>C</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2 ml-auto">
                    <button
                      type="button"
                      className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded text-sm"
                      onClick={() => {
                        setSearchLevel("All");
                        setSearchRoom("All");
                      }}
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </section>

              {/* Section 2: Add student */}
              <section
                aria-labelledby="students-add"
                className="mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-700"
              >
                <h3
                  id="students-add"
                  className="text-sm font-medium text-gray-800 dark:text-gray-100 mb-2"
                >
                  Add student
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                  <input
                    className="p-2 rounded border"
                    value={newStudent.name}
                    placeholder="Name"
                    onChange={(e) =>
                      setNewStudent((s) => ({ ...s, name: e.target.value }))
                    }
                  />
                  <select
                    className="p-2 rounded border"
                    value={newStudent.level}
                    onChange={(e) =>
                      setNewStudent((s) => ({ ...s, level: e.target.value }))
                    }
                  >
                    <option>Grade 1</option>
                    <option>Grade 2</option>
                    <option>Grade 3</option>
                  </select>
                  <select
                    className="p-2 rounded border"
                    value={newStudent.room}
                    onChange={(e) =>
                      setNewStudent((s) => ({ ...s, room: e.target.value }))
                    }
                  >
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                  </select>
                </div>
                <div className="flex gap-2 mb-4">
                  <button
                    className="px-3 py-2 bg-indigo-600 text-white rounded"
                    onClick={addStudent}
                  >
                    Add student
                  </button>
                </div>
              </section>

              {/* Section 3: Data display */}
              <section
                aria-labelledby="students-data"
                className="p-4 bg-gray-50 dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-700"
              >
                <h3 id="students-data" className="sr-only">
                  Student list
                </h3>
                <ul className="space-y-2">
                  {filteredStudents.map((s) => (
                    <li
                      key={s.id}
                      className="flex items-center justify-between p-2 rounded border bg-white dark:bg-gray-900"
                    >
                      <div className="flex-1">
                        {editingId === s.id ? (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            <input
                              className="p-2 rounded border"
                              value={editValues.name}
                              onChange={(e) =>
                                setEditValues((v) => ({
                                  ...v,
                                  name: e.target.value,
                                }))
                              }
                            />
                            <select
                              className="p-2 rounded border"
                              value={editValues.level}
                              onChange={(e) =>
                                setEditValues((v) => ({
                                  ...v,
                                  level: e.target.value,
                                }))
                              }
                            >
                              <option>Grade 1</option>
                              <option>Grade 2</option>
                              <option>Grade 3</option>
                            </select>
                            <select
                              className="p-2 rounded border"
                              value={editValues.room}
                              onChange={(e) =>
                                setEditValues((v) => ({
                                  ...v,
                                  room: e.target.value,
                                }))
                              }
                            >
                              <option>A</option>
                              <option>B</option>
                              <option>C</option>
                            </select>
                          </div>
                        ) : (
                          <>
                            <div className="font-medium">{s.name}</div>
                            <div className="text-xs text-gray-500">
                              {s.level} • Room {s.room}
                            </div>
                          </>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {editingId === s.id ? (
                          <div className="flex flex-col gap-2 px-3">
                            <button
                              className="px-2 py-1 rounded bg-green-50 dark:bg-green-600/10 border border-green-200 text-green-600 dark:text-green-300"
                              onClick={() => {
                                setStudents((st) =>
                                  st.map((x) =>
                                    x.id === s.id
                                      ? {
                                          ...x,
                                          name: editValues.name,
                                          level: editValues.level,
                                          room: editValues.room,
                                        }
                                      : x
                                  )
                                );
                                setEditingId(null);
                              }}
                            >
                              Save
                            </button>
                            <button
                              className="px-2 py-1 rounded bg-gray-50 dark:bg-gray-600/10 border border-gray-200 text-gray-600 dark:text-gray-300"
                              onClick={() => setEditingId(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <>
                            <button
                              className="px-2 py-1 rounded bg-blue-50 dark:bg-blue-600/10 border border-blue-200 text-blue-600 dark:text-blue-300"
                              onClick={() => {
                                setEditingId(s.id);
                                setEditValues({
                                  name: s.name,
                                  level: s.level,
                                  room: s.room,
                                });
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="px-2 py-1 rounded bg-red-50 dark:bg-red-600/10 border border-red-200 text-red-600 dark:text-red-300"
                              onClick={() => deleteStudent(s.id)}
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          )}

          {tab === "teachers" && (
            <div>
              <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-3">
                Manage Teachers
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                <input
                  className="p-2 rounded border"
                  value={newTeacher.name}
                  placeholder="Name"
                  onChange={(e) =>
                    setNewTeacher((t) => ({ ...t, name: e.target.value }))
                  }
                />
                <select
                  className="p-2 rounded border"
                  value={newTeacher.subject}
                  onChange={(e) =>
                    setNewTeacher((t) => ({ ...t, subject: e.target.value }))
                  }
                >
                  {subjects.map((sub) => (
                    <option key={sub.id}>{sub.name}</option>
                  ))}
                </select>
                <div />
              </div>
              <div className="flex gap-2 mb-4">
                <button
                  className="px-3 py-2 bg-indigo-600 text-white rounded"
                  onClick={addTeacher}
                >
                  Add teacher
                </button>
              </div>

              <ul className="space-y-2">
                {teachers.map((t) => (
                  <li
                    key={t.id}
                    className="flex items-center justify-between p-2 rounded border bg-white dark:bg-gray-900"
                  >
                    <div className="flex-1">
                      {teacherEditingId === t.id ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <input
                            className="p-2 rounded border"
                            value={teacherEditValues.name}
                            onChange={(e) =>
                              setTeacherEditValues((v) => ({
                                ...v,
                                name: e.target.value,
                              }))
                            }
                          />
                          <select
                            className="p-2 rounded border"
                            value={teacherEditValues.subject}
                            onChange={(e) =>
                              setTeacherEditValues((v) => ({
                                ...v,
                                subject: e.target.value,
                              }))
                            }
                          >
                            {subjects.map((sub) => (
                              <option key={sub.id}>{sub.name}</option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <>
                          <div className="font-medium">{t.name}</div>
                          <div className="text-xs text-gray-500">
                            {t.subject}
                          </div>
                        </>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {teacherEditingId === t.id ? (
                        <div className="flex flex-col gap-2 px-3">
                          <button
                            className="px-2 py-1 rounded bg-green-50 dark:bg-green-600/10 border border-green-200 text-green-600 dark:text-green-300"
                            onClick={() => {
                              setTeachers((st) =>
                                st.map((x) =>
                                  x.id === t.id
                                    ? {
                                        ...x,
                                        name: teacherEditValues.name,
                                        subject: teacherEditValues.subject,
                                      }
                                    : x
                                )
                              );
                              setTeacherEditingId(null);
                            }}
                          >
                            Save
                          </button>
                          <button
                            className="px-2 py-1 rounded bg-gray-50 dark:bg-gray-600/10 border border-gray-200 text-gray-600 dark:text-gray-300"
                            onClick={() => setTeacherEditingId(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <>
                          <button
                            className="px-2 py-1 rounded bg-blue-50 dark:bg-blue-600/10 border border-blue-200 text-blue-600 dark:text-blue-300"
                            onClick={() => {
                              setTeacherEditingId(t.id);
                              setTeacherEditValues({
                                name: t.name,
                                subject: t.subject,
                              });
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="px-2 py-1 rounded bg-red-50 dark:bg-red-600/10 border border-red-200 text-red-600 dark:text-red-300"
                            onClick={() => deleteTeacher(t.id)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tab === "users" && (
            <div>
              <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-3">
                Manage Users
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                <input
                  className="p-2 rounded border"
                  value={newUser.username}
                  placeholder="Username"
                  onChange={(e) =>
                    setNewUser((u) => ({ ...u, username: e.target.value }))
                  }
                />
                <select
                  className="p-2 rounded border"
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser((u) => ({ ...u, role: e.target.value }))
                  }
                >
                  <option>admin</option>
                  <option>teacher</option>
                </select>
                <div />
              </div>
              <div className="flex gap-2 mb-4">
                <button
                  className="px-3 py-2 bg-indigo-600 text-white rounded"
                  onClick={addUser}
                >
                  Add user
                </button>
              </div>

              <ul className="space-y-2">
                {users.map((u) => (
                  <li
                    key={u.id}
                    className="flex items-center justify-between p-2 rounded border bg-white dark:bg-gray-900"
                  >
                    <div className="flex-1">
                      {userEditingId === u.id ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <input
                            className="p-2 rounded border"
                            value={userEditValues.username}
                            onChange={(e) =>
                              setUserEditValues((v) => ({
                                ...v,
                                username: e.target.value,
                              }))
                            }
                          />
                          <select
                            className="p-2 rounded border"
                            value={userEditValues.role}
                            onChange={(e) =>
                              setUserEditValues((v) => ({
                                ...v,
                                role: e.target.value,
                              }))
                            }
                          >
                            <option>admin</option>
                            <option>teacher</option>
                          </select>
                        </div>
                      ) : (
                        <>
                          <div className="font-medium">{u.username}</div>
                          <div className="text-xs text-gray-500">{u.role}</div>
                        </>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {userEditingId === u.id ? (
                        <div className="flex flex-col gap-2 px-3">
                          <button
                            className="px-2 py-1 rounded bg-green-50 dark:bg-green-600/10 border border-green-200 text-green-600 dark:text-green-300"
                            onClick={() => {
                              setUsers((st) =>
                                st.map((x) =>
                                  x.id === u.id
                                    ? {
                                        ...x,
                                        username: userEditValues.username,
                                        role: userEditValues.role,
                                      }
                                    : x
                                )
                              );
                              setUserEditingId(null);
                            }}
                          >
                            Save
                          </button>
                          <button
                            className="px-2 py-1 rounded bg-gray-50 dark:bg-gray-600/10 border border-gray-200 text-gray-600 dark:text-gray-300"
                            onClick={() => setUserEditingId(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <>
                          <button
                            className="px-2 py-1 rounded bg-blue-50 dark:bg-blue-600/10 border border-blue-200 text-blue-600 dark:text-blue-300"
                            onClick={() => {
                              setUserEditingId(u.id);
                              setUserEditValues({
                                username: u.username,
                                role: u.role,
                              });
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="px-2 py-1 rounded bg-red-50 dark:bg-red-600/10 border border-red-200 text-red-600 dark:text-red-300"
                            onClick={() => deleteUser(u.id)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tab === "subjects" && (
            <div>
              <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-3">
                Manage Subjects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                <input
                  className="p-2 rounded border"
                  value={newSubject.name}
                  placeholder="Subject name"
                  onChange={(e) => setNewSubject({ name: e.target.value })}
                />
                <div />
                <div />
              </div>
              <div className="flex gap-2 mb-4">
                <button
                  className="px-3 py-2 bg-indigo-600 text-white rounded"
                  onClick={addSubject}
                >
                  Add subject
                </button>
              </div>

              <ul className="space-y-2">
                {subjects.map((s) => (
                  <li
                    key={s.id}
                    className="flex items-center justify-between p-2 rounded border bg-white dark:bg-gray-900"
                  >
                    <div className="flex-1">
                      {subjectEditingId === s.id ? (
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
                          <input
                            className="p-2 rounded border"
                            value={subjectEditValues.name}
                            onChange={(e) =>
                              setSubjectEditValues({ name: e.target.value })
                            }
                          />
                        </div>
                      ) : (
                        <>
                          <div className="font-medium">{s.name}</div>
                        </>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {subjectEditingId === s.id ? (
                        <div className="flex flex-col gap-2 px-3">
                          <button
                            className="px-2 py-1 rounded bg-green-50 dark:bg-green-600/10 border border-green-200 text-green-600 dark:text-green-300"
                            onClick={() => {
                              setSubjects((st) =>
                                st.map((x) =>
                                  x.id === s.id
                                    ? { ...x, name: subjectEditValues.name }
                                    : x
                                )
                              );
                              setSubjectEditingId(null);
                            }}
                          >
                            Save
                          </button>
                          <button
                            className="px-2 py-1 rounded bg-gray-50 dark:bg-gray-600/10 border border-gray-200 text-gray-600 dark:text-gray-300"
                            onClick={() => setSubjectEditingId(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <>
                          <button
                            className="px-2 py-1 rounded bg-blue-50 dark:bg-blue-600/10 border border-blue-200 text-blue-600 dark:text-blue-300"
                            onClick={() => {
                              setSubjectEditingId(s.id);
                              setSubjectEditValues({ name: s.name });
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="px-2 py-1 rounded bg-red-50 dark:bg-red-600/10 border border-red-200 text-red-600 dark:text-red-300"
                            onClick={() => deleteSubject(s.id)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function Tab({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded ${active ? "bg-indigo-600 text-white" : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700"}`}
    >
      {label}
    </button>
  );
}
