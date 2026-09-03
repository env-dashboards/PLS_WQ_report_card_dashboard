"""Generate placeholder dashboard data for the GitHub Pages proof of concept.

This script is intentionally simple so it can be copied into a Jupyter notebook
workflow later. Production notebooks can replace the synthetic series with
validated monitoring exports and write the same JSON structure.
"""

from __future__ import annotations

import json
from pathlib import Path


OUTPUT_PATH = Path(__file__).resolve().parents[1] / "docs" / "data" / "sample_water_quality.json"


def build_placeholder_data() -> dict:
    """Return synthetic weekly water quality data for three monitoring sites."""
    dates = [
        "2026-06-08",
        "2026-06-15",
        "2026-06-22",
        "2026-06-29",
        "2026-07-06",
        "2026-07-13",
        "2026-07-20",
        "2026-07-27",
        "2026-08-03",
        "2026-08-10",
        "2026-08-17",
        "2026-08-24",
        "2026-08-31",
    ]

    return {
        "metadata": {
            "site": "Sydney International Regatta Centre",
            "data_status": "placeholder",
            "generated_on": "2026-09-03",
            "notes": "Synthetic values for dashboard proof-of-concept only.",
        },
        "thresholds": {
            "chlorophyll_a": 10,
            "dissolved_oxygen": 6,
            "enterococci": 200,
        },
        "sites": {
            "Competition Lake": {
                "dates": dates,
                "chlorophyll_a": [5.8, 6.1, 6.6, 7.4, 8.2, 7.9, 8.8, 9.4, 8.7, 7.6, 7.2, 6.8, 6.5],
                "dissolved_oxygen": [8.4, 8.1, 7.8, 7.5, 7.2, 7.4, 7.0, 6.8, 7.1, 7.5, 7.9, 8.0, 8.2],
                "enterococci": [22, 28, 35, 44, 62, 180, 95, 52, 38, 31, 29, 36, 41],
            },
            "Warm Up Lake": {
                "dates": dates,
                "chlorophyll_a": [6.2, 6.8, 7.4, 8.1, 9.0, 10.8, 11.6, 10.2, 9.6, 8.5, 7.9, 7.3, 7.0],
                "dissolved_oxygen": [8.0, 7.7, 7.4, 7.1, 6.9, 6.6, 6.4, 6.7, 6.9, 7.2, 7.5, 7.7, 7.9],
                "enterococci": [18, 24, 30, 39, 58, 76, 112, 84, 49, 43, 33, 28, 32],
            },
            "Final Basin": {
                "dates": dates,
                "chlorophyll_a": [7.1, 7.8, 8.6, 9.5, 10.4, 11.2, 10.7, 10.0, 9.2, 8.6, 8.1, 7.6, 7.4],
                "dissolved_oxygen": [7.2, 6.9, 6.7, 6.4, 6.2, 5.9, 5.8, 6.1, 6.3, 6.6, 6.8, 7.0, 7.1],
                "enterococci": [35, 42, 56, 82, 138, 246, 184, 102, 76, 58, 47, 39, 44],
            },
        },
    }


def main() -> None:
    """Write the placeholder JSON used by the static dashboard."""
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(json.dumps(build_placeholder_data(), indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
