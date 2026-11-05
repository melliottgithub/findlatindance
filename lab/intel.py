#!/usr/bin/env python3
"""
FindLatinDance Unified Intelligence Hub (CLI)
Aggregates live catalog metrics, triad network status, competitor positioning, and growth cadence.
Usage: python3 lab/intel.py
"""

import json
import os
import sys
from datetime import datetime

def print_header(title):
    print("\n" + "=" * 70)
    print(f"  {title.upper()}")
    print("=" * 70)

def main():
    print_header("FindLatinDance Unified Command Center & Market Intel")
    print(f"Timestamp: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} | Network: Latin Dance Triad")

    events_path = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'events.json')
    if os.path.exists(events_path):
        with open(events_path, 'r', encoding='utf-8') as f:
            events = json.load(f)
        
        festivals = [e for e in events if e.get('eventType') == 'festival']
        classes = [e for e in events if e.get('eventType') == 'class']
        socials = [e for e in events if e.get('eventType') == 'social']
        cities = {e.get('city') for e in events if e.get('city')}

        print("\n📊 1. CATALOG & NETWORK PULSE")
        print(f"  • Total Approved Events:     {len(events):,} active events")
        print(f"  • Festivals & Congresses:    {len(festivals):,} upcoming congresses")
        print(f"  • Socials & Classes:         {len(socials):,} socials · {len(classes):,} classes")
        print(f"  • Cities Covered:            {len(cities):,} worldwide cities")
        print(f"  • Triad Integration:         FindBachata (SSOT) ↔ FindSalsa ↔ FindLatinDance ✅")
    else:
        print("\n⚠️ Catalog events.json not found.")

    # 2. Competitor Matrix
    print("\n⚔️ 2. COMPETITIVE ADVANTAGE MATRIX (Who Wins Where)")
    print("-" * 70)
    print(f"{'Competitor':<18} | {'What They Are Best At':<26} | {'FindLatinDance Advantage':<24}")
    print("-" * 70)
    print(f"{'DanceUs':<18} | {'Old Cluttered Listing':<26} | {'Multi-Genre Gold Aesthetic'}")
    print(f"{'GoLatinDance':<18} | {'Regional Calendar Niche':<26} | {'Curated Global Congresses'}")
    print(f"{'Go&Dance':<18} | {'Ticketing Checkout':<26} | {'Unbiased All-Platform Discovery'}")
    print(f"{'Eventbrite':<18} | {'General City Nightlife':<26} | {'Salsa/Bachata/Zouk/Kizomba Focus'}")
    print(f"{'Social Media':<18} | {'Ephemeral Stories':<26} | {'Permanent Multi-Room Directory'}")
    print("-" * 70)

    # 3. Operator Cadence Standard
    print("\n⏰ 3. RECOMMENDED OPERATOR CADENCE (WBR Standard)")
    print("  • REAL-TIME: Automated CI/CD deployments on GitHub push to main.")
    print("  • WEEKLY:    Run sync-triad-catalogs.mjs to ingest latest festivals & verify links.")
    print("  • MONTHLY:   Multi-style festival organizer outreach and backlink partnerships.")
    print("=" * 70 + "\n")

if __name__ == '__main__':
    main()
