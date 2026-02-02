# Ergogen Project Knowledge Base

This document summarizes the learnings, workflows, and configurations established for the `keys-mk1` split keyboard project using Ergogen.

## Project Structure

```
/
├── config.yaml        # Main Ergogen configuration (renamed from input.yaml for local footprint support)
├── footprints/        # Custom JS footprints (Nice!Nano, Mounting Holes, etc.)
├── scripts/
│   ├── build.js       # Automated build script (Ergogen -> JSCAD -> STL)
│   └── flip_footprint.js # Utility to generate back-side footprints
├── output/            # Generated artifacts (PCBs, STLs, DXFs)
│   ├── cases/         # 3D models (STL)
│   ├── outlines/      # 2D outlines (DXF, PNG)
│   └── pcbs/          # Unrouted KiCad PCB files
├── package.json       # Dependencies (ergogen, @jscad/cli, etc.)
└── AGENT.md           # This file
```

## Workflows

### 1. Building the Project
Use the npm script to generate all outputs. This script handles the Ergogen run and the subsequent conversion of 3D models from `.jscad` to `.stl`.
```bash
npm run build
```
*   **Under the hood:** It runs `node scripts/build.js`.
*   **JSCAD Conversion:** Ergogen v4 outputs `.jscad` (OpenJSCAD v1 syntax). The build script injects a compatibility shim (importing `CSG`, `CAG`, `translate`, etc. from `@jscad/csg/api`) to allow the modern `@jscad/cli` to process these legacy files into STLs.

### 2. Loading Custom Footprints
To use local footprints (in the `./footprints` folder):
1.  The configuration file **must** be named `config.yaml`.
2.  Ergogen **must** be run with the directory path `.` instead of a file path.
    *   Command: `npx ergogen . -o output`
    *   *Incorrect:* `npx ergogen input.yaml` (will not load local footprints).

## Ergogen Configuration (`config.yaml`)

### Points & Zones
*   **Zone Naming:** Points are automatically named `zone_column_row`.
*   **Overrides:** To adjust specific keys, do it *inside* the zone definition or use the generated name references.
*   **"Defined more than once" Error:** Occurs if you define a top-level key in `points.zones` that conflicts with an automatically generated point name.
    *   *Solution:* Use separate single-point zones (e.g., `mounting_tl`, `mounting_tr`) for disparate items like mounting holes.
*   **Default Spacing:** Ergogen defaults `padding` and `spread` to `19mm` (MX standard) if not specified.
    *   *Critical for Choc:* You **must** explicitly set `padding` and `spread`.
    *   *Current Config:* We use `padding: ky + spacing` and `spread: kx + spacing` (with `spacing: 0.75` in units) to mimic the Caldera keyboard's tight but comfortable layout.

### Outlines
*   **Filtering (`where`):** Used to select points for placing shapes.
    *   Regex is powerful: `where: "/^sidepad_|^matrix_/"` allows explicit selection of zones.
*   **Subtraction:** When subtracting a static outline (like a set of mounting holes) from another (like a plate), **do not** use a `where` clause on the subtraction operation itself if the outline already contains absolute positions. Doing so "stamps" the outline at every matching point.
    *   *Correct:* Create `_mounting_left` (filtered by points), then subtract `_mounting_left` from `plate_left`.

### PCBs
*   **Left vs. Right:**
    *   **Left:** Filter for non-mirrored zones (e.g., `where: "/^sidepad_|^matrix_/"`).
    *   **Right:** Filter for mirrored zones using **explicit regexes** (e.g., `"/^mirror_sidepad_|^mirror_matrix_.../"`).
    *   *Critical Warning:* Using a broad `/^mirror_/` filter for the Right PCB will capture *everything* starting with mirror, including `mirror_mounting_holes`, causing switches/diodes to be placed on top of screw holes.
*   **Component Placement:**
    *   **Front:** Standard behavior.
    *   **Back:** Ergogen footprints often don't support a generic `side: B` parameter.
        *   *Solution:* Create a custom footprint (e.g., `nice_nano_back.js`) where the X coordinates are mirrored and layers are swapped (`F.Cu` -> `B.Cu`).
        *   *Rotation:* Back-mounted components often need inverted rotation logic (e.g., `90` vs `-90`) compared to the front.

## Custom Footprints
*   **Creation:** JS files exporting a `body` function that returns KiCad s-expression strings.
*   **Back-Side Hack:** Since we cannot easily flip instances in Ergogen config, we script the generation of "Back" footprints.
    *   Script: `scripts/flip_footprint.js` reads a standard footprint and flips X coords/layers.

## Current Design Status
*   **Type:** Split keyboard, unibody logic (separate PCBs, defined as Left/Right).
*   **Controller:** Nice!Nano v2 (Back-mounted, symmetric placement).
*   **Power:** JST-PH battery connector and Slider switch added.
*   **Mounting:** 3 screw holes per side (Thumb intersection, Top/Bottom Pinky gap), integrated into PCB and Plate.
*   **Output:** Generates clean, separated Left/Right PCBs and STLs for cases/plates.

## Future Tasks
*   **Case Design:** The current cases are simple extrusions. Real "tray" cases need walls defined by expanding the board outline and subtracting the inner cavity.
*   **Routing:** The generated PCBs are **unrouted**. They must be opened in KiCad to draw traces.
*   **Verification:** Always verify hole alignment and clearance (especially near edges) in the generated DXF/STL files.

## Resources & References

### `ergogen-docs/`
Contains text dumps of official documentation and community blog posts (e.g., FlatFootFox).
*   **Utility:** Critical for looking up syntax, parameter definitions (like `what`, `where`, `adjust`), and understanding legacy vs. v4 differences.

### `examples/`
Contains cloned repositories of other Ergogen keyboards.
*   **`caldera-keyboard`:** Highly valuable reference.
    *   **Footprints:** Source of our `nice_nano.js`, `mountinghole.js`, and `EVQPUC.js` (reset switch).
    *   **Techniques:** demonstrates advanced case outlining (expanding board for walls) and PCB component placement.
*   **`temper`:** Another split keyboard example, useful for referencing alternative KiCad project structures.
