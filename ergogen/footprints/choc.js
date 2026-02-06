module.exports = {
  params: {
    designator: 'S',
    keycaps: false,
    reverse: false,
    hotswap: true,
    side: 'F',
    from: undefined,
    to: undefined
  },
  body: p => {
    const common = `
      (module PG1350 (layer F.Cu) (tedit 5D5C6E6C)
      ${p.at /* parametric position */}

      ${'' /* footprint reference */}
      (fp_text reference "${p.ref}" (at 0 0) (layer F.SilkS) ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15))))
      (fp_text value PG1350 (at 0 -8) (layer F.Fab) hide (effects (font (size 1.27 1.27) (thickness 0.15))))

      ${''/* corner marks */}
      (fp_line (start -7 -6) (end -7 -7) (layer Dwgs.User) (width 0.15))
      (fp_line (start -7 7) (end -6 7) (layer Dwgs.User) (width 0.15))
      (fp_line (start -6 -7) (end -7 -7) (layer Dwgs.User) (width 0.15))
      (fp_line (start -7 7) (end -7 6) (layer Dwgs.User) (width 0.15))
      (fp_line (start 7 6) (end 7 7) (layer Dwgs.User) (width 0.15))
      (fp_line (start 7 -7) (end 6 -7) (layer Dwgs.User) (width 0.15))
      (fp_line (start 6 7) (end 7 7) (layer Dwgs.User) (width 0.15))
      (fp_line (start 7 -7) (end 7 -6) (layer Dwgs.User) (width 0.15))      
      
      ${''/* central hole */}
      (pad "" np_thru_hole circle (at 0 0) (size 3.429 3.429) (drill 3.429) (layers *.Cu *.Mask))
      
      ${''/* side holes (stabilizers) */}
      (pad "" np_thru_hole circle (at -5.5 0) (size 1.7018 1.7018) (drill 1.7018) (layers *.Cu *.Mask))
      (pad "" np_thru_hole circle (at 5.5 0) (size 1.7018 1.7018) (drill 1.7018) (layers *.Cu *.Mask))

      ${''/* hotswap holes */}
      (pad "" np_thru_hole circle (at 0 -5.95) (size 3 3) (drill 3) (layers *.Cu *.Mask))
      (pad "" np_thru_hole circle (at 5 -3.75) (size 3 3) (drill 3) (layers *.Cu *.Mask))
    `

    // Determine pad side (opposite of placement side for hotswap)
    // If placed on Top (F), pads on Bottom (B).
    // If placed on Bottom (B), pads on Top (F).
    // Note: This logic assumes the switch is placed on `p.side` and the socket is on the other side.
    const pad_side = p.side === 'F' ? 'B' : 'F';
    const layers = `"${pad_side}.Cu" "${pad_side}.Paste" "${pad_side}.Mask"`;

    return `
      ${common}
      ${''/* pads */}
      (pad "1" smd rect (at -3.275 -5.95 ${p.rot + 180}) (size 2.6 2.6) (layers ${layers}) ${p.from.str})
      (pad "2" smd rect (at 8.275 -3.75 ${p.rot + 180}) (size 2.6 2.6) (layers ${layers}) ${p.to.str})
      )
    `
  }
}