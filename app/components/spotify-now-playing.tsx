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
      <div className="mt-2">
        <div className="text-xs text-zinc-400 font-light">Loading...</div>
      </div>
    )
  }

  if (!data || !data.isPlaying) {
    return null
  }

  return (
    <div className="mt-2">
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
            Now Playing
          </div>
          <div className="text-sm font-semibold text-zinc-900 truncate group-hover:text-zinc-700 transition-colors">
            {data.title}
          </div>
          <div className="text-xs text-zinc-600 truncate">
            {data.artist}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
        </div>
      </a>
    </div>
  )
}

