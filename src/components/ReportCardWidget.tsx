'use client'

import { useState } from 'react'
import { Plus, Trash2, Download, Printer, ShieldAlert, Sparkles } from 'lucide-react'

interface SubjectRow {
  name: string
  obtained: number
  total: number
}

export default function ReportCardWidget() {
  const [schoolName, setSchoolName] = useState('Greenwood International School')
  const [studentName, setStudentName] = useState('Alexander Vance')
  const [rollNo, setRollNo] = useState('2026-A12')
  const [className, setClassName] = useState('Grade 10 - A')
  const [academicYear, setAcademicYear] = useState('2025-2026')
  const [remarks, setRemarks] = useState('Outstanding performance in science and mathematics.')
  const [template, setTemplate] = useState<'classic-blue' | 'modern-green' | 'royal-gold'>('classic-blue')

  const [subjects, setSubjects] = useState<SubjectRow[]>([
    { name: 'Mathematics', obtained: 92, total: 100 },
    { name: 'English Literature', obtained: 85, total: 100 },
    { name: 'Science & Tech', obtained: 95, total: 100 },
    { name: 'Social Studies', obtained: 78, total: 100 },
    { name: 'Computer Science', obtained: 98, total: 100 },
  ])

  const [showModal, setShowModal] = useState(false)

  const addSubject = () => {
    setSubjects([...subjects, { name: '', obtained: 0, total: 100 }])
  }

  const removeSubject = (index: number) => {
    if (subjects.length > 1) {
      setSubjects(subjects.filter((_, i) => i !== index))
    }
  }

  const updateSubject = (index: number, field: keyof SubjectRow, value: string | number) => {
    const updated = [...subjects]
    if (field === 'name') {
      updated[index].name = value as string
    } else {
      updated[index][field] = Number(value)
    }
    setSubjects(updated)
  }

  // Calculate scores
  const totalObtained = subjects.reduce((sum, s) => sum + s.obtained, 0)
  const totalMax = subjects.reduce((sum, s) => sum + s.total, 0)
  const percentage = totalMax > 0 ? parseFloat(((totalObtained / totalMax) * 100).toFixed(1)) : 0

  const getGrade = (pct: number) => {
    if (pct >= 90) return 'A+'
    if (pct >= 80) return 'A'
    if (pct >= 70) return 'B'
    if (pct >= 60) return 'C'
    if (pct >= 50) return 'D'
    return 'F'
  }

  const grade = getGrade(percentage)

  const templateStyles = {
    'classic-blue': {
      header: 'bg-indigo-900 text-white',
      border: 'border-indigo-900',
      accentText: 'text-indigo-950',
      banner: 'bg-indigo-50 border-indigo-200 text-indigo-950',
    },
    'modern-green': {
      header: 'bg-emerald-800 text-white',
      border: 'border-emerald-800',
      accentText: 'text-emerald-950',
      banner: 'bg-emerald-50 border-emerald-200 text-emerald-950',
    },
    'royal-gold': {
      header: 'bg-amber-800 text-white',
      border: 'border-amber-800',
      accentText: 'text-amber-950',
      banner: 'bg-amber-50 border-amber-200 text-amber-950',
    },
  }

  const currentStyle = templateStyles[template]

  return (
    <div className="w-full bg-zinc-50 border border-zinc-200 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl shadow-zinc-100">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* INPUTS COLUMN */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-indigo-600 fill-indigo-100" />
              Live Marksheet Generator
            </h3>
            <p className="text-sm text-zinc-500 mt-1">
              Edit the fields below to dynamically update the PDF report card preview.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 mb-1.5">School Name</label>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="w-full h-10 px-3 text-sm border border-zinc-200 rounded-lg focus:border-indigo-500 focus:outline-none bg-white text-zinc-800"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 mb-1.5">Student Name</label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full h-10 px-3 text-sm border border-zinc-200 rounded-lg focus:border-indigo-500 focus:outline-none bg-white text-zinc-800"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 mb-1.5">Roll Number</label>
                <input
                  type="text"
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
                  className="w-full h-10 px-3 text-sm border border-zinc-200 rounded-lg focus:border-indigo-500 focus:outline-none bg-white text-zinc-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 mb-1.5">Class / Grade</label>
                <input
                  type="text"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  className="w-full h-10 px-3 text-sm border border-zinc-200 rounded-lg focus:border-indigo-500 focus:outline-none bg-white text-zinc-800"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 mb-1.5">Academic Year</label>
                <input
                  type="text"
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  className="w-full h-10 px-3 text-sm border border-zinc-200 rounded-lg focus:border-indigo-500 focus:outline-none bg-white text-zinc-800"
                />
              </div>
            </div>
          </div>

          {/* Subjects table input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600">Subjects & Grades</label>
              <button
                onClick={addSubject}
                className="inline-flex h-7 items-center justify-center gap-1.5 rounded-full border border-indigo-200 hover:border-indigo-300 bg-indigo-50 text-indigo-700 hover:text-indigo-800 px-3 text-xs font-bold transition-all"
              >
                <Plus className="h-3 w-3" /> Add Subject
              </button>
            </div>

            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
              {subjects.map((subj, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={subj.name}
                    placeholder="Subject Name"
                    onChange={(e) => updateSubject(index, 'name', e.target.value)}
                    className="flex-1 h-9 px-3 text-sm border border-zinc-200 rounded-lg focus:border-indigo-500 focus:outline-none bg-white text-zinc-800"
                  />
                  <input
                    type="number"
                    value={subj.obtained || ''}
                    placeholder="Marks"
                    onChange={(e) => updateSubject(index, 'obtained', e.target.value)}
                    className="w-16 h-9 px-2 text-center text-sm border border-zinc-200 rounded-lg focus:border-indigo-500 focus:outline-none bg-white text-zinc-800"
                    min="0"
                    max={subj.total}
                  />
                  <span className="text-zinc-400 text-sm">/</span>
                  <input
                    type="number"
                    value={subj.total || ''}
                    placeholder="Total"
                    onChange={(e) => updateSubject(index, 'total', e.target.value)}
                    className="w-16 h-9 px-2 text-center text-sm border border-zinc-200 rounded-lg focus:border-indigo-500 focus:outline-none bg-white text-zinc-800"
                    min="1"
                  />
                  <button
                    onClick={() => removeSubject(index)}
                    disabled={subjects.length === 1}
                    className="h-9 w-9 flex items-center justify-center text-zinc-400 hover:text-red-500 disabled:opacity-30 disabled:hover:text-zinc-400 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 mb-1.5">Remarks / Feedback</label>
            <input
              type="text"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full h-10 px-3 text-sm border border-zinc-200 rounded-lg focus:border-indigo-500 focus:outline-none bg-white text-zinc-800"
            />
          </div>

          {/* Style selection */}
          <div className="space-y-2 border-t border-zinc-200 pt-4">
            <span className="block text-xs font-semibold uppercase tracking-wider text-zinc-600">Select Template Theme</span>
            <div className="flex gap-3">
              <button
                onClick={() => setTemplate('classic-blue')}
                className={`flex-1 h-9 rounded-lg border text-xs font-bold transition-all ${
                  template === 'classic-blue'
                    ? 'border-indigo-800 bg-indigo-50 text-indigo-800'
                    : 'border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50'
                }`}
              >
                Classic Blue
              </button>
              <button
                onClick={() => setTemplate('modern-green')}
                className={`flex-1 h-9 rounded-lg border text-xs font-bold transition-all ${
                  template === 'modern-green'
                    ? 'border-emerald-800 bg-emerald-50 text-emerald-800'
                    : 'border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50'
                }`}
              >
                Modern Green
              </button>
              <button
                onClick={() => setTemplate('royal-gold')}
                className={`flex-1 h-9 rounded-lg border text-xs font-bold transition-all ${
                  template === 'royal-gold'
                    ? 'border-amber-800 bg-amber-50 text-amber-800'
                    : 'border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50'
                }`}
              >
                Royal Gold
              </button>
            </div>
          </div>
        </div>

        {/* PREVIEW COLUMN */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="w-full border border-zinc-200 rounded-2xl bg-white shadow-sm overflow-hidden flex flex-col">
            {/* Header banner */}
            <div className={`p-5 text-center ${currentStyle.header}`}>
              <h4 className="font-serif font-bold text-lg tracking-wider uppercase">{schoolName || 'Institution Name'}</h4>
              <p className="text-[10px] uppercase tracking-widest opacity-80 mt-1">Official Progress Report & Marksheet</p>
            </div>

            {/* Student metadata */}
            <div className="p-4 grid grid-cols-2 gap-y-2 border-b border-zinc-100 text-xs text-zinc-700 bg-zinc-50/50">
              <div>
                <span className="font-semibold text-zinc-400">Student:</span> {studentName || 'Student Name'}
              </div>
              <div>
                <span className="font-semibold text-zinc-400">Roll Number:</span> {rollNo || 'Roll No'}
              </div>
              <div>
                <span className="font-semibold text-zinc-400">Class/Course:</span> {className || 'Class'}
              </div>
              <div>
                <span className="font-semibold text-zinc-400">Academic Year:</span> {academicYear || 'Year'}
              </div>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-zinc-100 text-zinc-700 font-bold border-b border-zinc-200">
                    <th className="py-2.5 px-4">Subject</th>
                    <th className="py-2.5 px-4 text-center">Marks Obtained</th>
                    <th className="py-2.5 px-4 text-center">Maximum Marks</th>
                    <th className="py-2.5 px-4 text-center">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 text-zinc-800">
                  {subjects.map((subj, index) => {
                    const pct = subj.total > 0 ? (subj.obtained / subj.total) * 100 : 0
                    return (
                      <tr key={index} className="hover:bg-zinc-50/30">
                        <td className="py-2.5 px-4 font-medium">{subj.name || 'Unnamed Subject'}</td>
                        <td className="py-2.5 px-4 text-center">{subj.obtained}</td>
                        <td className="py-2.5 px-4 text-center">{subj.total}</td>
                        <td className="py-2.5 px-4 text-center font-semibold text-zinc-900">{getGrade(pct)}</td>
                      </tr>
                    )
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-zinc-50/80 font-bold border-t-2 border-zinc-200 text-zinc-900">
                    <td className="py-3 px-4">Cumulative Total</td>
                    <td className="py-3 px-4 text-center">{totalObtained}</td>
                    <td className="py-3 px-4 text-center">{totalMax}</td>
                    <td className="py-3 px-4 text-center text-indigo-700 font-bold">{grade} ({percentage}%)</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Comments Footer */}
            <div className="p-4 border-t border-zinc-100 text-[11px] text-zinc-500 space-y-3 bg-zinc-50/30">
              <div>
                <span className="font-semibold text-zinc-700 block mb-0.5">Principal Comments & Feedback:</span>
                <p className="italic">"{remarks || 'No remarks provided'}"</p>
              </div>
              <div className="flex justify-between items-end pt-4">
                <div className="text-center w-24 border-t border-zinc-300 pt-1">
                  Class Teacher
                </div>
                <div className="text-center w-24 border-t border-zinc-300 pt-1">
                  Principal Seal
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-4 flex gap-4">
            <button
              onClick={() => setShowModal(true)}
              className="flex-1 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-500 shadow-md hover:shadow-lg active:scale-[0.98] transition-all text-sm"
            >
              <Download className="h-4 w-4" /> Download PDF Report
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex h-11 w-12 items-center justify-center rounded-xl border border-zinc-200 hover:border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-600 active:scale-[0.98] transition-all"
              title="Print Marksheet"
            >
              <Printer className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* LEAD MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-zinc-100 flex flex-col relative animate-scaleUp">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-amber-50 text-amber-600 border border-amber-100 mx-auto mb-4">
              <ShieldAlert className="h-6 w-6" />
            </div>
            
            <h4 className="text-lg font-bold text-zinc-950 text-center">Unlock Full PDF Generation</h4>
            <p className="text-sm text-zinc-600 text-center mt-2 leading-relaxed">
              To export beautiful PDF marksheets, customize layout designs, upload school signatures, or generate reports in bulk for your entire class, register on our main SaaS engine.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <a
                href="https://jids.in/register?src=schoolreportcard-lead-modal"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-500 text-sm shadow-md hover:shadow-lg hover:shadow-indigo-600/10 active:scale-[0.98] transition-all"
              >
                Register Free on JIDS
              </a>
              <button
                onClick={() => setShowModal(false)}
                className="inline-flex h-11 items-center justify-center rounded-xl border border-zinc-200 hover:bg-zinc-50 text-zinc-600 font-semibold text-sm transition-all"
              >
                Go Back & Keep Editing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
