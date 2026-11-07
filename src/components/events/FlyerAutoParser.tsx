'use client';

import { useState, useRef, useCallback } from 'react';
import {
  Sparkles,
  UploadCloud,
  Link2,
  FileImage,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  X,
} from 'lucide-react';

export interface ExtractedEventFields {
  eventName?: string;
  eventType?: 'festival' | 'social' | 'class' | string;
  danceStyle?: 'Bachata' | 'Salsa' | 'Mixed';
  danceStyles?: string[];
  ballroomCount?: number;
  date?: string;
  frequency?: 'one-time' | 'weekly' | 'monthly';
  startTime?: string;
  endTime?: string;
  city?: string;
  venue?: string;
  address?: string;
  price?: string;
  organizerName?: string;
  organizerInstagram?: string;
  organizerEmail?: string;
  lineup?: string[];
  ticketUrl?: string;
  description?: string;
  isDuplicate?: boolean;
  duplicateEvent?: {
    id: string;
    companyName: string;
    city: string;
    date?: string;
  };
}

export interface FlyerAutoParserProps {
  brand?: 'findbachata' | 'findsalsa' | 'findlatindance';
  themeColor?: 'amber' | 'rose' | 'purple';
  onFieldsExtracted: (fields: ExtractedEventFields) => void;
  className?: string;
}

const THEME_STYLES = {
  amber: {
    accent: 'amber',
    gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
    border: 'border-amber-500/30 hover:border-amber-400/50',
    button: 'bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white shadow-amber-900/30',
    activeTab: 'bg-amber-600 text-white',
    badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    ring: 'focus-within:ring-amber-400/30',
  },
  purple: {
    accent: 'purple',
    gradient: 'from-purple-500/20 via-indigo-500/10 to-transparent',
    border: 'border-purple-500/30 hover:border-purple-400/50',
    button: 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-900/30',
    activeTab: 'bg-purple-600 text-white',
    badge: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    ring: 'focus-within:ring-purple-400/30',
  },
  rose: {
    accent: 'rose',
    gradient: 'from-rose-500/20 via-pink-500/10 to-transparent',
    border: 'border-rose-500/30 hover:border-rose-400/50',
    button: 'bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white shadow-rose-900/30',
    activeTab: 'bg-rose-600 text-white',
    badge: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    ring: 'focus-within:ring-rose-400/30',
  },
};

export function FlyerAutoParser({
  brand = 'findlatindance',
  themeColor = 'amber',
  onFieldsExtracted,
  className = '',
}: FlyerAutoParserProps) {
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [base64Data, setBase64Data] = useState<string | null>(null);
  const [eventUrl, setEventUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);
  const [detectedCount, setDetectedCount] = useState<number | null>(null);
  const [confidenceScore, setConfidenceScore] = useState<number | null>(null);
  const [detectedArtists, setDetectedArtists] = useState<string[]>([]);
  const [duplicateWarning, setDuplicateWarning] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const theme = THEME_STYLES[themeColor] || THEME_STYLES.amber;

  const handleFile = useCallback((selectedFile: File) => {
    if (!selectedFile.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file (PNG, JPG, WebP).');
      return;
    }
    if (selectedFile.size > 8 * 1024 * 1024) {
      setErrorMessage('File size exceeds 8MB. Please choose a smaller flyer image.');
      return;
    }
    setErrorMessage(null);
    setFile(selectedFile);
    setScanSuccess(false);
    setDuplicateWarning(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreviewUrl(result);
      setBase64Data(result);
    };
    reader.readAsDataURL(selectedFile);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0]);
      }
    },
    [handleFile]
  );

  const handleClear = () => {
    setFile(null);
    setPreviewUrl(null);
    setBase64Data(null);
    setEventUrl('');
    setScanSuccess(false);
    setDetectedCount(null);
    setConfidenceScore(null);
    setDetectedArtists([]);
    setDuplicateWarning(null);
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleScan = async () => {
    setErrorMessage(null);
    setDuplicateWarning(null);

    if (activeTab === 'upload' && !base64Data) {
      setErrorMessage('Please drop or select a flyer image first.');
      return;
    }

    if (activeTab === 'url' && !eventUrl.trim()) {
      setErrorMessage('Please enter an event or flyer link.');
      return;
    }

    setIsScanning(true);

    try {
      const apiEndpoint =
        process.env.NEXT_PUBLIC_API_URL
          ? `${process.env.NEXT_PUBLIC_API_URL}/organizer/parse-submission`
          : 'https://qgwputmm66.execute-api.us-east-1.amazonaws.com/prod/organizer/parse-submission';

      const payload = {
        brand,
        flyerBase64: activeTab === 'upload' ? base64Data : undefined,
        eventUrl: activeTab === 'url' ? eventUrl.trim() : undefined,
      };

      const res = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (res.status === 429) {
          throw new Error('AI scanning rate limit reached. Please wait a minute or fill the fields below.');
        }
        throw new Error(data.error?.message || 'Failed to extract congress details from flyer.');
      }

      const extracted = data.extractedFields || {};
      const fieldsCount = Object.keys(extracted).filter(
        (k) => extracted[k] !== undefined && extracted[k] !== null && extracted[k] !== ''
      ).length;

      setDetectedCount(fieldsCount);
      setConfidenceScore(Math.round((data.confidence || 0.85) * 100));
      if (Array.isArray(extracted.lineup)) {
        setDetectedArtists(extracted.lineup);
      }
      setScanSuccess(true);

      if (data.isDuplicate && data.duplicateEvent) {
        setDuplicateWarning(
          `Similar congress already cataloged: "${data.duplicateEvent.companyName}" in ${data.duplicateEvent.city}.`
        );
      }

      // Propagate extracted data to parent form
      onFieldsExtracted({
        ...extracted,
        isDuplicate: data.isDuplicate,
        duplicateEvent: data.duplicateEvent,
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Could not parse flyer. Please verify details manually below.');
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border ${theme.border} bg-gradient-to-br ${theme.gradient} bg-zinc-950/60 p-5 sm:p-6 backdrop-blur-xl transition-all shadow-xl ${className}`}
    >
      {/* Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white tracking-wide">
                AI Flyer Auto-Fill
              </span>
              <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                Instant Extractor
              </span>
            </div>
            <p className="text-xs text-white/60">
              Drop multi-room congress flyer or link — AI extracts dates, ballroom lineup & tickets instantly.
            </p>
          </div>
        </div>

        {/* Tab Toggle */}
        <div className="inline-flex rounded-lg border border-white/10 bg-white/[0.04] p-0.5">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition-all ${
              activeTab === 'upload'
                ? theme.activeTab
                : 'text-white/60 hover:text-white'
            }`}
          >
            <FileImage className="h-3.5 w-3.5" />
            Upload Flyer
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition-all ${
              activeTab === 'url'
                ? theme.activeTab
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Link2 className="h-3.5 w-3.5" />
            Event / IG Link
          </button>
        </div>
      </div>

      {/* Tab 1: Upload / Dropzone */}
      {activeTab === 'upload' && (
        <div className="space-y-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/jpg"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFile(e.target.files[0]);
              }
            }}
          />

          {!previewUrl ? (
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="group cursor-pointer rounded-xl border border-dashed border-white/20 bg-white/[0.02] hover:bg-white/[0.05] p-6 text-center transition-all hover:border-white/40"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.05] text-white/70 group-hover:scale-105 group-hover:text-white transition-all">
                <UploadCloud className="h-6 w-6" />
              </div>
              <p className="mt-3 text-xs sm:text-sm font-semibold text-white/90">
                Click or drag & drop congress flyer
              </p>
              <p className="mt-1 text-[11px] text-white/40">
                Supports PNG, JPG, or WebP up to 8MB
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={previewUrl}
                  alt="Flyer Preview"
                  className="h-14 w-14 rounded-lg object-cover border border-white/20 flex-shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-xs font-medium text-white truncate max-w-[200px] sm:max-w-xs">
                    {file?.name || 'Selected flyer image'}
                  </p>
                  <p className="text-[11px] text-white/40">
                    {file ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : 'Image ready'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                  Change
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="rounded-lg p-1.5 text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Remove flyer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: URL Input */}
      {activeTab === 'url' && (
        <div className="space-y-3">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-white/40">
              <Link2 className="h-4 w-4" />
            </div>
            <input
              type="url"
              value={eventUrl}
              onChange={(e) => {
                setEventUrl(e.target.value);
                setErrorMessage(null);
                setScanSuccess(false);
              }}
              placeholder="Paste Instagram post, Eventbrite, or ticket link..."
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-white/40 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all"
            />
          </div>
          <p className="text-[11px] text-white/40">
            Works with official Instagram posts, Eventbrite, TicketTailor, Go&Dance, or organizer domains.
          </p>
        </div>
      )}

      {/* Action Bar */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/[0.08]">
        <div className="flex items-center gap-2 text-[11px] text-white/50">
          <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          <span>Multimodal Vertex AI extraction</span>
        </div>

        <button
          type="button"
          onClick={handleScan}
          disabled={isScanning || (activeTab === 'upload' && !base64Data) || (activeTab === 'url' && !eventUrl.trim())}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed ${theme.button}`}
        >
          {isScanning ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              <span>Scanning flyer...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-3.5 w-3.5" />
              <span>Auto-Fill Form with AI</span>
            </>
          )}
        </button>
      </div>

      {/* Success Banner */}
      {scanSuccess && (
        <div className="mt-4 rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-3.5 text-left text-xs space-y-2 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-semibold text-emerald-300">
              <CheckCircle2 className="h-4 w-4" />
              <span>
                ✨ Auto-filled {detectedCount ?? 'multiple'} fields with AI!
              </span>
            </div>
            {confidenceScore !== null && (
              <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-[10px] font-bold text-emerald-200">
                {confidenceScore}% confidence
              </span>
            )}
          </div>
          <p className="text-white/70 text-[11px]">
            Please review the pre-filled fields below, adjust if needed, and submit your listing.
          </p>
          {detectedArtists.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] uppercase font-bold text-white/50 tracking-wider">
                Artists:
              </span>
              {detectedArtists.map((artist, i) => (
                <span
                  key={i}
                  className="rounded-md bg-white/10 px-1.5 py-0.5 text-[10px] font-medium text-white/90"
                >
                  {artist}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Duplicate Warning */}
      {duplicateWarning && (
        <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-amber-400/30 bg-amber-500/10 p-3 text-xs text-amber-200 animate-fadeIn">
          <AlertTriangle className="h-4 w-4 text-amber-300 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-amber-300">Potential Duplicate Detected</p>
            <p className="text-[11px] text-amber-200/80">{duplicateWarning}</p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="mt-3 flex items-center justify-between rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-xs text-red-200">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-300 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            className="text-red-300 hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
