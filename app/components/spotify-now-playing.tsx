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
        <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-100 animate-pulse">
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
    return (
      <div className="-mt-2">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-100">
          <div className="w-12 h-12 rounded bg-zinc-200 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-zinc-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] text-zinc-400 font-light uppercase tracking-wider mb-0.5">
              Spotify
            </div>
            <div className="text-sm font-semibold text-zinc-900">
              Not currently playing
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="-mt-2">
      <a
        href={data.songUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 p-3 rounded-lg bg-zinc-100 hover:bg-zinc-200 transition-colors"
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

