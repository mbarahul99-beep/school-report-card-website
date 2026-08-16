'use client'

import { useState, useRef, useEffect } from 'react'
import { Plus, Trash2, Download, Printer, ShieldAlert, Sparkles, Upload, Image as ImageIcon, ArrowLeft } from 'lucide-react'

interface SubjectRow {
  name: string
  t1_pt: number    // Periodic Test (10)
  t1_nb: number    // Notebook (5)
  t1_se: number    // Subject Enrichment (5)
  t1_exam: number  // Mid-Term (80)
  t2_pt: number    // Periodic Test (10)
  t2_nb: number    // Notebook (5)
  t2_se: number    // Subject Enrichment (5)
  t2_exam: number  // Annual (80)
}

interface CoScholasticRow {
  name: string
  t1_grade: string
  t2_grade: string
}

export default function ReportCardWidget() {
  // Header details
  const [schoolName, setSchoolName] = useState('GAUTAM BUDDHA MISSION SCHOOL')
  const [affiliation, setAffiliation] = useState('AFFILIATED TO CBSE BOARD (AFFILIATION NO. 123456)')
  const [address, setAddress] = useState('Pocket 2, Mayur Vihar Phase 1, New Delhi 110091, India')
  const [contactInfo, setContactInfo] = useState('Helpline: +91 8000436766 | Email: info@schoolreportcard.in | Website: www.schoolreportcard.in')
  const [reportTitle, setReportTitle] = useState('ANNUAL EXAMINATION REPORT CARD')
  const [session, setSession] = useState('SESSION 2022-2023')

  // Student metadata
  const [studentName, setStudentName] = useState('MEERA MALHOTRA')
  const [className, setClassName] = useState('3RD')
  const [section, setSection] = useState('A')
  const [rollNo, setRollNo] = useState('10')
  const [admissionNo, setAdmissionNo] = useState('180525')
  const [dob, setDob] = useState('04-10-2013')
  const [height, setHeight] = useState('122 CM')
  const [weight, setWeight] = useState('40 KG')
  const [fatherName, setFatherName] = useState('MR. VIKRANT MALHOTRA')
  const [motherName, setMotherName] = useState('MRS. RIDHI MALHOTRA')
  
  // Custom uploads (pre-populated with generated default assets from copy)
  const [logoUrl, setLogoUrl] = useState<string | null>('/school-logo.jpg')
  const [studentPhotoUrl, setStudentPhotoUrl] = useState<string | null>('/student-photo.jpg')
  
  const logoInputRef = useRef<HTMLInputElement>(null)
  const photoInputRef = useRef<HTMLInputElement>(null)

  // Scholastic subjects data (A4 optimized layout constraints)
  const [subjects, setSubjects] = useState<SubjectRow[]>([
    { name: 'English', t1_pt: 10, t1_nb: 4, t1_se: 4, t1_exam: 76, t2_pt: 8, t2_nb: 4, t2_se: 5, t2_exam: 71 },
    { name: 'Hindi', t1_pt: 8, t1_nb: 4, t1_se: 5, t1_exam: 68, t2_pt: 9, t2_nb: 5, t2_se: 4, t2_exam: 78 },
    { name: 'Punjabi', t1_pt: 10, t1_nb: 5, t1_se: 5, t1_exam: 75, t2_pt: 9, t2_nb: 3, t2_se: 5, t2_exam: 75 },
    { name: 'Mathematics', t1_pt: 7, t1_nb: 4, t1_se: 3, t1_exam: 58, t2_pt: 10, t2_nb: 4, t2_se: 5, t2_exam: 80 },
    { name: 'Science', t1_pt: 9, t1_nb: 4, t1_se: 5, t1_exam: 49, t2_pt: 7, t2_nb: 3, t2_se: 3, t2_exam: 67 },
    { name: 'Social Science', t1_pt: 9, t1_nb: 3, t1_se: 4, t1_exam: 66, t2_pt: 6, t2_nb: 5, t2_se: 5, t2_exam: 59 }
  ])

  // Co-scholastic data
  const [coScholastic, setCoScholastic] = useState<CoScholasticRow[]>([
    { name: 'General Knowledge', t1_grade: 'A', t2_grade: 'A' },
    { name: 'Computer', t1_grade: 'C', t2_grade: 'A' },
    { name: 'Physical Education', t1_grade: 'A', t2_grade: 'B' }
  ])

  // Extracurricular data
  const [extracurricular, setExtracurricular] = useState<CoScholasticRow[]>([
    { name: 'Neatness', t1_grade: 'A', t2_grade: 'A' },
    { name: 'Speaking and Listening', t1_grade: 'A', t2_grade: 'A' },
    { name: 'Music/Dance', t1_grade: 'B', t2_grade: 'A' }
  ])

  // Attendance, remarks, and promotion status
  const [attendance, setAttendance] = useState('99/105')
  const [remarks, setRemarks] = useState("Meera's academic performance is very good. Meera is a friendly student, shows respect for teachers and peers, and works very well within a team.")
  const [promotionText, setPromotionText] = useState('CONGRATULATIONS! YOU ARE PROMOTED TO 4TH')

  // UI state for dynamic scaling
  const [scale, setScale] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)

  // Dynamic A4 scaling calculation
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const parentWidth = containerRef.current.clientWidth
        // Scale down if parent is narrower than A4 width (794px)
        const newScale = Math.min(parentWidth / 794, 1)
        setScale(newScale)
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Lead modal state
  const [showModal, setShowModal] = useState(false)
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)

  // Handle Logo Upload
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle Student Photo Upload
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setStudentPhotoUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Add / Remove Subject
  const addSubject = () => {
    setSubjects([...subjects, { name: 'New Subject', t1_pt: 0, t1_nb: 0, t1_se: 0, t1_exam: 0, t2_pt: 0, t2_nb: 0, t2_se: 0, t2_exam: 0 }])
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

  // Edit Co-Scholastic & Extracurricular
  const updateCoScholastic = (index: number, isT1: boolean, val: string) => {
    const updated = [...coScholastic]
    if (isT1) updated[index].t1_grade = val
    else updated[index].t2_grade = val
    setCoScholastic(updated)
  }

  const updateExtracurricular = (index: number, isT1: boolean, val: string) => {
    const updated = [...extracurricular]
    if (isT1) updated[index].t1_grade = val
    else updated[index].t2_grade = val
    setExtracurricular(updated)
  }

  // Grading logic
  const getGrade = (score: number) => {
    if (score >= 91) return 'A1'
    if (score >= 81) return 'A2'
    if (score >= 71) return 'B1'
    if (score >= 61) return 'B2'
    if (score >= 51) return 'C1'
    if (score >= 41) return 'C2'
    if (score >= 33) return 'D'
    return 'E'
  }

  // Calculate totals
  const getT1Total = (row: SubjectRow) => row.t1_pt + row.t1_nb + row.t1_se + row.t1_exam
  const getT2Total = (row: SubjectRow) => row.t2_pt + row.t2_nb + row.t2_se + row.t2_exam
  const getRowOverallTotal = (row: SubjectRow) => getT1Total(row) + getT2Total(row)

  // Accumulate scores for entire card
  const totalT1Obtained = subjects.reduce((sum, row) => sum + getT1Total(row), 0)
  const totalT2Obtained = subjects.reduce((sum, row) => sum + getT2Total(row), 0)
  const totalOverallObtained = totalT1Obtained + totalT2Obtained
  const maxPossibleOverall = subjects.length * 200
  const maxPossibleTerm = subjects.length * 100

  const t1Percentage = maxPossibleTerm > 0 ? parseFloat(((totalT1Obtained / maxPossibleTerm) * 100).toFixed(1)) : 0
  const t2Percentage = maxPossibleTerm > 0 ? parseFloat(((totalT2Obtained / maxPossibleTerm) * 100).toFixed(1)) : 0
  const overallPercentage = maxPossibleOverall > 0 ? parseFloat(((totalOverallObtained / maxPossibleOverall) * 100).toFixed(2)) : 0
  const overallGrade = getGrade(overallPercentage)

  // Robust client-side PDF generator using html2canvas-pro to support lab()/oklch() color spaces
  const triggerPdfDownload = async () => {
    setIsGeneratingPdf(true)
    const element = document.getElementById('report-card-print-area')
    if (!element) {
      setIsGeneratingPdf(false)
      return
    }

    // Capture original style states for restoration in finally block
    const originalTransform = element.style.transform
    const originalWidth = element.style.width
    const originalHeight = element.style.height
    const originalPosition = element.style.position
    const originalTop = element.style.top
    const originalLeft = element.style.left
    const originalZIndex = element.style.zIndex
    const originalMargin = element.style.margin

    try {
      // 1. Dynamically import html2canvas-pro and jspdf to avoid server compiling dependencies
      const html2canvas = (await import('html2canvas-pro')).default
      const { jsPDF } = await import('jspdf')

      // 2. Temporarily reset scaling transforms and place in fixed viewport to prevent parent clipping
      element.style.transform = 'none'
      element.style.width = '794px'
      element.style.height = '1123px'
      element.style.position = 'fixed'
      element.style.top = '0'
      element.style.left = '0'
      element.style.zIndex = '99999'
      element.style.margin = '0'

      // 3. Render element to high-res canvas
      const canvas = await html2canvas(element, {
        scale: 2, // 2x density for crystal clear fonts/logos
        useCORS: true,
        logging: false,
        width: 794,
        height: 1123,
        backgroundColor: '#ffffff'
      })

      // Convert canvas to image bytes
      const imgData = canvas.toDataURL('image/jpeg', 1.0)

      // 4. Generate standard A4 PDF document
      const pdf = new jsPDF({
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait'
      })

      // A4 is 210mm x 297mm
      pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297)
      
      // Save PDF locally on the device
      pdf.save(`${studentName.replace(/\s+/g, '_')}_Report_Card.pdf`)

      // Open PDF automatically in a new window/tab
      try {
        const pdfBlob = pdf.output('blob')
        const blobUrl = URL.createObjectURL(pdfBlob)
        window.open(blobUrl, '_blank')
      } catch (openErr) {
        console.error('Failed to open PDF in new tab:', openErr)
        // Some mobile browsers block window.open, but the file download is already triggered.
      }
    } catch (err) {
      console.error('Failed to generate PDF:', err)
      alert('Could not download PDF. Please try printing or use JIDS cloud tools.')
    } finally {
      // ALWAYS restore styling, even if rendering fails!
      element.style.transform = originalTransform
      element.style.width = originalWidth
      element.style.height = originalHeight
      element.style.position = originalPosition
      element.style.top = originalTop
      element.style.left = originalLeft
      element.style.zIndex = originalZIndex
      element.style.margin = originalMargin
      
      setIsGeneratingPdf(false)
      setShowModal(false)
    }
  }

  return (
    <div className="w-full bg-zinc-50 border border-zinc-200 rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl shadow-zinc-100 max-w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* INPUT CONTROLS PANEL (LEFT COLUMN) */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6 max-h-[1150px] overflow-y-auto pr-2">
          <div>
            <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-red-600 fill-red-100" />
              CBSE Report Card Customizer
            </h3>
            {/* Free Unlimited Notice */}
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold p-2.5 rounded-lg mt-2 flex items-start gap-1.5 leading-snug">
              <span className="inline-block bg-emerald-500 text-white font-extrabold text-[9px] px-1.5 py-0.5 rounded uppercase mt-0.5 animate-pulse">Free</span>
              <span>This browser builder is **completely free** for unlimited individual builds & PDF downloads.</span>
            </div>
          </div>

          {/* Logo & Student Photo uploads */}
          <div className="bg-white border border-zinc-200 rounded-xl p-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700">Media Uploads</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-semibold text-zinc-500 mb-1">School Logo</label>
                <input
                  type="file"
                  ref={logoInputRef}
                  onChange={handleLogoChange}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  onClick={() => logoInputRef.current?.click()}
                  className="w-full h-24 border-2 border-dashed border-zinc-200 hover:border-red-500 rounded-lg flex flex-col items-center justify-center gap-1.5 text-xs text-zinc-500 hover:text-red-600 bg-zinc-50 hover:bg-red-50/20 transition-all overflow-hidden"
                >
                  {logoUrl ? (
                    <img src={logoUrl} alt="Logo" className="max-h-20 object-contain p-1" />
                  ) : (
                    <>
                      <Upload className="h-4 w-4" />
                      <span>Upload Logo</span>
                    </>
                  )}
                </button>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-zinc-500 mb-1">Student Photo</label>
                <input
                  type="file"
                  ref={photoInputRef}
                  onChange={handlePhotoChange}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  onClick={() => photoInputRef.current?.click()}
                  className="w-full h-24 border-2 border-dashed border-zinc-200 hover:border-red-500 rounded-lg flex flex-col items-center justify-center gap-1.5 text-xs text-zinc-500 hover:text-red-600 bg-zinc-50 hover:bg-red-50/20 transition-all overflow-hidden"
                >
                  {studentPhotoUrl ? (
                    <img src={studentPhotoUrl} alt="Student" className="max-h-20 object-contain p-1 rounded" />
                  ) : (
                    <>
                      <ImageIcon className="h-4 w-4" />
                      <span>Upload Photo</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* School details inputs */}
          <div className="bg-white border border-zinc-200 rounded-xl p-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700">School Header details</h4>
            <input
              type="text"
              value={schoolName}
              placeholder="School Name"
              onChange={(e) => setSchoolName(e.target.value)}
              className="w-full h-9 px-3 text-xs border border-zinc-200 rounded-lg bg-zinc-50 text-zinc-800 focus:outline-none focus:border-red-500"
            />
            <input
              type="text"
              value={affiliation}
              placeholder="Affiliation Details"
              onChange={(e) => setAffiliation(e.target.value)}
              className="w-full h-9 px-3 text-xs border border-zinc-200 rounded-lg bg-zinc-50 text-zinc-800 focus:outline-none focus:border-red-500"
            />
            <input
              type="text"
              value={address}
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
              className="w-full h-9 px-3 text-xs border border-zinc-200 rounded-lg bg-zinc-50 text-zinc-800 focus:outline-none focus:border-red-500"
            />
            <input
              type="text"
              value={contactInfo}
              placeholder="Contacts & Web info"
              onChange={(e) => setContactInfo(e.target.value)}
              className="w-full h-9 px-3 text-xs border border-zinc-200 rounded-lg bg-zinc-50 text-zinc-800 focus:outline-none focus:border-red-500"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={reportTitle}
                onChange={(e) => setReportTitle(e.target.value)}
                className="w-full h-9 px-3 text-xs border border-zinc-200 rounded-lg bg-zinc-50 text-zinc-800 focus:outline-none focus:border-red-500"
              />
              <input
                type="text"
                value={session}
                onChange={(e) => setSession(e.target.value)}
                className="w-full h-9 px-3 text-xs border border-zinc-200 rounded-lg bg-zinc-50 text-zinc-800 focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          {/* Student details inputs */}
          <div className="bg-white border border-zinc-200 rounded-xl p-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700">Student Profile</h4>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={studentName}
                placeholder="Student Name"
                onChange={(e) => setStudentName(e.target.value)}
                className="h-9 px-2 text-xs border border-zinc-200 rounded-lg bg-zinc-50 text-zinc-800 focus:outline-none focus:border-red-500"
              />
              <input
                type="text"
                value={className}
                placeholder="Class"
                onChange={(e) => setClassName(e.target.value)}
                className="h-9 px-2 text-xs border border-zinc-200 rounded-lg bg-zinc-50 text-zinc-800 focus:outline-none focus:border-red-500"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                value={section}
                placeholder="Sec"
                onChange={(e) => setSection(e.target.value)}
                className="h-9 px-2 text-xs border border-zinc-200 rounded-lg bg-zinc-50 text-zinc-800 focus:outline-none focus:border-red-500"
              />
              <input
                type="text"
                value={rollNo}
                placeholder="Roll"
                onChange={(e) => setRollNo(e.target.value)}
                className="h-9 px-2 text-xs border border-zinc-200 rounded-lg bg-zinc-50 text-zinc-800 focus:outline-none focus:border-red-500"
              />
              <input
                type="text"
                value={admissionNo}
                placeholder="Adm No"
                onChange={(e) => setAdmissionNo(e.target.value)}
                className="h-9 px-2 text-xs border border-zinc-200 rounded-lg bg-zinc-50 text-zinc-800 focus:outline-none focus:border-red-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={fatherName}
                placeholder="Father's Name"
                onChange={(e) => setFatherName(e.target.value)}
                className="h-9 px-2 text-xs border border-zinc-200 rounded-lg bg-zinc-50 text-zinc-800 focus:outline-none focus:border-red-500"
              />
              <input
                type="text"
                value={motherName}
                placeholder="Mother's Name"
                onChange={(e) => setMotherName(e.target.value)}
                className="h-9 px-2 text-xs border border-zinc-200 rounded-lg bg-zinc-50 text-zinc-800 focus:outline-none focus:border-red-500"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                value={dob}
                placeholder="D.O.B."
                onChange={(e) => setDob(e.target.value)}
                className="h-9 px-2 text-xs border border-zinc-200 rounded-lg bg-zinc-50 text-zinc-800 focus:outline-none focus:border-red-500"
              />
              <input
                type="text"
                value={height}
                placeholder="Height"
                onChange={(e) => setHeight(e.target.value)}
                className="h-9 px-2 text-xs border border-zinc-200 rounded-lg bg-zinc-50 text-zinc-800 focus:outline-none focus:border-red-500"
              />
              <input
                type="text"
                value={weight}
                placeholder="Weight"
                onChange={(e) => setWeight(e.target.value)}
                className="h-9 px-2 text-xs border border-zinc-200 rounded-lg bg-zinc-50 text-zinc-800 focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          {/* Marks input areas */}
          <div className="bg-white border border-zinc-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700">Scholastic Performance</h4>
              <button
                onClick={addSubject}
                className="h-6 inline-flex items-center justify-center gap-1 rounded-full border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 px-2.5 text-[10px] font-bold transition-all"
              >
                <Plus className="h-3 w-3" /> Add Subject
              </button>
            </div>

            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
              {subjects.map((sub, index) => (
                <div key={index} className="border border-zinc-100 rounded-xl p-3 bg-zinc-50/50 space-y-2 relative">
                  <button
                    onClick={() => removeSubject(index)}
                    disabled={subjects.length === 1}
                    className="absolute top-2 right-2 h-6 w-6 flex items-center justify-center text-zinc-400 hover:text-red-600 disabled:opacity-30 disabled:hover:text-zinc-400"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>

                  <div className="w-[80%]">
                    <input
                      type="text"
                      value={sub.name}
                      onChange={(e) => updateSubject(index, 'name', e.target.value)}
                      className="w-full h-8 px-2 font-bold text-xs border border-zinc-200 rounded-md bg-white text-zinc-800 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-3.5 text-xs border-t border-zinc-100 pt-2.5">
                    {/* Term I Marks Stacked */}
                    <div className="space-y-1">
                      <span className="block font-bold text-red-800 tracking-wide">Term I Marks</span>
                      <div className="flex flex-wrap gap-2.5 items-center">
                        <div className="flex flex-col items-center gap-0.5">
                          <span className="text-[8px] font-semibold text-zinc-400">PT (10)</span>
                          <input
                            type="number"
                            value={sub.t1_pt ?? ''}
                            onChange={(e) => updateSubject(index, 't1_pt', e.target.value)}
                            className="w-10 h-8 text-center border border-zinc-200 rounded-lg bg-white text-zinc-800 font-bold focus:outline-none focus:border-red-500"
                            max="10"
                          />
                        </div>
                        <div className="flex flex-col items-center gap-0.5">
                          <span className="text-[8px] font-semibold text-zinc-400">NB (5)</span>
                          <input
                            type="number"
                            value={sub.t1_nb ?? ''}
                            onChange={(e) => updateSubject(index, 't1_nb', e.target.value)}
                            className="w-10 h-8 text-center border border-zinc-200 rounded-lg bg-white text-zinc-800 font-bold focus:outline-none focus:border-red-500"
                            max="5"
                          />
                        </div>
                        <div className="flex flex-col items-center gap-0.5">
                          <span className="text-[8px] font-semibold text-zinc-400">SE (5)</span>
                          <input
                            type="number"
                            value={sub.t1_se ?? ''}
                            onChange={(e) => updateSubject(index, 't1_se', e.target.value)}
                            className="w-10 h-8 text-center border border-zinc-200 rounded-lg bg-white text-zinc-800 font-bold focus:outline-none focus:border-red-500"
                            max="5"
                          />
                        </div>
                        <div className="flex flex-col items-center gap-0.5">
                          <span className="text-[8px] font-semibold text-zinc-400">Exam (80)</span>
                          <input
                            type="number"
                            value={sub.t1_exam ?? ''}
                            onChange={(e) => updateSubject(index, 't1_exam', e.target.value)}
                            className="w-12 h-8 text-center border border-zinc-200 rounded-lg bg-white text-zinc-800 font-bold focus:outline-none focus:border-red-500"
                            max="80"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Term II Marks Stacked */}
                    <div className="space-y-1 border-t border-dashed border-zinc-150 pt-2">
                      <span className="block font-bold text-red-800 tracking-wide">Term II Marks</span>
                      <div className="flex flex-wrap gap-2.5 items-center">
                        <div className="flex flex-col items-center gap-0.5">
                          <span className="text-[8px] font-semibold text-zinc-400">PT (10)</span>
                          <input
                            type="number"
                            value={sub.t2_pt ?? ''}
                            onChange={(e) => updateSubject(index, 't2_pt', e.target.value)}
                            className="w-10 h-8 text-center border border-zinc-200 rounded-lg bg-white text-zinc-800 font-bold focus:outline-none focus:border-red-500"
                            max="10"
                          />
                        </div>
                        <div className="flex flex-col items-center gap-0.5">
                          <span className="text-[8px] font-semibold text-zinc-400">NB (5)</span>
                          <input
                            type="number"
                            value={sub.t2_nb ?? ''}
                            onChange={(e) => updateSubject(index, 't2_nb', e.target.value)}
                            className="w-10 h-8 text-center border border-zinc-200 rounded-lg bg-white text-zinc-800 font-bold focus:outline-none focus:border-red-500"
                            max="5"
                          />
                        </div>
                        <div className="flex flex-col items-center gap-0.5">
                          <span className="text-[8px] font-semibold text-zinc-400">SE (5)</span>
                          <input
                            type="number"
                            value={sub.t2_se ?? ''}
                            onChange={(e) => updateSubject(index, 't2_se', e.target.value)}
                            className="w-10 h-8 text-center border border-zinc-200 rounded-lg bg-white text-zinc-800 font-bold focus:outline-none focus:border-red-500"
                            max="5"
                          />
                        </div>
                        <div className="flex flex-col items-center gap-0.5">
                          <span className="text-[8px] font-semibold text-zinc-400">Exam (80)</span>
                          <input
                            type="number"
                            value={sub.t2_exam ?? ''}
                            onChange={(e) => updateSubject(index, 't2_exam', e.target.value)}
                            className="w-12 h-8 text-center border border-zinc-200 rounded-lg bg-white text-zinc-800 font-bold focus:outline-none focus:border-red-500"
                            max="80"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Co-scholastic & extracurricular traits vertically stacked to prevent overlap */}
          <div className="bg-white border border-zinc-200 rounded-xl p-4 space-y-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">Personality Traits</h4>
              <div className="space-y-3">
                {coScholastic.map((row, idx) => (
                  <div key={idx} className="border-b border-zinc-100 pb-2.5 last:border-0 last:pb-0 space-y-1.5 text-xs">
                    <span className="block font-bold text-zinc-800">{row.name}</span>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <span className="text-zinc-400 font-semibold">Term 1:</span>
                        <input
                          type="text"
                          value={row.t1_grade}
                          onChange={(e) => updateCoScholastic(idx, true, e.target.value)}
                          className="w-8 h-7 text-center border border-zinc-200 rounded uppercase bg-zinc-50 font-bold text-zinc-950"
                          maxLength={1}
                        />
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <span className="text-zinc-400 font-semibold">Term 2:</span>
                        <input
                          type="text"
                          value={row.t2_grade}
                          onChange={(e) => updateCoScholastic(idx, false, e.target.value)}
                          className="w-8 h-7 text-center border border-zinc-200 rounded uppercase bg-zinc-50 font-bold text-zinc-950"
                          maxLength={1}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-zinc-200 pt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">Extracurricular Activities</h4>
              <div className="space-y-3">
                {extracurricular.map((row, idx) => (
                  <div key={idx} className="border-b border-zinc-100 pb-2.5 last:border-0 last:pb-0 space-y-1.5 text-xs">
                    <span className="block font-bold text-zinc-800">{row.name}</span>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <span className="text-zinc-400 font-semibold">Term 1:</span>
                        <input
                          type="text"
                          value={row.t1_grade}
                          onChange={(e) => updateExtracurricular(idx, true, e.target.value)}
                          className="w-8 h-7 text-center border border-zinc-200 rounded uppercase bg-zinc-50 font-bold text-zinc-950"
                          maxLength={1}
                        />
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <span className="text-zinc-400 font-semibold">Term 2:</span>
                        <input
                          type="text"
                          value={row.t2_grade}
                          onChange={(e) => updateExtracurricular(idx, false, e.target.value)}
                          className="w-8 h-7 text-center border border-zinc-200 rounded uppercase bg-zinc-50 font-bold text-zinc-950"
                          maxLength={1}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer details inputs */}
          <div className="bg-white border border-zinc-200 rounded-xl p-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700">Remarks & Status</h4>
            <div>
              <label className="block text-[10px] font-semibold text-zinc-400 mb-1">Attendance</label>
              <input
                type="text"
                value={attendance}
                onChange={(e) => setAttendance(e.target.value)}
                className="w-full h-9 px-3 text-xs border border-zinc-200 rounded-lg bg-zinc-50 text-zinc-800 focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-zinc-400 mb-1">Promotion Verdict</label>
              <input
                type="text"
                value={promotionText}
                onChange={(e) => setPromotionText(e.target.value)}
                className="w-full h-9 px-3 text-xs border border-zinc-200 rounded-lg bg-zinc-50 text-zinc-800 focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-zinc-400 mb-1">Teacher Remarks</label>
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="w-full h-16 p-2 text-xs border border-zinc-200 rounded-lg bg-zinc-50 text-zinc-800 focus:outline-none focus:border-red-500 resize-none"
              />
            </div>
          </div>
        </div>

        {/* HIGH FIDELITY MARKSHEET PREVIEW (RIGHT COLUMN) */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-start space-y-6 max-w-full">
          {/* Scroll instruction for mobile */}
          <div className="block lg:hidden text-center text-[10px] font-semibold text-zinc-400 bg-zinc-100 p-2 rounded-lg leading-relaxed select-none">
            ↔ Pinch-zoom or scroll horizontally to view full A4 sheet on mobile.
          </div>

          {/* Dynamic scaling outer container with extra padding (height + 25px) to prevent bottom cutting */}
          <div 
            ref={containerRef} 
            className="w-full flex justify-center overflow-hidden border border-zinc-200 rounded-2xl bg-zinc-100/50 p-4 shadow-inner"
            style={{ height: `${(1123 * scale) + 25}px` }}
          >
            <div
              id="report-card-print-area"
              style={{
                width: '794px',
                height: '1123px',
                transform: `scale(${scale})`,
                transformOrigin: 'top center',
              }}
              className="border-2 border-red-700 bg-white p-5 sm:p-6 shadow-sm flex flex-col justify-between rounded-xl font-sans text-[11px] text-zinc-900 leading-normal select-none shrink-0"
            >
              <div className="space-y-3.5">
                {/* Header Area */}
                <div className="relative flex flex-col items-center text-center border-b-2 border-red-700 pb-2.5">
                  {/* Logo block */}
                  <div className="absolute left-0 top-0 h-16 w-16 border border-red-700 rounded-full flex items-center justify-center overflow-hidden bg-white">
                    {logoUrl ? (
                      <img src={logoUrl} alt="School Logo" className="h-full w-full object-contain p-1" />
                    ) : (
                      <span className="text-red-700 font-bold text-xs uppercase tracking-tighter">Logo</span>
                    )}
                  </div>

                  {/* Title & info */}
                  <h2 className="font-sans font-black text-red-700 text-[19px] tracking-tight leading-none uppercase pr-6 pl-16">
                    {schoolName}
                  </h2>
                  <p className="text-[9px] font-bold text-zinc-700 tracking-wide mt-1 pr-6 pl-16">
                    {affiliation}
                  </p>
                  <p className="text-[8px] font-medium text-zinc-500 mt-0.5 pr-6 pl-16">
                    {address}
                  </p>
                  <p className="text-[7.5px] font-semibold text-zinc-400 mt-1 border-t border-zinc-200 pt-1 w-full">
                    {contactInfo}
                  </p>
                </div>

                {/* Block annual examination report card title */}
                <div className="flex flex-col items-center justify-center space-y-1.5">
                  <div className="bg-red-700 text-white font-black text-[12px] tracking-wider py-0.5 px-6 rounded uppercase font-sans text-center shadow-sm">
                    {reportTitle}
                  </div>
                  <div className="inline-flex border border-red-700 text-red-700 font-bold px-3 py-0.5 rounded-full text-[8.5px] tracking-widest uppercase">
                    {session}
                  </div>
                </div>

                {/* Student profiles & photo block */}
                <div className="grid grid-cols-12 gap-4 items-center bg-zinc-50/50 border border-zinc-150 rounded-xl p-3.5">
                  {/* Student details labels */}
                  <div className="col-span-9 grid grid-cols-2 gap-x-6 gap-y-2 font-medium text-zinc-800 text-[10.5px]">
                    <div className="flex">
                      <span className="w-24 font-bold text-zinc-500">Student's Name</span>
                      <span className="px-1">:</span>
                      <span className="flex-1 font-bold border-b border-dotted border-zinc-400 pb-0.5">{studentName}</span>
                    </div>
                    <div className="flex">
                      <span className="w-20 font-bold text-zinc-500">Class</span>
                      <span className="px-1">:</span>
                      <span className="flex-1 border-b border-dotted border-zinc-400 pb-0.5">{className}</span>
                    </div>

                    <div className="flex">
                      <span className="w-24 font-bold text-zinc-500">Father's Name</span>
                      <span className="px-1">:</span>
                      <span className="flex-1 border-b border-dotted border-zinc-400 pb-0.5">{fatherName}</span>
                    </div>
                    <div className="flex">
                      <span className="w-20 font-bold text-zinc-500">Section</span>
                      <span className="px-1">:</span>
                      <span className="flex-1 border-b border-dotted border-zinc-400 pb-0.5">{section}</span>
                    </div>

                    <div className="flex">
                      <span className="w-24 font-bold text-zinc-500">Mother's Name</span>
                      <span className="px-1">:</span>
                      <span className="flex-1 border-b border-dotted border-zinc-400 pb-0.5">{motherName}</span>
                    </div>
                    <div className="flex">
                      <span className="w-20 font-bold text-zinc-500">Roll No</span>
                      <span className="px-1">:</span>
                      <span className="flex-1 border-b border-dotted border-zinc-400 pb-0.5">{rollNo}</span>
                    </div>

                    <div className="flex">
                      <span className="w-24 font-bold text-zinc-500">Height</span>
                      <span className="px-1">:</span>
                      <span className="flex-1 border-b border-dotted border-zinc-400 pb-0.5">{height}</span>
                    </div>
                    <div className="flex">
                      <span className="w-20 font-bold text-zinc-500">Admission No.</span>
                      <span className="px-1">:</span>
                      <span className="flex-1 border-b border-dotted border-zinc-400 pb-0.5">{admissionNo}</span>
                    </div>

                    <div className="flex">
                      <span className="w-24 font-bold text-zinc-500">Weight</span>
                      <span className="px-1">:</span>
                      <span className="flex-1 border-b border-dotted border-zinc-400 pb-0.5">{weight}</span>
                    </div>
                    <div className="flex">
                      <span className="w-20 font-bold text-zinc-500">D.O.B.</span>
                      <span className="px-1">:</span>
                      <span className="flex-1 border-b border-dotted border-zinc-400 pb-0.5">{dob}</span>
                    </div>
                  </div>

                  {/* Photo Area */}
                  <div className="col-span-3 flex justify-end">
                    <div className="h-24 w-20 border border-zinc-300 bg-white rounded-lg overflow-hidden flex items-center justify-center p-1 shadow-sm">
                      {studentPhotoUrl ? (
                        <img src={studentPhotoUrl} alt="Student" className="h-full w-full object-cover rounded" />
                      ) : (
                        <div className="text-center text-zinc-400 p-2 flex flex-col items-center justify-center gap-1">
                          <ImageIcon className="h-6 w-6 stroke-[1]" />
                          <span className="text-[7px] uppercase tracking-tighter">Photo</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Performance table area - tightened vertical padding for exact 1123px fit */}
                <div className="border border-zinc-800 rounded-lg overflow-hidden">
                  <table className="w-full text-[9px] border-collapse">
                    <thead>
                      <tr className="bg-zinc-100 text-zinc-850 font-bold text-center border-b border-zinc-800">
                        <td colSpan={15} className="py-0.5 uppercase font-extrabold text-[9.5px] tracking-wider">Scholastic Performance</td>
                      </tr>
                      <tr className="bg-zinc-50 text-zinc-850 text-center font-bold border-b border-zinc-800 divide-x divide-zinc-300">
                        <th rowSpan={2} className="py-1 px-1.5 text-left w-32">SCHOLASTIC SUBJECTS</th>
                        <th colSpan={6} className="py-0.5">ACADEMIC TERM I</th>
                        <th colSpan={6} className="py-0.5">ACADEMIC TERM II</th>
                        <th colSpan={2} className="py-0.5">OVERALL RESULTS</th>
                      </tr>
                      <tr className="bg-zinc-50 text-zinc-650 text-[8px] font-bold text-center border-b border-zinc-800 divide-x divide-zinc-300">
                        <th className="py-0.5 w-8">Periodic Test (10)</th>
                        <th className="py-0.5 w-6">NB (5)</th>
                        <th className="py-0.5 w-6">SE (5)</th>
                        <th className="py-0.5 w-10">Mid-Term (80)</th>
                        <th className="py-0.5 w-10">T1 Total (100)</th>
                        <th className="py-0.5 w-8">Grade</th>
                        <th className="py-0.5 w-8">Periodic Test (10)</th>
                        <th className="py-0.5 w-6">NB (5)</th>
                        <th className="py-0.5 w-6">SE (5)</th>
                        <th className="py-0.5 w-10">Annual (80)</th>
                        <th className="py-0.5 w-10">T2 Total (100)</th>
                        <th className="py-0.5 w-8">Grade</th>
                        <th className="py-0.5 w-12 font-bold text-zinc-850">Total Marks (200)</th>
                        <th className="py-0.5 w-8 font-bold text-zinc-850">Grade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 text-zinc-800 text-center font-medium">
                      {subjects.map((sub, index) => {
                        const t1_tot = getT1Total(sub)
                        const t1_grd = getGrade(t1_tot)
                        const t2_tot = getT2Total(sub)
                        const t2_grd = getGrade(t2_tot)
                        const over_tot = getRowOverallTotal(sub)
                        const over_grd = getGrade(over_tot / 2)

                        return (
                          <tr key={index} className="hover:bg-zinc-50/20 divide-x divide-zinc-200">
                            <td className="py-1 px-1.5 text-left font-bold text-zinc-900">{sub.name}</td>
                            <td className="py-1">{sub.t1_pt}</td>
                            <td className="py-1">{sub.t1_nb}</td>
                            <td className="py-1">{sub.t1_se}</td>
                            <td className="py-1">{sub.t1_exam}</td>
                            <td className="py-1 font-bold">{t1_tot}</td>
                            <td className="py-1 font-bold text-zinc-900">{t1_grd}</td>
                            <td className="py-1">{sub.t2_pt}</td>
                            <td className="py-1">{sub.t2_nb}</td>
                            <td className="py-1">{sub.t2_se}</td>
                            <td className="py-1">{sub.t2_exam}</td>
                            <td className="py-1 font-bold">{t2_tot}</td>
                            <td className="py-1 font-bold text-zinc-900">{t2_grd}</td>
                            <td className="py-1 font-black text-zinc-900 bg-zinc-50/20">{over_tot}</td>
                            <td className="py-1 font-black text-red-700 bg-zinc-50/20">{over_grd}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Scholastic Summary box */}
                <div className="border border-zinc-800 rounded-lg overflow-hidden">
                  <table className="w-full text-[9px] border-collapse text-center">
                    <thead>
                      <tr className="bg-zinc-100 text-zinc-850 font-bold border-b border-zinc-800 divide-x divide-zinc-800">
                        <th className="py-1 px-4 text-left w-32">SCHOLASTIC SUMMARY</th>
                        <th className="py-1">TERM 1</th>
                        <th className="py-1">TERM 2</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-300 font-bold text-zinc-800">
                      <tr className="divide-x divide-zinc-300">
                        <td className="py-1 px-4 text-left font-semibold text-zinc-500">Marks Obtained</td>
                        <td className="py-1">{totalT1Obtained} / {maxPossibleTerm}</td>
                        <td className="py-1">{totalT2Obtained} / {maxPossibleTerm}</td>
                      </tr>
                      <tr className="divide-x divide-zinc-300">
                        <td className="py-1 px-4 text-left font-semibold text-zinc-500">Percentage</td>
                        <td className="py-1 text-zinc-950">{t1Percentage}%</td>
                        <td className="py-1 text-zinc-950">{t2Percentage}%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Quick stats indicators block */}
                <div className="grid grid-cols-4 gap-3 text-center text-[9px] font-black uppercase text-white tracking-wider">
                  <div className="py-2 px-1 rounded-lg text-zinc-800 bg-zinc-100 border border-zinc-300 shadow-sm flex flex-col justify-center">
                    <span className="text-[7.5px] font-semibold text-zinc-500 block mb-0.5">Working Attendance</span>
                    <span className="text-zinc-950 font-black text-xs">{attendance}</span>
                  </div>
                  <div className="bg-indigo-600 border border-indigo-700 py-2 px-1 rounded-lg shadow-sm flex flex-col justify-center">
                    <span className="text-[7.5px] font-medium text-indigo-200 block mb-0.5">Marks Obtained</span>
                    <span className="text-white font-black text-xs">{totalOverallObtained} / {maxPossibleOverall}</span>
                  </div>
                  <div className="bg-emerald-600 border border-emerald-700 py-2 px-1 rounded-lg shadow-sm flex flex-col justify-center">
                    <span className="text-[7.5px] font-medium text-emerald-200 block mb-0.5">Overall Percentage</span>
                    <span className="text-white font-black text-xs">{overallPercentage} %</span>
                  </div>
                  <div className="bg-red-600 border border-red-700 py-2 px-1 rounded-lg shadow-sm flex flex-col justify-center">
                    <span className="text-[7.5px] font-medium text-red-200 block mb-0.5">Overall Grade</span>
                    <span className="text-white font-black text-xs">{overallGrade}</span>
                  </div>
                </div>

                {/* Co-scholastic & Extracurricular traits (5-point) grid side-by-side */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-zinc-800 rounded-lg overflow-hidden">
                    <table className="w-full text-[8.5px] border-collapse text-left">
                      <thead>
                        <tr className="bg-zinc-100 text-zinc-850 font-bold border-b border-zinc-800 divide-x divide-zinc-300">
                          <th className="py-1 px-2">PERSONALITY & CO-SCHOLASTIC TRAITS</th>
                          <th className="py-1 w-16 text-center">Term I</th>
                          <th className="py-1 w-16 text-center">Term II</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200 text-zinc-700 font-medium">
                        {coScholastic.map((row, idx) => (
                          <tr key={idx} className="divide-x divide-zinc-200">
                            <td className="py-1 px-2 font-semibold text-zinc-800">{row.name}</td>
                            <td className="py-1 text-center font-bold text-zinc-950">{row.t1_grade}</td>
                            <td className="py-1 text-center font-bold text-zinc-950">{row.t2_grade}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="border border-zinc-800 rounded-lg overflow-hidden">
                    <table className="w-full text-[8.5px] border-collapse text-left">
                      <thead>
                        <tr className="bg-zinc-100 text-zinc-850 font-bold border-b border-zinc-800 divide-x divide-zinc-300">
                          <th className="py-1 px-2">CO-CURRICULAR / EXTRACURRICULAR</th>
                          <th className="py-1 w-16 text-center">Term I</th>
                          <th className="py-1 w-16 text-center">Term II</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200 text-zinc-700 font-medium">
                        {extracurricular.map((row, idx) => (
                          <tr key={idx} className="divide-x divide-zinc-200">
                            <td className="py-1 px-2 font-semibold text-zinc-800">{row.name}</td>
                            <td className="py-1 text-center font-bold text-zinc-950">{row.t1_grade}</td>
                            <td className="py-1 text-center font-bold text-zinc-950">{row.t2_grade}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Grading scale helper */}
                <div className="grid grid-cols-2 gap-4 text-[7.5px] text-zinc-550 font-semibold border-t border-zinc-100 pt-1.5 leading-none">
                  <div className="space-y-0.5">
                    <span className="block uppercase text-zinc-400 font-bold text-[7px]">Grade Scale For Scholastic Areas:</span>
                    <div className="flex flex-wrap gap-x-2">
                      <span>91-100: A1</span>
                      <span>81-90: A2</span>
                      <span>71-80: B1</span>
                      <span>61-70: B2</span>
                      <span>51-60: C1</span>
                      <span>41-50: C2</span>
                      <span>33-40: D</span>
                      <span>0-32: E</span>
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <span className="block uppercase text-zinc-400 font-bold text-[7px]">Co-scholastic Grading Scale Area:</span>
                    <div className="flex gap-4">
                      <span>A: Outstanding</span>
                      <span>B: Very Good</span>
                      <span>C: Fair</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Remarks, verdict, signatures - positioned at absolute bottom */}
              <div className="border-t-2 border-red-700 pt-2 flex flex-col gap-2.5 mt-auto">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-8 space-y-0.5 border border-zinc-200 rounded-lg p-2 bg-zinc-50/50">
                    <span className="block font-bold text-[8.5px] uppercase tracking-wider text-zinc-500 leading-none mb-0.5">Teacher's Remarks:</span>
                    <p className="italic text-zinc-700 text-[9.5px] leading-tight">"{remarks}"</p>
                  </div>
                  <div className="col-span-4 border border-red-700 bg-red-50 text-red-700 text-center font-black p-2 rounded-lg flex items-center justify-center text-[9.5px] tracking-wide uppercase leading-tight">
                    {promotionText}
                  </div>
                </div>

                <div className="flex justify-between items-end text-[8.5px] font-bold text-zinc-500 pt-5">
                  <div className="text-center w-28 border-t border-zinc-400 pt-1">
                    Parent's Signature
                  </div>
                  <div className="text-center w-36 border-t border-zinc-400 pt-1">
                    Class Teacher's Signature
                  </div>
                  <div className="text-center w-28 border-t border-zinc-400 pt-1">
                    Principal's Signature
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Action triggers */}
          <div className="mt-4 flex gap-4 w-full">
            <button
              onClick={() => setShowModal(true)}
              className="flex-1 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-red-700 text-white font-bold hover:bg-red-600 shadow-md hover:shadow-lg active:scale-[0.98] transition-all text-sm"
            >
              <Download className="h-4 w-4" /> Download PDF Report Card
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

      {/* REGISTRATION MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-zinc-200 flex flex-col relative animate-scaleUp">
            
            {/* Top Close Arrow Button */}
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 left-4 p-2 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-full transition-colors"
              title="Go Back"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-red-50 text-red-600 border border-red-100 mx-auto mb-4 mt-2">
              <ShieldAlert className="h-6 w-6" />
            </div>
            
            <h4 className="text-lg font-bold text-zinc-900 text-center">Your Report Card is Ready!</h4>
            <p className="text-xs text-zinc-500 text-center mt-1">
              (You have unlimited free downloads from this browser builder)
            </p>
            <p className="text-sm text-zinc-700 text-center mt-3 leading-relaxed">
              Would you like to download this individual report card as a PDF directly, or register free on JIDS to create and manage report cards in bulk from Excel lists?
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={triggerPdfDownload}
                disabled={isGeneratingPdf}
                className="w-full inline-flex h-11 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-500 text-sm shadow-md hover:shadow-lg active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isGeneratingPdf ? 'Generating PDF...' : 'Download PDF (Browser Free)'}
              </button>
              
              <a
                href="https://jids.in/register?src=schoolreportcard-popup-download"
                className="w-full inline-flex h-11 items-center justify-center rounded-xl bg-red-700 text-white font-bold hover:bg-red-600 text-sm shadow-md hover:shadow-lg active:scale-[0.98] transition-all text-center"
              >
                Register Free on JIDS.IN (Bulk Cloud Tools)
              </a>
            </div>
          </div>
        </div>
      )}

      {/* FULL SCREEN PDF GENERATOR OVERLAY WITH SPINNING ANIMATIONS */}
      {isGeneratingPdf && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-zinc-950/80 backdrop-blur-md text-white animate-fadeIn">
          <div className="flex flex-col items-center max-w-sm text-center px-6">
            {/* Spinning Loader */}
            <div className="relative flex items-center justify-center h-20 w-20 mb-6">
              <div className="absolute inset-0 border-4 border-zinc-700 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-t-red-600 rounded-full animate-spin"></div>
              <Sparkles className="h-8 w-8 text-red-500 animate-pulse" />
            </div>
            <h3 className="text-lg font-bold tracking-tight">Generating PDF Report Card</h3>
            <p className="text-xs text-zinc-400 mt-2 animate-pulse">
              Compiling high-resolution A4 layout and embedding school credentials...
            </p>
            <p className="text-[10px] text-zinc-500 mt-8 font-medium">
              This runs entirely in your browser and will download and open automatically.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
