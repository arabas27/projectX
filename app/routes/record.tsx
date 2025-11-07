import React, { useMemo, useState } from "react";

export function meta() {
  return [{ title: "Records" }];
}

type Student = {
  id: number;
  name: string;
  level: string;
  room: string;
  subject: string;
  seatNumber: number;
};

const SAMPLE_STUDENTS: Student[] = [
  {
    id: 1,
    name: "Alice Johnson",
    level: "Grade 1",
    room: "A",
    subject: "Math",
    seatNumber: 1,
  },
  {
    id: 2,
    name: "Ben Smith",
    level: "Grade 2",
    room: "B",
    subject: "English",
    seatNumber: 5,
  },
  {
    id: 3,
    name: "Clara Lee",
    level: "Grade 1",
    room: "A",
    subject: "Science",
    seatNumber: 10,
  },
  {
    id: 4,
    name: "Daniel Kim",
    level: "Grade 3",
    room: "C",
    subject: "Math",
    seatNumber: 15,
  },
  {
    id: 5,
    name: "Eve Martinez",
    level: "Grade 2",
    room: "B",
    subject: "Science",
    seatNumber: 20,
  },
  {
    id: 6,
    name: "Frank Wu",
    level: "Grade 1",
    room: "A",
    subject: "English",
    seatNumber: 25,
  },
];

export default function Record() {
  const [level, setLevel] = useState<string>("All");
  const [room, setRoom] = useState<string>("All");
  const [subject, setSubject] = useState<string>("All");
  const [query, setQuery] = useState<string>("");

  const [attendance, setAttendance] = useState<
    Record<number, { status: string; late: boolean }>
  >({});

  const STATUS_OPTIONS: { key: string; label: string; color: string }[] = [
    { key: "มา", label: "มา", color: "bg-green-500" },
    { key: "กิจ", label: "กิจ", color: "bg-sky-500" },
    { key: "ป่วย", label: "ป่วย", color: "bg-yellow-500 text-black" },
    { key: "ขาด", label: "ขาด", color: "bg-red-500" },
  ];

  function setStudentStatus(id: number, status: string) {
    setAttendance((s) => ({
      ...s,
      [id]: { ...(s[id] || { status: "", late: false }), status },
    }));
  }

  function toggleStudentLate(id: number) {
    setAttendance((s) => ({
      ...s,
      [id]: { ...(s[id] || { status: "", late: false }), late: !s[id]?.late },
    }));
  }

  function submitAttendance() {
    // Build payload only for students with a status or late flag
    const payload = Object.entries(attendance)
      .map(([id, v]) => ({ id: Number(id), status: v.status, late: v.late }))
      .filter((p) => p.status || p.late);

    if (payload.length === 0) {
      alert("No attendance changes to submit.");
      return;
    }

    // For now just log and show a confirmation. Replace this with a fetch POST to your API.
    console.log("Submitting attendance:", payload);
    alert(`ส่งเรียบร้อย (${payload.length} รายการ)`);
  }

  const results = useMemo(() => {
    return SAMPLE_STUDENTS.filter((s) => {
      if (level !== "All" && s.level !== level) return false;
      if (room !== "All" && s.room !== room) return false;
      if (subject !== "All" && s.subject !== subject) return false;
      if (query && !s.name.toLowerCase().includes(query.toLowerCase()))
        return false;
      return true;
    });
  }, [level, room, subject, query]);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Student Records
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-[360px_1fr] gap-6">
          {/* Search panel */}
          <section
            aria-labelledby="search-heading"
            className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm"
          >
            <h2
              id="search-heading"
              className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-3"
            >
              Search group
            </h2>

            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label
                  htmlFor="level"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                >
                  Level
                </label>
                <select
                  id="level"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
                >
                  <option>All</option>
                  <option>Grade 1</option>
                  <option>Grade 2</option>
                  <option>Grade 3</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="room"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                >
                  Room
                </label>
                <select
                  id="room"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
                >
                  <option>All</option>
                  <option>A</option>
                  <option>B</option>
                  <option>C</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
                >
                  <option>All</option>
                  <option>Math</option>
                  <option>English</option>
                  <option>Science</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="query"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                >
                  Search name
                </label>
                <input
                  id="query"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a student name"
                  className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setLevel("All");
                    setRoom("All");
                    setSubject("All");
                    setQuery("");
                  }}
                  className="inline-flex items-center justify-center rounded-md border border-gray-300 px-3 py-2 text-sm bg-white dark:bg-gray-900"
                >
                  Clear
                </button>

                <div className="flex-1" />

                <button
                  type="button"
                  onClick={() => {
                    /* triggers useMemo automatically */
                  }}
                  className="inline-flex items-center justify-center rounded-md bg-indigo-600 text-white px-3 py-2 text-sm hover:bg-indigo-700"
                >
                  Search
                </button>
              </div>
            </form>
          </section>

          {/* Results panel */}
          <section aria-labelledby="results-heading" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2
                id="results-heading"
                className="text-lg font-medium text-gray-800 dark:text-gray-100"
              >
                Results
              </h2>
              <div className="flex items-center gap-3">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {results.length} found
                </div>
                <button
                  type="button"
                  onClick={submitAttendance}
                  className="w-14 inline-flex items-center justify-center gap-2 rounded-md bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 text-sm"
                >
                  ส่ง
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {results.length === 0 ? (
                <div className="col-span-full text-sm text-gray-500 dark:text-gray-400">
                  No students match the search.
                </div>
              ) : (
                results.map((s) => {
                  const state = attendance[s.id] || { status: "", late: false };
                  return (
                    <article
                      key={s.id}
                      className="rounded-lg bg-white dark:bg-gray-800 p-4 shadow-sm"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                            {s.name}
                          </h3>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          เลขที่ {s.seatNumber}
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2 flex-wrap">
                          {STATUS_OPTIONS.map((opt) => {
                            const selected = state.status === opt.key;
                            return (
                              <label
                                key={opt.key}
                                className={`inline-flex items-center cursor-pointer rounded-full text-sm px-3 py-1.5 border ${selected ? "border-transparent" : "border-gray-200 dark:border-gray-700"} ${selected ? opt.color : "bg-white dark:bg-gray-900"} ${selected && opt.color.includes("text-black") ? "text-black" : "text-white"}`}
                              >
                                <input
                                  type="radio"
                                  name={`status-${s.id}`}
                                  value={opt.key}
                                  checked={selected}
                                  onChange={() =>
                                    setStudentStatus(s.id, opt.key)
                                  }
                                  className="sr-only"
                                />
                                <span
                                  className={`pointer-events-none ${selected ? "font-medium text-white" : "text-gray-700 dark:text-gray-200"}`}
                                >
                                  {opt.label}
                                </span>
                              </label>
                            );
                          })}
                        </div>

                        <label className="inline-flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={state.late}
                            onChange={() => toggleStudentLate(s.id)}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-200">
                            สาย
                          </span>
                        </label>
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
