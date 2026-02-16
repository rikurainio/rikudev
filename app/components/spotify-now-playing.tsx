'use client'

import { useEffect, useState } from 'react'

interface NowPlayingData {
  isPlaying: boolean
  title?: string
  artist?: string
  album?: string
  albumImageUrl?: string
  songUrl?: string
}

export function SpotifyNowPlaying() {
  const [data, setData] = useState<NowPlayingData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchNowPlaying() {
      try {
        const response = await fetch('/api/spotify/now-playing')
        const data = await response.json()
        setData(data)
      } catch (error) {
        console.error('Error fetching now playing:', error)
        setData({ isPlaying: false })
      } finally {
        setIsLoading(false)
      }
    }

    fetchNowPlaying()

    // Poll every 30 seconds to update the track
    const interval = setInterval(fetchNowPlaying, 30000)

    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return (
      <div className="-mt-2">
        <div className="flex items-center gap-3 p-3 rounded-sm bg-zinc-900/50 border border-zinc-800 animate-pulse">
          <div className="w-10 h-10 rounded-sm bg-zinc-800"></div>
          <div className="flex-1 min-w-0">
            <div className="w-16 h-2 bg-zinc-800 rounded-full mb-1.5 opacity-50"></div>
            <div className="w-24 h-2.5 bg-zinc-800 rounded-full mb-1"></div>
            <div className="w-20 h-2 bg-zinc-800 rounded-full opacity-50"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!data || !data.isPlaying) {
    return null
  }

  return (
    <div className="w-full mt-2">
      <a
        href={data.songUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-3 p-2 rounded-sm bg-zinc-900/40 border border-zinc-800/40 hover:bg-zinc-800/40 transition-all w-full overflow-hidden"
      >
        <div className="relative w-10 h-10 shrink-0">
          {data.albumImageUrl ? (
            <img
              src={data.albumImageUrl}
              alt={data.album || 'Album cover'}
              className="w-full h-full rounded-xs object-cover opacity-90 group-hover:opacity-100 transition-opacity"
            />
          ) : (
            <div className="w-full h-full bg-zinc-800 rounded-xs" />
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex items-end gap-[1.5px] h-3">
              <div className="w-[1.5px] bg-emerald-500 animate-[music-wave_1s_ease-in-out_infinite]" />
              <div className="w-[1.5px] bg-emerald-500 animate-[music-wave_0.8s_ease-in-out_infinite_0.1s]" />
              <div className="w-[1.5px] bg-emerald-500 animate-[music-wave_1.2s_ease-in-out_infinite_0.2s]" />
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-wider leading-none">
              Spotify
            </span>
            {/* <span className="text-[10px] font-bold text-emerald-500/80 animate-pulse">
              Listening Now
            </span> */}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-zinc-200 truncate group-hover:text-white transition-colors leading-tight">
              {data.title}
            </span>
            <span className="text-[11px] text-zinc-500 truncate font-medium leading-tight">
              by {data.artist}
            </span>
          </div>
        </div>
      </a>

      <style jsx>{`
        @keyframes music-wave {
          0%, 100% { height: 3px; }
          50% { height: 9px; }
        }
      `}</style>
    </div>
  )
}
