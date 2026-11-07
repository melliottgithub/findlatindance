'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import {
  Camera,
  Upload,
  X,
  Sparkles,
  Loader2,
  Calendar,
  MapPin,
  ExternalLink,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';

export interface VisualMatchedEvent {
  id: string;
  name: string;
  city: string;
  date?: string;
  venue?: string;
  eventType: string;
  similarityScore: number;
  slug?: string;
  eventUrl?: string;
}

export interface VisualSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  brand?: 'findbachata' | 'findsalsa' | 'findlatindance';
}

export function VisualSearchModal({
  isOpen,
  onClose,
  brand = 'findlatindance',
}: VisualSearchModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<VisualMatchedEvent[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [extractedInfo, setExtractedInfo] = useState<{
    eventName?: string;
    city?: string;
    date?: string;
    artists?: string[];
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const processImage = useCallback(
    async (selectedFile: File) => {
      if (!selectedFile.type.startsWith('image/')) {
        setErrorMessage('Please select a valid image file.');
        return;
      }
      if (selectedFile.size > 8 * 1024 * 1024) {
        setErrorMessage('Image is too large (max 8MB).');
        return;
      }

      setFile(selectedFile);
      setErrorMessage(null);
      setHasSearched(false);
      setResults([]);
      setExtractedInfo(null);

      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target?.result as string;
        setPreviewUrl(base64);
        setIsSearching(true);

        try {
          const apiEndpoint =
            process.env.NEXT_PUBLIC_API_URL
              ? `${process.env.NEXT_PUBLIC_API_URL}/ai/visual-search`
              : 'https://qgwputmm66.execute-api.us-east-1.amazonaws.com/prod/ai/visual-search';

          const res = await fetch(apiEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              brand,
              imageBase64: base64,
            }),
          });

          const data = await res.json();

          if (!res.ok || !data.success) {
            if (res.status === 429) {
              throw new Error('Search rate limit reached. Please wait a moment.');
            }
            throw new Error(data.error?.message || 'Visual search could not identify event.');
          }

          setResults(data.matches || []);
          if (data.extractedDetails) {
            setExtractedInfo({
              eventName: data.extractedDetails.eventName,
              city: data.extractedDetails.city,
              date: data.extractedDetails.date,
              artists: data.extractedDetails.artists,
            });
          }
          setHasSearched(true);
        } catch (err: any) {
          setErrorMessage(err.message || 'Error processing flyer image.');
        } finally {
          setIsSearching(false);
        }
      };
      reader.readAsDataURL(selectedFile);
    },
    [brand]
  );

  const resetSearch = () => {
    setFile(null);
    setPreviewUrl(null);
    setResults([]);
    setHasSearched(false);
    setExtractedInfo(null);
    setErrorMessage(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/30">
              <Camera className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                Snap a Flyer · Latin Congress Search
              </h2>
              <p className="text-xs text-white/50">
                Found a multi-room festival flyer? Let AI find hotel, tickets & schedule.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-white/50 hover:bg-white/10 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content State */}
        {!previewUrl ? (
          <div className="space-y-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  processImage(e.target.files[0]);
                }
              }}
            />
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  processImage(e.target.files[0]);
                }
              }}
            />

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  processImage(e.dataTransfer.files[0]);
                }
              }}
              onClick={() => fileInputRef.current?.click()}
              className="group cursor-pointer rounded-2xl border-2 border-dashed border-white/15 bg-white/[0.02] hover:bg-white/[0.04] p-8 text-center transition-all hover:border-amber-400/50"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:scale-105 group-hover:border-amber-400/40 transition-all">
                <Upload className="h-8 w-8" />
              </div>
              <p className="mt-4 text-sm font-semibold text-white">
                Drop your congress flyer image or click to browse
              </p>
              <p className="mt-1 text-xs text-white/40">
                Screenshots, Instagram stories, or photos of festival banners
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
              >
                <Camera className="h-4 w-4 text-amber-400" />
                Take Photo
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 py-3 text-xs font-semibold text-amber-300 hover:bg-amber-500/20 transition-colors"
              >
                <Upload className="h-4 w-4" />
                Upload File
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            {/* Image Preview & Status */}
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-3">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={previewUrl}
                  alt="Scanned flyer"
                  className="h-16 w-16 rounded-lg object-cover border border-white/20 flex-shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-white truncate">
                    {extractedInfo?.eventName || file?.name || 'Flyer Scanned'}
                  </p>
                  {extractedInfo?.city && (
                    <p className="text-[11px] text-amber-300 flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3 w-3" />
                      {extractedInfo.city}
                      {extractedInfo.date ? ` • ${extractedInfo.date}` : ''}
                    </p>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={resetSearch}
                className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                Change
              </button>
            </div>

            {/* Scanning State */}
            {isSearching && (
              <div className="py-8 text-center space-y-3">
                <Loader2 className="mx-auto h-8 w-8 animate-spin text-amber-400" />
                <p className="text-sm font-semibold text-white">
                  Scanning flyer with Multimodal AI...
                </p>
                <p className="text-xs text-white/50">
                  Extracting multi-room congress, dates, ballroom artists & matching live catalog
                </p>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs text-red-200 flex items-start gap-2.5">
                <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Results Display */}
            {hasSearched && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-white/50">
                    Matched Events ({results.length})
                  </span>
                  {results.length > 0 && (
                    <span className="text-[10px] text-emerald-400 font-semibold">
                      Catalog Match Found
                    </span>
                  )}
                </div>

                {results.length === 0 ? (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center space-y-3">
                    <p className="text-sm font-medium text-white/80">
                      No exact catalog match found for this flyer.
                    </p>
                    <p className="text-xs text-white/50 max-w-sm mx-auto">
                      Are you the organizer? List your event for free on our directory.
                    </p>
                    <Link
                      href="/add-event"
                      onClick={onClose}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-amber-600 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-500 transition-colors"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      List This Congress
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {results.map((match) => (
                      <div
                        key={match.id}
                        className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] p-3.5 transition-all"
                      >
                        <div className="min-w-0 pr-3 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-white truncate">
                              {match.name}
                            </span>
                            <span className="rounded-full bg-amber-500/20 border border-amber-500/30 px-2 py-0.5 text-[9px] font-bold text-amber-300">
                              {Math.round(match.similarityScore * 100)}% match
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 text-[11px] text-white/60">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-white/40" />
                              {match.city}
                            </span>
                            {match.date && (
                              <>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3 text-white/40" />
                                  {match.date}
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          {match.slug ? (
                            <Link
                              href={`/events/${match.slug}`}
                              onClick={onClose}
                              className="inline-flex items-center gap-1 rounded-lg bg-amber-600 hover:bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white transition-colors"
                            >
                              <span>View</span>
                              <ChevronRight className="h-3.5 w-3.5" />
                            </Link>
                          ) : match.eventUrl ? (
                            <a
                              href={match.eventUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 rounded-lg bg-white/10 hover:bg-white/20 px-3 py-1.5 text-xs font-semibold text-white transition-colors"
                            >
                              <span>Tickets</span>
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          ) : (
                            <Link
                              href={`/cities/${match.city.toLowerCase().replace(/\s+/g, '-')}`}
                              onClick={onClose}
                              className="inline-flex items-center gap-1 rounded-lg bg-white/10 hover:bg-white/20 px-3 py-1.5 text-xs font-semibold text-white transition-colors"
                            >
                              <span>City</span>
                              <ChevronRight className="h-3.5 w-3.5" />
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
