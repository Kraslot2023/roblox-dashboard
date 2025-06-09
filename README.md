# Roblox Staff & Ban Dashboard

## Setup

1. Maak een nieuwe GitHub repository aan (bijv. `roblox-dashboard`)
2. Clone deze repo lokaal en zet bovenstaande bestanden erin
3. Push naar GitHub

## Deploy naar Vercel

1. Maak een gratis account aan op [https://vercel.com](https://vercel.com)
2. Klik op **New Project** en importeer jouw GitHub repo
3. Stel environment variables in:

- `SUPABASE_URL` = jouw Supabase URL
- `SUPABASE_KEY` = jouw Supabase anon/public key

4. Klik op deploy

## Roblox integratie

Gebruik `HttpService:PostAsync` om JSON data naar de API endpoints te sturen:

```lua
local HttpService = game:GetService("HttpService")
local STAFF_API = "https://jouw-vercel-url.vercel.app/api/log-staff"
local BAN_API = "https://jouw-vercel-url.vercel.app/api/log-ban"

-- Log staff login
local function logStaffJoin(player)
    local data = {
        user_id = player.UserId,
        username = player.Name,
        join_time = os.date("!%Y-%m-%dT%H:%M:%SZ")
    }
    HttpService:PostAsync(STAFF_API, HttpService:JSONEncode(data), Enum.HttpContentType.ApplicationJson)
end

game.Players.PlayerAdded:Connect(logStaffJoin)

-- Log ban (voorbeeld)
local function logBan(userId, username, reason, bannedBy, durationMinutes)
    local data = {
        user_id = userId,
        username = username,
        reason = reason,
        banned_by = bannedBy,
        timestamp = os.date("!%Y-%m-%dT%H:%M:%SZ"),
        duration = durationMinutes
    }
    HttpService:PostAsync(BAN_API, HttpService:JSONEncode(data), Enum.HttpContentType.ApplicationJson)
end
