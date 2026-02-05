module.exports = {
  params: {
    designator: 'S',
    keycaps: false,
    reverse: false,
    hotswap: true,
    from: undefined,
    to: undefined
  },
  body: p => {
    const standard = `
      (module PG1350 (layer F.Cu) (tedit 5D5C6E6C)
      ${p.at /* parametric position */}

      ${'' /* footprint reference */}
      (fp_text reference "${p.ref}" (at 0 0) (layer F.SilkS) ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15))))
      (fp_text value PG1350 (at 0 -8) (layer F.Fab) hide (effects (font (size 1.27 1.27) (thickness 0.15))))

      ${''/* corner marks */}
      (fp_line (start -7 -6) (end -7 -7) (layer F.SilkS) (width 0.15))
      (fp_line (start -7 -7) (end -6 -7) (layer F.SilkS) (width 0.15))
      (fp_line (start -6 7) (end -7 7) (layer F.SilkS) (width 0.15))
      (fp_line (start -7 7) (end -7 6) (layer F.SilkS) (width 0.15))
      (fp_line (start 7 6) (end 7 7) (layer F.SilkS) (width 0.15))
      (fp_line (start 7 7) (end 6 7) (layer F.SilkS) (width 0.15))
      (fp_line (start 6 -7) (end 7 -7) (layer F.SilkS) (width 0.15))
      (fp_line (start 7 -7) (end 7 -6) (layer F.SilkS) (width 0.15))
      
      ${''/* central hole */}
      (pad "" np_thru_hole circle (at 0 0) (size 3.429 3.429) (drill 3.429) (layers *.Cu *.Mask))
      
      ${''/* side holes */}
      (pad "" np_thru_hole circle (at -5.5 0) (size 1.7018 1.7018) (drill 1.7018) (layers *.Cu *.Mask))
      (pad "" np_thru_hole circle (at 5.5 0) (size 1.7018 1.7018) (drill 1.7018) (layers *.Cu *.Mask))

      ${''/* pins */}
      (pad 1 thru_hole circle (at 0 5.9) (size 2.032 2.032) (drill 1.27) (layers *.Cu *.Mask) ${p.from.str})
      (pad 2 thru_hole circle (at 5 3.8) (size 2.032 2.032) (drill 1.27) (layers *.Cu *.Mask) ${p.to.str})
    `
    return `
      ${standard}
      )
    `
  }
}