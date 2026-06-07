import { useState, useEffect } from 'react'
import { Camera, MapPin, Phone, MessageSquare, CheckCircle2, Loader2, Upload } from 'lucide-react'
import { WARD_DATA, ISSUE_CATEGORIES } from '../data/wards'
import { saveComplaint } from '../utils/storage'
import { cn } from '../utils/cn'

const ReportPage = () => {
  const [photo, setPhoto] = useState(null)
  const [detecting, setDetecting] = useState(false)
  const [ward, setWard] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [description, setDescription] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [ticketNumber, setTicketNumber] = useState('')

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPhoto(URL.createObjectURL(file))
    }
  }

  const detectWard = () => {
    setDetecting(true)
    // Simulating GPS detection
    setTimeout(() => {
      // For MVP, we'll pick a random ward or default to Ward 9
      const detectedWard = WARD_DATA.find(w => w.id === 9) || WARD_DATA[0]
      setWard(detectedWard)
      setDetecting(false)
    }, 2000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!ward || !selectedCategory) return

    const complaint = {
      wardId: ward.id,
      wardName: ward.name,
      category: selectedCategory.label,
      description,
      photo,
    }

    const saved = saveComplaint(complaint)
    setTicketNumber(saved.id)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <CheckCircle2 size={60} />
        </div>
        <h2 className="text-3xl font-bold text-secondary mb-2">Complaint Submitted!</h2>
        <p className="text-gray-600 mb-6">Thank you for your civic responsibility.</p>
        
        <div className="bg-white border-2 border-dashed border-primary rounded-xl p-6 mb-8 w-full max-w-sm">
          <p className="text-sm text-gray-500 uppercase tracking-widest mb-1">Ticket Number</p>
          <p className="text-3xl font-mono font-bold text-primary">{ticketNumber}</p>
        </div>

        <div className="flex flex-col gap-4 w-full max-w-sm">
          <a 
            href={`https://wa.me/9100000000?text=Hello, I have reported a ${selectedCategory?.label} issue in ${ward?.name}. Reference: ${ticketNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-4 px-8 rounded-xl"
          >
            <MessageSquare size={20} />
            Share with Nagarsevak
          </a>
          <button 
            onClick={() => window.location.href = '/tracker'}
            className="text-secondary font-medium py-2 underline"
          >
            Track my complaints
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-secondary mb-6">Report a Civic Issue</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Photo Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-700">1. Take/Upload Photo</label>
          <div className="relative aspect-video bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center overflow-hidden">
            {photo ? (
              <img src={photo} alt="Issue" className="w-full h-full object-cover" />
            ) : (
              <>
                <Camera className="text-gray-400 mb-2" size={48} />
                <span className="text-sm text-gray-500">Tap to capture or upload</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handlePhotoUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </>
            )}
          </div>
        </div>

        {/* GPS Detection */}
        <div className="space-y-4">
          <label className="block text-sm font-bold text-gray-700">2. Detect Location</label>
          {!ward ? (
            <button 
              type="button"
              onClick={detectWard}
              disabled={detecting}
              className="w-full flex items-center justify-center gap-2 bg-blue-50 text-blue-600 font-bold py-4 rounded-xl border border-blue-200"
            >
              {detecting ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Detecting your ward...
                </>
              ) : (
                <>
                  <MapPin size={20} />
                  Auto-detect GPS Location
                </>
              )}
            </button>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center gap-2 text-green-700 font-bold mb-1">
                <CheckCircle2 size={18} />
                Location Detected
              </div>
              <p className="text-secondary font-bold">Ward {ward.id} – {ward.name}</p>
              
              {/* Nagarsevak Card */}
              <div className="mt-4 bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                <p className="text-xs text-gray-500 mb-2 uppercase">Your Elected Nagarsevak</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-secondary">{ward.corporators[0].name}</p>
                    <p className="text-xs px-2 py-0.5 bg-orange-100 text-primary rounded inline-block">
                      {ward.corporators[0].party}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <a href={`tel:${ward.corporators[0].phone}`} className="w-10 h-10 bg-gray-100 text-secondary rounded-full flex items-center justify-center">
                      <Phone size={18} />
                    </a>
                    <a href={`https://wa.me/${ward.corporators[0].phone}`} className="w-10 h-10 bg-green-100 text-[#25D366] rounded-full flex items-center justify-center">
                      <MessageSquare size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Fallback Selector */}
          {!detecting && (
            <div className="mt-2">
              <p className="text-xs text-gray-500 mb-2">Or select ward manually:</p>
              <select 
                className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm"
                onChange={(e) => setWard(WARD_DATA.find(w => w.id === parseInt(e.target.value)))}
                value={ward?.id || ''}
              >
                <option value="">Select Ward</option>
                {WARD_DATA.map(w => (
                  <option key={w.id} value={w.id}>Ward {w.id}: {w.name}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Issue Category */}
        <div className="space-y-4">
          <label className="block text-sm font-bold text-gray-700">3. Select Issue Category</label>
          <div className="grid grid-cols-2 gap-3">
            {ISSUE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "flex items-center gap-3 p-4 rounded-xl border transition-all text-left",
                  selectedCategory?.id === cat.id 
                    ? "bg-primary border-primary text-white" 
                    : "bg-white border-gray-200 text-secondary hover:border-primary"
                )}
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-sm font-bold leading-tight">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-700">4. Additional Details (Optional)</label>
          <textarea 
            className="w-full p-4 bg-white border border-gray-200 rounded-xl min-h-[100px]"
            placeholder="Tell us more about the issue..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!ward || !selectedCategory}
          className="w-full bg-primary disabled:bg-gray-300 text-white font-bold py-5 rounded-xl text-lg shadow-lg shadow-orange-200 active:scale-95 transition-all"
        >
          Report to Nagarsevak
        </button>
      </form>
    </div>
  )
}

export default ReportPage
