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
        <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-50 animate-pulse">
          {/* Album image skeleton */}
          <div className="w-12 h-12 rounded bg-zinc-300"></div>
          {/* Text content skeleton - exact same structure as real component */}
          <div className="flex-1 min-w-0">
            <div className="text-[10px] text-zinc-400 font-light uppercase tracking-wider mb-0.5">
              <div className="w-20 h-[15px] bg-zinc-200 rounded"></div>
            </div>
            <div className="text-sm font-semibold text-zinc-900 truncate">
              <div className="w-32 h-[18px] bg-zinc-200 rounded"></div>
            </div>
            <div className="text-xs text-zinc-600 truncate mt-0.5">
              <div className="w-24 h-[16px] bg-zinc-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!data) {
    return null
  }

  if (!data.isPlaying) {
    return null
  }

  return (
    <div className="-mt-2">
      <a
        href={data.songUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 p-3 rounded-lg bg-zinc-50 hover:bg-zinc-100 transition-colors"
      >
        {data.albumImageUrl && (
          <img
            src={data.albumImageUrl}
            alt={data.album || 'Album cover'}
            className="w-12 h-12 rounded object-cover"
          />
        )}
        <div className="flex-1 min-w-0">
          <div className="text-[10px] text-zinc-400 font-light uppercase tracking-wider mb-0.5">
            Listening to Spotify
          </div>
          <div className="text-sm font-semibold text-zinc-900 truncate group-hover:text-zinc-700 transition-colors">
            {data.title}
          </div>
          <div className="text-xs text-zinc-600 truncate">
            {data.artist}
          </div>
        </div>
      </a>
    </div>
  )
}

