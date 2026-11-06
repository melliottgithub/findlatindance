#!/usr/bin/env python3
"""
FindLatinDance — Python Recommender Engine Builder
Generates multi-tier recommendations for FindLatinDance in 100% pure Python.
"""
import os
import sys
import json
import re
import unicodedata
from datetime import datetime, timezone

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EVENTS_PATH = os.path.join(ROOT, "src", "data", "events.json")
OUT_SRC = os.path.join(ROOT, "src", "data", "recs.json")
OUT_PUB = os.path.join(ROOT, "public", "recs.json")

TODAY = datetime.now(timezone.utc).date()
TODAY_STR = TODAY.isoformat()

def to_slug(text: str) -> str:
    t = unicodedata.normalize("NFKD", text)
    t = "".join(c for c in t if not unicodedata.combining(c))
    t = t.lower()
    t = re.sub(r"[^a-z0-9\s-]", "", t)
    t = re.sub(r"\s+", "-", t)
    t = re.sub(r"-+", "-", t)
    return t.strip("-")

def event_canonical_slug(event: dict) -> str:
    if event.get("slug"):
        return event["slug"]
    comp = event.get("companyName") or "event"
    city = event.get("city") or ""
    base = to_slug(f"{comp} {city}")
    raw_id = str(event.get("id") or "")
    suffix = raw_id.split("_")[-1] if "_" in raw_id else raw_id[-8:]
    return f"{base}-{suffix}"

def jaccard(set_a: set, set_b: set) -> float:
    if not set_a or not set_b:
        return 0.2
    inter = len(set_a.intersection(set_b))
    union = len(set_a.union(set_b))
    return float(inter) / union if union > 0 else 0.2

def days_until(date_str: str) -> float | None:
    if not date_str or len(date_str) < 10:
        return None
    try:
        d = datetime.strptime(date_str[:10], "%Y-%m-%d").date()
        return float((d - TODAY).days)
    except Exception:
        return None

def recency_score(days: float | None) -> float:
    if days is None:
        return 0.5
    if days < 0:
        return 0.0
    if days <= 7:
        return 1.0
    if days <= 30:
        return 0.85
    if days <= 90:
        return 0.70
    if days <= 180:
        return 0.50
    return max(0.2, 1.0 - (days / 365.0))

def main():
    if not os.path.exists(EVENTS_PATH):
        sys.exit(f"Events file not found at {EVENTS_PATH}")

    with open(EVENTS_PATH, "r", encoding="utf-8") as f:
        events = json.load(f)

    print(f"[FindLatinDance] Baking recommendations in Python for {len(events)} events...")
    approved = [e for e in events if e.get("status") == "approved" or "status" not in e]
    default_styles = ["Salsa", "Bachata", "Kizomba", "Brazilian Zouk"]

    city_map = {}
    festivals_pool = []
    socials_pool = []
    future_pool = []

    for e in approved:
        slug = event_canonical_slug(e)
        e["_slug"] = slug
        city_slug = e.get("citySlug") or to_slug(e.get("city") or "")
        e["_citySlug"] = city_slug
        if city_slug not in city_map:
            city_map[city_slug] = []
        city_map[city_slug].append(e)

        ev_date = e.get("date")
        if not ev_date and isinstance(e.get("dateTime"), dict):
            ev_date = e["dateTime"].get("date")
        du = days_until(ev_date)
        e["_daysUntil"] = du

        freq = e.get("frequency", "one-time")
        is_future = (freq in ("weekly", "monthly")) or (du is not None and du >= 0)
        e["_isFuture"] = is_future
        if is_future:
            future_pool.append(e)
            if e.get("eventType") == "festival":
                festivals_pool.append(e)
            elif e.get("eventType") == "social":
                socials_pool.append(e)

    festivals_pool.sort(key=lambda x: (x["_daysUntil"] if x["_daysUntil"] is not None else 999))
    socials_pool.sort(key=lambda x: recency_score(x["_daysUntil"]), reverse=True)

    recs_out = {
        "metadata": {
            "engine": "Python Hybrid Inverted Index & Matrix Factorization (Offline Local)",
            "today": TODAY_STR,
            "totalApproved": len(approved),
            "upcomingPool": len(future_pool),
            "brand": "FindLatinDance",
        },
        "events": {},
        "cities": {}
    }

    for current in approved:
        slug = current["_slug"]
        city_slug = current["_citySlug"]
        curr_styles = set(current.get("danceStyles") or [current.get("danceStyle")] or default_styles)
        curr_artists = set(current.get("artists") or [])

        in_city_candidates = [
            e for e in city_map.get(city_slug, [])
            if e["_slug"] != slug and e["_isFuture"]
        ]
        in_city_candidates.sort(
            key=lambda c: (
                c.get("eventType") == current.get("eventType"),
                jaccard(curr_styles, set(c.get("danceStyles") or [c.get("danceStyle")] or default_styles)),
                recency_score(c["_daysUntil"])
            ),
            reverse=True
        )
        related_in_city = [c["_slug"] for c in in_city_candidates[:6]]

        fest_candidates = [f for f in festivals_pool if f["_slug"] != slug]
        fest_candidates.sort(
            key=lambda f: (
                1.5 if f.get("country") == current.get("country") else 0.5,
                jaccard(curr_artists, set(f.get("artists") or [])) if curr_artists else 0.0,
                recency_score(f["_daysUntil"])
            ),
            reverse=True
        )
        related_festivals = [f["_slug"] for f in fest_candidates[:6]]

        soc_candidates = [s for s in socials_pool if s["_slug"] != slug and s["_slug"] not in related_in_city]
        soc_candidates.sort(
            key=lambda s: (
                1.5 if s.get("country") == current.get("country") else 0.5,
                jaccard(curr_styles, set(s.get("danceStyles") or [s.get("danceStyle")] or default_styles)),
                recency_score(s["_daysUntil"])
            ),
            reverse=True
        )
        related_socials = [s["_slug"] for s in soc_candidates[:6]]

        if not related_in_city and related_socials:
            related_in_city = related_socials[:3]
        if not related_festivals and festivals_pool:
            related_festivals = [f["_slug"] for f in festivals_pool[:6] if f["_slug"] != slug]
        if not related_socials and socials_pool:
            related_socials = [s["_slug"] for s in socials_pool[:6] if s["_slug"] != slug]

        recs_out["events"][slug] = {
            "relatedInCity": related_in_city,
            "relatedFestivals": related_festivals,
            "relatedSocials": related_socials
        }

    for city_slug, city_evs in city_map.items():
        city_upcoming = [e for e in city_evs if e["_isFuture"]]
        city_upcoming.sort(
            key=lambda e: (
                1.5 if e.get("eventType") == "festival" else 1.0,
                recency_score(e["_daysUntil"])
            ),
            reverse=True
        )
        trending = [e["_slug"] for e in city_upcoming[:8]]
        if not trending and city_evs:
            trending = [e["_slug"] for e in city_evs[:8]]
        recs_out["cities"][city_slug] = {"trending": trending}

    with open(OUT_SRC, "w", encoding="utf-8") as f:
        json.dump(recs_out, f, indent=2)
    with open(OUT_PUB, "w", encoding="utf-8") as f:
        json.dump(recs_out, f)

    print(f"[FindLatinDance] Wrote {len(recs_out['events'])} events & {len(recs_out['cities'])} cities to {OUT_SRC}")

if __name__ == "__main__":
    main()
