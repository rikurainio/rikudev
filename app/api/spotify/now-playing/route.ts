import { NextResponse } from 'next/server'

interface SpotifyTrack {
  item: {
    name: string
    artists: Array<{ name: string }>
    album: {
      name: string
      images: Array<{ url: string }>
    }
    external_urls: {
      spotify: string
    }
  }
  is_playing: boolean
  currently_playing_type?: string
}

const {
  SPOTIFY_CLIENT_ID: client_id,
  SPOTIFY_CLIENT_SECRET: client_secret,
  SPOTIFY_REFRESH_TOKEN: refresh_token,
} = process.env

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing'
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'

async function getAccessToken() {
  console.log('[Spotify API] Getting access token...')
  console.log('[Spotify API] Client ID exists:', !!client_id)
  console.log('[Spotify API] Client Secret exists:', !!client_secret)
  console.log('[Spotify API] Refresh Token exists:', !!refresh_token)

  if (!client_id || !client_secret || !refresh_token) {
    console.error('[Spotify API] Missing credentials:', {
      hasClientId: !!client_id,
      hasClientSecret: !!client_secret,
      hasRefreshToken: !!refresh_token,
    })
    return null
  }

  try {
    console.log('[Spotify API] Requesting token from:', TOKEN_ENDPOINT)
    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token,
      }),
    })

    console.log('[Spotify API] Token response status:', response.status)
    console.log('[Spotify API] Token response ok:', response.ok)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('[Spotify API] Token request failed:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      })
      return null
    }

    const data = await response.json()
    console.log('[Spotify API] Token received, has access_token:', !!data.access_token)
    return data.access_token
  } catch (error) {
    console.error('[Spotify API] Error getting access token:', error)
    return null
  }
}

export async function GET() {
  console.log('[Spotify API] ===== GET /api/spotify/now-playing =====')
  
  const accessToken = await getAccessToken()

  if (!accessToken) {
    console.log('[Spotify API] No access token, returning isPlaying: false')
    return NextResponse.json({ isPlaying: false }, { status: 200 })
  }

  console.log('[Spotify API] Access token obtained, fetching now playing...')

  try {
    console.log('[Spotify API] Fetching from:', NOW_PLAYING_ENDPOINT)
    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    console.log('[Spotify API] Now playing response status:', response.status)
    console.log('[Spotify API] Now playing response ok:', response.ok)
    console.log('[Spotify API] Response headers:', Object.fromEntries(response.headers.entries()))

    if (response.status === 204) {
      console.log('[Spotify API] Status 204 - No content (not playing)')
      return NextResponse.json({ isPlaying: false }, { status: 200 })
    }

    if (response.status > 400 || !response.ok) {
      const errorText = await response.text()
      console.error('[Spotify API] Error response:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      })
      return NextResponse.json({ isPlaying: false }, { status: 200 })
    }

    const data: SpotifyTrack = await response.json()
    console.log('[Spotify API] Raw response data:', JSON.stringify(data, null, 2))
    console.log('[Spotify API] Data has item:', !!data.item)
    console.log('[Spotify API] Currently playing type:', data.currently_playing_type)
    console.log('[Spotify API] Is playing:', data.is_playing)

    if (!data.item) {
      console.log('[Spotify API] No item in response, returning isPlaying: false')
      return NextResponse.json({ isPlaying: false }, { status: 200 })
    }

    if (data.currently_playing_type && data.currently_playing_type !== 'track') {
      console.log('[Spotify API] Not a track (type:', data.currently_playing_type, '), returning isPlaying: false')
      return NextResponse.json({ isPlaying: false }, { status: 200 })
    }

    const result = {
      isPlaying: data.is_playing,
      title: data.item.name,
      album: data.item.album.name,
      artist: data.item.artists.map((artist) => artist.name).join(', '),
      albumImageUrl: data.item.album.images[0]?.url,
      songUrl: data.item.external_urls.spotify,
    }

    console.log('[Spotify API] Returning result:', JSON.stringify(result, null, 2))
    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    console.error('[Spotify API] Exception caught:', error)
    if (error instanceof Error) {
      console.error('[Spotify API] Error message:', error.message)
      console.error('[Spotify API] Error stack:', error.stack)
    }
    return NextResponse.json({ isPlaying: false }, { status: 200 })
  }
}

